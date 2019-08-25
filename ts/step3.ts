// Following are `typescript-eslint/recommended` rules that applies to both js and ts files.

// Class 'Invalid_Class_Name' must be PascalCased. (@typescript-eslint/class-name-casing)
export default class Invalid_Class_Name {}

// Following are `typescript-eslint/recommended-requiring-type-checking` rules that applies to
// both js and ts files.

// For-in loops over arrays are forbidden. Use for-of or array.forEach instead.
// (@typescript-eslint/no-for-in-array)
for (const x in [3, 4, 5]) {
  console.log(x);
}
