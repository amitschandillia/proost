/* eslint-disable no-unused-vars */

import path from 'path';
import glob from 'glob';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import webpack from 'webpack';
import dotenv from 'dotenv';

import withSass from '@zeit/next-sass';

dotenv.config();

module.exports = withSass({
  distDir: '.build',
  webpack: (config, options) => config,
});
