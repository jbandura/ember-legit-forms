import validator from 'ember-legit-forms/validators/alphanumeric-validator';
import { module, test } from 'qunit';

module('Unit | Validators | alphanumeric');

let subject = validator.create();

test('it validates properly', function(assert) {
  assert.equal(subject.validate('_.,!:?'), 'mustBeAlphanumeric');
  assert.equal(subject.validate('//><~'), 'mustBeAlphanumeric');

  assert.equal(subject.validate('value'), undefined);
  assert.equal(subject.validate('name'), undefined);
});

test('it allows null values for chaining', function(assert) {
  assert.equal(subject.validate(''), undefined);
  assert.equal(subject.validate(null), undefined);    
});
