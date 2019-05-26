// Modify from https://github.com/ant-design/ant-design-pro/blob/master/.eslintrc.js

module.exports = {
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      legacyDecorators: true
    }
  },
  extends: ['airbnb', 'prettier', 'plugin:compat/recommended'],
  env: {
    browser: true,
    node: true,
    es6: true,
    mocha: true,
    jest: true,
    jasmine: true
  },
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js'] }],
    'react/jsx-wrap-multilines': 0,
    'react/prop-types': 0,
    'react/forbid-prop-types': 0,
    'react/jsx-one-expression-per-line': 0,
    'import/no-unresolved': [1, { ignore: ['^smallfish/'] }],
    'import/no-extraneous-dependencies': [2, { optionalDependencies: true }],
    'jsx-a11y/no-noninteractive-element-interactions': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'react/destructuring-assignment': 1,
    'prefer-destructuring': 1,
    'react/sort-comp': 1,
    'require-yield': 1,
    'no-cond-assign': 1,
    'react/prefer-stateless-function': 1,
    'import/no-extraneous-dependencies': 1,
    'consistent-return': 1,
    'react/no-access-state-in-setstate': 1,
    'no-restricted-globals': 1,
    'import/prefer-default-export': 1,
    'react/jsx-closing-tag-location': 1,
    'no-nested-ternary': 1
  },
  settings: {
    polyfills: ['fetch', 'promises', 'url']
  }
};
