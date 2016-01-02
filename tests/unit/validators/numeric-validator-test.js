import validator from 'ember-legit-forms/validators/numeric-validator';
import { module, test } from 'qunit';

module('Unit | Validators | numeric');

let subject = validator.create();

test('it validates properly', function(assert) {
  assert.equal(subject.validate('9'), undefined);
  assert.equal(subject.validate(9), undefined);

  assert.equal(subject.validate('foo'), 'mustBeNumeric');
  assert.equal(subject.validate('asd93'), 'mustBeNumeric');
});

test('it allows empty values for chaining', function(assert) {
  assert.equal(subject.validate(''), undefined);

  assert.equal(subject.validate(null), undefined);
});
