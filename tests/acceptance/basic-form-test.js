import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';
import { fillInAndBlurAcceptance as fillInAndBlur } from '../helpers/ember-legit-forms';

moduleForAcceptance('Acceptance | basic form with inputs only', {
  beforeEach() { visit('/basic-form'); }
});

const fieldValues = {
  name: 'John',
  email: 'john.doe@home.co',
  interests: 'interest',
  number: 123
};

test('when fields filled in properly', function(assert){
  Object.keys(fieldValues).forEach(key => {
    fillInAndBlur(`.js-${key}`, fieldValues[key]);
  });

  andThen(() => {
    Object.keys(fieldValues).forEach(key => {
      assert.ok(
        find(`.js-${key}`).hasClass('has-success'),
        `input ${key} should be valid`
      );
    });
    assert.notOk(find('.js-submit').is(':disabled'), 'button should not be disabled');
  });
});

test('it shows validation errors', function(assert) {
  fillInAndBlur('.js-name', null);

  andThen(() => {
    assert.ok(find('.js-name').hasClass('has-error'), 'it shows validation error');
  });
});

test('it shows validation message only after blur event', function(assert){
  fillIn('.js-number input', 'invalid');
  andThen(() => {
    assert.notOk(find('.js-number .help-block').length, 'message shouldnt be displayed');
  });
  triggerEvent('.js-number input', 'blur');
  andThen(() => {
    assert.ok(find('.js-number .help-block').length, 'message should be displayed');
  });
});

test('when models set to null it resets the validation state', function(assert){
  Object.keys(fieldValues).forEach(key => {
    fillInAndBlur(`.js-${key}`, fieldValues[key]);
  });

  click('.js-clear');

  andThen(() => {
    assert.notOk(find('.js-email').hasClass('has-error'));
    assert.notOk(find('.js-email').hasClass('has-success'));
  });
});

