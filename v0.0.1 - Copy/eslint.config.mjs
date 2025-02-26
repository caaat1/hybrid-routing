import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import prettierPlugin from 'eslint-plugin-prettier';
import globals from 'globals';

export default [
  // Enforce ESLint's recommended rules for JavaScript
  js.configs.recommended,

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
      'import/extensions': [
        'error',
        'ignorePackages',
        {
          js: 'always',
          mjs: 'always',
          cjs: 'always',
          jsx: 'always',
        },
      ],
      // Flag unresolved imports
      'import/no-unresolved': 'error', // Ensures all imports can be resolved
      // Enforce an empty line after imports
      'import/newline-after-import': ['error', {count: 1}], // Enforce exactly one empty line
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
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
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
  {
    settings: {
      'import/resolver': {
        node: {
          paths: ['./node_modules'], // Ensure this points to the right folder
        },
      },
    },
  },
];
