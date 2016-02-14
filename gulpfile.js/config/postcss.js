var path = require('path');

/**
 * Reminder: Order is important
 */

module.exports = function(config) {
  var srcDir   = path.join(config.paths.srcAssets, 'css');
  var plugins  = [
    require('postcss-import')({
      glob: true
    }),
    require('postcss-mixins')({
      mixinsDir: path.join(srcDir, 'mixins'),
    }),
    // require('postcss-map')({
    //   basePath: path.join(config.paths.srcAssets, 'json'),
    //   maps: ['breakpoints.json']
    // }),
    require('postcss-assets')({
      basePath: config.paths.src,
      loadPaths: [config.paths.srcAssets]
    }),
    require('postcss-nested')(),
    require('postcss-easings')(),
    require('postcss-size')(),
    require('postcss-extend')(),
    require('postcss-custom-properties')(),
    require('postcss-strip-units')(),
    require('postcss-calc')(),
    require('postcss-custom-media')(),
    require('postcss-media-minmax')(),
    require('postcss-custom-selectors')(),
    require('postcss-color-hex-alpha')(),
    require('postcss-color-function')(),

    // require('pixrem')(),
    require('postcss-pseudoelements')(),
    require('postcss-color-rgba-fallback')(),
    require('autoprefixer')({
      'browsers': [
        'last 2 versions',
        'ie >= 8',
      ]
    }),
    require('postcss-reporter')({
      clearMessages: true
    }),
  ];

  var prodPlugins = [
    require('css-mqpacker')(),
    require('cssnano')({
      'autoprefixer': false,
      'discardUnused': false,
      'zindex': false,
      'reduceIndents': false,
      'mergeIndents': false,
    }),
  ];

  var lintPlugins = [
    // require('postcss-bem-linter')('suit'),
    require('postcss-reporter')({
      clearMessages: true
    })
  ];

  return {
    plugins: plugins,
    lintPlugins: lintPlugins,
    prodPlugins: prodPlugins,
  };
};
