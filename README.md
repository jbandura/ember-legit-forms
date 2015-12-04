# Ember-legit-forms

Component for creating modern forms along with validations.

## Getting started

In order for the validations to work properly you have to define rules in your component or controller, for example:

```
import Ember from 'ember';

const { Controller } = Ember;

export default Controller.extend({
  rules: {
    firstName: 'required|min(6)'
  }  
});
```

Then in the template use the `{{lf-form}}` component and pass the `rules` object like so:

```
{{lf-form rules=rules as |validate|}}
{{/lf-form}}
```

The yielded `validate` function takes care of validating the input and returns an object containing following keys:

- `isValid`: determines whether given input is valid
- `message`: contains a validation message, eg. `can't be blank`

You are free to use this function however you want, for example validate the input when the `onBlur` action is called.

## TODO:

- support for inline validators
- allow access to all fields and their valid states in custom validators
- implement validators:
  - alphanumeric
  - alpha
  - between
  - date
  - date format
  - digits
  - e-mail
  - in (an array)
  - not in
  - same
  - size
  - url

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
