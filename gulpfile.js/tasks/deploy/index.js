require('require-dir')();
var inquirer = require('bluebird-inquirer');
var gulp = require('gulp');

gulp.task('nothing', function(done) {
  console.log('I RAN NOTHING. NOTHING RAN!');
  done();
});

gulp.task('deploy', function(done) {
  if (true) {
    console.log('This task does not work. Run gulp deploy:sync and gulp deply:ping independently');

    return;
  }

  inquirer.prompt([
    {
      name: 'tasks',
      type: 'checkbox',
      message: 'Which deploy tasks do you want to complete?',
      choices: [
        {
          checked: true,
          name: 'Build files and rsync to remote',
          value: 'deploy:sync'
        },
        {
          name: 'Ping the feedburner URL.',
          value: 'deploy:ping'
        }
      ]
    }
  ])
  .then(function(answers) {
    // this does not work. tasks never run:
    console.log('This does NOT work. Tasks never run!');

    answers.tasks.push(done);
    gulp.series.apply(answers.tasks);
  });
});
