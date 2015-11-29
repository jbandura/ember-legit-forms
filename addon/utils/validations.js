import Ember from 'ember';

const { Mixin } = Ember;

export default Mixin.create({
  rules: null,
  validatorsCache: {},
  lookupValidator(validator) {

    if(this.get(`validatorsCache.${validator}`)) {
      return this.get(`validatorsCache.${validator}`);
    }

    let container = this.get('container');
    let localValidator = container.lookup(`validator:${validator}-validator`);

    if(localValidator) {
      this.get('validatorsCache')[validator] = localValidator;
      return localValidator;
    }

    //we have no custom implementation

    let addonValidator = container.lookup(`ember-legit-forms@validator:${validator}-validator`);

    this.get('validatorsCache')[validator] = addonValidator;
    return addonValidator;
  },
  initialize: function(rules) {
    this.set('rules', rules);
  },

  getRulesFor: function(name) {
    return this.get(`rules.${name}`);
  }
});
