// webpack helps track the changes and response immediately

var webpack = require('webpack');

module.exports = {
    devtool: 'inline-source-map',
    mode: 'development',
    entry: [
        'webpack-hot-middleware/client',
        './client/client.js'
    ],
    output: {
      path: require("path").resolve("./dist"),
      filename: 'bundle.js',
      publicPath: '/'
    },
    plugins: [
        // change immediately
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ],

    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          query: {
            presets: ['react', 'es2015', 'react-hmre']
          }
        }
      ]
    }
  }