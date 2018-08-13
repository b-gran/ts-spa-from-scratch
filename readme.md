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
