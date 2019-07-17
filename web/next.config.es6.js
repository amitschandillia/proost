/* eslint-disable no-unused-vars */

import path from 'path';
import glob from 'glob';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import webpack from 'webpack';
import dotenv from 'dotenv';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import withSass from '@zeit/next-sass';
import withPurgeCss from 'next-purgecss';

dotenv.config();

module.exports = withSass(withPurgeCss({
  distDir: '.build',
  webpack: (config, { dev, isServer }) => {
    if (isServer) {
      return config;
    }
    config.plugins.push(
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1,
      }),
    );
    config.optimization.minimizer.push(
      new OptimizeCSSAssetsPlugin({}),
    );
    return config;
  },
}));
