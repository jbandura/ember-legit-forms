import Ember from 'ember';
import layout from '../templates/components/lf-input-wrapper';

const { Component, computed } = Ember;

/**
 * Kudos to Miguel Camba
 * https://github.com/cibernox/ember-power-select/blob/master/addon/utils/computed-fallback-if-undefined.js
 */
function fallBack(fallback) {
  return computed({
    get() { return fallback; },
    set(_, v) { return v === undefined ? fallback : v; }
  });
}

export default Component.extend({
  layout,
  showErrorMessages: fallBack(true),
  labelComponent: fallBack('lf-bootstrap-label'),
  errorMessagesComponent: fallBack('lf-bootstrap-errors'),
});
