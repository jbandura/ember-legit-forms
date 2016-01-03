import validator from 'ember-legit-forms/validators/in-validator';
import Ember from 'ember';
import { module, test } from 'qunit';

module('Unit | Validators | in');

let subject = validator.create();

function argumentsObj(args) {
  return Ember.Object.create({
    arguments: args
  });
}

test('it validates properly', function(assert) {
  assert.equal(
    subject.validate('foo', argumentsObj(['foo', 'bar'])),
    undefined
  );

  assert.equal(
    subject.validate('baz', argumentsObj(['foo', 'bar'])),
    'mustBeInArray'
  );
});

test('it allows empty values for chaining', function(assert) {
  assert.equal(subject.validate(''), undefined);
  assert.equal(subject.validate(null), undefined);
});
