# eslint-config

`npm install --save-dev @tim-code/eslint-config`

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

This assumes that code can use Node globals unless it is in a `frontend` directory. See below to change this.

Note that `root` and `ignorePatterns` are not required but `root` is useful to prevent ESLint from searching for more config files and `ignorePatterns` is often eventually needed to ignore files such as a build directory.

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

## ESLint 9

ESLint 9, released 2024-04-05, switched to using "flat config". This enabled a more script-based integration with plugins (similar to other build tools like Webpack) at the expense of supporting different ways to specify the config as a JSON object. As a result, ESLint 9 dropped support for "eslintConfig" in package.json. See: https://github.com/eslint/eslint/discussions/18131.

ESLint 8 reached end-of-life on 2024-10-05. The last 8.X.X release was 2024-09-16. How should projects that followed this README migrate to ESLint 9?

### Option 1 - Create an eslint.config.js

It's intended that projects that use ESLint 9 will have their own `eslint.config.js` file, even if they are ultimately just using some other ESLint config. See: https://eslint.org/docs/latest/use/getting-started.

This does result in cluttering the top-level of the project with yet-another config file.

### Option 2 - Disable Flat Config

It is possible to use old config resolution by setting the environment variable, `ESLINT_USE_FLAT_CONFIG=false`, or when using VSCode ESLint extension, `{ "eslint.useFlatConfig": false }`. At first glance, it seems like this provides a way forward: old repos can use ESLint 9 without rewriting their configs. Unfortunately, this has a significant drawback. Setting this at a user-level scope in VSCode will result in not being able to use flat config in all open projects. This is because when this is false, flat config is completely ignored. Basically, it's impossible to work in some repos that are using ESLint 9 with legacy config and some repos that are using ESLint 9 with flat config, without repo-level overrides.

A better approach would be for repos that want to use ESLint 9 with legacy config to specify `.vscode/settings.json`. However, if a repo doesn't have that file already, this still amounts to the same as Option 1: adding a config file at the top-level of the project.

### Other Options?

Purposefully so, there are less ways to specify ESLint config in ESLint 9. You could try to pass a command line argument specifying a different config file. However, the VSCode extension doesn't run ESLint through the command line, so you would have to specify it through preferences, similar to Option 2.
