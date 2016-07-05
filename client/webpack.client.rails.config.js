// Run like this:
// cd client && npm run build:dev:client
// Note that Foreman (Procfile.dev) has also been configured to take care of this.

// NOTE: All style sheets handled by the asset pipeline in rails

const webpack = require('webpack');
const config = require('./webpack.client.base.config');
const devBuild = process.env.NODE_ENV !== 'production';

config.output = {
    filename: '[name]-bundle.js',
    path: '../app/assets/webpack',
    publicPath: 'http://localhost:8080/'
};

// You can add entry points specific to rails here
// The es5-shim/sham is for capybara testing
config.entry.vendor.unshift(
    'es5-shim/es5-shim',
    'es5-shim/es5-sham'
);

// jquery-ujs MUST GO AFTER jquery, so must use 'push'
config.entry.vendor.push('jquery-ujs');

// See webpack.common.config for adding modules common to both the webpack dev server and rails
config.module.loaders.push(
    {
        test: /\.jsx?$/,
        loaders: ['react-hot', 'babel?cacheDirectory'],
        exclude: /node_modules/,
    },

    { test: /\.(sass|scss)$/,
        loaders: ['style', 'css?sourceMap', 'sass?sourceMap'] },

    { test: /\.(jpg|png|svg)$/,
        loader: 'file' },
    {
        test: require.resolve('react'),
        loader: 'imports?shim=es5-shim/es5-shim&sham=es5-shim/es5-sham',
    },
    {
        test: require.resolve('jquery-ujs'),
        loader: 'imports?jQuery=jquery',
    }
);

module.exports = config;

if (devBuild) {
    console.log('Webpack dev build for Rails'); // eslint-disable-line no-console
    module.exports.devtool = 'eval-source-map';
} else {
    config.plugins.push(
        new webpack.optimize.DedupePlugin()
    );
    console.log('Webpack production build for Rails'); // eslint-disable-line no-console
}

config.devServer = {
    hot: true,
    publicPath: config.output.publicPath,
    stats: {
        assets: true, colors: true, version: true, hash: true,
        timings: true, chunks: true, chunkModules: false, cached: true,
        reasons: true, errorDetails: true
    }
};