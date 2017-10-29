import FormValidator from 'ember-legit-forms/utils/form-validator';
import { module, test } from 'qunit';
import Ember from 'ember';

module('Unit | Utility | form validator');

function generateLookupStub(returnValues) {
  return Ember.Object.create({
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
  return Ember.Object.create({
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

  assert.deepEqual(Ember.getProperties(Ember.get(subject, 'fields')[0], 'name', 'valid'), {
    name: 'password',
    valid: null
  });

  assert.deepEqual(Ember.getProperties(Ember.get(subject, 'fields')[1], 'name', 'valid'), {
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

  assert.deepEqual(Ember.getProperties(Ember.get(subject, 'fields')[0], 'name', 'valid'), {
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
  assert.deepEqual(Ember.getProperties(Ember.get(subject, 'fields')[0], 'name', 'valid'), {
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
  assert.deepEqual(Ember.getProperties(Ember.get(subject, 'fields')[0], 'name', 'valid'), {
    name: "phone",
    valid: false
  }, 'it sets validity correctly when not valid');

  Ember.set(subject, 'strategy.lookupService', generateLookupStub({ numeric: null }));

  subject.validate('phone', '1234');


  assert.deepEqual(Ember.getProperties(Ember.get(subject, 'fields')[0], 'name', 'valid'), {
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

  assert.ok(Ember.get(subject, 'isFormValid'));

  Ember.set(subject, 'strategy.lookupService', generateLookupStub({
    numeric: null,
    required: 'error'
  }));


  subject.validate('phone');
  subject.validate('password');

  assert.equal(Ember.get(subject, 'isFormValid'), false);
});

test('it creates fields basing on changeset', function(assert) {
  const changeset = Ember.Object.create({
    _content: {
      firstName: "asd",
      lastName: "",
    }
  });
  let subject = FormValidator.create({ changeset });

  assert.deepEqual(Ember.getProperties(Ember.get(subject, 'fields')[0], 'name', 'valid', 'value'), {
    name: 'firstName',
    valid: null,
    value: "asd",
  }, 'it creates firstName field an preserves value');

  assert.deepEqual(Ember.getProperties(Ember.get(subject, 'fields')[1], 'name', 'valid', 'value'), {
    name: 'lastName',
    valid: null,
    value: "",
  }, 'it creates lastName field and preserves value');
})
