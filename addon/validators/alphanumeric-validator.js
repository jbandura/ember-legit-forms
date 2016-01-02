import Ember from 'ember';

const { isBlank } = Ember;

export default Ember.Object.extend({
  validate(value) {
    let valid = /^[a-z0-9]+$/i.test(value) || isBlank(value);
    if (!valid) {
      return 'mustBeAlphanumeric';
    }
  }
});
