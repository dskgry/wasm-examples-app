const path = require('path');
const webpack = require('webpack');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = (env, {mode}) => {
  const development = mode !== 'production';
  const plugins = [
    new webpack.DefinePlugin({
      __DEVELOPMENT__: development,
      'process.env.NODE_ENV': JSON.stringify(mode),
    }),
    new HtmlWebpackPlugin({
      filename: development ? 'index.html' : '../index.html',
      templateContent: `
                <!DOCTYPE html>
                <html lang='en'>
                    <head>
                        <meta charset='UTF-8'>
                        <meta name='viewport' content='width=device-width,initial-scale=1,maximum-scale=1,user-scalable=0'>
                        <link rel="apple-touch-icon" sizes="180x180" href="/assets/icon/apple-touch-icon.png">
                        <link rel="icon" type="image/png" sizes="32x32" href="/assets/icon/favicon-32x32.png">
                        <link rel="icon" type="image/png" sizes="16x16" href="/assets/icon/favicon-16x16.png">
                        <title>Wasm</title>
                    </head>
                    <body><noscript>Please enable javascript.</noscript><main id='main'></main></body>
                </html>`,
      minify: {
        collapseWhitespace: true,
      },
    }),
  ];
  if (mode === 'production') {
    plugins.push(new CleanWebpackPlugin());
  }
  return ({
    entry: {
      app: path.resolve(__dirname, 'src', 'app.tsx'),
    },
    output: {
      filename: '[name].[hash].js',
      chunkFilename: '[name].[hash].js',
      path: path.resolve(__dirname, 'dist', 'js'),
      publicPath: development ? '/' : '/js/',
    },
    resolve: {
      extensions: ['.ts', '.js', '.tsx'],
      alias: {
        react: 'preact/compat',
        'react-dom': 'preact/compat',
      },
    },
    module: {
      rules: [
        {
          test: /\.worker\.(ts)$/i,
          use: [{
            loader: 'comlink-loader',
            options: {
              singleton: true,
            },
          }],
        },
        {
          test: /\.(ts|tsx)$/,
          use: [{
            loader: 'babel-loader',
          }],
        },
        {
          test: /\.(svg|png|jpg|gif)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 1000,
              },
            },
          ],
        },
      ],
    },
    devtool: mode === 'production' ? false : 'eval-source-map',
    devServer: {
      contentBase: path.resolve(__dirname),
      historyApiFallback: true,
      port: 3000
    },
    plugins,
    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            name: 'commons',
            minChunks: 2,
            chunks: 'async',
            enforce: true
          },
        },
      },
    },
  });
};
