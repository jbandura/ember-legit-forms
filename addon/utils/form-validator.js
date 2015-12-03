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
    return this._calculateFields();
  }),
  isFormValid: computed('fields', function() {
    return this._calculateValidity();
  }),

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
      let validator = this.get('lookupService').lookupValidator(
        this.get('container'), validation.name
      );
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

  _calculateFields() {
    let rules = this.get('rules');
    let resultObj = {};

    Object.keys(rules).forEach((key) => {
      resultObj[key] = null;
    });

    return resultObj;
  },

  _calculateValidity(fields) {
    let isValid = true;

    Object.keys(fields).forEach((key) => {
      console.log(key, fields[key]);
      isValid = isValid && fields[key];
    });

    return isValid;
  }
});
