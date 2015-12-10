import Ember from 'ember';

export default Ember.Object.extend({
  validate(value, validator) {
    let minLength = parseInt(validator.get('arguments')[0]);
    let maxLength = parseInt(validator.get('arguments')[1]);
    let isValid = value.length >= minLength && value.length <= maxLength;
    if (!isValid) {
      return 'message', 'must be between';
    }
  }
});
