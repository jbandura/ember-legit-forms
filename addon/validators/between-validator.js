import Ember from 'ember';

const { isBlank } = Ember;

export default Ember.Object.extend({
  validate(value, validator) {
    if (isBlank(value)) { return; }

    let minLength = parseInt(Ember.get(validator, 'arguments')[0]);
    let maxLength = parseInt(Ember.get(validator, 'arguments')[1]);
    let isValid = value && value.length >= minLength && value.length <= maxLength;
    if (!isValid) {
      return {
        message: 'mustBeBetween',
        replacements: {
          minLength,
          maxLength
        }
      };
    }
  }
});
