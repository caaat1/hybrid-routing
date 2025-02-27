// eslint.config.mjs

import { defineConfig } from 'eslint';

// ESLint configuration for TypeScript with strict rules, import sorting, and formatting for VS Code
export default defineConfig({  extends: [
    'eslint:recommended', // Base ESLint recommendations
    'plugin:@typescript-eslint/recommended', // TypeScript recommendations
    'plugin:@typescript-eslint/recommended-requiring-type-checking', // Strict TypeScript rules
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
  ],
  parser: '@typescript-eslint/parser', // Enables TypeScript parsing
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json', // Required for some TypeScript rules
  },
  plugins: ['@typescript-eslint', 'import'],
  rules: {
    // Strict rules
    '@typescript-eslint/ban-ts-comment': 'error', // Avoid using `// @ts-ignore` comments
    '@typescript-eslint/explicit-function-return-type': ['warn'],
    '@typescript-eslint/no-empty-function': 'warn', // Warn about empty functions
    '@typescript-eslint/no-explicit-any': 'error', // Avoid using 'any' type
    '@typescript-eslint/no-namespace': 'error', // Avoid using custom TypeScript namespaces
    '@typescript-eslint/no-unused-expressions': 'error', // Avoid unused expressions
    '@typescript-eslint/no-unused-vars': ['error'],
    'eqeqeq': ['error', 'always'],
    'no-console': 'warn',
    'no-unused-vars': 'error',
    'strict': ['error', 'global'], // Enforce strict mode

    // TypeScript-specific rules
    '@typescript-eslint/explicit-module-boundary-types': 'warn', // Enforce explicit return types for functions
    '@typescript-eslint/explicit-function-return-type': 'warn', // Enforce function return types
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }], // Allow unused variables with _ prefix

    // Import sorting
    'import/order': [
      'error',
      {
        groups: [
          'builtin', // Node "builtin" modules
          'external', // npm modules
          'internal', // Internal modules
          ['parent', 'sibling', 'index'], // Relative imports
        ],
        'newlines-between': 'always', // Ensure newlines between different groups
        alphabetize: { order: 'asc', caseInsensitive: true }, // Alphabetize imports
      },
    ],

    // Formatting and empty line rules
    'no-multiple-empty-lines': ['error', { max: 1, maxBOF: 1, maxEOF: 1 }], // No more than one consecutive empty line
    'prettier/prettier': ['error', { singleQuote: true, semi: false }], // Configure prettier to use single quotes and no semicolons
  },
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true, // Always try to resolve types
      }, // This loads <rootdir>/tsconfig.json to ESLint
    },
  },
});
