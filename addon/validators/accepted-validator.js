import Ember from 'ember';

export default Ember.Object.extend({
  validate(value) {
    if (!Ember.A([1, '1', true, 'on']).contains(value)) {
      return 'mustBeAccepted';
    }
  }
});
