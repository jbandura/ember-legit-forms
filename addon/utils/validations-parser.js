import Ember from 'ember';

export default Ember.Object.extend({
  /**
   * Parses rule returning a validator POJO
   *
   * @param {string|Object} rule
   * @returns {Object} a POJO containing following keys:
   * name (name of the validator),
   * isFunction (determines whether we have a custom validator),
   * validate (validation function - only if custom validator),
   * arguments (arguments for the validator),
   * customMessage (message to be displayed)
   */
  parseRule(rule) {
    if(this._isFunction(rule)){
      // inline validator
      return [{ isFunction: true, validate: rule }];
    }

    // we have an object
    if(typeof rule !== 'string') {
      return this._parseObject(rule);
    }

    let rules = rule.split('|');

    //TODO: add caching
    return rules.map((ruleName) => {
      return this._constructValidatorObject(
        this._extractName(ruleName), this._extractArguments(ruleName)
      );
    });
  },
  /**
   * Extracts name from rule
   *
   * Eg. given a string `between(5,6)`` it would return `between`
   * @param {string} rule
   * @returns {string} validation name
   * @private
   */
  _extractName(rule) {
    return rule.replace(/\([a-zA-Z0-9,]+\)/, '');
  },

  /**
   * Extracts arguments from rule
   *
   * Eg. given a string `between(5,6)` it would return `[5,6]`
   * @param {string} rule
   * @returns {Array} validation arguments
   * @private
   */
  _extractArguments(rule) {
    let ruleName = this._extractName(rule);
    let regExp = new RegExp(`${ruleName}\\(([a-zA-Z0-9,]+)\\)`);
    let argListString = rule.replace(regExp, "$1");
    return argListString.split(',');
  },

  /**
   * Parses a rule when it's an object
   *
   * It handles two scenarios:
   * - we can have a rule like so { required: true, between: [5,6]}
   * - or in form of `{ required: { check: true, customMessage: 'foo'} }`
   * It parses those rules and returns a validator POJO similiar to parseRule
   *
   * @param {Object} rule
   * @returns {Object} a validator POJO (see parseRule)
   * @private
   */
  _parseObject(rule) {
    return Object.keys(rule).map((key) => {
      // we have a custom validator inside of hash
      if (key === 'inline') {
        return {
          isFunction: true,
          validate: rule[key]
        };
      }
      let ruleDefinition = rule[key];

      // we have the most verbose form:
      // [validator_name]: { check: [arguments], message: [message]}
      if (ruleDefinition.check) {
        return this._constructValidatorObject(key, ruleDefinition.check, ruleDefinition.message);
      }

      return this._constructValidatorObject(key, ruleDefinition);
    });
  },

  /**
   * Helper function to determine whether rule is a function
   * @param {*} rule
   * @returns {boolean}
   * @private
   */
  _isFunction(rule) {
    return !!(rule && rule.constructor && rule.call && rule.apply);
  },

  /**
   * Constructs validator objects
   * @param {string} key
   * @param {Array|Number|string} ruleDef: rule Definition
   * @param {string} [message]
   * @returns {Object} validator POJO
   * @private
   */
  _constructValidatorObject(key, ruleDef, message = null) {
    let obj = {
      name: key,
      arguments: Array.isArray(ruleDef) ? ruleDef: [ruleDef],
      isFunction: false
    };

    if(message) {
      obj.customMessage = message;
    }

    return obj;
  }

});
