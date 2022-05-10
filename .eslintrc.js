module.exports = {
  root: true,
  extends: ['plugin:prettier/recommended', 'airbnb'],
  plugins: ['prettier'],
  parserOptions: {
    ecmaVersion: 2021,
    project: './tsconfig.json',
  },
  rules: {
    'import/order': 0,
    'prettier/prettier': 'error',
    'import/no-extraneous-dependencies': ['error', { devDependencies: ['**/*.spec.*'] }],
    'jest/no-try-expect': 0,
    'jest/no-conditional-expect': 0,
  },
  // https://github.com/typescript-eslint/typescript-eslint/blob/master/docs/getting-started/linting/FAQ.md#i-get-errors-from-the-no-undef-rule-about-global-variables-not-being-defined-even-though-there-are-no-typescript-errors
  overrides: [
    {
      files: ['*.ts'],
      rules: {
        'no-undef': 'off',
      },
    },
  ],
};
