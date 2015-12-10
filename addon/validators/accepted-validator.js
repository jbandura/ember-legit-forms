import Ember from 'ember';

export default Ember.Object.extend({
  validate(value) {
    let valid = value === 1 || value === '1' || value === true;
    if (!valid) {
      return 'must be accepted';
    }
  }
});
