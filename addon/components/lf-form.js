import Ember from 'ember';
import layout from '../templates/components/lf-form';
import validationParser from '../utils/validations-parser';
import ValidationLookup from '../utils/validation-lookup';

const { Component, computed } = Ember;

export default Component.extend({
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
    let parser = validationParser.create();
    let validations = parser.parseRule(rule);
    return this._verifyValidity(value, validations);
  },

  lookupValidator(validatorName) {
    let lookupService = ValidationLookup.create();
    return lookupService.lookupValidator(this.get('container'), validatorName);
  },

  getRulesFor: function(name) {
    return this.get(`rules.${name}`);
  },

  _verifyValidity(value, validations) {
    let validity = validations.map((validation) => {
      let validator = this.lookupValidator(validation.name);
      return validator.validate(value, validation.arguments);
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
