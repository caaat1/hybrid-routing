export default [
  {
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:@typescript-eslint/recommended-requiring-type-checking',
      'plugin:import/errors',
      'plugin:import/warnings',
      'plugin:import/typescript',
      'plugin:prettier/recommended', // Integrates Prettier with ESLint
    ],
    files: ['*.ts', '*.tsx'], // Applies to TypeScript files
    parser: '@typescript-eslint/parser', // Use TypeScript parser
    parserOptions: {
      ecmaVersion: 'latest', // Use the latest ECMAScript version
      sourceType: 'module', // Use ES modules
      project: './tsconfig.json', // Point to your tsconfig.json
    },
    plugins: ['@typescript-eslint', 'import', 'prettier'],
    rules: {
      // Strict TypeScript rules
      '@typescript-eslint/ban-ts-comment': 'error',
      '@typescript-eslint/explicit-function-return-type': 'warn',
      '@typescript-eslint/explicit-module-boundary-types': 'warn',
      '@typescript-eslint/no-empty-function': 'warn',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-namespace': 'error',
      '@typescript-eslint/no-unused-expressions': 'error',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],

      // Disable conflicting base rules
      'no-unused-vars': 'off',

      // General ESLint rules
      eqeqeq: ['error', 'always'],
      'no-console': 'warn',
      strict: ['error', 'global'],

      // Import sorting
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            ['parent', 'sibling', 'index'],
          ],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],

      // Formatting and empty line rules
      'no-multiple-empty-lines': ['error', { max: 1, maxBOF: 1, maxEOF: 1 }],

      // Prettier integration
      'prettier/prettier': ['error', { singleQuote: true, semi: false }],
    },
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true, // Always try to resolve types
        },
      },
    },
  },
];