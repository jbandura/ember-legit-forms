import Ember from 'ember';

const { isBlank } = Ember;

export default Ember.Object.extend({
  validate(value, validator) {
    if (isBlank(value)) { return; }

    let [fieldName] = Ember.get(validator, 'arguments');

    if(value !== Ember.get(validator, `field:${fieldName}`)) {
      return {
        message: 'mustBeSame',
        replacements: { fieldName }
      };
    }
  }
});
