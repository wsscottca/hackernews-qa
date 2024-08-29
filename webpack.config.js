const path = require('path');

module.exports = {
  mode: 'development',  // Change this to 'production' for production builds
  entry: './frontend/src/index.js',
  output: {
    path: path.resolve(__dirname, 'frontend/build'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.css$/,   // This rule handles CSS files
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'frontend/public'),
    },
    compress: true,
    port: 3000
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }
};
