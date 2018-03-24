import EmberObject from '@ember/object';
import { isBlank } from '@ember/utils';

export default EmberObject.extend({
  validate(value) {
    let valid = /^[a-zA-Z]+$/i.test(value) || isBlank(value);
    if (!valid) {
      return 'mustBeAlpha';
    }
  }
});
