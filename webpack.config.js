var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require('path');
var CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  context: path.join(__dirname, "/src"),
  devtool: debug ? "eval" : "source-map",
  target : "node",
  entry  : "./index.js",
  output : {
    path      : __dirname + "/dist/",
    publicPath: '/',
    filename  : 'bundle.js'
  },
  resolve: {
    modules   : ["node_modules", __dirname + "/"],
    extensions: ['.js']
  },
  module : {
    rules: [
      {
        test   : /\.js?$/,
        exclude: /node_modules/,
        loader : 'babel-loader',
        query  : {
          presets: ['env', 'stage-0'],
          plugins: ['transform-decorators-legacy', 'transform-async-to-generator', 'transform-runtime']
        }
      }
    ]
  },
  plugins: debug ? [] : [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new CompressionPlugin({
      asset    : "[path].gz[query]",
      algorithm: "gzip",
      test     : /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio : 0.8
    })
  ],
};