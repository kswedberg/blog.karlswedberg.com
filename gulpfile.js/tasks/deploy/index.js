require('require-dir')();
var inquirer = require('bluebird-inquirer');
var gulp = require('gulp');

gulp.task('deploy', function deployWithPrompts(done) {
  return inquirer.prompt([
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
    var tasks = gulp.series(answers.tasks);

    return tasks.call(gulp, done);
  });
});
