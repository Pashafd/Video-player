const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const mode =
  process.env.NODE_ENV === 'production' ? 'production' : 'development';

if (mode === 'production') {
  module.exports = {
    mode: mode,
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      port: 8080,
      open: true,
      compress: true,
      hot: true,
    },

    entry: {
      main: path.resolve(__dirname, './src/index.js'),
    },

    output: {
      path: path.resolve(__dirname, './dist'),
      filename: 'bundle.js',
    },

    plugins: [
      new HtmlWebpackPlugin({
        title: 'Form Validation',
        template: path.resolve(__dirname, './src/template.html'),
        filename: 'index.html',
      }),

      new CleanWebpackPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new MiniCssExtractPlugin(),
      new CopyPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, 'src/assets/images'),
            to: path.resolve(__dirname, 'dist', 'assets/images'),
          },
        ],
      }),
    ],

    module: {
      rules: [
        //JS
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },

        //img
        {
          test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
          type: 'asset/resource',
        },

        {
          test: /\.(scss|css)$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                importLoaders: 2,
                sourceMap: false,
              },
            },
            'postcss-loader',
            'sass-loader',
          ],
        },
      ],
    },
  };
} else {
  module.exports = {
    mode: mode,
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      port: 8080,
      open: true,
      compress: true,
      hot: true,
    },

    entry: {
      main: path.resolve(__dirname, './src/index.js'),
    },

    output: {
      path: path.resolve(__dirname, './dist'),
      filename: 'bundle.js',
    },

    plugins: [
      new HtmlWebpackPlugin({
        title: 'Form Validation',
        template: path.resolve(__dirname, './src/template.html'),
        filename: 'index.html',
      }),

      new CleanWebpackPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new MiniCssExtractPlugin(),
      new CopyPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, 'src/assets/images'),
            to: path.resolve(__dirname, 'dist', 'assets/images'),
          },
        ],
      }),
    ],

    module: {
      rules: [
        //JS
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },

        //img
        {
          test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
          type: 'asset/resource',
        },

        // CSS, PostCSS, Sass
        {
          test: /\.(scss|css)$/,
          use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
        },
      ],
    },
    devtool: 'source-map',
  };
}
