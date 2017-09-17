import Ember from 'ember';

const { isBlank } = Ember;

export default Ember.Object.extend({
  validate(value) {
    if(!(/^[+-]?\d+$/.test(value) || isBlank(value))) {
      return 'mustBeNumeric';
    }
  }
});
