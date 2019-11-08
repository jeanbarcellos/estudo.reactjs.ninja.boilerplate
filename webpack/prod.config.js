'use strict'

const webpack = require('webpack')
const common = require('./common')

const HtmlPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const ClenarPlugin = require('clean-webpack-plugin')

module.exports = {

  entry: common.entry,

  output: common.output,

  plugins: [
    new ClenarPlugin(['dist'], {
      root: common.paths.root
    }),

    new ExtractTextPlugin({
      filename: '[name]-[hash].css'
    }),

    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'react-build',
      minChunks: ({ resource }) => (
        /node_modules\/(react(-dom)?|fbjs)\//.test(resource)
      )
    }),

    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true
    }),

    // Ordena para carregar os mais leves primeiro
    new webpack.optimize.OccurrenceOrderPlugin(),

    new HtmlPlugin(common.htmlPluginConfig)
  ],

  module: {

    rules: [
      common.standardPreLoader,
      common.jsLoader,
      common.fileLoader,
      common.urlLoader,
      Object.assign({}, common.cssLoader, {
        use: ExtractTextPlugin.extract({
          fallback: common.cssLoader.use[0],
          use: common.cssLoader.use.slice(1)
        })
      })
    ]
  },

  resolve: common.resolve
}
// webpack-dashboard --
