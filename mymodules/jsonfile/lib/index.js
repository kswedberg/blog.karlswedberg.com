// index.js

module.exports = function(opts) {
  'use strict';

  opts = opts || {};

  return function(files, metalsmith, done) {
    let apiFiles = [];
    let apiFile = {};
    let keys = [
      'title',
      'url',
      'contents',
      'timestamp',
      'link',
      'cats',
      'collection',
      'path',
    ];

    for (let f in files) {
      let file = files[f];
      let cleanedFile = {};

      file.contents = file.contents.toString();

      if (!file.title) {
        continue;
      }

      for (let k in file) {
        if (keys.indexOf(k) !== -1) {
          cleanedFile[k] = file[k];
        }
      }

      apiFiles.push(cleanedFile);
    }
    apiFile.contents = JSON.stringify(apiFiles, null, 2);
    files['search.json'] = apiFile;
    done();
  };
};
