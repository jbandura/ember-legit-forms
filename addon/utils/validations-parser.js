import Ember from 'ember';

export default Ember.Object.extend({

  parseRule(rule) {
    let rules = rule.split('|');

    //TODO: add caching
    return rules.map((ruleName) => {
      return {
        name: this._extractName(ruleName),
        arguments: this._extractArguments(ruleName)
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
  }

});
