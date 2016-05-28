import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | basic form', {
  beforeEach() {
    visit('/basic-form');
  }
});

function fillInAndBlur(selector, value) {
  fillIn(selector, value);
  triggerEvent(selector, 'blur');
}

const fieldValues = {
  name: 'John',
  email: 'john.doe@home.co',
  interests: 'interest',
  number: 123
};

test('when fields filled in properly', function(assert){
  Object.keys(fieldValues).forEach(key => {
    fillInAndBlur(`.js-${key} input`, fieldValues[key]);
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
  triggerEvent('.js-name input', 'click');
  triggerEvent('.js-name input', 'blur');

  andThen(() => {
    assert.ok(find('.js-name').hasClass('has-error'), 'it shows validation error');
  });
});

test('[first interaction] it shows validation error messages only after blurring', function(assert){
  fillIn('.js-number input', 'invalid');
  andThen(() => {
    assert.notOk(find('.js-number .help-block').length, 'message shouldnt be displayed');
  });
  triggerEvent('.js-number input', 'blur');
  andThen(() => {
    assert.ok(find('.js-number .help-block').length, 'message should be displayed');
  });
});
