import Ember from 'ember';

const { isBlank } = Ember;

export default Ember.Object.extend({
  validate(value) {
    let valid = /^(ftp|http|https):\/\/[^ "]+$/.test(value) || isBlank(value);
    if (!valid) {
      return 'must be alphanumeric';
    }
  }
});
