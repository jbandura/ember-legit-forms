import EmberObject, { get } from '@ember/object';
import { A } from '@ember/array';
import validatorObject from 'ember-legit-forms/utils/validator-object';
import { module, test } from 'qunit';

module('Unit | Utility | validator object');


test('it fetches field properly', function(assert) {
  let subject = validatorObject.create({
    fields: A([EmberObject.create({ name: 'name', value: 'name value' })])
  });
  assert.equal(get(subject, 'field:name'), 'name value');
});

test('it returns null if field not found', function(assert) {
  let subject = validatorObject.create({
    fields: A([EmberObject.create({ name: 'name', value: 'name value' })])
  });
  assert.equal(get(subject, 'field:not_existing'), null);
});

test('it returns null if pattern not recognized', function(assert) {
  let subject = validatorObject.create({
    fields: A([EmberObject.create({ name: 'name', value: 'name value' })])
  });
  assert.equal(get(subject, 'false_key:not_existing'), null);
});

test('it returns data properly', function(assert) {
  let subject = validatorObject.create({
    data: { name: 'name value' }
  });
  assert.equal(get(subject, 'data:name'), 'name value');
});

test('it returns null if data not found', function(assert) {
  let subject = validatorObject.create({
    data: { name: 'name', value: 'name value' }
  });
  assert.equal(get(subject, 'data:not_existing'), null);
});
