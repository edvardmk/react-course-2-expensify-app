const path = require('path')

module.exports = {
  devServer: {
    static: path.resolve(__dirname, 'public'),
    historyApiFallback: true,
  },
  devtool: 'eval-cheap-module-source-map',
  entry: './src/app.js',
  mode: 'production',
  module: {
    rules: [{
      test: /\.jsx?$/,
      loader: 'babel-loader',
      exclude: '/node_modules/'
    }, {
      test: /.css$/,
      use: ['style-loader', 'css-loader', 'sass-loader']
    }],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public')
  }
}