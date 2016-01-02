import validator from 'ember-legit-forms/validators/required-validator';
import { module, test } from 'qunit';

module('Unit | Validators | required');

let subject = validator.create();

test('it validates properly', function(assert) {
  assert.equal(subject.validate(''), 'required');
  assert.equal(subject.validate(null), 'required');

  assert.equal(subject.validate('asd'), undefined);
});
