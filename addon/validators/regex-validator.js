import Ember from 'ember';

export default Ember.Object.extend({
  validate(validator) {
    let value = validator.get('value');
    let [regex] = validator.get('arguments');
    validator.set('isValid', regex.test(value));
    if(!validator.get('isValid')) {
      validator.set('message', 'match regex');
    }
    return validator;
  }
});
