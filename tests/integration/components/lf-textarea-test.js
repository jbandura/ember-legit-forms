import hbs from 'htmlbars-inline-precompile';
// import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('lf-textarea', 'Integration | Component | lf-textarea', {
  integration: true
});

function setupTextarea(context, isValid = true) {
  context.set('validateAction', () => { return { isValid };});
  context.set(
    'description',
    `
      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
      Placeat, odit pariatur illum dicta excepturi! Esse, cupiditate, unde.
      Perspiciatis, debitis, commodi. Nulla blanditiis dicta perferendis pariatur
      deserunt vel totam nemo laboriosam.
    `
  );
  context.render(hbs`{{lf-textarea
    label="Description"
    property=description
    name="value"
    validate=(action validateAction)
  }}`);
}

test(
  'it renders the textarea with all markup and proper option selected',
  function(assert) {
    setupTextarea(this);

    assert.equal(this.$('.control-label').text().trim(), 'Description', 'it has proper label');
    assert.equal(this.$('.form-group').length, 1, 'it has a form-group div');
  }
);

test('it has no validation state when rendered', function(assert) {
  setupTextarea(this);

  let $form = this.$('.form-group');
  assert.equal($form.attr('class'), 'ember-view form-group', 'it has no validation state when rendered');
});

test('it shows error validation state', function(assert) {
  setupTextarea(this, false);

  let $form = this.$('.form-group');
  $form.trigger('blur').trigger('focusout');
  assert.equal($form.attr('class'), 'ember-view form-group has-error');
});

test('it shows success validation state', function(assert) {
  setupTextarea(this, true);

  let $form = this.$('.form-group');
  this.$('.form-control').val('asd').trigger('focusout');
  assert.equal($form.attr('class'), 'ember-view form-group has-success');
});

test('it shows validation state only after focusOut', function(assert) {
  setupTextarea(this, true);

  let $form = this.$('.form-group');
  $('.form-control').val('Lorem ipsum');

  assert.equal($form.attr('class'), 'ember-view form-group');
  $('.form-control').trigger('blur');
  assert.equal($form.attr('class'), 'ember-view form-group has-success');
});

test('it observes the property changes', function(assert) {
  setupTextarea(this, true);

  this.set('description', 'foo bar baz');
  assert.equal(
    this.$('.form-control').val().trim(),
   'foo bar baz',
   'it observes the property and changes to the correct option'
  );
});


test('it resets and hides validation state when property set to null', function(assert) {
  setupTextarea(this, true);

  let $form = this.$('.form-group');
  $('.form-control').val('foo').trigger('blur');
  this.set('description', null);

  assert.equal(
    $form.attr('class'),
    'ember-view form-group',
    'it has no validation state when property set to null'
  );
});
