module.exports = {
  env: {
    // es6 seems to be needed for Promise
    es6: true,
    node: true,
  },
  root: true,
  parserOptions: {
    ecmaVersion: 2022,
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

    // functions that return JSX seem to trigger this but the functions aren't necessarily components themselves
    "react/display-name": "off",
    // much easier to read some punctuation such as " and ' versus the escaped forms &quot; and &apos;
    "react/no-unescaped-entities": "off",
    // prop types is not necessary
    "react/prop-types": "off",
    // requiring React is no longer necessary
    "react/react-in-jsx-scope": "off",

    // null should be avoided entirely if possible
    "no-restricted-syntax": [
      "error",
      {
        selector:
          ":not(BinaryExpression:matches([operator='!=='],[operator='===']), CallExpression[callee.object.name='Object'][callee.property.name='create']) > Literal[value=null]",
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
    // default is 50 lines which is sometimes limiting with Prettier's formatting (parameter destructuring can take up 10 lines for example)
    // adding comments or blanks should not trigger this warning
    // doubled from 75 to allow almost all usages in pluto where it was commonly disabled
    // it is common in Jest tests to trigger this; going to up further to see if that helps, already questionably useful
    "max-lines-per-function": [
      "error",
      { max: 200, skipBlankLines: true, skipComments: true },
    ],
    // allow mix of reassigned and const variables
    "prefer-const": ["error", { destructuring: "all" }],
    // never allow "yoda" conditions except for range
    yoda: ["error", "never", { exceptRange: true }],
    // unclear why assignment expressions cannot be used
    "prefer-destructuring": ["error", { AssignmentExpression: { array: false } }],
    // 300 lines is too low
    "max-lines": ["error", { max: 600 }],
    // allow bracket notation for capitalized keys, which are more likely to correlate with an object being used as a map
    "dot-notation": ["error", { allowPattern: "^[A-Z]" }],
    // multi assign is confusing with declarations but non-declarations are okay
    "no-multi-assign": ["error", { ignoreNonDeclaration: true }],
    // although using block style comments is easiest for writing a paragraph, JSDoc is usually preferred
    // when writing such comments during brainstorming, just disable the rule
    // most of the time, want to discourage non-JSDoc block style comments in production
    "multiline-comment-style": ["error", "separate-lines"],
    // allow unused vars before a used var in argument list
    "no-unused-vars": ["error", { args: "after-used" }],

    // unsure
    "no-labels": "off", // useful to be able to break/continue an outer loop; otherwise have to write more code
    "no-nested-ternary": "off", // ideally would allow just two levels of nesting; saves quite a bit of code

    // rule is too idealistic
    camelcase: "off", // useful to allow non-camel case for compatibility like destructuring JSON
    "sort-keys": "off", // too burdensome; doesn't affect order of destructured properties i.e. ({b, a}) => ({a, b}) would be fine
    "sort-vars": "off", // let results, index
    "no-param-reassign": "off", // a common pattern is to coerce parameters; noisy to rename parameters slightly differently
    "no-magic-numbers": "off", // does not allow 1, 2, -1; also sometimes noisy to name every constant (for example in time calculations)
    "id-length": "off", // single character variables can sometimes be useful: i, j, x, y, $, _
    "no-plusplus": "off", // ++ is too common of a language feature (C++)
    "no-underscore-dangle": "off", // difficult to come up with other names for named default parameters
    "max-statements": "off", // max 10 statements is way too low; unclear why number of statements is a good measurement
    "class-methods-use-this": "off", // allow a static method to be called like an instance method
    "arrow-body-style": "off", // does not allow braces to be used with a multi-line fat arrow expression

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
    "lines-between-class-members": "off", // discourages smaller classes
    "guard-for-in": "off", // warning about language feature; reasons to avoid it are too theoretical: works fine in nearly all cases

    // disabled too often
    "no-console": "off", // console error was already allowed; when is console.log actually bad?
    "no-await-in-loop": "off", // warning about language feature, unavoidable
  },
}
