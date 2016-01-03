import Ember from 'ember';

export default Ember.Object.extend({
  container: null,
  defaultMessages: {
    'mustBeAccepted': 'must be accepted',
    'mustBeAlphanumeric': 'must be alphanumeric',
    'mustBeBetween': 'must be between {{minLength}} and {{maxLength}}',
    'tooLong': 'too long',
    'tooShort': 'too short',
    'mustBeNumeric': 'must be a number',
    'mustMatchRegex': 'must have a proper format',
    'mustBeValidURL': 'must be a valid URL',
    "required": "can't be blank",
    "mustBeInArray": 'value not allowed',
    "mustNotBeInArray": 'value not allowed',
    "mustBeValidEmail": 'must be a valid email address',
    "mustBeAlpha": 'must consist only of alphabetic characters',
    "mustBeOfSize": 'must be exactly {{size}} characters long',
    "mustBeSame": 'must match {{fieldName}}'
  },

  /**
   * gets a validation message based on string returned
   *
   * @param {string|Object} if message is a string it is looked up in
   *  defaultMessages/i18n. If it's an object it should contain keys message
   *  and replacements. All occurences of replacements in message will be then
   *  replaced according to the replacements hash.
   */
  getMessage(validation) {
    if (typeof validation === 'string' || validation instanceof String) {
      return this._fetchMessage(validation, {});
    }

    return this._fetchMessage(validation.message, validation.replacements);
  },

  _fetchMessage(msg, replacements) {
    if(Ember.i18n) {
      return Ember.i18n.t(`validation.${msg}`, replacements);
    }
    let i18nService = this.get('container') ? this.get('container').lookup('service:i18n') : null;
    if (i18nService) {
      return i18nService.t(`validation.${msg}`, replacements);
    }
    return this._interpolateMessage(msg, replacements);
  },

  _interpolateMessage(msg, replacements) {
    let message = this.get(`defaultMessages.${msg}`);
    if (!message) {
      return msg;
    }
    Object.keys(replacements).forEach((key) => {
      message = message.replace(`{{${key}}}`, replacements[key]);
    });

    return message;
  }
});
