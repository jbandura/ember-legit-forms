import validationsParser from 'ember-legit-forms/utils/validations-parser';
import { module, test } from 'qunit';

module('Unit | Utility | validation parser');

test('it parses multiple rules without arguments', function(assert) {
  var subject = validationsParser.create();

  let validationsArray = subject.parseRule('required|numeric');
  assert.equal(validationsArray.length, 2);

  let [validation1, validation2] = validationsArray;

  assert.equal(validation1.name, 'required');
  assert.equal(validation2.name, 'numeric');
});

test('it parses rule with one argument', function(assert) {
  let subject = validationsParser.create();

  let validationsArray = subject.parseRule('min(6)');
  assert.equal(validationsArray.length, 1);
  let [validation] = validationsArray;

  assert.equal(validation.name, 'min');
  assert.equal(validation.arguments.length, 1);
  assert.equal(validation.arguments[0], '6');
});

test('it parses rule with more than one argument', function(assert) {
  let subject = validationsParser.create();
  let validationsArray = subject.parseRule('between(6,8)');

  assert.equal(validationsArray[0].name, 'between');
  assert.deepEqual(validationsArray[0].arguments, ['6','8']);
});

test('it parses inline functions', function(assert) {

  let subject = validationsParser.create();
  let validationsArray = subject.parseRule(function() {
    return true;
  });

  assert.ok(validationsArray[0].isFunction);
  assert.ok(validationsArray[0].validate());

});

test('it parses single rule in form of Object', function(assert) {
  let subject = validationsParser.create();
  let validationsArray = subject.parseRule({
    min: 6
  });

  assert.deepEqual(validationsArray[0], {
    name: 'min',
    arguments: [6],
    isFunction: false
  });
});

test('it parses multiple rules in form of Object', function(assert) {
  let subject = validationsParser.create();
  let validationsArray = subject.parseRule({
    between: [5,6],
    required: true
  });

  assert.deepEqual(validationsArray[0], {
    name: 'between',
    arguments: [5,6],
    isFunction: false
  });

  assert.deepEqual(validationsArray[1], {
    name: 'required',
    arguments: [true],
    isFunction: false
  }, 'matches required rule');
});

test('it parses inline validators in rules hash', function(assert) {
  let subject = validationsParser.create();
  let validationsArray = subject.parseRule({
    required: true,
    inline: function() {
      return true;
    }
  });

  assert.deepEqual(validationsArray[0], {
    name: 'required',
    arguments: [true],
    isFunction: false
  }, 'matches required rule');

  assert.ok(validationsArray[1].isFunction);
  assert.ok(validationsArray[1].validate());
});

test('it parses custom messages', function(assert) {
  let subject = validationsParser.create();
  let customMessage = 'must be exactly 3 characters long';
  let validationsArray = subject.parseRule({
    length: { check: 3, message: customMessage }
  });

  assert.deepEqual(validationsArray[0], {
    name: 'length',
    arguments: [3],
    isFunction: false,
    customMessage: customMessage
  });
});
