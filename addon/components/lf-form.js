import Ember from 'ember';
import layout from '../templates/components/lf-form';
import formValidator from '../utils/form-validator';

const { Component, computed, observer } = Ember;

export default Component.extend({
  layout,
  formValidator: null,
  rules: null, //passed in
  data: null, //passed in
  _formValid: computed('formValidator.isFormValid', function() {
    if (this.get('formValidator')) {
      return this.get('formValidator.isFormValid');
    }

    return false;
  }),

  init() {
    this._super(...arguments);
    this.set('formValidator', formValidator.create({
      container: this.get('container'),
      rules: this.get('rules'),
      data: this.get('data')
    }));
  },

  dataChanged: observer('data', function() {
    this.get('formValidator').set('data', this.get('data'));
  }),

  actions: {
    validateChange(name, value) {
      let validityData = this.get('formValidator').getValidateFunction(name, value);
      this.sendAction('validityChanged', this.get('_formValid'));
      return validityData;
    }
  }
});
