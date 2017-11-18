import validationLookup from '../utils/validation-lookup';
import validationParser from '../utils/validations-parser';
import messageProvider from '../utils/message-provider';
import LFValidationStrategy from './strategies/lf-validation';
import ChangesetStrategy from './strategies/changeset';
import Ember from 'ember';

const {
  computed,
  warn,
  get,
  set,
  getProperties,
  String: { w },
} = Ember;

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
  rules: computed({
    get() {
      return get(this, '_rules');
    },
    set(key, value) {
      if(value) return get(this, 'parserService').parseShared(value);
    }
  }),

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
  fields: computed('rules', 'changeset', function() {
    set(this, 'strategy.changeset', get(this, 'changeset'));
    return get(this, 'strategy').getFields();
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
    let fields = get(this, 'fields');

    return fields.reduce((acc, field) => {
       let fieldValue = get(field, 'valid');
       return acc && Boolean(fieldValue);
    }, true);
  }),

  init() {
    this._super(...arguments);
    const { rules, changeset } = getProperties(this, w('rules changeset'));

    if(!rules && !changeset) {
      return warn('[Ember Legit Forms] No rules hash provided. All fields will be valid no matter the input.');
    }

    if(rules && changeset) {
      return warn('[Ember Legit Forms] Passing in both rules and changeset is not supported.')
    }

    let strategyObj;
    if(rules) strategyObj = this._strategyObjectFactory('lfValidation', rules);
    if(changeset) strategyObj = this._strategyObjectFactory('changeset', changeset);

    set(this, 'strategy', strategyObj);
  },

  /**
   * Calculates whether field is valid and returns error messages in case it is not.
   *
   * @param {String} fieldName: name by which the field should be looked up in fields array
   * @param {String} value: value of the field that need to be validated
   * @returns {Object}
   */
  validate(fieldName, value) {
    return get(this, 'strategy').validate(get(this, 'fields'), fieldName, value, get(this, 'alwaysValid'));
  },

  _strategyObjectFactory(type, rules) {
    const strategyObj = { lfValidation: LFValidationStrategy, changeset: ChangesetStrategy }[type];
    const {
      parserService, messageProvider, lookupService, container, data
    } = getProperties(this, w('parserService messageProvider lookupService container data'));
    return new strategyObj(
      rules, parserService, messageProvider, lookupService, container, data
    );
  },
});
