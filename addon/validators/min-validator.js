import Ember from 'ember';

export default Ember.Object.extend({
  validate(value, validator) {
    let length = parseInt(validator.get('arguments')[0]);
    let isValid = value.length >= length;
    if (!isValid) {
      return 'too short';
    }
  }
});
