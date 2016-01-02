import validatorObject from 'ember-legit-forms/utils/validator-object';
import { module, test } from 'qunit';
import Ember from 'ember';

module('Unit | Utility | validator object');


test('it fetches field properly', function(assert) {
  let subject = validatorObject.create({
    fields: Ember.A([Ember.Object.create({ name: 'name', value: 'name value' })])
  });
  assert.equal(subject.get('field:name'), 'name value');
});

test('it returns null if field not found', function(assert) {
  let subject = validatorObject.create({
    fields: Ember.A([Ember.Object.create({ name: 'name', value: 'name value' })])
  });
  assert.equal(subject.get('field:not_existing'), null);
});

test('it returns null if pattern not recognized', function(assert) {
  let subject = validatorObject.create({
    fields: Ember.A([Ember.Object.create({ name: 'name', value: 'name value' })])
  });
  assert.equal(subject.get('false_key:not_existing'), null);
});

test('it returns data properly', function(assert) {
  let subject = validatorObject.create({
    data: { name: 'name value' }
  });
  assert.equal(subject.get('data:name'), 'name value');
});

test('it returns null if data not found', function(assert) {
  let subject = validatorObject.create({
    data: { name: 'name', value: 'name value' }
  });
  assert.equal(subject.get('data:not_existing'), null);
});
