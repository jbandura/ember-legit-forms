import Ember from 'ember';
import layout from '../templates/components/lf-form';
import ValidationMixin from '../utils/validations';
import ValidationParser from '../utils/validations-parser';

const { Component, computed } = Ember;

export default Component.extend(ValidationMixin, {
  layout,
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
    let parser = new ValidationParser();
    let validations = parser.parseRule(rule);
    return this._verifyValidity(value, validations);
  },

  _verifyValidity(value, validations) {
    let validity = validations.map((validation) => {
      let validator = this.lookupValidator(validation);
      return validator.validate(value);
    });

    return validity.reduce((acc, value) => {
      return acc && value;
    }, true);
  },

  actions: {
    validateChange(name, value) {
      return this.validateField(name, value);
    }
  }
});
