import Ember from 'ember';

export default Ember.Object.extend({
  validate(validator) {
    let length = parseInt(validator.get('arguments')[0]);
    validator.set('isValid', validator.get('value.length') >= length);
    if (!validator.get('isValid')) {
      validator.set('message', 'too short');
    }
    return validator;
  }
});
