import Ember from 'ember';

const { isBlank } = Ember;

export default Ember.Object.extend({
  validate(value) {
    if (isBlank(value)) { return; }

    let emailRegex = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;

    if (!emailRegex.test(value)) {
      return 'mustBeValidEmail';
    }
  }
});
