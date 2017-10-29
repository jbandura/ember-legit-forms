import Ember from 'ember';
import validatorObject from '../../utils/validator-object';

const { setProperties, set, isNone } = Ember;

export default class {
  constructor(rules, parserService, messageProvider, lookupService, container, data) {
    this.parserService = parserService;
    this.messageProvider = messageProvider;
    this.lookupService = lookupService;
    this.container = container;
    this.data = data;
    this.rules = rules;
  }

  getFields() {
    if (!this.rules) return [];

    return Ember.A(Object.keys(this.rules).map(name => {
      return Ember.Object.create({
        name, valid: null, value: null
      });
    }));
  }

  getValidateFunction(fields, fieldName, value, alwaysValid) {
    if (!this.rules || !this.rules[fieldName]) return alwaysValid;

    const rule = this.rules[fieldName];
    let validations = this.parserService.parseRule(rule);
    let fieldValidation = this._verifyValidity(fields, value, validations, fieldName);
    let field = fields.findBy('name', fieldName);
    setProperties(field, {
      valid: fieldValidation.isValid,
      value: value
    });

    return fieldValidation;
  }

  /**
   * This function does the heavy lifting of calculating whether field is valid
   *
   * @param {String} value
   * @param {Object[]} validations
   * @returns {Object} a message and valid state
   * @private
   */
  _verifyValidity(fields, value, validations) {
    let messages = [];
    set(this.messageProvider, 'container', this.container);
    let validity = validations.map((validation) => {
      // detect whether we have a custom validator
      // if not then we have to look it up
      let validator = (validation.isFunction) ?
        validation :
        this.lookupService.lookupValidator(
          this.container, validation.name
        )
      ;
      let msg = validator.validate(
        value,
        validatorObject.create({
          fields,
          arguments: validation.arguments,
          data: this.data
        })
      );
      if (msg) {
        messages.push(
          validation.customMessage || this.messageProvider.getMessage(msg)
        );
      }
      return isNone(msg);
    });
    let isValid = validity.reduce((acc, value) => {
      return acc && value;
    }, true);

    return { messages, isValid };
  }
}
