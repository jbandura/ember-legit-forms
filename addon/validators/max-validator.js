import Ember from 'ember';

export default Ember.Object.extend({
  validate(value, validator) {
    let length = parseInt(validator.get('arguments')[0]);
    if (value.length > length) {
      return 'too long';
    }
  }
});
