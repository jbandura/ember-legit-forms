import validator from 'ember-legit-forms/validators/url-validator';
import { module, test } from 'qunit';

module('Unit | Validators | url');

let subject = validator.create();

test('it validates properly', function(assert) {
  assert.equal(subject.validate('http://www.google.com'), undefined);
  assert.equal(subject.validate('http://google.com'), undefined);

  assert.equal(subject.validate('http'), 'mustBeValidURL');
  assert.equal(subject.validate('http:// asd'), 'mustBeValidURL');
  assert.equal(subject.validate('//'), 'mustBeValidURL');
});

test('it allows empty values for chaining', function(assert) {
  assert.equal(subject.validate(''), undefined);

  assert.equal(subject.validate(null), undefined);
});
