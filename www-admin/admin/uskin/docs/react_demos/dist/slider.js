/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 100);
/******/ })
/************************************************************************/
/******/ ({

/***/ 100:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _uskin = uskin,
    Slider = _uskin.Slider;


var value = 0;
var value2 = -20;
var value3 = 0.54;
var value4 = 3;
var value5 = 1;
var value6 = 8;

function listener(nodeId, e, status) {
  document.getElementById('value' + nodeId).innerHTML = status;
}

ReactDOM.render(React.createElement(
  'div',
  null,
  React.createElement(
    'div',
    { className: 'box' },
    React.createElement(Slider, { onChange: listener.bind(null, '1') }),
    React.createElement(
      'div',
      { className: 'value', id: 'value1' },
      value
    ),
    React.createElement(
      'span',
      null,
      'Default: min = 0, max = 100, value = 0'
    )
  ),
  React.createElement(
    'div',
    { className: 'box' },
    React.createElement(Slider, { min: -100, max: 100, value: value2, step: 40, width: 400, onChange: listener.bind(null, '2') }),
    React.createElement(
      'div',
      { className: 'value', id: 'value2' },
      value2
    ),
    React.createElement(
      'span',
      null,
      'min = -100, max = 100, value = -20, unit = 40'
    )
  ),
  React.createElement(
    'div',
    { className: 'box' },
    React.createElement(Slider, { min: 0, max: 3, value: value3, step: 0.01, width: 500, onChange: listener.bind(null, '3') }),
    React.createElement(
      'div',
      { className: 'value', id: 'value3' },
      value3
    ),
    React.createElement(
      'span',
      null,
      'min = 0, max = 3, value = 0.54, unit = 0.01'
    )
  ),
  React.createElement(
    'div',
    { className: 'box' },
    React.createElement(Slider, { min: 0, max: 10, value: value4, disabled: true, onChange: listener.bind(null, '4') }),
    React.createElement(
      'div',
      { className: 'value', id: 'value4' },
      value4
    ),
    React.createElement(
      'span',
      null,
      'Disabled = true'
    )
  ),
  React.createElement(
    'div',
    { className: 'box' },
    React.createElement(Slider, { min: 1, max: 1, value: value5, onChange: listener.bind(null, '5') }),
    React.createElement(
      'div',
      { className: 'value', id: 'value5' },
      value5
    ),
    React.createElement(
      'span',
      null,
      'when min == max == value == 1'
    )
  ),
  React.createElement(
    'div',
    { className: 'box' },
    React.createElement(Slider, { min: 1, max: 10, value: value6, hideThumb: true }),
    React.createElement(
      'div',
      { className: 'value', id: 'value6' },
      value6
    ),
    React.createElement(
      'span',
      null,
      'hideThumb = true'
    )
  )
), document.getElementById('example'));

/***/ })

/******/ });