import validationLookup from '../utils/validation-lookup';
import validationParser from '../utils/validations-parser';
import messageProvider from '../utils/message-provider';
import validatorObject from '../utils/validator-object';
import Ember from 'ember';

const { computed, isNone } = Ember;

export default Ember.Object.extend({
  lookupService: validationLookup.create(),
  parserService: validationParser.create(),
  messageProvider: messageProvider.create(),

  /**
   * ember's container injected from lf-form component
   * @param container
   * @type {Object}
   */
  container: null,

  /**
   * rules passed from lf-form component
   * @param {Object}
   */
  rules: null,

  /**
   * Custom data can be passed in form of a POJO if they're required for inline validations.
   *
   * @property data
   * @type Object
   */
  data: null,

  /**
   * Object that is returned in case when no rule is present for current input
   * or rules hash is not present at all. It marks the form as always valid.
   *
   * @property alwaysValid
   * @type Object
   */
  alwaysValid: { isValid: true, messages: [], noRules: true},

  /**
   * Represents all of the registered fields
   *
   * Fields are registered when the rules hash is passed
   * to the lf-form component. They can be then looked up by the
   * rule name, eg. if you define a following rules hash: `{ name: 'required'}`
   * the field value and valid state can be looked up by using the `name` string.
   * @property fields
   * @type Array
   */
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

  /**
   * Valid state of the whole form
   *
   * This property is calculated checking valid states of each field defined
   * in the rules hash
   * @property isFormValid
   * @type boolean
   */
  isFormValid: computed('fields.@each.valid', function() {
    let fields = this.get('fields');

    return fields.reduce((acc, field) => {
       let fieldValue = field.get('valid');
       return acc && Boolean(fieldValue);
    }, true);
  }),

  init() {
    this._super(...arguments);
    this.set('rules', this.get('parserService').parseShared());
  },

  /**
   * Calculates whether field is valid and returns error messages in case it is not.
   *
   * @param {String} fieldName: name by which the field should be looked up in fields array
   * @param {String} value: value of the field that need to be validated
   * @returns {Object}
   */
  getValidateFunction(fieldName, value) {
    let rule = this.get('rules')[fieldName];
    if (rule) {
      let validations = this.get('parserService').parseRule(rule);
      let fieldValidation = this._verifyValidity(value, validations, fieldName);
      let field = this.get('fields').findBy('name', fieldName);
      field.setProperties({
        valid: fieldValidation.isValid,
        value: value
      });

      return fieldValidation;
    }
    //when no rules provided
    return { isValid: true, messages: [], noRules: true};
  },

  /**
   * This function does the heavy lifting of calculating whether field is valid
   *
   * @param {String} value
   * @param {Object[]} validations
   * @returns {Object} a message and valid state
   * @private
   */
  _verifyValidity(value, validations) {
    let messages = [];
    this.get('messageProvider').set('container', this.get('container'));
    let validity = validations.map((validation) => {
      // detect whether we have a custom validator
      // if not then we have to look it up
      let validator = (validation.isFunction) ?
        validation :
        this.get('lookupService').lookupValidator(
          this.get('container'), validation.name
        )
      ;
      let msg = validator.validate(
        value,
        validatorObject.create({
          arguments: validation.arguments,
          fields: this.get('fields'),
          data: this.get('data')
        })
      );
      if (msg) {
        messages.push(
          validation.customMessage || this.get('messageProvider').getMessage(msg)
        );
      }
      return isNone(msg);
    });
    let isValid = validity.reduce((acc, value) => {
      return acc && value;
    }, true);

    return { messages, isValid };
  },
});
