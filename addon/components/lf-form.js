import Ember from 'ember';
import layout from '../templates/components/lf-form';
import formValidator from '../utils/form-validator';
import getOwner from 'ember-getowner-polyfill';

const {
  Component,
  computed,
  observer,
  inject: { service },
  run,
} = Ember;

export default Component.extend({
  eventDispatcher: service('lf-event-dispatcher'),

  layout,
  tagName: 'form',
  rules: null, //passed in
  data: null, //passed in
  preventSubmit: null, //passed in
  formValid: computed('formValidator.isFormValid', function() {
    if (this.get('formValidator')) {
      return this.get('formValidator.isFormValid');
    }

    return false;
  }),

  formValidator: computed('rules', 'data', function() {
    return formValidator.create({
      container: getOwner(this),
      rules: this.get('rules'),
      data: this.get('data')
    });
  }),

  rulesChanged: observer('rules', function() {
    run.next(() => this.get('eventDispatcher').trigger('lf-forceValidate', false));
  }),

  submit(e) {
    e.preventDefault();

    if (this.get('preventSubmit') && !this.get('formValid')) {
      this.get('eventDispatcher').trigger('lf-forceValidate');
    } else if (this.get('onSubmit')) {
      this.get('onSubmit')(this.get('formValid'));
    }
  },

  actions: {
    validateChange(name, value) {
      let validityData = this.get('formValidator').getValidateFunction(name, value);
      this.sendAction('validityChanged', this.get('formValid'));
      return validityData;
    }
  }
});
