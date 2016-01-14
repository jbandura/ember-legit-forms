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
    phone: '603572334',
    password: '',
    address: '',
    email: '',
    surname: null,
    group: 1,
    description: '',
    interests: '',
  }),

  rules: {
    name: 'required',
    phone: 'required|min(6)|numeric',
    password: {
      min: 6,
      required: true
    },
    interests: {
      required: { check: true, message: 'You must provide your interests' },
      max: { check: 5, message: 'Too many interests, sorry :('}
    },
    email: 'required|email',
    surname: {
      regex: /^Ja(.*)/
    },
    address: function(value, validator) {
      if (validator.get('data.someData') !== 'asd') {
        return 'someData not valid';
      }
    },
    group: 'required',
    description: 'required|max(30)'
  }
});
