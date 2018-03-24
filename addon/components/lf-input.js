import Component from '@ember/component';
import { isNone } from '@ember/utils';
import { observer, set, get } from '@ember/object';
import { once } from '@ember/runloop';
import layout from '../templates/components/lf-input';
import LFInputMixin from '../mixins/lf-input-mixin';

export default Component.extend(LFInputMixin, {
  layout,
  _inputName: 'lf-input',
  placeholder: null, //passed in
  inputClass: null,
  addonPlacement: 'before',
  inputComponent: 'one-way-input',

  //eslint-disable-next-line ember/no-observers
  propChanged: observer('property', function() {
    if (isNone(get(this, 'property'))) {
      this.clearValidations();
    }
  }),

  actions: {
    valueChanged(value) {
      once(() => {
        set(this, '_value', value);
        this.callUpdateHook(value);
        this.validateField(value);
        if (get(this, '_edited')) {
          this.showValidationState();
        }
      });
    }
  },

  focusOut() {
    set(this, '_edited', true);
    let value = isNone(get(this, '_value')) ? get(this, 'property') : get(this, '_value');
    this.validateField(value);
    this.showValidationState();
  },

});
