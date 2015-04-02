/* jshint node: true */
/**
 * Module Exports
 */

module.exports = function(opts) {
  opts = opts || {};

  return function(files, metalsmith, done) {

    var rNonAlphaNumeric = /[^a-z0-9]+/g;
    var rStartEndHyphen = /^\-+|\-$/g;
    var url = require('url');
    var metadata = metalsmith.metadata();

    Object.keys(files).forEach(function(file) {
      var data = files[file];
      var dataUrl = (data.url || data.title || '').toLowerCase();

      // URL adding
      if (dataUrl !== data.url) {
        dataUrl = dataUrl.replace(rNonAlphaNumeric, '-');
      }

      dataUrl = dataUrl.replace(rStartEndHyphen, '');
      data.url = dataUrl;

      data.link = data.link || url.resolve(metadata.url, data.url.replace(/\/$/, '') + '/');

      // Category splitting
      data.cats = [];

      if (data.categories) {
        data.cats = data.categories.split(/\s+/);
      }

      // Body
      if (/\.html?$/.test(file)) {
        data.body = data.contents.toString();
      }

      files[file] = data;
    });
    done();
  };
};
