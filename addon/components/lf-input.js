import Ember from 'ember';
import layout from '../templates/components/lf-input';

const { Component } = Ember;

export default Component.extend({
  layout,
  hasError: false,
  _edited: false,
  name: null, //passed in
  property: null, //passed in
  didInsertElement() {
    this.attrs.validate(this.get('name'), this.get('property'));
  },

  actions: {
    blur(value) {
      let { isValid, messages } = this.attrs.validate(this.get('name'), value);
      this.set('hasError', !isValid);
      this.set('errorMessages', messages);
    }
  }
});
