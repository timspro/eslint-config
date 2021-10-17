/* eslint-disable no-inline-comments */
/* eslint-disable line-comment-position */
/* global module */

module.exports = {
  env: {
    es6: true,
  },
  root: true,
  // may not be strictly required depending on configuration but in general babel parser is just better
  parser: "@babel/eslint-parser",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    // babel parser normally requires a config file
    requireConfigFile: false,
  },
  reportUnusedDisableDirectives: true,
  extends: ["eslint:all", "prettier", "plugin:import/recommended"],
  rules: {
    // .js extension needed for relative imports
    "import/extensions": ["error", "ignorePackages"],
    // these rules have poor performance:
    "import/namespace": "off",
    "import/no-named-as-default-member": "off",
    "import/no-named-as-default": "off",

    // null should be avoided entirely if possible
    "no-restricted-syntax": [
      "error",
      {
        selector:
          ":not(BinaryExpression:matches([operator='!=='], [operator='==='])) > Literal[value=null]",
        message:
          'Usage of "null" is discouraged except when used because of legacy APIs; use "undefined" instead',
      },
    ],

    // modified rules
    // four parameter functions seem more reasonable than three
    "max-params": ["error", 4],
    // sometimes need to pass an empty function as a callback
    "no-empty-function": ["error", { allow: ["arrowFunctions"] }],
    // function keyword is more readable in general but "fat arrow" is more concise; disables function(){} syntax
    "func-style": ["error", "declaration", { allowArrowFunctions: true }],
    // matches default IDE shortcut for multiline comments
    "multiline-comment-style": ["error", "separate-lines"],
    // errors need to be logged somehow
    "no-console": ["error", { allow: ["error"] }],
    // if each statement is one line, 15 statements can still be reasonable
    "max-statements": ["error", 15],

    // tolerable? perhaps even good ideas?
    // no-underscore-dangle: "off" // does not apply to single underscore

    // rule is too idealistic
    camelcase: "off", // useful to allow non-camelcase for compatibility like destructuring JSON
    "sort-keys": "off", // too burdensome; doesn't affect order of destructured properties i.e. ({b, a}) => ({a, b}) would be fine
    "no-param-reassign": "off", // a common pattern is to coerce parameters; noisy to rename parameters slightly differently
    "no-magic-numbers": "off", // does not allow 1, 2, -1; also sometimes noisy to name every constant (for example in time calculations)
    "id-length": "off", // single character variables can sometimes be useful: i, j, x, y, $, _
    "no-plusplus": "off", // ++ is too common of a language feature (C++)

    // rule conflicts with another tool
    "one-var": "off", // with Prettier, comma appears on the same line as declaration, making code less readable
    "sort-imports": "off", // rely on IDE to sort imports; IDE sorts capitalizations differently than eslint expects
    "new-cap": "off", // React functions can begin with capital letter

    // bad rules
    "init-declarations": "off", // doesn't make sense for let and subsequent assignment in if/else; const implies this rule anyway
    "no-ternary": "off", // ternary is a useful language feature
    "no-undefined": "off", // actually undefined should be used over null
    "capitalized-comments": "off", // comments are not always sentences
    "prefer-named-capture-group": "off", // named capture groups are too new
  },
}
