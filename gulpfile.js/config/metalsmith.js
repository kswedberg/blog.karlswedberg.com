var path = require('path');
var cwd = process.cwd();

/**
 * Wrapping in defer so we can use config vars in this config (yodawg)
 * https://github.com/lorenwest/node-config/wiki/Configuration-Files#javascript-module---js
 */

module.exports = function(config) {
  var destination = config.paths.dest;
  var templateDirectory = 'templates';
  var ms = {
    source: path.join(cwd, 'content'),
    destination: destination,
    templateDirectory: templateDirectory,
    metadata: {
      siteTitle: 'Good Blog, Karl',
      description: 'Random quasi-technical stuff I want to remember',
      siteUrl: 'https://blog.karlswedberg.com/',
      license: 'https://creativecommons.org/licenses/by-sa/3.0/',

      // Can't do this here. :( Have to do it inside the gulp build:blog task
      // resources: require(path.join(destination, 'assets/json/rev-manifest.json'));,
      author: {
        name: 'Karl Swedberg',
        link: 'https://karlswedberg.com/'
      }
    },

    plugins: [
      {
        module: 'metalsmith-metallic'
      },
      {
        module: 'metalsmith-ignore',
        options: [
          '_drafts/*'
        ]
      },
      {
        module: path.join(cwd, './mymodules/data-tweaks/lib/index')
      },
      {
        module: 'metalsmith-collections',
        options: {
          posts: {
            pattern: '_posts/*.md',
            sortBy: 'timestamp',
            reverse: true
          },
          pages: {
            pattern: '_pages/**/*.md'
          }
        }
      },
      {
        module: 'metalsmith-markdown',
        options: {
          gfm: true,
          smartypants: true
        }
      },

      {
        module: 'metalsmith-tags',
        options: {
          handle: 'categories',
          path: 'topic/:tag/index.html',
          pathPage: 'topic/:tag/:num/index.html',
          template: 'categories.html',
          indexPage: 'topic/index.html',
          indexTemplate: 'category_index.html',
          delimiter: /\s+/,
          perPage: 10,
          sortBy: 'date',
          reverse: true
        }
      },
      {
        module: 'metalsmith-permalinks',
        // branch: '!**/index.{md,html}',
        options: {
          // ':url' pattern available via my data-tweaks plugin used above
          pattern: ':url',
          relative: false
        }
      },
      {
        module: path.join(cwd, './mymodules/permalink-fix/lib/index')
      },
      {
        module: 'metalsmith-templates',
        options: {
            engine: 'swig',
            directory: templateDirectory,
            default: 'post.html',
            cache: false
          }
      },

      {
        module: path.join(cwd, './mymodules/atom-feed/'),
        options: {
          destination: 'atom.xml',
          collection: 'posts',
          content: {
            type: 'full',
            property: 'contents'
          }
        }
      }
    ],
    prodPlugins: [
      {
        module: 'metalsmith-html-minifier',
        options: '*.html',
        extra: {
          removeRedundantAttributes: false
        }
      }
    ]
  };

  ['title', 'url'].forEach(function(key) {
    if (!key) {
      return;
    }
    var siteKey = 'site' + key.charAt(0).toUpperCase() + key.slice(1);
    ms.metadata[key] = ms.metadata[siteKey];
  });

  return ms;
};
