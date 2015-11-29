import Ember from 'ember';

export default Ember.Object.extend({
  defaultMessages: {
    "required": "can't be blank",
    "numeric": "must be a number",
    "min": "too short"
  },

  getMessage(validation) {
    return this.get(`defaultMessages.${validation}`);
  }
});
