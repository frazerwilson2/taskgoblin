const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public')
  },
  resolve: {
  	extensions: ['.js', '.jsx', '.css', 'scss'],
  	modules: [
      'node_modules'
    ]   
  },
  module: {
	rules: [
    {
      test: /\.scss$/,
      use: ExtractTextPlugin.extract('css-loader!sass-loader')
    },
    // {
    //   test: /\.scss$/,
    //   use: [{
    //      loader: "style-loader" // creates style nodes from JS strings
    //  }, {
    //     loader: "css-loader" // translates CSS into CommonJS
    //  }, {
    //     loader: "sass-loader" // compiles Sass to CSS
    //  }]
    // }
	],
  loaders: [
              { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader") }
          ]
  },
  plugins: [
  new ExtractTextPlugin("styles.css"),
  new OptimizeCssAssetsPlugin({
//    assetNameRegExp: /\.min\.css$/,
    cssProcessorOptions: { discardComments: { removeAll: true } }
  }),
	new UglifyJSPlugin()
  ]
};