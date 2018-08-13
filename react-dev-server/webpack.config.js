const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development', 

  // Generate source maps in the compiled output
  devtool: 'inline-source-map',

  entry: [
    // Tells the compiled bundle where to connect to the dev server
    'webpack-dev-server/client?http://localhost:8080',

    // This entry point will actually reload chunks
    'webpack/hot/only-dev-server',

    // File to start traversing our source dependency graph
    './src/index.tsx',
  ],

  // Put our compiled JS in the build directory
  output: {
    filename: 'index.js',
    path: __dirname + '/build',

    // Puts compiled output into the root of the /build directory.
    publicPath: '/',
  },

  // Loaders for the file types we're using
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              plugins: ['react-hot-loader/babel'],
            },
          },
          'ts-loader',
        ],
      },
    ],
  },

  // Allow us to resolve these extensions (when importing modules) without explicitly specifying them
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },

  plugins: [
    // Generate an index.html for us that automatically includes the right compiled output.
    new HtmlWebpackPlugin({
      title: 'Our SPA!',
    }),

    // Enable HMR for our builds
    new webpack.HotModuleReplacementPlugin(),
  ],

  // We need to tell the devserver where our content is
  devServer: {
    // Where to serve non-webpack content from
    contentBase: './build',

    // The devserver will be notified about hot updates
    hot: true,

    // Serves everything in build/ from 
    //    localhost:8080/
    publicPath: '/',
  },
}
