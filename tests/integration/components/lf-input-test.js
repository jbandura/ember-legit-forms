import hbs from 'htmlbars-inline-precompile';
import { moduleForComponent, test } from 'ember-qunit';
import { fillInBlurIntegration as fillInBlur } from '../../helpers/ember-legit-forms';

moduleForComponent('lf-input', 'Integration | Component | lf-input', {
  integration: true
});

function setupInput(context, isValid = true, updateAction = null) {
  const onUpdate = updateAction || function() {};
  context.setProperties({
    onUpdate,
    backendErrors: { phone: null },
    name: 'Test',
    validateAction() { return { isValid }; },
  });

  context.render(hbs`{{lf-input
    label="Name"
    property=name
    name=name
    errors=backendErrors.phone
    validate=(action validateAction)
    on-update=(action onUpdate)
  }}`);
}

test("it shows an error if input created without a name attribute", function(assert) {
  assert.expectAssertion(() => {
    this.render(hbs `{{lf-input label="Foo field" type="text"}}`);
  }, /requires name attribute/);
});

test('it renders the input with all markup', function(assert) {
  setupInput(this);

  assert.equal(this.$('.control-label').text().trim(), 'Name', 'it has proper label');
  assert.equal(this.$('.form-group').length, 1, 'it has a form-group div');
});

test('it has proper `for` attribute set on label', function(assert) {
  setupInput(this);

  assert.equal(this.$('.control-label').attr('for'), this.$('.form-control').attr('id'),
    'it has proper `for` attribute set');
});

test('it uses custom input component', function(assert) {
  setupInput(this);

  this.render(hbs`{{lf-input
    label="Name"
    property=name
    name="name"
    validate=(action validateAction)
    on-update=(action onUpdate)
    inputComponent='custom-input-component'
  }}`);

  assert.ok(this.$('.custom-input-component').length, 'it uses custom input component');
});

test('it passes custom `id` to inner input and label', function(assert) {
  setupInput(this);

  this.render(hbs`{{lf-input
    inputId="uniqueId"
    label="Name"
    property=name
    name="name"
    validate=(action validateAction)
    on-update=(action onUpdate)
  }}`);

  assert.equal(this.$('.control-label').attr('for'), 'uniqueId',
    'it has proper id set in label\'s `for` attribute');

  assert.equal(this.$('.form-control').attr('id'), 'uniqueId',
    'it has proper id set on input');
});

test('it has no validation state when rendered', function(assert) {
  setupInput(this);

  let $form = this.$('.form-group');
  assert.equal($form.attr('class'), 'form-group ember-view', 'it has no validation state when rendered');
});

test('it shows error validation state', function(assert) {
  setupInput(this, false);

  let $form = this.$('.form-group');

  fillInBlur(this, '.form-group', null);
  assert.equal($form.attr('class'), 'form-group has-error ember-view');
});

test('it shows success validation state', function(assert) {
  setupInput(this);

  let $form = this.$('.form-group');

  fillInBlur(this, '.form-group', 'asd');
  assert.equal($form.attr('class'), 'form-group has-success ember-view');
});

test('it resets validation state when property set to null', function(assert) {
  setupInput(this);

  this.set('name', null);
  let $form = this.$('.form-group');

  assert.equal($form.attr('class'), 'form-group ember-view');
});

test('it validates only after first focusOut', function(assert) {
  setupInput(this);

  let $form = this.$('.form-group');
  let $formControl = this.$('.form-control');

  $formControl.val('foo');

  assert.equal(
    $form.attr('class'),
   'form-group ember-view',
   'it shouldn\'t validate without focusOut'
 );

 $formControl.trigger('blur');

  assert.equal(
    $form.attr('class'),
   'form-group has-success ember-view',
   'it should validate after focusOut'
 );
});

test('it triggers the on-update action', function(assert){
  assert.expect(1);
  setupInput(this, true, (val) => {
    assert.equal(val, 'value', 'it triggers the action with proper argument');
  });

  fillInBlur(this, '.form-group', 'value');
});

test('it allows passing in backend errors', function(assert) {
  setupInput(this);
  let $form = this.$('.form-group');
  fillInBlur(this, '.form-group', 'value');
  this.set('backendErrors', { phone: ["can't be blank"] });
  assert.equal(
    $form.attr('class'),
    'form-group has-error ember-view',
    'it should set show an error'
  );
});
