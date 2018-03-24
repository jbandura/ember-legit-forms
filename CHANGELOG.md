# 2.2.1
- [BUGFIX] Fix issue with ember-legit-forms not working on ember 3.0 #72

# 2.2.0
- [FEATURE] add disabled property to `lf-select` prompt (#68)
- [FEATURE] add tabindex property to `lf-textarea` and `lf-select` (#67)
- [FEATURE] add support for ember-changeset (#64)
- [INTERNAL] upgrade to ember 2.15 & ember-cli 2.15 (#57)
- [INTERNAL] start using eslint-plugin-ember (#60)

# 2.1.3
# 2.1.2
- [BUGFIX] Update lodash to newest version to fix conflicts with mirage


# 2.1.1
- [FEATURE] Pass in all supported attributes for `lf-select`, `lf-input` and
  `lf-textarea` (#38)
- [FEATURE] When i18n installed but the validation translation not defined use
  the default one (#37)
- [FEATURE] Add ability to provide custom error and success classes for validation, thanks @kcin1018!
- [FEATURE] Make it so that you can override `form-control` class on inputs (#53)

# 2.1.0
- [INTERNAL] Update to ember 2.11
- [FEATURE] Add ability to create custom inputs, thanks @bardzusny!
- [FEATURE] Make it possible to add classes directly to the input component
  (#40)

# 2.0.1

- [INTERNAL] Update ember-cli-release and ember-one-way-controls to remove deprecations, thanks @maxwerr
- [BUGFIX] upgrade email validator, thanks @bardzusny!
# 2.0.0

- [BREAKING CHANGE] remove ember-get-owner-polyfill, thanks @maxwerr!
- [BREAKING CHANGE] remove 'ember-get-helper', thanks @bardzusny
- [FEATURE] you can now change rules object and it will trigger revalidation (same applies to `data` object) - thanks @bardzusny
- [FEATURE] add `decimal` validator - thanks @bardzusny
- [FEATURE] you can now show external errors
- [FEATURE] inputs now throw error if you omit the `name` attribute

# 1.1.4
- [FIX] make sure not to use `this.attrs` as this can lead to buggy behaviour
  (thanks @bardzusny)

# 1.1.3
- [FEATURE] added option `preventSubmit` that makes sure the form will be not submitted when it's not valid. Instead it will display all errors. Thanks @snik!

# 1.1.2
- [BUGFIX] make the icon placement on the left by default (solves bug where it not specifying the placement would leave the field looking weird)

# 1.1.1

# 1.1.0
- [FEATURE] add fillIn helpers for acceptance and integration tests
- [FEATURE] add onSubmit handler to lf-form component + change tagName to form
- [INTERNAL] improve test coverage by adding acceptance tests
- [INTERNAL] upgrade ember & ember-cli versions
- [FIX] get rid of container lookup
- [FEATURE] `lf-form` component now also yields `formValid` attribute which can
  be used for example for blocking/enabling of submit buttons
- [FIX] remove use of container in favor of using getOwner
- [BUGFIX] lack of `rules` hash no longer breaks the form - displays an error message instead
- [FEATURE] added possibility to group repeated validations under `sharedValidations` key

# 1.0.13
- [FEATURE] added readonly property to `lf-input`
- [BUGFIX] messages are only shown after focusOut (lf-input)
- [INTERNAL] move from deprecated one-way-input to one-way-controls addon

# 1.0.12
- [FEATURE] New `requiredUnlessData` validator (link here)
- [FEATURE] new `showErrorMessages` option for inputs
- [FIX] inputs are now validated as you type - errors are only displayed after first focusOut

# 1.0.11
- [INTERNAL] Update to ember-cli 1.13.14
- [FEATURE] You can now provide components for error messages and labels (https://github.com/jbandura/ember-legit-forms#customizing-wrapper-markup)
- [FEATURE] New `different` serializer (kudos to @Szeliga for implementing it!)
