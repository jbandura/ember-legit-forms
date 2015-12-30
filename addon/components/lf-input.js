import Ember from 'ember';
import layout from '../templates/components/lf-input';
import LFInputMixin from '../mixins/lf-input-mixin';

const { Component, isNone } = Ember;

export default Component.extend(LFInputMixin, {
  layout,
  placeholder: null, //passed in
  _value: null,

  focusOut() {
    this.set('_edited', true);
    let value = this.get('_value') || this.get('property');
    this.validateField(value);
  },

  actions: {
    valueChanged(value) {
      this.set('_value', value);
      if(isNone(value)) {
        // we have to reset fields
        this.clearValidations();
        return;
      }
      if (this.get('property') !== value) {
        this.set('_edited', true);
      }
      if (this.get('_edited')) {
        this.validateField(value);
      }
    }
  }
});
