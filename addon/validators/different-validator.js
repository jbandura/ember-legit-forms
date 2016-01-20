import Ember from 'ember';

const { isBlank } = Ember;

export default Ember.Object.extend({
  validate(value, validator) {
    if (isBlank(value)) { return; }

    let [fieldName] = validator.get('arguments');

    if(value === validator.get(`field:${fieldName}`)) {
      return {
        message: 'mustBeDifferent',
        replacements: { fieldName }
      };
    }
  }
});
