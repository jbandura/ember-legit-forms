import EmberObject, { get } from '@ember/object';
import { isBlank } from '@ember/utils';

export default EmberObject.extend({
  validate(value, validator) {
    if (isBlank(value)) { return; }

    let minLength = parseInt(get(validator, 'arguments')[0]);
    let maxLength = parseInt(get(validator, 'arguments')[1]);
    let isValid = value && value.length >= minLength && value.length <= maxLength;
    if (!isValid) {
      return {
        message: 'mustBeBetween',
        replacements: {
          minLength,
          maxLength
        }
      };
    }
  }
});
