import Ember from 'ember';

const { isBlank } = Ember;

export default Ember.Object.extend({
  validate(value) {
    if (isBlank(value)) {
      return 'required';
    }
  }
});
