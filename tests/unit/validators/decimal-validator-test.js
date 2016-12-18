import validator from 'ember-legit-forms/validators/decimal-validator';
import argumentsObj from '../../helpers/arguments-obj';
import { module, test } from 'qunit';

module('Unit | Validators | decimal');

let subject = validator.create();

test('it validates properly', function(assert) {
  assert.equal(subject.validate('9.13'), undefined);
  assert.equal(subject.validate(9.141), undefined);
  assert.equal(subject.validate(9.141, argumentsObj(3)), undefined);

  assert.equal(subject.validate('10.1a34'), 'mustBeNumeric');
  assert.deepEqual(subject.validate('10.134', argumentsObj(2)), {
    message: 'mustHaveFeverDecimals',
    replacements: {
      allowedDecimals: 2,
    },
  });
});

test('it allows empty values for chaining', function(assert) {
  assert.equal(subject.validate(''), undefined);

  assert.equal(subject.validate(null), undefined);
});
