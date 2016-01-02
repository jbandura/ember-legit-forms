import validator from 'ember-legit-forms/validators/min-validator';
import { module, test } from 'qunit';
import Ember from 'ember';

module('Unit | Validators | min');

let subject = validator.create();
function argumentsObj(min) {
  return Ember.Object.create({
    arguments: [min]
  });
}

test('it validates properly', function(assert) {
  assert.equal(
    subject.validate(new Array(5).join('a'), argumentsObj(2)),
    undefined
  );

  assert.equal(
    subject.validate(new Array(3).join('a'), argumentsObj(3)).message,
    'tooShort'
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
