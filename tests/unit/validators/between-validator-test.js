import validator from 'ember-legit-forms/validators/between-validator';
import { module, test } from 'qunit';
import generateString from '../../helpers/generate-string';
import argumentsObj from '../../helpers/arguments-obj';

module('Unit | Validators | between');

let subject = validator.create();

test('it validates valid values', function(assert) {
  let msgObj = subject.validate(generateString(3), argumentsObj(3,4));
  assert.equal(
    msgObj,
    undefined
  );
  msgObj = subject.validate(generateString(4), argumentsObj(3,4));
  assert.equal(
    msgObj,
    undefined
  );
});

test('it returns message when value not valid', function(assert) {
  let msgObj = subject.validate(generateString(2), argumentsObj(3,4));
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
