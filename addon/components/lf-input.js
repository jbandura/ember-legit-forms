import Ember from 'ember';
import layout from '../templates/components/lf-input';

const { Component } = Ember;

export default Component.extend({
  layout,
  hasError: false,
  name: null, //passed in
  property: null, //passed in
  didInsertElement() {
    console.log('legit input!');
    console.log(this.get('property'));
  },

  actions: {
    blur(value) {
      let isValid = this.attrs.validate(this.get('name'), value);
      this.set('hasError', !isValid);
    }
  }
});
