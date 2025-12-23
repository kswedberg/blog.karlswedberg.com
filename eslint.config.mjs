import eslintPluginAstro from 'eslint-plugin-astro';
import jsConfig from 'eslint-config-kswedberg/flat/js.mjs';

const rules = jsConfig.find((rule) => rule.name === 'kswedberg/js')?.rules;

rules['@stylistic/jsx-quotes'] = ['warn', 'prefer-double'];
export default [
  ...eslintPluginAstro.configs.recommended,
  ...jsConfig,
  {
    name: 'astro/extras',

    ignores: [
      'src/components/PageFooter.astro',
      '.astro/**',
      'dist/**',
    ],
  },
];
