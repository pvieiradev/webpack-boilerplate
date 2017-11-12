const path = require('path');
const html = require('html-webpack-plugin');
const merge = require('webpack-merge');
const parts = require('./webpack.parts');
const copy = require('copy-webpack-plugin');

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
      new copy([
          {
              from: path.join(paths.SRC, '/images'),
              to: path.join(paths.DIST, 'images')
          }
      ])
    ]
  },
  //parts.lintJavaScript({ include: paths.APP }),  
]);

const productionConfig = merge([
    parts.extractCSS({ use: 'css-loader' }),    
    parts.loadImages()
]);

const developmentConfig = merge([
  parts.devServer({
    // Customize host/port here if needed
    host: process.env.HOST,
    port: process.env.PORT,
    }),
  parts.loadCSS(),
  parts.loadImages()
]);

module.exports = (env) => {
  if (env === 'production') {
    return merge(commonConfig, productionConfig);
  }

  return merge(commonConfig, developmentConfig);
};