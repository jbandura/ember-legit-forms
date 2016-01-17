import validator from 'ember-legit-forms/validators/notIn-validator';
import { module, test } from 'qunit';
import argumentsObj from '../../helpers/arguments-obj';

module('Unit | Validators | notIn');

let subject = validator.create();

test('it validates properly', function(assert) {
  assert.equal(
    subject.validate('foo', argumentsObj('foo', 'bar')),
    'mustNotBeInArray'
  );

  assert.equal(
    subject.validate('baz', argumentsObj('foo', 'bar')),
    undefined
  );
});

test('it allows empty values for chaining', function(assert) {
  assert.equal(subject.validate(''), undefined);
  assert.equal(subject.validate(null), undefined);
});
