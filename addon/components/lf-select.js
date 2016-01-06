import Ember from 'ember';
import layout from '../templates/components/lf-select';
import LFInputMixin from '../mixins/lf-input-mixin';

const { Component, observer, isNone } = Ember;

export default Component.extend(LFInputMixin, {
  layout,
  content: null, //passed in
  prompt: '-- select --', //passed in
  valuePath: null,
  labelPath: null,

  propertyDidChange: observer('property', function() {
    if(isNone(this.get('property'))) {
      // we have to reset fields
      this.clearValidations();
      return;
    }
  }),

  actions: {
    optionSelected(value) {
      this.validateField(value);
    }
  }
});
