# eslint-config

This config assumes that code can use Node globals unless it is in a `frontend` directory. See below to change this.

Version 3.X.X of this package requires ESLint 10+ (flat config) and `eslint-plugin-import-x` as a peer dependency (replacing `eslint-plugin-import`). Use 2.1.X if you need ESLint 9 support, or 1.4.X if you are using ESLint 8.

Version 3.1.X requires `@vitest/eslint-plugin`, which installs `@typescript-eslint/utils`. This version assumes Vitest is used instead of Jest since it drops support for Jest globals.

This config makes use of `no-restricted-imports` and `no-restricted-syntax` rules. If another project implements these, they will overwrite this library's functionality.

## Install

`npm install --save-dev @tim-code/eslint-config`

Then create `eslint.config.js` at project root with the following:

```js
export { default } from "@tim-code/eslint-config"
```

## Tests

Test files (`*.test.*`, `*.spec.*` and anything under `test/`) are linted with `@vitest/eslint-plugin`. The rules also generally can work for Jest tests since the APIs match (however, no Jest globals support).

Test files may use `null` and `{}`, and have no file or function length limits.

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
