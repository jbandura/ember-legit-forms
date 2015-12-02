import Ember from 'ember';
import layout from '../templates/components/lf-form';
import formValidator from '../utils/form-validator';

const { Component, computed } = Ember;

export default Component.extend({
  layout,
  formValidator: formValidator.create(),
  rules: null, //passed in
  fields: computed.alias('formValidator.fields'),
  isFormValid: computed.alias('formValidator.isFormValid'),

  init() {
    this._super(...arguments);
    this.get('formValidator').setProperties({
      rules: this.get('rules'),
      container: this.get('container')
    });
  },

  actions: {
    validateChange(name, value) {
      return this.get('formValidator').getValidateFunction(name, value);
    }
  }
});
