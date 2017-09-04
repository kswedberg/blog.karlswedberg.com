
var path = require('path');
var webpack = require('webpack');

/**
 * Wrapping in defer so we can use config vars in this config (yodawg)
 * https://github.com/lorenwest/node-config/wiki/Configuration-Files#javascript-module---js
 */

module.exports = function(config) {
  require('babel-loader');
  var webpackConfig = {
    middlewarePublicPath: '/assets/js/',
    entry: {
      head: [path.join(config.paths.srcAssets, 'js/head.js')],
      tail: [path.join(config.paths.srcAssets, 'js/tail.js')]
    },
    output: {
      filename: '[name].js',
      chunkFilename: '[name].js',
      path: path.join(config.paths.destAssets, 'js'),
    },
    resolve: {
      modulesDirectories: ['node_modules', path.join(config.paths.srcAssets, 'js')]
    },
    module: {
      loaders: [
        {
          loader: 'expose-loader?$!expose-loader?jQuery',
          test: require.resolve('jquery'),
        },
        // {
        //   loader: 'expose?WebFont',
        //   test: require.resolve('webfontloader'),
        // },
        {
          loader: 'babel-loader',
          test: /\.jsx?$/,
          include: [
            /app\/assets\//,
            /fmjs/,
          ],
          // https://babeljs.io/docs/usage/options/
        },
        {
          loader: 'nunjucks-loader',
          test: /\.(nj|nunjucks|html|twig)$/,
          query: {
            config: __dirname + '/nunjucks.js'
          },
        },
      ]
    },
    devServer: {
      host: 'localhost',
      port: 8080,
    },
    plugins: [
      new webpack.BannerPlugin('Built by Karl Swedberg (karlswedberg.com)', {
        entryOnly: true
      })
    ]
  };

  if (process.env.BUILD_ENV === 'development') {
    webpackConfig.devtool = 'sourcemap';
    webpackConfig.debug = true;
  } else {
    let dc = 'drop_console';
    let compress = {
      warnings: false
    };

    compress[dc] = true;

    webpackConfig.plugins = webpackConfig.plugins.concat(
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production')
        }
      }),
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: compress
      })
    );
  }

  return webpackConfig;
};
