// Checked by Typescript - ts(2378)
// 'getter-return': 'off',
const p = {
  get name() {
    // no returns.
  }
};

// Checked by @typescript-eslint/class-name-casing
class invalidClassName {}

// No warning as checked by @typescript-eslint/no-unused-vars similar to `airbnb` no-unused-vars
const { type, ...coords } = { type: 'test', x, y: 1 };

// No warning as default-case is turned off
export const fn = (input: 'foo' | 'bar'): string => {
  switch (input) {
    case 'foo':
      return 'a';
    case 'bar':
      return 'b';
  }
};

export default coords;
