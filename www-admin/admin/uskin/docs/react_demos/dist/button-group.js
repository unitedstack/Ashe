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
/******/ 	return __webpack_require__(__webpack_require__.s = 88);
/******/ })
/************************************************************************/
/******/ ({

/***/ 88:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _uskin = uskin,
    Button = _uskin.Button,
    ButtonGroup = _uskin.ButtonGroup;


ReactDOM.render(React.createElement(
  "div",
  null,
  React.createElement(
    "div",
    { className: "vertical-group" },
    React.createElement(
      ButtonGroup,
      { type: "vertical" },
      React.createElement(Button, { tag: "div", value: "Prev", type: "status", selected: true }),
      React.createElement(Button, { tag: "div", value: "Mid 1", type: "status" }),
      React.createElement(Button, { tag: "div", value: "Mid 2", disabled: true }),
      React.createElement(Button, { tag: "div", value: "Next", type: "create" })
    ),
    React.createElement(
      ButtonGroup,
      { type: "vertical", width: "200px" },
      React.createElement(Button, { tag: "div", value: "Vertical Justified Prev", type: "status", selected: true }),
      React.createElement(Button, { tag: "div", value: "Vertical Justified Mid 1", type: "status" }),
      React.createElement(Button, { tag: "div", value: "Vertical Justified Mid 2", disabled: true }),
      React.createElement(Button, { tag: "div", value: "Vertical Justified Next", type: "create" })
    )
  ),
  React.createElement(
    "div",
    null,
    React.createElement(
      ButtonGroup,
      null,
      React.createElement(Button, { tag: "div", value: "Prev" }),
      React.createElement(Button, { tag: "div", value: "Mid 1", type: "warning" }),
      React.createElement(Button, { tag: "div", value: "Mid 2", type: "delete" }),
      React.createElement(Button, { tag: "div", value: "Mid 3", disabled: true }),
      React.createElement(Button, { tag: "div", value: "Next", type: "create" })
    ),
    React.createElement(
      ButtonGroup,
      { width: 800 },
      React.createElement(Button, { tag: "div", value: "Justified Prev" }),
      React.createElement(Button, { tag: "div", value: "Justified Mid 1", type: "warning" }),
      React.createElement(Button, { tag: "div", value: "Justified Mid 2", type: "delete" }),
      React.createElement(Button, { tag: "div", value: "Justified Mid 3", disabled: true }),
      React.createElement(Button, { tag: "div", value: "Justified Next", type: "create" })
    )
  )
), document.getElementById('example'));

/***/ })

/******/ });