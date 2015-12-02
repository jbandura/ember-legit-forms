import validationLookup from '../utils/validation-lookup';
import validationParser from '../utils/validations-parser';
import messageProvider from '../utils/message-provider';
import Ember from 'ember';

const { computed } = Ember;

export default Ember.Object.extend({
  lookupService: validationLookup.create(),
  parserService: validationParser.create(),
  messageProvider: messageProvider.create(),

  rules: null,
  container: null,
  fields: computed('rules', function() {
    return this.calculateFields();
  }),
  isFormValid: computed('fields', function() {
    let fields = this.get('fields');
    let isValid = true;

    Object.keys(fields).forEach((key) => {
      console.log(key, fields[key]);
      isValid = isValid && fields[key];
    });

    return isValid;
  }),

  calculateFields() {
    let rules = this.get('rules');
    let resultObj = {};

    Object.keys(rules).forEach((key) => {
      resultObj[key] = null;
    });

    return resultObj;
  },

  calculateValidity(fields) {
    let isValid = true;

    Object.keys(fields).forEach((key) => {
      console.log(key, fields[key]);
      isValid = isValid && fields[key];
    });

    return isValid;
  },

  lookupValidator(validatorName) {
    let lookupService = validationLookup.create();
    return lookupService.lookupValidator(this.get('container'), validatorName);
  },

  getValidateAction(fieldName, value) {
    let rule = this.get('rules')[fieldName];
    let parser = validationParser.create();
    let validations = parser.parseRule(rule);
    let fieldValidation = this._verifyValidity(value, validations, fieldName);
    this.set(`fields.${fieldName}`, fieldValidation.isValid);
    return fieldValidation;
  },

  getValidateFunction(fieldName, value) {
    let rule = this.get('rules')[fieldName];
    let validations = this.get('parserService').parseRule(rule);
    let fieldValidation = this._verifyValidity(value, validations, fieldName);
    this.set(`fields.${fieldName}`, fieldValidation.isValid);
    return fieldValidation;
  },

  _verifyValidity(value, validations) {
    let messages = [];
    let validity = validations.map((validation) => {
      let validator = this.lookupValidator(validation.name);
      let isValid = validator.validate(value, validation.arguments);
      if(!isValid) {
        messages.push(this.get('messageProvider').getMessage(validation.name));
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


});
