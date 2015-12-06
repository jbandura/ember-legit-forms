import Ember from 'ember';

const { isEmpty } = Ember;

export default Ember.Object.extend({
  validate(validator) {
    let value = validator.get('value');
    validator.set('isValid', /^[+\-]?\d+$/.test(value) || isEmpty(value));
    if(!validator.get('isValid')) {
      validator.set('message', 'not a number');
    }
    return validator;
  }
});
