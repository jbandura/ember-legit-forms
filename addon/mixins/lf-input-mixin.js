import Ember from 'ember';
import messageProvider from '../utils/message-provider';

const { get, set, setProperties, Mixin, computed, run, inject: { service }, isArray, assert } = Ember;

export default Mixin.create({
  eventDispatcher: service('lf-event-dispatcher'),

  classNames: ['form-group'],
  classNameBindings: ['validationState'],
  name: null, //passed in
  property: null, //passed in
  errorClass: 'has-error',
  successClass: 'has-success',
  messageProvider: messageProvider.create(),

  id: computed('inputId', function() {
    return get(this, 'inputId') || `ember${Ember.uuid()}`;
  }),

  /**
   * This property determines whether errors should be displayed
   *
   * @param validationStateVisible
   * @type {boolean}
   */
  validationStateVisible: false,

  /**
   * This property determines whether input is valid. It's used in computing validationState
   *
   * @param valid
   * @type {boolean}
   */
  valid: null,

  /**
   * Tracks the value of the input field
   *
   * We have to keep the input value to validate it after each change - we can't
   * observe property since we're not using two-way data binding

   * @param _value
   * @type {String}
   */
  _value: null,

  /**
   * This property determines whether field has been edited. It should be set
   * in child classes eg. when focusOut/blur event is triggered
   *
   * @param _edited
   * @type {boolean}
   */
  _edited: false,

  validationErrorMessages: null,

  /**
   * This property is used to compute which class should the wrapping form-group element use.
   * Standard bootstrap classes are used: has-success or has-error
   *
   * @param validationState
   * @type {String}
   */
  validationState: computed('valid', 'validationStateVisible', 'errors', function() {
    if (get(this, 'errors')) {
      return get(this, 'errorClass');
    }
    if (!get(this, 'validationStateVisible')) { return ''; }
    if (!get(this, 'valid')) { return get(this, 'errorClass'); }
    return get(this, 'successClass');
  }),

  errorMessages: computed('errors', 'validationErrorMessages', function() {
    const externalErrors = get(this, 'errors');
    if (externalErrors) {
      const errors = isArray(externalErrors) ? externalErrors : [externalErrors];
      return this._translateExternalErrors(errors);
    }

    return get(this, 'validationErrorMessages');
  }),

  focusOut() {
    this._super(...arguments);
    this.executeValidate();
  },

  init() {
    this._super(...arguments);
    get(this, 'eventDispatcher').on('lf-forceValidate', this, this.onForceValidate);
    Ember.run.scheduleOnce('afterRender', () => {
      assert(
        `{{${get(this, '_inputName')}}} requires name attribute in order to link this input to validation rules`,
        get(this, 'name') !== null
      );
    })
  },

  /**
   * Trigger validation on didInsertElement so that the fields property gets
   * populated and the isValid property gets set properly
   */
  didInsertElement() {
    this._super(...arguments);
    run.schedule("afterRender", () => {
      if (!get(this, 'validate')) {
        return set(this, 'valid', true);
      }

      get(this, 'validate')(get(this, 'name'), get(this, 'property'));
    });
  },

  willDestroyElement() {
    this._super(...arguments);
    get(this, 'eventDispatcher').off('lf-forceValidate', this, this.onForceValidate);
  },

  executeValidate(showValidationState = true) {
    set(this, '_edited', true);
    this.validateField(get(this, 'property'));
    if (showValidationState) {
      this.showValidationState();
    }
  },

  /**
   * Convenience function for validating fields. It always marks fields as valid
   * when no rules are found or no validation function is passed. Otherwise it runs
   * the function passed in as "validate" attribute and sets valid and errorMessages appropriately.
   *
   * @param {String} value
   */
  validateField(value) {
    set(this, 'errors', null);
    // no validations - field always valid
    if (!get(this, 'validate')) { return set(this, 'valid', true); }
    let { isValid, messages, noRules } = get(this, 'validate')(get(this, 'name'), value);
    if (noRules) { return set(this, 'valid', true); }

    setProperties(this, {
      'valid': isValid,
      'validationErrorMessages': messages
    });
  },

  /**
   * Call update hook if it was passed.
   *
   * @param {String} value
   */
  callUpdateHook(value) {
    if (get(this, 'on-update')) {
      get(this, 'on-update')(value);
    }
  },

  /**
   * Clear all validations. It removes _edited state and clears all errorMessages.
   */
  clearValidations() {
    this.validateField(null);
    setProperties(this, {
      '_edited': false,
      'validationErrorMessages': [],
      validationStateVisible: false
    });
  },

  /**
   * Setter for validationStateVisible
   */
  showValidationState() {
    set(this, 'validationStateVisible', true);
  },

  hideValidationState() {
    set(this, 'validationStateVisible', false);
  },

  /**
   * 'lf-forceValidate' Event handler
   */
  onForceValidate(showValidationState) {
    this.executeValidate(showValidationState);
  },

  _translateExternalErrors(errors) {
    return errors.map((err) => {
      const translateAction = get(this, 'translateExternalError');
      if (translateAction) { return translateAction(err); }
      return get(this, 'messageProvider').getMessage(err);
    });
  }
});
