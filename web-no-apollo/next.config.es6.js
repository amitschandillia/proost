/* eslint-disable no-unused-vars */

import withCSS from '@zeit/next-css';
import withSass from '@zeit/next-sass';
import dotenv from 'dotenv';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import glob from 'glob';
import withPurgeCss from 'next-purgecss';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import path from 'path';
import webpack from 'webpack';

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
  env: {
    BRAND_NAME: process.env.BRAND_NAME,
    COPYRIGHT_ENTITY: process.env.COPYRIGHT_ENTITY,
    JWT_SECRET: process.env.JWT_SECRET,
    USER_DATA_COOKIE: process.env.USER_DATA_COOKIE,
    USER_REMEMBER_COOKIE: process.env.USER_REMEMBER_COOKIE,
    SESSION_COOKIE: process.env.SESSION_COOKIE,
    USER_LANGUAGE_COOKIE: process.env.USER_LANGUAGE_COOKIE,
    THIS_DOMAIN_LONG: process.env.THIS_DOMAIN_LONG,
    REDIS_PORT: process.env.REDIS_PORT,
    REDIS_HOST: process.env.REDIS_HOST,
  },
})));
