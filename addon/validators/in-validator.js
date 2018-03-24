import { A } from '@ember/array';
import EmberObject, { get } from '@ember/object';
import { isBlank } from '@ember/utils';

export default EmberObject.extend({
  validate(value, validator) {
    if (isBlank(value)) { return; }
    let array = A(get(validator, 'arguments'));

    if (!array.contains(value)) {
      return 'mustBeInArray';
    }
  }
});
