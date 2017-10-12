const path = require('path');
const webpack = require('webpack');
const MinifyPlugin = require('babel-minify-webpack-plugin');
const genDefaultConfig = require('@storybook/react/dist/server/config/defaults/webpack.config.js');

const DEV = process.env.NODE_ENV !== 'production';

const prodPlugins = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
  }),
  new webpack.optimize.OccurrenceOrderPlugin(),
  new MinifyPlugin(),
];

module.exports = (baseConfig, env) => {
  const config = genDefaultConfig(baseConfig, env);
  const defaultPlugins = config.plugins;
  const overwrite = {
    devtool: 'inline-source-map',
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: ['babel-loader', 'eslint-loader'],
        },
      ],
    },
    plugins: DEV ? defaultPlugins : prodPlugins,
  };

  return Object.assign(config, overwrite);
}