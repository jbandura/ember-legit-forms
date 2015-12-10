import Ember from 'ember';

export default Ember.Object.extend({
  validate(validator) {
    let minLength = parseInt(validator.get('arguments')[0]);
    let maxLength = parseInt(validator.get('arguments')[1]);
    let valueLength = validator.get('value').length;
    let isValid = valueLength >= minLength && valueLength <= maxLength;
    validator.set('isValid', isValid);
    if (!validator.get('isValid')) {
      validator.set('message', 'must be between');
    }
    return validator;
  }
});
