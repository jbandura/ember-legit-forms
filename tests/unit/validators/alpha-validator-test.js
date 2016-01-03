import validator from 'ember-legit-forms/validators/alpha-validator';
import { module, test } from 'qunit';

module('Unit | Validators | alpha');

let subject = validator.create();

test('it validates properly', function(assert) {
  assert.equal(subject.validate('124'), 'mustBeAlpha');
  assert.equal(subject.validate('124_!;'), 'mustBeAlpha');
  assert.equal(subject.validate('/!;'), 'mustBeAlpha');

  assert.equal(subject.validate('value'), undefined);
  assert.equal(subject.validate('name'), undefined);
});

test('it allows null values for chaining', function(assert) {
  assert.equal(subject.validate(''), undefined);
  assert.equal(subject.validate(null), undefined);
});
