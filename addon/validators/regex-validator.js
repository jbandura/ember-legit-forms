import Ember from 'ember';

const { isBlank } = Ember;

export default Ember.Object.extend({
  validate(value, validator) {
    if (isBlank(value)) { return; }
    let [regex] = validator.get('arguments');
    if(!regex.test(value)) {
      return 'mustMatchRegex';
    }
  }
});
