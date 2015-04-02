/* jshint node: true */
var _ = require('lodash');
var yargs = require('yargs');
var Bootstrap = function Bootstrap() {
  this.environments = [
    {
      name: 'production',
      aliases: ['prod', 'live'],
      default: true,
    },
    {
      name: 'development',
      aliases: ['dev']
    }
  ];

  // Set environment variable
  this.setEnv();
};

module.exports = Bootstrap;

Bootstrap.prototype.getEnv = function getEnv() {
  var defaultEnv = _.result(_.findWhere(this.environments, {'default': true}), 'name');
  var argv = yargs.option('env', {
    alias: 'e',
  }).argv;

  var env = process.env.NODE_ENV || argv.env || defaultEnv;
  env = this.normalizeEnv(env);

  return env;
};

Bootstrap.prototype.setEnv = function setEnv(env) {
  env = env || this.getEnv();
  process.env.NODE_ENV = this.normalizeEnv(env);
};

Bootstrap.prototype.normalizeEnv = function(env) {
  var match = _.find(this.environments, function(obj) {
    var aliases = obj.aliases || [];

    return obj.name === env || aliases.indexOf(env) !== -1;
  }, 'name');

  return match ? match.name : env;
};
