import EmberObject, { get } from '@ember/object';

export default EmberObject.extend({
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

    if(get(this, `validatorsCache.${validator}`)) {
      return get(this, `validatorsCache.${validator}`);
    }

    let localValidator = owner.lookup(`validator:${validator}-validator`);

    if(localValidator) {
      get(this, 'validatorsCache')[validator] = localValidator;
      return localValidator;
    }

    //we have no custom implementation

    let addonValidator = owner.lookup(`ember-legit-forms@validator:${validator}-validator`);

    get(this, 'validatorsCache')[validator] = addonValidator;
    return addonValidator;
  }
});
