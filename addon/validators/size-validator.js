import EmberObject, { get } from '@ember/object';
import { isBlank } from '@ember/utils';

export default EmberObject.extend({
  validate(value, validator) {
    if (isBlank(value)) { return; }
    let size = parseInt(get(validator, 'arguments')[0]);
    if (value.length !== size) {
      return {
        message: 'mustBeOfSize',
        replacements: {
          size
        }
      };
    }
  }
});
