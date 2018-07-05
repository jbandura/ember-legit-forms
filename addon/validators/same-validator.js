import EmberObject, { get } from '@ember/object';
import { isBlank } from '@ember/utils';

export default EmberObject.extend({
  validate(value, validator) {
    let [fieldName] = get(validator, 'arguments');

    if(value !== get(validator, `field:${fieldName}`)) {
      return {
        message: 'mustBeSame',
        replacements: { fieldName }
      };
    }
  }
});
