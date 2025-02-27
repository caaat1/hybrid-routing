import js from '@eslint/js'
import ts from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import prettier from 'eslint-config-prettier'
import importPlugin from 'eslint-plugin-import'
import prettierPlugin from 'eslint-plugin-prettier'
import globals from 'globals'

export default [
  // Base JavaScript rules
  js.configs.recommended,

  // TypeScript rules with type information enabled
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json', // Enables type-aware linting
      },
    },
    plugins: {
      '@typescript-eslint': ts,
    },
    rules: {
      ...ts.configs.recommended.rules,
      ...ts.configs['recommended-requiring-type-checking'].rules, // Enables stricter type-based rules
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
      'import/extensions': [
        'error',
        'ignorePackages',
        {
          js: 'never',
          jsx: 'never',
        },
      ],
    },
  },

  // Prettier integration
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
      'arrow-body-style': ['error', 'as-needed'],
      'consistent-return': 'error',
      'no-unused-vars': 'warn',
      'linebreak-style': ['error', 'unix'],
    },
  },
]
