
module.exports = {
  extends: [
    'kswedberg',
    'plugin:astro/recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  env: {
    node: true,
    browser: true,
    es2020: true,
  },

  overrides: [
    {
      files: ['*.astro'],
      parser: 'astro-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.astro'],
      },
      rules: {
        'jsx-quotes': ['warn', 'prefer-double'],
        // "astro/no-set-html-directive": "error"
      },
    },
  ],

};
