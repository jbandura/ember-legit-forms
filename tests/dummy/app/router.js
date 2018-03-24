import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL,
});

Router.map(function() {
  this.route('basic-form');
  this.route('basic-form-select');
  this.route('basic-form-select-custom-validation-classes');
  this.route('external-errors');
  this.route('changeset-form');
});

export default Router;
