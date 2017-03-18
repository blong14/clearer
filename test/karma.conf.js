'use strict';

module.exports = (config) => {
    config.set({
        autoWatch: true,
        browsers: ['PhantomJS'],
        files: [
            '../node_modules/es6-shim/es6-shim.js',
            'karma.entry.js'
        ],
        frameworks: ['jasmine'],
        logLevel: config.LOG_INFO,
        preprocessors: {
            'karma.entry.js': ['webpack', 'sourcemap']
        },
        reporters: ['dots'],
        singleRun: true,
        webpack: require('../webpack.test'),
        webpackServer: {
            noInfo: true
        }
    })
}