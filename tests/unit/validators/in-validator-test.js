import validator from 'ember-legit-forms/validators/in-validator';
import argumentsObj from '../../helpers/arguments-obj';
import { module, test } from 'qunit';

module('Unit | Validators | in');

let subject = validator.create();

test('it validates properly', function(assert) {
  assert.equal(
    subject.validate('foo', argumentsObj('foo', 'bar')),
    undefined
  );

  assert.equal(
    subject.validate('baz', argumentsObj('foo', 'bar')),
    'mustBeInArray'
  );
});

test('it allows empty values for chaining', function(assert) {
  assert.equal(subject.validate(''), undefined);
  assert.equal(subject.validate(null), undefined);
});
