import EmberObject from '@ember/object';
import { A } from '@ember/array';
import validator from 'ember-legit-forms/validators/different-validator';
import validatorObject from 'ember-legit-forms/utils/validator-object';
import { module, test } from 'qunit';

module('Unit | Validators | different');

let subject = validator.create();

function argumentsObj(fieldName, value) {
  return validatorObject.create({
    arguments: ['address'],
    fields: A([
      EmberObject.create({ name: fieldName, value })
    ])
  });
}

test('it validates properly', function(assert) {
  assert.equal(
    subject.validate('foo', argumentsObj('address', 'bar')),
    undefined,
    'it returns true when fields are different'
  );

  assert.equal(
    subject.validate('foo', argumentsObj('address', 'foo')).message,
    'mustBeDifferent'
  );
});

test('it allows empty values for chaining', function(assert) {
  assert.equal(subject.validate(''), undefined);

  assert.equal(subject.validate(null), undefined);
});
