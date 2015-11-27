import Ember from 'ember';
import getValidators from '../utils/get-validators';
import layout from '../templates/components/lf-form';

const { Component, computed } = Ember;

export default Component.extend({
  layout,
  asd: getValidators(),
  rules: null, //passed in
  fields: computed('rules', function() {
    let rules = this.get('rules');
    let resultObj = {};

    Object.keys(rules).forEach((key) => {
      resultObj[key] = null;
    });

    return resultObj;
  }),

  validateField(fieldName, value) {
    let rule = this.get('rules')[fieldName];
    console.log('validating with', rule, value);
    // TODO: add validators lookup
    if(rule === 'required') {
      return value !== '';
    }
  },
  
  actions: {
    validateChange(name, value) {
      return this.validateField(name, value);
    }
  }
});
