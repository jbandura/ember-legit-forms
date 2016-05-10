# Master

- [BUGFIX] lack of `rules` hash no longer breaks the form - displays an error message instead

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
