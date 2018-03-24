import EmberObject, { get } from '@ember/object';

export default EmberObject.extend({
  validate(value, validator) {
    let length = parseInt(get(validator, 'arguments')[0]);
    if (value && value.length > length) {
      return {
        message: 'tooLong',
        replacements: {
          length
        }
      };
    }
  }
});
