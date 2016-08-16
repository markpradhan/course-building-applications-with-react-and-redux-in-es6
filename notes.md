# Building Applications With React and Redux in ES6

## Introduction

### Why Redux

- de facto standard in the React community
- creator has joined fb group
- fb uses itself

### Framework specific reasons

- **one store**: all state is store in one object
- **reduced boilerplate**
- **isomorphic/universal** friendly
- **immutable store**
- **hot reloading**: reload a module without losing state
- **time-travel debugging**: step forward and backward through state changes in your code
- **small api**: only 2k gzipped

## Environment Setup

**What we want to achieve**
- automated Testing
- linting
- minification
- bundling
- jsx compilation
- es6 transpilation
- all with one command

### Babel

Babel transpiles es6 to es5.
Babel-polyfill polyfills all features that cant be transpiled.
**It's better to polyfill specific features**

### Webpack

Handles minification and bundling of our javascript.

### Mocha

The most used js testing framework.

### Eslint

Lint our JS and help us enforce best practices.

### Used versions for this course

- react 15.0.2
- redux 3.5.2
- react/router 2.4.0
- webpack 1.13
- babel 6.*

### Hot Reloading

**babel-preset-react-hmre** package enables hot-reloading. This package wraps a number of other libraries and settings in a single file.
Works by wrapping your components in a proxy via babel. The proxies are classes that act just like your classes but provide hooks for new implementation.
Changes are immediately applied when file is saved, without any reloading.

**Warning**
- experimental
- doesn't reload functional components (unless there a class wrapping the component, that's why we'll use classes at the top level even though there are functional components)
- doesn't reload container functions like mapStateToProps
- other options exist


### Node

We'll need node. Use nvm if you don't have the proper version.

### Our package.json

- we'll use the [pluralsight-redux-starter](https://github.com/coryhouse/pluralsight-redux-starter) repo as a guideline
- information about packages used can be fount on that link
- we'll build it ourself to understand the process more

> copy contenst of package.json to our local package.json or copy the code below

```javascript
{
  "name": "building-applications-with-react-and-redux-in-es6",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "directories": {
    "doc": "docs"
  },
  
  "author": "",
  "license": "ISC",

  "dependencies": {
    "babel-polyfill": "6.8.0",
    "bootstrap": "3.3.6",
    "jquery": "2.2.3",
    "react": "15.0.2",
    "react-dom": "15.0.2",
    "react-redux": "4.4.5",
    "react-router": "2.4.0",
    "react-router-redux": "4.0.4",
    "redux": "3.5.2",
    "redux-thunk": "2.0.1",
    "toastr": "2.1.2"
  },

  "devDependencies": {
    "babel-cli": "6.8.0",
    "babel-core": "6.8.0",
    "babel-loader": "6.2.4",
    "babel-plugin-react-display-name": "2.0.0",
    "babel-preset-es2015": "6.6.0",
    "babel-preset-react": "6.5.0",
    "babel-preset-react-hmre": "1.1.1",
    "babel-register": "6.8.0",
    "colors": "1.1.2",
    "compression": "1.6.1",
    "cross-env": "1.0.7",
    "css-loader": "0.23.1",
    "enzyme": "2.2.0",
    "eslint": "2.9.0",
    "eslint-plugin-import": "1.6.1",
    "eslint-plugin-react": "5.0.1",
    "eslint-watch": "2.1.11",
    "eventsource-polyfill": "0.9.6",
    "expect": "1.19.0",
    "express": "4.13.4",
    "extract-text-webpack-plugin": "1.0.1",
    "file-loader": "0.8.5",
    "jsdom": "8.5.0",
    "mocha": "2.4.5",
    "nock": "8.0.0",
    "npm-run-all": "1.8.0",
    "open": "0.0.5",
    "react-addons-test-utils": "15.0.2",
    "redux-immutable-state-invariant": "1.2.3",
    "redux-mock-store": "1.0.2",
    "rimraf": "2.5.2",
    "style-loader": "0.13.1",
    "url-loader": "0.5.7",
    "webpack": "1.13.0",
    "webpack-dev-middleware": "1.6.1",
    "webpack-hot-middleware": "2.10.0"
  }
}
```

### NPM Scripts

**Why NPM scripts**
- easy to learn
- simple
- no extra layer of abstraction
- no dependence on seperate plugins
- simpler debugging
- better docs

### Initial Scaffolding

- mkdir src
- touch src/index.html src/index.js

> src/index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Admin</title>
</head>
<body>
  <h1>React And Redux in ES6</h1>
  <div id="app"></div>
  <script src="/bundle.js"></script>
</body>
</html>
```
> src/index.js

```javascript
console.log('Hello World');
```

### Webpack

- webpack will bundle our app for the web.
- touch webpack.config.dev.js
- paste code in from repo or below

> webpack.config.dev.js

```javascript
import webpack from 'webpack';
import path from 'path';

