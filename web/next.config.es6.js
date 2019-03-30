import path from 'path';
import glob from 'glob';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import webpack from 'webpack';
import dotenv from 'dotenv';

dotenv.config();

module.exports = {
  distDir: '.build',
  webpack: (config) => {
    return config;
  },
};
