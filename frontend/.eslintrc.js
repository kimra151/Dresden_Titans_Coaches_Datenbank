module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/no-explicit-any': 'warn',
    'react/prop-types': 'off',
    // Verhindert zu 100%, dass Backend-Variablen im Browser landen
    "no-restricted-imports": [
      "error",
      {
        paths: [
          {
            name: "@dresden-titans/env/server",
            message: "🚨 SICHERHEITSRISIKO: Nutze '@dresden-titans/env/client' im Frontend!"
          },
          {
            name: "@dresden-titans/database",
            message: "🚨 ARCHITEKTUR-FEHLER: Das Frontend darf nicht direkt auf Prisma zugreifen!"
          }
        ]
      }
    ]
  },
  ignorePatterns: ['.next', 'node_modules', 'dist'],
};
