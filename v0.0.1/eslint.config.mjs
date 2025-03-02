import js from '@eslint/js'
import ts from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import prettierConfig from 'eslint-config-prettier'
import importPlugin from 'eslint-plugin-import'
import prettierPlugin from 'eslint-plugin-prettier'
import globals from 'globals'

const eslintConfig = [
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
      ...ts.configs['recommended-requiring-type-checking'].rules,
      '@typescript-eslint/array-type': ['error', {default: 'array-simple'}],
      '@typescript-eslint/consistent-indexed-object-style': ['error', 'record'],
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/explicit-module-boundary-types': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-misused-promises': [
        'error',
        {checksVoidReturn: true},
      ],
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-confusing-void-expression': 'error',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-for-in-array': 'error',
      '@typescript-eslint/no-magic-numbers': [
        'warn',
        {ignore: [-1, 0, 1], ignoreArrayIndexes: true, enforceConst: true},
      ],
      '@typescript-eslint/no-non-null-assertion': 'error',
      '@typescript-eslint/no-unnecessary-type-assertion': 'error',
      '@typescript-eslint/no-unsafe-argument': 'error',
      '@typescript-eslint/no-unsafe-assignment': 'error',
      '@typescript-eslint/no-unsafe-call': 'error',
      '@typescript-eslint/no-unsafe-member-access': 'error',
      '@typescript-eslint/no-unsafe-return': 'error',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
      '@typescript-eslint/prefer-readonly': 'error',
      '@typescript-eslint/prefer-regexp-exec': 'error',
      '@typescript-eslint/require-await': 'error',
      '@typescript-eslint/restrict-template-expressions': 'error',
      '@typescript-eslint/strict-boolean-expressions': 'error',
      '@typescript-eslint/switch-exhaustiveness-check': 'error',
      '@typescript-eslint/unbound-method': 'error',
    },
  },

  // Import sorting and organization
  {
    plugins: {
      import: importPlugin,
    },
    rules: {
      'import/extensions': [
        'error',
        'ignorePackages',
        {
          cjs: 'always',
          js: 'always',
          jsx: 'never',
          mjs: 'always',
          ts: 'never',
          tsx: 'never',
        },
      ],
      'import/order': [
        'error',
        {
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
          ],
          'newlines-between': 'always',
        },
      ],
      'import/no-anonymous-default-export': 'error',
      // 'import/no-default-export': 'error',
      'import/no-deprecated': 'warn',
      'import/no-unused-modules': 'error',
    },
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.ts', '.mjs', '.cjs'],
        },
      },
    },
  },

  // Prettier integration
  {
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      ...prettierConfig.rules,
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
      // 'array-bracket-spacing': ['error', 'never'],
      'arrow-body-style': ['error', 'as-needed'],
      // 'comma-dangle': ['error', 'always-multiline'],
      'consistent-return': 'error',
      'default-case': 'error',
      'linebreak-style': ['error', 'unix'],
      'no-array-constructor': 'error',
      'no-bitwise': 'error',
      // 'no-console': ['warn', {allow: ['warn', 'error']}],
      'no-constant-condition': 'error',
      'no-continue': 'error',
      'no-empty': ['error', {allowEmptyCatch: true}],
      'no-eval': 'error',
      'no-implicit-coercion': 'error',
      'no-implicit-globals': 'error',
      'no-implied-eval': 'error',
      'no-lonely-if': 'error',
      'no-multi-spaces': 'error',
      'no-nested-ternary': 'error',
      'no-new-func': 'error',
      'no-new-wrappers': 'error',
      'no-restricted-properties': 'error',
      'no-return-await': 'error',
      'no-script-url': 'error',
      'no-throw-literal': 'error',
      'no-unexpected-multiline': 'error', // Catch edge cases with multiline statements
      'no-unreachable': 'error',
      'no-unsafe-finally': 'error',
      'no-unused-expressions': 'error',
      'no-use-before-define': ['error', {functions: false, classes: true}],
      'no-var': 'error',
      // 'object-curly-spacing': ['error', 'always'],
      'prefer-const': 'error',
      'prefer-template': 'error',
      curly: ['error', 'all'],
      eqeqeq: ['error', 'always'], // {null: 'never'}
      // quotes: ['error', 'single', {avoidEscape: true}],
      radix: ['error', 'as-needed'],
      // semi: ['error', 'never'],
      yoda: ['error', 'never'],
    },
  },
]

export default eslintConfig
