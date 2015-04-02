var gulp = require('gulp');
var path = require('path');
var fs = require('fs');
var config = require('config');
var cheerio = require('cheerio');

gulp.task('lint:predeploy', function() {
  var revs = require(path.join(config.get('paths.dest'), 'assets/json/rev-manifest.json'));
  var homepage = fs.readFileSync(path.join(config.get('paths.dest'), 'index.html'), 'utf-8');
  var $ = cheerio.load(homepage);

  $('script[data-id]').each(function() {
    var id = $(this).data('id');
    var srcBase = path.basename($(this).attr('src'));

    if (revs[id] !== srcBase) {
      throw new Error('Paths do not match: ' + revs[id] + srcBase);
    }
  });

  console.log(revs);

});
