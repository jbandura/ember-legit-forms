import validator from 'ember-legit-forms/validators/min-validator';
import { module, test } from 'qunit';
import generateString from '../../helpers/generate-string';
import argumentsObj from '../../helpers/arguments-obj';

module('Unit | Validators | min');

let subject = validator.create();

test('it validates properly', function(assert) {
  assert.equal(
    subject.validate(generateString(2), argumentsObj(2)),
    undefined
  );

  assert.equal(
    subject.validate(generateString(3), argumentsObj(2)),
    undefined
  );

  assert.equal(
    subject.validate(generateString(2), argumentsObj(3)).message,
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
