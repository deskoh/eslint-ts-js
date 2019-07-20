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

If `eslint-import-resolver-typescript` is not used, the following settings is required by `import/no-unresolved` to resolve TypeScript `import`s.

```jsonc
"settings": {
  // Settings for eslint-plugin-import
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

## References

[Typescript ESLint](https://github.com/typescript-eslint/typescript-eslint)

[@typescript-eslint/parser](https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/parser)

[eslint-plugin-import](https://github.com/benmosher/eslint-plugin-import)

[eslint-import-resolver-typescript](https://github.com/alexgorbatchev/eslint-import-resolver-typescript)

