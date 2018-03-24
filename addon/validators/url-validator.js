import EmberObject from '@ember/object';
import { isBlank } from '@ember/utils';

export default EmberObject.extend({
  validate(value) {
    let valid = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i.test(value) || isBlank(value);
    if (!valid) {
      return 'mustBeValidURL';
    }
  }
});
