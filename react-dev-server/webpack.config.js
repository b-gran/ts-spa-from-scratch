module.exports = {
  mode: 'development', 

  // Generate source maps in the compiled output
  devtool: 'inline-source-map',

  // File to start traversing the dependency graph
  entry: './src/index.tsx',

  // Put our compiled JS in the buil directory
  output: {
    filename: 'index.js',
    path: __dirname + '/build',
  },

  // Loaders for the file types we're using
  module: {
    rules: [{
      test: /\.tsx?$/,
      loader: 'ts-loader',
    }],
  },

  // Allow us to resolve these extensions (when importing modules) without explicitly specifying them
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
}
