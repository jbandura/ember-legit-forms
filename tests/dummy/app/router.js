import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL,
});

Router.map(function() {
  this.route('basic-form');
  this.route('basic-form-select');
  this.route('basic-form-select-custom-validation-classes');
  this.route('external-errors');
});

export default Router;
