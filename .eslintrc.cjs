
module.exports = {
  extends: [
    'plugin:astro/recommended',
    'kswedberg',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  env: {
    node: true,
    browser: true,
    es2024: true,
  },

  overrides: [
    {
      files: ['*.vue'],
      extends: ['kswedberg/vue3'],
    },
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
