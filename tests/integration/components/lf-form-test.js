import hbs from 'htmlbars-inline-precompile';
import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('lf-form', 'Integration | Component | lf-form', {
  integration: true
});

test('it calls the on-submit action', function(assert){
  assert.expect(1);
  this.set('rules', {});
  this.set('onSubmit', () => {
    assert.ok(true, 'action is called on submit');
  });
  this.render(hbs`
  {{#lf-form rules=rules onSubmit=(action onSubmit) as |v|}}
    {{lf-input
      name='name'
      validate=v
    }}
    <button class="js-submit">Submit</button>
  {{/lf-form}}`);

  this.$('.js-submit').trigger('click');
});

