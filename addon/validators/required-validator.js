import Ember from 'ember';

export default Ember.Object.extend({
  validate(validator) {
    let value = validator.get('value');
    //TODO: improve checking
    validator.set('isValid', value !== '');
    if(!validator.get('isValid')) {
      validator.set('message', 'required');
    }
    return validator;
  }
});
