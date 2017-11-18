import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';
import { fillInBlurAcceptance as fillIn } from '../helpers/ember-legit-forms';

moduleForAcceptance('Acceptance | changeset form test');

const assertHasClass = (assert, fields, state, shouldMessage) => {
  Object.keys(fields).forEach(key => {
    assert.ok(
      find(`.js-${key}`).hasClass(`has-${state}`),
      `input ${key} should ${shouldMessage}`
    );
  });
};

const fillInFields = (fields) => {
  Object.keys(fields).forEach(key => {
    fillIn(`.js-${key}`, fields[key]);
  });
};

test('basic validations work (form invalid)', function(assert) {
  const fieldValues = {
    'first-name': 'Joe',
    'last-name': '',
  };

  visit('/changeset-form');

  andThen(() => fillInFields(fieldValues));
  andThen(() => assertHasClass(
    assert, fieldValues, 'error', 'not be valid')
  );
});

test('basic validations work (form valid)', function(assert) {
  const fieldValues = {
    'first-name': 'John',
    'last-name': 'Doe',
  };

  visit('/changeset-form');

  andThen(() => fillInFields(fieldValues));
  andThen(() => assertHasClass(
    assert, fieldValues, 'success', 'be valid')
  );
});

test('populating errors work', function(assert) {
  const fieldValues = {
    'first-name': 'John',
    'last-name': 'Doe',
  };

  visit('/changeset-form');

  andThen(() => fillInFields(fieldValues));
  andThen(() => assertHasClass(
    assert, fieldValues, 'success', 'be valid')
  );

  andThen(() => click('.js-populate-errors'));
  andThen(() => assertHasClass(
    assert, fieldValues, 'error', 'show pushed errors')
  );
});
