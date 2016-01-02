import Ember from 'ember';

const { isBlank } = Ember;

export default Ember.Object.extend({
  validate(value) {
    let valid = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i.test(value) || isBlank(value);
    if (!valid) {
      return 'mustBeValidURL';
    }
  }
});
