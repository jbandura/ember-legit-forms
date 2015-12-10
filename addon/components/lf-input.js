import Ember from 'ember';
import layout from '../templates/components/lf-input';
import LFInputMixin from '../utils/lf-input-mixin';

const { Component } = Ember;

export default Component.extend(LFInputMixin, {
  layout,

  actions: {
    blur(value) {
      this._validate(value);
    }
  }
});
