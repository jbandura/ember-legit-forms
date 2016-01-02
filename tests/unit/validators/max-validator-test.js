import validator from 'ember-legit-forms/validators/max-validator';
import { module, test } from 'qunit';
import Ember from 'ember';

module('Unit | Validators | max');

let subject = validator.create();
function argumentsObj(max) {
  return Ember.Object.create({
    arguments: [max]
  });
}

test('it validates properly', function(assert) {
  assert.equal(
    subject.validate(new Array(3).join('a'), argumentsObj(3)),
    undefined
  );

  assert.equal(
    subject.validate(new Array(5).join('a'), argumentsObj(3)).message,
    'tooLong'
  );
});

test('it allows empty values for chaining', function(assert) {
  assert.equal(
    subject.validate('', argumentsObj(3)),
    undefined
  );

  assert.equal(
    subject.validate(null, argumentsObj(3)),
    undefined
  );
});
