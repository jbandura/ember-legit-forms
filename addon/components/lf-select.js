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
      this._validate(value);
    }
  }
});
