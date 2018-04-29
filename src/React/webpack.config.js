const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

const CSSExtract = new MiniCssExtractPlugin({ filename: 'styles.css' });

module.exports = {
  entry: './app.js',
  output: {
    path: path.join(__dirname, '..','..','public'),
    filename: 'bundle.js'
  },
  module: {
    rules: [{
      loader: 'babel-loader',
      test: /\.js$/,
      exclude: /node_modules/,

    },
    {
      test: /\.s?css$/,
        use: [
               MiniCssExtractPlugin.loader,
               {
                   loader: 'css-loader',
                   options: {
                       sourceMap: true
                   }
               },
               {
                   loader: 'sass-loader',
                   options: {
                       sourceMap: true
                   }
               }
           ]
    }]
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase:  path.join(__dirname, '..','..','public'),
    historyApiFallback: true
  },
  plugins: [
      CSSExtract
    ]
};
