import Ember from 'ember';

const { isBlank } = Ember;

export default Ember.Object.extend({
  validate(value) {
    let valid = /^[a-zA-Z]+$/i.test(value) || isBlank(value);
    if (!valid) {
      return 'mustBeAlpha';
    }
  }
});
