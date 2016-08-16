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