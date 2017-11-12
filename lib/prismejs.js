(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("prismejs", [], factory);
	else if(typeof exports === 'object')
		exports["prismejs"] = factory();
	else
		root["prismejs"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/** PrismeJS
* Presentation and transformation layer for complex/dirty API's data output.
*
* @author Thomas Brodusch
* @version  1.0.0
 */

var Prismejs = function () {
    function Prismejs() {
        var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'json';

        _classCallCheck(this, Prismejs);

        this.availableReturnTypes = ['json'];
        this.setReturnType(type);
        this.grammar = {
            regex: /\.|\:|(\[.*\])/g,
            regexObjectSeparator: /\./g,
            regexPropCheck: /(.*?):(.*)(\[(.*)\])?/g,
            objectSeperator: '.', // data['toto']  > data.toto
            propCheck: ':', // data['toto'] = 'tata' > data.toto:tata
            endValue: /\[(.*?)\]/g // data['toto'].value  > data.toto[tata]
        };
    }

    _createClass(Prismejs, [{
        key: 'setReturnType',
        value: function setReturnType(type) {
            try {
                if (this.availableReturnTypes.includes(type)) {
                    this.returnType = type;
                } else {
                    throw new Error('InvalidReturnType');
                }
            } catch (err) {
                console.warn('PrismeJS [ ' + err.name + ': ' + err.message + ' ] \u2014 "' + type + '"" is an invalid return type. Please set an available return type.');
                console.log('PrismeJS \u2014 Available return types : ' + this.availableReturnTypes + ' ');
            }
        }
    }, {
        key: 'format',
        value: function format(source, modelObject) {
            var formattedData = void 0;
            if (this.returnType === 'json') {
                formattedData = this.formatJSON(source, modelObject);
            }
            return formattedData;
        }
    }, {
        key: 'formatJSON',
        value: function formatJSON(source, model) {
            var _this = this;

            var formattedJSON = {};
            if (!(source instanceof Array)) {
                source = [source];
            }
            formattedJSON = source.map(function (elem) {
                var formattedEntity = {};
                return _this.formatJSONObject(elem, model);
            });
            return formattedJSON;
        }
    }, {
        key: 'formatJSONObject',
        value: function formatJSONObject(sourceElem, object) {
            var formattedEntity = {};

            for (var prop in object) {
                var formattedProp = this.formatJSONProp(sourceElem, object[prop]);
                if (formattedProp !== null) {
                    formattedEntity[prop] = formattedProp;
                }
            }

            return formattedEntity;
        }
    }, {
        key: 'formatJSONProp',
        value: function formatJSONProp(sourceElem, prop) {
            var formattedProp = null;

            if (typeof prop === 'string') {
                formattedProp = sourceElem[prop];

                // Check if current string prop contain Prisme grammar.
                if (prop.match(this.grammar.regex)) {
                    formattedProp = this.tracePath(sourceElem, prop, prop.split(this.grammar.regexObjectSeparator));
                }
            }

            if ((typeof prop === 'undefined' ? 'undefined' : _typeof(prop)) === 'object') {
                formattedProp = this.formatJSONObject(sourceElem, prop);
            }

            return formattedProp;
        }
    }, {
        key: 'tracePath',
        value: function tracePath(sourceElem, prop, checkpoints) {
            var _this2 = this;

            var tracedPath = [];
            var finalValue = false;

            checkpoints.forEach(function (pathItem) {
                if (pathItem.match(_this2.grammar.propCheck)) {
                    var extractPath = pathItem.split(_this2.grammar.propCheck)[0];
                    tracedPath.push(extractPath);
                } else {
                    tracedPath.push(pathItem);
                }
            });

            checkpoints.map(function (pathItem) {
                // Check if a prop is equal to something in particular.
                if (pathItem.match(_this2.grammar.regexPropCheck)) {
                    // Build path to var.
                    var finalVar = pathItem.split(_this2.grammar.propCheck);
                    var m = _this2.grammar.endValue.exec(finalVar[1]);
                    var endValue = void 0;

                    if (m !== null) {
                        endValue = m[1];
                    }

                    var buildSource = sourceElem;
                    var found = false;

                    tracedPath.some(function (item) {
                        if (item === finalVar[0]) {
                            var i = 0;
                            while (i < buildSource.length || found) {
                                if (buildSource[i][item] === finalVar[1].replace(_this2.grammar.endValue, '')) {
                                    if (endValue) {
                                        return finalValue = buildSource[i][endValue];
                                    } else {
                                        return finalValue = buildSource[i];
                                    }
                                }
                                i++;
                            }
                        }

                        buildSource = buildSource[item];
                    });
                } else if (pathItem.match(_this2.grammar.endValue)) {
                    var _m = _this2.grammar.endValue.exec(pathItem);
                    finalValue = sourceElem[pathItem.replace(_m[0], '')][_m[1]];
                }
            });
            return finalValue;
        }
    }]);

    return Prismejs;
}();

exports.default = Prismejs;

/***/ })
/******/ ]);
});
//# sourceMappingURL=prismejs.js.map