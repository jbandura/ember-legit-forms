import EmberObject from '@ember/object';
import { isBlank } from '@ember/utils';

export default EmberObject.extend({
  validate(value) {
    let valid = /^[a-z0-9]+$/i.test(value) || isBlank(value);
    if (!valid) {
      return 'mustBeAlphanumeric';
    }
  }
});
