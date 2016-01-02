import Ember from 'ember';

const { isBlank } = Ember;

export default Ember.Object.extend({
  validate(value, validator) {
    if (isBlank(value)) { return; }

    let length = parseInt(validator.get('arguments')[0]);
    if (!value || value.length < length) {
      return {
        message: 'tooShort',
        replacements: {
          length
        }
      };
    }
  }
});
