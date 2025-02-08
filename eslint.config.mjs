import js from '@eslint/js';
import ts from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettier from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import prettierPlugin from 'eslint-plugin-prettier';

export default [
  // Enforce ESLint's recommended rules for JavaScript
  js.configs.recommended,

  // Enforce TypeScript ESLint's recommended rules
  {
    files: ['**/*.js', '**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    plugins: {
      '@typescript-eslint': ts,
    },
    rules: {
      ...ts.configs.recommended.rules,
      // Additional TypeScript rules
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },

  // Import sorting and organization
  {
    plugins: {
      import: importPlugin,
    },
    rules: {
      // Enforce sorting of imports
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
          ],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
      // Ensure consistent use of file extensions in imports
      'import/extensions': ['error', 'ignorePackages'],
    },
  },

  // Integrate Prettier with ESLint
  {
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      ...prettier.rules,
      'prettier/prettier': 'error',
    },
  },

  // Additional project-specific rules
  {
    // Set the Node.js environment
    languageOptions: {
      globals: {
        node: true, // Enable Node.js global variables
        require: true,
        module: true,
        process: true,
        __dirname: true,
        __filename: true,
      },
    },
    rules: {
      // Enforce consistent arrow function syntax
      'arrow-body-style': ['error', 'as-needed'],
      // Enforce consistent return statements
      'consistent-return': 'error',
      // Disallow unused variables
      'no-unused-vars': 'warn',
      // Enforce LF line endings
      'linebreak-style': ['error', 'unix'],
    },
  },
];
