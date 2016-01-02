import validator from 'ember-legit-forms/validators/accepted-validator';
import { module, test } from 'qunit';

module('Unit | Validators | accepted');

let subject = validator.create();

test('it validates properly', function(assert) {
  let okValues = [1, true, '1', 'on'];
  let notOkValues = [null, '', false, {}];

  okValues.forEach((val) => {
    assert.equal(subject.validate(val), undefined);
  });

  notOkValues.forEach((val) => {
    assert.equal(subject.validate(val), 'mustBeAccepted');
  });
});
