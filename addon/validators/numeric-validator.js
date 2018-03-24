import EmberObject from '@ember/object';
import { isBlank } from '@ember/utils';

export default EmberObject.extend({
  validate(value) {
    if(!(/^[+-]?\d+$/.test(value) || isBlank(value))) {
      return 'mustBeNumeric';
    }
  }
});
