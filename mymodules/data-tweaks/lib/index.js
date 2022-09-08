/* jshint node: true */
/**
 * Module Exports
 */

module.exports = function(opts) {
  opts = opts || {};

  return function(files, metalsmith, done) {

    let rNonAlphaNumeric = /[^a-z0-9]+/g;
    let rStartEndHyphen = /^\-+|\-$/g;
    let url = require('url');
    let metadata = metalsmith.metadata();

    Object.keys(files).forEach((file) => {
      let data = files[file];
      let dataUrl = (data.url || data.title || '').toLowerCase();
      let dataDate = new Date(data.date);

      // Add timestamp for better sortBy
      data.timestamp = dataDate.getTime();

      // URL adding
      if (dataUrl !== data.url) {
        dataUrl = dataUrl.replace(rNonAlphaNumeric, '-');
      }

      dataUrl = dataUrl.replace(rStartEndHyphen, '');
      data.url = dataUrl;

      data.link = data.link || url.resolve(metadata.url, `${data.url.replace(/\/$/, '')}/`);

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
