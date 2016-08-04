const merge = require('webpack-merge');
const TARGET = process.env.npm_lifecycle_event;
process.env.BABEL_ENV = TARGET;

let common = require('./webpack-config/common');

if(TARGET === 'start' || !TARGET) {
  module.exports = common;
}

if(TARGET === 'test') {
  common.entry = {}; // override entry to avoid errors
  module.exports = merge(common, require('./webpack-config/test'))
};
