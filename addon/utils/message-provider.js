import Ember from 'ember';

export default Ember.Object.extend({
  container: null,
  defaultMessages: {
    "required": "can't be blank",
    "not a number": "must be a number",
    "too short": "too short"
  },

  getMessage(validation) {
    if(Ember.i18n && Ember.i18n.t(validation)) {
      return Ember.i18n.t(validation);
    }
    let i18nService = this.get('container') ? this.get('container').lookup('service:i18n') : null;
    if (i18nService && i18nService.t(validation)) {
      return i18nService.t(validation);
    }
    return this.get(`defaultMessages.${validation}`) || validation;
  }
});
