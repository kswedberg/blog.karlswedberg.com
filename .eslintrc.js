module.exports = {
  'extends': 'kswedberg',
  globals: {
    google: false
  },
  rules: {
    'no-underscore-dangle': [
      'warn',
      {
        allow: ['_gaq']
      }
    ]
  }
};
