import globals from "globals";
import tseslint from "typescript-eslint";
import prettierConfig from "eslint-config-prettier";
import pluginVue from "eslint-plugin-vue";
import vueParser from "vue-eslint-parser";
import { defineConfig } from "eslint/config";

export default defineConfig([
  // Configuración base para archivos JavaScript/TypeScript
  {
    ignores: [
      "node_modules/**",
      "dist/**",
      "public/**",
      "build/**",
      "material/**",
    ],
  },
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      ...prettierConfig.rules,
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ],
      "no-console": "warn",
    },
  },

  // Configuraciones recomendadas de TypeScript
  ...tseslint.configs.recommended,

  // Configuración específica para archivos Vue
  ...pluginVue.configs["flat/essential"],
  {
    files: ["**/*.vue"],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tseslint.parser,
        ecmaVersion: 2023,
        sourceType: "module",
      },
    },
    rules: {
      ...prettierConfig.rules,
      "vue/multi-word-component-names": [
        "error",
        { ignores: ["Header", "Footer", "Guitars"] },
      ],
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ],
      "no-console": "warn",
    },
  },
]);
