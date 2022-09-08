module.exports = function(opts) {
  opts = opts || {};

  return function(files, metalsmith, done) {
    Object.keys(files).forEach((file) => {
      let data = files[file];
      let out = file;

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
