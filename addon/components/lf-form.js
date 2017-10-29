import Ember from 'ember';
import layout from '../templates/components/lf-form';
import formValidator from '../utils/form-validator';

const {
  get,
  Component,
  computed,
  observer,
  getOwner,
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
    if (get(this, 'formValidator')) {
      return get(this, 'formValidator.isFormValid');
    }

    return false;
  }),

  formValidator: computed('rules', 'data', function() {
    return formValidator.create({
      container: getOwner(this),
      rules: get(this, 'rules'),
      data: get(this, 'data')
    });
  }),

  //eslint-disable-next-line ember/no-observers
  rulesChanged: observer('rules', function() {
    run.next(() => get(this, 'eventDispatcher').trigger('lf-forceValidate', false));
  }),

  actions: {
    validateChange(name, value) {
      let validityData = get(this, 'formValidator').validate(name, value);
      //eslint-disable-next-line  ember/closure-actions
      this.sendAction('validityChanged', get(this, 'formValid'));
      return validityData;
    }
  },

  submit(e) {
    e.preventDefault();

    if (get(this, 'preventSubmit') && !get(this, 'formValid')) {
      get(this, 'eventDispatcher').trigger('lf-forceValidate');
    } else if (get(this, 'onSubmit')) {
      get(this, 'onSubmit')(get(this, 'formValid'));
    }
  },
});
