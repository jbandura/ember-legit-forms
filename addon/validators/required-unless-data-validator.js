import Ember from 'ember';
import requiredValidator from 'ember-legit-forms/validators/required-validator';

let required = requiredValidator.create();

export default Ember.Object.extend({
  validate(value, validator) {
    let [dataName] = validator.get('arguments');
    let notValid = !validator.get(`data:${dataName}`) &&
      required.validate(value) !== undefined;

    if (notValid) {
      return 'required';
    }
  }
});


