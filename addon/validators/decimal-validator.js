import Ember from 'ember';

export default Ember.Object.extend({
  validate(value, validator) {
    const allowedDecimals = validator && Ember.get(validator, 'arguments')[0];
    const decimals = String(value).split('.')[1];

    if (isNaN(value)) {
      return 'mustBeNumeric';
    }

    if (allowedDecimals && decimals &&
      decimals.length > allowedDecimals
    ) {
      return {
        message: 'mustHaveFeverDecimals',
        replacements: {
          allowedDecimals,
        },
      };
    }
  }
});
