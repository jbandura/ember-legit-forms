import Ember from 'ember';

export default Ember.Object.extend({
  validate(value, args) {
    let length = parseInt(args[0]);
    return value.length >= length;
  }
});
