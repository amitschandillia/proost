const path = require('path');
const glob = require('glob');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// eslint-disable-next-line import/no-extraneous-dependencies
const webpack = require('webpack');
// require('dotenv').config();
const dotenv = require('dotenv');
const dotenvExpand = require('dotenv-expand');
// Initialize global constants
dotenvExpand(dotenv.config({ path: '../../proost/.env' }));

module.exports = {
  distDir: '.build',
  webpack: (config) => {
    // config.module.rules.push(
    //   {
    //     test: /\.(css|scss)$/,
    //     loader: 'emit-file-loader',
    //     options: {
    //       name: path.join('dist', '[path][name].[ext]'),
    //     },
    //   },
    //   {
    //     test: /\.(css|sass|scss)$/,
    //     use: ExtractTextPlugin.extract([
    //       {
    //         loader: 'css-loader',
    //         options: {
    //           sourceMap: false,
    //           minimize: true,
    //         },
    //       },
    //       'postcss-loader',
    //       {
    //         loader: 'sass-loader',
    //         options: {
    //           includePaths: ['styles', 'node_modules']
    //             .map(d => path.join(__dirname, d))
    //             .map(g => glob.sync(g))
    //             .reduce((a, c) => a.concat(c), []),
    //         },
    //       },
    //     ]),
    //   },
    //   {
    //     test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    //     loader: 'url-loader?limit=10000&mimetype=application/font-woff&outputPath=static/',
    //   },
    //   {
    //     test: /\.(svg|ttf|eot)$/i,
    //     loader: 'file-loader?outputPath=static/',
    //     options: {
    //       name: '[path][name].[ext]',
    //     },
    //   },
    //   {
    //     test: /\.(png|jpe?g|gif)$/i,
    //     loaders: [
    //       'file-loader?outputPath=static/',
    //       'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false',
    //     ],
    //   },
    // );
    // config.plugins.push(
    //   new ExtractTextPlugin({
    //     filename: path.join('static', `${process.env.CSS}.min.css`),
    //   }),
    //   new webpack.DefinePlugin({
    //     'process.env.CSS': JSON.stringify(process.env.CSS),
    //     'process.env.NAVBAR_LOGO': JSON.stringify(process.env.NAVBAR_LOGO),
    //   }),
    // );
    return config;
  },
};
