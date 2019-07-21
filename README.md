# ESLint Configurations for TypeScript / JavaScript Projects

ESLint configurations for mixed-type project with both TypeScript and JavaScript files.

There are 2 parsers that can be used, [`babel-eslint`](https://github.com/babel/babel-eslint) and [`@typescript-eslint/parser`](https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/parser). See [here](https://github.com/typescript-eslint/typescript-eslint#what-about-babel-and-babel-eslint) for the differences between them.

`ts.eslintrc` configuration uses `@typescript-eslint/parser` and `babel.eslintrc` configuration uses `babel-eslint`.

This project can be used to test rules parity using the two parsers.

```sh
# Run ESLint using `@typescript-eslint/parser` 
npm run lint
# Run ESLint using `babel-eslint` 
npm run lint:babel
```

## Supporting TypeScript _path mapping_

If [_path mapping_](https://www.typescriptlang.org/docs/handbook/module-resolution.html#path-mapping) is used by specifying `"paths"` property in `tsconfig.json`, `eslint-import-resolver-typescript` is required for `eslint-plugin-import` to resolve `import`s correctly.

```jsonc
"settings": {
  // Settings for eslint-plugin-import resolver
  "import/resolver": {
    // Settings for eslint-import-resolver-typescript to resolve TypeScript path mapping.
    "typescript": {},
  },
},
```

## Using `@typescript-eslint/parser` Parser

To detect cyclic dependencies (`import/no-cycle`) in files with TypeScript `import`s, `plugin:import/typescript` is required.

See [here](https://github.com/benmosher/eslint-plugin-import/blob/master/config/typescript.js) for the plugin settings.

```jsonc
"extends": [
  // Following requires `@typescript-eslint/parser`
  "plugin:import/typescript",
],
```

## Using `babel-eslint` Parser

To detect cyclic dependencies (`import/no-cycle`) in files with TypeScript `import`s, you need to specify the extensions to be parsed as modules and inspected for `export`s

```jsonc
"settings": {
  // Specifiy file extensions to be parsed as modules and inspected for `export`s
  "import/extensions": [".js", ".ts"],
}
```

If the TypeScript project does not use _path mapping_ (see above), `eslint-import-resolver-typescript` is not required. The following settings is required by `import/no-unresolved` to resolve TypeScript `import`s.

```jsonc
"settings": {
  // Settings for eslint-plugin-import resolver
  "import/resolver": {
    // Settings for eslint-import-resolver-node
    "node": {
      "extensions": [".js", ".ts"],
    },
  },
}
```

Alternatively, `plugin:import/typescript` can be used. This however requires `@typescript-eslint/parser`. This is equivalent to the next section on using both parser.

## Using Both Parsers

If using `babel-eslint` parser, a different parser (`@typescript-eslint/parser`) can be used by `eslint-plugin-import` for TypeScript files by specifying the following. (See [here](https://github.com/benmosher/eslint-plugin-import/blob/master/config/typescript.js) for the plugin settings.)

```jsonc
"extends": [
  "plugin:import/typescript",
],
```

## Airbnb ESLint Config / Rules

The goal is for the ESLint config to follow [Airbnb Style Guide](https://github.com/airbnb/javascript) and [typescript-eslint/recommended](https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin) in order of precedence.

As [typescript-eslint/recommended](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/src/configs/recommended.json) will turn off equivalent ESLint rules, ordering whichever rule first will not acheive the desired configuration.

```jsonc
// ⚠️Following configurations are WRONG.🚨

// `airbnb` rule will be overriden by `typescript-eslint/recommended`
"extends": [
  "airbnb-base",
  "plugin:@typescript-eslint/recommended",
],

// `airbnb` rule will turn back on equivalent ESLint rules that is disabled by `typescript-eslint/recommended`.
// Both rules could have conflicting configuration.
"extends": [
  "plugin:@typescript-eslint/recommended",
  "airbnb-base",
],
```

For example, if _airbnb-base_ is ordered first, the 2-space indentation of _airbnb_ will be overrided by 4-space indentation of _typescript-eslint/recommended_. On the other hand, if _typescript-eslint/recommended_ is ordered first, it will result in 2 conflicting rules for `no-unused-vars`.

```ts
// `airbnb` unused-vars rule: ['error', { ..., ignoreRestSiblings: true }]
// `typescript-eslint/recommended` unused-vars rule: ['warn', { ..., ignoreRestSiblings: false }]

// Following is allowed using `airbnb` but will result in warning: 'type' is defined but never used
const { type, ...coords } = data;
```

Lastly, the TypeScript compiler `tsc` has type-checking features that overlaps with some ESLint rules (see [@typescript-eslint/eslint-recommended](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/src/configs/eslint-recommended.ts)) or has compatibility issues which would require certain `airbnb` rules to be disabled for TypeScript files. A good reference for such compatibility issues found in the [react-app](https://github.com/facebook/create-react-app/blob/master/packages/eslint-config-react-app/index.js) config and are described in the following issues.

  * https://github.com/facebook/create-react-app/issues/6906
  * https://github.com/typescript-eslint/typescript-eslint/issues/291
  * https://github.com/typescript-eslint/typescript-eslint/issues/477

## Proposed TypeScript Airbnb Config

[ESLint 6.0](https://eslint.org/blog/2019/06/eslint-v6.0.0-released) is required to support `extends` in configuration using glob patterns. It is assumed that `checkJs` flag is not set to `true` in `tsconfig.json`. 

Based on the issues in previous section, the proposed config for TypeScript Airbnb style will

1. Extends from `airbnb-base`.
2. For TypeScript files     
    - Extends from `@typescript-eslint/eslint-recommended` to disable rules in `airbnb-base` that is checked by `tsc`.
3. For rules in `typescript-eslint/recommended` without ESLint equivalent, add them in.
4. For rules in `typescript-eslint/recommended` with ESLint equivalent, customize using `airbnb` ESLint equivalent.
5. For TypeScript files
    - Disable `airbnb` ESLint rules where `tsc` does a better job or where it does not play well with TypeScript files, if they are not already turned off by `@typescript-eslint/eslint-recommended`.
6. [TBD]: Replace remaining `airbnb` rules by `typescript-eslint` equivalent if available.


## Known Issues

There is an known issue with performance when referencing `tsconfig.json` in `.eslintrc`. See [typescript-eslint/typescript-eslint/#389](https://github.com/typescript-eslint/typescript-eslint/issues/389#issuecomment-511660848) for more details.

## References

[Typescript ESLint](https://github.com/typescript-eslint/typescript-eslint)

[@typescript-eslint/parser](https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/parser)

[@typescript-eslint/eslint-plugin](https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin/)

[@typescript-eslint/eslint-plugin Rules / Config](https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin/src/configs)

[eslint-plugin-import](https://github.com/benmosher/eslint-plugin-import)

[eslint-import-resolver-typescript](https://github.com/alexgorbatchev/eslint-import-resolver-typescript)

[tsc error messages](https://github.com/microsoft/TypeScript/blob/master/src/compiler/diagnosticMessages.json)
