import validator from 'ember-legit-forms/validators/email-validator';
import { module, test } from 'qunit';

module('Unit | Validators | email');

let subject = validator.create();

test('it validates properly', function(assert) {
  assert.equal(subject.validate('mail@domain.com'), undefined);
  assert.equal(subject.validate('mail.address@domain.com'), undefined);
  assert.equal(subject.validate('mail@'), 'mustBeValidEmail');
  assert.equal(subject.validate('@mail.com'), 'mustBeValidEmail');
});

test('it allows empty values for chaining', function(assert) {
  assert.equal(subject.validate(''), undefined);

  assert.equal(subject.validate(null), undefined);
});
