import { A } from '@ember/array';
import EmberObject from '@ember/object';

export default EmberObject.extend({
  validate(value) {
    if (!A([1, '1', true, 'on']).contains(value)) {
      return 'mustBeAccepted';
    }
  }
});
