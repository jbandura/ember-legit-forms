import ValidationsParser from 'ember-legit-forms/utils/validations-parser';
import { module, test } from 'qunit';

module('Unit | Utility | validation parser');

test('it parses multiple rules without arguments', function(assert) {
  var subject = new ValidationsParser();

  let validationsArray = subject.parseRule('required|numeric');
  assert.equal(validationsArray.length, 2);

  let [validation1, validation2] = validationsArray;

  assert.equal(validation1.name, 'required');
  assert.equal(validation2.name, 'numeric');
});

test('it parses rule with one argument', function(assert) {
  let subject = new ValidationsParser();

  let validationsArray = subject.parseRule('min(6)');
  assert.equal(validationsArray.length, 1);
  let [validation] = validationsArray;

  assert.equal(validation.name, 'min');
  assert.equal(validation.arguments.length, 1);
  assert.equal(validation.arguments[0], '6');
});

test('it parses rule with more than one argument', function(assert) {
  let subject = new ValidationsParser();
  let validationsArray = subject.parseRule('between(6,8)');

  assert.equal(validationsArray[0].name, 'between');
  assert.deepEqual(validationsArray[0].arguments, ['6','8']);
});
