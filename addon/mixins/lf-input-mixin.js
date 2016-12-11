import Ember from 'ember';

const { Mixin, computed, run, inject: { service }, isArray } = Ember;

export default Mixin.create({
  eventDispatcher: service('lf-event-dispatcher'),

  classNames: ['form-group'],
  classNameBindings: ['validationState'],
  name: null, //passed in
  property: null, //passed in

  id: computed('inputId', function() {
    return this.get('inputId') || `ember${Ember.uuid()}`;
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
    if (this.get('errors')) {
      return 'has-error';
    }
    if (!this.get('validationStateVisible')) { return ''; }
    if (!this.get('valid')) { return 'has-error'; }
    return 'has-success';
  }),

  errorMessages: computed('errors', 'validationErrorMessages', function() {
    const externalErrors = this.get('errors');
    if (externalErrors) return isArray(externalErrors) ? externalErrors : [externalErrors];

    return this.get('validationErrorMessages');
  }),

  focusOut() {
    this._super(...arguments);
    this.executeValidate();
  },

  init() {
    this._super(...arguments);
    this.get('eventDispatcher').on('lf-forceValidate', this, this.onForceValidate);
  },

  /**
   * Trigger validation on didInsertElement so that the fields property gets
   * populated and the isValid property gets set properly
   */
  didInsertElement() {
    this._super(...arguments);
    run.schedule("afterRender", () => {
      if (!this.get('validate')) {
        return this.set('valid', true);
      }

      this.get('validate')(this.get('name'), this.get('property'));
    });
  },

  willDestroyElement() {
    this._super(...arguments);
    this.get('eventDispatcher').off('lf-forceValidate', this, this.onForceValidate);
  },

  executeValidate() {
    this.set('_edited', true);
    this.validateField(this.get('property'));
    this.showValidationState();
  },

  /**
   * Convenience function for validating fields. It always marks fields as valid
   * when no rules are found or no validation function is passed. Otherwise it runs
   * the function passed in as "validate" attribute and sets valid and errorMessages appropriately.
   *
   * @param {String} value
   */
  validateField(value) {
    // no validations - field always valid
    if (!this.get('validate')) { return this.set('valid', true); }
    let { isValid, messages, noRules } = this.get('validate')(this.get('name'), value);
    if (noRules) { return this.set('valid', true); }

    this.setProperties({
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
    if (this.get('on-update')) {
      this.get('on-update')(value);
    }
  },

  /**
   * Clear all validations. It removes _edited state and clears all errorMessages.
   */
  clearValidations() {
    this.validateField(null);
    this.setProperties({
      '_edited': false,
      'validationErrorMessages': [],
      validationStateVisible: false
    });
  },

  /**
   * Setter for validationStateVisible
   */
  showValidationState() {
    this.set('validationStateVisible', true);
  },

  hideValidationState() {
    this.set('validationStateVisible', false);
  },

  /**
   * 'lf-forceValidate' Event handler
   */
  onForceValidate() {
    this.executeValidate();
  },
});
