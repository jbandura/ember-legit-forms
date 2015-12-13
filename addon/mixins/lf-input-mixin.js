import Ember from 'ember';

const { Mixin, computed, run } = Ember;

export default Mixin.create({
  classNames: ['form-group'],
  classNameBindings: ['validationState'],
  valid: null,
  _edited: false,
  name: null, //passed in
  property: null, //passed in
  validationState: computed('valid', '_edited', function() {
    if (!this.get('_edited')) { return ''; }
    if (!this.get('valid')) { return 'has-error'; }
    return 'has-success';
  }),

  focusOut() {
    this.set('_edited', true);
    this.checkField();
  },

  /**
   * trigger validation on didInsertElement so that the fields property gets
   * populated and the isValid property gets set properly
   */
  didInsertElement() {
    run.schedule("afterRender", () => {
      this.checkField();
    });
  },

  validateField(value) {
    this.set('_edited', true);
    if (!this.attrs.validate) {
      this.set('valid', true);
    } else {
      let { isValid, messages } = this.attrs.validate(this.get('name'), value);
      this.set('valid', isValid);
      this.set('errorMessages', messages);
    }

    if (this.attrs['on-update']){
      this.attrs['on-update'](value);
    }
  },

  checkField() {
    if (!this.attrs.validate) {
      return this.set('valid', true);
    }

    let validationObj = this.attrs.validate(this.get('name'), this.get('property'));
    if(validationObj.noRules) {
      this.set('valid', true);
    }
  }
});
