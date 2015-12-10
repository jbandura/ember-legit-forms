import Ember from 'ember';

const { isEmpty } = Ember;

export default Ember.Object.extend({
  validate(value) {
    if(!(/^[+\-]?\d+$/.test(value) || isEmpty(value))) {
      return 'not a number';
    }
  }
});
