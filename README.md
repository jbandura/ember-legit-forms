# Ember-legit-forms

[![Build Status](https://travis-ci.org/jbandura/ember-legit-forms.svg?branch=master)](https://travis-ci.org/jbandura/ember-legit-forms)

Component for creating modern forms along with validations.

## Getting started

In order for the validations to work properly you have to define rules in your component or controller, for example:

```js
import Ember from 'ember';

const { Controller } = Ember;

export default Controller.extend({
  rules: {
    firstName: 'required|min(6)'
  }  
});
```

Then in the template use the `{{lf-form}}` component and pass the `rules` object like so:

```hbs
{{lf-form rules=rules as |validate|}}
{{/lf-form}}
```

The yielded `validate` function takes care of validating the input and returns an object containing following keys:

- `isValid`: determines whether given input is valid
- `message`: contains a validation message, eg. `can't be blank`

You are free to use this function however you want, for example validate the input when the `onBlur` action is called.

## How does validation work?


## `lf-form` component

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
- `data`: a POJO of custom data that you want to use in custom validators
- `validityChanged`: an action which is triggered every time the validity of form. You can use it for example to block submit button when form is not valid.

**Important**: The component also yields a validate function which has to be passed to the inputs in order
for the validations to work properly.

## Input Helpers

Some components are provided by default to make development convenient. They are
all based on Twitter Bootstrap and handle showing validation state and error messages
by default.

Please not that every one of those components requires `name` attribute that corresponds
to the key in the `rules` hash provided for the `lf-form` component. If you do not
provide this attribute your input will be always marked as valid.

**Warning: All components use one-way data-binding by default - you
have to provide `on-update` action!**

### Shared attributes
At it's core every component accepts following attributes:

- `label`: (optional) when provided, displays a label for the input
- `property`: value that we want to display in the input
- `name`: a key in the `rules` hash provided to `lf-form`. Used to validate the field.
- `validate`: validation function that can be obtained from the wrapping `lf-form` component. This function takes care of the actual determining if field is valid
or not.
- `on-update`: closure action that should be used for handling any property modifications

In the description of the components those attributes are going to be omited to
avoid unnecessary duplication (they will however be provided in the examples for clarity)

### `lf-input`
This is a simple input field (can also be used as a checkbox). It only accepts the shared
attributes:

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

### `lf-textarea`
Component that displays a textarea (who would've thought, eh?).

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

### `lf-select`

This component represents a select field. It accepts an additional `content` property
which is used to fill in the options list.

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

## Validators

Validation rules can be defined in component or controller. They are a POJO, eg.

```js
rules: {
  name: 'required'
}
```
Rules can be either a string representing a validator or a function if you want
to define a custom one.

### Defining custom validators

You can define custom validator passing a function with a following signature:
```js
rules: {
  name: function(value, validator){}
}
```
`value` represents the current field value and `validator` is an instance of `ValidatorObject` providing following
methods:

- `get(field:field_name)`: returns value of a field with name equal to `field_name`. Note that the `field_name` corresponds to the key name in the `rules` hash. So let's say you want to fetch


## TODO:

- implement validators:
  - date
  - date format
  - ~~notIn~~
  - ~~in (an array)~~
  - ~~size~~
  - ~~alpha~~
  - ~~url~~
  - ~~alphanumeric~~
  - ~~between~~
  - ~~max~~
  - ~~accepted~~
  - ~~same~~
  - ~~e-mail~~
- add warning when validator for given rule not present, rules hash is null or name property missing from input
- ~~use `ember-oneway-input` in lf-input~~
- ~~expose `on-update` action in every lf-input~~
- ~~in `lf-input-mixin` run the validation in afterRender queue~~
- ~~enable using objects as validator keys (in addition to strings)~~
- ~~ember-i18n integration~~
- ~~support for inline validators~~
- ~~allow access to all fields and their valid states in custom validators~~
- README: add section about password confirmations
- add tests for more than one lf-form instances (they shouldn't share rules attribute)

## Installation

* `git clone` this repository
* `npm install`
* `bower install`

## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
