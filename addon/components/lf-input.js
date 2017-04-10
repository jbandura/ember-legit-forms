import Ember from 'ember';
import layout from '../templates/components/lf-input';
import LFInputMixin from '../mixins/lf-input-mixin';

const {
  Component,
  isNone,
  observer,
  run: { once },
} = Ember;

export default Component.extend(LFInputMixin, {
  layout,
  _inputName: 'lf-input',
  placeholder: null, //passed in
  addonPlacement: 'before',
  propChanged: observer('property', function() {
    if (isNone(this.get('property'))) {
      this.clearValidations();
    }
  }),

  inputComponent: 'one-way-input',

  focusOut() {
    this.set('_edited', true);
    let value = isNone(this.get('_value')) ? this.get('property') : this.get('_value');
    this.validateField(value);
    this.showValidationState();
  },

  actions: {
    valueChanged(value) {
      once(() => {
        this.set('_value', value);
        this.callUpdateHook(value);
        this.validateField(value);
        if (this.get('_edited')) {
          this.showValidationState();
        }
      });
    }
  }
});
