const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (env, argv) => {
  const isDev = argv.mode === 'development';

  return {
    entry: './src/js/main.js',

    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'js/bundle.[contenthash].js',
      assetModuleFilename: 'assets/[name][ext]',
      publicPath: isDev ? '/' : './',
    },

    devServer: {
      static: { directory: path.join(__dirname, 'dist') },
      port: 3000,
      hot: true,
      open: true,
    },

    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: { presets: ['@babel/preset-env'] },
          },
        },
        {
          test: /\.css$/,
          use: [
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
          ],
        },
        {
          test: /\.(png|jpg|jpeg|gif|svg|webp)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.(woff2?|ttf|eot)$/i,
          type: 'asset/resource',
        },
      ],
    },

    plugins: [
      new CleanWebpackPlugin(),

      new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: 'index.html',
        minify: !isDev,
      }),

      ...(isDev ? [] : [
        new MiniCssExtractPlugin({
          filename: 'css/styles.[contenthash].css',
        }),
      ]),

      // Uncomment if you have a public/ static folder:
      // new CopyWebpackPlugin({
      //   patterns: [{ from: 'public', to: '' }],
      // }),
    ],

    optimization: {
      minimize: !isDev,
      minimizer: [
        new TerserPlugin(),
        new CssMinimizerPlugin(),
      ],
    },

    devtool: isDev ? 'source-map' : false,
  };
};
