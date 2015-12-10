import Ember from 'ember';

export default Ember.Object.extend({
  validate(value, validator) {
    let [regex] = validator.get('arguments');
    if(!regex.test(value)) {
      return 'match regex';
    }
  }
});
