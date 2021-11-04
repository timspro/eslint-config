# eslint-config

`npm install @tim-code/eslint-config`

Then in package.json:

```json
  "eslintConfig": {
    "extends": [
      "@tim-code"
    ],
    "root": true,
    "ignorePatterns": []
  }
```

This assumes that code can use Node globals unless it is in a `frontend` directory.

Note that `root` and `ignorePatterns` are not required but `root` is useful to prevent ESLint from searching for more config files
and `ignorePatterns` is often useful to ignore files.

## React

To fully support React/JSX, install:

`npm install --save-dev eslint-plugin-react`

Then in `eslintConfig` in package.json:

```json
"extends": [
  "@tim-code",
  "plugin:react/recommended"
]
```

Because `null` is often used in React code, you may want to disable the warning about `null`:

```json
"rules": [
  "no-restricted-syntax": "off"
]
```

## Make src directory use "browser" globals instead of "node" globals

In `eslintConfig` in package.json:

```json
"overrides": [
  {
    "files": [
      "src/**"
    ],
    "env": {
      "node": false,
      "browser": true
    }
  }
]
```

Instead, if there are no JS files in the project directory that require Node:

```json
"env": {
  "node": false,
  "browser": true
}
```

## Why not eslint-babel?

`eslint-babel` is a more flexible parser but using it is a bit more complex (requires configuration) and introduces another dependency.
