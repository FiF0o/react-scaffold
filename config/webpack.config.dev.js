'use strict';

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

const getClientEnvironment = require('./env');
const paths = require('./paths');

/**
 * Extended Webpack config from CRA
 * - CRA: https://github.com/facebook/create-react-app
 * - Webpack config: https://webpack.js.org/configuration/
 *
 * webpackConfigOpts accepts the following keys for overrides
 * bail: String
 * devtool: String
 * entry: []
 * output: {}
 * rules[] --> (module.rules)
 * plugins: []
 * performance: Bool
 */
const {createConfig} = require('./webpack.create.config');

const publicPath = '/';
const publicUrl = '';
const env = getClientEnvironment(publicUrl);


const devOpts = {
  entry: [
    require.resolve('react-dev-utils/webpackHotDevClient'),
    paths.appIndexJs,
  ],

  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml,
    }),
    new ForkTsCheckerWebpackPlugin({
      async: false,
      watch: paths.appSrc,
      tsconfig: paths.appTsConfig,
      tslint: paths.appTsLint,
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new CaseSensitivePathsPlugin(),
    new WatchMissingNodeModulesPlugin(paths.appNodeModules),
    new ExtractTextPlugin({
      filename: '[name].css',
      disable: true,
      allChunks: true
    })
  ],
  rules: [
    {
      test: /\.css$/,
      use: [
        require.resolve('style-loader'),
        {
          loader: require.resolve('css-loader'),
          options: {
            importLoaders: 1,
          },
        },
        {
          loader: require.resolve('postcss-loader'),
          options: {
            ident: 'postcss',
            plugins: () => [
              require('postcss-flexbugs-fixes'),
              autoprefixer({
                browsers: [
                  '>1%',
                  'last 4 versions',
                  'Firefox ESR',
                  'not ie < 9', // React doesn't support IE8 anyway
                ],
                flexbox: 'no-2009',
              }),
            ],
          },
        },
      ],
    },
  ]
}


/** returns a webpack config Object */
module.exports = createConfig(env, devOpts)
