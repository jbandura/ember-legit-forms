import { setProperties } from '@ember/object';
import hbs from 'htmlbars-inline-precompile';
import { moduleForComponent, test } from 'ember-qunit';
import {
  fillInBlurIntegration as fillInBlur
} from '../../../helpers/ember-legit-forms';
import sinon from 'sinon';

moduleForComponent('lf-form', 'Integration | Component | lf-form external errors', {
  integration: true
});


test('external errors are shown', function(assert) {
  const msg = 'foo message';
  setProperties(this, {
    rules: { name: 'required' },
    externalErrors: {},
    messageProvider: {
      getMessage() {
        return 'foo message';
      }
    },
  });
  this.render(hbs `
   {{#lf-form
     rules=rules
     as |v formValid|
   }}
     {{lf-input
       messageProvider=messageProvider
       label="Name"
       name="name"
       validate=v
       class="js-input"
       errors=externalErrors.name
     }}
  {{/lf-form}}
  `);
  fillInBlur(this, '.js-input', 'foo');
  this.set('externalErrors', { name: ['mustBeAlpha'] });
  assert.ok(this.$('.js-input').hasClass('has-error'));
  assert.equal(this.$('.js-input .help-block').text().trim(), msg);
});

test('errors are translated when action provided', function(assert) {
  const actionSpy = sinon.spy(() => {
    return 'foo message 2';
  });
  setProperties(this, {
    rules: { name: 'required' },
    externalErrors: {},
    translateExternalError: actionSpy,
  });
  this.render(hbs `
   {{#lf-form
     rules=rules
     as |v formValid|
   }}
     {{lf-input
       label="Name"
       name="name"
       validate=v
       class="js-input"
       errors=externalErrors.name
       translateExternalError=(action translateExternalError)
     }}
  {{/lf-form}}
  `);
  fillInBlur(this, '.js-input', 'asd');
  this.set('externalErrors', { name: ['mustBeAlpha'] });
  assert.ok(actionSpy.withArgs('mustBeAlpha').calledOnce);
  assert.equal(this.$('.js-input .help-block').text().trim(), 'foo message 2');
});

test('it calls the action on every error', function(assert) {
  const actionSpy = sinon.spy(() => {
    return 'foo message 2';
  });
  setProperties(this, {
    rules: { name: 'required' },
    externalErrors: { name: ['mustBeAlpha', "can't be blank"] },
    translateExternalError: actionSpy,
  });
  this.render(hbs `
   {{#lf-form
     rules=rules
     as |v formValid|
   }}
     {{lf-input
       label="Name"
       name="name"
       validate=v
       class="js-input"
       errors=externalErrors.name
       translateExternalError=(action translateExternalError)
     }}
  {{/lf-form}}
  `);
  fillInBlur(this, '.js-input', '');
  assert.ok(actionSpy.withArgs('mustBeAlpha').calledOnce);
  assert.ok(actionSpy.withArgs("can't be blank").calledOnce);
});

test('external errros get cleared after input', function(assert) {
  setProperties(this, {
    rules: { name: 'required' },
    externalErrors: { name: ['mustBeAlpha', "can't be blank"] },
  });
  this.render(hbs `
   {{#lf-form
     rules=rules
     as |v formValid|
   }}
     {{lf-input
       label="Name"
       name="name"
       class="js-input"
       errors=externalErrors.name
       validate=v
     }}
  {{/lf-form}}
  `);
  fillInBlur(this, '.js-input', '');
  assert.ok(this.$('.js-input').hasClass('has-error'));
  fillInBlur(this, '.js-input', 'bar');
  assert.notOk(this.$('.js-input').hasClass('has-error'), 'it should clear the errors');
});
