# eslint-config

This config assumes that code can use Node globals unless it is in a `frontend` directory. See below to change this.

Version 2.X.X of this package only supports ESLint 9 (flat config). Use 1.4.X if you are using ESLint 8.

## Install

`npm install --save-dev @tim-code/eslint-config`

Then create `eslint.config.js` at project root with the following:

```js
export { default } from "@tim-code/eslint-config"
```

## React

To fully support React/JSX, install:

`npm install --save-dev eslint-plugin-react`

Then in `eslint.config.js` in package.json:

```js
import base from "@tim-code/eslint-config"
import reactPlugin from "eslint-plugin-react"
import { defineConfig } from "eslint/config"

export default defineConfig([
  reactPlugin.configs.flat.recommended,
  ...base,
  // optionally, allow null in React code
  {
    files: ["**/*.{jsx,tsx}"],
    rules: { "no-restricted-syntax": "off" },
  },
])
```

## Make src directory use "browser" globals instead of "node" globals

In `eslint.config.js` in package.json:

```js
export default defineConfig([
  ...base,
  {
    files: ["src/**"],
    languageOptions: {
      globals: {
        ...globals.browser,
        // to turn off previously added Node globals:
        ...Object.fromEntries(Object.keys(globals.node).map((key) => [key, "off"])),
      },
    },
  },
])
```

## Why not eslint-babel?

`eslint-babel` is a more flexible parser but using it is a bit more complex (requires configuration) and introduces another dependency.
