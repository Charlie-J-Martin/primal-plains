import eslintPluginPrettier from "eslint-plugin-prettier";
import eslintConfigPrettier from "eslint-config-prettier";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    files: ["**/*.ts"],
    ignores: ["**/dist/**", "**/node_modules/**"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      prettier: eslintPluginPrettier,
    },
    rules: {
      // ESLint rules
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "warn",
      "prettier/prettier": "error", // run Prettier through ESLint
    },
  },
  eslintConfigPrettier
);
