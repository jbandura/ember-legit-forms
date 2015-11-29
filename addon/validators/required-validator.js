import Ember from 'ember';

export default Ember.Object.extend({
  validate(value) {
    return value !== '';
  }
});
