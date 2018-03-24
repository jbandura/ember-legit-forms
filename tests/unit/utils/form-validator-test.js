import EmberObject, {
  getProperties,
  get,
  set
} from '@ember/object';
import FormValidator from 'ember-legit-forms/utils/form-validator';
import { module, test } from 'qunit';

module('Unit | Utility | form validator');

function generateLookupStub(returnValues) {
  return EmberObject.create({
    lookupValidator(_, name) {
      return {
        validate() {
          return returnValues[name];
        }
      };
    }
  });
}

function generateParserStub() {
  return EmberObject.create({
    parseRule(ruleName) {
      return [{
        name: ruleName
      }];
    },
    parseShared(hash) { return hash; }
  });
}

test('it creates fields from rules', function(assert) {
  let subject = FormValidator.create({
    rules: {
      password: 'required',
      name: 'required|min(6)'
    }
  });

  assert.deepEqual(getProperties(get(subject, 'fields')[0], 'name', 'valid'), {
    name: 'password',
    valid: null
  });

  assert.deepEqual(getProperties(get(subject, 'fields')[1], 'name', 'valid'), {
    name: 'name',
    valid: null
  });
});

test('it gets correct validation when all fields correct', function(assert) {
  let subject = FormValidator.create({
    parserService: generateParserStub(),
    lookupService: generateLookupStub({
      required: null
    }),
    rules: {
      password: 'required'
    }
  });

  let validation = subject.validate('password');
  assert.deepEqual(validation, {
    messages: [],
    isValid: true
  });
});

test('it sets correctly fields when all fields correct', function(assert) {
  let subject = FormValidator.create({
    parserService: generateParserStub(),
    lookupService: generateLookupStub({
      required: null
    }),
    rules: {
      password: 'required'
    }
  });

  subject.validate('password');

  assert.deepEqual(getProperties(get(subject, 'fields')[0], 'name', 'valid'), {
    name: 'password',
    valid: true
  }, 'should return fields');
});

test('it marks wrong fields', function(assert) {
  let subject = FormValidator.create({
    parserService: generateParserStub(),
    lookupService: generateLookupStub({
      numeric: false
    }),
    rules: {
      phone: 'numeric'
    }
  });

  subject.validate('phone');
  assert.deepEqual(getProperties(get(subject, 'fields')[0], 'name', 'valid'), {
    name: "phone",
    valid: false
  });

});

test('it correctly recalculates fields', function(assert) {
  let subject = FormValidator.create({
    parserService: generateParserStub(),
    lookupService: generateLookupStub({
      numeric: 'not valid'
    }),
    rules: {
      phone: 'numeric'
    }
  });

  subject.validate('phone', '1234');
  assert.deepEqual(getProperties(get(subject, 'fields')[0], 'name', 'valid'), {
    name: "phone",
    valid: false
  }, 'it sets validity correctly when not valid');

  set(subject, 'strategy.lookupService', generateLookupStub({ numeric: null }));

  subject.validate('phone', '1234');


  assert.deepEqual(getProperties(get(subject, 'fields')[0], 'name', 'valid'), {
    "name": "phone",
    "valid": true
  }, 'it sets validity correctly when valid');
});

test('it sets and recalculates isFormValid property correctly', function(assert) {
  let subject = FormValidator.create({
    parserService: generateParserStub(),
    lookupService: generateLookupStub({
      numeric: null,
      required: null
    }),
    rules: {
      phone: 'numeric',
      password: 'required'
    }
  });

  subject.validate('phone');
  subject.validate('password');

  assert.ok(get(subject, 'isFormValid'));

  set(subject, 'strategy.lookupService', generateLookupStub({
    numeric: null,
    required: 'error'
  }));


  subject.validate('phone');
  subject.validate('password');

  assert.equal(get(subject, 'isFormValid'), false);
});

test('it creates fields basing on changeset', function(assert) {
  const changeset = EmberObject.create({
    _content: {
      firstName: "asd",
      lastName: "",
    }
  });
  let subject = FormValidator.create({ changeset });

  assert.deepEqual(getProperties(get(subject, 'fields')[0], 'name', 'valid', 'value'), {
    name: 'firstName',
    valid: null,
    value: "asd",
  }, 'it creates firstName field an preserves value');

  assert.deepEqual(getProperties(get(subject, 'fields')[1], 'name', 'valid', 'value'), {
    name: 'lastName',
    valid: null,
    value: "",
  }, 'it creates lastName field and preserves value');
});

test('[changeset] it marks fields as valid when no errors present', function(assert) {
  const changeset = EmberObject.create({
    _content: {
      lastName: "Foo",
    },
    error: {
      lastName: { validation: [], },
    }
  });
  let subject = FormValidator.create({ changeset });

  let validation = subject.validate('lastName', 'Foo');
  assert.deepEqual(validation, {
    isValid: true,
    messages: [],
  }, 'it creates firstName field an preserves value');
});

test('[changeset] it correctly recalculates fields', function(assert) {
  const changeset = EmberObject.create({
    _content: {
      phone: "",
    },
    error: {
      phone: { validation: ['must be numeric'], },
    }
  });
  let subject = FormValidator.create({ changeset });

  subject.validate('phone', '1234');
  assert.deepEqual(getProperties(get(subject, 'fields')[0], 'name', 'valid'), {
    name: "phone",
    valid: false
  }, 'it sets validity correctly when not valid');

  set(subject, 'changeset', EmberObject.create({
    _content: {
      phone: '1234',
    },
  }));

  subject.validate('phone', '1234');


  assert.deepEqual(getProperties(get(subject, 'fields')[0], 'name', 'valid'), {
    "name": "phone",
    "valid": true
  }, 'it sets validity correctly when valid');
});

test('[changeset] it sets and recalculates isFormValid property correctly', function(assert) {
  const changeset = EmberObject.create({
    _content: {
      phone: "",
      password: "",
    },
  });
  let subject = FormValidator.create({ changeset });

  subject.validate('phone');
  subject.validate('password');

  assert.ok(get(subject, 'isFormValid'));

  set(subject, 'changeset', {
    _content: {
      phone: "",
      password: "",
    },
    error: {
      phone: { validation: ['cant be blank'] },
      password: { validation: ['cant be blank'] },
    }
  });


  subject.validate('phone');
  subject.validate('password');

  assert.equal(get(subject, 'isFormValid'), false);
});
