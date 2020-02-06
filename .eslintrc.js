module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    // 'airbnb-base',
    "airbnb-typescript", 
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    'import/extensions': 0,
    "arrow-parens": ["error", "as-needed"],
    "comma-dangle": ["error", "always-multiline"],
    "semi": [2, "always"],
    "arrow-body-style": 0,
    "object-curly-newline": 0,
    "no-param-reassign": 0,
    "implicit-arrow-linebreak": 0,
    "operator-linebreak": 0,
  },
};
