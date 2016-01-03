import Ember from 'ember';

const { isBlank } = Ember;

export default Ember.Object.extend({
  validate(value, validator) {
    if (isBlank(value)) { return; }
    let size = parseInt(validator.get('arguments')[0]);
    if (value.length !== size) {
      return {
        message: 'mustBeOfSize',
        replacements: {
          size
        }
      };
    }
  }
});
