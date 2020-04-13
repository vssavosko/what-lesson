module.exports = {
  extends: ['./node_modules/poetic/config/eslint/eslint-config.js'],
  plugins: ['jest'],
  rules: {
    'no-shadow': 0,
    'react/no-array-index-key': 0,
    'react/jsx-props-no-spreading': 0,
    'react/prop-types': 0,
    'import/prefer-default-export': 0,
    '@typescript-eslint/no-explicit-any': 0,
    'no-param-reassign': 0,
    '@typescript-eslint/interface-name-prefix': 0,
  },
};
