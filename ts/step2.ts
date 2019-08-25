// Following ESLint rules are turned off by `@typescript-eslint/eslint-recommended` for *.ts(x)
// files but should be still on for *.js(x) files.

// getter-return / ts(2378)
export const P = {
  get name() {
    return;
  },
};

// no-dupe-args / ts(2300)
export function foo(a, b, a) {
  return a + b;
}

// no-dupe-keys / ts(1117)
export const bar = {
  bar: 'baz',
  bar: 'qux',
};
