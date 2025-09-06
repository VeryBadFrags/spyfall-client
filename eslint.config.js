import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: { globals: globals.browser },
    rules: {
      "@typescript-eslint/consistent-type-imports": "error",
      "sort-imports": [
        "warn",
        { ignoreCase: true, ignoreDeclarationSort: true },
      ],
    },
  },
  tseslint.configs.recommended,
  pluginReact.configs.flat["jsx-runtime"],
  globalIgnores(["dist/"]),
]);
