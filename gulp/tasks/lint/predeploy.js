let gulp = require('gulp');
let path = require('path');
let fs = require('fs');
let config = require(path.join(process.cwd(), 'gulp/config/index.js'));

let cheerio = require('cheerio');

gulp.task('lint:predeploy', (cb) => {
  let revs = require(path.join(config.paths.destAssets, 'json/rev-manifest.json'));
  let homepage = fs.readFileSync(path.join(config.paths.dest, 'index.html'), 'utf-8');
  let $ = cheerio.load(homepage);

  $('script[data-id]').each(function() {
    let id = $(this).data('id');
    let srcBase = path.basename($(this).attr('src'));

    if (revs[id] !== srcBase) {
      throw new Error(`Paths do not match: ${revs[id]}${srcBase}`);
    }
  });

  console.log('Revisions in pages match the ones in rev-manifest.json:');
  console.log(revs);
  cb();
});
