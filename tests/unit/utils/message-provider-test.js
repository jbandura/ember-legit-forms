import messageProvider from 'ember-legit-forms/utils/message-provider';
import { module, test } from 'qunit';
import Ember from 'ember';

module('Unit | Utility | form validator');

let subject = messageProvider.create({
  defaultMessages: {
    'testKey': 'test message',
    'testKeyWithReplacements': 'test message {{replacement1}} and {{replacement2}}'
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

test('it can interpolate messages with and w/o replacements', function(assert) {
  let message = subject._interpolateMessage('testKeyWithReplacements', {
    replacement1: 'foo',
    replacement2: 'bar'
  });

  assert.equal(message, 'test message foo and bar');
});
