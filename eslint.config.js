// Relative path: "eslint.config.js"
module.exports = [
  {
    extends: [
      'plugin:prettier/recommended', // Integrate Prettier with ESLint
    ],
    files: ['**/*.{js,cjs,mjs,ts,cts,mts}'],
    ignores: ['node_modules/**', 'dist/**'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      parser: require('@typescript-eslint/parser'),
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname, // Handles relative tsconfig paths
      },
    },
    plugins: {
      '@typescript-eslint': require('@typescript-eslint/eslint-plugin'),
      import: require('eslint-plugin-import'),
      prettier: require('eslint-plugin-prettier'),
    },
    rules: {
      ...require('@typescript-eslint/eslint-plugin').configs.recommended.rules,
      ...require('@typescript-eslint/eslint-plugin').configs[
        'recommended-requiring-type-checking'
      ].rules,
      '@typescript-eslint/explicit-member-accessibility': [
        'error',
        {
          accessibility: 'explicit',
        },
      ],
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            ['parent', 'sibling', 'index'],
          ],
          alphabetize: {order: 'asc', caseInsensitive: true},
        },
      ],
      'prettier/prettier': 'error',
      'padding-line-between-statements': [
        'error',
        {blankLine: 'always', prev: 'import', next: '*'},
        {blankLine: 'any', prev: 'import', next: 'import'},
      ],
    },
  },
];
