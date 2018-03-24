import EmberObject, { get } from '@ember/object';
import { isBlank } from '@ember/utils';

export default EmberObject.extend({
  validate(value, validator) {
    if (isBlank(value)) { return; }

    let length = parseInt(get(validator, 'arguments')[0]);
    if (!value || value.length < length) {
      return {
        message: 'tooShort',
        replacements: {
          length
        }
      };
    }
  }
});
