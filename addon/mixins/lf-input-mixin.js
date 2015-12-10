import Ember from 'ember';

const { Mixin, computed } = Ember;

export default Mixin.create({
  classNames: ['form-group'],
  classNameBindings: ['validationState'],
  valid: false,
  _edited: false,
  name: null, //passed in
  property: null, //passed in
  disabled: false, //passed in
  validationState: computed('valid', '_edited', function() {
    if (!this.get('_edited')) { return ''; }
    if (!this.get('valid')) { return 'has-error'; }
    return 'has-success';
  }),

  focusOut() {
    this.set('_edited', true);
  },

  didInsertElement() {
    this.attrs.validate(this.get('name'), this.get('property'));
  },

  _validate(value) {
    let { isValid, messages } = this.attrs.validate(this.get('name'), value);
    this.set('valid', isValid);
    this.set('errorMessages', messages);
  },
});
