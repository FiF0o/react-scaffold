'use strict';

const path = require('path');
const webpack = require('webpack');
const paths = require('./paths');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


// TODO Move into constants to void duplication....
const publicPath = '/';


/**
 * @param {*} envOpts 
 * @param {*} webpackConfigOpts: {(bail String, devtool: String, entry: [], output: {}, rules: [], plugins: [], performance: Bool)}
 */

// Use full control mode is more base overrides are needed
const createConfig = (envOpts, webpackConfigOpts) => {

  const webpackConfig = {
    bail: envOpts.raw.NODE_ENV === 'production' ? true : false,
    
    devtool: envOpts.raw.NODE_ENV === 'development' ? 'cheap-module-source-map' : false, // 'source-map' : false
    
    entry: [
      require.resolve('./polyfills'),
    ]
      .concat(webpackConfigOpts.entry),

    output: Object.assign({
      pathinfo: envOpts.raw.NODE_ENV === 'development' ? true : false,
      filename: 'static/js/bundle.js',
      chunkFilename: 'static/js/[name].chunk.js',
    
      publicPath: webpackConfigOpts.publicPath ? webpackConfigOpts.publicPath : publicPath,
      devtoolModuleFilenameTemplate: info =>
        path.resolve(info.absoluteResourcePath).replace(/\\/g, '/'),
    }, webpackConfigOpts.output),

    // Don't need to override this config for now
    resolve: {
      modules: ['node_modules', paths.appNodeModules].concat(
        process.env.NODE_PATH.split(path.delimiter).filter(Boolean)
      ),

      extensions: [
        '.mjs',
        '.web.ts',
        '.ts',
        '.web.tsx',
        '.tsx',
        '.web.js',
        '.js',
        '.json',
        '.web.jsx',
        '.jsx',
        '.sass'
      ],
      alias: {
        'react-native': 'react-native-web',
        // relative to `/config`, will import index.scss of each themes/<BRAND>/
        brand: path.resolve(__dirname, '../', `src/themes/${envOpts.raw.BRAND}/index.scss`),
      },
      plugins: [
        new ModuleScopePlugin(paths.appSrc, [paths.appPackageJson]),
        new TsconfigPathsPlugin({ configFile: paths.appTsConfig }),
      ]
    },

    module: {
      strictExportPresence: true,
      // Only pushing new loaders for now - css output for Prod
      rules: [
        {
          test: /\.(js|jsx|mjs)$/,
          loader: require.resolve('source-map-loader'),
          enforce: 'pre',
          include: paths.appSrc,
        },
        {
          oneOf: [
            {
              test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
              loader: require.resolve('url-loader'),
              options: {
                limit: 10000,
                name: 'static/media/[name].[hash:8].[ext]',
              },
            },
            {
              test: /\.(js|jsx|mjs)$/,
              include: paths.appSrc,
              loader: require.resolve('babel-loader'),
              options: {
                
                compact: true,
              },
            },
            {
              test: /\.(ts|tsx)$/,
              include: paths.appSrc,
              use: [
                {
                  loader: require.resolve('ts-loader'),
                  options: {
                    transpileOnly: true,
                  },
                },
              ],
            },
            {
              test: /\.scss$/,
              loader: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [
                  {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 1,
                        minimize: false
                    }
                  },
                  {
                    loader: require.resolve('postcss-loader'),
                    options: {
                      // Necessary for external CSS imports to work
                      // https://github.com/facebookincubator/create-react-app/issues/2677
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
                    }
                  },
                  require.resolve("sass-loader")
                ]
              })
            },
            {
              test: [/\.woff$/, /\.woff2$/, /\.eot$/, /\.ttf$/, /\.otf$/],
              include: paths.appSrc,
              loader: require.resolve('url-loader'),
              options: {
                limit: 10000,
                name: 'static/assets/[name].[hash:8].[ext]',
              },
            },
            {
              exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/, /\.scss$/, /\.sass$/],
              loader: require.resolve('file-loader'),
              options: {
                name: 'static/media/[name].[hash:8].[ext]',
              },
            },
          ],
        },
      ].concat(webpackConfigOpts.rules),
    },

    plugins: [
      new InterpolateHtmlPlugin(envOpts.raw),
      new webpack.DefinePlugin(envOpts.stringified),
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      // CopyWebpackPlugin
    ]
      .concat(webpackConfigOpts.plugins),

    node: {
      dgram: 'empty',
      fs: 'empty',
      net: 'empty',
      tls: 'empty',
      child_process: 'empty',
    },

    performance: Object.assign({hints: false}, webpackConfigOpts.performance)

  }
  
  return webpackConfig
};


module.exports = {
  createConfig
}
