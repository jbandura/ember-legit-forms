import validator from 'ember-legit-forms/validators/size-validator';
import { module, test } from 'qunit';
import argumentsObj from '../../helpers/arguments-obj';

module('Unit | Validators | size');

let subject = validator.create();

test('it validates properly', function(assert) {
  assert.equal(
    subject.validate(new Array(4).join('a'), argumentsObj(3)),
    undefined
  );

  assert.equal(
    subject.validate(new Array(10).join('a'), argumentsObj(3)).message,
    'mustBeOfSize'
  );

  assert.equal(
    subject.validate(new Array(2).join('a'), argumentsObj(3)).message,
    'mustBeOfSize'
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
