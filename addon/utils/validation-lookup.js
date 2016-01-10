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

    if(this.get(`validatorsCache.${validator}`)) {
      return this.get(`validatorsCache.${validator}`);
    }

    let localValidator = owner.lookup(`validator:${validator}-validator`);

    if(localValidator) {
      this.get('validatorsCache')[validator] = localValidator;
      return localValidator;
    }

    //we have no custom implementation

    let addonValidator = owner.lookup(`ember-legit-forms@validator:${validator}-validator`);

    this.get('validatorsCache')[validator] = addonValidator;
    return addonValidator;
  }
});
