import Ember from 'ember';

const { isEmpty } = Ember;

export default Ember.Object.extend({
  validate(value) {
    let valid = /^[a-z0-9]+$/i.test(value) || isEmpty(value);
    if (!valid) {
      return 'must be alphanumeric';
    }
  }
});
