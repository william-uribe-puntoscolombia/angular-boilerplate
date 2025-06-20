// @ts-check
const eslint = require('@eslint/js');
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');
const prettierRecommended = require('eslint-plugin-prettier/recommended');
const simpleImportSort = require('eslint-plugin-simple-import-sort');

// Export our config array, which is composed together thanks to the typed utility function from typescript-eslint
module.exports = tseslint.config(
  {
    ignores: ['**/node_modules/**', '**/dist/**', '**/coverage/**'],
  },

  {
    // Everything in this config object targets our TypeScript files (Components, Directives, Pipes etc)
    files: ['**/*.ts'],
    extends: [
      // Apply the recommended core rules
      eslint.configs.recommended,
      // Apply the recommended TypeScript rules
      ...tseslint.configs.recommended,
      // Optionally apply stylistic rules from typescript-eslint that improve code consistency
      ...tseslint.configs.stylistic,
      // Apply the recommended Angular rules
      ...angular.configs.tsRecommended,

      prettierRecommended,
    ],
    processor: angular.processInlineTemplates,
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      // -- Sort Imports --
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      'no-duplicate-imports': 'error',

      // -- Default angular name html elements --
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'pco',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'pco',
          style: 'kebab-case',
        },
      ],
    },
  },
  {
    // Everything in this config object targets our HTML files (both external template files,
    // AND inline templates thanks to the processor set in the TypeScript config above)
    files: ['**/*.html'],
    extends: [
      // Apply the recommended Angular template rules
      ...angular.configs.templateRecommended,
      // Apply the Angular template rules which focus on accessibility of our apps
      ...angular.configs.templateAccessibility,

      prettierRecommended,
    ],
    rules: {},
  }
);
