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
    name: null,
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
    address: 'required',
    group: 'required'
  },
});
