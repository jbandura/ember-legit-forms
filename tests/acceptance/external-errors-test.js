import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';
import {
  fillInBlurAcceptance as fillInAndBlur
} from '../helpers/ember-legit-forms';

moduleForAcceptance('Acceptance | external errors', {
  beforeEach() { visit('/external-errors'); }
});

test('it shows errors when they get populated', function(assert) {
  fillInAndBlur('.js-input', '');
  click('.js-populate');

  andThen(() => {
    assert.ok(find('.js-input').hasClass('has-error'), 'it applies an error class to the element');
    assert.equal(find('.js-input .help-block').text().trim(), 'bar');
  });
});
