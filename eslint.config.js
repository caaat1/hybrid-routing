// eslint.config.js
module.exports = [
  {
    files: ['**/*.ts', '**/*.cts', '**/*.mts'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      parser: require('@typescript-eslint/parser'),
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    plugins: {
      '@typescript-eslint': require('@typescript-eslint/eslint-plugin'),
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
    },
    ignores: ['node_modules/**', 'dist/**'],
  },
];
