import js from "@eslint/js"; // eslint-disable-line n/no-extraneous-import
import { defineConfig } from "eslint/config";

import nodePlugin from "eslint-plugin-n";
import tsPlugin from "typescript-eslint";

export default defineConfig([
  {
    ignores: ["coverage/**", "dist/**", "tmp/**"],
  },
  {
    linterOptions: {
      reportUnusedDisableDirectives: "error",
      reportUnusedInlineConfigs: "error",
    },
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    extends: [js.configs.recommended, nodePlugin.configs["flat/recommended-module"]],
  },
  {
    files: ["**/*.ts"],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.test.json"],
      },
    },
    extends: [tsPlugin.configs.eslintRecommended, tsPlugin.configs.strictTypeChecked],
    rules: {
      "max-lines-per-function": ["warn", { max: 80 }],
      "max-statements": ["warn", { max: 50 }],
      "@typescript-eslint/consistent-type-definitions": ["error", "type"],
      "@typescript-eslint/prefer-readonly-parameter-types": "off",
    },
  },
]);
