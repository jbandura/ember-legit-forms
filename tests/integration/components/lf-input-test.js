import hbs from 'htmlbars-inline-precompile';
// import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('lf-input', 'Integration | Component | lf-input', {
  integration: true
});

function setupInput(context, isValid = true) {
  context.set('validateAction', function() { return { isValid }; });
  context.set('name', 'Test');
  context.render(hbs`{{lf-input label="Name" property=name name="name" validate=(action validateAction)}}`);
}

test('it renders the input with all markup',function(assert) {
  setupInput(this);

  assert.equal(this.$('.control-label').text().trim(), 'Name', 'it has proper label');
  assert.equal(this.$('.form-group').length, 1, 'it has a form-group div');
});

test('it has no validation state when rendered', function(assert) {
  setupInput(this);

  let $form = this.$('.form-group');
  assert.equal($form.attr('class'), 'ember-view form-group', 'it has no validation state when rendered');
});

test('it shows error validation state', function(assert) {
  setupInput(this, false);

  let $form = this.$('.form-group');

  this.$('.form-control').trigger('blur').trigger('focusout');
  assert.equal($form.attr('class'), 'ember-view form-group has-error');
});

test('it shows success validation state', function(assert) {
  setupInput(this);

  let $form = this.$('.form-group');

  this.$('.form-control').val('asd').trigger('focusout');
  assert.equal($form.attr('class'), 'ember-view form-group has-success');
});

test('it resets validation state when property set to null', function(assert) {
  setupInput(this);
  this.set('name', null);
  let $form = this.$('.form-group');

  assert.equal($form.attr('class'), 'ember-view form-group');
});

test('it validates only after first focusOut', function(assert) {
  setupInput(this);

  let $form = this.$('.form-group');
  let $formControl = this.$('.form-control');

  $formControl.val('foo');

  assert.equal(
    $form.attr('class'),
   'ember-view form-group',
   'it shouldn\'t validate without focusOut'
 );

 $formControl.trigger('blur');

  assert.equal(
    $form.attr('class'),
   'ember-view form-group has-success',
   'it should validate after focusOut'
 );
});
