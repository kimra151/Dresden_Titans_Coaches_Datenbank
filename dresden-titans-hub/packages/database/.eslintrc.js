module.exports = {
  root: true,
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  env: { node: true, jest: true },
  ignorePatterns: ['.eslintrc.js', 'dist'],
};
