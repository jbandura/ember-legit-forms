import EmberObject, { get } from '@ember/object';

export default EmberObject.extend({
  validate(value, validator) {
    const allowedDecimals = validator && get(validator, 'arguments')[0];
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
