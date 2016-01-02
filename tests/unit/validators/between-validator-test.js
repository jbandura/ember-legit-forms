import validator from 'ember-legit-forms/validators/between-validator';
import { module, test } from 'qunit';
import Ember from 'ember';

module('Unit | Validators | between');

let subject = validator.create();
function argumentsObj(min, max) {
  return Ember.Object.create({
    arguments: [min, max]
  });
}

test('it validates valid values', function(assert) {
  let msgObj = subject.validate(new Array(4).join('a'), argumentsObj(3,4));
  assert.equal(
    msgObj,
    undefined
  );
});

test('it returns message when value not valid', function(assert) {
  let msgObj = subject.validate(new Array(3).join('a'), argumentsObj(3,4));
  assert.equal(
    msgObj.message,
    'mustBeBetween'
  );
});

test('it allows blank values', function(assert) {
  assert.equal(
    subject.validate('', argumentsObj(3,4)),
    undefined
  );
  assert.equal(
    subject.validate(null, argumentsObj(3,4)),
    undefined
  );
});
