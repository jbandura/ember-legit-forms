import Ember from 'ember';

const { Controller } = Ember;

export default Controller.extend({
  model: Ember.Object.create({
    email: 'asd@home.co',
  }),

  rules: {
    sharedValidations: {
      required: ['name', 'email', 'number']
    },
    email: 'email',
    number: 'numeric'
  }
});
