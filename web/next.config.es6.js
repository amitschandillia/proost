/* eslint-disable no-unused-vars */

import path from 'path';
import glob from 'glob';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import webpack from 'webpack';
import dotenv from 'dotenv';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import withSass from '@zeit/next-sass';
import withCSS from '@zeit/next-css';
import withPurgeCss from 'next-purgecss';

// dotenv.config();
const { parsed: localEnv } = dotenv.config();

module.exports = withCSS(withSass(withPurgeCss({
  distDir: '.build',
  purgeCssPaths: [
    'pages/**/*',
    'components/**/*',
  ],
  webpack: (config, { dev, isServer }) => {
    if (isServer) {
      return config;
    }
    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env': {
          BASE_URL: JSON.stringify(process.env.BASE_URL),
          // REDIS_HOST: JSON.stringify(process.env.REDIS_HOST),
          // REDIS_PORT: JSON.stringify(process.env.REDIS_PORT),
        },
      }),
      new webpack.EnvironmentPlugin(localEnv),
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1,
      }),
    );
    config.optimization.minimizer.push(
      new OptimizeCSSAssetsPlugin({}),
    );
    return config;
  },
})));
