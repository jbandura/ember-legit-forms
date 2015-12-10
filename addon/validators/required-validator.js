import Ember from 'ember';

export default Ember.Object.extend({
  validate(value) {
    //TODO: improve checking
    if(value === '') {
      return 'required';
    }
  }
});
