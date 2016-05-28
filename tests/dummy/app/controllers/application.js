import Ember from 'ember';

const { Controller, computed } = Ember;

export default Controller.extend({
  isFormValid: null,
  isBtnDisabled: computed.not('isFormValid'),
  someData: 'asd',
  validationData: computed('someData', function() {
    return {
      someData: this.get('someData')
    };
  }),
  groups: [
    {id: 1, name: 'Group 1'},
    {id: 2, name: 'Group 2'}
  ],
  model: Ember.Object.create({
    name: 'TestName',
    email: 'asd@home.co',
    description: 'sakjakds',
    interests: 'askd',
  }),

  rules: {
    sharedValidations: {
      required: ['name', 'email', 'description']
    },
    interests: {
      required: { check: true, message: 'You must provide your interests' },
      max: { check: 5, message: 'Too many interests, sorry :('}
    },
    email: 'email',
    description: 'max(30)'
  }
});
