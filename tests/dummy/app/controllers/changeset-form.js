import Controller from '@ember/controller';
import Changeset from 'ember-changeset';
import {
  validatePresence,
  validateLength,
} from 'ember-changeset-validations/validators';
import lookupValidator from 'ember-changeset-validations';

export default Controller.extend({
  init() {
    this._super(...arguments);
    const user = this.get('user');
    this.changeset = new Changeset(user, lookupValidator(this.UserValidations), this.UserValidations);
  },

  user: {
    firstName: '',
    lastName: '',
  },
  UserValidations: {
    firstName: [
      validatePresence(true),
      validateLength({ min: 4 })
    ],
    lastName: validatePresence(true),
  },

  actions: {
    populateErrors() {
      this.changeset.addError('firstName', 'Error msg');
      this.changeset.pushErrors('lastName', 'Last name error msg');
    }
  },
});
