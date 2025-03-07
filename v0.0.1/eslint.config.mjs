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
        project: ['./tsconfig.json', './tsconfig.views.json'],
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
        createDefaultProgram: true, // Enable type-checking
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
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/explicit-module-boundary-types': 'error',
      '@typescript-eslint/no-confusing-void-expression': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-for-in-array': 'error',
      '@typescript-eslint/no-magic-numbers': [
        'warn',
        {ignore: [-1, 0, 1], ignoreArrayIndexes: true, enforceConst: true},
      ],
      '@typescript-eslint/no-misused-promises': [
        'error',
        {checksVoidReturn: true},
      ],
      '@typescript-eslint/no-non-null-assertion': 'error',
      '@typescript-eslint/no-unnecessary-type-assertion': 'error',
      '@typescript-eslint/no-unsafe-argument': 'error',
      '@typescript-eslint/no-unsafe-assignment': 'error',
      '@typescript-eslint/no-unsafe-call': 'error',
      '@typescript-eslint/no-unsafe-member-access': 'error',
      '@typescript-eslint/no-unsafe-return': 'error',
      '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'error',
      '@typescript-eslint/no-unnecessary-condition': 'error',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
      '@typescript-eslint/prefer-includes': 'error',
      '@typescript-eslint/prefer-nullish-coalescing': 'error',
      '@typescript-eslint/prefer-optional-chain': 'error',
      // '@typescript-eslint/prefer-readonly-parameter-types': 'warn',
      '@typescript-eslint/prefer-readonly': 'error',
      '@typescript-eslint/prefer-regexp-exec': 'error',
      '@typescript-eslint/prefer-string-starts-ends-with': 'error',
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
      'import/newline-after-import': ['error', {count: 1}],
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
          alphabetize: {order: 'asc', caseInsensitive: true},
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
      'import/no-duplicates': 'error', // Prevent duplicate imports
      'import/no-named-as-default': 'error', // Avoid importing default named exports
      'import/no-deprecated': 'warn',
      'import/no-unused-modules': 'error',
      // 'padding-line-between-statements': [
      //   'error',
      //   {blankLine: 'always', prev: 'import', next: '*'},
      // ],
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
      'arrow-body-style': ['error', 'as-needed'],
      'consistent-return': 'error',
      'linebreak-style': ['error', 'unix'],
      'no-array-constructor': 'error',
      'no-bitwise': 'error',
      'no-constant-condition': 'error',
      'no-empty': ['error', {allowEmptyCatch: true}],
      'no-eval': 'error',
      'no-implicit-coercion': 'error',
      'no-implicit-globals': 'error',
      'no-implied-eval': 'error',
      'no-lonely-if': 'error',
      'no-multi-spaces': 'error',
      // 'no-multiple-empty-lines': ['error', {max: 0, maxBOF: 0, maxEOF: 0}],
      'no-nested-ternary': 'error',
      'no-new-func': 'error',
      'no-new-wrappers': 'error',
      'no-restricted-properties': 'error',
      'no-return-await': 'error',
      'no-script-url': 'error',
      'no-throw-literal': 'error',
      'no-unexpected-multiline': 'error',
      'no-unreachable': 'error',
      'no-unsafe-finally': 'error',
      'no-unused-expressions': 'error',
      'no-use-before-define': ['error', {functions: false, classes: true}],
      'no-var': 'error',
      'prefer-const': 'error',
      'prefer-template': 'error',
      curly: ['error', 'all'],
      eqeqeq: ['error', 'always'],
      radix: ['error', 'as-needed'],
      yoda: ['error', 'never', {exceptRange: true}],
    },
  },
]
export default eslintConfig
