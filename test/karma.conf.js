'use strict';

module.exports = (config) => {
    config.set({
        autoWatch: true,
        browsers: ['Chrome'],
        files: [
            'karma.entry.js'
        ],
        frameworks: ['jasmine'],
        logLevel: config.LOG_INFO,
        preprocessors: {
            'karma.entry.js': ['webpack', 'sourcemap']
        },
        reporters: ['dots'],
        singleRun: false,
        webpack: require('../webpack.test'),
        webpackServer: {
            noInfo: true
        }
    })
}