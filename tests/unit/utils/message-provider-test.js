import messageProvider from 'ember-legit-forms/utils/message-provider';
import { module, test } from 'qunit';
import Ember from 'ember';

module('Unit | Utility | form validator');

let subject = messageProvider.create({
  defaultMessages: {
    'testKey': 'test message'
  }
});

test('it gets validation message', function(assert) {
  assert.equal(subject.getMessage('testKey'), 'test message');
});

test('it checks first i18n before getting local keys (globals)', function(assert) {
  Ember.i18n = {
    t() {
      return 'test message from i18n globals';
    }
  };

  assert.equal(subject.getMessage('testKey'), 'test message from i18n globals');
});

test('it checks first i18n before getting local keys (globals)', function(assert) {
  Ember.i18n = null;
  subject.set('container', {
    lookup() {
      return {
        t() {
          return 'test message from i18n service';
        }
      };
    }
  });

  assert.equal(subject.getMessage('testKey'), 'test message from i18n service');
});
