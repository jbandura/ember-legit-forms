import Ember from 'ember';

const { isBlank } = Ember;

export default Ember.Object.extend({
  validate(value, validator) {
    if (isBlank(value)) { return; }
    let array = Ember.A(Ember.get(validator, 'arguments'));

    if (!array.contains(value)) {
      return 'mustBeInArray';
    }
  }
});
