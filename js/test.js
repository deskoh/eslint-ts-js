// Checked by 'getter-return': 'on'
const p = {
  get name() {
    // no returns.
  }
};

// Checked by @typescript-eslint/class-name-casing
class invalidClassName {}

// No warning as checked by @typescript-eslint/no-unused-vars similar to `airbnb` no-unused-vars
const { type, ...coords } = { type: 'test', x: 1, y: 1 };

// Checked by default-case
export const fn = (input) => {
  switch (input) {
    case 'foo':
      return 'a';
    case 'bar':
      return 'b';
  }
};

export default coords;
