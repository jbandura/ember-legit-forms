import Ember from 'ember';
import layout from '../templates/components/lf-select';
import LFInputMixin from '../mixins/lf-input-mixin';

const { Component } = Ember;

export default Component.extend(LFInputMixin, {
  layout,
  content: null, //passed in
  valuePath: null,
  labelPath: null,

  actions: {
    optionSelected(value) {
      let { isValid, messages } = this.attrs.validate(this.get('name'), value);
      this.set('valid', isValid);
      this.set('errorMessages', messages);
    }
  }
});
