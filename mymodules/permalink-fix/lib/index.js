module.exports = function(opts) {
  opts = opts || {};

  return function(files, metalsmith, done) {
    Object.keys(files).forEach(function(file) {
      var data = files[file];
      var out = file;

      if (data.path === 'index-html') {
        out = 'index.html';
        data.path = '';
        delete files[file];
      }
      files[out] = data;
    });
    done();
  };
};
