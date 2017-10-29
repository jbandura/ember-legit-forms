import Ember from 'ember';
import requiredValidator from 'ember-legit-forms/validators/required-validator';

let required = requiredValidator.create();
const { get } = Ember;

export default Ember.Object.extend({
  validate(value, validator) {
    let [dataName] = get(validator, 'arguments');
    let notValid = !get(validator, `data:${dataName}`) &&
      required.validate(value) !== undefined;

    if (notValid) {
      return 'required';
    }
  }
});


