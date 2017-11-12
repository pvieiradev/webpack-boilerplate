const path = require('path');
const html = require('html-webpack-plugin');
const merge = require('webpack-merge');
const parts = require('./webpack.parts');

const paths = {
  APP: path.join(__dirname, 'app'),
  SRC: path.join(__dirname, 'src'),
  DIST: path.join(__dirname, 'dist'),
};

const commonConfig = merge([
  {
    entry: path.join(paths.SRC, 'app.js'),
    output: {
      path: paths.DIST,
      filename: 'js/[name].js',
    },
    plugins: [
      new html({
        title: 'Boilerplate',
      }),
    ],
  },
  parts.lintJavaScript({ include: paths.APP }),  
]);

const productionConfig = merge([
    parts.extractCSS({ use: 'css-loader' })
]);

const developmentConfig = merge([
  parts.devServer({
    // Customize host/port here if needed
    host: process.env.HOST,
    port: process.env.PORT,
    }),
  parts.loadCSS(),
]);

module.exports = (env) => {
  if (env === 'production') {
    return merge(commonConfig, productionConfig);
  }

  return merge(commonConfig, developmentConfig);
};