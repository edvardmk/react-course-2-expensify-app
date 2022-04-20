const path = require('path')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env) => {
  return {
    devServer: {
      static: path.resolve(__dirname, 'public'),
      historyApiFallback: true,
    },
    devtool: env.production ? 'source-map' : 'eval-cheap-module-source-map',
    entry: './src/app.js',
    mode: 'production',
    module: {
      rules: [{
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: '/node_modules/'
      }, {
        test: /.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          ...(env.production
            ? ["css-loader", 'sass-loader']
            : [{
                loader: "css-loader",
                options: { sourceMap: true },
              }, {
                loader: "sass-loader",
                options: { sourceMap: true },
              }
            ]
          )
        ],
      }],
    },
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'public')
    },
    plugins: [new MiniCssExtractPlugin({ 
      filename: 'styles.css'
    })],
  }
}