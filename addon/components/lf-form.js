import Ember from 'ember';
import layout from '../templates/components/lf-form';
import validationParser from '../utils/validations-parser';
import validationLookup from '../utils/validation-lookup';
import messageProvider from '../utils/message-provider';

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
    let lookupService = validationLookup.create();
    return lookupService.lookupValidator(this.get('container'), validatorName);
  },

  getRulesFor: function(name) {
    return this.get(`rules.${name}`);
  },

  _verifyValidity(value, validations) {
    let messages = [];
    let msgProvider = messageProvider.create();
    let validity = validations.map((validation) => {
      let validator = this.lookupValidator(validation.name);
      let isValid = validator.validate(value, validation.arguments);
      if(!isValid) {
        messages.push(msgProvider.getMessage(validation.name));
      }
      return isValid;
    });
    let isFieldValid = validity.reduce((acc, value) => {
      return acc && value;
    }, true);
    
    return {
      messages,
      isValid: isFieldValid
    };
  },

  actions: {
    validateChange(name, value) {
      return this.validateField(name, value);
    }
  }
});
