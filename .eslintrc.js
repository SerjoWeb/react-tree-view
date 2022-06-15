module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:react/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      js: true,
      jsx: true,
      tsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    'react',
    '@typescript-eslint'
  ],
  rules: {
    'react/jsx-filename-extension': [1, {
      extensions: ['.js', '.jsx', '.tsx']
    }],
    'comma-dangle': ['error', 'never']
  }
};
