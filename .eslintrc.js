
module.exports = {
  extends: 'kswedberg',
  globals: {
    google: false,
  },
  rules: {
    indent: [
      'warn',
      2,
      {
        MemberExpression: 'off',
      },
    ],
    'no-underscore-dangle': [
      'warn',
      {
        allow: ['_gaq'],
      },
    ],
  },
};
