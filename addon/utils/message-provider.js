import Ember from 'ember';

export default Ember.Object.extend({
  container: null,
  /**
   * A dictionary of default messages - can be overriden by i18n
   * @param defaultMessages
   * @type {Object}
   */
  defaultMessages: {
    'mustBeAccepted': 'must be accepted',
    'mustBeAlphanumeric': 'must consist only of alphabetic characters',
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
   * Gets a validation message based on string returned uses _fetchMessage under the hood.
   *
   * @param {string|Object} if message is a string it is looked up in
   *  defaultMessages/i18n. If it's an object it should contain keys message
   *  and replacements. All occurences of replacements in message will be then
   *  replaced according to the replacements hash.
   * @returns {string}
   */
  getMessage(validation) {
    if (typeof validation === 'string' || validation instanceof String) {
      return this._fetchMessage(validation, {});
    }

    return this._fetchMessage(validation.message, validation.replacements);
  },

  /**
   * This is a convenience function that fetches the message based on a key.
   *
   * It checks ember-i18n first and if it doesn't exist it returns a deafult message.
   * @param {string} msg: a key
   * @param {Object} replacements: replacements for interpolation
   * @returns {string}
   * @private
   */
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

  /**
   * Interpolates message using given replacements
   * @param {string} msg
   * @param {Object} replacements
   * @returns {String}
   * @private
   */
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
