import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';
import { fillInAndBlurAcceptance as fillInAndBlur } from '../helpers/ember-legit-forms';

moduleForAcceptance('Acceptance | inputs, selects and textareas', {
  beforeEach() { visit('/basic-form-select'); }
});

test('when fields filled in properly', function(assert){
  fillInAndBlur('.js-name', 'John');
  fillInAndBlur('.js-group', 1, 'select');
  fillInAndBlur('.js-description', 'lorem ipsum', 'textarea');

  andThen(() => {
    ['name', 'group', 'description'].forEach(key => {
      assert.ok(
        find(`.js-${key}`).hasClass('has-success'),
        `input ${key} should be valid`
      );
    });
    assert.notOk(find('.js-submit').is(':disabled'), 'button should not be disabled');
  });
});

