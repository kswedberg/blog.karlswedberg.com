// index.js

module.exports = function(opts) {
  'use strict';
  opts = opts || {};

  return function(files, metalsmith, done) {
    var apiFiles = [];
    var apiFile = {};
    var keys = [
      'title',
      'url',
      'contents',
      'timestamp',
      'link',
      'cats',
      'collection',
      'path'
    ];

    for (var f in files) {
      var file = files[f];
      var cleanedFile = {};
      file.contents = file.contents.toString();

      if (!file.title) {
        continue;
      }

      for (let k in file) {
        if (keys.indexOf(k) !== -1) {
          cleanedFile[k] = file[k];
        }
      }
      console.log(Object.keys(cleanedFile));
      apiFiles.push(cleanedFile);
    }
    apiFile.contents = JSON.stringify(apiFiles, null, 2);
    files['search.json'] = apiFile;
    done();
  };
};
