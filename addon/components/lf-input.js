import Ember from 'ember';
import layout from '../templates/components/lf-input';
import LFInputMixin from '../mixins/lf-input-mixin';

const { Component, isNone } = Ember;

export default Component.extend(LFInputMixin, {
  layout,
  placeholder: null, //passed in
  /**
   * Tracks the value of the input field
   *
   * We have to keep the input value to validate it after each change - we can't
   * observe property since we're not using two-way data binding
   * @param _value
   * @type {String}
   */
  _value: null,

  focusOut() {
    this.set('_edited', true);
    let value = isNone(this.get('_value')) ? this.get('property') : this.get('_value');
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
      if (this.get('_edited')) {
        this.validateField(value);
      }
    }
  }
});
