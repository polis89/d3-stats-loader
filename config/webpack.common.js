const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    app: './src/App.js'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Production',
      template: 'src/templates/index.hbs'
    })
  ],
  output: {
    filename: 'js/[name].[chunkhash].bundle.js',
    chunkFilename: 'js/[name].bundle.js',
    path: path.resolve(__dirname, '../dist')
  },
  module: {
    rules: [
      {
        test: /\.hbs$/,
        loader: 'handlebars-loader'
      }
      // {
      //   test: /\.sass$/,
      //   use: [
      //     {
      //       loader: MiniCssExtractPlugin.loader,
      //       options: {
      //         // you can specify a publicPath here
      //         // by default it use publicPath in webpackOptions.output
      //         publicPath: '../'
      //       }
      //     },
      //     'css-loader', // translates CSS into CommonJS
      //     'sass-loader' // compiles Sass to CSS
      //   ]
      // }
      // {
      // 	test: /\.js$/,
      // 	loader: 'babel-loader'
      // }
    ]
  }
}
