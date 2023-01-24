const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const path = require('path')

const copyWebpackPlugin = new CopyWebpackPlugin({
  patterns: [
    {from: "css/**"},
    {from: "fonts/**"}
  ]
})

module.exports = {
  entry: './src/index.ts',
  mode: "development",
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      }
    ]
  },
  devtool: "cheap-source-map",
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: 'bundle-[fullhash].js',
    path: path.resolve(__dirname, './dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html" 
    }),
    copyWebpackPlugin,
    new CleanWebpackPlugin()
    ],
    devServer: {
        static: {
          directory: path.join(__dirname, '/'),
        },
        compress: true,
        port: 4200,
        proxy: {
          '/api': 'http://edufs.edu.htl-leonding.ac.at/~c.aberger/download/5bhitm',
          changeOrigin: true,
          secure: false
        },
    }
}