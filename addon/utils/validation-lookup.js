import Ember from 'ember';

export default Ember.Object.extend({
  /**
   * Cached validators
   * @param validatorsCache
   * @type {Object}
   */
  validatorsCache: {},

  /**
   * Lookup given validator on the owner. Local validators take precedence.
   * @param {Object} owner
   * @param {string} validator: validator name
   */
  lookupValidator(owner, validator) {

    if(Ember.get(this, `validatorsCache.${validator}`)) {
      return Ember.get(this, `validatorsCache.${validator}`);
    }

    let localValidator = owner.lookup(`validator:${validator}-validator`);

    if(localValidator) {
      Ember.get(this, 'validatorsCache')[validator] = localValidator;
      return localValidator;
    }

    //we have no custom implementation

    let addonValidator = owner.lookup(`ember-legit-forms@validator:${validator}-validator`);

    Ember.get(this, 'validatorsCache')[validator] = addonValidator;
    return addonValidator;
  }
});
