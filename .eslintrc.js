module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module'
  },
  extends: [
    'eslint:recommended',
    'plugin:ember/recommended'
  ],
  env: {
    browser: true
  },
  rules: {
    'ember/no-observers': 1,
    'ember/closure-actions': 1,
    'ember/alias-model-in-controller': 1,
    'ember/named-functions-in-promises': 1,
  }
};
