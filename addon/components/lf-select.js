import Ember from 'ember';
import layout from '../templates/components/lf-select';
import LFInputMixin from '../mixins/lf-input-mixin';

const { get, Component, observer, isNone } = Ember;

export default Component.extend(LFInputMixin, {
  layout,
  _inputName: 'lf-select',
  content: null, //passed in
  prompt: '-- select --', //passed in
  valuePath: 'value',
  labelPath: 'label',

  //eslint-disable-next-line ember/no-observers
  propertyDidChange: observer('property', function() {
    if(isNone(get(this, 'property'))) {
      // we have to reset fields
      this.clearValidations();
      this.hideValidationState();
      return;
    }
  }),

  actions: {
    optionSelected(value) {
      this.callUpdateHook(value);
      this.validateField(value);
    }
  }
});
