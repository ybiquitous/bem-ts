module.exports = {
  root: true,

  // NOTE: Avoid the following error:
  //
  //     Parsing error: "parserOptions.project" has been set for @typescript-eslint/parser.
  //     The file does not match your project config: .eslintrc.js.
  //     The file must be included in at least one of the projects provided
  //
  ignorePatterns: [".eslintrc.js"],

  extends: ["ybiquitous/typescript", "plugin:@typescript-eslint/all"],

  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ["./tsconfig.test.json"],
  },

  rules: {
    "max-lines-per-function": "warn",
    "max-statements": "warn",
    "@typescript-eslint/consistent-type-definitions": ["error", "type"],
    "@typescript-eslint/indent": "off",
    "@typescript-eslint/no-type-alias": "off",
    "@typescript-eslint/prefer-readonly-parameter-types": "off",
    "@typescript-eslint/quotes": "off",
    "@typescript-eslint/space-before-function-paren": "off",
    "@typescript-eslint/typedef": "off",
  },

  overrides: [
    {
      files: ["test.*"],
      extends: "plugin:jest/recommended",
      rules: {
        "max-lines-per-function": "off",
        "max-statements": "off",
        "prefer-destructuring": "off",
        "@typescript-eslint/no-magic-numbers": "off",
      },
    },
  ],
};
