import Ember from 'ember';

export default Ember.Object.extend({

  parseRule(rule) {
    if(this._isFunction(rule)){
      // inline validator
      return [{
        isFunction: true,
        validate: rule
      }];
    }

    if(typeof rule !== 'string') {
      return this._parseObject(rule);
    }

    let rules = rule.split('|');

    //TODO: add caching
    return rules.map((ruleName) => {
      return {
        name: this._extractName(ruleName),
        arguments: this._extractArguments(ruleName),
        isFunction: false
      };
    });
  },

  _extractName(name) {
    return name.replace(/\([a-zA-Z0-9,]+\)/, '');
  },

  _extractArguments(name) {
    let ruleName = this._extractName(name);
    let regExp = new RegExp(`${ruleName}\\(([a-zA-Z0-9,]+)\\)`);
    let argListString = name.replace(regExp, "$1");
    return argListString.split(',');
  },

  _parseObject(rule) {
    return Object.keys(rule).map((key) => {
      return {
        name: key,
        arguments: (Array.isArray(rule[key])) ? rule[key] : [rule[key]],
        isFunction: false
      };
    });
  },

  _isFunction(rule) {
    return !!(rule && rule.constructor && rule.call && rule.apply);
  }

});
