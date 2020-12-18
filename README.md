# chaindler [![NPM](https://img.shields.io/npm/v/chaindler)](https://www.npmjs.com/package/chaindler) [![Build Status](https://github.com/zishone/chaindler/workflows/CI/badge.svg)](https://github.com/zishone/chaindler/actions?query=workflow%3ACI) [![Coverage Status](https://coveralls.io/repos/github/zishone/chaindler/badge.svg?branch=master)](https://coveralls.io/github/zishone/chaindler?branch=master) ![GitHub](https://img.shields.io/github/license/zishone/chaindler)
A simple request handler (controller/middleware) chainer

## Installation
```shell
$ npm i chaindler
```
## Usage
### 1. Import chaindler
```javascript
const { Chain } = require('chaindler');
```
### 2. Write your middlewares
```javascript
function mw1 (req, res, next) {
  console.log('1');
  next();
}

function mw2 (req, res, next) {
  console.log('2');
  next();
}

function mw3 (req, res, next) {
  console.log('3');
  next();
}
```
### 3. Write your controller
```javascript
function controller (req, res, next) {
  res.send('hello');
}
```
### 4. Chain them up!
```javascript
import express = require('express');
const app = express();
app.use('/hello', new Chain(mw1, mw2, mw3).handle(controller));
```
NOTE: Example was with the assumption you are using `express.js`

This module was developed with Node.js servers that uses `swagger-node`, `express-openapi`, and other kinds of modules that limits your ability to chain middlewares in mind.

These kinds of modules would require you to have your controllers in an object, and to use `chaindler` in that scenario would be something like this:
```javascript
const controllers = {
  operation1: new Chain(mw1, mw2, mw3).handle(controller),
  operation2: new Chain(mw1, mw2, mw3).handle(controller),
}
```

## Authors
* **Zishran Julbert Garces**

See also the list of [contributors](https://github.com/zishone/chaindler/contributors) who participated in this project.

## License
This project is licensed under the MIT License - see the [LICENSE](https://github.com/zishone/chaindler/blob/master/LICENSE) file for details.
