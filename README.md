# Ember-legit-forms

[![Build Status](https://travis-ci.org/jbandura/ember-legit-forms.svg?branch=master)](https://travis-ci.org/jbandura/ember-legit-forms)

Component for creating modern forms along with validations.

## Table of Contents
- [Installing](#installing)
- [Getting started](#getting-started)
- [Components Reference](#components-reference)
  - [`lf-form` Component](#lf-form-component)
  - [Input Helpers](#input-helpers)
    - [`lf-input`](#lf-input)
    - [`lf-textarea`](#lf-textarea)
    - [`lf-select`](#lf-select)
- [Customizing Wrapper Markup](#customizing-wrapper-markup)
- [Validators](#validators)
  - [Representing Validators](#representing-validators)
    - [String Representation](#string-representation)
    - [Object Representation](#object-representation)
    - [Verbose Object Representation](#verbose-object-representation)
  - [Validation Messages](#validation-messages)
    - [Overwriting Messages](#overwriting-messages)
    - [i18n](#i18n)
  - [Creating Custom Validators](#creating-custom-validators)
  - [Defining Inline Validators](#defining-inline-validators)
  - [Validator Object](#validator-object)
  - [Validators Reference](#validators-reference)
    - [`required`](#required)
    - [`accepted`](#accepted)
    - [`alpha`](#alpha)
    - [`alphanumeric`](#alphanumeric)
    - [`numeric`](#numeric)
    - [`in`](#in)
    - [`notIn`](#notIn)
    - [`between`](#between)
    - [`max`](#max)
    - [`min`](#min)
    - [`size`](#size)
    - [`regex`](#regex)
    - [`same`](#same)
    - [`url`](#url)
    - [`email`](#email)
- [Credits](#credits)


## Installing
## Getting Started

You can start using `ember-legit-forms` in three easy steps:

### Step 1
First create a `rules` hash where you put your validation rules. The keys of the hash will
be names of the fields - you have to reference them in `name` attribute in the inputs component later.
It can be declared in controller or component, e.g.:
```js
  /* example/component.js */
  import Ember from 'ember';

  const { Component } = Ember;

  export default Component.extend({
    model: Ember.Object.create({
      firstName: ''  
    }),
    // rules hash for validation
    rules: {
      firstName: 'required'
    }
  });
```
### Step 2
Add a `lf-form` component. This component accepts the `rules` hash and yields a
validate function that you have to pass to input components:

```hbs
  {{!-- example/template.hbs --}}

  {{lf-form rules=rules as |validateFunc|}}
    {{!-- inputs will go here --}}
  {{/lf-form}}
```

### Step 3
Now you can declare your inputs, for example let's define a simple text input using the [`lf-input`](#lf-input) component that comes by default:

```hbs
  {{!-- example/template.hbs --}}

  {{lf-form rules=rules as |validateFunc|}}
    {{lf-input
      name="firstName"
      property=model.firstname
      on-update=(action (mut model.firstName))
      validate=validateFunc
    }}
  {{/lf-form}}
```

Note:

 - the string passed to `name` attribute must correspond to the key name in `rules` hash
 - we have to pass the yielded `validateFunc` to the `validate` attribute of our input component. If we do not pass it our field will always be valid.
 - by default ember-legit-forms uses Twitter Bootstrap's markup for forms. If you would like to change it, please see [Customizing Markup section](#customizing-wrapper-markup).

### That's It
You've successfully started using `ember-legit-forms`!

## Components Reference
### `lf-form` Component

This component does the heavy-lifting of managing field values and valid states. It can be invoked like so:

```hbs
{{lf-form
  rules=rules
  data=data
  validityChanged=(action (mut isValid))
  as |validateFunction|
}}
  .. inputs here ..
{{/lf-form}}
```
It accepts following attributes:
- `rules`: a POJO binding field names to the corresponding validators
- `data`: a POJO of custom data that you want to use in inline/custom validators (see [Validator Object:get(data:key)](#getdatakey) section)
- `validityChanged`: an action which is triggered every time the validity of form. You can use it for example to block submit button when form is not valid. It has the following signature:
```js
function validityChanged(validState) {
  if (validState) {
    // do something when whole form is valid
  } else {
    // do something when form is not valid (e.g. block the submit button)
  }
}
```

**Important**: The component also yields a validate function which has to be passed to the inputs in order for the validations to work properly.

### Input Helpers

Some components are provided by default to make development convenient. They are all based on Twitter Bootstrap (can be customized) and handle showing validation state and error messages by default.

Please note that every one of those components requires `name` attribute that corresponds to the key in the `rules` hash provided for the `lf-form` component (see Getting started section). If you do not provide this attribute your input will be **always** marked as valid.

**Warning: All components use one-way data-binding by default - you have to provide `on-update` action if you want to mutate the property!**

#### Shared Attributes
At it's core every component accepts following attributes:

- `label`: (optional) when provided, displays a label for the input
- `property`: property that will be used to fill the input field
- `name`: a key in the `rules` hash provided to `lf-form`. Used to find the validator for the field.
- `validate`: validation function that can be obtained from the wrapping `lf-form` component. This function takes care of the actual determining if field is valid or not.
- `on-update`: closure action that is called every time the value changes. Can be used e.g. for mutating the property.


In the description of the components those attributes are going to be omitted to avoid unnecessary duplication (they will however be provided in the examples for clarity)

#### `lf-input`
This is a simple input field (can also be used as a checkbox). It only accepts the shared attributes:

```hbs
{{lf-form rules=rules as |validateFunction|}}
  {{lf-input
    label="Foo property"
    property=foo
    name="bar"
    validate=validateFunction
    on-update=(action (mut foo))
  }}
{{/lf-form}}
```

#### `lf-textarea`
Component that displays a textarea (who would've thought, eh?):

```hbs
  {{lf-textarea
    label="Foo property"
    property=foo
    name="bar"
    rows=30
    validate=validateFunction
    on-update=(action (mut foo))
  }}
```

Attributes:
- `rows`: amount of rows in the textarea

#### `lf-select`

This component represents a select field. It accepts an additional `content` property which is used to fill in the options list.

```hbs
  {{lf-select
    label="Select field"
    property=foo
    name="bar"
    content=fields
    labelPath="label"
    valuePath="value"
    validate=validateFunction
    on-update=(action (mut foo))
  }}
```

Attributes:
- `content`: list of items that is used to fill the options list, for example `[{value: 'Value', label: 'Label'}]`
- `valuePath`: represents the key where the value can be found
- `labelPath`: represents the key where the label can be found
## Customizing Wrapper Markup
<!-- TODO: add a section about customizing markup -->
## Validators
### Representing Validators
Validation rules can be defined in component or controller. They can be defined in following ways:

#### String Representation
If you have simple validators you can represent them as string, joining validation rules with `|` symbol. If validator function accepts arguments you can pass them in parentheses, divided by comma, e.g.:

```js
password: 'required|between(5,6)'
```

This field would be only valid if the value would be a non-empty string with length between 5 and 6.

#### Object Representation
You can also represent validators as a POJO. In this case you pass arguments as an array in the value or if the validator accepts no arguments you just pass `true`:
```js
password: {
  required: true, // no arguments so we just pass true as a value
  between: [5,6], // 5 and 6 are arguments so we pass them as an array
  max: 5, // if there is only one argument we can pass it without wrapping it in an array
}
```

This is convenient for some validators (e.g. for `regex` where you don't have to escape special characters in regex rule). It is the only way to chain predefined validators with inline ones, e.g.:

```js
password: {
  required: true,
  between: [5,6],
  inline: function(value) {
    if (value !== 'foobar') {
      return 'invalid value';
    }
  }  
}
```
**Note**: inline validators have to be passed in the `inline` key.

#### Verbose Object Representation
You can also define rules using more verbose object representation, like so:

```js
  password: {
    required: { check: true },
    between: { check: [5,6] }
  }
```

This way of defining is only recommended if you want to overwrite default messages ([see Overwriting Messages](#overwriting-messages)). There is no verbose representation for inline validators.

### Validation Messages
This addon provides validation messages by default - you can however customize those by either overwriting them or using i18n.

#### Overwriting Messages
If you want to overwrite message for a given rule you can do so using [Verbose Object Representation](#verbose-object-representation), e.g.:
```js
rules: {
  password: {
    // displays 'You must provide password' instead of
    // the default 'can't be blank' message
    required: { check: true, message: 'You must provide password' }
  }
}
```
#### i18n
If you want to customize messages for predefined rules like `required` you have to install [ember-i18n](https://github.com/jamesarosen/ember-i18n/). You can then define your own messages in `locales/[locale]/translations.js` in `validation` key, for example:

```js
/* locales/en/translations.js */

export default {
  validation: {
    required: 'This field is required.'
  }
}
```

To check what translation key does a particular rule use, see [Validators Reference](#validators-reference).

### Creating Custom Validators
To create a custom validator you have to create a new file under `app/validators/[validator-name]-validator.js`. Let's say we want to create an `foo` validator - we have to create `app/validators/foo-validator.js`.

```js
/* app/validators/foo-validator.js */

import Ember from 'ember';
export default Ember.Object.create({
  validate(value) {
    if (value !== 'foo') {
      return 'value must be foo!';
    }
  }
})
```

Note that we are returning message only if validation fails - if it succeeds we return `undefined`. You can now use the rule in your rules hash:
```js
rules: {
  fooField: 'foo'
}
```
### Defining Inline Validators
### Validator Object
This object is passed into each custom and inline validator in addition to `value`. It exposes following methods:
#### `get(arguments)`
Returns an array of arguments passed to the rule (anything in the parentheses after rule name or passed as a value after rule name). For example for a following rules:
```js
firstName: 'between(5,6)'
```
```js
firstName: [5,6]
```
```js
firstName: { check: [5,6] }
```
`arguments` would be an array `[5,6]`.
#### `get(field:field_name)`
Returns value of a field with name equal to `field_name`. Note that the `field_name` corresponds to the key name in the `rules` hash. So let's say you want to fetch the value of a field `firstName` in rules for field `lastName`. The field `lastName` should only be valid if the field `firstName` is equal to `foo`. We can do it like so:
```js
// some-component/component.js
import Ember from 'ember';
const { Component } = Ember;

export default Component.extend({
  rules: {
    firstName: 'required',
    lastName: function(value, validator) {
      if (!validator.get('field:firstName') === 'foo') {
        return 'First name must be equal foo!';
      }
    }
  }
})
```
#### `get(data:key)`
Returns value of a given key of `data` hash. You can pass it to `lf-form` component as an attribute. Let's say we want a field `phone` to become optional if an user checks a checkbox `I don't have a phone`. We can do it like so:

```hbs
{{!-- some-component/template.hbs --}}

{{#lf-form rules=rules data=data as |validate|}}
  {{lf-input
    name="phone"
    validate=validate
  }}
{{/lf-form}}

{{!-- code for checkbox goes here --}}
```
```js
// some-component/component.js

import Ember from 'ember';
const { Component, computed, isNone } = Ember;

export default Component.extend({
  // is set to false after clicking on
  // checkbox "I don't have a phone"
  userHasPhone: true,
  // this hash gets recalculated each time user checks/unchecks
  // the checkbox
  data: computed('userHasPhone', function() {
    const userHasPhone = this.get('userHasPhone');
    return { userHasPhone };
  }),
  rules: {
    phone(value, validator) {
      // we first get the value from the data hash
      const userHasPhone = validator.get('data:userHasPhone');
      // we check if field is filled in and
      // if the checkbox was checked
      if (isNone(value) && userHasPhone) {
        return 'required';
      }
    }
  },

  // code for handling checkbox click goes here
})
```


### Validators Reference

#### `required`
**locales key**: `required`
**default message**: `can't be blank`

Checks whether given field is filled in (uses `Ember.isNone`).
##### Example:
```js
firstName: 'required'
```
#### `accepted`
**locales key**: `mustBeAccepted`
**default message**: `must be accepted`

Checks if field value is equal to `1`, `"1"`, `true` or `"on"`.
##### Example:
```js
termsOfService: 'accepted'
```
#### `alpha`
**locales key**: `mustBeAlpha`
**default message**: `must consist only of alphabetic characters`

Checks if field value consists only of alphabetic characters.
##### Example:
```js
firstName: 'alpha'
```
#### `alphanumeric`
**locales key**: `mustBeAlphanumeric`
**default message**: `must consist only of alphanumeric characters`

Checks if field value consists only of alphanumeric characters.
##### Example:
```js
nickname: 'alphanumeric'
```
#### `numeric`
**locales key**: `mustBeNumeric`
**default message**: `must be a number`

Checks if field value consists only of numeric characters.
##### Example:
```js
phone: 'numeric'
```
#### `in`
**locales key**: `mustBeInArray`
**default message**: `value not allowed`

Checks if the field value is contained in the whitelist.
##### Example:
```js
field: 'in(foo,bar,baz)' // value can only be "foo", "bar" or "baz"
```
#### `notIn`
**locales key**: `mustBeNotInArray`
**default message**: `value not allowed`

Field value must not be contained in the arguments array.
##### Example:
```js
field: 'notIn(foo,bar,baz)' // value must not be "foo", "bar" or "baz"
```
#### `between`
**locales key**: `mustBeBetween`
**default message**: `must be between {{minLength}} and {{maxLength}}`

Checks if `max >= value.length >= min`.
##### Example:
```js
name: 'between(3,5)' // min = 3, max = 5
```
#### `max`
**locales key**: `tooLong`
**default message**: `too long`

Checks if `value.length <= max`.
##### Example:
```js
name: 'max(3)'
```
#### `min`
**locales key**: `tooShort`
**default message**: `too short`

Checks if `value.length >= min`.
##### Example:
```js
name: 'min(3)'
```
#### `size`
**locales key**: `mustBeOfSize`
**default message**: `must be exactly {{size}} characters long`

Checks if field value length is equal to `size`.
##### Example:
```js
number: 'size(8)'
```
#### `regex`
**locales key**: `mustMatchRegex`
**default message**: `must have a proper format`

Checks if field value matches regex. **Note**: the object representation is recommended for this validator:
##### Example:
```js
name: { regex: /^Foo(.*)/ } // must begin with Foo
```
#### `same`
**locales key**: `mustBeSame`
**default message**: `must match {{fieldName}}`

Checks if field value is equal to value of `fieldName`.
##### Example:
```js
password: 'required|min(8)',
passwordConfirmation: 'same(password)'
```
#### `url`
**locales key**: `mustBeValidURL`
**default message**: `must be a valid URL`

Checks if field value is a valid URL address.
##### Example:
```js
website: 'url'
```
#### `email`
**locales key**: `mustBeValidEmail`
**default message**: `must be a valid email address`

Checks if field value is an valid email address.
##### Example:
```js
email: 'email'
```

## Credits
This addon uses following great addons:

- [ember-one-way-controls](https://github.com/dockyard/ember-one-way-controls)
- [ember-get-helper](https://github.com/jmurphyau/ember-get-helper)
- [ember-truth-helpers](https://github.com/jmurphyau/ember-truth-helpers)
## TODO:

- add warning when validator for given rule not present, rules hash is null or name property missing from input
- add tests for more than one lf-form instances (they shouldn't share rules attribute)
- [documentation] add info about message replacements in validator messages
- add section about writing own components
