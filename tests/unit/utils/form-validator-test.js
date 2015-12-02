import FormValidator from 'ember-legit-forms/utils/form-validator';
import { module, test } from 'qunit';
import Ember from 'ember';

module('Unit | Utility | form validator');

function generateLookupStub(returnValue) {
  return Ember.Object.create({
    lookupValidator() {
      return {
        validate() {
          return returnValue;
        }
      };
    }
  });
}

function generateParserStub(array) {
  return Ember.Object.create({
    parseRule() {
      return array;
    }
  });
}

test('it creates fields from rules', function(assert) {
  let subject = FormValidator.create().set('rules', {
    password: 'required',
    name: 'required|min(6)'
  });

  assert.deepEqual(subject.get('fields'), { password: null, name: null });
});

test('it gets correct validation when all fields correct', function(assert) {
  let lookupStub = generateLookupStub(true);
  let parserStub = generateParserStub(
    [
      {
        name: 'required'
      }
    ]
  );

  let subject = FormValidator.create().setProperties({
    parserService: parserStub,
    lookupService: lookupStub,
    rules: {
      password: 'required'
    }
  });

  let validation = subject.getValidateFunction();

  assert.deepEqual(validation, {
    messages: [],
    isValid: true
  });
});
