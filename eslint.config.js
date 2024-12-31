import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import prettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default [
  {
    ignores: ['dist'], // Ignore the 'dist' directory
  },
  {
    files: ['**/*.ts', '**/*.tsx'], // Apply to TypeScript files
    languageOptions: {
      ecmaVersion: 2020, // ECMAScript version
      sourceType: 'module', // Use ES Modules
      globals: {
        ...globals.browser,
      },
      parser: '@typescript-eslint/parser', // Use the TypeScript parser
      parserOptions: {
        ecmaFeatures: {
          jsx: true, // Enable JSX parsing
        },
      },
    },
    plugins: {
      react, // React plugin
      'react-hooks': reactHooks, // React hooks plugin
      'react-refresh': reactRefresh, // React Refresh plugin
      '@typescript-eslint': typescriptEslint, // TypeScript plugin
      prettier, // Prettier plugin
    },
    rules: {
      ...react.configs.recommended.rules, // Use recommended React rules
      ...reactHooks.configs.recommended.rules, // Use recommended React Hooks rules
      ...typescriptEslint.configs.recommended.rules, // Use recommended TypeScript rules
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ], // React Refresh rule
      'prettier/prettier': 'error', // Prettier formatting as ESLint errors
    },
    settings: {
      react: {
        version: 'detect', // Automatically detect React version
      },
    },
  },
];
