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
/******/ 	return __webpack_require__(__webpack_require__.s = 89);
/******/ })
/************************************************************************/
/******/ ({

/***/ 89:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _uskin = uskin,
    Button = _uskin.Button;


function listener(e, btnKey) {
  console.debug('Button clicked: ', e, btnKey);
}

ReactDOM.render(React.createElement(
  "div",
  null,
  React.createElement(
    "div",
    null,
    React.createElement(Button, { value: "Normal", btnKey: "normal", onClick: listener }),
    React.createElement(Button, { value: "Create", btnKey: "create", type: "create", onClick: listener }),
    React.createElement(Button, { value: "Warning", btnKey: "warning", type: "warning", onClick: listener }),
    React.createElement(Button, { value: "Delete", btnKey: "delete", type: "delete", onClick: listener }),
    React.createElement(Button, { value: "Cancel", btnKey: "cancel", type: "cancel", onClick: listener }),
    React.createElement(Button, { value: "Disabled", btnKey: "disabled", type: "cancel", disabled: true, onClick: listener })
  ),
  React.createElement(
    "div",
    null,
    React.createElement(Button, { value: "Initial", initial: true, onClick: listener }),
    React.createElement(Button, { value: "Initial", type: "create", initial: true, onClick: listener }),
    React.createElement(Button, { value: "Initial", type: "warning", initial: true, onClick: listener }),
    React.createElement(Button, { value: "Initial", type: "delete", initial: true, onClick: listener }),
    React.createElement(Button, { value: "Initial", type: "cancel", initial: true, onClick: listener }),
    React.createElement(Button, { value: "Initial", type: "cancel", initial: true, disabled: true, onClick: listener })
  ),
  React.createElement(
    "div",
    null,
    React.createElement(Button, { value: "Initial", btnKey: "btnIcon-1", initial: true, onClick: listener, iconClass: "region" }),
    React.createElement(Button, { value: "Initial", btnKey: "btnIcon-2", type: "create", initial: true, onClick: listener, iconClass: "create" }),
    React.createElement(Button, { value: "Initial", btnKey: "btnIcon-2", type: "warning", initial: true, onClick: listener, iconClass: "property" }),
    React.createElement(Button, { value: "Initial", btnKey: "btnIcon-3", type: "delete", initial: true, onClick: listener, iconClass: "more" }),
    React.createElement(Button, { value: "Initial", btnKey: "btnIcon-4", type: "cancel", initial: true, onClick: listener, iconClass: "edit" }),
    React.createElement(Button, { value: "Initial", btnKey: "btnIcon-5", type: "cancel", initial: true, disabled: true, onClick: listener, iconClass: "disable" })
  ),
  React.createElement(
    "div",
    null,
    React.createElement(Button, { value: "Size xl", btnKey: "xl", size: "xl", onClick: listener }),
    React.createElement(Button, { value: "Size lg", btnKey: "lg", type: "create", size: "lg", onClick: listener }),
    React.createElement(Button, { value: "Size default", btnKey: "default", type: "warning", onClick: listener }),
    React.createElement(Button, { value: "Size sm", btnKey: "sm", type: "delete", size: "sm", onClick: listener }),
    React.createElement(Button, { value: "Size xs", btnKey: "xs", type: "cancel", size: "xs", onClick: listener })
  ),
  React.createElement(
    "div",
    null,
    React.createElement(Button, { value: "Status", btnKey: "status-1", type: "status", onClick: listener }),
    React.createElement(Button, { value: "Status Selected", btnKey: "status-2", type: "status", selected: true, onClick: listener })
  ),
  React.createElement(
    "div",
    null,
    React.createElement(Button, { initial: true, iconClass: "refresh" })
  )
), document.getElementById('example'));

/***/ })

/******/ });