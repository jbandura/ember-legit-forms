import Ember from 'ember';

export default Ember.Object.extend({
  defaultMessages: {
    "required": "can't be blank",
    "not a number": "must be a number",
    "too short": "too short"
  },

  getMessage(validation) {
    return this.get(`defaultMessages.${validation}`) || validation;
  }
});
