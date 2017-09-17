import Ember from 'ember';

const { isBlank } = Ember;

export default Ember.Object.extend({
  validate(value, validator) {
    if (isBlank(value)) { return; }
    let [regex] = Ember.get(validator, 'arguments');
    if(!regex.test(value)) {
      return 'mustMatchRegex';
    }
  }
});
