module.exports = {
  env: {
    // es6 seems to be needed for Promise
    es6: true,
    node: true,
  },
  root: true,
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  reportUnusedDisableDirectives: true,
  extends: ["eslint:all", "prettier", "plugin:import/recommended"],
  overrides: [
    {
      files: ["**/*.test.*", "**/test/**"],
      env: {
        jest: true,
      },
    },
    {
      files: ["**/frontend/**"],
      env: {
        browser: true,
      },
    },
  ],
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
    // default is 50 lines which is fine but adding comments or blanks should not trigger this warning
    "max-lines-per-function": ["error", { max: 50, skipBlankLines: true, skipComments: true }],
    // allow mix of reassigned and const variables
    "prefer-const": ["error", { destructuring: "all" }],

    // unsure
    "no-labels": "off", // useful to be able to break/continue an outer loop; otherwise have to write more code

    // rule is too idealistic
    camelcase: "off", // useful to allow non-camel case for compatibility like destructuring JSON
    "sort-keys": "off", // too burdensome; doesn't affect order of destructured properties i.e. ({b, a}) => ({a, b}) would be fine
    "no-param-reassign": "off", // a common pattern is to coerce parameters; noisy to rename parameters slightly differently
    "no-magic-numbers": "off", // does not allow 1, 2, -1; also sometimes noisy to name every constant (for example in time calculations)
    "id-length": "off", // single character variables can sometimes be useful: i, j, x, y, $, _
    "no-plusplus": "off", // ++ is too common of a language feature (C++)
    "no-underscore-dangle": "off", // difficult to come up with other names for named default parameters
    "max-statements": "off", // max 10 statements is way too low; unclear why number of statements is a good measurement
    "class-methods-use-this": "off", // possible to want a possible static method to be called like an instance method

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
    "no-continue": "off", // continue is a useful language feature
    "no-inline-comments": "off", // not adhered to in this file for example
    "line-comment-position": "off", // relates to above rule
    "no-loop-func": "off", // this is only a concern with var declarations
    "max-classes-per-file": "off", // one class per file discourages small classes
  },
}