// webpack is defined in a object literal
export default {
  debug: true, //this enables displaying debug information
  devtool: 'cheap-module-eval-source-map', //options for devtool
  noInfo: false, // displays a list of files that webpack is bundling
  entry: [ // order is important!
    'eventsource-polyfill', // necessary for hot reloading with IE
    'webpack-hot-middleware/client?reload=true', //note that it reloads the page if hot module reloading fails.
    './src/index'  // our app entry point
  ],
  target: 'web', // we're targetting the web
  output: {
    path: __dirname + '/dist', // Note: Physical files are only output by the production build task `npm run build`.
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './src'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // allows hot reloading
    new webpack.NoErrorsPlugin() // keeps errors from breaking our hot reloading
  ],
  module: {
    loaders: [
      {test: /\.js$/, include: path.join(__dirname, 'src'), loaders: ['babel']}, // use babel to transpile our code
      {test: /(\.css)$/, loaders: ['style', 'css']}, 
      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'}, // this and below are settings for bootstrap
      {test: /\.(woff|woff2)$/, loader: 'url?prefix=font/&limit=5000'},
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'},
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'}
    ]
  }
};
```

### Babel

- transpiles es6 to es5
- touch .babelrc

> .babelrc

```javascript
{
  "presets": ["react", "es2015"],
  "env": {
    "development": {
      "presets": ["react-hmre"]
    }
  }
}
```

### Dev-Server (Express)

- mkdir tools
- touch tools/srcServer.js

> toosl/srcServer.js

```javascript
import express from 'express';
import webpack from 'webpack';
import path from 'path';
import config from '../webpack.config.dev';
import open from 'open';

/* eslint-disable no-console */

const port = 3000;
const app = express();
const compiler = webpack(config); // we compile our webpack config

// tell our app to use the webpack-dev-middleware, pass in our compiled config and some options
app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

// tell our app to use wepack hot middleware for hot realoading, pass in our compiled config
app.use(require('webpack-hot-middleware')(compiler));

// tell our app what files to serve
app.get('*', function(req, res) {
  res.sendFile(path.join( __dirname, '../src/index.html'));
});

app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    open(`http://localhost:${port}`);
  }
});
```

### Start script

- type: npm start -s (s for silent) to start our dev server

> package.json

```javascript
{
  "scripts": {
    "start": "babel-node tools/srcServer.js"
  }
}
```

### Start Message

> tools/startMessage.js

```javascript
import colors from 'colors';

/* eslint-disable no-console */

console.log('Starting app in dev mode...'.green);
```

> package.json

```javascript
{
  "scripts": {
    "prestart": "babel-node tools/startMessage.js",
  }
}
```

### ESLint

- touch .eslintrc
- eswatch will watch our js files and output linting messages to our console

> package.json in scripts

```javascript
"lint": "node_modules/.bin/esw webpack.config.* src tools"
"lint:watch": "npm run lint -- --watch"
```

> .eslintrc

```javascript
{
  "extends": [
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:import/warnings"
  ],
  "plugins": [
    "react"
  ],
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "env": {
    "es6": true,
    "browser": true,
    "node": true,
    "jquery": true,
    "mocha": true
  },
  "rules": {
    "quotes": 0,
    "no-console": 1,
    "no-debugger": 1,
    "no-var": 1,
    "semi": [1, "always"],
    "no-trailing-spaces": 0,
    "eol-last": 0,
    "no-unused-vars": 0,
    "no-underscore-dangle": 0,
    "no-alert": 0,
    "no-lone-blocks": 0,
    "jsx-quotes": 1,
    "react/display-name": [ 1, {"ignoreTranspilerName": false }],
    "react/forbid-prop-types": [1, {"forbid": ["any"]}],
    "react/jsx-boolean-value": 1,
    "react/jsx-closing-bracket-location": 0,
    "react/jsx-curly-spacing": 1,
    "react/jsx-indent-props": 0,
    "react/jsx-key": 1,
    "react/jsx-max-props-per-line": 0,
    "react/jsx-no-bind": 1,
    "react/jsx-no-duplicate-props": 1,
    "react/jsx-no-literals": 0,
    "react/jsx-no-undef": 1,
    "react/jsx-pascal-case": 1,
    "react/jsx-sort-prop-types": 0,
    "react/jsx-sort-props": 0,
    "react/jsx-uses-react": 1,
    "react/jsx-uses-vars": 1,
    "react/no-danger": 1,
    "react/no-did-mount-set-state": 1,
    "react/no-did-update-set-state": 1,
    "react/no-direct-mutation-state": 1,
    "react/no-multi-comp": 1,
    "react/no-set-state": 0,
    "react/no-unknown-property": 1,
    "react/prefer-es6-class": 1,
    "react/prop-types": 1,
    "react/react-in-jsx-scope": 1,
    "react/require-extension": 1,
    "react/self-closing-comp": 1,
    "react/sort-comp": 1,
    "react/wrap-multilines": 1
  }
}
```

### Optimizing our npm scripts

- we'll use npm run all to run multiple scripts at once

> package.json

```javascript
"scripts": {
    "prestart": "babel-node tools/startMessage.js",
    "start": "npm-run-all --parallel open:src lint:watch",
    "open:src": "babel-node tools/srcServer.js",
    "lint": "node_modules/.bin/esw webpack.config.* src tools",
    "lint:watch": "npm run lint -- --watch"
  }
```

## React Component Approaches

## Initial App Structure

## Intro to Redux

## Actions, Stores and Reducers

## Connecting React to Redux

## Redux Flow

## Async in Redux

## Async Writes in Redux

## Async Status and Error Handling

## Testing React

## Testing Redux

## Production Builds