import validator from 'ember-legit-forms/validators/regex-validator';
import { module, test } from 'qunit';
import Ember from 'ember';

module('Unit | Validators | regex');

let subject = validator.create();
function argumentsObj(regex) {
  return Ember.Object.create({
    arguments: [regex]
  });
}

test('it validates properly', function(assert) {
  assert.equal(
    subject.validate('foo', argumentsObj(/foo/)),
    undefined
  );

  assert.equal(
    subject.validate('foobar', argumentsObj(/foo[bar|baz]/)),
    undefined
  );

  assert.equal(
    subject.validate('foobar', argumentsObj(/baz/)),
    'mustMatchRegex'
  );
});

test('it allows empty values for chaining', function(assert) {
  assert.equal(subject.validate(''), undefined);

  assert.equal(subject.validate(null), undefined);
});
