/* eslint-disable no-unused-vars */

import path from 'path';
import glob from 'glob';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import webpack from 'webpack';
import dotenv from 'dotenv';

import withCSS from '@zeit/next-css';

dotenv.config();

module.exports = withCSS({
  distDir: '.build',
  webpack: (config, options) => config,
});
