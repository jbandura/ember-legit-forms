import validationLookup from '../utils/validation-lookup';
import validationParser from '../utils/validations-parser';
import messageProvider from '../utils/message-provider';
import Ember from 'ember';

const { computed, isNone } = Ember;

export default Ember.Object.extend({
  lookupService: validationLookup.create(),
  parserService: validationParser.create(),
  messageProvider: messageProvider.create(),

  rules: null,
  container: null,
  fields: computed('rules', function() {
    let rules = this.get('rules');
    let resultObj = Ember.A();

    Object.keys(rules).forEach((key) => {
      resultObj.pushObject(Ember.Object.create({
        name: key,
        valid: null,
        value: null
      }));
    });

    return resultObj;
  }),
  isFormValid: computed('fields.@each.valid', function() {
    let fields = this.get('fields');

    return fields.reduce((acc, field) => {
       let fieldValue = field.get('valid');
       return acc && Boolean(fieldValue);
    }, true);
  }),

  getValidateFunction(fieldName, value) {
    let rule = this.get('rules')[fieldName];
    let validations = this.get('parserService').parseRule(rule);
    let fieldValidation = this._verifyValidity(value, validations, fieldName);
    this.get('fields').findBy('name', fieldName).setProperties({
      valid: fieldValidation.isValid,
      value: value
    });
    return fieldValidation;
  },

  _verifyValidity(value, validations) {
    let messages = [];
    this.get('messageProvider').set('container', this.get('container'));
    let validity = validations.map((validation) => {
      let validator = (validation.isFunction) ?
        validation :
        this.get('lookupService').lookupValidator(
          this.get('container'), validation.name
        )
      ;
      let msg = validator.validate(
        value,
        Ember.Object.create({
          arguments: validation.arguments,
          fields: this.get('fields')
        })
      );
      if (msg) {
        messages.push(this.get('messageProvider').getMessage(msg));
      }
      return isNone(msg);
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
