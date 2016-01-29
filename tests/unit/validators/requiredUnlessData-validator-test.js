import validator from 'ember-legit-forms/validators/requiredUnlessData-validator';
import validatorObject from 'ember-legit-forms/utils/validator-object';
import { module, test } from 'qunit';

module('Unit | Validators | requiredUnlessData');

let subject = validator.create();

function validatorWithData(name, data) {
  return validatorObject.create({
    arguments: [name],
    data: data
  });
}

test('it validates properly', function(assert) {
  assert.equal(
    subject.validate('', validatorWithData('fooData', { 'fooData': true })),
    undefined,
    'it should allow empty values when data attribute set to true'
  );

  assert.equal(
    subject.validate('', validatorWithData('fooData', { 'fooData': false })),
    'required',
    'it shouldn\'t allow empty values when data attribute set to false'
  );

  assert.equal(
    subject.validate('', validatorWithData('fooData', null)),
    'required',
    'it shouldn\'t allow empty values when no data attribute provided'
  );
});

