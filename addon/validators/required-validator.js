import Ember from 'ember';

const { isPresent } = Ember;

export default Ember.Object.extend({
  validate(value) {
    if(!isPresent(value)) {
      return 'required';
    }
  }
});
