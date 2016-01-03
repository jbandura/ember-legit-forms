import validator from 'ember-legit-forms/validators/same-validator';
import validatorObject from 'ember-legit-forms/utils/validator-object';
import { module, test } from 'qunit';
import Ember from 'ember';

module('Unit | Validators | same');

let subject = validator.create();

function argumentsObj(fieldName, value) {
  return validatorObject.create({
    arguments: ['address'],
    fields: Ember.A([
      Ember.Object.create({ name: fieldName, value })
    ])
  });
}

test('it validates properly', function(assert) {
  assert.equal(
    subject.validate('foo', argumentsObj('address', 'foo')),
    undefined,
    'it returns true when both fields equal'
  );

  assert.equal(
    subject.validate('foo', argumentsObj('address', 'asd')).message,
    'mustBeSame'
  );
});

test('it allows empty values for chaining', function(assert) {
  assert.equal(subject.validate(''), undefined);

  assert.equal(subject.validate(null), undefined);
});
