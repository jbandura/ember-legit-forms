import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';
import {
  fillInBlurAcceptance as fillInBlur,
  fillInSelectAcceptance as fillInSelect,
  fillInTextareaAcceptance as fillInTextarea,
} from '../helpers/ember-legit-forms';

moduleForAcceptance('Acceptance | inputs, selects', {
  beforeEach() { visit('/basic-form-select-custom-validation-classes'); }
});

test('when fields filled in properly', function(assert){
  fillInBlur('.js-name', 'John');
  fillInSelect('.js-group', 1);
  fillInTextarea('.js-description', 'lorem ipsum', 'textarea');

  andThen(() => {
    ['name', 'group', 'description'].forEach(key => {
      assert.ok(
        find(`.js-${key}`).hasClass('has-valid'),
        `input ${key} should be valid`
      );
    });
    assert.notOk(find('.js-submit').is(':disabled'), 'button should not be disabled');
  });
});

test('it shows validation errors', function(assert){
  fillInSelect('.js-group', null);
  fillInTextarea('.js-description', null);

  andThen(() => {
    assert.ok(find('.js-group').hasClass('has-danger'), 'it shows validation error');
    assert.ok(find('.js-description').hasClass('has-danger'), 'it shows validation error');
  });
});

test('it shows validation message only after blur event', function(assert){
  find('.js-group select').val(null);
  find('.js-description textarea').val(null);
  andThen(() => {
    assert.notOk(find('.js-group .help-block').length, 'message shouldnt be displayed');
    assert.notOk(find('.js-description .help-block').length, 'message shouldnt be displayed');
  });
  triggerEvent('.js-group select', 'blur');
  triggerEvent('.js-description textarea', 'blur');
  andThen(() => {
    assert.ok(find('.js-group .help-block').length, 'message should be displayed');
    assert.ok(find('.js-description .help-block').length, 'message should be displayed');
  });
});

test('when models set to null it resets the validation state', function(assert){
  fillInBlur('.js-name', 'name');
  fillInSelect('.js-group', 'val1');
  fillInTextarea('.js-description', 'Lorem Ipsum');

  click('.js-clear');

  andThen(() => {
    assert.notOk(find('.js-name').hasClass('has-danger'));
    assert.notOk(find('.js-name').hasClass('has-valid'));
    assert.notOk(find('.js-group').hasClass('has-danger'));
    assert.notOk(find('.js-group').hasClass('has-valid'));
    assert.notOk(find('.js-description').hasClass('has-danger'));
    assert.notOk(find('.js-description').hasClass('has-valid'));
  });
});
