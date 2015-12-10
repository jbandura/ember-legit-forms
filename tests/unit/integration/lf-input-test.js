import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('lf-input', 'Integration | Component | lf-input', {
  integration: true
});

test('it renders the input with all markup',function(assert) {
  this.set('validateAction', function() { return {isValid: true}; });
  this.set('name', 'Test');
  this.render(hbs`{{lf-input label="Name" property=name name="name" validate=(action validateAction)}}`);
  assert.equal(this.$('.control-label').text().trim(), 'Name', 'it has proper label');
  assert.equal(this.$('.form-group').length, 1, 'it has a form-group div');
});

test('it sets properly valid states', function(assert) {
  this.set('validateAction', function() { return {isValid: true}; });
  this.set('name', 'Test');
  this.render(hbs`{{lf-input label="Name" property=name name="name" validate=(action validateAction)}}`);

  let $form = this.$('.form-group');

  assert.equal($form.attr('class'), 'ember-view form-group', 'it has no validation state when rendered');

  Ember.run(() => {
    this.$('.form-control').trigger('blur');
  });

  assert.equal($form.attr('class'), 'ember-view form-group has-success', 'it has shows success state');

  this.set('validateAction', function() { return {isValid: false}; });

  Ember.run(() => {
    this.$('.form-control').trigger('blur');
  });

  assert.equal($form.attr('class'), 'ember-view form-group has-error', 'it has shows error state');
});
