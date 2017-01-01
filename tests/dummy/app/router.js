import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('basic-form');
  this.route('basic-form-select');
  this.route('external-errors');
});

export default Router;
