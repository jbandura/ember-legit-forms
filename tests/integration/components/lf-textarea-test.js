import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import { fillInTextareaIntegration as fillInTextarea } from '../../helpers/ember-legit-forms';

const { run } = Ember;

moduleForComponent('lf-textarea', 'Integration | Component | lf-textarea', {
  integration: true
});

function setupTextarea(context, isValid = true, updateHandler = null) {
  const onUpdate = updateHandler || function () {};
  context.set('onUpdate', onUpdate);
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
    on-update=(action onUpdate)
  }}`);
}

test("it shows an error if input created without a name attribute", function(assert) {
  assert.expect(1);

  assert.throws(() => {
    this.render(hbs `{{lf-textarea label="Foo field"}}`);
  }, /requires name attribute/);
});

test(
  'it renders the textarea with all markup and proper option selected',
  function(assert) {
    setupTextarea(this);

    assert.equal(this.$('.control-label').text().trim(), 'Description', 'it has proper label');
    assert.equal(this.$('.form-group').length, 1, 'it has a form-group div');
  }
);

test('it has proper `for` attribute set on label', function(assert) {
  setupTextarea(this);

  assert.equal(this.$('.control-label').attr('for'), this.$('.form-control').attr('id'),
    'it has proper `for` attribute set');
});

test('it passes custom `id` to inner textarea and label', function(assert) {
  setupTextarea(this);

  this.render(hbs`{{lf-textarea
    inputId="uniqueId"
    label="Description"
    property=description
    name="value"
    validate=(action validateAction)
    on-update=(action onUpdate)
  }}`);

  assert.equal(this.$('.control-label').attr('for'), 'uniqueId',
    'it has proper id set in label\'s `for` attribute');

  assert.equal(this.$('.form-control').attr('id'), 'uniqueId',
    'it has proper id set on textarea');
});

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

// TODO: bring back this test
// test('it shows validation state only after focusOut', function(assert) {
//   run(() => {
//
//     setupTextarea(this, true);
//
//     let $form = this.$('.form-group');
//     $('.form-control').val('Lorem ipsum');
//
//     assert.equal($form.attr('class'), 'ember-view form-group');
//     $('.form-control').trigger('blur');
//     assert.equal(this.$('.form-group').attr('class'), 'ember-view form-group has-success');
//   });
// });

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
  run(() => {
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
});

test('it calls the onupdate handler', function(assert) {
  assert.expect(1);
  setupTextarea(this, true, (val) => {
    assert.equal(val, 'Lorem ipsum');
  });

  fillInTextarea(this, '.form-group', 'Lorem ipsum');
});
