# Creating a TypeScript SPA from scratch

## 1 Just a plain ol TypeScript app
```bash
npm init -y

# Grab the typescript compiler
npm i typescript 

# Needed to use node standard libraries
npm i @types/node
```

### Compiler options for vanilla apps
```js
{
  "compilerOptions": {
    "outDir": "build", // Where to write the compiled js
    "module": "commonjs", // Type of module in the output
    "target": "es5", // Js version of the output
    "lib": ["es6"], // Types for libraries & language features (for use in TS)
    "allowJs": true, // Allows us to include js files during compilation
    "rootDir": "src",

    // Use node's module resolution algorithm (this is the one you're familiar with)
    // to resolve imports.
    "moduleResolution": "node"
  },
  "exclude": [
    "node_modules",
    "build"
  ]
}
```

## 2 Adding React

```bash
# Grab React and the type definitions
npm i @types/react @types/react-dom react react-dom
```

```diff
{
  "compilerOptions": {
    "outDir": "build", // Where to write the compiled js
    "module": "commonjs", // Type of module in the output
    "target": "es5", // Js version of the output
-   "lib": ["es6"], // Types for libraries & language features (for use in TS)
+   "lib": ["es6", "dom"], // Types for libraries & language features (for use in TS)
    "allowJs": true, // Allows us to include js files during compilation
    "rootDir": "src",

    // Use node's module resolution algorithm (this is the one you're familiar with)
    // to resolve imports.
    "moduleResolution": "node",

+   // Converts JSX to React.createElement() calls
+   "jsx": "react"
  },
  "exclude": [
    "node_modules",
    "build"
  ]
}
```

## 3 Supporting the browser

```bash
# We're finally going to need webpack
npm i webpack webpack-cli

# webpack needs to compile our typescript files.
# This loader knows about our tsconfig.json
npm i ts-loader
```

```diff
{
  "compilerOptions": {
    "outDir": "build", // Where to write the compiled js
    "module": "commonjs", // Type of module in the output
    "target": "es5", // Js version of the output
    "lib": ["es6", "dom"], // Types for libraries & language features (for use in TS)
    "allowJs": true, // Allows us to include js files during compilation
    "rootDir": "src",

    // Use node's module resolution algorithm (this is the one you're familiar with)
    // to resolve imports.
    "moduleResolution": "node",

    // Converts JSX to React.createElement() calls
    "jsx": "react",

+   // Generate source maps
+   "sourceMap": true
  },
  "exclude": [
    "node_modules",
    "build",
+   "./*.js"
  ]
}
```

`webpack.config.js`
```js
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
```

## 4 Hot module reloading

```bash
# The dev server is a separate package
npm i webpack-dev-server

# Generates HTML files automatically (with our scripts included)
npm i html-webpack-plugin

# React HMR
npm i babel-core babel-loader react-hot-loader

# Types for webpack module
npm i @types/webpack-env
```

`webpack.config.js`
```js
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
```
