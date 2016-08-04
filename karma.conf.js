const path = require('path');

module.exports = function karmaConfig(config) {
  config.set({
    frameworks: [ 'mocha', 'chai' ],
    reporters: [ 'mocha' ],
    files: [
      'test/index.js'
    ],
    preprocessors: {
      'test/index.js': [ 'webpack', 'sourcemap' ]
    },
    browsers: [ 'PhantomJS' ],
    singleRun: true,
    webpack: require('./webpack.config'),
    webpackMiddleware: {
      noInfo: true
    },
    mochaReporter: {
      showDiff: true
    }
  });

  config.plugins ? config.plugins.push('karma-mocha-reporter') : config.plugins = ['karma-mocha-reporter'];
};
