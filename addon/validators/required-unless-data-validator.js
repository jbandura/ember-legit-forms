import EmberObject, { get } from '@ember/object';
import requiredValidator from 'ember-legit-forms/validators/required-validator';

let required = requiredValidator.create();

export default EmberObject.extend({
  validate(value, validator) {
    let [dataName] = get(validator, 'arguments');
    let notValid = !get(validator, `data:${dataName}`) &&
      required.validate(value) !== undefined;

    if (notValid) {
      return 'required';
    }
  }
});


