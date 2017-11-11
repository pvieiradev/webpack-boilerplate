// We are using node's native package 'path'
// https://nodejs.org/api/path.html
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// Constant with our paths
const paths = {
  DIST: path.resolve(__dirname, 'dist'),
  SRC: path.resolve(__dirname, 'src'),
};

// Webpack configuration
const commonConfig = {
  entry: path.join(paths.SRC, 'app.js'),
  output: {
    path: paths.DIST,
    filename: 'js/app.bundle.js',
  },  
  module: {
      rules: [
          {              
              test: /\.scss$/,     
              use: ['style-loader', 'css-loader', 'sass-loader']              
          },
          {
              test: /\.css$/,
              use: ExtractTextPlugin.extract({                 
                  fallback: 'style-loader',
              }),
          },
      ]
  },
  plugins: [
      new HtmlWebpackPlugin({ title: 'boilerplate' }),
      new ExtractTextPlugin('css/style.css')
  ]
};

const productionConfig = () => commonConfig;

const developmentConfig = () => {
  const config = {
    devServer: {
      // Enable history API fallback so HTML5 History API based
      // routing works. Good for complex setups.
      historyApiFallback: true,

      // Display only errors to reduce the amount of output.
      stats: 'errors-only',

      // Parse host and port from env to allow customization.
      //
      // If you use Docker, Vagrant or Cloud9, set
      // host: options.host || '0.0.0.0';
      //
      // 0.0.0.0 is available to all network devices
      // unlike default `localhost`.
      host: process.env.HOST, // Defaults to `localhost`
      port: process.env.PORT // Defaults to 8080            
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                enforce: 'pre',
                loader: 'eslint-loader',
                options: {
                    emitWarning: true
                }
            }
        ]
    }
  };

  return Object.assign(
    {},
    commonConfig,
    config
  );
};

module.exports = (env) => {
  //console.log('DEBUG: ' + env);

  if (env === 'production') {
    return productionConfig();
  }
  return developmentConfig();
};
