import Ember from 'ember';

const { isBlank } = Ember;

export default Ember.Object.extend({
  validate(value) {
    if (isBlank(value)) { return; }

    const input = document.createElement('input');
    input.type = 'email';
    input.value = value;

    const emailRegex = /^[-a-z0-9~!$%^&*_=+}{'?]+(\.[-a-z0-9~!$%^&*_=+}{'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;

    const isValid = typeof input.checkValidity === 'function' ?
      input.checkValidity() :
      emailRegex.test(value);

    if (!isValid) {
      return 'mustBeValidEmail';
    }
  }
});
