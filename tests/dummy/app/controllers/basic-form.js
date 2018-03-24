import Controller from '@ember/controller';

export default Controller.extend({
  model: {
    email: 'asd@home.co',
    name: null,
    interests: null,
    number: null
  },
  formSubmitted: false,

  rules: {
    sharedValidations: {
      required: ['name', 'email', 'number']
    },
    email: 'email',
    number: 'numeric'
  },

  actions: {
    clear() {
      this.set('model', { email: null, name: null, interests: null, number: null});
    },
    submit() {
      this.set('formSubmitted', true);
    }
  }
});
