import EmberObject, { get } from '@ember/object';
import { isBlank } from '@ember/utils';

export default EmberObject.extend({
  validate(value, validator) {
    if (isBlank(value)) { return; }
    let [regex] = get(validator, 'arguments');
    if(!regex.test(value)) {
      return 'mustMatchRegex';
    }
  }
});
