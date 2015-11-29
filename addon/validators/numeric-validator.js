import Ember from 'ember';

const { isEmpty } = Ember;

export default Ember.Object.extend({
  validate(value) {
    return /^[+\-]?\d+$/.test(value) || isEmpty(value);
  }
});
