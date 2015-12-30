import Ember from 'ember';

const { Mixin, computed, run } = Ember;

export default Mixin.create({
  classNames: ['form-group'],
  classNameBindings: ['validationState'],
  valid: null,
  name: null, //passed in
  property: null, //passed in
  _value: null,
  _edited: false,
  validationState: computed('valid', '_edited', function() {
    if (!this.get('_edited')) { return ''; }
    if (!this.get('valid')) { return 'has-error'; }
    return 'has-success';
  }),

  focusOut() {
    this.set('_edited', true);
    this.validateField(this.get('property'));
  },

  /**
   * trigger validation on didInsertElement so that the fields property gets
   * populated and the isValid property gets set properly
   */
  didInsertElement() {
    run.schedule("afterRender", () => {
      if (!this.attrs.validate) {
        return this.set('valid', true);
      }

      this.attrs.validate(this.get('name'), this.get('property'));
    });
  },

  validateField(value) {
    if (this.attrs['on-update']){
      this.attrs['on-update'](value);
    }
    this.set('_value', value);

    if (!this.attrs.validate) {
      this.set('valid', true);
      return;
    }

    let { isValid, messages, noRules } = this.attrs.validate(this.get('name'), value);
    if (noRules) {
      this.set('valid', true);
      return;
    }

    this.set('valid', isValid);
    this.set('errorMessages', messages);
  },

  clearValidations() {
    this.validateField(null);
    this.set('_edited', false);
    this.set('errorMessages', []);
  }
});
