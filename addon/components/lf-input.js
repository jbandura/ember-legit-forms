import Ember from 'ember';
import layout from '../templates/components/lf-input';
import LFInputMixin from '../mixins/lf-input-mixin';

const { Component, isNone, run } = Ember;

export default Component.extend(LFInputMixin, {
  layout,
  placeholder: null, //passed in

  focusOut() {
    this.set('_edited', true);
    let value = isNone(this.get('_value')) ? this.get('property') : this.get('_value');
    this.validateField(value);
  },

  actions: {
    valueChanged(value) {
      run.once(() => {
        this.set('_value', value);
        this.callUpdateHook(value);
        if (isNone(value)) {
          // we have to reset fields
          this.clearValidations();
          return;
        }
        if (this.get('_edited')) {
          this.validateField(value);
        }
      });
    }
  }
});
