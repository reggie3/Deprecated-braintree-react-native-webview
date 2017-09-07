/******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 66);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  paymentOptionIDs: {
    card: 'card',
    paypal: 'paypal',
    paypalCredit: 'paypalCredit'
  },
  paymentMethodTypes: {
    card: 'CreditCard',
    paypal: 'PayPalAccount',
    paypalCredit: 'PayPalAccount'
  },
  analyticsKinds: {
    CreditCard: 'card',
    PayPalAccount: 'paypal'
  },
  paymentMethodCardTypes: {
    Visa: 'visa',
    MasterCard: 'master-card',
    'American Express': 'american-express',
    'Diners Club': 'diners-club',
    Discover: 'discover',
    JCB: 'jcb',
    UnionPay: 'unionpay',
    Maestro: 'maestro'
  },
  configurationCardTypes: {
    visa: 'Visa',
    'master-card': 'MasterCard',
    'american-express': 'American Express',
    'diners-club': 'Discover',
    discover: 'Discover',
    jcb: 'JCB',
    unionpay: 'UnionPay',
    maestro: 'Maestro'
  },
  errors: {
    NO_PAYMENT_METHOD_ERROR: 'No payment method is available.',
    PAYPAL_NON_LINKED_SANDBOX: 'A <a href="https://developers.braintreepayments.com/guides/paypal/testing-go-live/#linked-paypal-testing" target="_blank" rel="nofollow">linked sandbox account</a> is required to use PayPal Checkout in sandbox.'
  },
  ANALYTICS_REQUEST_TIMEOUT_MS: 2000,
  ANALYTICS_PREFIX: 'web.dropin.',
  CHANGE_ACTIVE_PAYMENT_METHOD_TIMEOUT: 200,
  CHECKOUT_JS_SOURCE: 'https://www.paypalobjects.com/api/checkout.4.0.110.min.js',
  INTEGRATION: 'dropin2',
  PAYPAL_CHECKOUT_SCRIPT_ID: 'braintree-dropin-paypal-checkout-script',
  DATA_COLLECTOR_SCRIPT_ID: 'braintree-dropin-data-collector-script',
  STYLESHEET_ID: 'braintree-dropin-stylesheet'
};


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enumerate = __webpack_require__(26);

/**
 * @class
 * @global
 * @param {object} options Construction options
 * @classdesc This class is used to report error conditions, frequently as the first parameter to callbacks throughout the Braintree SDK.
 * @description <strong>You cannot use this constructor directly. Interact with instances of this class through {@link callback callbacks}.</strong>
 */
function BraintreeError(options) {
  if (!BraintreeError.types.hasOwnProperty(options.type)) {
    throw new Error(options.type + ' is not a valid type.');
  }

  if (!options.code) {
    throw new Error('Error code required.');
  }

  if (!options.message) {
    throw new Error('Error message required.');
  }

  this.name = 'BraintreeError';

  /**
   * @type {string}
   * @description A code that corresponds to specific errors.
   */
  this.code = options.code;

  /**
   * @type {string}
   * @description A short description of the error.
   */
  this.message = options.message;

  /**
   * @type {BraintreeError.types}
   * @description The type of error.
   */
  this.type = options.type;

  /**
   * @type {object=}
   * @description Additional information about the error, such as an underlying network error response.
   */
  this.details = options.details;
}

BraintreeError.prototype = Object.create(Error.prototype);
BraintreeError.prototype.constructor = BraintreeError;

/**
 * Enum for {@link BraintreeError} types.
 * @name BraintreeError.types
 * @enum
 * @readonly
 * @memberof BraintreeError
 * @property {string} CUSTOMER An error caused by the customer.
 * @property {string} MERCHANT An error that is actionable by the merchant.
 * @property {string} NETWORK An error due to a network problem.
 * @property {string} INTERNAL An error caused by Braintree code.
 * @property {string} UNKNOWN An error where the origin is unknown.
 */
BraintreeError.types = enumerate([
  'CUSTOMER',
  'MERCHANT',
  'NETWORK',
  'INTERNAL',
  'UNKNOWN'
]);

BraintreeError.findRootError = function (err) {
  if (err instanceof BraintreeError && err.details && err.details.originalError) {
    return BraintreeError.findRootError(err.details.originalError);
  }

  return err;
};

module.exports = BraintreeError;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var deferred = __webpack_require__(124);
var once = __webpack_require__(125);
var promiseOrCallback = __webpack_require__(126);

function wrapPromise(fn) {
  return function () {
    var callback;
    var args = Array.prototype.slice.call(arguments);
    var lastArg = args[args.length - 1];

    if (typeof lastArg === 'function') {
      callback = args.pop();
      callback = once(deferred(callback));
    }
    return promiseOrCallback(fn.apply(this, args), callback); // eslint-disable-line no-invalid-this
  };
}

wrapPromise.wrapPrototype = function (target, options) {
  var methods, ignoreMethods, includePrivateMethods;

  options = options || {};
  ignoreMethods = options.ignoreMethods || [];
  includePrivateMethods = options.transformPrivateMethods === true;

  methods = Object.getOwnPropertyNames(target.prototype).filter(function (method) {
    var isNotPrivateMethod;
    var isNonConstructorFunction = method !== 'constructor' &&
      typeof target.prototype[method] === 'function';
    var isNotAnIgnoredMethod = ignoreMethods.indexOf(method) === -1;

    if (includePrivateMethods) {
      isNotPrivateMethod = true;
    } else {
      isNotPrivateMethod = method.charAt(0) !== '_';
    }

    return isNonConstructorFunction &&
      isNotPrivateMethod &&
      isNotAnIgnoredMethod;
  });

  methods.forEach(function (method) {
    var original = target.prototype[method];

    target.prototype[method] = wrapPromise(original);
  });

  return target;
};

module.exports = wrapPromise;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function isBraintreeWebError(err) {
  return err.name === 'BraintreeError';
}

function DropinError(err) {
  this.name = 'DropinError';

  if (typeof err === 'string') {
    this.message = err;
  } else {
    this.message = err.message;
  }

  if (isBraintreeWebError(err)) {
    this._braintreeWebError = err;
  } else {
    this._braintreeWebError = err.braintreeWebError;
  }
}

DropinError.prototype = Object.create(Error.prototype);
DropinError.prototype.constructor = DropinError;

module.exports = DropinError;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var emptyFunction = __webpack_require__(13);

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = emptyFunction;

if (process.env.NODE_ENV !== 'production') {
  var printWarning = function printWarning(format) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var argIndex = 0;
    var message = 'Warning: ' + format.replace(/%s/g, function () {
      return args[argIndex++];
    });
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };

  warning = function warning(condition, format) {
    if (format === undefined) {
      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
    }

    if (format.indexOf('Failed Composite propType: ') === 0) {
      return; // Ignore CompositeComponent proptype check.
    }

    if (!condition) {
      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      printWarning.apply(undefined, [format].concat(args));
    }
  };
}

module.exports = warning;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var Promise = global.Promise || __webpack_require__(54);

module.exports = Promise;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

if (process.env.NODE_ENV === 'production') {
  module.exports = __webpack_require__(69);
} else {
  module.exports = __webpack_require__(72);
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var validateFormat = function validateFormat(format) {};

if (process.env.NODE_ENV !== 'production') {
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

module.exports = invariant;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var assign = __webpack_require__(19).assign;
var DropinError = __webpack_require__(5);
var errors = __webpack_require__(2).errors;
var Promise = __webpack_require__(12);

function BaseView(options) {
  options = options || {};

  assign(this, options);
}

BaseView.prototype.getElementById = function (id) {
  if (!this.element) { return null; }

  return this.element.querySelector('[data-braintree-id="' + id + '"]');
};

BaseView.prototype.requestPaymentMethod = function () {
  return Promise.reject(new DropinError(errors.NO_PAYMENT_METHOD_ERROR));
};

BaseView.prototype.getPaymentMethod = function () {
  return this.activeMethodView && this.activeMethodView.paymentMethod;
};

BaseView.prototype.onSelection = function () {};

BaseView.prototype.teardown = function () {
  return Promise.resolve();
};

module.exports = BaseView;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var Promise = global.Promise || __webpack_require__(54);

module.exports = Promise;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
var emptyFunction = function emptyFunction() {};

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

module.exports = emptyFunction;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

if (process.env.NODE_ENV !== 'production') {
  var REACT_ELEMENT_TYPE = (typeof Symbol === 'function' &&
    Symbol.for &&
    Symbol.for('react.element')) ||
    0xeac7;

  var isValidElement = function(object) {
    return typeof object === 'object' &&
      object !== null &&
      object.$$typeof === REACT_ELEMENT_TYPE;
  };

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = __webpack_require__(70)(isValidElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = __webpack_require__(71)();
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var atob = __webpack_require__(45).atob;
var constants = __webpack_require__(2);
var braintreeClientVersion = __webpack_require__(46).VERSION;

function _millisToSeconds(millis) {
  return Math.floor(millis / 1000);
}

function sendAnalyticsEvent(client, kind, callback) {
  var configuration = client.getConfiguration();
  var analyticsRequest = client._request;
  var timestamp = _millisToSeconds(Date.now());
  var url = configuration.gatewayConfiguration.analytics.url;
  var data = {
    analytics: [{
      kind: constants.ANALYTICS_PREFIX + kind,
      timestamp: timestamp
    }],
    _meta: configuration.analyticsMetadata,
    braintreeLibraryVersion: braintreeClientVersion
  };

  if (configuration.authorizationType === 'TOKENIZATION_KEY') {
    data.tokenizationKey = configuration.authorization;
  } else {
    data.authorizationFingerprint = JSON.parse(atob(configuration.authorization)).authorizationFingerprint;
  }

  analyticsRequest({
    url: url,
    method: 'post',
    data: data,
    timeout: constants.ANALYTICS_REQUEST_TIMEOUT_MS
  }, callback);
}

module.exports = {
  sendEvent: sendAnalyticsEvent
};


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var VERSION = "3.22.2";
var PLATFORM = 'web';

module.exports = {
  ANALYTICS_PREFIX: 'web.',
  ANALYTICS_REQUEST_TIMEOUT_MS: 2000,
  INTEGRATION_TIMEOUT_MS: 60000,
  VERSION: VERSION,
  INTEGRATION: 'custom',
  SOURCE: 'client',
  PLATFORM: PLATFORM,
  BRAINTREE_LIBRARY_VERSION: 'braintree/' + PLATFORM + '/' + VERSION
};


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var BraintreeError = __webpack_require__(3);

module.exports = {
  CALLBACK_REQUIRED: {
    type: BraintreeError.types.MERCHANT,
    code: 'CALLBACK_REQUIRED'
  },
  INSTANTIATION_OPTION_REQUIRED: {
    type: BraintreeError.types.MERCHANT,
    code: 'INSTANTIATION_OPTION_REQUIRED'
  },
  INVALID_OPTION: {
    type: BraintreeError.types.MERCHANT,
    code: 'INVALID_OPTION'
  },
  INCOMPATIBLE_VERSIONS: {
    type: BraintreeError.types.MERCHANT,
    code: 'INCOMPATIBLE_VERSIONS'
  },
  METHOD_CALLED_AFTER_TEARDOWN: {
    type: BraintreeError.types.MERCHANT,
    code: 'METHOD_CALLED_AFTER_TEARDOWN'
  },
  BRAINTREE_API_ACCESS_RESTRICTED: {
    type: BraintreeError.types.MERCHANT,
    code: 'BRAINTREE_API_ACCESS_RESTRICTED',
    message: 'Your access is restricted and cannot use this part of the Braintree API.'
  }
};


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isPrefixedValue;

var regex = /-webkit-|-moz-|-ms-/;

function isPrefixedValue(value) {
  return typeof value === 'string' && regex.test(value);
}
module.exports = exports['default'];

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var assignNormalized = typeof Object.assign === 'function' ? Object.assign : assignPolyfill;

function assignPolyfill(destination) {
  var i, source, key;

  for (i = 1; i < arguments.length; i++) {
    source = arguments[i];
    for (key in source) {
      if (source.hasOwnProperty(key)) {
        destination[key] = source[key];
      }
    }
  }

  return destination;
}

module.exports = {
  assign: assignNormalized,
  _assign: assignPolyfill
};


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classesOf(element) {
  return element.className.trim().split(/\s+/);
}

function _hasClass(element, classname) {
  return new RegExp('\\b' + classname + '\\b').test(element.className);
}

function add(element) {
  var toAdd = Array.prototype.slice.call(arguments, 1);
  var className = _classesOf(element).filter(function (classname) {
    return toAdd.indexOf(classname) === -1;
  }).concat(toAdd).join(' ');

  element.className = className;
}

function remove(element) {
  var toRemove = Array.prototype.slice.call(arguments, 1);
  var className = _classesOf(element).filter(function (classname) {
    return toRemove.indexOf(classname) === -1;
  }).join(' ');

  element.className = className;
}

function toggle(element, classname, adding) {
  if (arguments.length < 3) {
    if (_hasClass(element, classname)) {
      remove(element, classname);
    } else {
      add(element, classname);
    }
  } else if (adding) {
    add(element, classname);
  } else {
    remove(element, classname);
  }
}

module.exports = {
  add: add,
  remove: remove,
  toggle: toggle
};


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var emptyObject = {};

if (process.env.NODE_ENV !== 'production') {
  Object.freeze(emptyObject);
}

module.exports = emptyObject;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



if (process.env.NODE_ENV !== 'production') {
  var invariant = __webpack_require__(10);
  var warning = __webpack_require__(6);
  var ReactPropTypesSecret = __webpack_require__(22);
  var loggedTypeFailures = {};
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if (process.env.NODE_ENV !== 'production') {
    for (var typeSpecName in typeSpecs) {
      if (typeSpecs.hasOwnProperty(typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          invariant(typeof typeSpecs[typeSpecName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'React.PropTypes.', componentName || 'React class', location, typeSpecName);
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
        } catch (ex) {
          error = ex;
        }
        warning(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error);
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          warning(false, 'Failed %s type: %s%s', location, error.message, stack != null ? stack : '');
        }
      }
    }
  }
}

module.exports = checkPropTypes;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 24 */,
/* 25 */,
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function enumerate(values, prefix) {
  prefix = prefix == null ? '' : prefix;

  return values.reduce(function (enumeration, value) {
    enumeration[value] = prefix + value;
    return enumeration;
  }, {});
}

module.exports = enumerate;


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function once(fn) {
  var called = false;

  return function () {
    if (!called) {
      called = true;
      fn.apply(null, arguments);
    }
  };
}

module.exports = once;


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0;
    var v = c === 'x' ? r : r & 0x3 | 0x8;

    return v.toString(16);
  });
}

module.exports = uuid;


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* eslint-disable no-reserved-keys */

var enumerate = __webpack_require__(26);
var errors = __webpack_require__(30);
var VERSION = "3.22.2";

var constants = {
  VERSION: VERSION,
  maxExpirationYearAge: 19,
  externalEvents: {
    FOCUS: 'focus',
    BLUR: 'blur',
    EMPTY: 'empty',
    NOT_EMPTY: 'notEmpty',
    VALIDITY_CHANGE: 'validityChange',
    CARD_TYPE_CHANGE: 'cardTypeChange'
  },
  defaultMaxLengths: {
    number: 19,
    postalCode: 8,
    expirationDate: 7,
    expirationMonth: 2,
    expirationYear: 4,
    cvv: 3
  },
  externalClasses: {
    FOCUSED: 'braintree-hosted-fields-focused',
    INVALID: 'braintree-hosted-fields-invalid',
    VALID: 'braintree-hosted-fields-valid'
  },
  defaultIFrameStyle: {
    border: 'none',
    width: '100%',
    height: '100%',
    'float': 'left'
  },
  tokenizationErrorCodes: {
    81724: errors.HOSTED_FIELDS_TOKENIZATION_FAIL_ON_DUPLICATE,
    81736: errors.HOSTED_FIELDS_TOKENIZATION_CVV_VERIFICATION_FAILED
  },
  whitelistedStyles: [
    '-moz-appearance',
    '-moz-osx-font-smoothing',
    '-moz-tap-highlight-color',
    '-moz-transition',
    '-webkit-appearance',
    '-webkit-font-smoothing',
    '-webkit-tap-highlight-color',
    '-webkit-transition',
    'appearance',
    'color',
    'direction',
    'font',
    'font-family',
    'font-size',
    'font-size-adjust',
    'font-stretch',
    'font-style',
    'font-variant',
    'font-variant-alternates',
    'font-variant-caps',
    'font-variant-east-asian',
    'font-variant-ligatures',
    'font-variant-numeric',
    'font-weight',
    'letter-spacing',
    'line-height',
    'opacity',
    'outline',
    'text-shadow',
    'transition'
  ],
  whitelistedFields: {
    number: {
      name: 'credit-card-number',
      label: 'Credit Card Number'
    },
    cvv: {
      name: 'cvv',
      label: 'CVV'
    },
    expirationDate: {
      name: 'expiration',
      label: 'Expiration Date'
    },
    expirationMonth: {
      name: 'expiration-month',
      label: 'Expiration Month'
    },
    expirationYear: {
      name: 'expiration-year',
      label: 'Expiration Year'
    },
    postalCode: {
      name: 'postal-code',
      label: 'Postal Code'
    }
  },
  whitelistedAttributes: {
    'aria-invalid': 'boolean',
    'aria-required': 'boolean',
    disabled: 'boolean',
    placeholder: 'string'
  }
};

constants.events = enumerate([
  'FRAME_READY',
  'VALIDATE_STRICT',
  'CONFIGURATION',
  'TOKENIZATION_REQUEST',
  'INPUT_EVENT',
  'TRIGGER_INPUT_FOCUS',
  'ADD_CLASS',
  'REMOVE_CLASS',
  'SET_ATTRIBUTE',
  'REMOVE_ATTRIBUTE',
  'CLEAR_FIELD',
  'AUTOFILL_EXPIRATION_DATE'
], 'hosted-fields:');

module.exports = constants;


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var BraintreeError = __webpack_require__(3);

module.exports = {
  HOSTED_FIELDS_INVALID_FIELD_KEY: {
    type: BraintreeError.types.MERCHANT,
    code: 'HOSTED_FIELDS_INVALID_FIELD_KEY'
  },
  HOSTED_FIELDS_INVALID_FIELD_SELECTOR: {
    type: BraintreeError.types.MERCHANT,
    code: 'HOSTED_FIELDS_INVALID_FIELD_SELECTOR',
    message: 'Selector does not reference a valid DOM node.'
  },
  HOSTED_FIELDS_FIELD_DUPLICATE_IFRAME: {
    type: BraintreeError.types.MERCHANT,
    code: 'HOSTED_FIELDS_FIELD_DUPLICATE_IFRAME',
    message: 'Element already contains a Braintree iframe.'
  },
  HOSTED_FIELDS_FIELD_INVALID: {
    type: BraintreeError.types.MERCHANT,
    code: 'HOSTED_FIELDS_FIELD_INVALID'
  },
  HOSTED_FIELDS_FIELD_NOT_PRESENT: {
    type: BraintreeError.types.MERCHANT,
    code: 'HOSTED_FIELDS_FIELD_NOT_PRESENT'
  },
  HOSTED_FIELDS_TOKENIZATION_NETWORK_ERROR: {
    type: BraintreeError.types.NETWORK,
    code: 'HOSTED_FIELDS_TOKENIZATION_NETWORK_ERROR',
    message: 'A tokenization network error occurred.'
  },
  HOSTED_FIELDS_TOKENIZATION_FAIL_ON_DUPLICATE: {
    type: BraintreeError.types.CUSTOMER,
    code: 'HOSTED_FIELDS_TOKENIZATION_FAIL_ON_DUPLICATE',
    message: 'This credit card already exists in the merchant\'s vault.'
  },
  HOSTED_FIELDS_TOKENIZATION_CVV_VERIFICATION_FAILED: {
    type: BraintreeError.types.CUSTOMER,
    code: 'HOSTED_FIELDS_TOKENIZATION_CVV_VERIFICATION_FAILED',
    message: 'CVV verification failed during tokenization.'
  },
  HOSTED_FIELDS_FAILED_TOKENIZATION: {
    type: BraintreeError.types.CUSTOMER,
    code: 'HOSTED_FIELDS_FAILED_TOKENIZATION',
    message: 'The supplied card data failed tokenization.'
  },
  HOSTED_FIELDS_FIELDS_EMPTY: {
    type: BraintreeError.types.CUSTOMER,
    code: 'HOSTED_FIELDS_FIELDS_EMPTY',
    message: 'All fields are empty. Cannot tokenize empty card fields.'
  },
  HOSTED_FIELDS_FIELDS_INVALID: {
    type: BraintreeError.types.CUSTOMER,
    code: 'HOSTED_FIELDS_FIELDS_INVALID',
    message: 'Some payment input fields are invalid. Cannot tokenize invalid card fields.'
  },
  HOSTED_FIELDS_ATTRIBUTE_NOT_SUPPORTED: {
    type: BraintreeError.types.MERCHANT,
    code: 'HOSTED_FIELDS_ATTRIBUTE_NOT_SUPPORTED'
  },
  HOSTED_FIELDS_ATTRIBUTE_VALUE_NOT_ALLOWED: {
    type: BraintreeError.types.MERCHANT,
    code: 'HOSTED_FIELDS_ATTRIBUTE_VALUE_NOT_ALLOWED'
  },
  HOSTED_FIELDS_FIELD_PROPERTY_INVALID: {
    type: BraintreeError.types.MERCHANT,
    code: 'HOSTED_FIELDS_FIELD_PROPERTY_INVALID'
  }
};


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isIe9(ua) {
  ua = ua || navigator.userAgent;
  return ua.indexOf('MSIE 9') !== -1;
};


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

module.exports = function isIos(ua) {
  ua = ua || global.navigator.userAgent;
  return /iPhone|iPod|iPad/i.test(ua);
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var constants = __webpack_require__(16);
var addMetadata = __webpack_require__(52);

function _millisToSeconds(millis) {
  return Math.floor(millis / 1000);
}

function sendAnalyticsEvent(client, kind, callback) {
  var configuration = client.getConfiguration();
  var request = client._request;
  var timestamp = _millisToSeconds(Date.now());
  var url = configuration.gatewayConfiguration.analytics.url;
  var data = {
    analytics: [{
      kind: constants.ANALYTICS_PREFIX + kind,
      timestamp: timestamp
    }]
  };

  request({
    url: url,
    method: 'post',
    data: addMetadata(configuration, data),
    timeout: constants.ANALYTICS_REQUEST_TIMEOUT_MS
  }, callback);
}

module.exports = {
  sendEvent: sendAnalyticsEvent
};


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function addSelectionEventHandler(element, func) {
  element.addEventListener('click', func);
  element.addEventListener('keyup', function (event) {
    if (event.keyCode === 13) {
      func();
    }
  });
}

module.exports = addSelectionEventHandler;


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var _assign = __webpack_require__(9);

var emptyObject = __webpack_require__(21);
var _invariant = __webpack_require__(10);

if (process.env.NODE_ENV !== 'production') {
  var warning = __webpack_require__(6);
}

var MIXINS_KEY = 'mixins';

// Helper function to allow the creation of anonymous functions which do not
// have .name set to the name of the variable being assigned to.
function identity(fn) {
  return fn;
}

var ReactPropTypeLocationNames;
if (process.env.NODE_ENV !== 'production') {
  ReactPropTypeLocationNames = {
    prop: 'prop',
    context: 'context',
    childContext: 'child context'
  };
} else {
  ReactPropTypeLocationNames = {};
}

function factory(ReactComponent, isValidElement, ReactNoopUpdateQueue) {
  /**
   * Policies that describe methods in `ReactClassInterface`.
   */

  var injectedMixins = [];

  /**
   * Composite components are higher-level components that compose other composite
   * or host components.
   *
   * To create a new type of `ReactClass`, pass a specification of
   * your new class to `React.createClass`. The only requirement of your class
   * specification is that you implement a `render` method.
   *
   *   var MyComponent = React.createClass({
   *     render: function() {
   *       return <div>Hello World</div>;
   *     }
   *   });
   *
   * The class specification supports a specific protocol of methods that have
   * special meaning (e.g. `render`). See `ReactClassInterface` for
   * more the comprehensive protocol. Any other properties and methods in the
   * class specification will be available on the prototype.
   *
   * @interface ReactClassInterface
   * @internal
   */
  var ReactClassInterface = {
    /**
     * An array of Mixin objects to include when defining your component.
     *
     * @type {array}
     * @optional
     */
    mixins: 'DEFINE_MANY',

    /**
     * An object containing properties and methods that should be defined on
     * the component's constructor instead of its prototype (static methods).
     *
     * @type {object}
     * @optional
     */
    statics: 'DEFINE_MANY',

    /**
     * Definition of prop types for this component.
     *
     * @type {object}
     * @optional
     */
    propTypes: 'DEFINE_MANY',

    /**
     * Definition of context types for this component.
     *
     * @type {object}
     * @optional
     */
    contextTypes: 'DEFINE_MANY',

    /**
     * Definition of context types this component sets for its children.
     *
     * @type {object}
     * @optional
     */
    childContextTypes: 'DEFINE_MANY',

    // ==== Definition methods ====

    /**
     * Invoked when the component is mounted. Values in the mapping will be set on
     * `this.props` if that prop is not specified (i.e. using an `in` check).
     *
     * This method is invoked before `getInitialState` and therefore cannot rely
     * on `this.state` or use `this.setState`.
     *
     * @return {object}
     * @optional
     */
    getDefaultProps: 'DEFINE_MANY_MERGED',

    /**
     * Invoked once before the component is mounted. The return value will be used
     * as the initial value of `this.state`.
     *
     *   getInitialState: function() {
     *     return {
     *       isOn: false,
     *       fooBaz: new BazFoo()
     *     }
     *   }
     *
     * @return {object}
     * @optional
     */
    getInitialState: 'DEFINE_MANY_MERGED',

    /**
     * @return {object}
     * @optional
     */
    getChildContext: 'DEFINE_MANY_MERGED',

    /**
     * Uses props from `this.props` and state from `this.state` to render the
     * structure of the component.
     *
     * No guarantees are made about when or how often this method is invoked, so
     * it must not have side effects.
     *
     *   render: function() {
     *     var name = this.props.name;
     *     return <div>Hello, {name}!</div>;
     *   }
     *
     * @return {ReactComponent}
     * @required
     */
    render: 'DEFINE_ONCE',

    // ==== Delegate methods ====

    /**
     * Invoked when the component is initially created and about to be mounted.
     * This may have side effects, but any external subscriptions or data created
     * by this method must be cleaned up in `componentWillUnmount`.
     *
     * @optional
     */
    componentWillMount: 'DEFINE_MANY',

    /**
     * Invoked when the component has been mounted and has a DOM representation.
     * However, there is no guarantee that the DOM node is in the document.
     *
     * Use this as an opportunity to operate on the DOM when the component has
     * been mounted (initialized and rendered) for the first time.
     *
     * @param {DOMElement} rootNode DOM element representing the component.
     * @optional
     */
    componentDidMount: 'DEFINE_MANY',

    /**
     * Invoked before the component receives new props.
     *
     * Use this as an opportunity to react to a prop transition by updating the
     * state using `this.setState`. Current props are accessed via `this.props`.
     *
     *   componentWillReceiveProps: function(nextProps, nextContext) {
     *     this.setState({
     *       likesIncreasing: nextProps.likeCount > this.props.likeCount
     *     });
     *   }
     *
     * NOTE: There is no equivalent `componentWillReceiveState`. An incoming prop
     * transition may cause a state change, but the opposite is not true. If you
     * need it, you are probably looking for `componentWillUpdate`.
     *
     * @param {object} nextProps
     * @optional
     */
    componentWillReceiveProps: 'DEFINE_MANY',

    /**
     * Invoked while deciding if the component should be updated as a result of
     * receiving new props, state and/or context.
     *
     * Use this as an opportunity to `return false` when you're certain that the
     * transition to the new props/state/context will not require a component
     * update.
     *
     *   shouldComponentUpdate: function(nextProps, nextState, nextContext) {
     *     return !equal(nextProps, this.props) ||
     *       !equal(nextState, this.state) ||
     *       !equal(nextContext, this.context);
     *   }
     *
     * @param {object} nextProps
     * @param {?object} nextState
     * @param {?object} nextContext
     * @return {boolean} True if the component should update.
     * @optional
     */
    shouldComponentUpdate: 'DEFINE_ONCE',

    /**
     * Invoked when the component is about to update due to a transition from
     * `this.props`, `this.state` and `this.context` to `nextProps`, `nextState`
     * and `nextContext`.
     *
     * Use this as an opportunity to perform preparation before an update occurs.
     *
     * NOTE: You **cannot** use `this.setState()` in this method.
     *
     * @param {object} nextProps
     * @param {?object} nextState
     * @param {?object} nextContext
     * @param {ReactReconcileTransaction} transaction
     * @optional
     */
    componentWillUpdate: 'DEFINE_MANY',

    /**
     * Invoked when the component's DOM representation has been updated.
     *
     * Use this as an opportunity to operate on the DOM when the component has
     * been updated.
     *
     * @param {object} prevProps
     * @param {?object} prevState
     * @param {?object} prevContext
     * @param {DOMElement} rootNode DOM element representing the component.
     * @optional
     */
    componentDidUpdate: 'DEFINE_MANY',

    /**
     * Invoked when the component is about to be removed from its parent and have
     * its DOM representation destroyed.
     *
     * Use this as an opportunity to deallocate any external resources.
     *
     * NOTE: There is no `componentDidUnmount` since your component will have been
     * destroyed by that point.
     *
     * @optional
     */
    componentWillUnmount: 'DEFINE_MANY',

    // ==== Advanced methods ====

    /**
     * Updates the component's currently mounted DOM representation.
     *
     * By default, this implements React's rendering and reconciliation algorithm.
     * Sophisticated clients may wish to override this.
     *
     * @param {ReactReconcileTransaction} transaction
     * @internal
     * @overridable
     */
    updateComponent: 'OVERRIDE_BASE'
  };

  /**
   * Mapping from class specification keys to special processing functions.
   *
   * Although these are declared like instance properties in the specification
   * when defining classes using `React.createClass`, they are actually static
   * and are accessible on the constructor instead of the prototype. Despite
   * being static, they must be defined outside of the "statics" key under
   * which all other static methods are defined.
   */
  var RESERVED_SPEC_KEYS = {
    displayName: function(Constructor, displayName) {
      Constructor.displayName = displayName;
    },
    mixins: function(Constructor, mixins) {
      if (mixins) {
        for (var i = 0; i < mixins.length; i++) {
          mixSpecIntoComponent(Constructor, mixins[i]);
        }
      }
    },
    childContextTypes: function(Constructor, childContextTypes) {
      if (process.env.NODE_ENV !== 'production') {
        validateTypeDef(Constructor, childContextTypes, 'childContext');
      }
      Constructor.childContextTypes = _assign(
        {},
        Constructor.childContextTypes,
        childContextTypes
      );
    },
    contextTypes: function(Constructor, contextTypes) {
      if (process.env.NODE_ENV !== 'production') {
        validateTypeDef(Constructor, contextTypes, 'context');
      }
      Constructor.contextTypes = _assign(
        {},
        Constructor.contextTypes,
        contextTypes
      );
    },
    /**
     * Special case getDefaultProps which should move into statics but requires
     * automatic merging.
     */
    getDefaultProps: function(Constructor, getDefaultProps) {
      if (Constructor.getDefaultProps) {
        Constructor.getDefaultProps = createMergedResultFunction(
          Constructor.getDefaultProps,
          getDefaultProps
        );
      } else {
        Constructor.getDefaultProps = getDefaultProps;
      }
    },
    propTypes: function(Constructor, propTypes) {
      if (process.env.NODE_ENV !== 'production') {
        validateTypeDef(Constructor, propTypes, 'prop');
      }
      Constructor.propTypes = _assign({}, Constructor.propTypes, propTypes);
    },
    statics: function(Constructor, statics) {
      mixStaticSpecIntoComponent(Constructor, statics);
    },
    autobind: function() {}
  };

  function validateTypeDef(Constructor, typeDef, location) {
    for (var propName in typeDef) {
      if (typeDef.hasOwnProperty(propName)) {
        // use a warning instead of an _invariant so components
        // don't show up in prod but only in __DEV__
        if (process.env.NODE_ENV !== 'production') {
          warning(
            typeof typeDef[propName] === 'function',
            '%s: %s type `%s` is invalid; it must be a function, usually from ' +
              'React.PropTypes.',
            Constructor.displayName || 'ReactClass',
            ReactPropTypeLocationNames[location],
            propName
          );
        }
      }
    }
  }

  function validateMethodOverride(isAlreadyDefined, name) {
    var specPolicy = ReactClassInterface.hasOwnProperty(name)
      ? ReactClassInterface[name]
      : null;

    // Disallow overriding of base class methods unless explicitly allowed.
    if (ReactClassMixin.hasOwnProperty(name)) {
      _invariant(
        specPolicy === 'OVERRIDE_BASE',
        'ReactClassInterface: You are attempting to override ' +
          '`%s` from your class specification. Ensure that your method names ' +
          'do not overlap with React methods.',
        name
      );
    }

    // Disallow defining methods more than once unless explicitly allowed.
    if (isAlreadyDefined) {
      _invariant(
        specPolicy === 'DEFINE_MANY' || specPolicy === 'DEFINE_MANY_MERGED',
        'ReactClassInterface: You are attempting to define ' +
          '`%s` on your component more than once. This conflict may be due ' +
          'to a mixin.',
        name
      );
    }
  }

  /**
   * Mixin helper which handles policy validation and reserved
   * specification keys when building React classes.
   */
  function mixSpecIntoComponent(Constructor, spec) {
    if (!spec) {
      if (process.env.NODE_ENV !== 'production') {
        var typeofSpec = typeof spec;
        var isMixinValid = typeofSpec === 'object' && spec !== null;

        if (process.env.NODE_ENV !== 'production') {
          warning(
            isMixinValid,
            "%s: You're attempting to include a mixin that is either null " +
              'or not an object. Check the mixins included by the component, ' +
              'as well as any mixins they include themselves. ' +
              'Expected object but got %s.',
            Constructor.displayName || 'ReactClass',
            spec === null ? null : typeofSpec
          );
        }
      }

      return;
    }

    _invariant(
      typeof spec !== 'function',
      "ReactClass: You're attempting to " +
        'use a component class or function as a mixin. Instead, just use a ' +
        'regular object.'
    );
    _invariant(
      !isValidElement(spec),
      "ReactClass: You're attempting to " +
        'use a component as a mixin. Instead, just use a regular object.'
    );

    var proto = Constructor.prototype;
    var autoBindPairs = proto.__reactAutoBindPairs;

    // By handling mixins before any other properties, we ensure the same
    // chaining order is applied to methods with DEFINE_MANY policy, whether
    // mixins are listed before or after these methods in the spec.
    if (spec.hasOwnProperty(MIXINS_KEY)) {
      RESERVED_SPEC_KEYS.mixins(Constructor, spec.mixins);
    }

    for (var name in spec) {
      if (!spec.hasOwnProperty(name)) {
        continue;
      }

      if (name === MIXINS_KEY) {
        // We have already handled mixins in a special case above.
        continue;
      }

      var property = spec[name];
      var isAlreadyDefined = proto.hasOwnProperty(name);
      validateMethodOverride(isAlreadyDefined, name);

      if (RESERVED_SPEC_KEYS.hasOwnProperty(name)) {
        RESERVED_SPEC_KEYS[name](Constructor, property);
      } else {
        // Setup methods on prototype:
        // The following member methods should not be automatically bound:
        // 1. Expected ReactClass methods (in the "interface").
        // 2. Overridden methods (that were mixed in).
        var isReactClassMethod = ReactClassInterface.hasOwnProperty(name);
        var isFunction = typeof property === 'function';
        var shouldAutoBind =
          isFunction &&
          !isReactClassMethod &&
          !isAlreadyDefined &&
          spec.autobind !== false;

        if (shouldAutoBind) {
          autoBindPairs.push(name, property);
          proto[name] = property;
        } else {
          if (isAlreadyDefined) {
            var specPolicy = ReactClassInterface[name];

            // These cases should already be caught by validateMethodOverride.
            _invariant(
              isReactClassMethod &&
                (specPolicy === 'DEFINE_MANY_MERGED' ||
                  specPolicy === 'DEFINE_MANY'),
              'ReactClass: Unexpected spec policy %s for key %s ' +
                'when mixing in component specs.',
              specPolicy,
              name
            );

            // For methods which are defined more than once, call the existing
            // methods before calling the new property, merging if appropriate.
            if (specPolicy === 'DEFINE_MANY_MERGED') {
              proto[name] = createMergedResultFunction(proto[name], property);
            } else if (specPolicy === 'DEFINE_MANY') {
              proto[name] = createChainedFunction(proto[name], property);
            }
          } else {
            proto[name] = property;
            if (process.env.NODE_ENV !== 'production') {
              // Add verbose displayName to the function, which helps when looking
              // at profiling tools.
              if (typeof property === 'function' && spec.displayName) {
                proto[name].displayName = spec.displayName + '_' + name;
              }
            }
          }
        }
      }
    }
  }

  function mixStaticSpecIntoComponent(Constructor, statics) {
    if (!statics) {
      return;
    }
    for (var name in statics) {
      var property = statics[name];
      if (!statics.hasOwnProperty(name)) {
        continue;
      }

      var isReserved = name in RESERVED_SPEC_KEYS;
      _invariant(
        !isReserved,
        'ReactClass: You are attempting to define a reserved ' +
          'property, `%s`, that shouldn\'t be on the "statics" key. Define it ' +
          'as an instance property instead; it will still be accessible on the ' +
          'constructor.',
        name
      );

      var isInherited = name in Constructor;
      _invariant(
        !isInherited,
        'ReactClass: You are attempting to define ' +
          '`%s` on your component more than once. This conflict may be ' +
          'due to a mixin.',
        name
      );
      Constructor[name] = property;
    }
  }

  /**
   * Merge two objects, but throw if both contain the same key.
   *
   * @param {object} one The first object, which is mutated.
   * @param {object} two The second object
   * @return {object} one after it has been mutated to contain everything in two.
   */
  function mergeIntoWithNoDuplicateKeys(one, two) {
    _invariant(
      one && two && typeof one === 'object' && typeof two === 'object',
      'mergeIntoWithNoDuplicateKeys(): Cannot merge non-objects.'
    );

    for (var key in two) {
      if (two.hasOwnProperty(key)) {
        _invariant(
          one[key] === undefined,
          'mergeIntoWithNoDuplicateKeys(): ' +
            'Tried to merge two objects with the same key: `%s`. This conflict ' +
            'may be due to a mixin; in particular, this may be caused by two ' +
            'getInitialState() or getDefaultProps() methods returning objects ' +
            'with clashing keys.',
          key
        );
        one[key] = two[key];
      }
    }
    return one;
  }

  /**
   * Creates a function that invokes two functions and merges their return values.
   *
   * @param {function} one Function to invoke first.
   * @param {function} two Function to invoke second.
   * @return {function} Function that invokes the two argument functions.
   * @private
   */
  function createMergedResultFunction(one, two) {
    return function mergedResult() {
      var a = one.apply(this, arguments);
      var b = two.apply(this, arguments);
      if (a == null) {
        return b;
      } else if (b == null) {
        return a;
      }
      var c = {};
      mergeIntoWithNoDuplicateKeys(c, a);
      mergeIntoWithNoDuplicateKeys(c, b);
      return c;
    };
  }

  /**
   * Creates a function that invokes two functions and ignores their return vales.
   *
   * @param {function} one Function to invoke first.
   * @param {function} two Function to invoke second.
   * @return {function} Function that invokes the two argument functions.
   * @private
   */
  function createChainedFunction(one, two) {
    return function chainedFunction() {
      one.apply(this, arguments);
      two.apply(this, arguments);
    };
  }

  /**
   * Binds a method to the component.
   *
   * @param {object} component Component whose method is going to be bound.
   * @param {function} method Method to be bound.
   * @return {function} The bound method.
   */
  function bindAutoBindMethod(component, method) {
    var boundMethod = method.bind(component);
    if (process.env.NODE_ENV !== 'production') {
      boundMethod.__reactBoundContext = component;
      boundMethod.__reactBoundMethod = method;
      boundMethod.__reactBoundArguments = null;
      var componentName = component.constructor.displayName;
      var _bind = boundMethod.bind;
      boundMethod.bind = function(newThis) {
        for (
          var _len = arguments.length,
            args = Array(_len > 1 ? _len - 1 : 0),
            _key = 1;
          _key < _len;
          _key++
        ) {
          args[_key - 1] = arguments[_key];
        }

        // User is trying to bind() an autobound method; we effectively will
        // ignore the value of "this" that the user is trying to use, so
        // let's warn.
        if (newThis !== component && newThis !== null) {
          if (process.env.NODE_ENV !== 'production') {
            warning(
              false,
              'bind(): React component methods may only be bound to the ' +
                'component instance. See %s',
              componentName
            );
          }
        } else if (!args.length) {
          if (process.env.NODE_ENV !== 'production') {
            warning(
              false,
              'bind(): You are binding a component method to the component. ' +
                'React does this for you automatically in a high-performance ' +
                'way, so you can safely remove this call. See %s',
              componentName
            );
          }
          return boundMethod;
        }
        var reboundMethod = _bind.apply(boundMethod, arguments);
        reboundMethod.__reactBoundContext = component;
        reboundMethod.__reactBoundMethod = method;
        reboundMethod.__reactBoundArguments = args;
        return reboundMethod;
      };
    }
    return boundMethod;
  }

  /**
   * Binds all auto-bound methods in a component.
   *
   * @param {object} component Component whose method is going to be bound.
   */
  function bindAutoBindMethods(component) {
    var pairs = component.__reactAutoBindPairs;
    for (var i = 0; i < pairs.length; i += 2) {
      var autoBindKey = pairs[i];
      var method = pairs[i + 1];
      component[autoBindKey] = bindAutoBindMethod(component, method);
    }
  }

  var IsMountedPreMixin = {
    componentDidMount: function() {
      this.__isMounted = true;
    }
  };

  var IsMountedPostMixin = {
    componentWillUnmount: function() {
      this.__isMounted = false;
    }
  };

  /**
   * Add more to the ReactClass base class. These are all legacy features and
   * therefore not already part of the modern ReactComponent.
   */
  var ReactClassMixin = {
    /**
     * TODO: This will be deprecated because state should always keep a consistent
     * type signature and the only use case for this, is to avoid that.
     */
    replaceState: function(newState, callback) {
      this.updater.enqueueReplaceState(this, newState, callback);
    },

    /**
     * Checks whether or not this composite component is mounted.
     * @return {boolean} True if mounted, false otherwise.
     * @protected
     * @final
     */
    isMounted: function() {
      if (process.env.NODE_ENV !== 'production') {
        warning(
          this.__didWarnIsMounted,
          '%s: isMounted is deprecated. Instead, make sure to clean up ' +
            'subscriptions and pending requests in componentWillUnmount to ' +
            'prevent memory leaks.',
          (this.constructor && this.constructor.displayName) ||
            this.name ||
            'Component'
        );
        this.__didWarnIsMounted = true;
      }
      return !!this.__isMounted;
    }
  };

  var ReactClassComponent = function() {};
  _assign(
    ReactClassComponent.prototype,
    ReactComponent.prototype,
    ReactClassMixin
  );

  /**
   * Creates a composite component class given a class specification.
   * See https://facebook.github.io/react/docs/top-level-api.html#react.createclass
   *
   * @param {object} spec Class specification (which must define `render`).
   * @return {function} Component constructor function.
   * @public
   */
  function createClass(spec) {
    // To keep our warnings more understandable, we'll use a little hack here to
    // ensure that Constructor.name !== 'Constructor'. This makes sure we don't
    // unnecessarily identify a class without displayName as 'Constructor'.
    var Constructor = identity(function(props, context, updater) {
      // This constructor gets overridden by mocks. The argument is used
      // by mocks to assert on what gets mounted.

      if (process.env.NODE_ENV !== 'production') {
        warning(
          this instanceof Constructor,
          'Something is calling a React component directly. Use a factory or ' +
            'JSX instead. See: https://fb.me/react-legacyfactory'
        );
      }

      // Wire up auto-binding
      if (this.__reactAutoBindPairs.length) {
        bindAutoBindMethods(this);
      }

      this.props = props;
      this.context = context;
      this.refs = emptyObject;
      this.updater = updater || ReactNoopUpdateQueue;

      this.state = null;

      // ReactClasses doesn't have constructors. Instead, they use the
      // getInitialState and componentWillMount methods for initialization.

      var initialState = this.getInitialState ? this.getInitialState() : null;
      if (process.env.NODE_ENV !== 'production') {
        // We allow auto-mocks to proceed as if they're returning null.
        if (
          initialState === undefined &&
          this.getInitialState._isMockFunction
        ) {
          // This is probably bad practice. Consider warning here and
          // deprecating this convenience.
          initialState = null;
        }
      }
      _invariant(
        typeof initialState === 'object' && !Array.isArray(initialState),
        '%s.getInitialState(): must return an object or null',
        Constructor.displayName || 'ReactCompositeComponent'
      );

      this.state = initialState;
    });
    Constructor.prototype = new ReactClassComponent();
    Constructor.prototype.constructor = Constructor;
    Constructor.prototype.__reactAutoBindPairs = [];

    injectedMixins.forEach(mixSpecIntoComponent.bind(null, Constructor));

    mixSpecIntoComponent(Constructor, IsMountedPreMixin);
    mixSpecIntoComponent(Constructor, spec);
    mixSpecIntoComponent(Constructor, IsMountedPostMixin);

    // Initialize the defaultProps property after all mixins have been merged.
    if (Constructor.getDefaultProps) {
      Constructor.defaultProps = Constructor.getDefaultProps();
    }

    if (process.env.NODE_ENV !== 'production') {
      // This is a tag to indicate that the use of these method names is ok,
      // since it's used with createClass. If it's not, then it's likely a
      // mistake so we'll warn you to use the static property, property
      // initializer or constructor respectively.
      if (Constructor.getDefaultProps) {
        Constructor.getDefaultProps.isReactClassApproved = {};
      }
      if (Constructor.prototype.getInitialState) {
        Constructor.prototype.getInitialState.isReactClassApproved = {};
      }
    }

    _invariant(
      Constructor.prototype.render,
      'createClass(...): Class specification must implement a `render` method.'
    );

    if (process.env.NODE_ENV !== 'production') {
      warning(
        !Constructor.prototype.componentShouldUpdate,
        '%s has a method called ' +
          'componentShouldUpdate(). Did you mean shouldComponentUpdate()? ' +
          'The name is phrased as a question because the function is ' +
          'expected to return a value.',
        spec.displayName || 'A component'
      );
      warning(
        !Constructor.prototype.componentWillRecieveProps,
        '%s has a method called ' +
          'componentWillRecieveProps(). Did you mean componentWillReceiveProps()?',
        spec.displayName || 'A component'
      );
    }

    // Reduce time spent doing lookups by setting these on the prototype.
    for (var methodName in ReactClassInterface) {
      if (!Constructor.prototype[methodName]) {
        Constructor.prototype[methodName] = null;
      }
    }

    return Constructor;
  }

  return createClass;
}

module.exports = factory;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var atobNormalized = typeof global.atob === 'function' ? global.atob : atob;

function atob(base64String) {
  var a, b, c, b1, b2, b3, b4, i;
  var base64Matcher = new RegExp('^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{4})([=]{1,2})?$');
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
  var result = '';

  if (!base64Matcher.test(base64String)) {
    throw new Error('Non base64 encoded input passed to window.atob polyfill');
  }

  i = 0;
  do {
    b1 = characters.indexOf(base64String.charAt(i++));
    b2 = characters.indexOf(base64String.charAt(i++));
    b3 = characters.indexOf(base64String.charAt(i++));
    b4 = characters.indexOf(base64String.charAt(i++));

    a = (b1 & 0x3F) << 2 | b2 >> 4 & 0x3;
    b = (b2 & 0xF) << 4 | b3 >> 2 & 0xF;
    c = (b3 & 0x3) << 6 | b4 & 0x3F;

    result += String.fromCharCode(a) + (b ? String.fromCharCode(b) : '') + (c ? String.fromCharCode(c) : '');
  } while (i < base64String.length);

  return result;
}

module.exports = {
  atob: atobNormalized,
  _atob: atob
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var BraintreeError = __webpack_require__(3);
var Client = __webpack_require__(107);
var getConfiguration = __webpack_require__(123).getConfiguration;
var VERSION = "3.22.2";
var Promise = __webpack_require__(7);
var wrapPromise = __webpack_require__(4);
var sharedErrors = __webpack_require__(17);

var cachedClients = {};

/** @module braintree-web/client */

/**
 * @function create
 * @description This function is the entry point for the <code>braintree.client</code> module. It is used for creating {@link Client} instances that service communication to Braintree servers.
 * @param {object} options Object containing all {@link Client} options:
 * @param {string} options.authorization A tokenizationKey or clientToken.
 * @param {callback} [callback] The second argument, <code>data</code>, is the {@link Client} instance.
 * @returns {Promise|void} Returns a promise if no callback is provided.
 * @example
 * var createClient = require('braintree-web/client').create;
 *
 * createClient({
 *   authorization: CLIENT_AUTHORIZATION
 * }, function (createErr, clientInstance) {
 *   // ...
 * });
 * @static
 */
function create(options) {
  if (!options.authorization) {
    return Promise.reject(new BraintreeError({
      type: sharedErrors.INSTANTIATION_OPTION_REQUIRED.type,
      code: sharedErrors.INSTANTIATION_OPTION_REQUIRED.code,
      message: 'options.authorization is required when instantiating a client.'
    }));
  }

  if (cachedClients[options.authorization]) {
    return Promise.resolve(cachedClients[options.authorization]);
  }

  return getConfiguration(options).then(function (configuration) {
    var client;

    if (options.debug) {
      configuration.isDebug = true;
    }

    client = new Client(configuration);

    cachedClients[options.authorization] = client;

    return client;
  });
}

// Primarily used for testing the client create call
function clearCache() {
  cachedClients = {};
}

module.exports = {
  create: wrapPromise(create),
  /**
   * @description The current version of the SDK, i.e. `{@pkg version}`.
   * @type {string}
   */
  VERSION: VERSION,
  _clearCache: clearCache
};


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ajaxIsAvaliable;
var once = __webpack_require__(27);
var JSONPDriver = __webpack_require__(108);
var AJAXDriver = __webpack_require__(109);
var getUserAgent = __webpack_require__(115);
var isHTTP = __webpack_require__(116);

function isAjaxAvailable() {
  if (ajaxIsAvaliable == null) {
    ajaxIsAvaliable = !(isHTTP() && /MSIE\s(8|9)/.test(getUserAgent()));
  }

  return ajaxIsAvaliable;
}

module.exports = function (options, cb) {
  cb = once(cb || Function.prototype);
  options.method = (options.method || 'GET').toUpperCase();
  options.timeout = options.timeout == null ? 60000 : options.timeout;
  options.data = options.data || {};

  if (isAjaxAvailable()) {
    AJAXDriver.request(options, cb);
  } else {
    JSONPDriver.request(options, cb);
  }
};


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

function _notEmpty(obj) {
  var key;

  for (key in obj) {
    if (obj.hasOwnProperty(key)) { return true; }
  }

  return false;
}

function _isArray(value) {
  return value && typeof value === 'object' && typeof value.length === 'number' &&
    Object.prototype.toString.call(value) === '[object Array]' || false;
}

function parse(url) {
  var query, params;

  url = url || global.location.href;

  if (!/\?/.test(url)) {
    return {};
  }

  query = url.replace(/#.*$/, '').replace(/^.*\?/, '').split('&');

  params = query.reduce(function (toReturn, keyValue) {
    var parts = keyValue.split('=');
    var key = decodeURIComponent(parts[0]);
    var value = decodeURIComponent(parts[1]);

    toReturn[key] = value;
    return toReturn;
  }, {});

  return params;
}

function stringify(params, namespace) {
  var k, v, p;
  var query = [];

  for (p in params) {
    if (!params.hasOwnProperty(p)) {
      continue;
    }

    v = params[p];

    if (namespace) {
      if (_isArray(params)) {
        k = namespace + '[]';
      } else {
        k = namespace + '[' + p + ']';
      }
    } else {
      k = p;
    }
    if (typeof v === 'object') {
      query.push(stringify(v, k));
    } else {
      query.push(encodeURIComponent(k) + '=' + encodeURIComponent(v));
    }
  }

  return query.join('&');
}

function queryify(url, params) {
  url = url || '';

  if (params != null && typeof params === 'object' && _notEmpty(params)) {
    url += url.indexOf('?') === -1 ? '?' : '';
    url += url.indexOf('=') !== -1 ? '&' : '';
    url += stringify(params);
  }

  return url;
}

module.exports = {
  parse: parse,
  stringify: stringify,
  queryify: queryify
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var assignNormalized = typeof Object.assign === 'function' ? Object.assign : assignPolyfill;

function assignPolyfill(destination) {
  var i, source, key;

  for (i = 1; i < arguments.length; i++) {
    source = arguments[i];
    for (key in source) {
      if (source.hasOwnProperty(key)) {
        destination[key] = source[key];
      }
    }
  }

  return destination;
}

module.exports = {
  assign: assignNormalized,
  _assign: assignPolyfill
};


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var parser;
var legalHosts = {
  'paypal.com': 1,
  'braintreepayments.com': 1,
  'braintreegateway.com': 1,
  'braintree-api.com': 1
};

function stripSubdomains(domain) {
  return domain.split('.').slice(-2).join('.');
}

function isWhitelistedDomain(url) {
  var mainDomain;

  url = url.toLowerCase();

  if (!/^https:/.test(url)) {
    return false;
  }

  parser = parser || document.createElement('a');
  parser.href = url;
  mainDomain = stripSubdomains(parser.hostname);

  return legalHosts.hasOwnProperty(mainDomain);
}

module.exports = isWhitelistedDomain;


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var BraintreeError = __webpack_require__(3);

function convertToBraintreeError(originalErr, btErrorObject) {
  if (originalErr instanceof BraintreeError) {
    return originalErr;
  }

  return new BraintreeError({
    type: btErrorObject.type,
    code: btErrorObject.code,
    message: btErrorObject.message,
    details: {
      originalError: originalErr
    }
  });
}

module.exports = convertToBraintreeError;


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createAuthorizationData = __webpack_require__(53);
var jsonClone = __webpack_require__(118);
var constants = __webpack_require__(16);

function addMetadata(configuration, data) {
  var key;
  var attrs = data ? jsonClone(data) : {};
  var authAttrs = createAuthorizationData(configuration.authorization).attrs;
  var _meta = jsonClone(configuration.analyticsMetadata);

  attrs.braintreeLibraryVersion = constants.BRAINTREE_LIBRARY_VERSION;

  for (key in attrs._meta) {
    if (attrs._meta.hasOwnProperty(key)) {
      _meta[key] = attrs._meta[key];
    }
  }

  attrs._meta = _meta;

  if (authAttrs.tokenizationKey) {
    attrs.tokenizationKey = authAttrs.tokenizationKey;
  } else {
    attrs.authorizationFingerprint = authAttrs.authorizationFingerprint;
  }

  return attrs;
}

module.exports = addMetadata;


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var atob = __webpack_require__(117).atob;

var apiUrls = {
  production: 'https://api.braintreegateway.com:443',
  sandbox: 'https://api.sandbox.braintreegateway.com:443'
};

function _isTokenizationKey(str) {
  return /^[a-zA-Z0-9]+_[a-zA-Z0-9]+_[a-zA-Z0-9_]+$/.test(str);
}

function _parseTokenizationKey(tokenizationKey) {
  var tokens = tokenizationKey.split('_');
  var environment = tokens[0];
  var merchantId = tokens.slice(2).join('_');

  return {
    merchantId: merchantId,
    environment: environment
  };
}

function createAuthorizationData(authorization) {
  var parsedClientToken, parsedTokenizationKey;
  var data = {
    attrs: {},
    configUrl: ''
  };

  if (_isTokenizationKey(authorization)) {
    parsedTokenizationKey = _parseTokenizationKey(authorization);
    data.attrs.tokenizationKey = authorization;
    data.configUrl = apiUrls[parsedTokenizationKey.environment] + '/merchants/' + parsedTokenizationKey.merchantId + '/client_api/v1/configuration';
  } else {
    parsedClientToken = JSON.parse(atob(authorization));
    data.attrs.authorizationFingerprint = parsedClientToken.authorizationFingerprint;
    data.configUrl = parsedClientToken.configUrl;
  }

  return data;
}

module.exports = createAuthorizationData;


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(setImmediate) {(function (root) {

  // Store setTimeout reference so promise-polyfill will be unaffected by
  // other code modifying setTimeout (like sinon.useFakeTimers())
  var setTimeoutFunc = setTimeout;

  function noop() {}
  
  // Polyfill for Function.prototype.bind
  function bind(fn, thisArg) {
    return function () {
      fn.apply(thisArg, arguments);
    };
  }

  function Promise(fn) {
    if (typeof this !== 'object') throw new TypeError('Promises must be constructed via new');
    if (typeof fn !== 'function') throw new TypeError('not a function');
    this._state = 0;
    this._handled = false;
    this._value = undefined;
    this._deferreds = [];

    doResolve(fn, this);
  }

  function handle(self, deferred) {
    while (self._state === 3) {
      self = self._value;
    }
    if (self._state === 0) {
      self._deferreds.push(deferred);
      return;
    }
    self._handled = true;
    Promise._immediateFn(function () {
      var cb = self._state === 1 ? deferred.onFulfilled : deferred.onRejected;
      if (cb === null) {
        (self._state === 1 ? resolve : reject)(deferred.promise, self._value);
        return;
      }
      var ret;
      try {
        ret = cb(self._value);
      } catch (e) {
        reject(deferred.promise, e);
        return;
      }
      resolve(deferred.promise, ret);
    });
  }

  function resolve(self, newValue) {
    try {
      // Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
      if (newValue === self) throw new TypeError('A promise cannot be resolved with itself.');
      if (newValue && (typeof newValue === 'object' || typeof newValue === 'function')) {
        var then = newValue.then;
        if (newValue instanceof Promise) {
          self._state = 3;
          self._value = newValue;
          finale(self);
          return;
        } else if (typeof then === 'function') {
          doResolve(bind(then, newValue), self);
          return;
        }
      }
      self._state = 1;
      self._value = newValue;
      finale(self);
    } catch (e) {
      reject(self, e);
    }
  }

  function reject(self, newValue) {
    self._state = 2;
    self._value = newValue;
    finale(self);
  }

  function finale(self) {
    if (self._state === 2 && self._deferreds.length === 0) {
      Promise._immediateFn(function() {
        if (!self._handled) {
          Promise._unhandledRejectionFn(self._value);
        }
      });
    }

    for (var i = 0, len = self._deferreds.length; i < len; i++) {
      handle(self, self._deferreds[i]);
    }
    self._deferreds = null;
  }

  function Handler(onFulfilled, onRejected, promise) {
    this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
    this.onRejected = typeof onRejected === 'function' ? onRejected : null;
    this.promise = promise;
  }

  /**
   * Take a potentially misbehaving resolver function and make sure
   * onFulfilled and onRejected are only called once.
   *
   * Makes no guarantees about asynchrony.
   */
  function doResolve(fn, self) {
    var done = false;
    try {
      fn(function (value) {
        if (done) return;
        done = true;
        resolve(self, value);
      }, function (reason) {
        if (done) return;
        done = true;
        reject(self, reason);
      });
    } catch (ex) {
      if (done) return;
      done = true;
      reject(self, ex);
    }
  }

  Promise.prototype['catch'] = function (onRejected) {
    return this.then(null, onRejected);
  };

  Promise.prototype.then = function (onFulfilled, onRejected) {
    var prom = new (this.constructor)(noop);

    handle(this, new Handler(onFulfilled, onRejected, prom));
    return prom;
  };

  Promise.all = function (arr) {
    var args = Array.prototype.slice.call(arr);

    return new Promise(function (resolve, reject) {
      if (args.length === 0) return resolve([]);
      var remaining = args.length;

      function res(i, val) {
        try {
          if (val && (typeof val === 'object' || typeof val === 'function')) {
            var then = val.then;
            if (typeof then === 'function') {
              then.call(val, function (val) {
                res(i, val);
              }, reject);
              return;
            }
          }
          args[i] = val;
          if (--remaining === 0) {
            resolve(args);
          }
        } catch (ex) {
          reject(ex);
        }
      }

      for (var i = 0; i < args.length; i++) {
        res(i, args[i]);
      }
    });
  };

  Promise.resolve = function (value) {
    if (value && typeof value === 'object' && value.constructor === Promise) {
      return value;
    }

    return new Promise(function (resolve) {
      resolve(value);
    });
  };

  Promise.reject = function (value) {
    return new Promise(function (resolve, reject) {
      reject(value);
    });
  };

  Promise.race = function (values) {
    return new Promise(function (resolve, reject) {
      for (var i = 0, len = values.length; i < len; i++) {
        values[i].then(resolve, reject);
      }
    });
  };

  // Use polyfill for setImmediate for performance gains
  Promise._immediateFn = (typeof setImmediate === 'function' && function (fn) { setImmediate(fn); }) ||
    function (fn) {
      setTimeoutFunc(fn, 0);
    };

  Promise._unhandledRejectionFn = function _unhandledRejectionFn(err) {
    if (typeof console !== 'undefined' && console) {
      console.warn('Possible Unhandled Promise Rejection:', err); // eslint-disable-line no-console
    }
  };

  /**
   * Set the immediate function to execute callbacks
   * @param fn {function} Function to execute
   * @deprecated
   */
  Promise._setImmediateFn = function _setImmediateFn(fn) {
    Promise._immediateFn = fn;
  };

  /**
   * Change the function to execute on unhandled rejection
   * @param {function} fn Function to execute on unhandled rejection
   * @deprecated
   */
  Promise._setUnhandledRejectionFn = function _setUnhandledRejectionFn(fn) {
    Promise._unhandledRejectionFn = fn;
  };
  
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = Promise;
  } else if (!root.Promise) {
    root.Promise = Promise;
  }

})(this);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(119).setImmediate))

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var BraintreeError = __webpack_require__(3);

module.exports = {
  CLIENT_GATEWAY_CONFIGURATION_INVALID_DOMAIN: {
    type: BraintreeError.types.MERCHANT,
    code: 'CLIENT_GATEWAY_CONFIGURATION_INVALID_DOMAIN'
  },
  CLIENT_OPTION_REQUIRED: {
    type: BraintreeError.types.MERCHANT,
    code: 'CLIENT_OPTION_REQUIRED'
  },
  CLIENT_OPTION_INVALID: {
    type: BraintreeError.types.MERCHANT,
    code: 'CLIENT_OPTION_INVALID'
  },
  CLIENT_MISSING_GATEWAY_CONFIGURATION: {
    type: BraintreeError.types.INTERNAL,
    code: 'CLIENT_MISSING_GATEWAY_CONFIGURATION',
    message: 'Missing gatewayConfiguration.'
  },
  CLIENT_INVALID_AUTHORIZATION: {
    type: BraintreeError.types.MERCHANT,
    code: 'CLIENT_INVALID_AUTHORIZATION',
    message: 'Authorization is invalid. Make sure your client token or tokenization key is valid.'
  },
  CLIENT_GATEWAY_NETWORK: {
    type: BraintreeError.types.NETWORK,
    code: 'CLIENT_GATEWAY_NETWORK',
    message: 'Cannot contact the gateway at this time.'
  },
  CLIENT_REQUEST_TIMEOUT: {
    type: BraintreeError.types.NETWORK,
    code: 'CLIENT_REQUEST_TIMEOUT',
    message: 'Request timed out waiting for a reply.'
  },
  CLIENT_REQUEST_ERROR: {
    type: BraintreeError.types.NETWORK,
    code: 'CLIENT_REQUEST_ERROR',
    message: 'There was a problem with your request.'
  },
  CLIENT_RATE_LIMITED: {
    type: BraintreeError.types.MERCHANT,
    code: 'CLIENT_RATE_LIMITED',
    message: 'You are being rate-limited; please try again in a few minutes.'
  },
  CLIENT_AUTHORIZATION_INSUFFICIENT: {
    type: BraintreeError.types.MERCHANT,
    code: 'CLIENT_AUTHORIZATION_INSUFFICIENT',
    message: 'The authorization used has insufficient privileges.'
  }
};


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function EventEmitter() {
  this._events = {};
}

EventEmitter.prototype.on = function (event, callback) {
  if (this._events[event]) {
    this._events[event].push(callback);
  } else {
    this._events[event] = [callback];
  }
};

EventEmitter.prototype._emit = function (event) {
  var i, args;
  var callbacks = this._events[event];

  if (!callbacks) { return; }

  args = Array.prototype.slice.call(arguments, 1);

  for (i = 0; i < callbacks.length; i++) {
    callbacks[i].apply(null, args);
  }
};

module.exports = EventEmitter;


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var atob = __webpack_require__(45).atob;

module.exports = function (client) {
  var authorizationFingerprint;
  var configuration = client.getConfiguration();

  if (configuration.authorizationType !== 'TOKENIZATION_KEY') {
    authorizationFingerprint = JSON.parse(atob(configuration.authorization)).authorizationFingerprint;
    return !authorizationFingerprint || authorizationFingerprint.indexOf('customer_id=') === -1;
  }
  return true;
};


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var browserDetection = __webpack_require__(161);

function isHidden(element) {
  if (!element) { // no parentNode, so nothing containing the element is hidden
    return false;
  }

  if (element.style.display === 'none') {
    return true;
  }

  return isHidden(element.parentNode);
}

function onTransitionEnd(element, propertyName, callback) {
  if (browserDetection.isIe9() || isHidden(element)) {
    callback();
    return;
  }

  function transitionEventListener(event) {
    if (event.propertyName === propertyName) {
      element.removeEventListener('transitionend', transitionEventListener);
      callback();
    }
  }

  element.addEventListener('transitionend', transitionEventListener);
}

module.exports = {
  onTransitionEnd: onTransitionEnd
};


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var assign = __webpack_require__(19).assign;
var BaseView = __webpack_require__(11);
var btPaypal = __webpack_require__(163);
var DropinError = __webpack_require__(5);

var ASYNC_DEPENDENCY_TIMEOUT = 30000;
var READ_ONLY_CONFIGURATION_OPTIONS = ['offerCredit', 'locale'];

function BasePayPalView() {
  BaseView.apply(this, arguments);
}

BasePayPalView.prototype = Object.create(BaseView.prototype);

BasePayPalView.prototype.initialize = function () {
  var asyncDependencyTimeoutHandler;
  var isCredit = Boolean(this._isPayPalCredit);
  var setupComplete = false;
  var self = this;
  var paypalType = isCredit ? 'paypalCredit' : 'paypal';
  var paypalConfiguration = this.model.merchantConfiguration[paypalType];

  this.paypalConfiguration = assign({}, paypalConfiguration);

  this.model.asyncDependencyStarting();
  asyncDependencyTimeoutHandler = setTimeout(function () {
    self.model.asyncDependencyFailed({
      view: self.ID,
      error: new DropinError('There was an error connecting to PayPal.')
    });
  }, ASYNC_DEPENDENCY_TIMEOUT);

  return btPaypal.create({client: this.client}).then(function (paypalInstance) {
    var checkoutJSConfiguration;
    var buttonSelector = '[data-braintree-id="paypal-button"]';
    var environment = self.client.getConfiguration().gatewayConfiguration.environment === 'production' ? 'production' : 'sandbox';
    var locale = self.model.merchantConfiguration.locale;

    self.paypalInstance = paypalInstance;

    self.paypalConfiguration.offerCredit = Boolean(isCredit);
    checkoutJSConfiguration = {
      env: environment,
      style: self.paypalConfiguration.buttonStyle || {},
      locale: locale,
      payment: function () {
        return paypalInstance.createPayment(self.paypalConfiguration).catch(reportError);
      },
      onAuthorize: function (data) {
        return paypalInstance.tokenizePayment(data).then(function (tokenizePayload) {
          if (self.paypalConfiguration.flow === 'vault' && !self.model.isGuestCheckout) {
            tokenizePayload.vaulted = true;
          }
          self.model.addPaymentMethod(tokenizePayload);
        }).catch(reportError);
      },
      onError: reportError
    };

    if (locale) {
      self.paypalConfiguration.locale = locale;
    }

    if (isCredit) {
      buttonSelector = '[data-braintree-id="paypal-credit-button"]';
      checkoutJSConfiguration.style.label = 'credit';
    }

    return global.paypal.Button.render(checkoutJSConfiguration, buttonSelector).then(function () {
      self.model.asyncDependencyReady();
      setupComplete = true;
      clearTimeout(asyncDependencyTimeoutHandler);
    });
  }).catch(reportError);

  function reportError(err) {
    if (setupComplete) {
      self.model.reportError(err);
    } else {
      self.model.asyncDependencyFailed({
        view: self.ID,
        error: err
      });
      clearTimeout(asyncDependencyTimeoutHandler);
    }
  }
};

BasePayPalView.prototype.updateConfiguration = function (key, value) {
  if (READ_ONLY_CONFIGURATION_OPTIONS.indexOf(key) === -1) {
    this.paypalConfiguration[key] = value;
  }
};

module.exports = BasePayPalView;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var BraintreeError = __webpack_require__(3);

module.exports = {
  PAYPAL_NOT_ENABLED: {
    type: BraintreeError.types.MERCHANT,
    code: 'PAYPAL_NOT_ENABLED',
    message: 'PayPal is not enabled for this merchant.'
  },
  PAYPAL_SANDBOX_ACCOUNT_NOT_LINKED: {
    type: BraintreeError.types.MERCHANT,
    code: 'PAYPAL_SANDBOX_ACCOUNT_NOT_LINKED',
    message: 'A linked PayPal Sandbox account is required to use PayPal Checkout in Sandbox. See https://developers.braintreepayments.com/guides/paypal/testing-go-live/#linked-paypal-testing for details on linking your PayPal sandbox with Braintree.'
  },
  PAYPAL_TOKENIZATION_REQUEST_ACTIVE: {
    type: BraintreeError.types.MERCHANT,
    code: 'PAYPAL_TOKENIZATION_REQUEST_ACTIVE',
    message: 'Another tokenization request is active.'
  },
  PAYPAL_ACCOUNT_TOKENIZATION_FAILED: {
    type: BraintreeError.types.NETWORK,
    code: 'PAYPAL_ACCOUNT_TOKENIZATION_FAILED',
    message: 'Could not tokenize user\'s PayPal account.'
  },
  PAYPAL_FLOW_FAILED: {
    type: BraintreeError.types.NETWORK,
    code: 'PAYPAL_FLOW_FAILED',
    message: 'Could not initialize PayPal flow.'
  },
  PAYPAL_FLOW_OPTION_REQUIRED: {
    type: BraintreeError.types.MERCHANT,
    code: 'PAYPAL_FLOW_OPTION_REQUIRED',
    message: 'PayPal flow property is invalid or missing.'
  },
  PAYPAL_POPUP_OPEN_FAILED: {
    type: BraintreeError.types.MERCHANT,
    code: 'PAYPAL_POPUP_OPEN_FAILED',
    message: 'PayPal popup failed to open, make sure to tokenize in response to a user action.'
  },
  PAYPAL_POPUP_CLOSED: {
    type: BraintreeError.types.CUSTOMER,
    code: 'PAYPAL_POPUP_CLOSED',
    message: 'Customer closed PayPal popup before authorizing.'
  },
  PAYPAL_INVALID_PAYMENT_OPTION: {
    type: BraintreeError.types.MERCHANT,
    code: 'PAYPAL_INVALID_PAYMENT_OPTION',
    message: 'PayPal payment options are invalid.'
  }
};


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var BaseView = __webpack_require__(11);
var PaymentMethodView = __webpack_require__(167);
var DropinError = __webpack_require__(5);
var classlist = __webpack_require__(20);
var errors = __webpack_require__(2).errors;
var Promise = __webpack_require__(12);

var PAYMENT_METHOD_TYPE_TO_TRANSLATION_STRING = {
  CreditCard: 'Card',
  PayPalAccount: 'PayPal'
};

function PaymentMethodsView() {
  BaseView.apply(this, arguments);

  this._initialize();
}

PaymentMethodsView.prototype = Object.create(BaseView.prototype);
PaymentMethodsView.prototype.constructor = PaymentMethodsView;
PaymentMethodsView.ID = PaymentMethodsView.prototype.ID = 'methods';

PaymentMethodsView.prototype._initialize = function () {
  var i;
  var paymentMethods = this.model.getPaymentMethods();

  this.views = [];
  this.container = this.getElementById('methods-container');
  this._headingLabel = this.getElementById('methods-label');

  this.model.on('addPaymentMethod', this._addPaymentMethod.bind(this));
  this.model.on('removePaymentMethod', this._removePaymentMethod.bind(this));
  this.model.on('changeActivePaymentMethod', this._changeActivePaymentMethodView.bind(this));

  for (i = paymentMethods.length - 1; i >= 0; i--) {
    this._addPaymentMethod(paymentMethods[i]);
  }
};

PaymentMethodsView.prototype.removeActivePaymentMethod = function () {
  if (!this.activeMethodView) {
    return;
  }
  this.activeMethodView.setActive(false);
  this.activeMethodView = null;
  classlist.add(this._headingLabel, 'braintree-no-payment-method-selected');
};

PaymentMethodsView.prototype._getPaymentMethodString = function () {
  var stringKey = PAYMENT_METHOD_TYPE_TO_TRANSLATION_STRING[this.activeMethodView.paymentMethod.type];
  var paymentMethodTypeString = this.strings[stringKey];

  return this.strings.payingWith.replace('{{paymentSource}}', paymentMethodTypeString);
};

PaymentMethodsView.prototype._addPaymentMethod = function (paymentMethod) {
  var paymentMethodView = new PaymentMethodView({
    model: this.model,
    paymentMethod: paymentMethod,
    strings: this.strings
  });

  if (this.model.isGuestCheckout && this.container.firstChild) {
    this.container.removeChild(this.container.firstChild);
    this.views.pop();
  }

  if (this.container.firstChild) {
    this.container.insertBefore(paymentMethodView.element, this.container.firstChild);
  } else {
    this.container.appendChild(paymentMethodView.element);
  }

  this.views.push(paymentMethodView);
};

PaymentMethodsView.prototype._removePaymentMethod = function (paymentMethod) {
  var i;

  for (i = 0; i < this.views.length; i++) {
    if (this.views[i].paymentMethod === paymentMethod) {
      this.container.removeChild(this.views[i].element);
      this._headingLabel.innerHTML = '&nbsp;';
      this.views.splice(i, 1);
      break;
    }
  }
};

PaymentMethodsView.prototype._changeActivePaymentMethodView = function (paymentMethod) {
  var i;
  var previousActiveMethodView = this.activeMethodView;

  for (i = 0; i < this.views.length; i++) {
    if (this.views[i].paymentMethod === paymentMethod) {
      this.activeMethodView = this.views[i];
      this._headingLabel.textContent = this._getPaymentMethodString();
      break;
    }
  }

  if (previousActiveMethodView) {
    previousActiveMethodView.setActive(false);
  }
  this.activeMethodView.setActive(true);
  classlist.remove(this._headingLabel, 'braintree-no-payment-method-selected');
};

PaymentMethodsView.prototype.requestPaymentMethod = function () {
  if (!this.activeMethodView) {
    return Promise.reject(new DropinError(errors.NO_PAYMENT_METHOD_ERROR));
  }
  return Promise.resolve(this.activeMethodView.paymentMethod);
};

module.exports = PaymentMethodsView;


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var analytics = __webpack_require__(15);
var addSelectionEventHandler = __webpack_require__(34);
var BaseView = __webpack_require__(11);

var paymentOptionIDs = __webpack_require__(2).paymentOptionIDs;

var paymentMethodOptionHTML = "<div class=\"braintree-option__logo\">\n  <svg width=\"48\" height=\"29\" class=\"@CLASSNAME\">\n    <use xlink:href=\"#@ICON\"></use>\n  </svg>\n</div>\n\n<div class=\"braintree-option__label\" aria-label=\"@OPTION_LABEL\">\n  @OPTION_TITLE\n  <div class=\"braintree-option__disabled-message\"></div>\n</div>\n";

function PaymentOptionsView() {
  BaseView.apply(this, arguments);

  this._initialize();
}

PaymentOptionsView.prototype = Object.create(BaseView.prototype);
PaymentOptionsView.prototype.constructor = PaymentOptionsView;
PaymentOptionsView.ID = PaymentOptionsView.prototype.ID = 'options';

PaymentOptionsView.prototype._initialize = function () {
  this.container = this.getElementById('payment-options-container');
  this.elements = {};

  this.model.supportedPaymentOptions.forEach(function (paymentOptionID) {
    this._addPaymentOption(paymentOptionID);
  }.bind(this));
};

PaymentOptionsView.prototype._addPaymentOption = function (paymentOptionID) {
  var paymentSource;
  var div = document.createElement('div');
  var html = paymentMethodOptionHTML;
  var clickHandler = function clickHandler() {
    this.mainView.setPrimaryView(paymentOptionID);
    this.model.selectPaymentOption(paymentOptionID);
    analytics.sendEvent(this.client, 'selected.' + paymentOptionIDs[paymentOptionID]);
  }.bind(this);

  div.className = 'braintree-option braintree-option__' + paymentOptionID;
  div.setAttribute('tabindex', '0');

  switch (paymentOptionID) {
    case paymentOptionIDs.card:
      paymentSource = this.strings.Card;
      html = html.replace(/@ICON/g, 'iconCardFront');
      html = html.replace(/@OPTION_LABEL/g, this._generateOptionLabel(paymentSource));
      html = html.replace(/@OPTION_TITLE/g, paymentSource);
      html = html.replace(/@CLASSNAME/g, 'braintree-icon--bordered');
      break;
    case paymentOptionIDs.paypal:
      paymentSource = this.strings.PayPal;
      html = html.replace(/@ICON/g, 'logoPayPal');
      html = html.replace(/@OPTION_LABEL/g, this._generateOptionLabel(this.strings.PayPal));
      html = html.replace(/@OPTION_TITLE/g, this.strings.PayPal);
      html = html.replace(/@CLASSNAME/g, '');
      break;
    case paymentOptionIDs.paypalCredit:
      paymentSource = this.strings['PayPal Credit'];
      html = html.replace(/@ICON/g, 'logoPayPalCredit');
      html = html.replace(/@OPTION_LABEL/g, this._generateOptionLabel(paymentSource));
      html = html.replace(/@OPTION_TITLE/g, paymentSource);
      html = html.replace(/@CLASSNAME/g, '');
      break;
    default:
      break;
  }

  div.innerHTML = html;

  addSelectionEventHandler(div, clickHandler);

  this.container.appendChild(div);
  this.elements[paymentOptionID] = {
    div: div,
    clickHandler: clickHandler
  };
};

PaymentOptionsView.prototype._generateOptionLabel = function (paymentSourceString) {
  return this.strings.payingWith.replace('{{paymentSource}}', paymentSourceString);
};

module.exports = PaymentOptionsView;


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0;
    var v = c === 'x' ? r : r & 0x3 | 0x8;

    return v.toString(16);
  });
}

module.exports = uuid;


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.processStyleName = undefined;
exports.createMarkupForStyles = createMarkupForStyles;

var _camelizeStyleName = __webpack_require__(199);

var _camelizeStyleName2 = _interopRequireDefault(_camelizeStyleName);

var _dangerousStyleValue = __webpack_require__(201);

var _dangerousStyleValue2 = _interopRequireDefault(_dangerousStyleValue);

var _hyphenateStyleName = __webpack_require__(203);

var _hyphenateStyleName2 = _interopRequireDefault(_hyphenateStyleName);

var _memoizeStringOnly = __webpack_require__(205);

var _memoizeStringOnly2 = _interopRequireDefault(_memoizeStringOnly);

var _warning = __webpack_require__(6);

var _warning2 = _interopRequireDefault(_warning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var processStyleName = exports.processStyleName = (0, _memoizeStringOnly2.default)(_hyphenateStyleName2.default); /**
                                                                                                                   * Copyright 2013-present, Facebook, Inc.
                                                                                                                   * All rights reserved.
                                                                                                                   *
                                                                                                                   * This source code is licensed under the BSD-style license found in the
                                                                                                                   * LICENSE file in the root directory of this source tree. An additional grant
                                                                                                                   * of patent rights can be found in the PATENTS file in the same directory.
                                                                                                                   *
                                                                                                                   * @providesModule CSSPropertyOperations
                                                                                                                   */

if (process.env.NODE_ENV !== 'production') {
  // 'msTransform' is correct, but the other prefixes should be capitalized
  var badVendoredStyleNamePattern = /^(?:webkit|moz|o)[A-Z]/;

  // style values shouldn't contain a semicolon
  var badStyleValueWithSemicolonPattern = /;\s*$/;

  var warnedStyleNames = {};
  var warnedStyleValues = {};
  var warnedForNaNValue = false;

  var warnHyphenatedStyleName = function warnHyphenatedStyleName(name, owner) {
    if (warnedStyleNames.hasOwnProperty(name) && warnedStyleNames[name]) {
      return;
    }

    warnedStyleNames[name] = true;
    process.env.NODE_ENV !== 'production' ? (0, _warning2.default)(false, 'Unsupported style property %s. Did you mean %s?%s', name, (0, _camelizeStyleName2.default)(name), checkRenderMessage(owner)) : void 0;
  };

  var warnBadVendoredStyleName = function warnBadVendoredStyleName(name, owner) {
    if (warnedStyleNames.hasOwnProperty(name) && warnedStyleNames[name]) {
      return;
    }

    warnedStyleNames[name] = true;
    process.env.NODE_ENV !== 'production' ? (0, _warning2.default)(false, 'Unsupported vendor-prefixed style property %s. Did you mean %s?%s', name, name.charAt(0).toUpperCase() + name.slice(1), checkRenderMessage(owner)) : void 0;
  };

  var warnStyleValueWithSemicolon = function warnStyleValueWithSemicolon(name, value, owner) {
    if (warnedStyleValues.hasOwnProperty(value) && warnedStyleValues[value]) {
      return;
    }

    warnedStyleValues[value] = true;
    process.env.NODE_ENV !== 'production' ? (0, _warning2.default)(false, 'Style property values shouldn\'t contain a semicolon.%s ' + 'Try "%s: %s" instead.', checkRenderMessage(owner), name, value.replace(badStyleValueWithSemicolonPattern, '')) : void 0;
  };

  var warnStyleValueIsNaN = function warnStyleValueIsNaN(name, value, owner) {
    if (warnedForNaNValue) {
      return;
    }

    warnedForNaNValue = true;
    process.env.NODE_ENV !== 'production' ? (0, _warning2.default)(false, '`NaN` is an invalid value for the `%s` css style property.%s', name, checkRenderMessage(owner)) : void 0;
  };

  var checkRenderMessage = function checkRenderMessage(owner) {
    if (owner) {
      var name = owner.getName();
      if (name) {
        return ' Check the render method of `' + name + '`.';
      }
    }
    return '';
  };

  /**
   * @param {string} name
   * @param {*} value
   * @param {ReactDOMComponent} component
   */
  var warnValidStyle = function warnValidStyle(name, value, component) {
    //eslint-disable-line no-var
    var owner = void 0;
    if (component) {
      owner = component._currentElement._owner;
    }
    if (name.indexOf('-') > -1) {
      warnHyphenatedStyleName(name, owner);
    } else if (badVendoredStyleNamePattern.test(name)) {
      warnBadVendoredStyleName(name, owner);
    } else if (badStyleValueWithSemicolonPattern.test(value)) {
      warnStyleValueWithSemicolon(name, value, owner);
    }

    if (typeof value === 'number' && isNaN(value)) {
      warnStyleValueIsNaN(name, value, owner);
    }
  };
}

/**
   * Serializes a mapping of style properties for use as inline styles:
   *
   *   > createMarkupForStyles({width: '200px', height: 0})
   *   "width:200px;height:0;"
   *
   * Undefined values are ignored so that declarative programming is easier.
   * The result should be HTML-escaped before insertion into the DOM.
   *
   * @param {object} styles
   * @param {ReactDOMComponent} component
   * @return {?string}
   */

function createMarkupForStyles(styles, component) {
  var serialized = '';
  for (var styleName in styles) {
    var isCustomProp = styleName.indexOf('--') === 0;
    if (!styles.hasOwnProperty(styleName)) {
      continue;
    }
    if (styleName === 'label') {
      continue;
    }
    var styleValue = styles[styleName];
    if (process.env.NODE_ENV !== 'production' && !isCustomProp) {
      warnValidStyle(styleName, styleValue, component);
    }
    if (styleValue != null) {
      if (isCustomProp) {
        serialized += styleName + ':' + styleValue + ';';
      } else {
        serialized += processStyleName(styleName) + ':';
        serialized += (0, _dangerousStyleValue2.default)(styleName, styleValue, component) + ';';
      }
    }
  }
  return serialized || null;
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = capitalizeString;
function capitalizeString(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
module.exports = exports["default"];

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = __webpack_require__(67);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(68);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _renderIf = __webpack_require__(103);

var _renderIf2 = _interopRequireDefault(_renderIf);

var _reactActivity = __webpack_require__(104);

var _braintreeWebDropIn = __webpack_require__(105);

var _braintreeWebDropIn2 = _interopRequireDefault(_braintreeWebDropIn);

var _glamorous = __webpack_require__(196);

var _glamorous2 = _interopRequireDefault(_glamorous);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // download and use react an react-dom from local directory
// to avoid conflicts with Expo version of react


var Button = _glamorous2.default.span({
  borderRadius: "2px",
  padding: "2px 10px 2px 10px",
  backgroundColor: "#2ecc71",
  fontSize: "1.25em",
  color: "white",
  fontFamily: "arial",
  boxShadow: "0 1px 4px rgba(0, 0, 0, .6)"
});
var PaymentBackground = _glamorous2.default.div({
  backgroundColor: "#FED2F1",
  position: "absolute",
  top: 0,
  bottom: 0,
  left: 0,
  right: 0
});

// from user Dryymoon at this Github thread
// : https://github.com/facebook/react-native/issues/11594
// fixes issue that caused postMessage to not reach WebView
function awaitPostMessage() {
  var isReactNativePostMessageReady = !!window.originalPostMessage;
  var queue = [];
  var currentPostMessageFn = function store(message) {
    if (queue.length > 100) queue.shift();
    queue.push(message);
  };
  if (!isReactNativePostMessageReady) {
    // const originalPostMessage = window.postMessage;
    Object.defineProperty(window, "postMessage", {
      configurable: true,
      enumerable: true,
      get: function get() {
        return currentPostMessageFn;
      },
      set: function set(fn) {
        currentPostMessageFn = fn;
        isReactNativePostMessageReady = true;
        setTimeout(sendQueue, 0);
      }
    });
  }

  function sendQueue() {
    while (queue.length > 0) {
      window.postMessage(queue.shift());
    }
  }
}

// print something in an html element
var PrintElement = function PrintElement(data) {
  var el = document.createElement("pre");
  var str = JSON.stringify(data);
  el.innerHTML = str;
  document.getElementById("messages").appendChild(el);
};

var BraintreeHTML = function (_React$Component) {
  _inherits(BraintreeHTML, _React$Component);

  function BraintreeHTML() {
    _classCallCheck(this, BraintreeHTML);

    var _this = _possibleConstructorReturn(this, (BraintreeHTML.__proto__ || Object.getPrototypeOf(BraintreeHTML)).call(this));

    _this.componentWillMount = function () {
      awaitPostMessage();
      _this.addEventListeners();
    };

    _this.componentWillUnmount = function () {
      window.removeEventListener("message", _this.handleMessage);
      document.removeEventListener("message", _this.handleMessage);
    };

    _this.componentDidMount = function () {
      try {
        window.postMessage("componentDidMount", "*");
        PrintElement("componentDidMount success");
      } catch (error) {
        PrintElement(error);
      }
    };

    _this.addEventListeners = function () {
      // add an event listener to receive messages from parent WebView
      if (document) {
        document.addEventListener("message", _this.handleMessage);
      }
      if (window) {
        window.addEventListener("message", _this.handleMessage);
      }
    };

    _this.handleMessage = function (event) {
      // debugger;
      // console.log("Received post message", event);
      var data = JSON.parse(event.data);
      PrintElement(data);
      switch (data.name) {
        case "CLIENT_TOKEN_RECEIVED":
          PrintElement(data.payload);
          _this.getBraintreeUIElement(data.payload);
          break;
        default:
          PrintElement("Unhandled case in handleMessage");
          break;
      }
    };

    _this.getBraintreeUIElement = function (clientToken) {
      PrintElement(clientToken);
      var that = _this;

      // create the Braintree UI in the div
      _braintreeWebDropIn2.default.create({
        authorization: clientToken,
        container: "#dropin-container"
      }).then(function (instance) {
        window.postMessage(JSON.stringify({
          type: "event",
          name: "REQUEST_UI_FULFILLED"
        }), "*");
        document.getElementById("submit-button").addEventListener("click", handleSubmitPurchaseButtonClicked.bind(instance));
      }).catch(function (err) {
        // Handle any errors that might've occurred when creating Drop-in
        this.props.dispatch(window.postMessage(JSON.stringify({
          type: "event",
          name: "REQUEST_UI_REJECTED",
          payload: err
        }), "*"));
      });
    };

    _this.handleSubmitPurchaseButtonClicked = function (instance) {
      PrintElement({
        msg: "submitPurchase clicked",
        instance: instance
      });

      // send a message to the parent WebView so that it
      // can display feedback to user
      _this.props.dispatch(window.postMessage(JSON.stringify({
        type: "event",
        name: "PURCHASE_SUBMITED",
        payload: payload
      }), "*"));

      // request a purchase nonce from the Braintree server
      instance.requestPaymentMethod(function (err, payload) {
        if (err) {
          // notify the parent WebView if there is an error
          this.props.dispatch(window.postMessage(JSON.stringify({
            type: "event",
            name: "PURCHASE_REJECTED",
            payload: err
          }), "*"));
        } else {
          // pass the nonce to the parent WebView if the purchase is successful
          this.props.dispatch(window.postMessage(JSON.stringify({
            type: "event",
            name: "PURCHASE_FULFILLED",
            payload: payload
          }), "*"));
        }
      });
    };

    _this.render = function () {
      return _react2.default.createElement(
        PaymentBackground,
        {
          ref: function ref(component) {
            _this.webComponent = component;
          }
        },
        _react2.default.createElement("div", { id: "dropin-container" }),
        _react2.default.createElement(
          "div",
          null,
          "HTML component"
        ),
        _react2.default.createElement(
          Button,
          { id: "submit-button", onClick: _this.submitPurchase },
          "Submit Purchase"
        ),
        _react2.default.createElement("div", { id: "messages" })
      );
    };

    _this.state = {
      currentPaymentStatus: null
    };
    return _this;
  }

  // create the Braintree UI element


  // hnadler for when the purchase button is clicke


  return BraintreeHTML;
}(_react2.default.Component);

_reactDom2.default.render(_react2.default.createElement(BraintreeHTML, null), document.getElementById("root"));

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var require;var require;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * React v15.6.1
 *
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */
!function (t) {
  if ("object" == ( false ? "undefined" : _typeof(exports)) && "undefined" != typeof module) module.exports = t();else if (true) !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (t),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));else {
    var e;e = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this, e.React = t();
  }
}(function () {
  return function t(e, n, r) {
    function o(a, u) {
      if (!n[a]) {
        if (!e[a]) {
          var s = "function" == typeof require && require;if (!u && s) return require(a, !0);if (i) return i(a, !0);var c = new Error("Cannot find module '" + a + "'");throw c.code = "MODULE_NOT_FOUND", c;
        }var l = n[a] = { exports: {} };e[a][0].call(l.exports, function (t) {
          var n = e[a][1][t];return o(n || t);
        }, l, l.exports, t, e, n, r);
      }return n[a].exports;
    }for (var i = "function" == typeof require && require, a = 0; a < r.length; a++) {
      o(r[a]);
    }return o;
  }({ 1: [function (t, e, n) {
      "use strict";
      function r(t) {
        var e = { "=": "=0", ":": "=2" };return "$" + ("" + t).replace(/[=:]/g, function (t) {
          return e[t];
        });
      }function o(t) {
        var e = /(=0|=2)/g,
            n = { "=0": "=", "=2": ":" };return ("" + ("." === t[0] && "$" === t[1] ? t.substring(2) : t.substring(1))).replace(e, function (t) {
          return n[t];
        });
      }var i = { escape: r, unescape: o };e.exports = i;
    }, {}], 2: [function (t, e, n) {
      "use strict";
      var r = t(19),
          o = (t(24), function (t) {
        var e = this;if (e.instancePool.length) {
          var n = e.instancePool.pop();return e.call(n, t), n;
        }return new e(t);
      }),
          i = function i(t, e) {
        var n = this;if (n.instancePool.length) {
          var r = n.instancePool.pop();return n.call(r, t, e), r;
        }return new n(t, e);
      },
          a = function a(t, e, n) {
        var r = this;if (r.instancePool.length) {
          var o = r.instancePool.pop();return r.call(o, t, e, n), o;
        }return new r(t, e, n);
      },
          u = function u(t, e, n, r) {
        var o = this;if (o.instancePool.length) {
          var i = o.instancePool.pop();return o.call(i, t, e, n, r), i;
        }return new o(t, e, n, r);
      },
          s = function s(t) {
        var e = this;t instanceof e || r("25"), t.destructor(), e.instancePool.length < e.poolSize && e.instancePool.push(t);
      },
          c = o,
          l = function l(t, e) {
        var n = t;return n.instancePool = [], n.getPooled = e || c, n.poolSize || (n.poolSize = 10), n.release = s, n;
      },
          f = { addPoolingTo: l, oneArgumentPooler: o, twoArgumentPooler: i, threeArgumentPooler: a, fourArgumentPooler: u };e.exports = f;
    }, { 19: 19, 24: 24 }], 3: [function (t, e, n) {
      "use strict";
      var r = t(26),
          o = t(4),
          i = t(5),
          a = t(7),
          u = t(8),
          s = t(11),
          c = t(13),
          l = t(15),
          f = t(18),
          p = u.createElement,
          d = u.createFactory,
          y = u.cloneElement,
          h = r,
          m = function m(t) {
        return t;
      },
          v = { Children: { map: i.map, forEach: i.forEach, count: i.count, toArray: i.toArray, only: f }, Component: o.Component, PureComponent: o.PureComponent, createElement: p, cloneElement: y, isValidElement: u.isValidElement, PropTypes: s, createClass: l, createFactory: d, createMixin: m, DOM: a, version: c, __spread: h };e.exports = v;
    }, { 11: 11, 13: 13, 15: 15, 18: 18, 26: 26, 4: 4, 5: 5, 7: 7, 8: 8 }], 4: [function (t, e, n) {
      "use strict";
      function r(t, e, n) {
        this.props = t, this.context = e, this.refs = c, this.updater = n || s;
      }function o(t, e, n) {
        this.props = t, this.context = e, this.refs = c, this.updater = n || s;
      }function i() {}var a = t(19),
          u = t(26),
          s = t(10),
          c = (t(14), t(23));t(24), t(17);r.prototype.isReactComponent = {}, r.prototype.setState = function (t, e) {
        "object" != (typeof t === "undefined" ? "undefined" : _typeof(t)) && "function" != typeof t && null != t && a("85"), this.updater.enqueueSetState(this, t), e && this.updater.enqueueCallback(this, e, "setState");
      }, r.prototype.forceUpdate = function (t) {
        this.updater.enqueueForceUpdate(this), t && this.updater.enqueueCallback(this, t, "forceUpdate");
      };i.prototype = r.prototype, o.prototype = new i(), o.prototype.constructor = o, u(o.prototype, r.prototype), o.prototype.isPureReactComponent = !0, e.exports = { Component: r, PureComponent: o };
    }, { 10: 10, 14: 14, 17: 17, 19: 19, 23: 23, 24: 24, 26: 26 }], 5: [function (t, e, n) {
      "use strict";
      function r(t) {
        return ("" + t).replace(E, "$&/");
      }function o(t, e) {
        this.func = t, this.context = e, this.count = 0;
      }function i(t, e, n) {
        var r = t.func,
            o = t.context;r.call(o, e, t.count++);
      }function a(t, e, n) {
        if (null == t) return t;var r = o.getPooled(e, n);v(t, i, r), o.release(r);
      }function u(t, e, n, r) {
        this.result = t, this.keyPrefix = e, this.func = n, this.context = r, this.count = 0;
      }function s(t, e, n) {
        var o = t.result,
            i = t.keyPrefix,
            a = t.func,
            u = t.context,
            s = a.call(u, e, t.count++);Array.isArray(s) ? c(s, o, n, m.thatReturnsArgument) : null != s && (h.isValidElement(s) && (s = h.cloneAndReplaceKey(s, i + (!s.key || e && e.key === s.key ? "" : r(s.key) + "/") + n)), o.push(s));
      }function c(t, e, n, o, i) {
        var a = "";null != n && (a = r(n) + "/");var c = u.getPooled(e, a, o, i);v(t, s, c), u.release(c);
      }function l(t, e, n) {
        if (null == t) return t;var r = [];return c(t, r, null, e, n), r;
      }function f(t, e, n) {
        return null;
      }function p(t, e) {
        return v(t, f, null);
      }function d(t) {
        var e = [];return c(t, e, null, m.thatReturnsArgument), e;
      }var y = t(2),
          h = t(8),
          m = t(22),
          v = t(20),
          b = y.twoArgumentPooler,
          g = y.fourArgumentPooler,
          E = /\/+/g;o.prototype.destructor = function () {
        this.func = null, this.context = null, this.count = 0;
      }, y.addPoolingTo(o, b), u.prototype.destructor = function () {
        this.result = null, this.keyPrefix = null, this.func = null, this.context = null, this.count = 0;
      }, y.addPoolingTo(u, g);var x = { forEach: a, map: l, mapIntoWithKeyPrefixInternal: c, count: p, toArray: d };e.exports = x;
    }, { 2: 2, 20: 20, 22: 22, 8: 8 }], 6: [function (t, e, n) {
      "use strict";
      var r = { current: null };e.exports = r;
    }, {}], 7: [function (t, e, n) {
      "use strict";
      var r = t(8),
          o = r.createFactory,
          i = { a: o("a"), abbr: o("abbr"), address: o("address"), area: o("area"), article: o("article"), aside: o("aside"), audio: o("audio"), b: o("b"), base: o("base"), bdi: o("bdi"), bdo: o("bdo"), big: o("big"), blockquote: o("blockquote"), body: o("body"), br: o("br"), button: o("button"), canvas: o("canvas"), caption: o("caption"), cite: o("cite"), code: o("code"), col: o("col"), colgroup: o("colgroup"), data: o("data"), datalist: o("datalist"), dd: o("dd"), del: o("del"), details: o("details"), dfn: o("dfn"), dialog: o("dialog"), div: o("div"), dl: o("dl"), dt: o("dt"), em: o("em"), embed: o("embed"), fieldset: o("fieldset"), figcaption: o("figcaption"), figure: o("figure"), footer: o("footer"), form: o("form"), h1: o("h1"), h2: o("h2"), h3: o("h3"), h4: o("h4"), h5: o("h5"), h6: o("h6"), head: o("head"), header: o("header"), hgroup: o("hgroup"), hr: o("hr"), html: o("html"), i: o("i"), iframe: o("iframe"), img: o("img"), input: o("input"), ins: o("ins"), kbd: o("kbd"), keygen: o("keygen"), label: o("label"), legend: o("legend"), li: o("li"), link: o("link"), main: o("main"), map: o("map"), mark: o("mark"), menu: o("menu"), menuitem: o("menuitem"), meta: o("meta"), meter: o("meter"), nav: o("nav"), noscript: o("noscript"), object: o("object"), ol: o("ol"), optgroup: o("optgroup"), option: o("option"), output: o("output"), p: o("p"), param: o("param"), picture: o("picture"), pre: o("pre"), progress: o("progress"), q: o("q"), rp: o("rp"), rt: o("rt"), ruby: o("ruby"), s: o("s"), samp: o("samp"), script: o("script"), section: o("section"), select: o("select"), small: o("small"), source: o("source"), span: o("span"), strong: o("strong"), style: o("style"), sub: o("sub"), summary: o("summary"), sup: o("sup"), table: o("table"), tbody: o("tbody"), td: o("td"), textarea: o("textarea"), tfoot: o("tfoot"), th: o("th"), thead: o("thead"), time: o("time"), title: o("title"), tr: o("tr"), track: o("track"), u: o("u"), ul: o("ul"), var: o("var"), video: o("video"), wbr: o("wbr"), circle: o("circle"), clipPath: o("clipPath"), defs: o("defs"), ellipse: o("ellipse"), g: o("g"), image: o("image"), line: o("line"), linearGradient: o("linearGradient"), mask: o("mask"), path: o("path"), pattern: o("pattern"), polygon: o("polygon"), polyline: o("polyline"), radialGradient: o("radialGradient"), rect: o("rect"), stop: o("stop"), svg: o("svg"), text: o("text"), tspan: o("tspan") };e.exports = i;
    }, { 8: 8 }], 8: [function (t, e, n) {
      "use strict";
      function r(t) {
        return void 0 !== t.ref;
      }function o(t) {
        return void 0 !== t.key;
      }var i = t(26),
          a = t(6),
          u = (t(25), t(14), Object.prototype.hasOwnProperty),
          s = t(9),
          c = { key: !0, ref: !0, __self: !0, __source: !0 },
          l = function l(t, e, n, r, o, i, a) {
        return { $$typeof: s, type: t, key: e, ref: n, props: a, _owner: i };
      };l.createElement = function (t, e, n) {
        var i,
            s = {},
            f = null,
            p = null;if (null != e) {
          r(e) && (p = e.ref), o(e) && (f = "" + e.key), void 0 === e.__self ? null : e.__self, void 0 === e.__source ? null : e.__source;for (i in e) {
            u.call(e, i) && !c.hasOwnProperty(i) && (s[i] = e[i]);
          }
        }var d = arguments.length - 2;if (1 === d) s.children = n;else if (d > 1) {
          for (var y = Array(d), h = 0; h < d; h++) {
            y[h] = arguments[h + 2];
          }s.children = y;
        }if (t && t.defaultProps) {
          var m = t.defaultProps;for (i in m) {
            void 0 === s[i] && (s[i] = m[i]);
          }
        }return l(t, f, p, 0, 0, a.current, s);
      }, l.createFactory = function (t) {
        var e = l.createElement.bind(null, t);return e.type = t, e;
      }, l.cloneAndReplaceKey = function (t, e) {
        return l(t.type, e, t.ref, t._self, t._source, t._owner, t.props);
      }, l.cloneElement = function (t, e, n) {
        var s,
            f = i({}, t.props),
            p = t.key,
            d = t.ref,
            y = (t._self, t._source, t._owner);if (null != e) {
          r(e) && (d = e.ref, y = a.current), o(e) && (p = "" + e.key);var h;t.type && t.type.defaultProps && (h = t.type.defaultProps);for (s in e) {
            u.call(e, s) && !c.hasOwnProperty(s) && (void 0 === e[s] && void 0 !== h ? f[s] = h[s] : f[s] = e[s]);
          }
        }var m = arguments.length - 2;if (1 === m) f.children = n;else if (m > 1) {
          for (var v = Array(m), b = 0; b < m; b++) {
            v[b] = arguments[b + 2];
          }f.children = v;
        }return l(t.type, p, d, 0, 0, y, f);
      }, l.isValidElement = function (t) {
        return "object" == (typeof t === "undefined" ? "undefined" : _typeof(t)) && null !== t && t.$$typeof === s;
      }, e.exports = l;
    }, { 14: 14, 25: 25, 26: 26, 6: 6, 9: 9 }], 9: [function (t, e, n) {
      "use strict";
      var r = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103;e.exports = r;
    }, {}], 10: [function (t, e, n) {
      "use strict";
      var r = (t(25), { isMounted: function isMounted(t) {
          return !1;
        }, enqueueCallback: function enqueueCallback(t, e) {}, enqueueForceUpdate: function enqueueForceUpdate(t) {}, enqueueReplaceState: function enqueueReplaceState(t, e) {}, enqueueSetState: function enqueueSetState(t, e) {} });e.exports = r;
    }, { 25: 25 }], 11: [function (t, e, n) {
      "use strict";
      var r = t(8),
          o = r.isValidElement,
          i = t(28);e.exports = i(o);
    }, { 28: 28, 8: 8 }], 12: [function (t, e, n) {
      "use strict";
      var r = t(26),
          o = t(3),
          i = r(o, { __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: { ReactCurrentOwner: t(6) } });e.exports = i;
    }, { 26: 26, 3: 3, 6: 6 }], 13: [function (t, e, n) {
      "use strict";
      e.exports = "15.6.1";
    }, {}], 14: [function (t, e, n) {
      "use strict";
      e.exports = !1;
    }, {}], 15: [function (t, e, n) {
      "use strict";
      var r = t(4),
          o = r.Component,
          i = t(8),
          a = i.isValidElement,
          u = t(10),
          s = t(21);e.exports = s(o, a, u);
    }, { 10: 10, 21: 21, 4: 4, 8: 8 }], 16: [function (t, e, n) {
      "use strict";
      function r(t) {
        var e = t && (o && t[o] || t[i]);if ("function" == typeof e) return e;
      }var o = "function" == typeof Symbol && Symbol.iterator,
          i = "@@iterator";e.exports = r;
    }, {}], 17: [function (t, e, n) {
      "use strict";
      var r = function r() {};e.exports = r;
    }, {}], 18: [function (t, e, n) {
      "use strict";
      function r(t) {
        return i.isValidElement(t) || o("143"), t;
      }var o = t(19),
          i = t(8);t(24);e.exports = r;
    }, { 19: 19, 24: 24, 8: 8 }], 19: [function (t, e, n) {
      "use strict";
      function r(t) {
        for (var e = arguments.length - 1, n = "Minified React error #" + t + "; visit http://facebook.github.io/react/docs/error-decoder.html?invariant=" + t, r = 0; r < e; r++) {
          n += "&args[]=" + encodeURIComponent(arguments[r + 1]);
        }n += " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";var o = new Error(n);throw o.name = "Invariant Violation", o.framesToPop = 1, o;
      }e.exports = r;
    }, {}], 20: [function (t, e, n) {
      "use strict";
      function r(t, e) {
        return t && "object" == (typeof t === "undefined" ? "undefined" : _typeof(t)) && null != t.key ? c.escape(t.key) : e.toString(36);
      }function o(t, e, n, i) {
        var p = typeof t === "undefined" ? "undefined" : _typeof(t);if ("undefined" !== p && "boolean" !== p || (t = null), null === t || "string" === p || "number" === p || "object" === p && t.$$typeof === u) return n(i, t, "" === e ? l + r(t, 0) : e), 1;var d,
            y,
            h = 0,
            m = "" === e ? l : e + f;if (Array.isArray(t)) for (var v = 0; v < t.length; v++) {
          d = t[v], y = m + r(d, v), h += o(d, y, n, i);
        } else {
          var b = s(t);if (b) {
            var g,
                E = b.call(t);if (b !== t.entries) for (var x = 0; !(g = E.next()).done;) {
              d = g.value, y = m + r(d, x++), h += o(d, y, n, i);
            } else for (; !(g = E.next()).done;) {
              var _ = g.value;_ && (d = _[1], y = m + c.escape(_[0]) + f + r(d, 0), h += o(d, y, n, i));
            }
          } else if ("object" === p) {
            var P = String(t);a("31", "[object Object]" === P ? "object with keys {" + Object.keys(t).join(", ") + "}" : P, "");
          }
        }return h;
      }function i(t, e, n) {
        return null == t ? 0 : o(t, "", e, n);
      }var a = t(19),
          u = (t(6), t(9)),
          s = t(16),
          c = (t(24), t(1)),
          l = (t(25), "."),
          f = ":";e.exports = i;
    }, { 1: 1, 16: 16, 19: 19, 24: 24, 25: 25, 6: 6, 9: 9 }], 21: [function (t, e, n) {
      "use strict";
      function r(t) {
        return t;
      }function o(t, e, n) {
        function o(t, e) {
          var n = b.hasOwnProperty(e) ? b[e] : null;_.hasOwnProperty(e) && u("OVERRIDE_BASE" === n, "ReactClassInterface: You are attempting to override `%s` from your class specification. Ensure that your method names do not overlap with React methods.", e), t && u("DEFINE_MANY" === n || "DEFINE_MANY_MERGED" === n, "ReactClassInterface: You are attempting to define `%s` on your component more than once. This conflict may be due to a mixin.", e);
        }function c(t, n) {
          if (n) {
            u("function" != typeof n, "ReactClass: You're attempting to use a component class or function as a mixin. Instead, just use a regular object."), u(!e(n), "ReactClass: You're attempting to use a component as a mixin. Instead, just use a regular object.");var r = t.prototype,
                i = r.__reactAutoBindPairs;n.hasOwnProperty(s) && g.mixins(t, n.mixins);for (var a in n) {
              if (n.hasOwnProperty(a) && a !== s) {
                var c = n[a],
                    l = r.hasOwnProperty(a);if (o(l, a), g.hasOwnProperty(a)) g[a](t, c);else {
                  var f = b.hasOwnProperty(a),
                      y = "function" == typeof c,
                      h = y && !f && !l && !1 !== n.autobind;if (h) i.push(a, c), r[a] = c;else if (l) {
                    var m = b[a];u(f && ("DEFINE_MANY_MERGED" === m || "DEFINE_MANY" === m), "ReactClass: Unexpected spec policy %s for key %s when mixing in component specs.", m, a), "DEFINE_MANY_MERGED" === m ? r[a] = p(r[a], c) : "DEFINE_MANY" === m && (r[a] = d(r[a], c));
                  } else r[a] = c;
                }
              }
            }
          } else ;
        }function l(t, e) {
          if (e) for (var n in e) {
            var r = e[n];if (e.hasOwnProperty(n)) {
              var o = n in g;u(!o, 'ReactClass: You are attempting to define a reserved property, `%s`, that shouldn\'t be on the "statics" key. Define it as an instance property instead; it will still be accessible on the constructor.', n);var i = n in t;u(!i, "ReactClass: You are attempting to define `%s` on your component more than once. This conflict may be due to a mixin.", n), t[n] = r;
            }
          }
        }function f(t, e) {
          u(t && e && "object" == (typeof t === "undefined" ? "undefined" : _typeof(t)) && "object" == (typeof e === "undefined" ? "undefined" : _typeof(e)), "mergeIntoWithNoDuplicateKeys(): Cannot merge non-objects.");for (var n in e) {
            e.hasOwnProperty(n) && (u(void 0 === t[n], "mergeIntoWithNoDuplicateKeys(): Tried to merge two objects with the same key: `%s`. This conflict may be due to a mixin; in particular, this may be caused by two getInitialState() or getDefaultProps() methods returning objects with clashing keys.", n), t[n] = e[n]);
          }return t;
        }function p(t, e) {
          return function () {
            var n = t.apply(this, arguments),
                r = e.apply(this, arguments);if (null == n) return r;if (null == r) return n;var o = {};return f(o, n), f(o, r), o;
          };
        }function d(t, e) {
          return function () {
            t.apply(this, arguments), e.apply(this, arguments);
          };
        }function y(t, e) {
          var n = e.bind(t);return n;
        }function h(t) {
          for (var e = t.__reactAutoBindPairs, n = 0; n < e.length; n += 2) {
            var r = e[n],
                o = e[n + 1];t[r] = y(t, o);
          }
        }function m(t) {
          var e = r(function (t, r, o) {
            this.__reactAutoBindPairs.length && h(this), this.props = t, this.context = r, this.refs = a, this.updater = o || n, this.state = null;var i = this.getInitialState ? this.getInitialState() : null;u("object" == (typeof i === "undefined" ? "undefined" : _typeof(i)) && !Array.isArray(i), "%s.getInitialState(): must return an object or null", e.displayName || "ReactCompositeComponent"), this.state = i;
          });e.prototype = new P(), e.prototype.constructor = e, e.prototype.__reactAutoBindPairs = [], v.forEach(c.bind(null, e)), c(e, E), c(e, t), c(e, x), e.getDefaultProps && (e.defaultProps = e.getDefaultProps()), u(e.prototype.render, "createClass(...): Class specification must implement a `render` method.");for (var o in b) {
            e.prototype[o] || (e.prototype[o] = null);
          }return e;
        }var v = [],
            b = { mixins: "DEFINE_MANY", statics: "DEFINE_MANY", propTypes: "DEFINE_MANY", contextTypes: "DEFINE_MANY", childContextTypes: "DEFINE_MANY", getDefaultProps: "DEFINE_MANY_MERGED", getInitialState: "DEFINE_MANY_MERGED", getChildContext: "DEFINE_MANY_MERGED", render: "DEFINE_ONCE", componentWillMount: "DEFINE_MANY", componentDidMount: "DEFINE_MANY", componentWillReceiveProps: "DEFINE_MANY", shouldComponentUpdate: "DEFINE_ONCE", componentWillUpdate: "DEFINE_MANY", componentDidUpdate: "DEFINE_MANY", componentWillUnmount: "DEFINE_MANY", updateComponent: "OVERRIDE_BASE" },
            g = { displayName: function displayName(t, e) {
            t.displayName = e;
          }, mixins: function mixins(t, e) {
            if (e) for (var n = 0; n < e.length; n++) {
              c(t, e[n]);
            }
          }, childContextTypes: function childContextTypes(t, e) {
            t.childContextTypes = i({}, t.childContextTypes, e);
          }, contextTypes: function contextTypes(t, e) {
            t.contextTypes = i({}, t.contextTypes, e);
          }, getDefaultProps: function getDefaultProps(t, e) {
            t.getDefaultProps ? t.getDefaultProps = p(t.getDefaultProps, e) : t.getDefaultProps = e;
          }, propTypes: function propTypes(t, e) {
            t.propTypes = i({}, t.propTypes, e);
          }, statics: function statics(t, e) {
            l(t, e);
          }, autobind: function autobind() {} },
            E = { componentDidMount: function componentDidMount() {
            this.__isMounted = !0;
          } },
            x = { componentWillUnmount: function componentWillUnmount() {
            this.__isMounted = !1;
          } },
            _ = { replaceState: function replaceState(t, e) {
            this.updater.enqueueReplaceState(this, t, e);
          }, isMounted: function isMounted() {
            return !!this.__isMounted;
          } },
            P = function P() {};return i(P.prototype, t.prototype, _), m;
      }var i = t(26),
          a = t(23),
          u = t(24),
          s = "mixins";e.exports = o;
    }, { 23: 23, 24: 24, 25: 25, 26: 26 }], 22: [function (t, e, n) {
      "use strict";
      function r(t) {
        return function () {
          return t;
        };
      }var o = function o() {};o.thatReturns = r, o.thatReturnsFalse = r(!1), o.thatReturnsTrue = r(!0), o.thatReturnsNull = r(null), o.thatReturnsThis = function () {
        return this;
      }, o.thatReturnsArgument = function (t) {
        return t;
      }, e.exports = o;
    }, {}], 23: [function (t, e, n) {
      "use strict";
      var r = {};e.exports = r;
    }, {}], 24: [function (t, e, n) {
      "use strict";
      function r(t, e, n, r, i, a, u, s) {
        if (o(e), !t) {
          var c;if (void 0 === e) c = new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else {
            var l = [n, r, i, a, u, s],
                f = 0;c = new Error(e.replace(/%s/g, function () {
              return l[f++];
            })), c.name = "Invariant Violation";
          }throw c.framesToPop = 1, c;
        }
      }var o = function o(t) {};e.exports = r;
    }, {}], 25: [function (t, e, n) {
      "use strict";
      var r = t(22),
          o = r;e.exports = o;
    }, { 22: 22 }], 26: [function (t, e, n) {
      "use strict";
      function r(t) {
        if (null === t || void 0 === t) throw new TypeError("Object.assign cannot be called with null or undefined");return Object(t);
      }var o = Object.getOwnPropertySymbols,
          i = Object.prototype.hasOwnProperty,
          a = Object.prototype.propertyIsEnumerable;e.exports = function () {
        try {
          if (!Object.assign) return !1;var t = new String("abc");if (t[5] = "de", "5" === Object.getOwnPropertyNames(t)[0]) return !1;for (var e = {}, n = 0; n < 10; n++) {
            e["_" + String.fromCharCode(n)] = n;
          }if ("0123456789" !== Object.getOwnPropertyNames(e).map(function (t) {
            return e[t];
          }).join("")) return !1;var r = {};return "abcdefghijklmnopqrst".split("").forEach(function (t) {
            r[t] = t;
          }), "abcdefghijklmnopqrst" === Object.keys(Object.assign({}, r)).join("");
        } catch (t) {
          return !1;
        }
      }() ? Object.assign : function (t, e) {
        for (var n, u, s = r(t), c = 1; c < arguments.length; c++) {
          n = Object(arguments[c]);for (var l in n) {
            i.call(n, l) && (s[l] = n[l]);
          }if (o) {
            u = o(n);for (var f = 0; f < u.length; f++) {
              a.call(n, u[f]) && (s[u[f]] = n[u[f]]);
            }
          }
        }return s;
      };
    }, {}], 27: [function (t, e, n) {
      "use strict";
      function r(t, e, n, r, o) {}e.exports = r;
    }, { 24: 24, 25: 25, 30: 30 }], 28: [function (t, e, n) {
      "use strict";
      var r = t(29);e.exports = function (t) {
        return r(t, !1);
      };
    }, { 29: 29 }], 29: [function (t, e, n) {
      "use strict";
      var r = t(22),
          o = t(24),
          i = t(25),
          a = t(30),
          u = t(27);e.exports = function (t, e) {
        function n(t) {
          var e = t && (w && t[w] || t[N]);if ("function" == typeof e) return e;
        }function s(t, e) {
          return t === e ? 0 !== t || 1 / t == 1 / e : t !== t && e !== e;
        }function c(t) {
          this.message = t, this.stack = "";
        }function l(t) {
          function n(n, r, i, u, s, l, f) {
            if (u = u || A, l = l || i, f !== a) if (e) o(!1, "Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types");else ;return null == r[i] ? n ? new c(null === r[i] ? "The " + s + " `" + l + "` is marked as required in `" + u + "`, but its value is `null`." : "The " + s + " `" + l + "` is marked as required in `" + u + "`, but its value is `undefined`.") : null : t(r, i, u, s, l);
          }var r = n.bind(null, !1);return r.isRequired = n.bind(null, !0), r;
        }function f(t) {
          function e(e, n, r, o, i, a) {
            var u = e[n];if (E(u) !== t) return new c("Invalid " + o + " `" + i + "` of type `" + x(u) + "` supplied to `" + r + "`, expected `" + t + "`.");return null;
          }return l(e);
        }function p(t) {
          function e(e, n, r, o, i) {
            if ("function" != typeof t) return new c("Property `" + i + "` of component `" + r + "` has invalid PropType notation inside arrayOf.");var u = e[n];if (!Array.isArray(u)) {
              return new c("Invalid " + o + " `" + i + "` of type `" + E(u) + "` supplied to `" + r + "`, expected an array.");
            }for (var s = 0; s < u.length; s++) {
              var l = t(u, s, r, o, i + "[" + s + "]", a);if (l instanceof Error) return l;
            }return null;
          }return l(e);
        }function d(t) {
          function e(e, n, r, o, i) {
            if (!(e[n] instanceof t)) {
              var a = t.name || A;return new c("Invalid " + o + " `" + i + "` of type `" + P(e[n]) + "` supplied to `" + r + "`, expected instance of `" + a + "`.");
            }return null;
          }return l(e);
        }function y(t) {
          function e(e, n, r, o, i) {
            for (var a = e[n], u = 0; u < t.length; u++) {
              if (s(a, t[u])) return null;
            }return new c("Invalid " + o + " `" + i + "` of value `" + a + "` supplied to `" + r + "`, expected one of " + JSON.stringify(t) + ".");
          }return Array.isArray(t) ? l(e) : r.thatReturnsNull;
        }function h(t) {
          function e(e, n, r, o, i) {
            if ("function" != typeof t) return new c("Property `" + i + "` of component `" + r + "` has invalid PropType notation inside objectOf.");var u = e[n],
                s = E(u);if ("object" !== s) return new c("Invalid " + o + " `" + i + "` of type `" + s + "` supplied to `" + r + "`, expected an object.");for (var l in u) {
              if (u.hasOwnProperty(l)) {
                var f = t(u, l, r, o, i + "." + l, a);if (f instanceof Error) return f;
              }
            }return null;
          }return l(e);
        }function m(t) {
          function e(e, n, r, o, i) {
            for (var u = 0; u < t.length; u++) {
              if (null == (0, t[u])(e, n, r, o, i, a)) return null;
            }return new c("Invalid " + o + " `" + i + "` supplied to `" + r + "`.");
          }if (!Array.isArray(t)) return r.thatReturnsNull;for (var n = 0; n < t.length; n++) {
            var o = t[n];if ("function" != typeof o) return i(!1, "Invalid argument supplid to oneOfType. Expected an array of check functions, but received %s at index %s.", _(o), n), r.thatReturnsNull;
          }return l(e);
        }function v(t) {
          function e(e, n, r, o, i) {
            var u = e[n],
                s = E(u);if ("object" !== s) return new c("Invalid " + o + " `" + i + "` of type `" + s + "` supplied to `" + r + "`, expected `object`.");for (var l in t) {
              var f = t[l];if (f) {
                var p = f(u, l, r, o, i + "." + l, a);if (p) return p;
              }
            }return null;
          }return l(e);
        }function b(e) {
          switch (typeof e === "undefined" ? "undefined" : _typeof(e)) {case "number":case "string":case "undefined":
              return !0;case "boolean":
              return !e;case "object":
              if (Array.isArray(e)) return e.every(b);if (null === e || t(e)) return !0;var r = n(e);if (!r) return !1;var o,
                  i = r.call(e);if (r !== e.entries) {
                for (; !(o = i.next()).done;) {
                  if (!b(o.value)) return !1;
                }
              } else for (; !(o = i.next()).done;) {
                var a = o.value;if (a && !b(a[1])) return !1;
              }return !0;default:
              return !1;}
        }function g(t, e) {
          return "symbol" === t || "Symbol" === e["@@toStringTag"] || "function" == typeof Symbol && e instanceof Symbol;
        }function E(t) {
          var e = typeof t === "undefined" ? "undefined" : _typeof(t);return Array.isArray(t) ? "array" : t instanceof RegExp ? "object" : g(e, t) ? "symbol" : e;
        }function x(t) {
          if (void 0 === t || null === t) return "" + t;var e = E(t);if ("object" === e) {
            if (t instanceof Date) return "date";if (t instanceof RegExp) return "regexp";
          }return e;
        }function _(t) {
          var e = x(t);switch (e) {case "array":case "object":
              return "an " + e;case "boolean":case "date":case "regexp":
              return "a " + e;default:
              return e;}
        }function P(t) {
          return t.constructor && t.constructor.name ? t.constructor.name : A;
        }var w = "function" == typeof Symbol && Symbol.iterator,
            N = "@@iterator",
            A = "<<anonymous>>",
            O = { array: f("array"), bool: f("boolean"), func: f("function"), number: f("number"), object: f("object"), string: f("string"), symbol: f("symbol"), any: function () {
            return l(r.thatReturnsNull);
          }(), arrayOf: p, element: function () {
            function e(e, n, r, o, i) {
              var a = e[n];if (!t(a)) {
                return new c("Invalid " + o + " `" + i + "` of type `" + E(a) + "` supplied to `" + r + "`, expected a single ReactElement.");
              }return null;
            }return l(e);
          }(), instanceOf: d, node: function () {
            function t(t, e, n, r, o) {
              return b(t[e]) ? null : new c("Invalid " + r + " `" + o + "` supplied to `" + n + "`, expected a ReactNode.");
            }return l(t);
          }(), objectOf: h, oneOf: y, oneOfType: m, shape: v };return c.prototype = Error.prototype, O.checkPropTypes = u, O.PropTypes = O, O;
      };
    }, { 22: 22, 24: 24, 25: 25, 27: 27, 30: 30 }], 30: [function (t, e, n) {
      "use strict";
      e.exports = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
    }, {}] }, {}, [12])(12);
});

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var require;var require;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * ReactDOM v15.6.1
 *
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */
!function (e) {
  if ("object" == ( false ? "undefined" : _typeof(exports)) && "undefined" != typeof module) module.exports = e(__webpack_require__(8));else if (true) !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(8)], __WEBPACK_AMD_DEFINE_FACTORY__ = (e),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));else {
    var t;t = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this, t.ReactDOM = e(t.React);
  }
}(function (e) {
  return function (t) {
    return function () {
      return function e(t, n, r) {
        function o(a, s) {
          if (!n[a]) {
            if (!t[a]) {
              var u = "function" == typeof require && require;if (!s && u) return require(a, !0);if (i) return i(a, !0);var l = new Error("Cannot find module '" + a + "'");throw l.code = "MODULE_NOT_FOUND", l;
            }var c = n[a] = { exports: {} };t[a][0].call(c.exports, function (e) {
              var n = t[a][1][e];return o(n || e);
            }, c, c.exports, e, t, n, r);
          }return n[a].exports;
        }for (var i = "function" == typeof require && require, a = 0; a < r.length; a++) {
          o(r[a]);
        }return o;
      }({ 1: [function (e, t, n) {
          "use strict";
          var r = { Properties: { "aria-current": 0, "aria-details": 0, "aria-disabled": 0, "aria-hidden": 0, "aria-invalid": 0, "aria-keyshortcuts": 0, "aria-label": 0, "aria-roledescription": 0, "aria-autocomplete": 0, "aria-checked": 0, "aria-expanded": 0, "aria-haspopup": 0, "aria-level": 0, "aria-modal": 0, "aria-multiline": 0, "aria-multiselectable": 0, "aria-orientation": 0, "aria-placeholder": 0, "aria-pressed": 0, "aria-readonly": 0, "aria-required": 0, "aria-selected": 0, "aria-sort": 0, "aria-valuemax": 0, "aria-valuemin": 0, "aria-valuenow": 0, "aria-valuetext": 0, "aria-atomic": 0, "aria-busy": 0, "aria-live": 0, "aria-relevant": 0, "aria-dropeffect": 0, "aria-grabbed": 0, "aria-activedescendant": 0, "aria-colcount": 0, "aria-colindex": 0, "aria-colspan": 0, "aria-controls": 0, "aria-describedby": 0, "aria-errormessage": 0, "aria-flowto": 0, "aria-labelledby": 0, "aria-owns": 0, "aria-posinset": 0, "aria-rowcount": 0, "aria-rowindex": 0, "aria-rowspan": 0, "aria-setsize": 0 }, DOMAttributeNames: {}, DOMPropertyNames: {} };t.exports = r;
        }, {}], 2: [function (e, t, n) {
          "use strict";
          var r = e(33),
              o = e(132),
              i = { focusDOMComponent: function focusDOMComponent() {
              o(r.getNodeFromInstance(this));
            } };t.exports = i;
        }, { 132: 132, 33: 33 }], 3: [function (e, t, n) {
          "use strict";
          function r(e) {
            return (e.ctrlKey || e.altKey || e.metaKey) && !(e.ctrlKey && e.altKey);
          }function o(e) {
            switch (e) {case "topCompositionStart":
                return T.compositionStart;case "topCompositionEnd":
                return T.compositionEnd;case "topCompositionUpdate":
                return T.compositionUpdate;}
          }function i(e, t) {
            return "topKeyDown" === e && t.keyCode === y;
          }function a(e, t) {
            switch (e) {case "topKeyUp":
                return -1 !== g.indexOf(t.keyCode);case "topKeyDown":
                return t.keyCode !== y;case "topKeyPress":case "topMouseDown":case "topBlur":
                return !0;default:
                return !1;}
          }function s(e) {
            var t = e.detail;return "object" == (typeof t === "undefined" ? "undefined" : _typeof(t)) && "data" in t ? t.data : null;
          }function u(e, t, n, r) {
            var u, l;if (_ ? u = o(e) : P ? a(e, n) && (u = T.compositionEnd) : i(e, n) && (u = T.compositionStart), !u) return null;E && (P || u !== T.compositionStart ? u === T.compositionEnd && P && (l = P.getData()) : P = h.getPooled(r));var c = m.getPooled(u, t, n, r);if (l) c.data = l;else {
              var p = s(n);null !== p && (c.data = p);
            }return d.accumulateTwoPhaseDispatches(c), c;
          }function l(e, t) {
            switch (e) {case "topCompositionEnd":
                return s(t);case "topKeyPress":
                return t.which !== x ? null : (k = !0, w);case "topTextInput":
                var n = t.data;return n === w && k ? null : n;default:
                return null;}
          }function c(e, t) {
            if (P) {
              if ("topCompositionEnd" === e || !_ && a(e, t)) {
                var n = P.getData();return h.release(P), P = null, n;
              }return null;
            }switch (e) {case "topPaste":
                return null;case "topKeyPress":
                return t.which && !r(t) ? String.fromCharCode(t.which) : null;case "topCompositionEnd":
                return E ? null : t.data;default:
                return null;}
          }function p(e, t, n, r) {
            var o;if (!(o = b ? l(e, n) : c(e, n))) return null;var i = v.getPooled(T.beforeInput, t, n, r);return i.data = o, d.accumulateTwoPhaseDispatches(i), i;
          }var d = e(19),
              f = e(124),
              h = e(20),
              m = e(78),
              v = e(82),
              g = [9, 13, 27, 32],
              y = 229,
              _ = f.canUseDOM && "CompositionEvent" in window,
              C = null;f.canUseDOM && "documentMode" in document && (C = document.documentMode);var b = f.canUseDOM && "TextEvent" in window && !C && !function () {
            var e = window.opera;return "object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) && "function" == typeof e.version && parseInt(e.version(), 10) <= 12;
          }(),
              E = f.canUseDOM && (!_ || C && C > 8 && C <= 11),
              x = 32,
              w = String.fromCharCode(x),
              T = { beforeInput: { phasedRegistrationNames: { bubbled: "onBeforeInput", captured: "onBeforeInputCapture" }, dependencies: ["topCompositionEnd", "topKeyPress", "topTextInput", "topPaste"] }, compositionEnd: { phasedRegistrationNames: { bubbled: "onCompositionEnd", captured: "onCompositionEndCapture" }, dependencies: ["topBlur", "topCompositionEnd", "topKeyDown", "topKeyPress", "topKeyUp", "topMouseDown"] }, compositionStart: { phasedRegistrationNames: { bubbled: "onCompositionStart", captured: "onCompositionStartCapture" }, dependencies: ["topBlur", "topCompositionStart", "topKeyDown", "topKeyPress", "topKeyUp", "topMouseDown"] }, compositionUpdate: { phasedRegistrationNames: { bubbled: "onCompositionUpdate", captured: "onCompositionUpdateCapture" }, dependencies: ["topBlur", "topCompositionUpdate", "topKeyDown", "topKeyPress", "topKeyUp", "topMouseDown"] } },
              k = !1,
              P = null,
              S = { eventTypes: T, extractEvents: function extractEvents(e, t, n, r) {
              return [u(e, t, n, r), p(e, t, n, r)];
            } };t.exports = S;
        }, { 124: 124, 19: 19, 20: 20, 78: 78, 82: 82 }], 4: [function (e, t, n) {
          "use strict";
          function r(e, t) {
            return e + t.charAt(0).toUpperCase() + t.substring(1);
          }var o = { animationIterationCount: !0, borderImageOutset: !0, borderImageSlice: !0, borderImageWidth: !0, boxFlex: !0, boxFlexGroup: !0, boxOrdinalGroup: !0, columnCount: !0, flex: !0, flexGrow: !0, flexPositive: !0, flexShrink: !0, flexNegative: !0, flexOrder: !0, gridRow: !0, gridRowEnd: !0, gridRowSpan: !0, gridRowStart: !0, gridColumn: !0, gridColumnEnd: !0, gridColumnSpan: !0, gridColumnStart: !0, fontWeight: !0, lineClamp: !0, lineHeight: !0, opacity: !0, order: !0, orphans: !0, tabSize: !0, widows: !0, zIndex: !0, zoom: !0, fillOpacity: !0, floodOpacity: !0, stopOpacity: !0, strokeDasharray: !0, strokeDashoffset: !0, strokeMiterlimit: !0, strokeOpacity: !0, strokeWidth: !0 },
              i = ["Webkit", "ms", "Moz", "O"];Object.keys(o).forEach(function (e) {
            i.forEach(function (t) {
              o[r(t, e)] = o[e];
            });
          });var a = { background: { backgroundAttachment: !0, backgroundColor: !0, backgroundImage: !0, backgroundPositionX: !0, backgroundPositionY: !0, backgroundRepeat: !0 }, backgroundPosition: { backgroundPositionX: !0, backgroundPositionY: !0 }, border: { borderWidth: !0, borderStyle: !0, borderColor: !0 }, borderBottom: { borderBottomWidth: !0, borderBottomStyle: !0, borderBottomColor: !0 }, borderLeft: { borderLeftWidth: !0, borderLeftStyle: !0, borderLeftColor: !0 }, borderRight: { borderRightWidth: !0, borderRightStyle: !0, borderRightColor: !0 }, borderTop: { borderTopWidth: !0, borderTopStyle: !0, borderTopColor: !0 }, font: { fontStyle: !0, fontVariant: !0, fontWeight: !0, fontSize: !0, lineHeight: !0, fontFamily: !0 }, outline: { outlineWidth: !0, outlineStyle: !0, outlineColor: !0 } },
              s = { isUnitlessNumber: o, shorthandPropertyExpansions: a };t.exports = s;
        }, {}], 5: [function (e, t, n) {
          "use strict";
          var r = e(4),
              o = e(124),
              i = (e(58), e(126), e(94)),
              a = e(137),
              s = e(141),
              u = (e(143), s(function (e) {
            return a(e);
          })),
              l = !1,
              c = "cssFloat";if (o.canUseDOM) {
            var p = document.createElement("div").style;try {
              p.font = "";
            } catch (e) {
              l = !0;
            }void 0 === document.documentElement.style.cssFloat && (c = "styleFloat");
          }var d = { createMarkupForStyles: function createMarkupForStyles(e, t) {
              var n = "";for (var r in e) {
                if (e.hasOwnProperty(r)) {
                  var o = 0 === r.indexOf("--"),
                      a = e[r];null != a && (n += u(r) + ":", n += i(r, a, t, o) + ";");
                }
              }return n || null;
            }, setValueForStyles: function setValueForStyles(e, t, n) {
              var o = e.style;for (var a in t) {
                if (t.hasOwnProperty(a)) {
                  var s = 0 === a.indexOf("--"),
                      u = i(a, t[a], n, s);if ("float" !== a && "cssFloat" !== a || (a = c), s) o.setProperty(a, u);else if (u) o[a] = u;else {
                    var p = l && r.shorthandPropertyExpansions[a];if (p) for (var d in p) {
                      o[d] = "";
                    } else o[a] = "";
                  }
                }
              }
            } };t.exports = d;
        }, { 124: 124, 126: 126, 137: 137, 141: 141, 143: 143, 4: 4, 58: 58, 94: 94 }], 6: [function (e, t, n) {
          "use strict";
          function r(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }var o = e(113),
              i = e(24),
              a = (e(138), function () {
            function e(t) {
              r(this, e), this._callbacks = null, this._contexts = null, this._arg = t;
            }return e.prototype.enqueue = function (e, t) {
              this._callbacks = this._callbacks || [], this._callbacks.push(e), this._contexts = this._contexts || [], this._contexts.push(t);
            }, e.prototype.notifyAll = function () {
              var e = this._callbacks,
                  t = this._contexts,
                  n = this._arg;if (e && t) {
                e.length !== t.length && o("24"), this._callbacks = null, this._contexts = null;for (var r = 0; r < e.length; r++) {
                  e[r].call(t[r], n);
                }e.length = 0, t.length = 0;
              }
            }, e.prototype.checkpoint = function () {
              return this._callbacks ? this._callbacks.length : 0;
            }, e.prototype.rollback = function (e) {
              this._callbacks && this._contexts && (this._callbacks.length = e, this._contexts.length = e);
            }, e.prototype.reset = function () {
              this._callbacks = null, this._contexts = null;
            }, e.prototype.destructor = function () {
              this.reset();
            }, e;
          }());t.exports = i.addPoolingTo(a);
        }, { 113: 113, 138: 138, 24: 24 }], 7: [function (e, t, n) {
          "use strict";
          function r(e, t, n) {
            var r = k.getPooled(I.change, e, t, n);return r.type = "change", E.accumulateTwoPhaseDispatches(r), r;
          }function o(e) {
            var t = e.nodeName && e.nodeName.toLowerCase();return "select" === t || "input" === t && "file" === e.type;
          }function i(e) {
            var t = r(R, e, S(e));T.batchedUpdates(a, t);
          }function a(e) {
            b.enqueueEvents(e), b.processEventQueue(!1);
          }function s(e, t) {
            O = e, R = t, O.attachEvent("onchange", i);
          }function u() {
            O && (O.detachEvent("onchange", i), O = null, R = null);
          }function l(e, t) {
            var n = P.updateValueIfChanged(e),
                r = !0 === t.simulated && L._allowSimulatedPassThrough;if (n || r) return e;
          }function c(e, t) {
            if ("topChange" === e) return t;
          }function p(e, t, n) {
            "topFocus" === e ? (u(), s(t, n)) : "topBlur" === e && u();
          }function d(e, t) {
            O = e, R = t, O.attachEvent("onpropertychange", h);
          }function f() {
            O && (O.detachEvent("onpropertychange", h), O = null, R = null);
          }function h(e) {
            "value" === e.propertyName && l(R, e) && i(e);
          }function m(e, t, n) {
            "topFocus" === e ? (f(), d(t, n)) : "topBlur" === e && f();
          }function v(e, t, n) {
            if ("topSelectionChange" === e || "topKeyUp" === e || "topKeyDown" === e) return l(R, n);
          }function g(e) {
            var t = e.nodeName;return t && "input" === t.toLowerCase() && ("checkbox" === e.type || "radio" === e.type);
          }function y(e, t, n) {
            if ("topClick" === e) return l(t, n);
          }function _(e, t, n) {
            if ("topInput" === e || "topChange" === e) return l(t, n);
          }function C(e, t) {
            if (null != e) {
              var n = e._wrapperState || t._wrapperState;if (n && n.controlled && "number" === t.type) {
                var r = "" + t.value;t.getAttribute("value") !== r && t.setAttribute("value", r);
              }
            }
          }var b = e(16),
              E = e(19),
              x = e(124),
              w = e(33),
              T = e(71),
              k = e(80),
              P = e(108),
              S = e(102),
              N = e(110),
              M = e(111),
              I = { change: { phasedRegistrationNames: { bubbled: "onChange", captured: "onChangeCapture" }, dependencies: ["topBlur", "topChange", "topClick", "topFocus", "topInput", "topKeyDown", "topKeyUp", "topSelectionChange"] } },
              O = null,
              R = null,
              A = !1;x.canUseDOM && (A = N("change") && (!document.documentMode || document.documentMode > 8));var D = !1;x.canUseDOM && (D = N("input") && (!("documentMode" in document) || document.documentMode > 9));var L = { eventTypes: I, _allowSimulatedPassThrough: !0, _isInputEventSupported: D, extractEvents: function extractEvents(e, t, n, i) {
              var a,
                  s,
                  u = t ? w.getNodeFromInstance(t) : window;if (o(u) ? A ? a = c : s = p : M(u) ? D ? a = _ : (a = v, s = m) : g(u) && (a = y), a) {
                var l = a(e, t, n);if (l) return r(l, n, i);
              }s && s(e, u, t), "topBlur" === e && C(t, u);
            } };t.exports = L;
        }, { 102: 102, 108: 108, 110: 110, 111: 111, 124: 124, 16: 16, 19: 19, 33: 33, 71: 71, 80: 80 }], 8: [function (e, t, n) {
          "use strict";
          function r(e, t) {
            return Array.isArray(t) && (t = t[1]), t ? t.nextSibling : e.firstChild;
          }function o(e, t, n) {
            c.insertTreeBefore(e, t, n);
          }function i(e, t, n) {
            Array.isArray(t) ? s(e, t[0], t[1], n) : m(e, t, n);
          }function a(e, t) {
            if (Array.isArray(t)) {
              var n = t[1];t = t[0], u(e, t, n), e.removeChild(n);
            }e.removeChild(t);
          }function s(e, t, n, r) {
            for (var o = t;;) {
              var i = o.nextSibling;if (m(e, o, r), o === n) break;o = i;
            }
          }function u(e, t, n) {
            for (;;) {
              var r = t.nextSibling;if (r === n) break;e.removeChild(r);
            }
          }function l(e, t, n) {
            var r = e.parentNode,
                o = e.nextSibling;o === t ? n && m(r, document.createTextNode(n), o) : n ? (h(o, n), u(r, o, t)) : u(r, e, t);
          }var c = e(9),
              p = e(13),
              d = (e(33), e(58), e(93)),
              f = e(115),
              h = e(116),
              m = d(function (e, t, n) {
            e.insertBefore(t, n);
          }),
              v = p.dangerouslyReplaceNodeWithMarkup,
              g = { dangerouslyReplaceNodeWithMarkup: v, replaceDelimitedText: l, processUpdates: function processUpdates(e, t) {
              for (var n = 0; n < t.length; n++) {
                var s = t[n];switch (s.type) {case "INSERT_MARKUP":
                    o(e, s.content, r(e, s.afterNode));break;case "MOVE_EXISTING":
                    i(e, s.fromNode, r(e, s.afterNode));break;case "SET_MARKUP":
                    f(e, s.content);break;case "TEXT_CONTENT":
                    h(e, s.content);break;case "REMOVE_NODE":
                    a(e, s.fromNode);}
              }
            } };t.exports = g;
        }, { 115: 115, 116: 116, 13: 13, 33: 33, 58: 58, 9: 9, 93: 93 }], 9: [function (e, t, n) {
          "use strict";
          function r(e) {
            if (h) {
              var t = e.node,
                  n = e.children;if (n.length) for (var r = 0; r < n.length; r++) {
                m(t, n[r], null);
              } else null != e.html ? p(t, e.html) : null != e.text && f(t, e.text);
            }
          }function o(e, t) {
            e.parentNode.replaceChild(t.node, e), r(t);
          }function i(e, t) {
            h ? e.children.push(t) : e.node.appendChild(t.node);
          }function a(e, t) {
            h ? e.html = t : p(e.node, t);
          }function s(e, t) {
            h ? e.text = t : f(e.node, t);
          }function u() {
            return this.node.nodeName;
          }function l(e) {
            return { node: e, children: [], html: null, text: null, toString: u };
          }var c = e(10),
              p = e(115),
              d = e(93),
              f = e(116),
              h = "undefined" != typeof document && "number" == typeof document.documentMode || "undefined" != typeof navigator && "string" == typeof navigator.userAgent && /\bEdge\/\d/.test(navigator.userAgent),
              m = d(function (e, t, n) {
            11 === t.node.nodeType || 1 === t.node.nodeType && "object" === t.node.nodeName.toLowerCase() && (null == t.node.namespaceURI || t.node.namespaceURI === c.html) ? (r(t), e.insertBefore(t.node, n)) : (e.insertBefore(t.node, n), r(t));
          });l.insertTreeBefore = m, l.replaceChildWithTree = o, l.queueChild = i, l.queueHTML = a, l.queueText = s, t.exports = l;
        }, { 10: 10, 115: 115, 116: 116, 93: 93 }], 10: [function (e, t, n) {
          "use strict";
          var r = { html: "http://www.w3.org/1999/xhtml", mathml: "http://www.w3.org/1998/Math/MathML", svg: "http://www.w3.org/2000/svg" };t.exports = r;
        }, {}], 11: [function (e, t, n) {
          "use strict";
          function r(e, t) {
            return (e & t) === t;
          }var o = e(113),
              i = (e(138), { MUST_USE_PROPERTY: 1, HAS_BOOLEAN_VALUE: 4, HAS_NUMERIC_VALUE: 8, HAS_POSITIVE_NUMERIC_VALUE: 24, HAS_OVERLOADED_BOOLEAN_VALUE: 32, injectDOMPropertyConfig: function injectDOMPropertyConfig(e) {
              var t = i,
                  n = e.Properties || {},
                  a = e.DOMAttributeNamespaces || {},
                  u = e.DOMAttributeNames || {},
                  l = e.DOMPropertyNames || {},
                  c = e.DOMMutationMethods || {};e.isCustomAttribute && s._isCustomAttributeFunctions.push(e.isCustomAttribute);for (var p in n) {
                s.properties.hasOwnProperty(p) && o("48", p);var d = p.toLowerCase(),
                    f = n[p],
                    h = { attributeName: d, attributeNamespace: null, propertyName: p, mutationMethod: null, mustUseProperty: r(f, t.MUST_USE_PROPERTY), hasBooleanValue: r(f, t.HAS_BOOLEAN_VALUE), hasNumericValue: r(f, t.HAS_NUMERIC_VALUE), hasPositiveNumericValue: r(f, t.HAS_POSITIVE_NUMERIC_VALUE), hasOverloadedBooleanValue: r(f, t.HAS_OVERLOADED_BOOLEAN_VALUE) };if (h.hasBooleanValue + h.hasNumericValue + h.hasOverloadedBooleanValue <= 1 || o("50", p), u.hasOwnProperty(p)) {
                  var m = u[p];h.attributeName = m;
                }a.hasOwnProperty(p) && (h.attributeNamespace = a[p]), l.hasOwnProperty(p) && (h.propertyName = l[p]), c.hasOwnProperty(p) && (h.mutationMethod = c[p]), s.properties[p] = h;
              }
            } }),
              a = ":A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD",
              s = { ID_ATTRIBUTE_NAME: "data-reactid", ROOT_ATTRIBUTE_NAME: "data-reactroot", ATTRIBUTE_NAME_START_CHAR: a, ATTRIBUTE_NAME_CHAR: a + "\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040", properties: {}, getPossibleStandardName: null, _isCustomAttributeFunctions: [], isCustomAttribute: function isCustomAttribute(e) {
              for (var t = 0; t < s._isCustomAttributeFunctions.length; t++) {
                if ((0, s._isCustomAttributeFunctions[t])(e)) return !0;
              }return !1;
            }, injection: i };t.exports = s;
        }, { 113: 113, 138: 138 }], 12: [function (e, t, n) {
          "use strict";
          function r(e) {
            return !!l.hasOwnProperty(e) || !u.hasOwnProperty(e) && (s.test(e) ? (l[e] = !0, !0) : (u[e] = !0, !1));
          }function o(e, t) {
            return null == t || e.hasBooleanValue && !t || e.hasNumericValue && isNaN(t) || e.hasPositiveNumericValue && t < 1 || e.hasOverloadedBooleanValue && !1 === t;
          }var i = e(11),
              a = (e(33), e(58), e(112)),
              s = (e(143), new RegExp("^[" + i.ATTRIBUTE_NAME_START_CHAR + "][" + i.ATTRIBUTE_NAME_CHAR + "]*$")),
              u = {},
              l = {},
              c = { createMarkupForID: function createMarkupForID(e) {
              return i.ID_ATTRIBUTE_NAME + "=" + a(e);
            }, setAttributeForID: function setAttributeForID(e, t) {
              e.setAttribute(i.ID_ATTRIBUTE_NAME, t);
            }, createMarkupForRoot: function createMarkupForRoot() {
              return i.ROOT_ATTRIBUTE_NAME + '=""';
            }, setAttributeForRoot: function setAttributeForRoot(e) {
              e.setAttribute(i.ROOT_ATTRIBUTE_NAME, "");
            }, createMarkupForProperty: function createMarkupForProperty(e, t) {
              var n = i.properties.hasOwnProperty(e) ? i.properties[e] : null;if (n) {
                if (o(n, t)) return "";var r = n.attributeName;return n.hasBooleanValue || n.hasOverloadedBooleanValue && !0 === t ? r + '=""' : r + "=" + a(t);
              }return i.isCustomAttribute(e) ? null == t ? "" : e + "=" + a(t) : null;
            }, createMarkupForCustomAttribute: function createMarkupForCustomAttribute(e, t) {
              return r(e) && null != t ? e + "=" + a(t) : "";
            }, setValueForProperty: function setValueForProperty(e, t, n) {
              var r = i.properties.hasOwnProperty(t) ? i.properties[t] : null;if (r) {
                var a = r.mutationMethod;if (a) a(e, n);else {
                  if (o(r, n)) return void this.deleteValueForProperty(e, t);if (r.mustUseProperty) e[r.propertyName] = n;else {
                    var s = r.attributeName,
                        u = r.attributeNamespace;u ? e.setAttributeNS(u, s, "" + n) : r.hasBooleanValue || r.hasOverloadedBooleanValue && !0 === n ? e.setAttribute(s, "") : e.setAttribute(s, "" + n);
                  }
                }
              } else if (i.isCustomAttribute(t)) return void c.setValueForAttribute(e, t, n);
            }, setValueForAttribute: function setValueForAttribute(e, t, n) {
              r(t) && (null == n ? e.removeAttribute(t) : e.setAttribute(t, "" + n));
            }, deleteValueForAttribute: function deleteValueForAttribute(e, t) {
              e.removeAttribute(t);
            }, deleteValueForProperty: function deleteValueForProperty(e, t) {
              var n = i.properties.hasOwnProperty(t) ? i.properties[t] : null;if (n) {
                var r = n.mutationMethod;if (r) r(e, void 0);else if (n.mustUseProperty) {
                  var o = n.propertyName;n.hasBooleanValue ? e[o] = !1 : e[o] = "";
                } else e.removeAttribute(n.attributeName);
              } else i.isCustomAttribute(t) && e.removeAttribute(t);
            } };t.exports = c;
        }, { 11: 11, 112: 112, 143: 143, 33: 33, 58: 58 }], 13: [function (e, t, n) {
          "use strict";
          var r = e(113),
              o = e(9),
              i = e(124),
              a = e(129),
              s = e(130),
              u = (e(138), { dangerouslyReplaceNodeWithMarkup: function dangerouslyReplaceNodeWithMarkup(e, t) {
              if (i.canUseDOM || r("56"), t || r("57"), "HTML" === e.nodeName && r("58"), "string" == typeof t) {
                var n = a(t, s)[0];e.parentNode.replaceChild(n, e);
              } else o.replaceChildWithTree(e, t);
            } });t.exports = u;
        }, { 113: 113, 124: 124, 129: 129, 130: 130, 138: 138, 9: 9 }], 14: [function (e, t, n) {
          "use strict";
          var r = ["ResponderEventPlugin", "SimpleEventPlugin", "TapEventPlugin", "EnterLeaveEventPlugin", "ChangeEventPlugin", "SelectEventPlugin", "BeforeInputEventPlugin"];t.exports = r;
        }, {}], 15: [function (e, t, n) {
          "use strict";
          var r = e(19),
              o = e(33),
              i = e(84),
              a = { mouseEnter: { registrationName: "onMouseEnter", dependencies: ["topMouseOut", "topMouseOver"] }, mouseLeave: { registrationName: "onMouseLeave", dependencies: ["topMouseOut", "topMouseOver"] } },
              s = { eventTypes: a, extractEvents: function extractEvents(e, t, n, s) {
              if ("topMouseOver" === e && (n.relatedTarget || n.fromElement)) return null;if ("topMouseOut" !== e && "topMouseOver" !== e) return null;var u;if (s.window === s) u = s;else {
                var l = s.ownerDocument;u = l ? l.defaultView || l.parentWindow : window;
              }var c, p;if ("topMouseOut" === e) {
                c = t;var d = n.relatedTarget || n.toElement;p = d ? o.getClosestInstanceFromNode(d) : null;
              } else c = null, p = t;if (c === p) return null;var f = null == c ? u : o.getNodeFromInstance(c),
                  h = null == p ? u : o.getNodeFromInstance(p),
                  m = i.getPooled(a.mouseLeave, c, n, s);m.type = "mouseleave", m.target = f, m.relatedTarget = h;var v = i.getPooled(a.mouseEnter, p, n, s);return v.type = "mouseenter", v.target = h, v.relatedTarget = f, r.accumulateEnterLeaveDispatches(m, v, c, p), [m, v];
            } };t.exports = s;
        }, { 19: 19, 33: 33, 84: 84 }], 16: [function (e, t, n) {
          "use strict";
          function r(e) {
            return "button" === e || "input" === e || "select" === e || "textarea" === e;
          }function o(e, t, n) {
            switch (e) {case "onClick":case "onClickCapture":case "onDoubleClick":case "onDoubleClickCapture":case "onMouseDown":case "onMouseDownCapture":case "onMouseMove":case "onMouseMoveCapture":case "onMouseUp":case "onMouseUpCapture":
                return !(!n.disabled || !r(t));default:
                return !1;}
          }var i = e(113),
              a = e(17),
              s = e(18),
              u = e(50),
              l = e(91),
              c = e(98),
              p = (e(138), {}),
              d = null,
              f = function f(e, t) {
            e && (s.executeDispatchesInOrder(e, t), e.isPersistent() || e.constructor.release(e));
          },
              h = function h(e) {
            return f(e, !0);
          },
              m = function m(e) {
            return f(e, !1);
          },
              v = function v(e) {
            return "." + e._rootNodeID;
          },
              g = { injection: { injectEventPluginOrder: a.injectEventPluginOrder, injectEventPluginsByName: a.injectEventPluginsByName }, putListener: function putListener(e, t, n) {
              "function" != typeof n && i("94", t, typeof n === "undefined" ? "undefined" : _typeof(n));var r = v(e);(p[t] || (p[t] = {}))[r] = n;var o = a.registrationNameModules[t];o && o.didPutListener && o.didPutListener(e, t, n);
            }, getListener: function getListener(e, t) {
              var n = p[t];if (o(t, e._currentElement.type, e._currentElement.props)) return null;var r = v(e);return n && n[r];
            }, deleteListener: function deleteListener(e, t) {
              var n = a.registrationNameModules[t];n && n.willDeleteListener && n.willDeleteListener(e, t);var r = p[t];r && delete r[v(e)];
            }, deleteAllListeners: function deleteAllListeners(e) {
              var t = v(e);for (var n in p) {
                if (p.hasOwnProperty(n) && p[n][t]) {
                  var r = a.registrationNameModules[n];r && r.willDeleteListener && r.willDeleteListener(e, n), delete p[n][t];
                }
              }
            }, extractEvents: function extractEvents(e, t, n, r) {
              for (var o, i = a.plugins, s = 0; s < i.length; s++) {
                var u = i[s];if (u) {
                  var c = u.extractEvents(e, t, n, r);c && (o = l(o, c));
                }
              }return o;
            }, enqueueEvents: function enqueueEvents(e) {
              e && (d = l(d, e));
            }, processEventQueue: function processEventQueue(e) {
              var t = d;d = null, e ? c(t, h) : c(t, m), d && i("95"), u.rethrowCaughtError();
            }, __purge: function __purge() {
              p = {};
            }, __getListenerBank: function __getListenerBank() {
              return p;
            } };t.exports = g;
        }, { 113: 113, 138: 138, 17: 17, 18: 18, 50: 50, 91: 91, 98: 98 }], 17: [function (e, t, n) {
          "use strict";
          function r() {
            if (s) for (var e in u) {
              var t = u[e],
                  n = s.indexOf(e);if (n > -1 || a("96", e), !l.plugins[n]) {
                t.extractEvents || a("97", e), l.plugins[n] = t;var r = t.eventTypes;for (var i in r) {
                  o(r[i], t, i) || a("98", i, e);
                }
              }
            }
          }function o(e, t, n) {
            l.eventNameDispatchConfigs.hasOwnProperty(n) && a("99", n), l.eventNameDispatchConfigs[n] = e;var r = e.phasedRegistrationNames;if (r) {
              for (var o in r) {
                if (r.hasOwnProperty(o)) {
                  var s = r[o];i(s, t, n);
                }
              }return !0;
            }return !!e.registrationName && (i(e.registrationName, t, n), !0);
          }function i(e, t, n) {
            l.registrationNameModules[e] && a("100", e), l.registrationNameModules[e] = t, l.registrationNameDependencies[e] = t.eventTypes[n].dependencies;
          }var a = e(113),
              s = (e(138), null),
              u = {},
              l = { plugins: [], eventNameDispatchConfigs: {}, registrationNameModules: {}, registrationNameDependencies: {}, possibleRegistrationNames: null, injectEventPluginOrder: function injectEventPluginOrder(e) {
              s && a("101"), s = Array.prototype.slice.call(e), r();
            }, injectEventPluginsByName: function injectEventPluginsByName(e) {
              var t = !1;for (var n in e) {
                if (e.hasOwnProperty(n)) {
                  var o = e[n];u.hasOwnProperty(n) && u[n] === o || (u[n] && a("102", n), u[n] = o, t = !0);
                }
              }t && r();
            }, getPluginModuleForEvent: function getPluginModuleForEvent(e) {
              var t = e.dispatchConfig;if (t.registrationName) return l.registrationNameModules[t.registrationName] || null;if (void 0 !== t.phasedRegistrationNames) {
                var n = t.phasedRegistrationNames;for (var r in n) {
                  if (n.hasOwnProperty(r)) {
                    var o = l.registrationNameModules[n[r]];if (o) return o;
                  }
                }
              }return null;
            }, _resetEventPlugins: function _resetEventPlugins() {
              s = null;for (var e in u) {
                u.hasOwnProperty(e) && delete u[e];
              }l.plugins.length = 0;var t = l.eventNameDispatchConfigs;for (var n in t) {
                t.hasOwnProperty(n) && delete t[n];
              }var r = l.registrationNameModules;for (var o in r) {
                r.hasOwnProperty(o) && delete r[o];
              }
            } };t.exports = l;
        }, { 113: 113, 138: 138 }], 18: [function (e, t, n) {
          "use strict";
          function r(e) {
            return "topMouseUp" === e || "topTouchEnd" === e || "topTouchCancel" === e;
          }function o(e) {
            return "topMouseMove" === e || "topTouchMove" === e;
          }function i(e) {
            return "topMouseDown" === e || "topTouchStart" === e;
          }function a(e, t, n, r) {
            var o = e.type || "unknown-event";e.currentTarget = g.getNodeFromInstance(r), t ? m.invokeGuardedCallbackWithCatch(o, n, e) : m.invokeGuardedCallback(o, n, e), e.currentTarget = null;
          }function s(e, t) {
            var n = e._dispatchListeners,
                r = e._dispatchInstances;if (Array.isArray(n)) for (var o = 0; o < n.length && !e.isPropagationStopped(); o++) {
              a(e, t, n[o], r[o]);
            } else n && a(e, t, n, r);e._dispatchListeners = null, e._dispatchInstances = null;
          }function u(e) {
            var t = e._dispatchListeners,
                n = e._dispatchInstances;if (Array.isArray(t)) {
              for (var r = 0; r < t.length && !e.isPropagationStopped(); r++) {
                if (t[r](e, n[r])) return n[r];
              }
            } else if (t && t(e, n)) return n;return null;
          }function l(e) {
            var t = u(e);return e._dispatchInstances = null, e._dispatchListeners = null, t;
          }function c(e) {
            var t = e._dispatchListeners,
                n = e._dispatchInstances;Array.isArray(t) && h("103"), e.currentTarget = t ? g.getNodeFromInstance(n) : null;var r = t ? t(e) : null;return e.currentTarget = null, e._dispatchListeners = null, e._dispatchInstances = null, r;
          }function p(e) {
            return !!e._dispatchListeners;
          }var d,
              f,
              h = e(113),
              m = e(50),
              v = (e(138), e(143), { injectComponentTree: function injectComponentTree(e) {
              d = e;
            }, injectTreeTraversal: function injectTreeTraversal(e) {
              f = e;
            } }),
              g = { isEndish: r, isMoveish: o, isStartish: i, executeDirectDispatch: c, executeDispatchesInOrder: s, executeDispatchesInOrderStopAtTrue: l, hasDispatches: p, getInstanceFromNode: function getInstanceFromNode(e) {
              return d.getInstanceFromNode(e);
            }, getNodeFromInstance: function getNodeFromInstance(e) {
              return d.getNodeFromInstance(e);
            }, isAncestor: function isAncestor(e, t) {
              return f.isAncestor(e, t);
            }, getLowestCommonAncestor: function getLowestCommonAncestor(e, t) {
              return f.getLowestCommonAncestor(e, t);
            }, getParentInstance: function getParentInstance(e) {
              return f.getParentInstance(e);
            }, traverseTwoPhase: function traverseTwoPhase(e, t, n) {
              return f.traverseTwoPhase(e, t, n);
            }, traverseEnterLeave: function traverseEnterLeave(e, t, n, r, o) {
              return f.traverseEnterLeave(e, t, n, r, o);
            }, injection: v };t.exports = g;
        }, { 113: 113, 138: 138, 143: 143, 50: 50 }], 19: [function (e, t, n) {
          "use strict";
          function r(e, t, n) {
            var r = t.dispatchConfig.phasedRegistrationNames[n];return g(e, r);
          }function o(e, t, n) {
            var o = r(e, n, t);o && (n._dispatchListeners = m(n._dispatchListeners, o), n._dispatchInstances = m(n._dispatchInstances, e));
          }function i(e) {
            e && e.dispatchConfig.phasedRegistrationNames && h.traverseTwoPhase(e._targetInst, o, e);
          }function a(e) {
            if (e && e.dispatchConfig.phasedRegistrationNames) {
              var t = e._targetInst,
                  n = t ? h.getParentInstance(t) : null;h.traverseTwoPhase(n, o, e);
            }
          }function s(e, t, n) {
            if (n && n.dispatchConfig.registrationName) {
              var r = n.dispatchConfig.registrationName,
                  o = g(e, r);o && (n._dispatchListeners = m(n._dispatchListeners, o), n._dispatchInstances = m(n._dispatchInstances, e));
            }
          }function u(e) {
            e && e.dispatchConfig.registrationName && s(e._targetInst, null, e);
          }function l(e) {
            v(e, i);
          }function c(e) {
            v(e, a);
          }function p(e, t, n, r) {
            h.traverseEnterLeave(n, r, s, e, t);
          }function d(e) {
            v(e, u);
          }var f = e(16),
              h = e(18),
              m = e(91),
              v = e(98),
              g = (e(143), f.getListener),
              y = { accumulateTwoPhaseDispatches: l, accumulateTwoPhaseDispatchesSkipTarget: c, accumulateDirectDispatches: d, accumulateEnterLeaveDispatches: p };t.exports = y;
        }, { 143: 143, 16: 16, 18: 18, 91: 91, 98: 98 }], 20: [function (e, t, n) {
          "use strict";
          function r(e) {
            this._root = e, this._startText = this.getText(), this._fallbackText = null;
          }var o = e(144),
              i = e(24),
              a = e(106);o(r.prototype, { destructor: function destructor() {
              this._root = null, this._startText = null, this._fallbackText = null;
            }, getText: function getText() {
              return "value" in this._root ? this._root.value : this._root[a()];
            }, getData: function getData() {
              if (this._fallbackText) return this._fallbackText;var e,
                  t,
                  n = this._startText,
                  r = n.length,
                  o = this.getText(),
                  i = o.length;for (e = 0; e < r && n[e] === o[e]; e++) {}var a = r - e;for (t = 1; t <= a && n[r - t] === o[i - t]; t++) {}var s = t > 1 ? 1 - t : void 0;return this._fallbackText = o.slice(e, s), this._fallbackText;
            } }), i.addPoolingTo(r), t.exports = r;
        }, { 106: 106, 144: 144, 24: 24 }], 21: [function (e, t, n) {
          "use strict";
          var r = e(11),
              o = r.injection.MUST_USE_PROPERTY,
              i = r.injection.HAS_BOOLEAN_VALUE,
              a = r.injection.HAS_NUMERIC_VALUE,
              s = r.injection.HAS_POSITIVE_NUMERIC_VALUE,
              u = r.injection.HAS_OVERLOADED_BOOLEAN_VALUE,
              l = { isCustomAttribute: RegExp.prototype.test.bind(new RegExp("^(data|aria)-[" + r.ATTRIBUTE_NAME_CHAR + "]*$")), Properties: { accept: 0, acceptCharset: 0, accessKey: 0, action: 0, allowFullScreen: i, allowTransparency: 0, alt: 0, as: 0, async: i, autoComplete: 0, autoPlay: i, capture: i, cellPadding: 0, cellSpacing: 0, charSet: 0, challenge: 0, checked: o | i, cite: 0, classID: 0, className: 0, cols: s, colSpan: 0, content: 0, contentEditable: 0, contextMenu: 0, controls: i, coords: 0, crossOrigin: 0, data: 0, dateTime: 0, default: i, defer: i, dir: 0, disabled: i, download: u, draggable: 0, encType: 0, form: 0, formAction: 0, formEncType: 0, formMethod: 0, formNoValidate: i, formTarget: 0, frameBorder: 0, headers: 0, height: 0, hidden: i, high: 0, href: 0, hrefLang: 0, htmlFor: 0, httpEquiv: 0, icon: 0, id: 0, inputMode: 0, integrity: 0, is: 0, keyParams: 0, keyType: 0, kind: 0, label: 0, lang: 0, list: 0, loop: i, low: 0, manifest: 0, marginHeight: 0, marginWidth: 0, max: 0, maxLength: 0, media: 0, mediaGroup: 0, method: 0, min: 0, minLength: 0, multiple: o | i, muted: o | i, name: 0, nonce: 0, noValidate: i, open: i, optimum: 0, pattern: 0, placeholder: 0, playsInline: i, poster: 0, preload: 0, profile: 0, radioGroup: 0, readOnly: i, referrerPolicy: 0, rel: 0, required: i, reversed: i, role: 0, rows: s, rowSpan: a, sandbox: 0, scope: 0, scoped: i, scrolling: 0, seamless: i, selected: o | i, shape: 0, size: s, sizes: 0, span: s, spellCheck: 0, src: 0, srcDoc: 0, srcLang: 0, srcSet: 0, start: a, step: 0, style: 0, summary: 0, tabIndex: 0, target: 0, title: 0, type: 0, useMap: 0, value: 0, width: 0, wmode: 0, wrap: 0, about: 0, datatype: 0, inlist: 0, prefix: 0, property: 0, resource: 0, typeof: 0, vocab: 0, autoCapitalize: 0, autoCorrect: 0, autoSave: 0, color: 0, itemProp: 0, itemScope: i, itemType: 0, itemID: 0, itemRef: 0, results: 0, security: 0, unselectable: 0 }, DOMAttributeNames: { acceptCharset: "accept-charset", className: "class", htmlFor: "for", httpEquiv: "http-equiv" }, DOMPropertyNames: {}, DOMMutationMethods: { value: function value(e, t) {
                if (null == t) return e.removeAttribute("value");"number" !== e.type || !1 === e.hasAttribute("value") ? e.setAttribute("value", "" + t) : e.validity && !e.validity.badInput && e.ownerDocument.activeElement !== e && e.setAttribute("value", "" + t);
              } } };t.exports = l;
        }, { 11: 11 }], 22: [function (e, t, n) {
          "use strict";
          function r(e) {
            var t = { "=": "=0", ":": "=2" };return "$" + ("" + e).replace(/[=:]/g, function (e) {
              return t[e];
            });
          }function o(e) {
            var t = /(=0|=2)/g,
                n = { "=0": "=", "=2": ":" };return ("" + ("." === e[0] && "$" === e[1] ? e.substring(2) : e.substring(1))).replace(t, function (e) {
              return n[e];
            });
          }var i = { escape: r, unescape: o };t.exports = i;
        }, {}], 23: [function (e, t, n) {
          "use strict";
          function r(e) {
            null != e.checkedLink && null != e.valueLink && s("87");
          }function o(e) {
            r(e), (null != e.value || null != e.onChange) && s("88");
          }function i(e) {
            r(e), (null != e.checked || null != e.onChange) && s("89");
          }function a(e) {
            if (e) {
              var t = e.getName();if (t) return " Check the render method of `" + t + "`.";
            }return "";
          }var s = e(113),
              u = e(64),
              l = e(146),
              c = e(121),
              p = l(c.isValidElement),
              d = (e(138), e(143), { button: !0, checkbox: !0, image: !0, hidden: !0, radio: !0, reset: !0, submit: !0 }),
              f = { value: function value(e, t, n) {
              return !e[t] || d[e.type] || e.onChange || e.readOnly || e.disabled ? null : new Error("You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`.");
            }, checked: function checked(e, t, n) {
              return !e[t] || e.onChange || e.readOnly || e.disabled ? null : new Error("You provided a `checked` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultChecked`. Otherwise, set either `onChange` or `readOnly`.");
            }, onChange: p.func },
              h = {},
              m = { checkPropTypes: function checkPropTypes(e, t, n) {
              for (var r in f) {
                if (f.hasOwnProperty(r)) var o = f[r](t, r, e, "prop", null, u);o instanceof Error && !(o.message in h) && (h[o.message] = !0, a(n));
              }
            }, getValue: function getValue(e) {
              return e.valueLink ? (o(e), e.valueLink.value) : e.value;
            }, getChecked: function getChecked(e) {
              return e.checkedLink ? (i(e), e.checkedLink.value) : e.checked;
            }, executeOnChange: function executeOnChange(e, t) {
              return e.valueLink ? (o(e), e.valueLink.requestChange(t.target.value)) : e.checkedLink ? (i(e), e.checkedLink.requestChange(t.target.checked)) : e.onChange ? e.onChange.call(void 0, t) : void 0;
            } };t.exports = m;
        }, { 113: 113, 121: 121, 138: 138, 143: 143, 146: 146, 64: 64 }], 24: [function (e, t, n) {
          "use strict";
          var r = e(113),
              o = (e(138), function (e) {
            var t = this;if (t.instancePool.length) {
              var n = t.instancePool.pop();return t.call(n, e), n;
            }return new t(e);
          }),
              i = function i(e, t) {
            var n = this;if (n.instancePool.length) {
              var r = n.instancePool.pop();return n.call(r, e, t), r;
            }return new n(e, t);
          },
              a = function a(e, t, n) {
            var r = this;if (r.instancePool.length) {
              var o = r.instancePool.pop();return r.call(o, e, t, n), o;
            }return new r(e, t, n);
          },
              s = function s(e, t, n, r) {
            var o = this;if (o.instancePool.length) {
              var i = o.instancePool.pop();return o.call(i, e, t, n, r), i;
            }return new o(e, t, n, r);
          },
              u = function u(e) {
            var t = this;e instanceof t || r("25"), e.destructor(), t.instancePool.length < t.poolSize && t.instancePool.push(e);
          },
              l = o,
              c = function c(e, t) {
            var n = e;return n.instancePool = [], n.getPooled = t || l, n.poolSize || (n.poolSize = 10), n.release = u, n;
          },
              p = { addPoolingTo: c, oneArgumentPooler: o, twoArgumentPooler: i, threeArgumentPooler: a, fourArgumentPooler: s };t.exports = p;
        }, { 113: 113, 138: 138 }], 25: [function (e, t, n) {
          "use strict";
          function r(e) {
            return Object.prototype.hasOwnProperty.call(e, m) || (e[m] = f++, p[e[m]] = {}), p[e[m]];
          }var o,
              i = e(144),
              a = e(17),
              s = e(51),
              u = e(90),
              l = e(107),
              c = e(110),
              p = {},
              d = !1,
              f = 0,
              h = { topAbort: "abort", topAnimationEnd: l("animationend") || "animationend", topAnimationIteration: l("animationiteration") || "animationiteration", topAnimationStart: l("animationstart") || "animationstart", topBlur: "blur", topCanPlay: "canplay", topCanPlayThrough: "canplaythrough", topChange: "change", topClick: "click", topCompositionEnd: "compositionend", topCompositionStart: "compositionstart", topCompositionUpdate: "compositionupdate", topContextMenu: "contextmenu", topCopy: "copy", topCut: "cut", topDoubleClick: "dblclick", topDrag: "drag", topDragEnd: "dragend", topDragEnter: "dragenter", topDragExit: "dragexit", topDragLeave: "dragleave", topDragOver: "dragover", topDragStart: "dragstart", topDrop: "drop", topDurationChange: "durationchange", topEmptied: "emptied", topEncrypted: "encrypted", topEnded: "ended", topError: "error", topFocus: "focus", topInput: "input",
            topKeyDown: "keydown", topKeyPress: "keypress", topKeyUp: "keyup", topLoadedData: "loadeddata", topLoadedMetadata: "loadedmetadata", topLoadStart: "loadstart", topMouseDown: "mousedown", topMouseMove: "mousemove", topMouseOut: "mouseout", topMouseOver: "mouseover", topMouseUp: "mouseup", topPaste: "paste", topPause: "pause", topPlay: "play", topPlaying: "playing", topProgress: "progress", topRateChange: "ratechange", topScroll: "scroll", topSeeked: "seeked", topSeeking: "seeking", topSelectionChange: "selectionchange", topStalled: "stalled", topSuspend: "suspend", topTextInput: "textInput", topTimeUpdate: "timeupdate", topTouchCancel: "touchcancel", topTouchEnd: "touchend", topTouchMove: "touchmove", topTouchStart: "touchstart", topTransitionEnd: l("transitionend") || "transitionend", topVolumeChange: "volumechange", topWaiting: "waiting", topWheel: "wheel" },
              m = "_reactListenersID" + String(Math.random()).slice(2),
              v = i({}, s, { ReactEventListener: null, injection: { injectReactEventListener: function injectReactEventListener(e) {
                e.setHandleTopLevel(v.handleTopLevel), v.ReactEventListener = e;
              } }, setEnabled: function setEnabled(e) {
              v.ReactEventListener && v.ReactEventListener.setEnabled(e);
            }, isEnabled: function isEnabled() {
              return !(!v.ReactEventListener || !v.ReactEventListener.isEnabled());
            }, listenTo: function listenTo(e, t) {
              for (var n = t, o = r(n), i = a.registrationNameDependencies[e], s = 0; s < i.length; s++) {
                var u = i[s];o.hasOwnProperty(u) && o[u] || ("topWheel" === u ? c("wheel") ? v.ReactEventListener.trapBubbledEvent("topWheel", "wheel", n) : c("mousewheel") ? v.ReactEventListener.trapBubbledEvent("topWheel", "mousewheel", n) : v.ReactEventListener.trapBubbledEvent("topWheel", "DOMMouseScroll", n) : "topScroll" === u ? c("scroll", !0) ? v.ReactEventListener.trapCapturedEvent("topScroll", "scroll", n) : v.ReactEventListener.trapBubbledEvent("topScroll", "scroll", v.ReactEventListener.WINDOW_HANDLE) : "topFocus" === u || "topBlur" === u ? (c("focus", !0) ? (v.ReactEventListener.trapCapturedEvent("topFocus", "focus", n), v.ReactEventListener.trapCapturedEvent("topBlur", "blur", n)) : c("focusin") && (v.ReactEventListener.trapBubbledEvent("topFocus", "focusin", n), v.ReactEventListener.trapBubbledEvent("topBlur", "focusout", n)), o.topBlur = !0, o.topFocus = !0) : h.hasOwnProperty(u) && v.ReactEventListener.trapBubbledEvent(u, h[u], n), o[u] = !0);
              }
            }, trapBubbledEvent: function trapBubbledEvent(e, t, n) {
              return v.ReactEventListener.trapBubbledEvent(e, t, n);
            }, trapCapturedEvent: function trapCapturedEvent(e, t, n) {
              return v.ReactEventListener.trapCapturedEvent(e, t, n);
            }, supportsEventPageXY: function supportsEventPageXY() {
              if (!document.createEvent) return !1;var e = document.createEvent("MouseEvent");return null != e && "pageX" in e;
            }, ensureScrollValueMonitoring: function ensureScrollValueMonitoring() {
              if (void 0 === o && (o = v.supportsEventPageXY()), !o && !d) {
                var e = u.refreshScrollValues;v.ReactEventListener.monitorScrollValue(e), d = !0;
              }
            } });t.exports = v;
        }, { 107: 107, 110: 110, 144: 144, 17: 17, 51: 51, 90: 90 }], 26: [function (e, t, n) {
          (function (n) {
            "use strict";
            function r(e, t, n, r) {
              var o = void 0 === e[n];null != t && o && (e[n] = i(t, !0));
            }var o = e(66),
                i = e(109),
                a = (e(22), e(117)),
                s = e(118);e(143);void 0 !== n && n.env;var u = { instantiateChildren: function instantiateChildren(e, t, n, o) {
                if (null == e) return null;var i = {};return s(e, r, i), i;
              }, updateChildren: function updateChildren(e, t, n, r, s, u, l, c, p) {
                if (t || e) {
                  var d, f;for (d in t) {
                    if (t.hasOwnProperty(d)) {
                      f = e && e[d];var h = f && f._currentElement,
                          m = t[d];if (null != f && a(h, m)) o.receiveComponent(f, m, s, c), t[d] = f;else {
                        f && (r[d] = o.getHostNode(f), o.unmountComponent(f, !1));var v = i(m, !0);t[d] = v;var g = o.mountComponent(v, s, u, l, c, p);n.push(g);
                      }
                    }
                  }for (d in e) {
                    !e.hasOwnProperty(d) || t && t.hasOwnProperty(d) || (f = e[d], r[d] = o.getHostNode(f), o.unmountComponent(f, !1));
                  }
                }
              }, unmountChildren: function unmountChildren(e, t) {
                for (var n in e) {
                  if (e.hasOwnProperty(n)) {
                    var r = e[n];o.unmountComponent(r, t);
                  }
                }
              } };t.exports = u;
          }).call(this, void 0);
        }, { 109: 109, 117: 117, 118: 118, 143: 143, 22: 22, 66: 66 }], 27: [function (e, t, n) {
          "use strict";
          var r = e(8),
              o = e(37),
              i = { processChildrenUpdates: o.dangerouslyProcessChildrenUpdates, replaceNodeWithMarkup: r.dangerouslyReplaceNodeWithMarkup };t.exports = i;
        }, { 37: 37, 8: 8 }], 28: [function (e, t, n) {
          "use strict";
          var r = e(113),
              o = (e(138), !1),
              i = { replaceNodeWithMarkup: null, processChildrenUpdates: null, injection: { injectEnvironment: function injectEnvironment(e) {
                o && r("104"), i.replaceNodeWithMarkup = e.replaceNodeWithMarkup, i.processChildrenUpdates = e.processChildrenUpdates, o = !0;
              } } };t.exports = i;
        }, { 113: 113, 138: 138 }], 29: [function (e, t, n) {
          "use strict";
          function r(e) {}function o(e) {
            return !(!e.prototype || !e.prototype.isReactComponent);
          }function i(e) {
            return !(!e.prototype || !e.prototype.isPureReactComponent);
          }var a = e(113),
              s = e(144),
              u = e(121),
              l = e(28),
              c = e(120),
              p = e(50),
              d = e(57),
              f = (e(58), e(62)),
              h = e(66),
              m = e(131),
              v = (e(138), e(142)),
              g = e(117),
              y = (e(143), { ImpureClass: 0, PureClass: 1, StatelessFunctional: 2 });r.prototype.render = function () {
            var e = d.get(this)._currentElement.type,
                t = e(this.props, this.context, this.updater);return t;
          };var _ = 1,
              C = { construct: function construct(e) {
              this._currentElement = e, this._rootNodeID = 0, this._compositeType = null, this._instance = null, this._hostParent = null, this._hostContainerInfo = null, this._updateBatchNumber = null, this._pendingElement = null, this._pendingStateQueue = null, this._pendingReplaceState = !1, this._pendingForceUpdate = !1, this._renderedNodeType = null, this._renderedComponent = null, this._context = null, this._mountOrder = 0, this._topLevelWrapper = null, this._pendingCallbacks = null, this._calledComponentWillUnmount = !1;
            }, mountComponent: function mountComponent(e, t, n, s) {
              this._context = s, this._mountOrder = _++, this._hostParent = t, this._hostContainerInfo = n;var l,
                  c = this._currentElement.props,
                  p = this._processContext(s),
                  f = this._currentElement.type,
                  h = e.getUpdateQueue(),
                  v = o(f),
                  g = this._constructComponent(v, c, p, h);v || null != g && null != g.render ? i(f) ? this._compositeType = y.PureClass : this._compositeType = y.ImpureClass : (l = g, null === g || !1 === g || u.isValidElement(g) || a("105", f.displayName || f.name || "Component"), g = new r(f), this._compositeType = y.StatelessFunctional), g.props = c, g.context = p, g.refs = m, g.updater = h, this._instance = g, d.set(g, this);var C = g.state;void 0 === C && (g.state = C = null), ("object" != (typeof C === "undefined" ? "undefined" : _typeof(C)) || Array.isArray(C)) && a("106", this.getName() || "ReactCompositeComponent"), this._pendingStateQueue = null, this._pendingReplaceState = !1, this._pendingForceUpdate = !1;var b;return b = g.unstable_handleError ? this.performInitialMountWithErrorHandling(l, t, n, e, s) : this.performInitialMount(l, t, n, e, s), g.componentDidMount && e.getReactMountReady().enqueue(g.componentDidMount, g), b;
            }, _constructComponent: function _constructComponent(e, t, n, r) {
              return this._constructComponentWithoutOwner(e, t, n, r);
            }, _constructComponentWithoutOwner: function _constructComponentWithoutOwner(e, t, n, r) {
              var o = this._currentElement.type;return e ? new o(t, n, r) : o(t, n, r);
            }, performInitialMountWithErrorHandling: function performInitialMountWithErrorHandling(e, t, n, r, o) {
              var i,
                  a = r.checkpoint();try {
                i = this.performInitialMount(e, t, n, r, o);
              } catch (s) {
                r.rollback(a), this._instance.unstable_handleError(s), this._pendingStateQueue && (this._instance.state = this._processPendingState(this._instance.props, this._instance.context)), a = r.checkpoint(), this._renderedComponent.unmountComponent(!0), r.rollback(a), i = this.performInitialMount(e, t, n, r, o);
              }return i;
            }, performInitialMount: function performInitialMount(e, t, n, r, o) {
              var i = this._instance;i.componentWillMount && (i.componentWillMount(), this._pendingStateQueue && (i.state = this._processPendingState(i.props, i.context))), void 0 === e && (e = this._renderValidatedComponent());var a = f.getType(e);this._renderedNodeType = a;var s = this._instantiateReactComponent(e, a !== f.EMPTY);return this._renderedComponent = s, h.mountComponent(s, r, t, n, this._processChildContext(o), 0);
            }, getHostNode: function getHostNode() {
              return h.getHostNode(this._renderedComponent);
            }, unmountComponent: function unmountComponent(e) {
              if (this._renderedComponent) {
                var t = this._instance;if (t.componentWillUnmount && !t._calledComponentWillUnmount) if (t._calledComponentWillUnmount = !0, e) {
                  var n = this.getName() + ".componentWillUnmount()";p.invokeGuardedCallback(n, t.componentWillUnmount.bind(t));
                } else t.componentWillUnmount();this._renderedComponent && (h.unmountComponent(this._renderedComponent, e), this._renderedNodeType = null, this._renderedComponent = null, this._instance = null), this._pendingStateQueue = null, this._pendingReplaceState = !1, this._pendingForceUpdate = !1, this._pendingCallbacks = null, this._pendingElement = null, this._context = null, this._rootNodeID = 0, this._topLevelWrapper = null, d.remove(t);
              }
            }, _maskContext: function _maskContext(e) {
              var t = this._currentElement.type,
                  n = t.contextTypes;if (!n) return m;var r = {};for (var o in n) {
                r[o] = e[o];
              }return r;
            }, _processContext: function _processContext(e) {
              return this._maskContext(e);
            }, _processChildContext: function _processChildContext(e) {
              var t,
                  n = this._currentElement.type,
                  r = this._instance;if (r.getChildContext && (t = r.getChildContext()), t) {
                "object" != _typeof(n.childContextTypes) && a("107", this.getName() || "ReactCompositeComponent");for (var o in t) {
                  o in n.childContextTypes || a("108", this.getName() || "ReactCompositeComponent", o);
                }return s({}, e, t);
              }return e;
            }, _checkContextTypes: function _checkContextTypes(e, t, n) {}, receiveComponent: function receiveComponent(e, t, n) {
              var r = this._currentElement,
                  o = this._context;this._pendingElement = null, this.updateComponent(t, r, e, o, n);
            }, performUpdateIfNecessary: function performUpdateIfNecessary(e) {
              null != this._pendingElement ? h.receiveComponent(this, this._pendingElement, e, this._context) : null !== this._pendingStateQueue || this._pendingForceUpdate ? this.updateComponent(e, this._currentElement, this._currentElement, this._context, this._context) : this._updateBatchNumber = null;
            }, updateComponent: function updateComponent(e, t, n, r, o) {
              var i = this._instance;null == i && a("136", this.getName() || "ReactCompositeComponent");var s,
                  u = !1;this._context === o ? s = i.context : (s = this._processContext(o), u = !0);var l = t.props,
                  c = n.props;t !== n && (u = !0), u && i.componentWillReceiveProps && i.componentWillReceiveProps(c, s);var p = this._processPendingState(c, s),
                  d = !0;this._pendingForceUpdate || (i.shouldComponentUpdate ? d = i.shouldComponentUpdate(c, p, s) : this._compositeType === y.PureClass && (d = !v(l, c) || !v(i.state, p))), this._updateBatchNumber = null, d ? (this._pendingForceUpdate = !1, this._performComponentUpdate(n, c, p, s, e, o)) : (this._currentElement = n, this._context = o, i.props = c, i.state = p, i.context = s);
            }, _processPendingState: function _processPendingState(e, t) {
              var n = this._instance,
                  r = this._pendingStateQueue,
                  o = this._pendingReplaceState;if (this._pendingReplaceState = !1, this._pendingStateQueue = null, !r) return n.state;if (o && 1 === r.length) return r[0];for (var i = s({}, o ? r[0] : n.state), a = o ? 1 : 0; a < r.length; a++) {
                var u = r[a];s(i, "function" == typeof u ? u.call(n, i, e, t) : u);
              }return i;
            }, _performComponentUpdate: function _performComponentUpdate(e, t, n, r, o, i) {
              var a,
                  s,
                  u,
                  l = this._instance,
                  c = Boolean(l.componentDidUpdate);c && (a = l.props, s = l.state, u = l.context), l.componentWillUpdate && l.componentWillUpdate(t, n, r), this._currentElement = e, this._context = i, l.props = t, l.state = n, l.context = r, this._updateRenderedComponent(o, i), c && o.getReactMountReady().enqueue(l.componentDidUpdate.bind(l, a, s, u), l);
            }, _updateRenderedComponent: function _updateRenderedComponent(e, t) {
              var n = this._renderedComponent,
                  r = n._currentElement,
                  o = this._renderValidatedComponent();if (g(r, o)) h.receiveComponent(n, o, e, this._processChildContext(t));else {
                var i = h.getHostNode(n);h.unmountComponent(n, !1);var a = f.getType(o);this._renderedNodeType = a;var s = this._instantiateReactComponent(o, a !== f.EMPTY);this._renderedComponent = s;var u = h.mountComponent(s, e, this._hostParent, this._hostContainerInfo, this._processChildContext(t), 0);this._replaceNodeWithMarkup(i, u, n);
              }
            }, _replaceNodeWithMarkup: function _replaceNodeWithMarkup(e, t, n) {
              l.replaceNodeWithMarkup(e, t, n);
            }, _renderValidatedComponentWithoutOwnerOrContext: function _renderValidatedComponentWithoutOwnerOrContext() {
              return this._instance.render();
            }, _renderValidatedComponent: function _renderValidatedComponent() {
              var e;if (this._compositeType !== y.StatelessFunctional) {
                c.current = this;try {
                  e = this._renderValidatedComponentWithoutOwnerOrContext();
                } finally {
                  c.current = null;
                }
              } else e = this._renderValidatedComponentWithoutOwnerOrContext();return null === e || !1 === e || u.isValidElement(e) || a("109", this.getName() || "ReactCompositeComponent"), e;
            }, attachRef: function attachRef(e, t) {
              var n = this.getPublicInstance();null == n && a("110");var r = t.getPublicInstance();(n.refs === m ? n.refs = {} : n.refs)[e] = r;
            }, detachRef: function detachRef(e) {
              delete this.getPublicInstance().refs[e];
            }, getName: function getName() {
              var e = this._currentElement.type,
                  t = this._instance && this._instance.constructor;return e.displayName || t && t.displayName || e.name || t && t.name || null;
            }, getPublicInstance: function getPublicInstance() {
              var e = this._instance;return this._compositeType === y.StatelessFunctional ? null : e;
            }, _instantiateReactComponent: null };t.exports = C;
        }, { 113: 113, 117: 117, 120: 120, 121: 121, 131: 131, 138: 138, 142: 142, 143: 143, 144: 144, 28: 28, 50: 50, 57: 57, 58: 58, 62: 62, 66: 66 }], 30: [function (e, t, n) {
          "use strict";
          var r = e(33),
              o = e(47),
              i = e(60),
              a = e(66),
              s = e(71),
              u = e(72),
              l = e(96),
              c = e(103),
              p = e(114);e(143);o.inject();var d = { findDOMNode: l, render: i.render, unmountComponentAtNode: i.unmountComponentAtNode, version: u, unstable_batchedUpdates: s.batchedUpdates, unstable_renderSubtreeIntoContainer: p };"undefined" != typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" == typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.inject && __REACT_DEVTOOLS_GLOBAL_HOOK__.inject({ ComponentTree: { getClosestInstanceFromNode: r.getClosestInstanceFromNode, getNodeFromInstance: function getNodeFromInstance(e) {
                return e._renderedComponent && (e = c(e)), e ? r.getNodeFromInstance(e) : null;
              } }, Mount: i, Reconciler: a });t.exports = d;
        }, { 103: 103, 114: 114, 143: 143, 33: 33, 47: 47, 60: 60, 66: 66, 71: 71, 72: 72, 96: 96 }], 31: [function (e, t, n) {
          "use strict";
          function r(e) {
            if (e) {
              var t = e._currentElement._owner || null;if (t) {
                var n = t.getName();if (n) return " This DOM node was rendered by `" + n + "`.";
              }
            }return "";
          }function o(e, t) {
            t && (Q[e._tag] && (null != t.children || null != t.dangerouslySetInnerHTML) && v("137", e._tag, e._currentElement._owner ? " Check the render method of " + e._currentElement._owner.getName() + "." : ""), null != t.dangerouslySetInnerHTML && (null != t.children && v("60"), "object" == _typeof(t.dangerouslySetInnerHTML) && H in t.dangerouslySetInnerHTML || v("61")), null != t.style && "object" != _typeof(t.style) && v("62", r(e)));
          }function i(e, t, n, r) {
            if (!(r instanceof A)) {
              var o = e._hostContainerInfo,
                  i = o._node && o._node.nodeType === K,
                  s = i ? o._node : o._ownerDocument;j(t, s), r.getReactMountReady().enqueue(a, { inst: e, registrationName: t, listener: n });
            }
          }function a() {
            var e = this;w.putListener(e.inst, e.registrationName, e.listener);
          }function s() {
            var e = this;N.postMountWrapper(e);
          }function u() {
            var e = this;O.postMountWrapper(e);
          }function l() {
            var e = this;M.postMountWrapper(e);
          }function c() {
            L.track(this);
          }function p() {
            var e = this;e._rootNodeID || v("63");var t = V(e);switch (t || v("64"), e._tag) {case "iframe":case "object":
                e._wrapperState.listeners = [k.trapBubbledEvent("topLoad", "load", t)];break;case "video":case "audio":
                e._wrapperState.listeners = [];for (var n in z) {
                  z.hasOwnProperty(n) && e._wrapperState.listeners.push(k.trapBubbledEvent(n, z[n], t));
                }break;case "source":
                e._wrapperState.listeners = [k.trapBubbledEvent("topError", "error", t)];break;case "img":
                e._wrapperState.listeners = [k.trapBubbledEvent("topError", "error", t), k.trapBubbledEvent("topLoad", "load", t)];break;case "form":
                e._wrapperState.listeners = [k.trapBubbledEvent("topReset", "reset", t), k.trapBubbledEvent("topSubmit", "submit", t)];break;case "input":case "select":case "textarea":
                e._wrapperState.listeners = [k.trapBubbledEvent("topInvalid", "invalid", t)];}
          }function d() {
            I.postUpdateWrapper(this);
          }function f(e) {
            Z.call($, e) || (G.test(e) || v("65", e), $[e] = !0);
          }function h(e, t) {
            return e.indexOf("-") >= 0 || null != t.is;
          }function m(e) {
            var t = e.type;f(t), this._currentElement = e, this._tag = t.toLowerCase(), this._namespaceURI = null, this._renderedChildren = null, this._previousStyle = null, this._previousStyleCopy = null, this._hostNode = null, this._hostParent = null, this._rootNodeID = 0, this._domID = 0, this._hostContainerInfo = null, this._wrapperState = null, this._topLevelWrapper = null, this._flags = 0;
          }var v = e(113),
              g = e(144),
              y = e(2),
              _ = e(5),
              C = e(9),
              b = e(10),
              E = e(11),
              x = e(12),
              w = e(16),
              T = e(17),
              k = e(25),
              P = e(32),
              S = e(33),
              N = e(38),
              M = e(39),
              I = e(40),
              O = e(43),
              R = (e(58), e(61)),
              A = e(68),
              D = (e(130), e(95)),
              L = (e(138), e(110), e(142), e(108)),
              U = (e(119), e(143), P),
              F = w.deleteListener,
              V = S.getNodeFromInstance,
              j = k.listenTo,
              B = T.registrationNameModules,
              W = { string: !0, number: !0 },
              H = "__html",
              q = { children: null, dangerouslySetInnerHTML: null, suppressContentEditableWarning: null },
              K = 11,
              z = { topAbort: "abort", topCanPlay: "canplay", topCanPlayThrough: "canplaythrough", topDurationChange: "durationchange", topEmptied: "emptied", topEncrypted: "encrypted", topEnded: "ended", topError: "error", topLoadedData: "loadeddata", topLoadedMetadata: "loadedmetadata", topLoadStart: "loadstart", topPause: "pause", topPlay: "play", topPlaying: "playing", topProgress: "progress", topRateChange: "ratechange", topSeeked: "seeked", topSeeking: "seeking", topStalled: "stalled", topSuspend: "suspend", topTimeUpdate: "timeupdate", topVolumeChange: "volumechange", topWaiting: "waiting" },
              Y = { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 },
              X = { listing: !0, pre: !0, textarea: !0 },
              Q = g({ menuitem: !0 }, Y),
              G = /^[a-zA-Z][a-zA-Z:_\.\-\d]*$/,
              $ = {},
              Z = {}.hasOwnProperty,
              J = 1;m.displayName = "ReactDOMComponent", m.Mixin = { mountComponent: function mountComponent(e, t, n, r) {
              this._rootNodeID = J++, this._domID = n._idCounter++, this._hostParent = t, this._hostContainerInfo = n;var i = this._currentElement.props;switch (this._tag) {case "audio":case "form":case "iframe":case "img":case "link":case "object":case "source":case "video":
                  this._wrapperState = { listeners: null }, e.getReactMountReady().enqueue(p, this);break;case "input":
                  N.mountWrapper(this, i, t), i = N.getHostProps(this, i), e.getReactMountReady().enqueue(c, this), e.getReactMountReady().enqueue(p, this);break;case "option":
                  M.mountWrapper(this, i, t), i = M.getHostProps(this, i);break;case "select":
                  I.mountWrapper(this, i, t), i = I.getHostProps(this, i), e.getReactMountReady().enqueue(p, this);break;case "textarea":
                  O.mountWrapper(this, i, t), i = O.getHostProps(this, i), e.getReactMountReady().enqueue(c, this), e.getReactMountReady().enqueue(p, this);}o(this, i);var a, d;null != t ? (a = t._namespaceURI, d = t._tag) : n._tag && (a = n._namespaceURI, d = n._tag), (null == a || a === b.svg && "foreignobject" === d) && (a = b.html), a === b.html && ("svg" === this._tag ? a = b.svg : "math" === this._tag && (a = b.mathml)), this._namespaceURI = a;var f;if (e.useCreateElement) {
                var h,
                    m = n._ownerDocument;if (a === b.html) {
                  if ("script" === this._tag) {
                    var v = m.createElement("div"),
                        g = this._currentElement.type;v.innerHTML = "<" + g + "></" + g + ">", h = v.removeChild(v.firstChild);
                  } else h = i.is ? m.createElement(this._currentElement.type, i.is) : m.createElement(this._currentElement.type);
                } else h = m.createElementNS(a, this._currentElement.type);S.precacheNode(this, h), this._flags |= U.hasCachedChildNodes, this._hostParent || x.setAttributeForRoot(h), this._updateDOMProperties(null, i, e);var _ = C(h);this._createInitialChildren(e, i, r, _), f = _;
              } else {
                var E = this._createOpenTagMarkupAndPutListeners(e, i),
                    w = this._createContentMarkup(e, i, r);f = !w && Y[this._tag] ? E + "/>" : E + ">" + w + "</" + this._currentElement.type + ">";
              }switch (this._tag) {case "input":
                  e.getReactMountReady().enqueue(s, this), i.autoFocus && e.getReactMountReady().enqueue(y.focusDOMComponent, this);break;case "textarea":
                  e.getReactMountReady().enqueue(u, this), i.autoFocus && e.getReactMountReady().enqueue(y.focusDOMComponent, this);break;case "select":case "button":
                  i.autoFocus && e.getReactMountReady().enqueue(y.focusDOMComponent, this);break;case "option":
                  e.getReactMountReady().enqueue(l, this);}return f;
            }, _createOpenTagMarkupAndPutListeners: function _createOpenTagMarkupAndPutListeners(e, t) {
              var n = "<" + this._currentElement.type;for (var r in t) {
                if (t.hasOwnProperty(r)) {
                  var o = t[r];if (null != o) if (B.hasOwnProperty(r)) o && i(this, r, o, e);else {
                    "style" === r && (o && (o = this._previousStyleCopy = g({}, t.style)), o = _.createMarkupForStyles(o, this));var a = null;null != this._tag && h(this._tag, t) ? q.hasOwnProperty(r) || (a = x.createMarkupForCustomAttribute(r, o)) : a = x.createMarkupForProperty(r, o), a && (n += " " + a);
                  }
                }
              }return e.renderToStaticMarkup ? n : (this._hostParent || (n += " " + x.createMarkupForRoot()), n += " " + x.createMarkupForID(this._domID));
            }, _createContentMarkup: function _createContentMarkup(e, t, n) {
              var r = "",
                  o = t.dangerouslySetInnerHTML;if (null != o) null != o.__html && (r = o.__html);else {
                var i = W[_typeof(t.children)] ? t.children : null,
                    a = null != i ? null : t.children;if (null != i) r = D(i);else if (null != a) {
                  var s = this.mountChildren(a, e, n);r = s.join("");
                }
              }return X[this._tag] && "\n" === r.charAt(0) ? "\n" + r : r;
            }, _createInitialChildren: function _createInitialChildren(e, t, n, r) {
              var o = t.dangerouslySetInnerHTML;if (null != o) null != o.__html && C.queueHTML(r, o.__html);else {
                var i = W[_typeof(t.children)] ? t.children : null,
                    a = null != i ? null : t.children;if (null != i) "" !== i && C.queueText(r, i);else if (null != a) for (var s = this.mountChildren(a, e, n), u = 0; u < s.length; u++) {
                  C.queueChild(r, s[u]);
                }
              }
            }, receiveComponent: function receiveComponent(e, t, n) {
              var r = this._currentElement;this._currentElement = e, this.updateComponent(t, r, e, n);
            }, updateComponent: function updateComponent(e, t, n, r) {
              var i = t.props,
                  a = this._currentElement.props;switch (this._tag) {case "input":
                  i = N.getHostProps(this, i), a = N.getHostProps(this, a);break;case "option":
                  i = M.getHostProps(this, i), a = M.getHostProps(this, a);break;case "select":
                  i = I.getHostProps(this, i), a = I.getHostProps(this, a);break;case "textarea":
                  i = O.getHostProps(this, i), a = O.getHostProps(this, a);}switch (o(this, a), this._updateDOMProperties(i, a, e), this._updateDOMChildren(i, a, e, r), this._tag) {case "input":
                  N.updateWrapper(this);break;case "textarea":
                  O.updateWrapper(this);break;case "select":
                  e.getReactMountReady().enqueue(d, this);}
            }, _updateDOMProperties: function _updateDOMProperties(e, t, n) {
              var r, o, a;for (r in e) {
                if (!t.hasOwnProperty(r) && e.hasOwnProperty(r) && null != e[r]) if ("style" === r) {
                  var s = this._previousStyleCopy;for (o in s) {
                    s.hasOwnProperty(o) && (a = a || {}, a[o] = "");
                  }this._previousStyleCopy = null;
                } else B.hasOwnProperty(r) ? e[r] && F(this, r) : h(this._tag, e) ? q.hasOwnProperty(r) || x.deleteValueForAttribute(V(this), r) : (E.properties[r] || E.isCustomAttribute(r)) && x.deleteValueForProperty(V(this), r);
              }for (r in t) {
                var u = t[r],
                    l = "style" === r ? this._previousStyleCopy : null != e ? e[r] : void 0;if (t.hasOwnProperty(r) && u !== l && (null != u || null != l)) if ("style" === r) {
                  if (u ? u = this._previousStyleCopy = g({}, u) : this._previousStyleCopy = null, l) {
                    for (o in l) {
                      !l.hasOwnProperty(o) || u && u.hasOwnProperty(o) || (a = a || {}, a[o] = "");
                    }for (o in u) {
                      u.hasOwnProperty(o) && l[o] !== u[o] && (a = a || {}, a[o] = u[o]);
                    }
                  } else a = u;
                } else if (B.hasOwnProperty(r)) u ? i(this, r, u, n) : l && F(this, r);else if (h(this._tag, t)) q.hasOwnProperty(r) || x.setValueForAttribute(V(this), r, u);else if (E.properties[r] || E.isCustomAttribute(r)) {
                  var c = V(this);null != u ? x.setValueForProperty(c, r, u) : x.deleteValueForProperty(c, r);
                }
              }a && _.setValueForStyles(V(this), a, this);
            }, _updateDOMChildren: function _updateDOMChildren(e, t, n, r) {
              var o = W[_typeof(e.children)] ? e.children : null,
                  i = W[_typeof(t.children)] ? t.children : null,
                  a = e.dangerouslySetInnerHTML && e.dangerouslySetInnerHTML.__html,
                  s = t.dangerouslySetInnerHTML && t.dangerouslySetInnerHTML.__html,
                  u = null != o ? null : e.children,
                  l = null != i ? null : t.children,
                  c = null != o || null != a,
                  p = null != i || null != s;null != u && null == l ? this.updateChildren(null, n, r) : c && !p && this.updateTextContent(""), null != i ? o !== i && this.updateTextContent("" + i) : null != s ? a !== s && this.updateMarkup("" + s) : null != l && this.updateChildren(l, n, r);
            }, getHostNode: function getHostNode() {
              return V(this);
            }, unmountComponent: function unmountComponent(e) {
              switch (this._tag) {case "audio":case "form":case "iframe":case "img":case "link":case "object":case "source":case "video":
                  var t = this._wrapperState.listeners;if (t) for (var n = 0; n < t.length; n++) {
                    t[n].remove();
                  }break;case "input":case "textarea":
                  L.stopTracking(this);break;case "html":case "head":case "body":
                  v("66", this._tag);}this.unmountChildren(e), S.uncacheNode(this), w.deleteAllListeners(this), this._rootNodeID = 0, this._domID = 0, this._wrapperState = null;
            }, getPublicInstance: function getPublicInstance() {
              return V(this);
            } }, g(m.prototype, m.Mixin, R.Mixin), t.exports = m;
        }, { 10: 10, 108: 108, 11: 11, 110: 110, 113: 113, 119: 119, 12: 12, 130: 130, 138: 138, 142: 142, 143: 143, 144: 144, 16: 16, 17: 17, 2: 2, 25: 25, 32: 32, 33: 33, 38: 38, 39: 39, 40: 40, 43: 43, 5: 5, 58: 58, 61: 61, 68: 68, 9: 9, 95: 95 }], 32: [function (e, t, n) {
          "use strict";
          var r = { hasCachedChildNodes: 1 };t.exports = r;
        }, {}], 33: [function (e, t, n) {
          "use strict";
          function r(e, t) {
            return 1 === e.nodeType && e.getAttribute(h) === String(t) || 8 === e.nodeType && e.nodeValue === " react-text: " + t + " " || 8 === e.nodeType && e.nodeValue === " react-empty: " + t + " ";
          }function o(e) {
            for (var t; t = e._renderedComponent;) {
              e = t;
            }return e;
          }function i(e, t) {
            var n = o(e);n._hostNode = t, t[v] = n;
          }function a(e) {
            var t = e._hostNode;t && (delete t[v], e._hostNode = null);
          }function s(e, t) {
            if (!(e._flags & m.hasCachedChildNodes)) {
              var n = e._renderedChildren,
                  a = t.firstChild;e: for (var s in n) {
                if (n.hasOwnProperty(s)) {
                  var u = n[s],
                      l = o(u)._domID;if (0 !== l) {
                    for (; null !== a; a = a.nextSibling) {
                      if (r(a, l)) {
                        i(u, a);continue e;
                      }
                    }p("32", l);
                  }
                }
              }e._flags |= m.hasCachedChildNodes;
            }
          }function u(e) {
            if (e[v]) return e[v];for (var t = []; !e[v];) {
              if (t.push(e), !e.parentNode) return null;e = e.parentNode;
            }for (var n, r; e && (r = e[v]); e = t.pop()) {
              n = r, t.length && s(r, e);
            }return n;
          }function l(e) {
            var t = u(e);return null != t && t._hostNode === e ? t : null;
          }function c(e) {
            if (void 0 === e._hostNode && p("33"), e._hostNode) return e._hostNode;for (var t = []; !e._hostNode;) {
              t.push(e), e._hostParent || p("34"), e = e._hostParent;
            }for (; t.length; e = t.pop()) {
              s(e, e._hostNode);
            }return e._hostNode;
          }var p = e(113),
              d = e(11),
              f = e(32),
              h = (e(138), d.ID_ATTRIBUTE_NAME),
              m = f,
              v = "__reactInternalInstance$" + Math.random().toString(36).slice(2),
              g = { getClosestInstanceFromNode: u, getInstanceFromNode: l, getNodeFromInstance: c, precacheChildNodes: s, precacheNode: i, uncacheNode: a };t.exports = g;
        }, { 11: 11, 113: 113, 138: 138, 32: 32 }], 34: [function (e, t, n) {
          "use strict";
          function r(e, t) {
            return { _topLevelWrapper: e, _idCounter: 1, _ownerDocument: t ? t.nodeType === o ? t : t.ownerDocument : null, _node: t, _tag: t ? t.nodeName.toLowerCase() : null, _namespaceURI: t ? t.namespaceURI : null };
          }var o = (e(119), 9);t.exports = r;
        }, { 119: 119 }], 35: [function (e, t, n) {
          "use strict";
          var r = e(144),
              o = e(9),
              i = e(33),
              a = function a(e) {
            this._currentElement = null, this._hostNode = null, this._hostParent = null, this._hostContainerInfo = null, this._domID = 0;
          };r(a.prototype, { mountComponent: function mountComponent(e, t, n, r) {
              var a = n._idCounter++;this._domID = a, this._hostParent = t, this._hostContainerInfo = n;var s = " react-empty: " + this._domID + " ";if (e.useCreateElement) {
                var u = n._ownerDocument,
                    l = u.createComment(s);return i.precacheNode(this, l), o(l);
              }return e.renderToStaticMarkup ? "" : "\x3c!--" + s + "--\x3e";
            }, receiveComponent: function receiveComponent() {}, getHostNode: function getHostNode() {
              return i.getNodeFromInstance(this);
            }, unmountComponent: function unmountComponent() {
              i.uncacheNode(this);
            } }), t.exports = a;
        }, { 144: 144, 33: 33, 9: 9 }], 36: [function (e, t, n) {
          "use strict";
          var r = { useCreateElement: !0, useFiber: !1 };t.exports = r;
        }, {}], 37: [function (e, t, n) {
          "use strict";
          var r = e(8),
              o = e(33),
              i = { dangerouslyProcessChildrenUpdates: function dangerouslyProcessChildrenUpdates(e, t) {
              var n = o.getNodeFromInstance(e);r.processUpdates(n, t);
            } };t.exports = i;
        }, { 33: 33, 8: 8 }], 38: [function (e, t, n) {
          "use strict";
          function r() {
            this._rootNodeID && d.updateWrapper(this);
          }function o(e) {
            return "checkbox" === e.type || "radio" === e.type ? null != e.checked : null != e.value;
          }function i(e) {
            var t = this._currentElement.props,
                n = l.executeOnChange(t, e);p.asap(r, this);var o = t.name;if ("radio" === t.type && null != o) {
              for (var i = c.getNodeFromInstance(this), s = i; s.parentNode;) {
                s = s.parentNode;
              }for (var u = s.querySelectorAll("input[name=" + JSON.stringify("" + o) + '][type="radio"]'), d = 0; d < u.length; d++) {
                var f = u[d];if (f !== i && f.form === i.form) {
                  var h = c.getInstanceFromNode(f);h || a("90"), p.asap(r, h);
                }
              }
            }return n;
          }var a = e(113),
              s = e(144),
              u = e(12),
              l = e(23),
              c = e(33),
              p = e(71),
              d = (e(138), e(143), { getHostProps: function getHostProps(e, t) {
              var n = l.getValue(t),
                  r = l.getChecked(t);return s({ type: void 0, step: void 0, min: void 0, max: void 0 }, t, { defaultChecked: void 0, defaultValue: void 0, value: null != n ? n : e._wrapperState.initialValue, checked: null != r ? r : e._wrapperState.initialChecked, onChange: e._wrapperState.onChange });
            }, mountWrapper: function mountWrapper(e, t) {
              var n = t.defaultValue;e._wrapperState = { initialChecked: null != t.checked ? t.checked : t.defaultChecked, initialValue: null != t.value ? t.value : n, listeners: null, onChange: i.bind(e), controlled: o(t) };
            }, updateWrapper: function updateWrapper(e) {
              var t = e._currentElement.props,
                  n = t.checked;null != n && u.setValueForProperty(c.getNodeFromInstance(e), "checked", n || !1);var r = c.getNodeFromInstance(e),
                  o = l.getValue(t);if (null != o) {
                if (0 === o && "" === r.value) r.value = "0";else if ("number" === t.type) {
                  var i = parseFloat(r.value, 10) || 0;(o != i || o == i && r.value != o) && (r.value = "" + o);
                } else r.value !== "" + o && (r.value = "" + o);
              } else null == t.value && null != t.defaultValue && r.defaultValue !== "" + t.defaultValue && (r.defaultValue = "" + t.defaultValue), null == t.checked && null != t.defaultChecked && (r.defaultChecked = !!t.defaultChecked);
            }, postMountWrapper: function postMountWrapper(e) {
              var t = e._currentElement.props,
                  n = c.getNodeFromInstance(e);switch (t.type) {case "submit":case "reset":
                  break;case "color":case "date":case "datetime":case "datetime-local":case "month":case "time":case "week":
                  n.value = "", n.value = n.defaultValue;break;default:
                  n.value = n.value;}var r = n.name;"" !== r && (n.name = ""), n.defaultChecked = !n.defaultChecked, n.defaultChecked = !n.defaultChecked, "" !== r && (n.name = r);
            } });t.exports = d;
        }, { 113: 113, 12: 12, 138: 138, 143: 143, 144: 144, 23: 23, 33: 33, 71: 71 }], 39: [function (e, t, n) {
          "use strict";
          function r(e) {
            var t = "";return i.Children.forEach(e, function (e) {
              null != e && ("string" == typeof e || "number" == typeof e ? t += e : u || (u = !0));
            }), t;
          }var o = e(144),
              i = e(121),
              a = e(33),
              s = e(40),
              u = (e(143), !1),
              l = { mountWrapper: function mountWrapper(e, t, n) {
              var o = null;if (null != n) {
                var i = n;"optgroup" === i._tag && (i = i._hostParent), null != i && "select" === i._tag && (o = s.getSelectValueContext(i));
              }var a = null;if (null != o) {
                var u;if (u = null != t.value ? t.value + "" : r(t.children), a = !1, Array.isArray(o)) {
                  for (var l = 0; l < o.length; l++) {
                    if ("" + o[l] === u) {
                      a = !0;break;
                    }
                  }
                } else a = "" + o === u;
              }e._wrapperState = { selected: a };
            }, postMountWrapper: function postMountWrapper(e) {
              var t = e._currentElement.props;null != t.value && a.getNodeFromInstance(e).setAttribute("value", t.value);
            }, getHostProps: function getHostProps(e, t) {
              var n = o({ selected: void 0, children: void 0 }, t);null != e._wrapperState.selected && (n.selected = e._wrapperState.selected);var i = r(t.children);return i && (n.children = i), n;
            } };t.exports = l;
        }, { 121: 121, 143: 143, 144: 144, 33: 33, 40: 40 }], 40: [function (e, t, n) {
          "use strict";
          function r() {
            if (this._rootNodeID && this._wrapperState.pendingUpdate) {
              this._wrapperState.pendingUpdate = !1;var e = this._currentElement.props,
                  t = s.getValue(e);null != t && o(this, Boolean(e.multiple), t);
            }
          }function o(e, t, n) {
            var r,
                o,
                i = u.getNodeFromInstance(e).options;if (t) {
              for (r = {}, o = 0; o < n.length; o++) {
                r["" + n[o]] = !0;
              }for (o = 0; o < i.length; o++) {
                var a = r.hasOwnProperty(i[o].value);i[o].selected !== a && (i[o].selected = a);
              }
            } else {
              for (r = "" + n, o = 0; o < i.length; o++) {
                if (i[o].value === r) return void (i[o].selected = !0);
              }i.length && (i[0].selected = !0);
            }
          }function i(e) {
            var t = this._currentElement.props,
                n = s.executeOnChange(t, e);return this._rootNodeID && (this._wrapperState.pendingUpdate = !0), l.asap(r, this), n;
          }var a = e(144),
              s = e(23),
              u = e(33),
              l = e(71),
              c = (e(143), !1),
              p = { getHostProps: function getHostProps(e, t) {
              return a({}, t, { onChange: e._wrapperState.onChange, value: void 0 });
            }, mountWrapper: function mountWrapper(e, t) {
              var n = s.getValue(t);e._wrapperState = { pendingUpdate: !1, initialValue: null != n ? n : t.defaultValue, listeners: null, onChange: i.bind(e), wasMultiple: Boolean(t.multiple) }, void 0 === t.value || void 0 === t.defaultValue || c || (c = !0);
            }, getSelectValueContext: function getSelectValueContext(e) {
              return e._wrapperState.initialValue;
            }, postUpdateWrapper: function postUpdateWrapper(e) {
              var t = e._currentElement.props;e._wrapperState.initialValue = void 0;var n = e._wrapperState.wasMultiple;e._wrapperState.wasMultiple = Boolean(t.multiple);var r = s.getValue(t);null != r ? (e._wrapperState.pendingUpdate = !1, o(e, Boolean(t.multiple), r)) : n !== Boolean(t.multiple) && (null != t.defaultValue ? o(e, Boolean(t.multiple), t.defaultValue) : o(e, Boolean(t.multiple), t.multiple ? [] : ""));
            } };t.exports = p;
        }, { 143: 143, 144: 144, 23: 23, 33: 33, 71: 71 }], 41: [function (e, t, n) {
          "use strict";
          function r(e, t, n, r) {
            return e === n && t === r;
          }function o(e) {
            var t = document.selection,
                n = t.createRange(),
                r = n.text.length,
                o = n.duplicate();o.moveToElementText(e), o.setEndPoint("EndToStart", n);var i = o.text.length;return { start: i, end: i + r };
          }function i(e) {
            var t = window.getSelection && window.getSelection();if (!t || 0 === t.rangeCount) return null;var n = t.anchorNode,
                o = t.anchorOffset,
                i = t.focusNode,
                a = t.focusOffset,
                s = t.getRangeAt(0);try {
              s.startContainer.nodeType, s.endContainer.nodeType;
            } catch (e) {
              return null;
            }var u = r(t.anchorNode, t.anchorOffset, t.focusNode, t.focusOffset),
                l = u ? 0 : s.toString().length,
                c = s.cloneRange();c.selectNodeContents(e), c.setEnd(s.startContainer, s.startOffset);var p = r(c.startContainer, c.startOffset, c.endContainer, c.endOffset),
                d = p ? 0 : c.toString().length,
                f = d + l,
                h = document.createRange();h.setStart(n, o), h.setEnd(i, a);var m = h.collapsed;return { start: m ? f : d, end: m ? d : f };
          }function a(e, t) {
            var n,
                r,
                o = document.selection.createRange().duplicate();void 0 === t.end ? (n = t.start, r = n) : t.start > t.end ? (n = t.end, r = t.start) : (n = t.start, r = t.end), o.moveToElementText(e), o.moveStart("character", n), o.setEndPoint("EndToStart", o), o.moveEnd("character", r - n), o.select();
          }function s(e, t) {
            if (window.getSelection) {
              var n = window.getSelection(),
                  r = e[c()].length,
                  o = Math.min(t.start, r),
                  i = void 0 === t.end ? o : Math.min(t.end, r);if (!n.extend && o > i) {
                var a = i;i = o, o = a;
              }var s = l(e, o),
                  u = l(e, i);if (s && u) {
                var p = document.createRange();p.setStart(s.node, s.offset), n.removeAllRanges(), o > i ? (n.addRange(p), n.extend(u.node, u.offset)) : (p.setEnd(u.node, u.offset), n.addRange(p));
              }
            }
          }var u = e(124),
              l = e(105),
              c = e(106),
              p = u.canUseDOM && "selection" in document && !("getSelection" in window),
              d = { getOffsets: p ? o : i, setOffsets: p ? a : s };t.exports = d;
        }, { 105: 105, 106: 106, 124: 124 }],
        42: [function (e, t, n) {
          "use strict";
          var r = e(113),
              o = e(144),
              i = e(8),
              a = e(9),
              s = e(33),
              u = e(95),
              l = (e(138), e(119), function (e) {
            this._currentElement = e, this._stringText = "" + e, this._hostNode = null, this._hostParent = null, this._domID = 0, this._mountIndex = 0, this._closingComment = null, this._commentNodes = null;
          });o(l.prototype, { mountComponent: function mountComponent(e, t, n, r) {
              var o = n._idCounter++,
                  i = " react-text: " + o + " ";if (this._domID = o, this._hostParent = t, e.useCreateElement) {
                var l = n._ownerDocument,
                    c = l.createComment(i),
                    p = l.createComment(" /react-text "),
                    d = a(l.createDocumentFragment());return a.queueChild(d, a(c)), this._stringText && a.queueChild(d, a(l.createTextNode(this._stringText))), a.queueChild(d, a(p)), s.precacheNode(this, c), this._closingComment = p, d;
              }var f = u(this._stringText);return e.renderToStaticMarkup ? f : "\x3c!--" + i + "--\x3e" + f + "\x3c!-- /react-text --\x3e";
            }, receiveComponent: function receiveComponent(e, t) {
              if (e !== this._currentElement) {
                this._currentElement = e;var n = "" + e;if (n !== this._stringText) {
                  this._stringText = n;var r = this.getHostNode();i.replaceDelimitedText(r[0], r[1], n);
                }
              }
            }, getHostNode: function getHostNode() {
              var e = this._commentNodes;if (e) return e;if (!this._closingComment) for (var t = s.getNodeFromInstance(this), n = t.nextSibling;;) {
                if (null == n && r("67", this._domID), 8 === n.nodeType && " /react-text " === n.nodeValue) {
                  this._closingComment = n;break;
                }n = n.nextSibling;
              }return e = [this._hostNode, this._closingComment], this._commentNodes = e, e;
            }, unmountComponent: function unmountComponent() {
              this._closingComment = null, this._commentNodes = null, s.uncacheNode(this);
            } }), t.exports = l;
        }, { 113: 113, 119: 119, 138: 138, 144: 144, 33: 33, 8: 8, 9: 9, 95: 95 }], 43: [function (e, t, n) {
          "use strict";
          function r() {
            this._rootNodeID && c.updateWrapper(this);
          }function o(e) {
            var t = this._currentElement.props,
                n = s.executeOnChange(t, e);return l.asap(r, this), n;
          }var i = e(113),
              a = e(144),
              s = e(23),
              u = e(33),
              l = e(71),
              c = (e(138), e(143), { getHostProps: function getHostProps(e, t) {
              return null != t.dangerouslySetInnerHTML && i("91"), a({}, t, { value: void 0, defaultValue: void 0, children: "" + e._wrapperState.initialValue, onChange: e._wrapperState.onChange });
            }, mountWrapper: function mountWrapper(e, t) {
              var n = s.getValue(t),
                  r = n;if (null == n) {
                var a = t.defaultValue,
                    u = t.children;null != u && (null != a && i("92"), Array.isArray(u) && (u.length <= 1 || i("93"), u = u[0]), a = "" + u), null == a && (a = ""), r = a;
              }e._wrapperState = { initialValue: "" + r, listeners: null, onChange: o.bind(e) };
            }, updateWrapper: function updateWrapper(e) {
              var t = e._currentElement.props,
                  n = u.getNodeFromInstance(e),
                  r = s.getValue(t);if (null != r) {
                var o = "" + r;o !== n.value && (n.value = o), null == t.defaultValue && (n.defaultValue = o);
              }null != t.defaultValue && (n.defaultValue = t.defaultValue);
            }, postMountWrapper: function postMountWrapper(e) {
              var t = u.getNodeFromInstance(e),
                  n = t.textContent;n === e._wrapperState.initialValue && (t.value = n);
            } });t.exports = c;
        }, { 113: 113, 138: 138, 143: 143, 144: 144, 23: 23, 33: 33, 71: 71 }], 44: [function (e, t, n) {
          "use strict";
          function r(e, t) {
            "_hostNode" in e || u("33"), "_hostNode" in t || u("33");for (var n = 0, r = e; r; r = r._hostParent) {
              n++;
            }for (var o = 0, i = t; i; i = i._hostParent) {
              o++;
            }for (; n - o > 0;) {
              e = e._hostParent, n--;
            }for (; o - n > 0;) {
              t = t._hostParent, o--;
            }for (var a = n; a--;) {
              if (e === t) return e;e = e._hostParent, t = t._hostParent;
            }return null;
          }function o(e, t) {
            "_hostNode" in e || u("35"), "_hostNode" in t || u("35");for (; t;) {
              if (t === e) return !0;t = t._hostParent;
            }return !1;
          }function i(e) {
            return "_hostNode" in e || u("36"), e._hostParent;
          }function a(e, t, n) {
            for (var r = []; e;) {
              r.push(e), e = e._hostParent;
            }var o;for (o = r.length; o-- > 0;) {
              t(r[o], "captured", n);
            }for (o = 0; o < r.length; o++) {
              t(r[o], "bubbled", n);
            }
          }function s(e, t, n, o, i) {
            for (var a = e && t ? r(e, t) : null, s = []; e && e !== a;) {
              s.push(e), e = e._hostParent;
            }for (var u = []; t && t !== a;) {
              u.push(t), t = t._hostParent;
            }var l;for (l = 0; l < s.length; l++) {
              n(s[l], "bubbled", o);
            }for (l = u.length; l-- > 0;) {
              n(u[l], "captured", i);
            }
          }var u = e(113);e(138);t.exports = { isAncestor: o, getLowestCommonAncestor: r, getParentInstance: i, traverseTwoPhase: a, traverseEnterLeave: s };
        }, { 113: 113, 138: 138 }], 45: [function (e, t, n) {
          "use strict";
          var r = e(121),
              o = e(30),
              i = o;r.addons && (r.__SECRET_INJECTED_REACT_DOM_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = i), t.exports = i;
        }, { 121: 121, 30: 30 }], 46: [function (e, t, n) {
          "use strict";
          function r() {
            this.reinitializeTransaction();
          }var o = e(144),
              i = e(71),
              a = e(89),
              s = e(130),
              u = { initialize: s, close: function close() {
              d.isBatchingUpdates = !1;
            } },
              l = { initialize: s, close: i.flushBatchedUpdates.bind(i) },
              c = [l, u];o(r.prototype, a, { getTransactionWrappers: function getTransactionWrappers() {
              return c;
            } });var p = new r(),
              d = { isBatchingUpdates: !1, batchedUpdates: function batchedUpdates(e, t, n, r, o, i) {
              var a = d.isBatchingUpdates;return d.isBatchingUpdates = !0, a ? e(t, n, r, o, i) : p.perform(e, null, t, n, r, o, i);
            } };t.exports = d;
        }, { 130: 130, 144: 144, 71: 71, 89: 89 }], 47: [function (e, t, n) {
          "use strict";
          function r() {
            x || (x = !0, y.EventEmitter.injectReactEventListener(g), y.EventPluginHub.injectEventPluginOrder(s), y.EventPluginUtils.injectComponentTree(d), y.EventPluginUtils.injectTreeTraversal(h), y.EventPluginHub.injectEventPluginsByName({ SimpleEventPlugin: E, EnterLeaveEventPlugin: u, ChangeEventPlugin: a, SelectEventPlugin: b, BeforeInputEventPlugin: i }), y.HostComponent.injectGenericComponentClass(p), y.HostComponent.injectTextComponentClass(m), y.DOMProperty.injectDOMPropertyConfig(o), y.DOMProperty.injectDOMPropertyConfig(l), y.DOMProperty.injectDOMPropertyConfig(C), y.EmptyComponent.injectEmptyComponentFactory(function (e) {
              return new f(e);
            }), y.Updates.injectReconcileTransaction(_), y.Updates.injectBatchingStrategy(v), y.Component.injectEnvironment(c));
          }var o = e(1),
              i = e(3),
              a = e(7),
              s = e(14),
              u = e(15),
              l = e(21),
              c = e(27),
              p = e(31),
              d = e(33),
              f = e(35),
              h = e(44),
              m = e(42),
              v = e(46),
              g = e(52),
              y = e(55),
              _ = e(65),
              C = e(73),
              b = e(74),
              E = e(75),
              x = !1;t.exports = { inject: r };
        }, { 1: 1, 14: 14, 15: 15, 21: 21, 27: 27, 3: 3, 31: 31, 33: 33, 35: 35, 42: 42, 44: 44, 46: 46, 52: 52, 55: 55, 65: 65, 7: 7, 73: 73, 74: 74, 75: 75 }], 48: [function (e, t, n) {
          "use strict";
          var r = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103;t.exports = r;
        }, {}], 49: [function (e, t, n) {
          "use strict";
          var r,
              o = { injectEmptyComponentFactory: function injectEmptyComponentFactory(e) {
              r = e;
            } },
              i = { create: function create(e) {
              return r(e);
            } };i.injection = o, t.exports = i;
        }, {}], 50: [function (e, t, n) {
          "use strict";
          function r(e, t, n) {
            try {
              t(n);
            } catch (e) {
              null === o && (o = e);
            }
          }var o = null,
              i = { invokeGuardedCallback: r, invokeGuardedCallbackWithCatch: r, rethrowCaughtError: function rethrowCaughtError() {
              if (o) {
                var e = o;throw o = null, e;
              }
            } };t.exports = i;
        }, {}], 51: [function (e, t, n) {
          "use strict";
          function r(e) {
            o.enqueueEvents(e), o.processEventQueue(!1);
          }var o = e(16),
              i = { handleTopLevel: function handleTopLevel(e, t, n, i) {
              r(o.extractEvents(e, t, n, i));
            } };t.exports = i;
        }, { 16: 16 }], 52: [function (e, t, n) {
          "use strict";
          function r(e) {
            for (; e._hostParent;) {
              e = e._hostParent;
            }var t = p.getNodeFromInstance(e),
                n = t.parentNode;return p.getClosestInstanceFromNode(n);
          }function o(e, t) {
            this.topLevelType = e, this.nativeEvent = t, this.ancestors = [];
          }function i(e) {
            var t = f(e.nativeEvent),
                n = p.getClosestInstanceFromNode(t),
                o = n;do {
              e.ancestors.push(o), o = o && r(o);
            } while (o);for (var i = 0; i < e.ancestors.length; i++) {
              n = e.ancestors[i], m._handleTopLevel(e.topLevelType, n, e.nativeEvent, f(e.nativeEvent));
            }
          }function a(e) {
            e(h(window));
          }var s = e(144),
              u = e(123),
              l = e(124),
              c = e(24),
              p = e(33),
              d = e(71),
              f = e(102),
              h = e(135);s(o.prototype, { destructor: function destructor() {
              this.topLevelType = null, this.nativeEvent = null, this.ancestors.length = 0;
            } }), c.addPoolingTo(o, c.twoArgumentPooler);var m = { _enabled: !0, _handleTopLevel: null, WINDOW_HANDLE: l.canUseDOM ? window : null, setHandleTopLevel: function setHandleTopLevel(e) {
              m._handleTopLevel = e;
            }, setEnabled: function setEnabled(e) {
              m._enabled = !!e;
            }, isEnabled: function isEnabled() {
              return m._enabled;
            }, trapBubbledEvent: function trapBubbledEvent(e, t, n) {
              return n ? u.listen(n, t, m.dispatchEvent.bind(null, e)) : null;
            }, trapCapturedEvent: function trapCapturedEvent(e, t, n) {
              return n ? u.capture(n, t, m.dispatchEvent.bind(null, e)) : null;
            }, monitorScrollValue: function monitorScrollValue(e) {
              var t = a.bind(null, e);u.listen(window, "scroll", t);
            }, dispatchEvent: function dispatchEvent(e, t) {
              if (m._enabled) {
                var n = o.getPooled(e, t);try {
                  d.batchedUpdates(i, n);
                } finally {
                  o.release(n);
                }
              }
            } };t.exports = m;
        }, { 102: 102, 123: 123, 124: 124, 135: 135, 144: 144, 24: 24, 33: 33, 71: 71 }], 53: [function (e, t, n) {
          "use strict";
          var r = { logTopLevelRenders: !1 };t.exports = r;
        }, {}], 54: [function (e, t, n) {
          "use strict";
          function r(e) {
            return s || a("111", e.type), new s(e);
          }function o(e) {
            return new u(e);
          }function i(e) {
            return e instanceof u;
          }var a = e(113),
              s = (e(138), null),
              u = null,
              l = { injectGenericComponentClass: function injectGenericComponentClass(e) {
              s = e;
            }, injectTextComponentClass: function injectTextComponentClass(e) {
              u = e;
            } },
              c = { createInternalComponent: r, createInstanceForText: o, isTextComponent: i, injection: l };t.exports = c;
        }, { 113: 113, 138: 138 }], 55: [function (e, t, n) {
          "use strict";
          var r = e(11),
              o = e(16),
              i = e(18),
              a = e(28),
              s = e(49),
              u = e(25),
              l = e(54),
              c = e(71),
              p = { Component: a.injection, DOMProperty: r.injection, EmptyComponent: s.injection, EventPluginHub: o.injection, EventPluginUtils: i.injection, EventEmitter: u.injection, HostComponent: l.injection, Updates: c.injection };t.exports = p;
        }, { 11: 11, 16: 16, 18: 18, 25: 25, 28: 28, 49: 49, 54: 54, 71: 71 }], 56: [function (e, t, n) {
          "use strict";
          function r(e) {
            return i(document.documentElement, e);
          }var o = e(41),
              i = e(127),
              a = e(132),
              s = e(133),
              u = { hasSelectionCapabilities: function hasSelectionCapabilities(e) {
              var t = e && e.nodeName && e.nodeName.toLowerCase();return t && ("input" === t && "text" === e.type || "textarea" === t || "true" === e.contentEditable);
            }, getSelectionInformation: function getSelectionInformation() {
              var e = s();return { focusedElem: e, selectionRange: u.hasSelectionCapabilities(e) ? u.getSelection(e) : null };
            }, restoreSelection: function restoreSelection(e) {
              var t = s(),
                  n = e.focusedElem,
                  o = e.selectionRange;t !== n && r(n) && (u.hasSelectionCapabilities(n) && u.setSelection(n, o), a(n));
            }, getSelection: function getSelection(e) {
              var t;if ("selectionStart" in e) t = { start: e.selectionStart, end: e.selectionEnd };else if (document.selection && e.nodeName && "input" === e.nodeName.toLowerCase()) {
                var n = document.selection.createRange();n.parentElement() === e && (t = { start: -n.moveStart("character", -e.value.length), end: -n.moveEnd("character", -e.value.length) });
              } else t = o.getOffsets(e);return t || { start: 0, end: 0 };
            }, setSelection: function setSelection(e, t) {
              var n = t.start,
                  r = t.end;if (void 0 === r && (r = n), "selectionStart" in e) e.selectionStart = n, e.selectionEnd = Math.min(r, e.value.length);else if (document.selection && e.nodeName && "input" === e.nodeName.toLowerCase()) {
                var i = e.createTextRange();i.collapse(!0), i.moveStart("character", n), i.moveEnd("character", r - n), i.select();
              } else o.setOffsets(e, t);
            } };t.exports = u;
        }, { 127: 127, 132: 132, 133: 133, 41: 41 }], 57: [function (e, t, n) {
          "use strict";
          var r = { remove: function remove(e) {
              e._reactInternalInstance = void 0;
            }, get: function get(e) {
              return e._reactInternalInstance;
            }, has: function has(e) {
              return void 0 !== e._reactInternalInstance;
            }, set: function set(e, t) {
              e._reactInternalInstance = t;
            } };t.exports = r;
        }, {}], 58: [function (e, t, n) {
          "use strict";
          t.exports = { debugTool: null };
        }, {}], 59: [function (e, t, n) {
          "use strict";
          var r = e(92),
              o = /\/?>/,
              i = /^<\!\-\-/,
              a = { CHECKSUM_ATTR_NAME: "data-react-checksum", addChecksumToMarkup: function addChecksumToMarkup(e) {
              var t = r(e);return i.test(e) ? e : e.replace(o, " " + a.CHECKSUM_ATTR_NAME + '="' + t + '"$&');
            }, canReuseMarkup: function canReuseMarkup(e, t) {
              var n = t.getAttribute(a.CHECKSUM_ATTR_NAME);return n = n && parseInt(n, 10), r(e) === n;
            } };t.exports = a;
        }, { 92: 92 }], 60: [function (e, t, n) {
          "use strict";
          function r(e, t) {
            for (var n = Math.min(e.length, t.length), r = 0; r < n; r++) {
              if (e.charAt(r) !== t.charAt(r)) return r;
            }return e.length === t.length ? -1 : n;
          }function o(e) {
            return e ? e.nodeType === A ? e.documentElement : e.firstChild : null;
          }function i(e) {
            return e.getAttribute && e.getAttribute(I) || "";
          }function a(e, t, n, r, o) {
            var i;if (b.logTopLevelRenders) {
              var a = e._currentElement.props.child,
                  s = a.type;i = "React mount: " + ("string" == typeof s ? s : s.displayName || s.name), console.time(i);
            }var u = w.mountComponent(e, n, null, _(e, t), o, 0);i && console.timeEnd(i), e._renderedComponent._topLevelWrapper = e, V._mountImageIntoNode(u, t, e, r, n);
          }function s(e, t, n, r) {
            var o = k.ReactReconcileTransaction.getPooled(!n && C.useCreateElement);o.perform(a, null, e, t, o, n, r), k.ReactReconcileTransaction.release(o);
          }function u(e, t, n) {
            for (w.unmountComponent(e, n), t.nodeType === A && (t = t.documentElement); t.lastChild;) {
              t.removeChild(t.lastChild);
            }
          }function l(e) {
            var t = o(e);if (t) {
              var n = y.getInstanceFromNode(t);return !(!n || !n._hostParent);
            }
          }function c(e) {
            return !(!e || e.nodeType !== R && e.nodeType !== A && e.nodeType !== D);
          }function p(e) {
            var t = o(e),
                n = t && y.getInstanceFromNode(t);return n && !n._hostParent ? n : null;
          }function d(e) {
            var t = p(e);return t ? t._hostContainerInfo._topLevelWrapper : null;
          }var f = e(113),
              h = e(9),
              m = e(11),
              v = e(121),
              g = e(25),
              y = (e(120), e(33)),
              _ = e(34),
              C = e(36),
              b = e(53),
              E = e(57),
              x = (e(58), e(59)),
              w = e(66),
              T = e(70),
              k = e(71),
              P = e(131),
              S = e(109),
              N = (e(138), e(115)),
              M = e(117),
              I = (e(143), m.ID_ATTRIBUTE_NAME),
              O = m.ROOT_ATTRIBUTE_NAME,
              R = 1,
              A = 9,
              D = 11,
              L = {},
              U = 1,
              F = function F() {
            this.rootID = U++;
          };F.prototype.isReactComponent = {}, F.prototype.render = function () {
            return this.props.child;
          }, F.isReactTopLevelWrapper = !0;var V = { TopLevelWrapper: F, _instancesByReactRootID: L, scrollMonitor: function scrollMonitor(e, t) {
              t();
            }, _updateRootComponent: function _updateRootComponent(e, t, n, r, o) {
              return V.scrollMonitor(r, function () {
                T.enqueueElementInternal(e, t, n), o && T.enqueueCallbackInternal(e, o);
              }), e;
            }, _renderNewRootComponent: function _renderNewRootComponent(e, t, n, r) {
              c(t) || f("37"), g.ensureScrollValueMonitoring();var o = S(e, !1);k.batchedUpdates(s, o, t, n, r);var i = o._instance.rootID;return L[i] = o, o;
            }, renderSubtreeIntoContainer: function renderSubtreeIntoContainer(e, t, n, r) {
              return null != e && E.has(e) || f("38"), V._renderSubtreeIntoContainer(e, t, n, r);
            }, _renderSubtreeIntoContainer: function _renderSubtreeIntoContainer(e, t, n, r) {
              T.validateCallback(r, "ReactDOM.render"), v.isValidElement(t) || f("39", "string" == typeof t ? " Instead of passing a string like 'div', pass React.createElement('div') or <div />." : "function" == typeof t ? " Instead of passing a class like Foo, pass React.createElement(Foo) or <Foo />." : null != t && void 0 !== t.props ? " This may be caused by unintentionally loading two independent copies of React." : "");var a,
                  s = v.createElement(F, { child: t });if (e) {
                var u = E.get(e);a = u._processChildContext(u._context);
              } else a = P;var c = d(n);if (c) {
                var p = c._currentElement,
                    h = p.props.child;if (M(h, t)) {
                  var m = c._renderedComponent.getPublicInstance(),
                      g = r && function () {
                    r.call(m);
                  };return V._updateRootComponent(c, s, a, n, g), m;
                }V.unmountComponentAtNode(n);
              }var y = o(n),
                  _ = y && !!i(y),
                  C = l(n),
                  b = _ && !c && !C,
                  x = V._renderNewRootComponent(s, n, b, a)._renderedComponent.getPublicInstance();return r && r.call(x), x;
            }, render: function render(e, t, n) {
              return V._renderSubtreeIntoContainer(null, e, t, n);
            }, unmountComponentAtNode: function unmountComponentAtNode(e) {
              c(e) || f("40");var t = d(e);return t ? (delete L[t._instance.rootID], k.batchedUpdates(u, t, e, !1), !0) : (l(e), 1 === e.nodeType && e.hasAttribute(O), !1);
            }, _mountImageIntoNode: function _mountImageIntoNode(e, t, n, i, a) {
              if (c(t) || f("41"), i) {
                var s = o(t);if (x.canReuseMarkup(e, s)) return void y.precacheNode(n, s);var u = s.getAttribute(x.CHECKSUM_ATTR_NAME);s.removeAttribute(x.CHECKSUM_ATTR_NAME);var l = s.outerHTML;s.setAttribute(x.CHECKSUM_ATTR_NAME, u);var p = e,
                    d = r(p, l),
                    m = " (client) " + p.substring(d - 20, d + 20) + "\n (server) " + l.substring(d - 20, d + 20);t.nodeType === A && f("42", m);
              }if (t.nodeType === A && f("43"), a.useCreateElement) {
                for (; t.lastChild;) {
                  t.removeChild(t.lastChild);
                }h.insertTreeBefore(t, e, null);
              } else N(t, e), y.precacheNode(n, t.firstChild);
            } };t.exports = V;
        }, { 109: 109, 11: 11, 113: 113, 115: 115, 117: 117, 120: 120, 121: 121, 131: 131, 138: 138, 143: 143, 25: 25, 33: 33, 34: 34, 36: 36, 53: 53, 57: 57, 58: 58, 59: 59, 66: 66, 70: 70, 71: 71, 9: 9 }], 61: [function (e, t, n) {
          "use strict";
          function r(e, t, n) {
            return { type: "INSERT_MARKUP", content: e, fromIndex: null, fromNode: null, toIndex: n, afterNode: t };
          }function o(e, t, n) {
            return { type: "MOVE_EXISTING", content: null, fromIndex: e._mountIndex, fromNode: d.getHostNode(e), toIndex: n, afterNode: t };
          }function i(e, t) {
            return { type: "REMOVE_NODE", content: null, fromIndex: e._mountIndex, fromNode: t, toIndex: null, afterNode: null };
          }function a(e) {
            return { type: "SET_MARKUP", content: e, fromIndex: null, fromNode: null, toIndex: null, afterNode: null };
          }function s(e) {
            return { type: "TEXT_CONTENT", content: e, fromIndex: null, fromNode: null, toIndex: null, afterNode: null };
          }function u(e, t) {
            return t && (e = e || [], e.push(t)), e;
          }function l(e, t) {
            p.processChildrenUpdates(e, t);
          }var c = e(113),
              p = e(28),
              d = (e(57), e(58), e(120), e(66)),
              f = e(26),
              h = (e(130), e(97)),
              m = (e(138), { Mixin: { _reconcilerInstantiateChildren: function _reconcilerInstantiateChildren(e, t, n) {
                return f.instantiateChildren(e, t, n);
              }, _reconcilerUpdateChildren: function _reconcilerUpdateChildren(e, t, n, r, o, i) {
                var a;return a = h(t, 0), f.updateChildren(e, a, n, r, o, this, this._hostContainerInfo, i, 0), a;
              }, mountChildren: function mountChildren(e, t, n) {
                var r = this._reconcilerInstantiateChildren(e, t, n);this._renderedChildren = r;var o = [],
                    i = 0;for (var a in r) {
                  if (r.hasOwnProperty(a)) {
                    var s = r[a],
                        u = d.mountComponent(s, t, this, this._hostContainerInfo, n, 0);s._mountIndex = i++, o.push(u);
                  }
                }return o;
              }, updateTextContent: function updateTextContent(e) {
                var t = this._renderedChildren;f.unmountChildren(t, !1);for (var n in t) {
                  t.hasOwnProperty(n) && c("118");
                }l(this, [s(e)]);
              }, updateMarkup: function updateMarkup(e) {
                var t = this._renderedChildren;f.unmountChildren(t, !1);for (var n in t) {
                  t.hasOwnProperty(n) && c("118");
                }l(this, [a(e)]);
              }, updateChildren: function updateChildren(e, t, n) {
                this._updateChildren(e, t, n);
              }, _updateChildren: function _updateChildren(e, t, n) {
                var r = this._renderedChildren,
                    o = {},
                    i = [],
                    a = this._reconcilerUpdateChildren(r, e, i, o, t, n);if (a || r) {
                  var s,
                      c = null,
                      p = 0,
                      f = 0,
                      h = 0,
                      m = null;for (s in a) {
                    if (a.hasOwnProperty(s)) {
                      var v = r && r[s],
                          g = a[s];v === g ? (c = u(c, this.moveChild(v, m, p, f)), f = Math.max(v._mountIndex, f), v._mountIndex = p) : (v && (f = Math.max(v._mountIndex, f)), c = u(c, this._mountChildAtIndex(g, i[h], m, p, t, n)), h++), p++, m = d.getHostNode(g);
                    }
                  }for (s in o) {
                    o.hasOwnProperty(s) && (c = u(c, this._unmountChild(r[s], o[s])));
                  }c && l(this, c), this._renderedChildren = a;
                }
              }, unmountChildren: function unmountChildren(e) {
                var t = this._renderedChildren;f.unmountChildren(t, e), this._renderedChildren = null;
              }, moveChild: function moveChild(e, t, n, r) {
                if (e._mountIndex < r) return o(e, t, n);
              }, createChild: function createChild(e, t, n) {
                return r(n, t, e._mountIndex);
              }, removeChild: function removeChild(e, t) {
                return i(e, t);
              }, _mountChildAtIndex: function _mountChildAtIndex(e, t, n, r, o, i) {
                return e._mountIndex = r, this.createChild(e, n, t);
              }, _unmountChild: function _unmountChild(e, t) {
                var n = this.removeChild(e, t);return e._mountIndex = null, n;
              } } });t.exports = m;
        }, { 113: 113, 120: 120, 130: 130, 138: 138, 26: 26, 28: 28, 57: 57, 58: 58, 66: 66, 97: 97 }], 62: [function (e, t, n) {
          "use strict";
          var r = e(113),
              o = e(121),
              i = (e(138), { HOST: 0, COMPOSITE: 1, EMPTY: 2, getType: function getType(e) {
              return null === e || !1 === e ? i.EMPTY : o.isValidElement(e) ? "function" == typeof e.type ? i.COMPOSITE : i.HOST : void r("26", e);
            } });t.exports = i;
        }, { 113: 113, 121: 121, 138: 138 }], 63: [function (e, t, n) {
          "use strict";
          function r(e) {
            return !(!e || "function" != typeof e.attachRef || "function" != typeof e.detachRef);
          }var o = e(113),
              i = (e(138), { addComponentAsRefTo: function addComponentAsRefTo(e, t, n) {
              r(n) || o("119"), n.attachRef(t, e);
            }, removeComponentAsRefFrom: function removeComponentAsRefFrom(e, t, n) {
              r(n) || o("120");var i = n.getPublicInstance();i && i.refs[t] === e.getPublicInstance() && n.detachRef(t);
            } });t.exports = i;
        }, { 113: 113, 138: 138 }], 64: [function (e, t, n) {
          "use strict";
          t.exports = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
        }, {}], 65: [function (e, t, n) {
          "use strict";
          function r(e) {
            this.reinitializeTransaction(), this.renderToStaticMarkup = !1, this.reactMountReady = i.getPooled(null), this.useCreateElement = e;
          }var o = e(144),
              i = e(6),
              a = e(24),
              s = e(25),
              u = e(56),
              l = (e(58), e(89)),
              c = e(70),
              p = { initialize: u.getSelectionInformation, close: u.restoreSelection },
              d = { initialize: function initialize() {
              var e = s.isEnabled();return s.setEnabled(!1), e;
            }, close: function close(e) {
              s.setEnabled(e);
            } },
              f = { initialize: function initialize() {
              this.reactMountReady.reset();
            }, close: function close() {
              this.reactMountReady.notifyAll();
            } },
              h = [p, d, f],
              m = { getTransactionWrappers: function getTransactionWrappers() {
              return h;
            }, getReactMountReady: function getReactMountReady() {
              return this.reactMountReady;
            }, getUpdateQueue: function getUpdateQueue() {
              return c;
            }, checkpoint: function checkpoint() {
              return this.reactMountReady.checkpoint();
            }, rollback: function rollback(e) {
              this.reactMountReady.rollback(e);
            }, destructor: function destructor() {
              i.release(this.reactMountReady), this.reactMountReady = null;
            } };o(r.prototype, l, m), a.addPoolingTo(r), t.exports = r;
        }, { 144: 144, 24: 24, 25: 25, 56: 56, 58: 58, 6: 6, 70: 70, 89: 89 }], 66: [function (e, t, n) {
          "use strict";
          function r() {
            o.attachRefs(this, this._currentElement);
          }var o = e(67),
              i = (e(58), e(143), { mountComponent: function mountComponent(e, t, n, o, i, a) {
              var s = e.mountComponent(t, n, o, i, a);return e._currentElement && null != e._currentElement.ref && t.getReactMountReady().enqueue(r, e), s;
            }, getHostNode: function getHostNode(e) {
              return e.getHostNode();
            }, unmountComponent: function unmountComponent(e, t) {
              o.detachRefs(e, e._currentElement), e.unmountComponent(t);
            }, receiveComponent: function receiveComponent(e, t, n, i) {
              var a = e._currentElement;if (t !== a || i !== e._context) {
                var s = o.shouldUpdateRefs(a, t);s && o.detachRefs(e, a), e.receiveComponent(t, n, i), s && e._currentElement && null != e._currentElement.ref && n.getReactMountReady().enqueue(r, e);
              }
            }, performUpdateIfNecessary: function performUpdateIfNecessary(e, t, n) {
              e._updateBatchNumber === n && e.performUpdateIfNecessary(t);
            } });t.exports = i;
        }, { 143: 143, 58: 58, 67: 67 }], 67: [function (e, t, n) {
          "use strict";
          function r(e, t, n) {
            "function" == typeof e ? e(t.getPublicInstance()) : i.addComponentAsRefTo(t, e, n);
          }function o(e, t, n) {
            "function" == typeof e ? e(null) : i.removeComponentAsRefFrom(t, e, n);
          }var i = e(63),
              a = {};a.attachRefs = function (e, t) {
            if (null !== t && "object" == (typeof t === "undefined" ? "undefined" : _typeof(t))) {
              var n = t.ref;null != n && r(n, e, t._owner);
            }
          }, a.shouldUpdateRefs = function (e, t) {
            var n = null,
                r = null;null !== e && "object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) && (n = e.ref, r = e._owner);var o = null,
                i = null;return null !== t && "object" == (typeof t === "undefined" ? "undefined" : _typeof(t)) && (o = t.ref, i = t._owner), n !== o || "string" == typeof o && i !== r;
          }, a.detachRefs = function (e, t) {
            if (null !== t && "object" == (typeof t === "undefined" ? "undefined" : _typeof(t))) {
              var n = t.ref;null != n && o(n, e, t._owner);
            }
          }, t.exports = a;
        }, { 63: 63 }], 68: [function (e, t, n) {
          "use strict";
          function r(e) {
            this.reinitializeTransaction(), this.renderToStaticMarkup = e, this.useCreateElement = !1, this.updateQueue = new s(this);
          }var o = e(144),
              i = e(24),
              a = e(89),
              s = (e(58), e(69)),
              u = [],
              l = { enqueue: function enqueue() {} },
              c = { getTransactionWrappers: function getTransactionWrappers() {
              return u;
            }, getReactMountReady: function getReactMountReady() {
              return l;
            }, getUpdateQueue: function getUpdateQueue() {
              return this.updateQueue;
            }, destructor: function destructor() {}, checkpoint: function checkpoint() {}, rollback: function rollback() {} };o(r.prototype, a, c), i.addPoolingTo(r), t.exports = r;
        }, { 144: 144, 24: 24, 58: 58, 69: 69, 89: 89 }], 69: [function (e, t, n) {
          "use strict";
          function r(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }var o = e(70),
              i = (e(143), function () {
            function e(t) {
              r(this, e), this.transaction = t;
            }return e.prototype.isMounted = function (e) {
              return !1;
            }, e.prototype.enqueueCallback = function (e, t, n) {
              this.transaction.isInTransaction() && o.enqueueCallback(e, t, n);
            }, e.prototype.enqueueForceUpdate = function (e) {
              this.transaction.isInTransaction() && o.enqueueForceUpdate(e);
            }, e.prototype.enqueueReplaceState = function (e, t) {
              this.transaction.isInTransaction() && o.enqueueReplaceState(e, t);
            }, e.prototype.enqueueSetState = function (e, t) {
              this.transaction.isInTransaction() && o.enqueueSetState(e, t);
            }, e;
          }());t.exports = i;
        }, { 143: 143, 70: 70 }], 70: [function (e, t, n) {
          "use strict";
          function r(e) {
            u.enqueueUpdate(e);
          }function o(e) {
            var t = typeof e === "undefined" ? "undefined" : _typeof(e);if ("object" !== t) return t;var n = e.constructor && e.constructor.name || t,
                r = Object.keys(e);return r.length > 0 && r.length < 20 ? n + " (keys: " + r.join(", ") + ")" : n;
          }function i(e, t) {
            var n = s.get(e);return n || null;
          }var a = e(113),
              s = (e(120), e(57)),
              u = (e(58), e(71)),
              l = (e(138), e(143), { isMounted: function isMounted(e) {
              var t = s.get(e);return !!t && !!t._renderedComponent;
            }, enqueueCallback: function enqueueCallback(e, t, n) {
              l.validateCallback(t, n);var o = i(e);if (!o) return null;o._pendingCallbacks ? o._pendingCallbacks.push(t) : o._pendingCallbacks = [t], r(o);
            }, enqueueCallbackInternal: function enqueueCallbackInternal(e, t) {
              e._pendingCallbacks ? e._pendingCallbacks.push(t) : e._pendingCallbacks = [t], r(e);
            }, enqueueForceUpdate: function enqueueForceUpdate(e) {
              var t = i(e, "forceUpdate");t && (t._pendingForceUpdate = !0, r(t));
            }, enqueueReplaceState: function enqueueReplaceState(e, t, n) {
              var o = i(e, "replaceState");o && (o._pendingStateQueue = [t], o._pendingReplaceState = !0, void 0 !== n && null !== n && (l.validateCallback(n, "replaceState"), o._pendingCallbacks ? o._pendingCallbacks.push(n) : o._pendingCallbacks = [n]), r(o));
            }, enqueueSetState: function enqueueSetState(e, t) {
              var n = i(e, "setState");n && ((n._pendingStateQueue || (n._pendingStateQueue = [])).push(t), r(n));
            }, enqueueElementInternal: function enqueueElementInternal(e, t, n) {
              e._pendingElement = t, e._context = n, r(e);
            }, validateCallback: function validateCallback(e, t) {
              e && "function" != typeof e && a("122", t, o(e));
            } });t.exports = l;
        }, { 113: 113, 120: 120, 138: 138, 143: 143, 57: 57, 58: 58, 71: 71 }], 71: [function (e, t, n) {
          "use strict";
          function r() {
            P.ReactReconcileTransaction && b || c("123");
          }function o() {
            this.reinitializeTransaction(), this.dirtyComponentsLength = null, this.callbackQueue = d.getPooled(), this.reconcileTransaction = P.ReactReconcileTransaction.getPooled(!0);
          }function i(e, t, n, o, i, a) {
            return r(), b.batchedUpdates(e, t, n, o, i, a);
          }function a(e, t) {
            return e._mountOrder - t._mountOrder;
          }function s(e) {
            var t = e.dirtyComponentsLength;t !== g.length && c("124", t, g.length), g.sort(a), y++;for (var n = 0; n < t; n++) {
              var r = g[n],
                  o = r._pendingCallbacks;r._pendingCallbacks = null;var i;if (h.logTopLevelRenders) {
                var s = r;r._currentElement.type.isReactTopLevelWrapper && (s = r._renderedComponent), i = "React update: " + s.getName(), console.time(i);
              }if (m.performUpdateIfNecessary(r, e.reconcileTransaction, y), i && console.timeEnd(i), o) for (var u = 0; u < o.length; u++) {
                e.callbackQueue.enqueue(o[u], r.getPublicInstance());
              }
            }
          }function u(e) {
            if (r(), !b.isBatchingUpdates) return void b.batchedUpdates(u, e);g.push(e), null == e._updateBatchNumber && (e._updateBatchNumber = y + 1);
          }function l(e, t) {
            b.isBatchingUpdates || c("125"), _.enqueue(e, t), C = !0;
          }var c = e(113),
              p = e(144),
              d = e(6),
              f = e(24),
              h = e(53),
              m = e(66),
              v = e(89),
              g = (e(138), []),
              y = 0,
              _ = d.getPooled(),
              C = !1,
              b = null,
              E = { initialize: function initialize() {
              this.dirtyComponentsLength = g.length;
            }, close: function close() {
              this.dirtyComponentsLength !== g.length ? (g.splice(0, this.dirtyComponentsLength), T()) : g.length = 0;
            } },
              x = { initialize: function initialize() {
              this.callbackQueue.reset();
            }, close: function close() {
              this.callbackQueue.notifyAll();
            } },
              w = [E, x];p(o.prototype, v, { getTransactionWrappers: function getTransactionWrappers() {
              return w;
            }, destructor: function destructor() {
              this.dirtyComponentsLength = null, d.release(this.callbackQueue), this.callbackQueue = null, P.ReactReconcileTransaction.release(this.reconcileTransaction), this.reconcileTransaction = null;
            }, perform: function perform(e, t, n) {
              return v.perform.call(this, this.reconcileTransaction.perform, this.reconcileTransaction, e, t, n);
            } }), f.addPoolingTo(o);var T = function T() {
            for (; g.length || C;) {
              if (g.length) {
                var e = o.getPooled();e.perform(s, null, e), o.release(e);
              }if (C) {
                C = !1;var t = _;_ = d.getPooled(), t.notifyAll(), d.release(t);
              }
            }
          },
              k = { injectReconcileTransaction: function injectReconcileTransaction(e) {
              e || c("126"), P.ReactReconcileTransaction = e;
            }, injectBatchingStrategy: function injectBatchingStrategy(e) {
              e || c("127"), "function" != typeof e.batchedUpdates && c("128"), "boolean" != typeof e.isBatchingUpdates && c("129"), b = e;
            } },
              P = { ReactReconcileTransaction: null, batchedUpdates: i, enqueueUpdate: u, flushBatchedUpdates: T, injection: k, asap: l };t.exports = P;
        }, { 113: 113, 138: 138, 144: 144, 24: 24, 53: 53, 6: 6, 66: 66, 89: 89 }], 72: [function (e, t, n) {
          "use strict";
          t.exports = "15.6.1";
        }, {}], 73: [function (e, t, n) {
          "use strict";
          var r = { xlink: "http://www.w3.org/1999/xlink", xml: "http://www.w3.org/XML/1998/namespace" },
              o = { accentHeight: "accent-height", accumulate: 0, additive: 0, alignmentBaseline: "alignment-baseline", allowReorder: "allowReorder", alphabetic: 0, amplitude: 0, arabicForm: "arabic-form", ascent: 0, attributeName: "attributeName", attributeType: "attributeType", autoReverse: "autoReverse", azimuth: 0, baseFrequency: "baseFrequency", baseProfile: "baseProfile", baselineShift: "baseline-shift", bbox: 0, begin: 0, bias: 0, by: 0, calcMode: "calcMode", capHeight: "cap-height", clip: 0, clipPath: "clip-path", clipRule: "clip-rule", clipPathUnits: "clipPathUnits", colorInterpolation: "color-interpolation", colorInterpolationFilters: "color-interpolation-filters", colorProfile: "color-profile", colorRendering: "color-rendering", contentScriptType: "contentScriptType", contentStyleType: "contentStyleType", cursor: 0, cx: 0, cy: 0, d: 0, decelerate: 0, descent: 0, diffuseConstant: "diffuseConstant", direction: 0, display: 0, divisor: 0, dominantBaseline: "dominant-baseline", dur: 0, dx: 0, dy: 0, edgeMode: "edgeMode", elevation: 0, enableBackground: "enable-background", end: 0, exponent: 0, externalResourcesRequired: "externalResourcesRequired", fill: 0, fillOpacity: "fill-opacity", fillRule: "fill-rule", filter: 0, filterRes: "filterRes", filterUnits: "filterUnits", floodColor: "flood-color", floodOpacity: "flood-opacity", focusable: 0, fontFamily: "font-family", fontSize: "font-size", fontSizeAdjust: "font-size-adjust", fontStretch: "font-stretch", fontStyle: "font-style", fontVariant: "font-variant", fontWeight: "font-weight", format: 0, from: 0, fx: 0, fy: 0, g1: 0, g2: 0, glyphName: "glyph-name", glyphOrientationHorizontal: "glyph-orientation-horizontal", glyphOrientationVertical: "glyph-orientation-vertical", glyphRef: "glyphRef", gradientTransform: "gradientTransform", gradientUnits: "gradientUnits", hanging: 0, horizAdvX: "horiz-adv-x", horizOriginX: "horiz-origin-x", ideographic: 0, imageRendering: "image-rendering", in: 0, in2: 0, intercept: 0, k: 0, k1: 0, k2: 0, k3: 0, k4: 0, kernelMatrix: "kernelMatrix", kernelUnitLength: "kernelUnitLength", kerning: 0, keyPoints: "keyPoints", keySplines: "keySplines", keyTimes: "keyTimes", lengthAdjust: "lengthAdjust", letterSpacing: "letter-spacing", lightingColor: "lighting-color", limitingConeAngle: "limitingConeAngle", local: 0, markerEnd: "marker-end", markerMid: "marker-mid", markerStart: "marker-start", markerHeight: "markerHeight", markerUnits: "markerUnits", markerWidth: "markerWidth", mask: 0, maskContentUnits: "maskContentUnits", maskUnits: "maskUnits", mathematical: 0, mode: 0, numOctaves: "numOctaves", offset: 0, opacity: 0, operator: 0, order: 0, orient: 0, orientation: 0, origin: 0, overflow: 0, overlinePosition: "overline-position", overlineThickness: "overline-thickness", paintOrder: "paint-order", panose1: "panose-1", pathLength: "pathLength", patternContentUnits: "patternContentUnits", patternTransform: "patternTransform", patternUnits: "patternUnits", pointerEvents: "pointer-events", points: 0, pointsAtX: "pointsAtX", pointsAtY: "pointsAtY", pointsAtZ: "pointsAtZ", preserveAlpha: "preserveAlpha", preserveAspectRatio: "preserveAspectRatio", primitiveUnits: "primitiveUnits", r: 0, radius: 0, refX: "refX", refY: "refY", renderingIntent: "rendering-intent", repeatCount: "repeatCount", repeatDur: "repeatDur", requiredExtensions: "requiredExtensions", requiredFeatures: "requiredFeatures", restart: 0, result: 0, rotate: 0, rx: 0, ry: 0, scale: 0, seed: 0, shapeRendering: "shape-rendering", slope: 0, spacing: 0, specularConstant: "specularConstant", specularExponent: "specularExponent", speed: 0, spreadMethod: "spreadMethod", startOffset: "startOffset", stdDeviation: "stdDeviation", stemh: 0, stemv: 0, stitchTiles: "stitchTiles", stopColor: "stop-color", stopOpacity: "stop-opacity", strikethroughPosition: "strikethrough-position", strikethroughThickness: "strikethrough-thickness", string: 0, stroke: 0, strokeDasharray: "stroke-dasharray", strokeDashoffset: "stroke-dashoffset", strokeLinecap: "stroke-linecap", strokeLinejoin: "stroke-linejoin", strokeMiterlimit: "stroke-miterlimit", strokeOpacity: "stroke-opacity", strokeWidth: "stroke-width", surfaceScale: "surfaceScale", systemLanguage: "systemLanguage", tableValues: "tableValues", targetX: "targetX", targetY: "targetY", textAnchor: "text-anchor", textDecoration: "text-decoration", textRendering: "text-rendering", textLength: "textLength", to: 0, transform: 0, u1: 0, u2: 0, underlinePosition: "underline-position", underlineThickness: "underline-thickness", unicode: 0, unicodeBidi: "unicode-bidi", unicodeRange: "unicode-range", unitsPerEm: "units-per-em", vAlphabetic: "v-alphabetic", vHanging: "v-hanging", vIdeographic: "v-ideographic", vMathematical: "v-mathematical", values: 0, vectorEffect: "vector-effect", version: 0, vertAdvY: "vert-adv-y", vertOriginX: "vert-origin-x", vertOriginY: "vert-origin-y", viewBox: "viewBox", viewTarget: "viewTarget", visibility: 0, widths: 0, wordSpacing: "word-spacing", writingMode: "writing-mode", x: 0, xHeight: "x-height", x1: 0, x2: 0, xChannelSelector: "xChannelSelector", xlinkActuate: "xlink:actuate", xlinkArcrole: "xlink:arcrole", xlinkHref: "xlink:href", xlinkRole: "xlink:role", xlinkShow: "xlink:show", xlinkTitle: "xlink:title", xlinkType: "xlink:type", xmlBase: "xml:base", xmlns: 0, xmlnsXlink: "xmlns:xlink", xmlLang: "xml:lang", xmlSpace: "xml:space", y: 0, y1: 0, y2: 0, yChannelSelector: "yChannelSelector", z: 0, zoomAndPan: "zoomAndPan" },
              i = { Properties: {}, DOMAttributeNamespaces: { xlinkActuate: r.xlink, xlinkArcrole: r.xlink, xlinkHref: r.xlink, xlinkRole: r.xlink, xlinkShow: r.xlink, xlinkTitle: r.xlink, xlinkType: r.xlink, xmlBase: r.xml, xmlLang: r.xml, xmlSpace: r.xml }, DOMAttributeNames: {} };Object.keys(o).forEach(function (e) {
            i.Properties[e] = 0, o[e] && (i.DOMAttributeNames[e] = o[e]);
          }), t.exports = i;
        }, {}], 74: [function (e, t, n) {
          "use strict";
          function r(e) {
            if ("selectionStart" in e && u.hasSelectionCapabilities(e)) return { start: e.selectionStart, end: e.selectionEnd };if (window.getSelection) {
              var t = window.getSelection();return { anchorNode: t.anchorNode, anchorOffset: t.anchorOffset, focusNode: t.focusNode, focusOffset: t.focusOffset };
            }if (document.selection) {
              var n = document.selection.createRange();return { parentElement: n.parentElement(), text: n.text, top: n.boundingTop, left: n.boundingLeft };
            }
          }function o(e, t) {
            if (y || null == m || m !== c()) return null;var n = r(m);if (!g || !d(g, n)) {
              g = n;var o = l.getPooled(h.select, v, e, t);return o.type = "select", o.target = m, i.accumulateTwoPhaseDispatches(o), o;
            }return null;
          }var i = e(19),
              a = e(124),
              s = e(33),
              u = e(56),
              l = e(80),
              c = e(133),
              p = e(111),
              d = e(142),
              f = a.canUseDOM && "documentMode" in document && document.documentMode <= 11,
              h = { select: { phasedRegistrationNames: { bubbled: "onSelect", captured: "onSelectCapture" }, dependencies: ["topBlur", "topContextMenu", "topFocus", "topKeyDown", "topKeyUp", "topMouseDown", "topMouseUp", "topSelectionChange"] } },
              m = null,
              v = null,
              g = null,
              y = !1,
              _ = !1,
              C = { eventTypes: h,
            extractEvents: function extractEvents(e, t, n, r) {
              if (!_) return null;var i = t ? s.getNodeFromInstance(t) : window;switch (e) {case "topFocus":
                  (p(i) || "true" === i.contentEditable) && (m = i, v = t, g = null);break;case "topBlur":
                  m = null, v = null, g = null;break;case "topMouseDown":
                  y = !0;break;case "topContextMenu":case "topMouseUp":
                  return y = !1, o(n, r);case "topSelectionChange":
                  if (f) break;case "topKeyDown":case "topKeyUp":
                  return o(n, r);}return null;
            }, didPutListener: function didPutListener(e, t, n) {
              "onSelect" === t && (_ = !0);
            } };t.exports = C;
        }, { 111: 111, 124: 124, 133: 133, 142: 142, 19: 19, 33: 33, 56: 56, 80: 80 }], 75: [function (e, t, n) {
          "use strict";
          function r(e) {
            return "." + e._rootNodeID;
          }function o(e) {
            return "button" === e || "input" === e || "select" === e || "textarea" === e;
          }var i = e(113),
              a = e(123),
              s = e(19),
              u = e(33),
              l = e(76),
              c = e(77),
              p = e(80),
              d = e(81),
              f = e(83),
              h = e(84),
              m = e(79),
              v = e(85),
              g = e(86),
              y = e(87),
              _ = e(88),
              C = e(130),
              b = e(99),
              E = (e(138), {}),
              x = {};["abort", "animationEnd", "animationIteration", "animationStart", "blur", "canPlay", "canPlayThrough", "click", "contextMenu", "copy", "cut", "doubleClick", "drag", "dragEnd", "dragEnter", "dragExit", "dragLeave", "dragOver", "dragStart", "drop", "durationChange", "emptied", "encrypted", "ended", "error", "focus", "input", "invalid", "keyDown", "keyPress", "keyUp", "load", "loadedData", "loadedMetadata", "loadStart", "mouseDown", "mouseMove", "mouseOut", "mouseOver", "mouseUp", "paste", "pause", "play", "playing", "progress", "rateChange", "reset", "scroll", "seeked", "seeking", "stalled", "submit", "suspend", "timeUpdate", "touchCancel", "touchEnd", "touchMove", "touchStart", "transitionEnd", "volumeChange", "waiting", "wheel"].forEach(function (e) {
            var t = e[0].toUpperCase() + e.slice(1),
                n = "on" + t,
                r = "top" + t,
                o = { phasedRegistrationNames: { bubbled: n, captured: n + "Capture" }, dependencies: [r] };E[e] = o, x[r] = o;
          });var w = {},
              T = { eventTypes: E, extractEvents: function extractEvents(e, t, n, r) {
              var o = x[e];if (!o) return null;var a;switch (e) {case "topAbort":case "topCanPlay":case "topCanPlayThrough":case "topDurationChange":case "topEmptied":case "topEncrypted":case "topEnded":case "topError":case "topInput":case "topInvalid":case "topLoad":case "topLoadedData":case "topLoadedMetadata":case "topLoadStart":case "topPause":case "topPlay":case "topPlaying":case "topProgress":case "topRateChange":case "topReset":case "topSeeked":case "topSeeking":case "topStalled":case "topSubmit":case "topSuspend":case "topTimeUpdate":case "topVolumeChange":case "topWaiting":
                  a = p;break;case "topKeyPress":
                  if (0 === b(n)) return null;case "topKeyDown":case "topKeyUp":
                  a = f;break;case "topBlur":case "topFocus":
                  a = d;break;case "topClick":
                  if (2 === n.button) return null;case "topDoubleClick":case "topMouseDown":case "topMouseMove":case "topMouseUp":case "topMouseOut":case "topMouseOver":case "topContextMenu":
                  a = h;break;case "topDrag":case "topDragEnd":case "topDragEnter":case "topDragExit":case "topDragLeave":case "topDragOver":case "topDragStart":case "topDrop":
                  a = m;break;case "topTouchCancel":case "topTouchEnd":case "topTouchMove":case "topTouchStart":
                  a = v;break;case "topAnimationEnd":case "topAnimationIteration":case "topAnimationStart":
                  a = l;break;case "topTransitionEnd":
                  a = g;break;case "topScroll":
                  a = y;break;case "topWheel":
                  a = _;break;case "topCopy":case "topCut":case "topPaste":
                  a = c;}a || i("86", e);var u = a.getPooled(o, t, n, r);return s.accumulateTwoPhaseDispatches(u), u;
            }, didPutListener: function didPutListener(e, t, n) {
              if ("onClick" === t && !o(e._tag)) {
                var i = r(e),
                    s = u.getNodeFromInstance(e);w[i] || (w[i] = a.listen(s, "click", C));
              }
            }, willDeleteListener: function willDeleteListener(e, t) {
              if ("onClick" === t && !o(e._tag)) {
                var n = r(e);w[n].remove(), delete w[n];
              }
            } };t.exports = T;
        }, { 113: 113, 123: 123, 130: 130, 138: 138, 19: 19, 33: 33, 76: 76, 77: 77, 79: 79, 80: 80, 81: 81, 83: 83, 84: 84, 85: 85, 86: 86, 87: 87, 88: 88, 99: 99 }], 76: [function (e, t, n) {
          "use strict";
          function r(e, t, n, r) {
            return o.call(this, e, t, n, r);
          }var o = e(80),
              i = { animationName: null, elapsedTime: null, pseudoElement: null };o.augmentClass(r, i), t.exports = r;
        }, { 80: 80 }], 77: [function (e, t, n) {
          "use strict";
          function r(e, t, n, r) {
            return o.call(this, e, t, n, r);
          }var o = e(80),
              i = { clipboardData: function clipboardData(e) {
              return "clipboardData" in e ? e.clipboardData : window.clipboardData;
            } };o.augmentClass(r, i), t.exports = r;
        }, { 80: 80 }], 78: [function (e, t, n) {
          "use strict";
          function r(e, t, n, r) {
            return o.call(this, e, t, n, r);
          }var o = e(80),
              i = { data: null };o.augmentClass(r, i), t.exports = r;
        }, { 80: 80 }], 79: [function (e, t, n) {
          "use strict";
          function r(e, t, n, r) {
            return o.call(this, e, t, n, r);
          }var o = e(84),
              i = { dataTransfer: null };o.augmentClass(r, i), t.exports = r;
        }, { 84: 84 }], 80: [function (e, t, n) {
          "use strict";
          function r(e, t, n, r) {
            this.dispatchConfig = e, this._targetInst = t, this.nativeEvent = n;var o = this.constructor.Interface;for (var i in o) {
              if (o.hasOwnProperty(i)) {
                var s = o[i];s ? this[i] = s(n) : "target" === i ? this.target = r : this[i] = n[i];
              }
            }var u = null != n.defaultPrevented ? n.defaultPrevented : !1 === n.returnValue;return this.isDefaultPrevented = u ? a.thatReturnsTrue : a.thatReturnsFalse, this.isPropagationStopped = a.thatReturnsFalse, this;
          }var o = e(144),
              i = e(24),
              a = e(130),
              s = (e(143), ["dispatchConfig", "_targetInst", "nativeEvent", "isDefaultPrevented", "isPropagationStopped", "_dispatchListeners", "_dispatchInstances"]),
              u = { type: null, target: null, currentTarget: a.thatReturnsNull, eventPhase: null, bubbles: null, cancelable: null, timeStamp: function timeStamp(e) {
              return e.timeStamp || Date.now();
            }, defaultPrevented: null, isTrusted: null };o(r.prototype, { preventDefault: function preventDefault() {
              this.defaultPrevented = !0;var e = this.nativeEvent;e && (e.preventDefault ? e.preventDefault() : "unknown" != typeof e.returnValue && (e.returnValue = !1), this.isDefaultPrevented = a.thatReturnsTrue);
            }, stopPropagation: function stopPropagation() {
              var e = this.nativeEvent;e && (e.stopPropagation ? e.stopPropagation() : "unknown" != typeof e.cancelBubble && (e.cancelBubble = !0), this.isPropagationStopped = a.thatReturnsTrue);
            }, persist: function persist() {
              this.isPersistent = a.thatReturnsTrue;
            }, isPersistent: a.thatReturnsFalse, destructor: function destructor() {
              var e = this.constructor.Interface;for (var t in e) {
                this[t] = null;
              }for (var n = 0; n < s.length; n++) {
                this[s[n]] = null;
              }
            } }), r.Interface = u, r.augmentClass = function (e, t) {
            var n = this,
                r = function r() {};r.prototype = n.prototype;var a = new r();o(a, e.prototype), e.prototype = a, e.prototype.constructor = e, e.Interface = o({}, n.Interface, t), e.augmentClass = n.augmentClass, i.addPoolingTo(e, i.fourArgumentPooler);
          }, i.addPoolingTo(r, i.fourArgumentPooler), t.exports = r;
        }, { 130: 130, 143: 143, 144: 144, 24: 24 }], 81: [function (e, t, n) {
          "use strict";
          function r(e, t, n, r) {
            return o.call(this, e, t, n, r);
          }var o = e(87),
              i = { relatedTarget: null };o.augmentClass(r, i), t.exports = r;
        }, { 87: 87 }], 82: [function (e, t, n) {
          "use strict";
          function r(e, t, n, r) {
            return o.call(this, e, t, n, r);
          }var o = e(80),
              i = { data: null };o.augmentClass(r, i), t.exports = r;
        }, { 80: 80 }], 83: [function (e, t, n) {
          "use strict";
          function r(e, t, n, r) {
            return o.call(this, e, t, n, r);
          }var o = e(87),
              i = e(99),
              a = e(100),
              s = e(101),
              u = { key: a, location: null, ctrlKey: null, shiftKey: null, altKey: null, metaKey: null, repeat: null, locale: null, getModifierState: s, charCode: function charCode(e) {
              return "keypress" === e.type ? i(e) : 0;
            }, keyCode: function keyCode(e) {
              return "keydown" === e.type || "keyup" === e.type ? e.keyCode : 0;
            }, which: function which(e) {
              return "keypress" === e.type ? i(e) : "keydown" === e.type || "keyup" === e.type ? e.keyCode : 0;
            } };o.augmentClass(r, u), t.exports = r;
        }, { 100: 100, 101: 101, 87: 87, 99: 99 }], 84: [function (e, t, n) {
          "use strict";
          function r(e, t, n, r) {
            return o.call(this, e, t, n, r);
          }var o = e(87),
              i = e(90),
              a = e(101),
              s = { screenX: null, screenY: null, clientX: null, clientY: null, ctrlKey: null, shiftKey: null, altKey: null, metaKey: null, getModifierState: a, button: function button(e) {
              var t = e.button;return "which" in e ? t : 2 === t ? 2 : 4 === t ? 1 : 0;
            }, buttons: null, relatedTarget: function relatedTarget(e) {
              return e.relatedTarget || (e.fromElement === e.srcElement ? e.toElement : e.fromElement);
            }, pageX: function pageX(e) {
              return "pageX" in e ? e.pageX : e.clientX + i.currentScrollLeft;
            }, pageY: function pageY(e) {
              return "pageY" in e ? e.pageY : e.clientY + i.currentScrollTop;
            } };o.augmentClass(r, s), t.exports = r;
        }, { 101: 101, 87: 87, 90: 90 }], 85: [function (e, t, n) {
          "use strict";
          function r(e, t, n, r) {
            return o.call(this, e, t, n, r);
          }var o = e(87),
              i = e(101),
              a = { touches: null, targetTouches: null, changedTouches: null, altKey: null, metaKey: null, ctrlKey: null, shiftKey: null, getModifierState: i };o.augmentClass(r, a), t.exports = r;
        }, { 101: 101, 87: 87 }], 86: [function (e, t, n) {
          "use strict";
          function r(e, t, n, r) {
            return o.call(this, e, t, n, r);
          }var o = e(80),
              i = { propertyName: null, elapsedTime: null, pseudoElement: null };o.augmentClass(r, i), t.exports = r;
        }, { 80: 80 }], 87: [function (e, t, n) {
          "use strict";
          function r(e, t, n, r) {
            return o.call(this, e, t, n, r);
          }var o = e(80),
              i = e(102),
              a = { view: function view(e) {
              if (e.view) return e.view;var t = i(e);if (t.window === t) return t;var n = t.ownerDocument;return n ? n.defaultView || n.parentWindow : window;
            }, detail: function detail(e) {
              return e.detail || 0;
            } };o.augmentClass(r, a), t.exports = r;
        }, { 102: 102, 80: 80 }], 88: [function (e, t, n) {
          "use strict";
          function r(e, t, n, r) {
            return o.call(this, e, t, n, r);
          }var o = e(84),
              i = { deltaX: function deltaX(e) {
              return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
            }, deltaY: function deltaY(e) {
              return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
            }, deltaZ: null, deltaMode: null };o.augmentClass(r, i), t.exports = r;
        }, { 84: 84 }], 89: [function (e, t, n) {
          "use strict";
          var r = e(113),
              o = (e(138), {}),
              i = { reinitializeTransaction: function reinitializeTransaction() {
              this.transactionWrappers = this.getTransactionWrappers(), this.wrapperInitData ? this.wrapperInitData.length = 0 : this.wrapperInitData = [], this._isInTransaction = !1;
            }, _isInTransaction: !1, getTransactionWrappers: null, isInTransaction: function isInTransaction() {
              return !!this._isInTransaction;
            }, perform: function perform(e, t, n, o, i, a, s, u) {
              this.isInTransaction() && r("27");var l, c;try {
                this._isInTransaction = !0, l = !0, this.initializeAll(0), c = e.call(t, n, o, i, a, s, u), l = !1;
              } finally {
                try {
                  if (l) try {
                    this.closeAll(0);
                  } catch (e) {} else this.closeAll(0);
                } finally {
                  this._isInTransaction = !1;
                }
              }return c;
            }, initializeAll: function initializeAll(e) {
              for (var t = this.transactionWrappers, n = e; n < t.length; n++) {
                var r = t[n];try {
                  this.wrapperInitData[n] = o, this.wrapperInitData[n] = r.initialize ? r.initialize.call(this) : null;
                } finally {
                  if (this.wrapperInitData[n] === o) try {
                    this.initializeAll(n + 1);
                  } catch (e) {}
                }
              }
            }, closeAll: function closeAll(e) {
              this.isInTransaction() || r("28");for (var t = this.transactionWrappers, n = e; n < t.length; n++) {
                var i,
                    a = t[n],
                    s = this.wrapperInitData[n];try {
                  i = !0, s !== o && a.close && a.close.call(this, s), i = !1;
                } finally {
                  if (i) try {
                    this.closeAll(n + 1);
                  } catch (e) {}
                }
              }this.wrapperInitData.length = 0;
            } };t.exports = i;
        }, { 113: 113, 138: 138 }], 90: [function (e, t, n) {
          "use strict";
          var r = { currentScrollLeft: 0, currentScrollTop: 0, refreshScrollValues: function refreshScrollValues(e) {
              r.currentScrollLeft = e.x, r.currentScrollTop = e.y;
            } };t.exports = r;
        }, {}], 91: [function (e, t, n) {
          "use strict";
          function r(e, t) {
            return null == t && o("30"), null == e ? t : Array.isArray(e) ? Array.isArray(t) ? (e.push.apply(e, t), e) : (e.push(t), e) : Array.isArray(t) ? [e].concat(t) : [e, t];
          }var o = e(113);e(138);t.exports = r;
        }, { 113: 113, 138: 138 }], 92: [function (e, t, n) {
          "use strict";
          function r(e) {
            for (var t = 1, n = 0, r = 0, i = e.length, a = -4 & i; r < a;) {
              for (var s = Math.min(r + 4096, a); r < s; r += 4) {
                n += (t += e.charCodeAt(r)) + (t += e.charCodeAt(r + 1)) + (t += e.charCodeAt(r + 2)) + (t += e.charCodeAt(r + 3));
              }t %= o, n %= o;
            }for (; r < i; r++) {
              n += t += e.charCodeAt(r);
            }return t %= o, n %= o, t | n << 16;
          }var o = 65521;t.exports = r;
        }, {}], 93: [function (e, t, n) {
          "use strict";
          var r = function r(e) {
            return "undefined" != typeof MSApp && MSApp.execUnsafeLocalFunction ? function (t, n, r, o) {
              MSApp.execUnsafeLocalFunction(function () {
                return e(t, n, r, o);
              });
            } : e;
          };t.exports = r;
        }, {}], 94: [function (e, t, n) {
          "use strict";
          function r(e, t, n, r) {
            if (null == t || "boolean" == typeof t || "" === t) return "";var o = isNaN(t);return r || o || 0 === t || i.hasOwnProperty(e) && i[e] ? "" + t : ("string" == typeof t && (t = t.trim()), t + "px");
          }var o = e(4),
              i = (e(143), o.isUnitlessNumber);t.exports = r;
        }, { 143: 143, 4: 4 }], 95: [function (e, t, n) {
          "use strict";
          function r(e) {
            var t = "" + e,
                n = i.exec(t);if (!n) return t;var r,
                o = "",
                a = 0,
                s = 0;for (a = n.index; a < t.length; a++) {
              switch (t.charCodeAt(a)) {case 34:
                  r = "&quot;";break;case 38:
                  r = "&amp;";break;case 39:
                  r = "&#x27;";break;case 60:
                  r = "&lt;";break;case 62:
                  r = "&gt;";break;default:
                  continue;}s !== a && (o += t.substring(s, a)), s = a + 1, o += r;
            }return s !== a ? o + t.substring(s, a) : o;
          }function o(e) {
            return "boolean" == typeof e || "number" == typeof e ? "" + e : r(e);
          }var i = /["'&<>]/;t.exports = o;
        }, {}], 96: [function (e, t, n) {
          "use strict";
          function r(e) {
            if (null == e) return null;if (1 === e.nodeType) return e;var t = a.get(e);if (t) return t = s(t), t ? i.getNodeFromInstance(t) : null;"function" == typeof e.render ? o("44") : o("45", Object.keys(e));
          }var o = e(113),
              i = (e(120), e(33)),
              a = e(57),
              s = e(103);e(138), e(143);t.exports = r;
        }, { 103: 103, 113: 113, 120: 120, 138: 138, 143: 143, 33: 33, 57: 57 }], 97: [function (e, t, n) {
          (function (n) {
            "use strict";
            function r(e, t, n, r) {
              if (e && "object" == (typeof e === "undefined" ? "undefined" : _typeof(e))) {
                var o = e;void 0 === o[n] && null != t && (o[n] = t);
              }
            }function o(e, t) {
              if (null == e) return e;var n = {};return i(e, r, n), n;
            }var i = (e(22), e(118));e(143);void 0 !== n && n.env, t.exports = o;
          }).call(this, void 0);
        }, { 118: 118, 143: 143, 22: 22 }], 98: [function (e, t, n) {
          "use strict";
          function r(e, t, n) {
            Array.isArray(e) ? e.forEach(t, n) : e && t.call(n, e);
          }t.exports = r;
        }, {}], 99: [function (e, t, n) {
          "use strict";
          function r(e) {
            var t,
                n = e.keyCode;return "charCode" in e ? 0 === (t = e.charCode) && 13 === n && (t = 13) : t = n, t >= 32 || 13 === t ? t : 0;
          }t.exports = r;
        }, {}], 100: [function (e, t, n) {
          "use strict";
          function r(e) {
            if (e.key) {
              var t = i[e.key] || e.key;if ("Unidentified" !== t) return t;
            }if ("keypress" === e.type) {
              var n = o(e);return 13 === n ? "Enter" : String.fromCharCode(n);
            }return "keydown" === e.type || "keyup" === e.type ? a[e.keyCode] || "Unidentified" : "";
          }var o = e(99),
              i = { Esc: "Escape", Spacebar: " ", Left: "ArrowLeft", Up: "ArrowUp", Right: "ArrowRight", Down: "ArrowDown", Del: "Delete", Win: "OS", Menu: "ContextMenu", Apps: "ContextMenu", Scroll: "ScrollLock", MozPrintableKey: "Unidentified" },
              a = { 8: "Backspace", 9: "Tab", 12: "Clear", 13: "Enter", 16: "Shift", 17: "Control", 18: "Alt", 19: "Pause", 20: "CapsLock", 27: "Escape", 32: " ", 33: "PageUp", 34: "PageDown", 35: "End", 36: "Home", 37: "ArrowLeft", 38: "ArrowUp", 39: "ArrowRight", 40: "ArrowDown", 45: "Insert", 46: "Delete", 112: "F1", 113: "F2", 114: "F3", 115: "F4", 116: "F5", 117: "F6", 118: "F7", 119: "F8", 120: "F9", 121: "F10", 122: "F11", 123: "F12", 144: "NumLock", 145: "ScrollLock", 224: "Meta" };t.exports = r;
        }, { 99: 99 }], 101: [function (e, t, n) {
          "use strict";
          function r(e) {
            var t = this,
                n = t.nativeEvent;if (n.getModifierState) return n.getModifierState(e);var r = i[e];return !!r && !!n[r];
          }function o(e) {
            return r;
          }var i = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };t.exports = o;
        }, {}], 102: [function (e, t, n) {
          "use strict";
          function r(e) {
            var t = e.target || e.srcElement || window;return t.correspondingUseElement && (t = t.correspondingUseElement), 3 === t.nodeType ? t.parentNode : t;
          }t.exports = r;
        }, {}], 103: [function (e, t, n) {
          "use strict";
          function r(e) {
            for (var t; (t = e._renderedNodeType) === o.COMPOSITE;) {
              e = e._renderedComponent;
            }return t === o.HOST ? e._renderedComponent : t === o.EMPTY ? null : void 0;
          }var o = e(62);t.exports = r;
        }, { 62: 62 }], 104: [function (e, t, n) {
          "use strict";
          function r(e) {
            var t = e && (o && e[o] || e[i]);if ("function" == typeof t) return t;
          }var o = "function" == typeof Symbol && Symbol.iterator,
              i = "@@iterator";t.exports = r;
        }, {}], 105: [function (e, t, n) {
          "use strict";
          function r(e) {
            for (; e && e.firstChild;) {
              e = e.firstChild;
            }return e;
          }function o(e) {
            for (; e;) {
              if (e.nextSibling) return e.nextSibling;e = e.parentNode;
            }
          }function i(e, t) {
            for (var n = r(e), i = 0, a = 0; n;) {
              if (3 === n.nodeType) {
                if (a = i + n.textContent.length, i <= t && a >= t) return { node: n, offset: t - i };i = a;
              }n = r(o(n));
            }
          }t.exports = i;
        }, {}], 106: [function (e, t, n) {
          "use strict";
          function r() {
            return !i && o.canUseDOM && (i = "textContent" in document.documentElement ? "textContent" : "innerText"), i;
          }var o = e(124),
              i = null;t.exports = r;
        }, { 124: 124 }], 107: [function (e, t, n) {
          "use strict";
          function r(e, t) {
            var n = {};return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n["ms" + e] = "MS" + t, n["O" + e] = "o" + t.toLowerCase(), n;
          }function o(e) {
            if (s[e]) return s[e];if (!a[e]) return e;var t = a[e];for (var n in t) {
              if (t.hasOwnProperty(n) && n in u) return s[e] = t[n];
            }return "";
          }var i = e(124),
              a = { animationend: r("Animation", "AnimationEnd"), animationiteration: r("Animation", "AnimationIteration"), animationstart: r("Animation", "AnimationStart"), transitionend: r("Transition", "TransitionEnd") },
              s = {},
              u = {};i.canUseDOM && (u = document.createElement("div").style, "AnimationEvent" in window || (delete a.animationend.animation, delete a.animationiteration.animation, delete a.animationstart.animation), "TransitionEvent" in window || delete a.transitionend.transition), t.exports = o;
        }, { 124: 124 }], 108: [function (e, t, n) {
          "use strict";
          function r(e) {
            var t = e.type,
                n = e.nodeName;return n && "input" === n.toLowerCase() && ("checkbox" === t || "radio" === t);
          }function o(e) {
            return e._wrapperState.valueTracker;
          }function i(e, t) {
            e._wrapperState.valueTracker = t;
          }function a(e) {
            delete e._wrapperState.valueTracker;
          }function s(e) {
            var t;return e && (t = r(e) ? "" + e.checked : e.value), t;
          }var u = e(33),
              l = { _getTrackerFromNode: function _getTrackerFromNode(e) {
              return o(u.getInstanceFromNode(e));
            }, track: function track(e) {
              if (!o(e)) {
                var t = u.getNodeFromInstance(e),
                    n = r(t) ? "checked" : "value",
                    s = Object.getOwnPropertyDescriptor(t.constructor.prototype, n),
                    l = "" + t[n];t.hasOwnProperty(n) || "function" != typeof s.get || "function" != typeof s.set || (Object.defineProperty(t, n, { enumerable: s.enumerable, configurable: !0, get: function get() {
                    return s.get.call(this);
                  }, set: function set(e) {
                    l = "" + e, s.set.call(this, e);
                  } }), i(e, { getValue: function getValue() {
                    return l;
                  }, setValue: function setValue(e) {
                    l = "" + e;
                  }, stopTracking: function stopTracking() {
                    a(e), delete t[n];
                  } }));
              }
            }, updateValueIfChanged: function updateValueIfChanged(e) {
              if (!e) return !1;var t = o(e);if (!t) return l.track(e), !0;var n = t.getValue(),
                  r = s(u.getNodeFromInstance(e));return r !== n && (t.setValue(r), !0);
            }, stopTracking: function stopTracking(e) {
              var t = o(e);t && t.stopTracking();
            } };t.exports = l;
        }, { 33: 33 }], 109: [function (e, t, n) {
          "use strict";
          function r(e) {
            if (e) {
              var t = e.getName();if (t) return " Check the render method of `" + t + "`.";
            }return "";
          }function o(e) {
            return "function" == typeof e && void 0 !== e.prototype && "function" == typeof e.prototype.mountComponent && "function" == typeof e.prototype.receiveComponent;
          }function i(e, t) {
            var n;if (null === e || !1 === e) n = l.create(i);else if ("object" == (typeof e === "undefined" ? "undefined" : _typeof(e))) {
              var s = e,
                  u = s.type;if ("function" != typeof u && "string" != typeof u) {
                var d = "";d += r(s._owner), a("130", null == u ? u : typeof u === "undefined" ? "undefined" : _typeof(u), d);
              }"string" == typeof s.type ? n = c.createInternalComponent(s) : o(s.type) ? (n = new s.type(s), n.getHostNode || (n.getHostNode = n.getNativeNode)) : n = new p(s);
            } else "string" == typeof e || "number" == typeof e ? n = c.createInstanceForText(e) : a("131", typeof e === "undefined" ? "undefined" : _typeof(e));return n._mountIndex = 0, n._mountImage = null, n;
          }var a = e(113),
              s = e(144),
              u = e(29),
              l = e(49),
              c = e(54),
              p = (e(122), e(138), e(143), function (e) {
            this.construct(e);
          });s(p.prototype, u, { _instantiateReactComponent: i }), t.exports = i;
        }, { 113: 113, 122: 122, 138: 138, 143: 143, 144: 144, 29: 29, 49: 49, 54: 54 }], 110: [function (e, t, n) {
          "use strict";
          function r(e, t) {
            if (!i.canUseDOM || t && !("addEventListener" in document)) return !1;var n = "on" + e,
                r = n in document;if (!r) {
              var a = document.createElement("div");a.setAttribute(n, "return;"), r = "function" == typeof a[n];
            }return !r && o && "wheel" === e && (r = document.implementation.hasFeature("Events.wheel", "3.0")), r;
          }var o,
              i = e(124);i.canUseDOM && (o = document.implementation && document.implementation.hasFeature && !0 !== document.implementation.hasFeature("", "")), t.exports = r;
        }, { 124: 124 }], 111: [function (e, t, n) {
          "use strict";
          function r(e) {
            var t = e && e.nodeName && e.nodeName.toLowerCase();return "input" === t ? !!o[e.type] : "textarea" === t;
          }var o = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };t.exports = r;
        }, {}], 112: [function (e, t, n) {
          "use strict";
          function r(e) {
            return '"' + o(e) + '"';
          }var o = e(95);t.exports = r;
        }, { 95: 95 }], 113: [function (e, t, n) {
          "use strict";
          function r(e) {
            for (var t = arguments.length - 1, n = "Minified React error #" + e + "; visit http://facebook.github.io/react/docs/error-decoder.html?invariant=" + e, r = 0; r < t; r++) {
              n += "&args[]=" + encodeURIComponent(arguments[r + 1]);
            }n += " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";var o = new Error(n);throw o.name = "Invariant Violation", o.framesToPop = 1, o;
          }t.exports = r;
        }, {}], 114: [function (e, t, n) {
          "use strict";
          var r = e(60);t.exports = r.renderSubtreeIntoContainer;
        }, { 60: 60 }], 115: [function (e, t, n) {
          "use strict";
          var r,
              o = e(124),
              i = e(10),
              a = /^[ \r\n\t\f]/,
              s = /<(!--|link|noscript|meta|script|style)[ \r\n\t\f\/>]/,
              u = e(93),
              l = u(function (e, t) {
            if (e.namespaceURI !== i.svg || "innerHTML" in e) e.innerHTML = t;else {
              r = r || document.createElement("div"), r.innerHTML = "<svg>" + t + "</svg>";for (var n = r.firstChild; n.firstChild;) {
                e.appendChild(n.firstChild);
              }
            }
          });if (o.canUseDOM) {
            var c = document.createElement("div");c.innerHTML = " ", "" === c.innerHTML && (l = function l(e, t) {
              if (e.parentNode && e.parentNode.replaceChild(e, e), a.test(t) || "<" === t[0] && s.test(t)) {
                e.innerHTML = String.fromCharCode(65279) + t;var n = e.firstChild;1 === n.data.length ? e.removeChild(n) : n.deleteData(0, 1);
              } else e.innerHTML = t;
            }), c = null;
          }t.exports = l;
        }, { 10: 10, 124: 124, 93: 93 }], 116: [function (e, t, n) {
          "use strict";
          var r = e(124),
              o = e(95),
              i = e(115),
              a = function a(e, t) {
            if (t) {
              var n = e.firstChild;if (n && n === e.lastChild && 3 === n.nodeType) return void (n.nodeValue = t);
            }e.textContent = t;
          };r.canUseDOM && ("textContent" in document.documentElement || (a = function a(e, t) {
            if (3 === e.nodeType) return void (e.nodeValue = t);i(e, o(t));
          })), t.exports = a;
        }, { 115: 115, 124: 124, 95: 95 }], 117: [function (e, t, n) {
          "use strict";
          function r(e, t) {
            var n = null === e || !1 === e,
                r = null === t || !1 === t;if (n || r) return n === r;var o = typeof e === "undefined" ? "undefined" : _typeof(e),
                i = typeof t === "undefined" ? "undefined" : _typeof(t);return "string" === o || "number" === o ? "string" === i || "number" === i : "object" === i && e.type === t.type && e.key === t.key;
          }t.exports = r;
        }, {}], 118: [function (e, t, n) {
          "use strict";
          function r(e, t) {
            return e && "object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) && null != e.key ? l.escape(e.key) : t.toString(36);
          }function o(e, t, n, i) {
            var d = typeof e === "undefined" ? "undefined" : _typeof(e);if ("undefined" !== d && "boolean" !== d || (e = null), null === e || "string" === d || "number" === d || "object" === d && e.$$typeof === s) return n(i, e, "" === t ? c + r(e, 0) : t), 1;var f,
                h,
                m = 0,
                v = "" === t ? c : t + p;if (Array.isArray(e)) for (var g = 0; g < e.length; g++) {
              f = e[g], h = v + r(f, g), m += o(f, h, n, i);
            } else {
              var y = u(e);if (y) {
                var _,
                    C = y.call(e);if (y !== e.entries) for (var b = 0; !(_ = C.next()).done;) {
                  f = _.value, h = v + r(f, b++), m += o(f, h, n, i);
                } else for (; !(_ = C.next()).done;) {
                  var E = _.value;E && (f = E[1], h = v + l.escape(E[0]) + p + r(f, 0), m += o(f, h, n, i));
                }
              } else if ("object" === d) {
                var x = String(e);a("31", "[object Object]" === x ? "object with keys {" + Object.keys(e).join(", ") + "}" : x, "");
              }
            }return m;
          }function i(e, t, n) {
            return null == e ? 0 : o(e, "", t, n);
          }var a = e(113),
              s = (e(120), e(48)),
              u = e(104),
              l = (e(138), e(22)),
              c = (e(143), "."),
              p = ":";t.exports = i;
        }, { 104: 104, 113: 113, 120: 120, 138: 138, 143: 143, 22: 22, 48: 48 }], 119: [function (e, t, n) {
          "use strict";
          var r = (e(144), e(130)),
              o = (e(143), r);t.exports = o;
        }, { 130: 130, 143: 143, 144: 144 }], 120: [function (t, n, r) {
          "use strict";
          var o = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;n.exports = o.ReactCurrentOwner;
        }, {}], 121: [function (t, n, r) {
          "use strict";
          n.exports = e;
        }, {}], 122: [function (t, n, r) {
          "use strict";
          var o = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;n.exports = o.getNextDebugID;
        }, {}], 123: [function (e, t, n) {
          "use strict";
          var r = e(130),
              o = { listen: function listen(e, t, n) {
              return e.addEventListener ? (e.addEventListener(t, n, !1), { remove: function remove() {
                  e.removeEventListener(t, n, !1);
                } }) : e.attachEvent ? (e.attachEvent("on" + t, n), { remove: function remove() {
                  e.detachEvent("on" + t, n);
                } }) : void 0;
            }, capture: function capture(e, t, n) {
              return e.addEventListener ? (e.addEventListener(t, n, !0), { remove: function remove() {
                  e.removeEventListener(t, n, !0);
                } }) : { remove: r };
            }, registerDefault: function registerDefault() {} };t.exports = o;
        }, { 130: 130 }], 124: [function (e, t, n) {
          "use strict";
          var r = !("undefined" == typeof window || !window.document || !window.document.createElement),
              o = { canUseDOM: r, canUseWorkers: "undefined" != typeof Worker, canUseEventListeners: r && !(!window.addEventListener && !window.attachEvent), canUseViewport: r && !!window.screen, isInWorker: !r };t.exports = o;
        }, {}], 125: [function (e, t, n) {
          "use strict";
          function r(e) {
            return e.replace(o, function (e, t) {
              return t.toUpperCase();
            });
          }var o = /-(.)/g;t.exports = r;
        }, {}], 126: [function (e, t, n) {
          "use strict";
          function r(e) {
            return o(e.replace(i, "ms-"));
          }var o = e(125),
              i = /^-ms-/;t.exports = r;
        }, { 125: 125 }], 127: [function (e, t, n) {
          "use strict";
          function r(e, t) {
            return !(!e || !t) && (e === t || !o(e) && (o(t) ? r(e, t.parentNode) : "contains" in e ? e.contains(t) : !!e.compareDocumentPosition && !!(16 & e.compareDocumentPosition(t))));
          }var o = e(140);t.exports = r;
        }, { 140: 140 }], 128: [function (e, t, n) {
          "use strict";
          function r(e) {
            var t = e.length;if ((Array.isArray(e) || "object" != (typeof e === "undefined" ? "undefined" : _typeof(e)) && "function" != typeof e) && a(!1), "number" != typeof t && a(!1), 0 === t || t - 1 in e || a(!1), "function" == typeof e.callee && a(!1), e.hasOwnProperty) try {
              return Array.prototype.slice.call(e);
            } catch (e) {}for (var n = Array(t), r = 0; r < t; r++) {
              n[r] = e[r];
            }return n;
          }function o(e) {
            return !!e && ("object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) || "function" == typeof e) && "length" in e && !("setInterval" in e) && "number" != typeof e.nodeType && (Array.isArray(e) || "callee" in e || "item" in e);
          }function i(e) {
            return o(e) ? Array.isArray(e) ? e.slice() : r(e) : [e];
          }var a = e(138);t.exports = i;
        }, { 138: 138 }], 129: [function (e, t, n) {
          "use strict";
          function r(e) {
            var t = e.match(c);return t && t[1].toLowerCase();
          }function o(e, t) {
            var n = l;l || u(!1);var o = r(e),
                i = o && s(o);if (i) {
              n.innerHTML = i[1] + e + i[2];for (var c = i[0]; c--;) {
                n = n.lastChild;
              }
            } else n.innerHTML = e;var p = n.getElementsByTagName("script");p.length && (t || u(!1), a(p).forEach(t));for (var d = Array.from(n.childNodes); n.lastChild;) {
              n.removeChild(n.lastChild);
            }return d;
          }var i = e(124),
              a = e(128),
              s = e(134),
              u = e(138),
              l = i.canUseDOM ? document.createElement("div") : null,
              c = /^\s*<(\w+)/;t.exports = o;
        }, { 124: 124, 128: 128, 134: 134, 138: 138 }], 130: [function (e, t, n) {
          "use strict";
          function r(e) {
            return function () {
              return e;
            };
          }var o = function o() {};o.thatReturns = r, o.thatReturnsFalse = r(!1), o.thatReturnsTrue = r(!0), o.thatReturnsNull = r(null), o.thatReturnsThis = function () {
            return this;
          }, o.thatReturnsArgument = function (e) {
            return e;
          }, t.exports = o;
        }, {}], 131: [function (e, t, n) {
          "use strict";
          var r = {};t.exports = r;
        }, {}], 132: [function (e, t, n) {
          "use strict";
          function r(e) {
            try {
              e.focus();
            } catch (e) {}
          }t.exports = r;
        }, {}], 133: [function (e, t, n) {
          "use strict";
          function r(e) {
            if (void 0 === (e = e || ("undefined" != typeof document ? document : void 0))) return null;try {
              return e.activeElement || e.body;
            } catch (t) {
              return e.body;
            }
          }t.exports = r;
        }, {}], 134: [function (e, t, n) {
          "use strict";
          function r(e) {
            return a || i(!1), d.hasOwnProperty(e) || (e = "*"), s.hasOwnProperty(e) || (a.innerHTML = "*" === e ? "<link />" : "<" + e + "></" + e + ">", s[e] = !a.firstChild), s[e] ? d[e] : null;
          }var o = e(124),
              i = e(138),
              a = o.canUseDOM ? document.createElement("div") : null,
              s = {},
              u = [1, '<select multiple="true">', "</select>"],
              l = [1, "<table>", "</table>"],
              c = [3, "<table><tbody><tr>", "</tr></tbody></table>"],
              p = [1, '<svg xmlns="http://www.w3.org/2000/svg">', "</svg>"],
              d = { "*": [1, "?<div>", "</div>"], area: [1, "<map>", "</map>"], col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"], legend: [1, "<fieldset>", "</fieldset>"], param: [1, "<object>", "</object>"], tr: [2, "<table><tbody>", "</tbody></table>"], optgroup: u, option: u, caption: l, colgroup: l, tbody: l, tfoot: l, thead: l, td: c, th: c };["circle", "clipPath", "defs", "ellipse", "g", "image", "line", "linearGradient", "mask", "path", "pattern", "polygon", "polyline", "radialGradient", "rect", "stop", "text", "tspan"].forEach(function (e) {
            d[e] = p, s[e] = !0;
          }), t.exports = r;
        }, { 124: 124, 138: 138 }], 135: [function (e, t, n) {
          "use strict";
          function r(e) {
            return e.Window && e instanceof e.Window ? { x: e.pageXOffset || e.document.documentElement.scrollLeft, y: e.pageYOffset || e.document.documentElement.scrollTop } : { x: e.scrollLeft, y: e.scrollTop };
          }t.exports = r;
        }, {}], 136: [function (e, t, n) {
          "use strict";
          function r(e) {
            return e.replace(o, "-$1").toLowerCase();
          }var o = /([A-Z])/g;t.exports = r;
        }, {}], 137: [function (e, t, n) {
          "use strict";
          function r(e) {
            return o(e).replace(i, "-ms-");
          }var o = e(136),
              i = /^ms-/;t.exports = r;
        }, { 136: 136 }], 138: [function (e, t, n) {
          "use strict";
          function r(e, t, n, r, i, a, s, u) {
            if (o(t), !e) {
              var l;if (void 0 === t) l = new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else {
                var c = [n, r, i, a, s, u],
                    p = 0;l = new Error(t.replace(/%s/g, function () {
                  return c[p++];
                })), l.name = "Invariant Violation";
              }throw l.framesToPop = 1, l;
            }
          }var o = function o(e) {};t.exports = r;
        }, {}], 139: [function (e, t, n) {
          "use strict";
          function r(e) {
            var t = e ? e.ownerDocument || e : document,
                n = t.defaultView || window;return !(!e || !("function" == typeof n.Node ? e instanceof n.Node : "object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) && "number" == typeof e.nodeType && "string" == typeof e.nodeName));
          }t.exports = r;
        }, {}], 140: [function (e, t, n) {
          "use strict";
          function r(e) {
            return o(e) && 3 == e.nodeType;
          }var o = e(139);t.exports = r;
        }, { 139: 139 }], 141: [function (e, t, n) {
          "use strict";
          function r(e) {
            var t = {};return function (n) {
              return t.hasOwnProperty(n) || (t[n] = e.call(this, n)), t[n];
            };
          }t.exports = r;
        }, {}], 142: [function (e, t, n) {
          "use strict";
          function r(e, t) {
            return e === t ? 0 !== e || 0 !== t || 1 / e == 1 / t : e !== e && t !== t;
          }function o(e, t) {
            if (r(e, t)) return !0;if ("object" != (typeof e === "undefined" ? "undefined" : _typeof(e)) || null === e || "object" != (typeof t === "undefined" ? "undefined" : _typeof(t)) || null === t) return !1;var n = Object.keys(e),
                o = Object.keys(t);if (n.length !== o.length) return !1;for (var a = 0; a < n.length; a++) {
              if (!i.call(t, n[a]) || !r(e[n[a]], t[n[a]])) return !1;
            }return !0;
          }var i = Object.prototype.hasOwnProperty;t.exports = o;
        }, {}], 143: [function (e, t, n) {
          "use strict";
          var r = e(130),
              o = r;t.exports = o;
        }, { 130: 130 }], 144: [function (e, t, n) {
          "use strict";
          function r(e) {
            if (null === e || void 0 === e) throw new TypeError("Object.assign cannot be called with null or undefined");return Object(e);
          }var o = Object.getOwnPropertySymbols,
              i = Object.prototype.hasOwnProperty,
              a = Object.prototype.propertyIsEnumerable;t.exports = function () {
            try {
              if (!Object.assign) return !1;var e = new String("abc");if (e[5] = "de", "5" === Object.getOwnPropertyNames(e)[0]) return !1;for (var t = {}, n = 0; n < 10; n++) {
                t["_" + String.fromCharCode(n)] = n;
              }if ("0123456789" !== Object.getOwnPropertyNames(t).map(function (e) {
                return t[e];
              }).join("")) return !1;var r = {};return "abcdefghijklmnopqrst".split("").forEach(function (e) {
                r[e] = e;
              }), "abcdefghijklmnopqrst" === Object.keys(Object.assign({}, r)).join("");
            } catch (e) {
              return !1;
            }
          }() ? Object.assign : function (e, t) {
            for (var n, s, u = r(e), l = 1; l < arguments.length; l++) {
              n = Object(arguments[l]);for (var c in n) {
                i.call(n, c) && (u[c] = n[c]);
              }if (o) {
                s = o(n);for (var p = 0; p < s.length; p++) {
                  a.call(n, s[p]) && (u[s[p]] = n[s[p]]);
                }
              }
            }return u;
          };
        }, {}], 145: [function (e, t, n) {
          "use strict";
          function r(e, t, n, r, o) {}t.exports = r;
        }, { 138: 138, 143: 143, 148: 148 }], 146: [function (e, t, n) {
          "use strict";
          var r = e(147);t.exports = function (e) {
            return r(e, !1);
          };
        }, { 147: 147 }], 147: [function (e, t, n) {
          "use strict";
          var r = e(130),
              o = e(138),
              i = e(143),
              a = e(148),
              s = e(145);t.exports = function (e, t) {
            function n(e) {
              var t = e && (w && e[w] || e[T]);if ("function" == typeof t) return t;
            }function u(e, t) {
              return e === t ? 0 !== e || 1 / e == 1 / t : e !== e && t !== t;
            }function l(e) {
              this.message = e, this.stack = "";
            }function c(e) {
              function n(n, r, i, s, u, c, p) {
                if (s = s || k, c = c || i, p !== a) if (t) o(!1, "Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types");else ;return null == r[i] ? n ? new l(null === r[i] ? "The " + u + " `" + c + "` is marked as required in `" + s + "`, but its value is `null`." : "The " + u + " `" + c + "` is marked as required in `" + s + "`, but its value is `undefined`.") : null : e(r, i, s, u, c);
              }var r = n.bind(null, !1);return r.isRequired = n.bind(null, !0), r;
            }function p(e) {
              function t(t, n, r, o, i, a) {
                var s = t[n];if (C(s) !== e) return new l("Invalid " + o + " `" + i + "` of type `" + b(s) + "` supplied to `" + r + "`, expected `" + e + "`.");return null;
              }return c(t);
            }function d(e) {
              function t(t, n, r, o, i) {
                if ("function" != typeof e) return new l("Property `" + i + "` of component `" + r + "` has invalid PropType notation inside arrayOf.");var s = t[n];if (!Array.isArray(s)) {
                  return new l("Invalid " + o + " `" + i + "` of type `" + C(s) + "` supplied to `" + r + "`, expected an array.");
                }for (var u = 0; u < s.length; u++) {
                  var c = e(s, u, r, o, i + "[" + u + "]", a);if (c instanceof Error) return c;
                }return null;
              }return c(t);
            }function f(e) {
              function t(t, n, r, o, i) {
                if (!(t[n] instanceof e)) {
                  var a = e.name || k;return new l("Invalid " + o + " `" + i + "` of type `" + x(t[n]) + "` supplied to `" + r + "`, expected instance of `" + a + "`.");
                }return null;
              }return c(t);
            }function h(e) {
              function t(t, n, r, o, i) {
                for (var a = t[n], s = 0; s < e.length; s++) {
                  if (u(a, e[s])) return null;
                }return new l("Invalid " + o + " `" + i + "` of value `" + a + "` supplied to `" + r + "`, expected one of " + JSON.stringify(e) + ".");
              }return Array.isArray(e) ? c(t) : r.thatReturnsNull;
            }function m(e) {
              function t(t, n, r, o, i) {
                if ("function" != typeof e) return new l("Property `" + i + "` of component `" + r + "` has invalid PropType notation inside objectOf.");var s = t[n],
                    u = C(s);if ("object" !== u) return new l("Invalid " + o + " `" + i + "` of type `" + u + "` supplied to `" + r + "`, expected an object.");for (var c in s) {
                  if (s.hasOwnProperty(c)) {
                    var p = e(s, c, r, o, i + "." + c, a);if (p instanceof Error) return p;
                  }
                }return null;
              }return c(t);
            }function v(e) {
              function t(t, n, r, o, i) {
                for (var s = 0; s < e.length; s++) {
                  if (null == (0, e[s])(t, n, r, o, i, a)) return null;
                }return new l("Invalid " + o + " `" + i + "` supplied to `" + r + "`.");
              }if (!Array.isArray(e)) return r.thatReturnsNull;for (var n = 0; n < e.length; n++) {
                var o = e[n];if ("function" != typeof o) return i(!1, "Invalid argument supplid to oneOfType. Expected an array of check functions, but received %s at index %s.", E(o), n), r.thatReturnsNull;
              }return c(t);
            }function g(e) {
              function t(t, n, r, o, i) {
                var s = t[n],
                    u = C(s);if ("object" !== u) return new l("Invalid " + o + " `" + i + "` of type `" + u + "` supplied to `" + r + "`, expected `object`.");for (var c in e) {
                  var p = e[c];if (p) {
                    var d = p(s, c, r, o, i + "." + c, a);if (d) return d;
                  }
                }return null;
              }return c(t);
            }function y(t) {
              switch (typeof t === "undefined" ? "undefined" : _typeof(t)) {case "number":case "string":case "undefined":
                  return !0;case "boolean":
                  return !t;case "object":
                  if (Array.isArray(t)) return t.every(y);if (null === t || e(t)) return !0;var r = n(t);if (!r) return !1;var o,
                      i = r.call(t);if (r !== t.entries) {
                    for (; !(o = i.next()).done;) {
                      if (!y(o.value)) return !1;
                    }
                  } else for (; !(o = i.next()).done;) {
                    var a = o.value;if (a && !y(a[1])) return !1;
                  }return !0;default:
                  return !1;}
            }function _(e, t) {
              return "symbol" === e || "Symbol" === t["@@toStringTag"] || "function" == typeof Symbol && t instanceof Symbol;
            }function C(e) {
              var t = typeof e === "undefined" ? "undefined" : _typeof(e);return Array.isArray(e) ? "array" : e instanceof RegExp ? "object" : _(t, e) ? "symbol" : t;
            }function b(e) {
              if (void 0 === e || null === e) return "" + e;var t = C(e);if ("object" === t) {
                if (e instanceof Date) return "date";if (e instanceof RegExp) return "regexp";
              }return t;
            }function E(e) {
              var t = b(e);switch (t) {case "array":case "object":
                  return "an " + t;case "boolean":case "date":case "regexp":
                  return "a " + t;default:
                  return t;}
            }function x(e) {
              return e.constructor && e.constructor.name ? e.constructor.name : k;
            }var w = "function" == typeof Symbol && Symbol.iterator,
                T = "@@iterator",
                k = "<<anonymous>>",
                P = { array: p("array"), bool: p("boolean"), func: p("function"), number: p("number"), object: p("object"), string: p("string"), symbol: p("symbol"), any: function () {
                return c(r.thatReturnsNull);
              }(), arrayOf: d, element: function () {
                function t(t, n, r, o, i) {
                  var a = t[n];if (!e(a)) {
                    return new l("Invalid " + o + " `" + i + "` of type `" + C(a) + "` supplied to `" + r + "`, expected a single ReactElement.");
                  }return null;
                }return c(t);
              }(), instanceOf: f, node: function () {
                function e(e, t, n, r, o) {
                  return y(e[t]) ? null : new l("Invalid " + r + " `" + o + "` supplied to `" + n + "`, expected a ReactNode.");
                }return c(e);
              }(), objectOf: m, oneOf: h, oneOfType: v, shape: g };return l.prototype = Error.prototype, P.checkPropTypes = s, P.PropTypes = P, P;
          };
        }, { 130: 130, 138: 138, 143: 143, 145: 145, 148: 148 }], 148: [function (e, t, n) {
          "use strict";
          t.exports = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
        }, {}] }, {}, [45])(45);
    }();
  }();
});

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function e(e){for(var t=arguments.length-1,r="Minified React error #"+e+"; visit http://facebook.github.io/react/docs/error-decoder.html?invariant="+e,n=0;n<t;n++)r+="&args[]="+encodeURIComponent(arguments[n+1]);r+=" for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";var o=new Error(r);throw o.name="Invariant Violation",o.framesToPop=1,o}function t(e,t){}function r(e,t,r){this.props=e,this.context=t,this.refs=A,this.updater=r||T}function n(e,t,r){this.props=e,this.context=t,this.refs=A,this.updater=r||T}function o(){}function i(e){return void 0!==e.ref}function a(e){return void 0!==e.key}function l(e){var t=e&&(Z&&e[Z]||e[ee]);if("function"==typeof t)return t}function u(e){var t={"=":"=0",":":"=2"};return"$"+(""+e).replace(/[=:]/g,function(e){return t[e]})}function c(e){var t={"=0":"=","=2":":"};return(""+("."===e[0]&&"$"===e[1]?e.substring(2):e.substring(1))).replace(/(=0|=2)/g,function(e){return t[e]})}function s(e,t){return"object"==typeof e&&null!==e&&null!=e.key?ne.escape(e.key):t.toString(36)}function p(e,t,r,n){var o=typeof e;if("undefined"!==o&&"boolean"!==o||(e=null),null===e||"string"===o||"number"===o||"object"===o&&e.$$typeof===Y)return r(n,e,""===t?oe+s(e,0):t),1;var i,a,l=0,u=""===t?oe:t+ie;if(Array.isArray(e))for(var c=0;c<e.length;c++)i=e[c],a=u+s(i,c),l+=p(i,a,r,n);else{var f=te(e);if(f)for(var d,h=f.call(e),y=0;!(d=h.next()).done;)i=d.value,a=u+s(i,y++),l+=p(i,a,r,n);else if("object"===o){var m=""+e;R("31","[object Object]"===m?"object with keys {"+Object.keys(e).join(", ")+"}":m,"")}}return l}function f(e,t,r){return null==e?0:p(e,"",t,r)}function d(e){return(""+e).replace(ce,"$&/")}function h(e,t){this.func=e,this.context=t,this.count=0}function y(e,t,r){var n=e.func,o=e.context;n.call(o,t,e.count++)}function m(e,t,r){if(null==e)return e;var n=h.getPooled(t,r);ae(e,y,n),h.release(n)}function b(e,t,r,n){this.result=e,this.keyPrefix=t,this.func=r,this.context=n,this.count=0}function v(e,t,r){var n=e.result,o=e.keyPrefix,i=e.func,a=e.context,l=i.call(a,t,e.count++);Array.isArray(l)?g(l,n,r,j.thatReturnsArgument):null!=l&&(X.isValidElement(l)&&(l=X.cloneAndReplaceKey(l,o+(!l.key||t&&t.key===l.key?"":d(l.key)+"/")+r)),n.push(l))}function g(e,t,r,n,o){var i="";null!=r&&(i=d(r)+"/");var a=b.getPooled(t,i,n,o);ae(e,v,a),b.release(a)}function P(e,t,r){if(null==e)return e;var n=[];return g(e,n,null,t,r),n}function k(e,t,r){return null}function _(e,t){return ae(e,k,null)}function E(e){var t=[];return g(e,t,null,j.thatReturnsArgument),t}function w(e){return X.isValidElement(e)||R("143"),e}var S=__webpack_require__(9);__webpack_require__(6);var A=__webpack_require__(21);__webpack_require__(10);var j=__webpack_require__(13),x=__webpack_require__(14),q=__webpack_require__(23),C=__webpack_require__(35),R=e,O={isMounted:function(e){return!1},enqueueForceUpdate:function(e,r,n){t(e,"forceUpdate")},enqueueReplaceState:function(e,r,n,o){t(e,"replaceState")},enqueueSetState:function(e,r,n,o){t(e,"setState")}},T=O;r.prototype.isReactComponent={},r.prototype.setState=function(e,t){"object"!=typeof e&&"function"!=typeof e&&null!=e&&R("85"),this.updater.enqueueSetState(this,e,t,"setState")},r.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")},o.prototype=r.prototype,n.prototype=new o,n.prototype.constructor=n,S(n.prototype,r.prototype),n.prototype.isPureReactComponent=!0;var $={Component:r,PureComponent:n},F=function(e){var t=this;if(t.instancePool.length){var r=t.instancePool.pop();return t.call(r,e),r}return new t(e)},U=function(e,t){var r=this;if(r.instancePool.length){var n=r.instancePool.pop();return r.call(n,e,t),n}return new r(e,t)},I=function(e,t,r){var n=this;if(n.instancePool.length){var o=n.instancePool.pop();return n.call(o,e,t,r),o}return new n(e,t,r)},V=function(e,t,r,n){var o=this;if(o.instancePool.length){var i=o.instancePool.pop();return o.call(i,e,t,r,n),i}return new o(e,t,r,n)},G=function(e){var t=this;e instanceof t||R("25"),e.destructor(),t.instancePool.length<t.poolSize&&t.instancePool.push(e)},M=10,z=F,D=function(e,t){var r=e;return r.instancePool=[],r.getPooled=t||z,r.poolSize||(r.poolSize=M),r.release=G,r},K={addPoolingTo:D,oneArgumentPooler:F,twoArgumentPooler:U,threeArgumentPooler:I,fourArgumentPooler:V},L=K,N={current:null},W=N,B="function"==typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103,Y=B,H=Object.prototype.hasOwnProperty,J={key:!0,ref:!0,__self:!0,__source:!0},Q=function(e,t,r,n,o,i,a){return{$$typeof:Y,type:e,key:t,ref:r,props:a,_owner:i}};Q.createElement=function(e,t,r){var n,o={},l=null,u=null,c=null,s=null;if(null!=t){i(t)&&(u=t.ref),a(t)&&(l=""+t.key),c=void 0===t.__self?null:t.__self,s=void 0===t.__source?null:t.__source;for(n in t)H.call(t,n)&&!J.hasOwnProperty(n)&&(o[n]=t[n])}var p=arguments.length-2;if(1===p)o.children=r;else if(p>1){for(var f=Array(p),d=0;d<p;d++)f[d]=arguments[d+2];o.children=f}if(e&&e.defaultProps){var h=e.defaultProps;for(n in h)void 0===o[n]&&(o[n]=h[n])}return Q(e,l,u,c,s,W.current,o)},Q.createFactory=function(e){var t=Q.createElement.bind(null,e);return t.type=e,t},Q.cloneAndReplaceKey=function(e,t){return Q(e.type,t,e.ref,e._self,e._source,e._owner,e.props)},Q.cloneElement=function(e,t,r){var n,o=S({},e.props),l=e.key,u=e.ref,c=e._self,s=e._source,p=e._owner;if(null!=t){i(t)&&(u=t.ref,p=W.current),a(t)&&(l=""+t.key);var f;e.type&&e.type.defaultProps&&(f=e.type.defaultProps);for(n in t)H.call(t,n)&&!J.hasOwnProperty(n)&&(void 0===t[n]&&void 0!==f?o[n]=f[n]:o[n]=t[n])}var d=arguments.length-2;if(1===d)o.children=r;else if(d>1){for(var h=Array(d),y=0;y<d;y++)h[y]=arguments[y+2];o.children=h}return Q(e.type,l,u,c,s,p,o)},Q.isValidElement=function(e){return"object"==typeof e&&null!==e&&e.$$typeof===Y};var X=Q,Z="function"==typeof Symbol&&Symbol.iterator,ee="@@iterator",te=l,re={escape:u,unescape:c},ne=re,oe=".",ie=":",ae=f,le=L.twoArgumentPooler,ue=L.fourArgumentPooler,ce=/\/+/g;h.prototype.destructor=function(){this.func=null,this.context=null,this.count=0},L.addPoolingTo(h,le),b.prototype.destructor=function(){this.result=null,this.keyPrefix=null,this.func=null,this.context=null,this.count=0},L.addPoolingTo(b,ue);var se={forEach:m,map:P,mapIntoWithKeyPrefixInternal:g,count:_,toArray:E},pe=se,fe=X.createFactory,de={a:fe("a"),abbr:fe("abbr"),address:fe("address"),area:fe("area"),article:fe("article"),aside:fe("aside"),audio:fe("audio"),b:fe("b"),base:fe("base"),bdi:fe("bdi"),bdo:fe("bdo"),big:fe("big"),blockquote:fe("blockquote"),body:fe("body"),br:fe("br"),button:fe("button"),canvas:fe("canvas"),caption:fe("caption"),cite:fe("cite"),code:fe("code"),col:fe("col"),colgroup:fe("colgroup"),data:fe("data"),datalist:fe("datalist"),dd:fe("dd"),del:fe("del"),details:fe("details"),dfn:fe("dfn"),dialog:fe("dialog"),div:fe("div"),dl:fe("dl"),dt:fe("dt"),em:fe("em"),embed:fe("embed"),fieldset:fe("fieldset"),figcaption:fe("figcaption"),figure:fe("figure"),footer:fe("footer"),form:fe("form"),h1:fe("h1"),h2:fe("h2"),h3:fe("h3"),h4:fe("h4"),h5:fe("h5"),h6:fe("h6"),head:fe("head"),header:fe("header"),hgroup:fe("hgroup"),hr:fe("hr"),html:fe("html"),i:fe("i"),iframe:fe("iframe"),img:fe("img"),input:fe("input"),ins:fe("ins"),kbd:fe("kbd"),keygen:fe("keygen"),label:fe("label"),legend:fe("legend"),li:fe("li"),link:fe("link"),main:fe("main"),map:fe("map"),mark:fe("mark"),menu:fe("menu"),menuitem:fe("menuitem"),meta:fe("meta"),meter:fe("meter"),nav:fe("nav"),noscript:fe("noscript"),object:fe("object"),ol:fe("ol"),optgroup:fe("optgroup"),option:fe("option"),output:fe("output"),p:fe("p"),param:fe("param"),picture:fe("picture"),pre:fe("pre"),progress:fe("progress"),q:fe("q"),rp:fe("rp"),rt:fe("rt"),ruby:fe("ruby"),s:fe("s"),samp:fe("samp"),script:fe("script"),section:fe("section"),select:fe("select"),small:fe("small"),source:fe("source"),span:fe("span"),strong:fe("strong"),style:fe("style"),sub:fe("sub"),summary:fe("summary"),sup:fe("sup"),table:fe("table"),tbody:fe("tbody"),td:fe("td"),textarea:fe("textarea"),tfoot:fe("tfoot"),th:fe("th"),thead:fe("thead"),time:fe("time"),title:fe("title"),tr:fe("tr"),track:fe("track"),u:fe("u"),ul:fe("ul"),var:fe("var"),video:fe("video"),wbr:fe("wbr"),circle:fe("circle"),clipPath:fe("clipPath"),defs:fe("defs"),ellipse:fe("ellipse"),g:fe("g"),image:fe("image"),line:fe("line"),linearGradient:fe("linearGradient"),mask:fe("mask"),path:fe("path"),pattern:fe("pattern"),polygon:fe("polygon"),polyline:fe("polyline"),radialGradient:fe("radialGradient"),rect:fe("rect"),stop:fe("stop"),svg:fe("svg"),text:fe("text"),tspan:fe("tspan")},he=de,ye=x,me="16.0.0-alpha.12",be=w,ve=$.Component,ge=X.isValidElement,Pe=C(ve,ge,T),ke=X.createElement,_e=X.createFactory,Ee=X.cloneElement,we=function(e){return e},Se={Children:{map:pe.map,forEach:pe.forEach,count:pe.count,toArray:pe.toArray,only:be},Component:$.Component,PureComponent:$.PureComponent,createElement:ke,cloneElement:Ee,isValidElement:X.isValidElement,PropTypes:ye,checkPropTypes:q,createClass:Pe,createFactory:_e,createMixin:we,DOM:he,version:me,__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED:{ReactCurrentOwner:W}},Ae=Se;module.exports=Ae;


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



var emptyFunction = __webpack_require__(13);
var invariant = __webpack_require__(10);
var warning = __webpack_require__(6);

var ReactPropTypesSecret = __webpack_require__(22);
var checkPropTypes = __webpack_require__(23);

module.exports = function(isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = '<<anonymous>>';

  // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker
  };

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message) {
    this.message = message;
    this.stack = '';
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    if (process.env.NODE_ENV !== 'production') {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          invariant(
            false,
            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
            'Use `PropTypes.checkPropTypes()` to call them. ' +
            'Read more at http://fb.me/use-check-prop-types'
          );
        } else if (process.env.NODE_ENV !== 'production' && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (
            !manualPropTypeCallCache[cacheKey] &&
            // Avoid spamming the console because they are often not actionable except for lib authors
            manualPropTypeWarningCount < 3
          ) {
            warning(
              false,
              'You are manually calling a React.PropTypes validation ' +
              'function for the `%s` prop on `%s`. This is deprecated ' +
              'and will throw in the standalone `prop-types` package. ' +
              'You may be seeing this warning due to a third-party PropTypes ' +
              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.',
              propFullName,
              componentName
            );
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }
          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);

        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunction.thatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOf, expected an instance of array.') : void 0;
      return emptyFunction.thatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues);
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (propValue.hasOwnProperty(key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
      process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
      return emptyFunction.thatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (typeof checker !== 'function') {
        warning(
          false,
          'Invalid argument supplid to oneOfType. Expected an array of check functions, but ' +
          'received %s at index %s.',
          getPostfixForTypeWarning(checker),
          i
        );
        return emptyFunction.thatReturnsNull;
      }
    }

    function validate(props, propName, componentName, location, propFullName) {
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
          return null;
        }
      }

      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (!checker) {
          continue;
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue;
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    if (typeof propValue === 'undefined' || propValue === null) {
      return '' + propValue;
    }
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  // Returns a string that is postfixed to a warning about an invalid type.
  // For example, "undefined" or "of type array"
  function getPostfixForTypeWarning(value) {
    var type = getPreciseType(value);
    switch (type) {
      case 'array':
      case 'object':
        return 'an ' + type;
      case 'boolean':
      case 'date':
      case 'regexp':
        return 'a ' + type;
      default:
        return type;
    }
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



var emptyFunction = __webpack_require__(13);
var invariant = __webpack_require__(10);
var ReactPropTypesSecret = __webpack_require__(22);

module.exports = function() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      // It is still safe when called from React.
      return;
    }
    invariant(
      false,
      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
      'Use PropTypes.checkPropTypes() to call them. ' +
      'Read more at http://fb.me/use-check-prop-types'
    );
  };
  shim.isRequired = shim;
  function getShim() {
    return shim;
  };
  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim
  };

  ReactPropTypes.checkPropTypes = emptyFunction;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var objectAssign$1 = __webpack_require__(9);
var warning = __webpack_require__(6);
var emptyObject = __webpack_require__(21);
var invariant = __webpack_require__(10);
var emptyFunction = __webpack_require__(13);
var checkPropTypes = __webpack_require__(23);
var propTypes = __webpack_require__(14);
var factory = __webpack_require__(35);

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule reactProdInvariant
 * 
 */

function warnNoop(publicInstance, callerName) {
  {
    var constructor = publicInstance.constructor;
    warning(false, '%s(...): Can only update a mounted or mounting component. ' + 'This usually means you called %s() on an unmounted component. ' + 'This is a no-op.\n\nPlease check the code for the %s component.', callerName, callerName, constructor && (constructor.displayName || constructor.name) || 'ReactClass');
  }
}

/**
 * This is the abstract API for an update queue.
 */
var ReactNoopUpdateQueue = {
  /**
   * Checks whether or not this composite component is mounted.
   * @param {ReactClass} publicInstance The instance we want to test.
   * @return {boolean} True if mounted, false otherwise.
   * @protected
   * @final
   */
  isMounted: function (publicInstance) {
    return false;
  },

  /**
   * Forces an update. This should only be invoked when it is known with
   * certainty that we are **not** in a DOM transaction.
   *
   * You may want to call this when you know that some deeper aspect of the
   * component's state has changed but `setState` was not called.
   *
   * This will not invoke `shouldComponentUpdate`, but it will invoke
   * `componentWillUpdate` and `componentDidUpdate`.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @param {?function} callback Called after component is updated.
   * @param {?string} Name of the calling function in the public API.
   * @internal
   */
  enqueueForceUpdate: function (publicInstance, callback, callerName) {
    warnNoop(publicInstance, 'forceUpdate');
  },

  /**
   * Replaces all of the state. Always use this or `setState` to mutate state.
   * You should treat `this.state` as immutable.
   *
   * There is no guarantee that `this.state` will be immediately updated, so
   * accessing `this.state` after calling this method may return the old value.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @param {object} completeState Next state.
   * @param {?function} callback Called after component is updated.
   * @param {?string} Name of the calling function in the public API.
   * @internal
   */
  enqueueReplaceState: function (publicInstance, completeState, callback, callerName) {
    warnNoop(publicInstance, 'replaceState');
  },

  /**
   * Sets a subset of the state. This only exists because _pendingState is
   * internal. This provides a merging strategy that is not available to deep
   * properties which is confusing. TODO: Expose pendingState or don't use it
   * during the merge.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @param {object} partialState Next partial state to be merged with state.
   * @param {?function} callback Called after component is updated.
   * @param {?string} Name of the calling function in the public API.
   * @internal
   */
  enqueueSetState: function (publicInstance, partialState, callback, callerName) {
    warnNoop(publicInstance, 'setState');
  }
};

var ReactNoopUpdateQueue_1 = ReactNoopUpdateQueue;

/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 * @providesModule canDefineProperty
 */

var canDefineProperty$1 = false;
{
  try {
    // $FlowFixMe https://github.com/facebook/flow/issues/285
    Object.defineProperty({}, 'x', { get: function () {} });
    canDefineProperty$1 = true;
  } catch (x) {
    // IE will fail on defineProperty
  }
}

var canDefineProperty_1 = canDefineProperty$1;

/**
 * Base class helpers for the updating state of a component.
 */
function ReactComponent(props, context, updater) {
  this.props = props;
  this.context = context;
  this.refs = emptyObject;
  // We initialize the default updater but the real one gets injected by the
  // renderer.
  this.updater = updater || ReactNoopUpdateQueue_1;
}

ReactComponent.prototype.isReactComponent = {};

/**
 * Sets a subset of the state. Always use this to mutate
 * state. You should treat `this.state` as immutable.
 *
 * There is no guarantee that `this.state` will be immediately updated, so
 * accessing `this.state` after calling this method may return the old value.
 *
 * There is no guarantee that calls to `setState` will run synchronously,
 * as they may eventually be batched together.  You can provide an optional
 * callback that will be executed when the call to setState is actually
 * completed.
 *
 * When a function is provided to setState, it will be called at some point in
 * the future (not synchronously). It will be called with the up to date
 * component arguments (state, props, context). These values can be different
 * from this.* because your function may be called after receiveProps but before
 * shouldComponentUpdate, and this new state, props, and context will not yet be
 * assigned to this.
 *
 * @param {object|function} partialState Next partial state or function to
 *        produce next partial state to be merged with current state.
 * @param {?function} callback Called after state is updated.
 * @final
 * @protected
 */
ReactComponent.prototype.setState = function (partialState, callback) {
  !(typeof partialState === 'object' || typeof partialState === 'function' || partialState == null) ? invariant(false, 'setState(...): takes an object of state variables to update or a function which returns an object of state variables.') : void 0;
  this.updater.enqueueSetState(this, partialState, callback, 'setState');
};

/**
 * Forces an update. This should only be invoked when it is known with
 * certainty that we are **not** in a DOM transaction.
 *
 * You may want to call this when you know that some deeper aspect of the
 * component's state has changed but `setState` was not called.
 *
 * This will not invoke `shouldComponentUpdate`, but it will invoke
 * `componentWillUpdate` and `componentDidUpdate`.
 *
 * @param {?function} callback Called after update is complete.
 * @final
 * @protected
 */
ReactComponent.prototype.forceUpdate = function (callback) {
  this.updater.enqueueForceUpdate(this, callback, 'forceUpdate');
};

/**
 * Deprecated APIs. These APIs used to exist on classic React classes but since
 * we would like to deprecate them, we're not going to move them over to this
 * modern base class. Instead, we define a getter that warns if it's accessed.
 */
{
  var deprecatedAPIs = {
    isMounted: ['isMounted', 'Instead, make sure to clean up subscriptions and pending requests in ' + 'componentWillUnmount to prevent memory leaks.'],
    replaceState: ['replaceState', 'Refactor your code to use setState instead (see ' + 'https://github.com/facebook/react/issues/3236).']
  };
  var defineDeprecationWarning = function (methodName, info) {
    if (canDefineProperty_1) {
      Object.defineProperty(ReactComponent.prototype, methodName, {
        get: function () {
          warning(false, '%s(...) is deprecated in plain JavaScript React classes. %s', info[0], info[1]);
          return undefined;
        }
      });
    }
  };
  for (var fnName in deprecatedAPIs) {
    if (deprecatedAPIs.hasOwnProperty(fnName)) {
      defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
    }
  }
}

/**
 * Base class helpers for the updating state of a component.
 */
function ReactPureComponent(props, context, updater) {
  // Duplicated from ReactComponent.
  this.props = props;
  this.context = context;
  this.refs = emptyObject;
  // We initialize the default updater but the real one gets injected by the
  // renderer.
  this.updater = updater || ReactNoopUpdateQueue_1;
}

function ComponentDummy() {}
ComponentDummy.prototype = ReactComponent.prototype;
ReactPureComponent.prototype = new ComponentDummy();
ReactPureComponent.prototype.constructor = ReactPureComponent;
// Avoid an extra prototype jump for these methods.
objectAssign$1(ReactPureComponent.prototype, ReactComponent.prototype);
ReactPureComponent.prototype.isPureReactComponent = true;

var ReactBaseClasses = {
  Component: ReactComponent,
  PureComponent: ReactPureComponent
};

/**
 * Static poolers. Several custom versions for each potential number of
 * arguments. A completely generic pooler is easy to implement, but would
 * require accessing the `arguments` object. In each of these, `this` refers to
 * the Class itself, not an instance. If any others are needed, simply add them
 * here, or in their own files.
 */
var oneArgumentPooler = function (copyFieldsFrom) {
  var Klass = this;
  if (Klass.instancePool.length) {
    var instance = Klass.instancePool.pop();
    Klass.call(instance, copyFieldsFrom);
    return instance;
  } else {
    return new Klass(copyFieldsFrom);
  }
};

var twoArgumentPooler$1 = function (a1, a2) {
  var Klass = this;
  if (Klass.instancePool.length) {
    var instance = Klass.instancePool.pop();
    Klass.call(instance, a1, a2);
    return instance;
  } else {
    return new Klass(a1, a2);
  }
};

var threeArgumentPooler = function (a1, a2, a3) {
  var Klass = this;
  if (Klass.instancePool.length) {
    var instance = Klass.instancePool.pop();
    Klass.call(instance, a1, a2, a3);
    return instance;
  } else {
    return new Klass(a1, a2, a3);
  }
};

var fourArgumentPooler$1 = function (a1, a2, a3, a4) {
  var Klass = this;
  if (Klass.instancePool.length) {
    var instance = Klass.instancePool.pop();
    Klass.call(instance, a1, a2, a3, a4);
    return instance;
  } else {
    return new Klass(a1, a2, a3, a4);
  }
};

var standardReleaser = function (instance) {
  var Klass = this;
  !(instance instanceof Klass) ? invariant(false, 'Trying to release an instance into a pool of a different type.') : void 0;
  instance.destructor();
  if (Klass.instancePool.length < Klass.poolSize) {
    Klass.instancePool.push(instance);
  }
};

var DEFAULT_POOL_SIZE = 10;
var DEFAULT_POOLER = oneArgumentPooler;

/**
 * Augments `CopyConstructor` to be a poolable class, augmenting only the class
 * itself (statically) not adding any prototypical fields. Any CopyConstructor
 * you give this may have a `poolSize` property, and will look for a
 * prototypical `destructor` on instances.
 *
 * @param {Function} CopyConstructor Constructor that can be used to reset.
 * @param {Function} pooler Customizable pooler.
 */
var addPoolingTo = function (CopyConstructor, pooler) {
  // Casting as any so that flow ignores the actual implementation and trusts
  // it to match the type we declared
  var NewKlass = CopyConstructor;
  NewKlass.instancePool = [];
  NewKlass.getPooled = pooler || DEFAULT_POOLER;
  if (!NewKlass.poolSize) {
    NewKlass.poolSize = DEFAULT_POOL_SIZE;
  }
  NewKlass.release = standardReleaser;
  return NewKlass;
};

var PooledClass = {
  addPoolingTo: addPoolingTo,
  oneArgumentPooler: oneArgumentPooler,
  twoArgumentPooler: twoArgumentPooler$1,
  threeArgumentPooler: threeArgumentPooler,
  fourArgumentPooler: fourArgumentPooler$1
};

var PooledClass_1 = PooledClass;

/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactCurrentOwner
 * 
 */

/**
 * Keeps track of the current owner.
 *
 * The current owner is the component who should own any components that are
 * currently being constructed.
 */
var ReactCurrentOwner = {
  /**
   * @internal
   * @type {ReactComponent}
   */
  current: null
};

var ReactCurrentOwner_1 = ReactCurrentOwner;

/**
 * Copyright 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactElementSymbol
 * 
 */

// The Symbol used to tag the ReactElement type. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.

var REACT_ELEMENT_TYPE = typeof Symbol === 'function' && Symbol['for'] && Symbol['for']('react.element') || 0xeac7;

var ReactElementSymbol = REACT_ELEMENT_TYPE;

var hasOwnProperty = Object.prototype.hasOwnProperty;



var RESERVED_PROPS = {
  key: true,
  ref: true,
  __self: true,
  __source: true
};

var specialPropKeyWarningShown;
var specialPropRefWarningShown;

function hasValidRef(config) {
  {
    if (hasOwnProperty.call(config, 'ref')) {
      var getter = Object.getOwnPropertyDescriptor(config, 'ref').get;
      if (getter && getter.isReactWarning) {
        return false;
      }
    }
  }
  return config.ref !== undefined;
}

function hasValidKey(config) {
  {
    if (hasOwnProperty.call(config, 'key')) {
      var getter = Object.getOwnPropertyDescriptor(config, 'key').get;
      if (getter && getter.isReactWarning) {
        return false;
      }
    }
  }
  return config.key !== undefined;
}

function defineKeyPropWarningGetter(props, displayName) {
  var warnAboutAccessingKey = function () {
    if (!specialPropKeyWarningShown) {
      specialPropKeyWarningShown = true;
      warning(false, '%s: `key` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName);
    }
  };
  warnAboutAccessingKey.isReactWarning = true;
  Object.defineProperty(props, 'key', {
    get: warnAboutAccessingKey,
    configurable: true
  });
}

function defineRefPropWarningGetter(props, displayName) {
  var warnAboutAccessingRef = function () {
    if (!specialPropRefWarningShown) {
      specialPropRefWarningShown = true;
      warning(false, '%s: `ref` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName);
    }
  };
  warnAboutAccessingRef.isReactWarning = true;
  Object.defineProperty(props, 'ref', {
    get: warnAboutAccessingRef,
    configurable: true
  });
}

/**
 * Factory method to create a new React element. This no longer adheres to
 * the class pattern, so do not use new to call it. Also, no instanceof check
 * will work. Instead test $$typeof field against Symbol.for('react.element') to check
 * if something is a React Element.
 *
 * @param {*} type
 * @param {*} key
 * @param {string|object} ref
 * @param {*} self A *temporary* helper to detect places where `this` is
 * different from the `owner` when React.createElement is called, so that we
 * can warn. We want to get rid of owner and replace string `ref`s with arrow
 * functions, and as long as `this` and owner are the same, there will be no
 * change in behavior.
 * @param {*} source An annotation object (added by a transpiler or otherwise)
 * indicating filename, line number, and/or other information.
 * @param {*} owner
 * @param {*} props
 * @internal
 */
var ReactElement = function (type, key, ref, self, source, owner, props) {
  var element = {
    // This tag allow us to uniquely identify this as a React Element
    $$typeof: ReactElementSymbol,

    // Built-in properties that belong on the element
    type: type,
    key: key,
    ref: ref,
    props: props,

    // Record the component responsible for creating this element.
    _owner: owner
  };

  {
    // The validation flag is currently mutative. We put it on
    // an external backing store so that we can freeze the whole object.
    // This can be replaced with a WeakMap once they are implemented in
    // commonly used development environments.
    element._store = {};

    // To make comparing ReactElements easier for testing purposes, we make
    // the validation flag non-enumerable (where possible, which should
    // include every environment we run tests in), so the test framework
    // ignores it.
    if (canDefineProperty_1) {
      Object.defineProperty(element._store, 'validated', {
        configurable: false,
        enumerable: false,
        writable: true,
        value: false
      });
      // self and source are DEV only properties.
      Object.defineProperty(element, '_self', {
        configurable: false,
        enumerable: false,
        writable: false,
        value: self
      });
      // Two elements created in two different places should be considered
      // equal for testing purposes and therefore we hide it from enumeration.
      Object.defineProperty(element, '_source', {
        configurable: false,
        enumerable: false,
        writable: false,
        value: source
      });
    } else {
      element._store.validated = false;
      element._self = self;
      element._source = source;
    }
    if (Object.freeze) {
      Object.freeze(element.props);
      Object.freeze(element);
    }
  }

  return element;
};

/**
 * Create and return a new ReactElement of the given type.
 * See https://facebook.github.io/react/docs/react-api.html#createelement
 */
ReactElement.createElement = function (type, config, children) {
  var propName;

  // Reserved names are extracted
  var props = {};

  var key = null;
  var ref = null;
  var self = null;
  var source = null;

  if (config != null) {
    if (hasValidRef(config)) {
      ref = config.ref;
    }
    if (hasValidKey(config)) {
      key = '' + config.key;
    }

    self = config.__self === undefined ? null : config.__self;
    source = config.__source === undefined ? null : config.__source;
    // Remaining properties are added to a new props object
    for (propName in config) {
      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
        props[propName] = config[propName];
      }
    }
  }

  // Children can be more than one argument, and those are transferred onto
  // the newly allocated props object.
  var childrenLength = arguments.length - 2;
  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    var childArray = Array(childrenLength);
    for (var i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }
    {
      if (Object.freeze) {
        Object.freeze(childArray);
      }
    }
    props.children = childArray;
  }

  // Resolve default props
  if (type && type.defaultProps) {
    var defaultProps = type.defaultProps;
    for (propName in defaultProps) {
      if (props[propName] === undefined) {
        props[propName] = defaultProps[propName];
      }
    }
  }
  {
    if (key || ref) {
      if (typeof props.$$typeof === 'undefined' || props.$$typeof !== ReactElementSymbol) {
        var displayName = typeof type === 'function' ? type.displayName || type.name || 'Unknown' : type;
        if (key) {
          defineKeyPropWarningGetter(props, displayName);
        }
        if (ref) {
          defineRefPropWarningGetter(props, displayName);
        }
      }
    }
  }
  return ReactElement(type, key, ref, self, source, ReactCurrentOwner_1.current, props);
};

/**
 * Return a function that produces ReactElements of a given type.
 * See https://facebook.github.io/react/docs/react-api.html#createfactory
 */
ReactElement.createFactory = function (type) {
  var factory$$1 = ReactElement.createElement.bind(null, type);
  // Expose the type on the factory and the prototype so that it can be
  // easily accessed on elements. E.g. `<Foo />.type === Foo`.
  // This should not be named `constructor` since this may not be the function
  // that created the element, and it may not even be a constructor.
  // Legacy hook TODO: Warn if this is accessed
  factory$$1.type = type;
  return factory$$1;
};

ReactElement.cloneAndReplaceKey = function (oldElement, newKey) {
  var newElement = ReactElement(oldElement.type, newKey, oldElement.ref, oldElement._self, oldElement._source, oldElement._owner, oldElement.props);

  return newElement;
};

/**
 * Clone and return a new ReactElement using element as the starting point.
 * See https://facebook.github.io/react/docs/react-api.html#cloneelement
 */
ReactElement.cloneElement = function (element, config, children) {
  var propName;

  // Original props are copied
  var props = objectAssign$1({}, element.props);

  // Reserved names are extracted
  var key = element.key;
  var ref = element.ref;
  // Self is preserved since the owner is preserved.
  var self = element._self;
  // Source is preserved since cloneElement is unlikely to be targeted by a
  // transpiler, and the original source is probably a better indicator of the
  // true owner.
  var source = element._source;

  // Owner will be preserved, unless ref is overridden
  var owner = element._owner;

  if (config != null) {
    if (hasValidRef(config)) {
      // Silently steal the ref from the parent.
      ref = config.ref;
      owner = ReactCurrentOwner_1.current;
    }
    if (hasValidKey(config)) {
      key = '' + config.key;
    }

    // Remaining properties override existing props
    var defaultProps;
    if (element.type && element.type.defaultProps) {
      defaultProps = element.type.defaultProps;
    }
    for (propName in config) {
      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
        if (config[propName] === undefined && defaultProps !== undefined) {
          // Resolve default props
          props[propName] = defaultProps[propName];
        } else {
          props[propName] = config[propName];
        }
      }
    }
  }

  // Children can be more than one argument, and those are transferred onto
  // the newly allocated props object.
  var childrenLength = arguments.length - 2;
  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    var childArray = Array(childrenLength);
    for (var i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }
    props.children = childArray;
  }

  return ReactElement(element.type, key, ref, self, source, owner, props);
};

/**
 * Verifies the object is a ReactElement.
 * See https://facebook.github.io/react/docs/react-api.html#isvalidelement
 * @param {?object} object
 * @return {boolean} True if `object` is a valid component.
 * @final
 */
ReactElement.isValidElement = function (object) {
  return typeof object === 'object' && object !== null && object.$$typeof === ReactElementSymbol;
};

var ReactElement_1 = ReactElement;

/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule getIteratorFn
 * 
 */

/* global Symbol */

var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

/**
 * Returns the iterator method function contained on the iterable object.
 *
 * Be sure to invoke the function with the iterable as context:
 *
 *     var iteratorFn = getIteratorFn(myIterable);
 *     if (iteratorFn) {
 *       var iterator = iteratorFn.call(myIterable);
 *       ...
 *     }
 *
 * @param {?object} maybeIterable
 * @return {?function}
 */
function getIteratorFn(maybeIterable) {
  var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
  if (typeof iteratorFn === 'function') {
    return iteratorFn;
  }
}

var getIteratorFn_1 = getIteratorFn;

/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule KeyEscapeUtils
 * 
 */

/**
 * Escape and wrap key so it is safe to use as a reactid
 *
 * @param {string} key to be escaped.
 * @return {string} the escaped key.
 */

function escape(key) {
  var escapeRegex = /[=:]/g;
  var escaperLookup = {
    '=': '=0',
    ':': '=2'
  };
  var escapedString = ('' + key).replace(escapeRegex, function (match) {
    return escaperLookup[match];
  });

  return '$' + escapedString;
}

/**
 * Unescape and unwrap key for human-readable display
 *
 * @param {string} key to unescape.
 * @return {string} the unescaped key.
 */
function unescape(key) {
  var unescapeRegex = /(=0|=2)/g;
  var unescaperLookup = {
    '=0': '=',
    '=2': ':'
  };
  var keySubstring = key[0] === '.' && key[1] === '$' ? key.substring(2) : key.substring(1);

  return ('' + keySubstring).replace(unescapeRegex, function (match) {
    return unescaperLookup[match];
  });
}

var KeyEscapeUtils = {
  escape: escape,
  unescape: unescape
};

var KeyEscapeUtils_1 = KeyEscapeUtils;

/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactTypeOfWork
 * 
 */

var ReactTypeOfWork = {
  IndeterminateComponent: 0, // Before we know whether it is functional or class
  FunctionalComponent: 1,
  ClassComponent: 2,
  HostRoot: 3, // Root of a host tree. Could be nested inside another node.
  HostPortal: 4, // A subtree. Could be an entry point to a different renderer.
  HostComponent: 5,
  HostText: 6,
  CoroutineComponent: 7,
  CoroutineHandlerPhase: 8,
  YieldComponent: 9,
  Fragment: 10
};

/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule getComponentName
 * 
 */

function getComponentName(instanceOrFiber) {
  if (typeof instanceOrFiber.getName === 'function') {
    // Stack reconciler
    var instance = instanceOrFiber;
    return instance.getName();
  }
  if (typeof instanceOrFiber.tag === 'number') {
    // Fiber reconciler
    var fiber = instanceOrFiber;
    var type = fiber.type;

    if (typeof type === 'string') {
      return type;
    }
    if (typeof type === 'function') {
      return type.displayName || type.name;
    }
  }
  return null;
}

var getComponentName_1 = getComponentName;

var IndeterminateComponent = ReactTypeOfWork.IndeterminateComponent;
var FunctionalComponent = ReactTypeOfWork.FunctionalComponent;
var ClassComponent = ReactTypeOfWork.ClassComponent;
var HostComponent = ReactTypeOfWork.HostComponent;



function describeComponentFrame$1(name, source, ownerName) {
  return '\n    in ' + (name || 'Unknown') + (source ? ' (at ' + source.fileName.replace(/^.*[\\\/]/, '') + ':' + source.lineNumber + ')' : ownerName ? ' (created by ' + ownerName + ')' : '');
}

function describeFiber(fiber) {
  switch (fiber.tag) {
    case IndeterminateComponent:
    case FunctionalComponent:
    case ClassComponent:
    case HostComponent:
      var owner = fiber._debugOwner;
      var source = fiber._debugSource;
      var name = getComponentName_1(fiber);
      var ownerName = null;
      if (owner) {
        ownerName = getComponentName_1(owner);
      }
      return describeComponentFrame$1(name, source, ownerName);
    default:
      return '';
  }
}

// This function can only be called with a work-in-progress fiber and
// only during begin or complete phase. Do not call it under any other
// circumstances.
function getStackAddendumByWorkInProgressFiber$1(workInProgress) {
  var info = '';
  var node = workInProgress;
  do {
    info += describeFiber(node);
    // Otherwise this return pointer might point to the wrong tree:
    node = node['return'];
  } while (node);
  return info;
}

var ReactFiberComponentTreeHook = {
  getStackAddendumByWorkInProgressFiber: getStackAddendumByWorkInProgressFiber$1,
  describeComponentFrame: describeComponentFrame$1
};

var getStackAddendumByWorkInProgressFiber = ReactFiberComponentTreeHook.getStackAddendumByWorkInProgressFiber;
var describeComponentFrame = ReactFiberComponentTreeHook.describeComponentFrame;





function isNative(fn) {
  // Based on isNative() from Lodash
  var funcToString = Function.prototype.toString;
  var reIsNative = RegExp('^' + funcToString
  // Take an example native function source for comparison
  .call(Object.prototype.hasOwnProperty)
  // Strip regex characters so we can use it for regex
  .replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
  // Remove hasOwnProperty from the template to make it generic
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');
  try {
    var source = funcToString.call(fn);
    return reIsNative.test(source);
  } catch (err) {
    return false;
  }
}

var canUseCollections =
// Array.from
typeof Array.from === 'function' &&
// Map
typeof Map === 'function' && isNative(Map) &&
// Map.prototype.keys
Map.prototype != null && typeof Map.prototype.keys === 'function' && isNative(Map.prototype.keys) &&
// Set
typeof Set === 'function' && isNative(Set) &&
// Set.prototype.keys
Set.prototype != null && typeof Set.prototype.keys === 'function' && isNative(Set.prototype.keys);

var setItem;
var getItem;
var removeItem;
var getItemIDs;
var addRoot;
var removeRoot;
var getRootIDs;

if (canUseCollections) {
  var itemMap = new Map();
  var rootIDSet = new Set();

  setItem = function (id, item) {
    itemMap.set(id, item);
  };
  getItem = function (id) {
    return itemMap.get(id);
  };
  removeItem = function (id) {
    itemMap['delete'](id);
  };
  getItemIDs = function () {
    return Array.from(itemMap.keys());
  };

  addRoot = function (id) {
    rootIDSet.add(id);
  };
  removeRoot = function (id) {
    rootIDSet['delete'](id);
  };
  getRootIDs = function () {
    return Array.from(rootIDSet.keys());
  };
} else {
  var itemByKey = {};
  var rootByKey = {};

  // Use non-numeric keys to prevent V8 performance issues:
  // https://github.com/facebook/react/pull/7232
  var getKeyFromID = function (id) {
    return '.' + id;
  };
  var getIDFromKey = function (key) {
    return parseInt(key.substr(1), 10);
  };

  setItem = function (id, item) {
    var key = getKeyFromID(id);
    itemByKey[key] = item;
  };
  getItem = function (id) {
    var key = getKeyFromID(id);
    return itemByKey[key];
  };
  removeItem = function (id) {
    var key = getKeyFromID(id);
    delete itemByKey[key];
  };
  getItemIDs = function () {
    return Object.keys(itemByKey).map(getIDFromKey);
  };

  addRoot = function (id) {
    var key = getKeyFromID(id);
    rootByKey[key] = true;
  };
  removeRoot = function (id) {
    var key = getKeyFromID(id);
    delete rootByKey[key];
  };
  getRootIDs = function () {
    return Object.keys(rootByKey).map(getIDFromKey);
  };
}

var unmountedIDs = [];

function purgeDeep(id) {
  var item = getItem(id);
  if (item) {
    var childIDs = item.childIDs;

    removeItem(id);
    childIDs.forEach(purgeDeep);
  }
}

function getDisplayName(element) {
  if (element == null) {
    return '#empty';
  } else if (typeof element === 'string' || typeof element === 'number') {
    return '#text';
  } else if (typeof element.type === 'string') {
    return element.type;
  } else {
    return element.type.displayName || element.type.name || 'Unknown';
  }
}

function describeID(id) {
  var name = ReactComponentTreeHook.getDisplayName(id);
  var element = ReactComponentTreeHook.getElement(id);
  var ownerID = ReactComponentTreeHook.getOwnerID(id);
  var ownerName = void 0;

  if (ownerID) {
    ownerName = ReactComponentTreeHook.getDisplayName(ownerID);
  }
  warning(element, 'ReactComponentTreeHook: Missing React element for debugID %s when ' + 'building stack', id);
  return describeComponentFrame(name || '', element && element._source, ownerName || '');
}

var ReactComponentTreeHook = {
  onSetChildren: function (id, nextChildIDs) {
    var item = getItem(id);
    invariant(item, 'Item must have been set');
    item.childIDs = nextChildIDs;

    for (var i = 0; i < nextChildIDs.length; i++) {
      var nextChildID = nextChildIDs[i];
      var nextChild = getItem(nextChildID);
      !nextChild ? invariant(false, 'Expected hook events to fire for the child before its parent includes it in onSetChildren().') : void 0;
      !(nextChild.childIDs != null || typeof nextChild.element !== 'object' || nextChild.element == null) ? invariant(false, 'Expected onSetChildren() to fire for a container child before its parent includes it in onSetChildren().') : void 0;
      !nextChild.isMounted ? invariant(false, 'Expected onMountComponent() to fire for the child before its parent includes it in onSetChildren().') : void 0;
      if (nextChild.parentID == null) {
        nextChild.parentID = id;
        // TODO: This shouldn't be necessary but mounting a new root during in
        // componentWillMount currently causes not-yet-mounted components to
        // be purged from our tree data so their parent id is missing.
      }
      !(nextChild.parentID === id) ? invariant(false, 'Expected onBeforeMountComponent() parent and onSetChildren() to be consistent (%s has parents %s and %s).', nextChildID, nextChild.parentID, id) : void 0;
    }
  },
  onBeforeMountComponent: function (id, element, parentID) {
    var item = {
      element: element,
      parentID: parentID,
      text: null,
      childIDs: [],
      isMounted: false,
      updateCount: 0
    };
    setItem(id, item);
  },
  onBeforeUpdateComponent: function (id, element) {
    var item = getItem(id);
    if (!item || !item.isMounted) {
      // We may end up here as a result of setState() in componentWillUnmount().
      // In this case, ignore the element.
      return;
    }
    item.element = element;
  },
  onMountComponent: function (id) {
    var item = getItem(id);
    invariant(item, 'Item must have been set');
    item.isMounted = true;
    var isRoot = item.parentID === 0;
    if (isRoot) {
      addRoot(id);
    }
  },
  onUpdateComponent: function (id) {
    var item = getItem(id);
    if (!item || !item.isMounted) {
      // We may end up here as a result of setState() in componentWillUnmount().
      // In this case, ignore the element.
      return;
    }
    item.updateCount++;
  },
  onUnmountComponent: function (id) {
    var item = getItem(id);
    if (item) {
      // We need to check if it exists.
      // `item` might not exist if it is inside an error boundary, and a sibling
      // error boundary child threw while mounting. Then this instance never
      // got a chance to mount, but it still gets an unmounting event during
      // the error boundary cleanup.
      item.isMounted = false;
      var isRoot = item.parentID === 0;
      if (isRoot) {
        removeRoot(id);
      }
    }
    unmountedIDs.push(id);
  },
  purgeUnmountedComponents: function () {
    if (ReactComponentTreeHook._preventPurging) {
      // Should only be used for testing.
      return;
    }

    for (var i = 0; i < unmountedIDs.length; i++) {
      var id = unmountedIDs[i];
      purgeDeep(id);
    }
    unmountedIDs.length = 0;
  },
  isMounted: function (id) {
    var item = getItem(id);
    return item ? item.isMounted : false;
  },
  getCurrentStackAddendum: function (topElement) {
    var info = '';
    if (topElement) {
      var name = getDisplayName(topElement);
      var owner = topElement._owner;
      info += describeComponentFrame(name, topElement._source, owner && getComponentName_1(owner));
    }

    var currentOwner = ReactCurrentOwner_1.current;
    if (currentOwner) {
      if (typeof currentOwner.tag === 'number') {
        var workInProgress = currentOwner;
        // Safe because if current owner exists, we are reconciling,
        // and it is guaranteed to be the work-in-progress version.
        info += getStackAddendumByWorkInProgressFiber(workInProgress);
      } else if (typeof currentOwner._debugID === 'number') {
        info += ReactComponentTreeHook.getStackAddendumByID(currentOwner._debugID);
      }
    }
    return info;
  },
  getStackAddendumByID: function (id) {
    var info = '';
    while (id) {
      info += describeID(id);
      id = ReactComponentTreeHook.getParentID(id);
    }
    return info;
  },
  getChildIDs: function (id) {
    var item = getItem(id);
    return item ? item.childIDs : [];
  },
  getDisplayName: function (id) {
    var element = ReactComponentTreeHook.getElement(id);
    if (!element) {
      return null;
    }
    return getDisplayName(element);
  },
  getElement: function (id) {
    var item = getItem(id);
    return item ? item.element : null;
  },
  getOwnerID: function (id) {
    var element = ReactComponentTreeHook.getElement(id);
    if (!element || !element._owner) {
      return null;
    }
    return element._owner._debugID;
  },
  getParentID: function (id) {
    var item = getItem(id);
    return item ? item.parentID : null;
  },
  getSource: function (id) {
    var item = getItem(id);
    var element = item ? item.element : null;
    var source = element != null ? element._source : null;
    return source;
  },
  getText: function (id) {
    var element = ReactComponentTreeHook.getElement(id);
    if (typeof element === 'string') {
      return element;
    } else if (typeof element === 'number') {
      return '' + element;
    } else {
      return null;
    }
  },
  getUpdateCount: function (id) {
    var item = getItem(id);
    return item ? item.updateCount : 0;
  },


  getRootIDs: getRootIDs,
  getRegisteredIDs: getItemIDs
};

var ReactComponentTreeHook_1 = ReactComponentTreeHook;

{
  var _require = ReactComponentTreeHook_1,
      getCurrentStackAddendum = _require.getCurrentStackAddendum;
}

var SEPARATOR = '.';
var SUBSEPARATOR = ':';

/**
 * This is inlined from ReactElement since this file is shared between
 * isomorphic and renderers. We could extract this to a
 *
 */

/**
 * TODO: Test that a single child and an array with one item have the same key
 * pattern.
 */

var didWarnAboutMaps = false;

/**
 * Generate a key string that identifies a component within a set.
 *
 * @param {*} component A component that could contain a manual key.
 * @param {number} index Index that is used if a manual key is not provided.
 * @return {string}
 */
function getComponentKey(component, index) {
  // Do some typechecking here since we call this blindly. We want to ensure
  // that we don't block potential future ES APIs.
  if (typeof component === 'object' && component !== null && component.key != null) {
    // Explicit key
    return KeyEscapeUtils_1.escape(component.key);
  }
  // Implicit key determined by the index in the set
  return index.toString(36);
}

/**
 * @param {?*} children Children tree container.
 * @param {!string} nameSoFar Name of the key path so far.
 * @param {!function} callback Callback to invoke with each child found.
 * @param {?*} traverseContext Used to pass information throughout the traversal
 * process.
 * @return {!number} The number of children in this subtree.
 */
function traverseAllChildrenImpl(children, nameSoFar, callback, traverseContext) {
  var type = typeof children;

  if (type === 'undefined' || type === 'boolean') {
    // All of the above are perceived as null.
    children = null;
  }

  if (children === null || type === 'string' || type === 'number' ||
  // The following is inlined from ReactElement. This means we can optimize
  // some checks. React Fiber also inlines this logic for similar purposes.
  type === 'object' && children.$$typeof === ReactElementSymbol) {
    callback(traverseContext, children,
    // If it's the only child, treat the name as if it was wrapped in an array
    // so that it's consistent if the number of children grows.
    nameSoFar === '' ? SEPARATOR + getComponentKey(children, 0) : nameSoFar);
    return 1;
  }

  var child;
  var nextName;
  var subtreeCount = 0; // Count of children found in the current subtree.
  var nextNamePrefix = nameSoFar === '' ? SEPARATOR : nameSoFar + SUBSEPARATOR;

  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      child = children[i];
      nextName = nextNamePrefix + getComponentKey(child, i);
      subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
    }
  } else {
    var iteratorFn = getIteratorFn_1(children);
    if (iteratorFn) {
      {
        // Warn about using Maps as children
        if (iteratorFn === children.entries) {
          warning(didWarnAboutMaps, 'Using Maps as children is unsupported and will likely yield ' + 'unexpected results. Convert it to a sequence/iterable of keyed ' + 'ReactElements instead.%s', getCurrentStackAddendum());
          didWarnAboutMaps = true;
        }
      }

      var iterator = iteratorFn.call(children);
      var step;
      var ii = 0;
      while (!(step = iterator.next()).done) {
        child = step.value;
        nextName = nextNamePrefix + getComponentKey(child, ii++);
        subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
      }
    } else if (type === 'object') {
      var addendum = '';
      {
        addendum = ' If you meant to render a collection of children, use an array ' + 'instead.' + getCurrentStackAddendum();
      }
      var childrenString = '' + children;
      invariant(false, 'Objects are not valid as a React child (found: %s).%s', childrenString === '[object Object]' ? 'object with keys {' + Object.keys(children).join(', ') + '}' : childrenString, addendum);
    }
  }

  return subtreeCount;
}

/**
 * Traverses children that are typically specified as `props.children`, but
 * might also be specified through attributes:
 *
 * - `traverseAllChildren(this.props.children, ...)`
 * - `traverseAllChildren(this.props.leftPanelChildren, ...)`
 *
 * The `traverseContext` is an optional argument that is passed through the
 * entire traversal. It can be used to store accumulations or anything else that
 * the callback might find relevant.
 *
 * @param {?*} children Children tree object.
 * @param {!function} callback To invoke upon traversing each child.
 * @param {?*} traverseContext Context for traversal.
 * @return {!number} The number of children in this subtree.
 */
function traverseAllChildren(children, callback, traverseContext) {
  if (children == null) {
    return 0;
  }

  return traverseAllChildrenImpl(children, '', callback, traverseContext);
}

var traverseAllChildren_1 = traverseAllChildren;

var twoArgumentPooler = PooledClass_1.twoArgumentPooler;
var fourArgumentPooler = PooledClass_1.fourArgumentPooler;

var userProvidedKeyEscapeRegex = /\/+/g;
function escapeUserProvidedKey(text) {
  return ('' + text).replace(userProvidedKeyEscapeRegex, '$&/');
}

/**
 * PooledClass representing the bookkeeping associated with performing a child
 * traversal. Allows avoiding binding callbacks.
 *
 * @constructor ForEachBookKeeping
 * @param {!function} forEachFunction Function to perform traversal with.
 * @param {?*} forEachContext Context to perform context with.
 */
function ForEachBookKeeping(forEachFunction, forEachContext) {
  this.func = forEachFunction;
  this.context = forEachContext;
  this.count = 0;
}
ForEachBookKeeping.prototype.destructor = function () {
  this.func = null;
  this.context = null;
  this.count = 0;
};
PooledClass_1.addPoolingTo(ForEachBookKeeping, twoArgumentPooler);

function forEachSingleChild(bookKeeping, child, name) {
  var func = bookKeeping.func,
      context = bookKeeping.context;

  func.call(context, child, bookKeeping.count++);
}

/**
 * Iterates through children that are typically specified as `props.children`.
 *
 * See https://facebook.github.io/react/docs/react-api.html#react.children.foreach
 *
 * The provided forEachFunc(child, index) will be called for each
 * leaf child.
 *
 * @param {?*} children Children tree container.
 * @param {function(*, int)} forEachFunc
 * @param {*} forEachContext Context for forEachContext.
 */
function forEachChildren(children, forEachFunc, forEachContext) {
  if (children == null) {
    return children;
  }
  var traverseContext = ForEachBookKeeping.getPooled(forEachFunc, forEachContext);
  traverseAllChildren_1(children, forEachSingleChild, traverseContext);
  ForEachBookKeeping.release(traverseContext);
}

/**
 * PooledClass representing the bookkeeping associated with performing a child
 * mapping. Allows avoiding binding callbacks.
 *
 * @constructor MapBookKeeping
 * @param {!*} mapResult Object containing the ordered map of results.
 * @param {!function} mapFunction Function to perform mapping with.
 * @param {?*} mapContext Context to perform mapping with.
 */
function MapBookKeeping(mapResult, keyPrefix, mapFunction, mapContext) {
  this.result = mapResult;
  this.keyPrefix = keyPrefix;
  this.func = mapFunction;
  this.context = mapContext;
  this.count = 0;
}
MapBookKeeping.prototype.destructor = function () {
  this.result = null;
  this.keyPrefix = null;
  this.func = null;
  this.context = null;
  this.count = 0;
};
PooledClass_1.addPoolingTo(MapBookKeeping, fourArgumentPooler);

function mapSingleChildIntoContext(bookKeeping, child, childKey) {
  var result = bookKeeping.result,
      keyPrefix = bookKeeping.keyPrefix,
      func = bookKeeping.func,
      context = bookKeeping.context;


  var mappedChild = func.call(context, child, bookKeeping.count++);
  if (Array.isArray(mappedChild)) {
    mapIntoWithKeyPrefixInternal(mappedChild, result, childKey, emptyFunction.thatReturnsArgument);
  } else if (mappedChild != null) {
    if (ReactElement_1.isValidElement(mappedChild)) {
      mappedChild = ReactElement_1.cloneAndReplaceKey(mappedChild,
      // Keep both the (mapped) and old keys if they differ, just as
      // traverseAllChildren used to do for objects as children
      keyPrefix + (mappedChild.key && (!child || child.key !== mappedChild.key) ? escapeUserProvidedKey(mappedChild.key) + '/' : '') + childKey);
    }
    result.push(mappedChild);
  }
}

function mapIntoWithKeyPrefixInternal(children, array, prefix, func, context) {
  var escapedPrefix = '';
  if (prefix != null) {
    escapedPrefix = escapeUserProvidedKey(prefix) + '/';
  }
  var traverseContext = MapBookKeeping.getPooled(array, escapedPrefix, func, context);
  traverseAllChildren_1(children, mapSingleChildIntoContext, traverseContext);
  MapBookKeeping.release(traverseContext);
}

/**
 * Maps children that are typically specified as `props.children`.
 *
 * See https://facebook.github.io/react/docs/react-api.html#react.children.map
 *
 * The provided mapFunction(child, key, index) will be called for each
 * leaf child.
 *
 * @param {?*} children Children tree container.
 * @param {function(*, int)} func The map function.
 * @param {*} context Context for mapFunction.
 * @return {object} Object containing the ordered map of results.
 */
function mapChildren(children, func, context) {
  if (children == null) {
    return children;
  }
  var result = [];
  mapIntoWithKeyPrefixInternal(children, result, null, func, context);
  return result;
}

function forEachSingleChildDummy(traverseContext, child, name) {
  return null;
}

/**
 * Count the number of children that are typically specified as
 * `props.children`.
 *
 * See https://facebook.github.io/react/docs/react-api.html#react.children.count
 *
 * @param {?*} children Children tree container.
 * @return {number} The number of children.
 */
function countChildren(children, context) {
  return traverseAllChildren_1(children, forEachSingleChildDummy, null);
}

/**
 * Flatten a children object (typically specified as `props.children`) and
 * return an array with appropriately re-keyed children.
 *
 * See https://facebook.github.io/react/docs/react-api.html#react.children.toarray
 */
function toArray(children) {
  var result = [];
  mapIntoWithKeyPrefixInternal(children, result, null, emptyFunction.thatReturnsArgument);
  return result;
}

var ReactChildren = {
  forEach: forEachChildren,
  map: mapChildren,
  mapIntoWithKeyPrefixInternal: mapIntoWithKeyPrefixInternal,
  count: countChildren,
  toArray: toArray
};

var ReactChildren_1 = ReactChildren;

var ReactDebugCurrentFrame$1 = {};

{
  var _require$2 = ReactComponentTreeHook_1,
      getStackAddendumByID = _require$2.getStackAddendumByID,
      getCurrentStackAddendum$2 = _require$2.getCurrentStackAddendum;

  var _require2$1 = ReactFiberComponentTreeHook,
      getStackAddendumByWorkInProgressFiber$2 = _require2$1.getStackAddendumByWorkInProgressFiber;

  // Component that is being worked on


  ReactDebugCurrentFrame$1.current = null;

  // Element that is being cloned or created
  ReactDebugCurrentFrame$1.element = null;

  ReactDebugCurrentFrame$1.getStackAddendum = function () {
    var stack = null;
    var current = ReactDebugCurrentFrame$1.current;
    var element = ReactDebugCurrentFrame$1.element;
    if (current !== null) {
      if (typeof current === 'number') {
        // DebugID from Stack.
        var debugID = current;
        stack = getStackAddendumByID(debugID);
      } else if (typeof current.tag === 'number') {
        // This is a Fiber.
        // The stack will only be correct if this is a work in progress
        // version and we're calling it during reconciliation.
        var workInProgress = current;
        stack = getStackAddendumByWorkInProgressFiber$2(workInProgress);
      }
    } else if (element !== null) {
      stack = getCurrentStackAddendum$2(element);
    }
    return stack;
  };
}

var ReactDebugCurrentFrame_1 = ReactDebugCurrentFrame$1;

{
  var checkPropTypes$1 = checkPropTypes;
  var warning$2 = warning;
  var ReactDebugCurrentFrame = ReactDebugCurrentFrame_1;

  var _require$1 = ReactComponentTreeHook_1,
      getCurrentStackAddendum$1 = _require$1.getCurrentStackAddendum;
}

function getDeclarationErrorAddendum() {
  if (ReactCurrentOwner_1.current) {
    var name = getComponentName_1(ReactCurrentOwner_1.current);
    if (name) {
      return '\n\nCheck the render method of `' + name + '`.';
    }
  }
  return '';
}

function getSourceInfoErrorAddendum(elementProps) {
  if (elementProps !== null && elementProps !== undefined && elementProps.__source !== undefined) {
    var source = elementProps.__source;
    var fileName = source.fileName.replace(/^.*[\\\/]/, '');
    var lineNumber = source.lineNumber;
    return '\n\nCheck your code at ' + fileName + ':' + lineNumber + '.';
  }
  return '';
}

/**
 * Warn if there's no key explicitly set on dynamic arrays of children or
 * object keys are not valid. This allows us to keep track of children between
 * updates.
 */
var ownerHasKeyUseWarning = {};

function getCurrentComponentErrorInfo(parentType) {
  var info = getDeclarationErrorAddendum();

  if (!info) {
    var parentName = typeof parentType === 'string' ? parentType : parentType.displayName || parentType.name;
    if (parentName) {
      info = '\n\nCheck the top-level render call using <' + parentName + '>.';
    }
  }
  return info;
}

/**
 * Warn if the element doesn't have an explicit key assigned to it.
 * This element is in an array. The array could grow and shrink or be
 * reordered. All children that haven't already been validated are required to
 * have a "key" property assigned to it. Error statuses are cached so a warning
 * will only be shown once.
 *
 * @internal
 * @param {ReactElement} element Element that requires a key.
 * @param {*} parentType element's parent's type.
 */
function validateExplicitKey(element, parentType) {
  if (!element._store || element._store.validated || element.key != null) {
    return;
  }
  element._store.validated = true;

  var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);
  if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
    return;
  }
  ownerHasKeyUseWarning[currentComponentErrorInfo] = true;

  // Usually the current owner is the offender, but if it accepts children as a
  // property, it may be the creator of the child that's responsible for
  // assigning it a key.
  var childOwner = '';
  if (element && element._owner && element._owner !== ReactCurrentOwner_1.current) {
    // Give the component that originally created this child.
    childOwner = ' It was passed a child from ' + getComponentName_1(element._owner) + '.';
  }

  warning$2(false, 'Each child in an array or iterator should have a unique "key" prop.' + '%s%s See https://fb.me/react-warning-keys for more information.%s', currentComponentErrorInfo, childOwner, getCurrentStackAddendum$1(element));
}

/**
 * Ensure that every element either is passed in a static location, in an
 * array with an explicit keys property defined, or in an object literal
 * with valid key property.
 *
 * @internal
 * @param {ReactNode} node Statically passed child of any type.
 * @param {*} parentType node's parent's type.
 */
function validateChildKeys(node, parentType) {
  if (typeof node !== 'object') {
    return;
  }
  if (Array.isArray(node)) {
    for (var i = 0; i < node.length; i++) {
      var child = node[i];
      if (ReactElement_1.isValidElement(child)) {
        validateExplicitKey(child, parentType);
      }
    }
  } else if (ReactElement_1.isValidElement(node)) {
    // This element was passed in a valid location.
    if (node._store) {
      node._store.validated = true;
    }
  } else if (node) {
    var iteratorFn = getIteratorFn_1(node);
    // Entry iterators provide implicit keys.
    if (iteratorFn) {
      if (iteratorFn !== node.entries) {
        var iterator = iteratorFn.call(node);
        var step;
        while (!(step = iterator.next()).done) {
          if (ReactElement_1.isValidElement(step.value)) {
            validateExplicitKey(step.value, parentType);
          }
        }
      }
    }
  }
}

/**
 * Given an element, validate that its props follow the propTypes definition,
 * provided by the type.
 *
 * @param {ReactElement} element
 */
function validatePropTypes(element) {
  var componentClass = element.type;
  if (typeof componentClass !== 'function') {
    return;
  }
  var name = componentClass.displayName || componentClass.name;

  // ReactNative `View.propTypes` have been deprecated in favor of `ViewPropTypes`.
  // In their place a temporary getter has been added with a deprecated warning message.
  // Avoid triggering that warning during validation using the temporary workaround,
  // __propTypesSecretDontUseThesePlease.
  // TODO (bvaughn) Revert this particular change any time after April 1 ReactNative tag.
  var propTypes$$1 = typeof componentClass.__propTypesSecretDontUseThesePlease === 'object' ? componentClass.__propTypesSecretDontUseThesePlease : componentClass.propTypes;

  if (propTypes$$1) {
    checkPropTypes$1(propTypes$$1, element.props, 'prop', name, ReactDebugCurrentFrame.getStackAddendum);
  }
  if (typeof componentClass.getDefaultProps === 'function') {
    warning$2(componentClass.getDefaultProps.isReactClassApproved, 'getDefaultProps is only used on classic React.createClass ' + 'definitions. Use a static property named `defaultProps` instead.');
  }
}

var ReactElementValidator$2 = {
  createElement: function (type, props, children) {
    var validType = typeof type === 'string' || typeof type === 'function';
    // We warn in this case but don't throw. We expect the element creation to
    // succeed and there will likely be errors in render.
    if (!validType) {
      var info = '';
      if (type === undefined || typeof type === 'object' && type !== null && Object.keys(type).length === 0) {
        info += ' You likely forgot to export your component from the file ' + "it's defined in.";
      }

      var sourceInfo = getSourceInfoErrorAddendum(props);
      if (sourceInfo) {
        info += sourceInfo;
      } else {
        info += getDeclarationErrorAddendum();
      }

      info += getCurrentStackAddendum$1();

      warning$2(false, 'React.createElement: type is invalid -- expected a string (for ' + 'built-in components) or a class/function (for composite ' + 'components) but got: %s.%s', type == null ? type : typeof type, info);
    }

    var element = ReactElement_1.createElement.apply(this, arguments);

    // The result can be nullish if a mock or a custom function is used.
    // TODO: Drop this when these are no longer allowed as the type argument.
    if (element == null) {
      return element;
    }

    {
      ReactDebugCurrentFrame.element = element;
    }

    // Skip key warning if the type isn't valid since our key validation logic
    // doesn't expect a non-string/function type and can throw confusing errors.
    // We don't want exception behavior to differ between dev and prod.
    // (Rendering will throw with a helpful message and as soon as the type is
    // fixed, the key warnings will appear.)
    if (validType) {
      for (var i = 2; i < arguments.length; i++) {
        validateChildKeys(arguments[i], type);
      }
    }

    validatePropTypes(element);

    {
      ReactDebugCurrentFrame.element = null;
    }

    return element;
  },

  createFactory: function (type) {
    var validatedFactory = ReactElementValidator$2.createElement.bind(null, type);
    // Legacy hook TODO: Warn if this is accessed
    validatedFactory.type = type;

    {
      if (canDefineProperty_1) {
        Object.defineProperty(validatedFactory, 'type', {
          enumerable: false,
          get: function () {
            warning$2(false, 'Factory.type is deprecated. Access the class directly ' + 'before passing it to createFactory.');
            Object.defineProperty(this, 'type', {
              value: type
            });
            return type;
          }
        });
      }
    }

    return validatedFactory;
  },

  cloneElement: function (element, props, children) {
    var newElement = ReactElement_1.cloneElement.apply(this, arguments);
    {
      ReactDebugCurrentFrame.element = newElement;
    }
    for (var i = 2; i < arguments.length; i++) {
      validateChildKeys(arguments[i], newElement.type);
    }
    validatePropTypes(newElement);
    {
      ReactDebugCurrentFrame.element = null;
    }
    return newElement;
  }
};

var ReactElementValidator_1 = ReactElementValidator$2;

/**
 * Create a factory that creates HTML tag elements.
 *
 * @private
 */
var createDOMFactory = ReactElement_1.createFactory;
{
  var ReactElementValidator$1 = ReactElementValidator_1;
  createDOMFactory = ReactElementValidator$1.createFactory;
}

/**
 * Creates a mapping from supported HTML tags to `ReactDOMComponent` classes.
 *
 * @public
 */
var ReactDOMFactories = {
  a: createDOMFactory('a'),
  abbr: createDOMFactory('abbr'),
  address: createDOMFactory('address'),
  area: createDOMFactory('area'),
  article: createDOMFactory('article'),
  aside: createDOMFactory('aside'),
  audio: createDOMFactory('audio'),
  b: createDOMFactory('b'),
  base: createDOMFactory('base'),
  bdi: createDOMFactory('bdi'),
  bdo: createDOMFactory('bdo'),
  big: createDOMFactory('big'),
  blockquote: createDOMFactory('blockquote'),
  body: createDOMFactory('body'),
  br: createDOMFactory('br'),
  button: createDOMFactory('button'),
  canvas: createDOMFactory('canvas'),
  caption: createDOMFactory('caption'),
  cite: createDOMFactory('cite'),
  code: createDOMFactory('code'),
  col: createDOMFactory('col'),
  colgroup: createDOMFactory('colgroup'),
  data: createDOMFactory('data'),
  datalist: createDOMFactory('datalist'),
  dd: createDOMFactory('dd'),
  del: createDOMFactory('del'),
  details: createDOMFactory('details'),
  dfn: createDOMFactory('dfn'),
  dialog: createDOMFactory('dialog'),
  div: createDOMFactory('div'),
  dl: createDOMFactory('dl'),
  dt: createDOMFactory('dt'),
  em: createDOMFactory('em'),
  embed: createDOMFactory('embed'),
  fieldset: createDOMFactory('fieldset'),
  figcaption: createDOMFactory('figcaption'),
  figure: createDOMFactory('figure'),
  footer: createDOMFactory('footer'),
  form: createDOMFactory('form'),
  h1: createDOMFactory('h1'),
  h2: createDOMFactory('h2'),
  h3: createDOMFactory('h3'),
  h4: createDOMFactory('h4'),
  h5: createDOMFactory('h5'),
  h6: createDOMFactory('h6'),
  head: createDOMFactory('head'),
  header: createDOMFactory('header'),
  hgroup: createDOMFactory('hgroup'),
  hr: createDOMFactory('hr'),
  html: createDOMFactory('html'),
  i: createDOMFactory('i'),
  iframe: createDOMFactory('iframe'),
  img: createDOMFactory('img'),
  input: createDOMFactory('input'),
  ins: createDOMFactory('ins'),
  kbd: createDOMFactory('kbd'),
  keygen: createDOMFactory('keygen'),
  label: createDOMFactory('label'),
  legend: createDOMFactory('legend'),
  li: createDOMFactory('li'),
  link: createDOMFactory('link'),
  main: createDOMFactory('main'),
  map: createDOMFactory('map'),
  mark: createDOMFactory('mark'),
  menu: createDOMFactory('menu'),
  menuitem: createDOMFactory('menuitem'),
  meta: createDOMFactory('meta'),
  meter: createDOMFactory('meter'),
  nav: createDOMFactory('nav'),
  noscript: createDOMFactory('noscript'),
  object: createDOMFactory('object'),
  ol: createDOMFactory('ol'),
  optgroup: createDOMFactory('optgroup'),
  option: createDOMFactory('option'),
  output: createDOMFactory('output'),
  p: createDOMFactory('p'),
  param: createDOMFactory('param'),
  picture: createDOMFactory('picture'),
  pre: createDOMFactory('pre'),
  progress: createDOMFactory('progress'),
  q: createDOMFactory('q'),
  rp: createDOMFactory('rp'),
  rt: createDOMFactory('rt'),
  ruby: createDOMFactory('ruby'),
  s: createDOMFactory('s'),
  samp: createDOMFactory('samp'),
  script: createDOMFactory('script'),
  section: createDOMFactory('section'),
  select: createDOMFactory('select'),
  small: createDOMFactory('small'),
  source: createDOMFactory('source'),
  span: createDOMFactory('span'),
  strong: createDOMFactory('strong'),
  style: createDOMFactory('style'),
  sub: createDOMFactory('sub'),
  summary: createDOMFactory('summary'),
  sup: createDOMFactory('sup'),
  table: createDOMFactory('table'),
  tbody: createDOMFactory('tbody'),
  td: createDOMFactory('td'),
  textarea: createDOMFactory('textarea'),
  tfoot: createDOMFactory('tfoot'),
  th: createDOMFactory('th'),
  thead: createDOMFactory('thead'),
  time: createDOMFactory('time'),
  title: createDOMFactory('title'),
  tr: createDOMFactory('tr'),
  track: createDOMFactory('track'),
  u: createDOMFactory('u'),
  ul: createDOMFactory('ul'),
  'var': createDOMFactory('var'),
  video: createDOMFactory('video'),
  wbr: createDOMFactory('wbr'),

  // SVG
  circle: createDOMFactory('circle'),
  clipPath: createDOMFactory('clipPath'),
  defs: createDOMFactory('defs'),
  ellipse: createDOMFactory('ellipse'),
  g: createDOMFactory('g'),
  image: createDOMFactory('image'),
  line: createDOMFactory('line'),
  linearGradient: createDOMFactory('linearGradient'),
  mask: createDOMFactory('mask'),
  path: createDOMFactory('path'),
  pattern: createDOMFactory('pattern'),
  polygon: createDOMFactory('polygon'),
  polyline: createDOMFactory('polyline'),
  radialGradient: createDOMFactory('radialGradient'),
  rect: createDOMFactory('rect'),
  stop: createDOMFactory('stop'),
  svg: createDOMFactory('svg'),
  text: createDOMFactory('text'),
  tspan: createDOMFactory('tspan')
};

var ReactDOMFactories_1 = ReactDOMFactories;

var ReactPropTypes = propTypes;

/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactVersion
 */

var ReactVersion = '16.0.0-alpha.12';

/**
 * Returns the first child in a collection of children and verifies that there
 * is only one child in the collection.
 *
 * See https://facebook.github.io/react/docs/react-api.html#react.children.only
 *
 * The current implementation of this function assumes that a single child gets
 * passed without a wrapper, but the purpose of this helper function is to
 * abstract away the particular structure of children.
 *
 * @param {?object} children Child collection structure.
 * @return {ReactElement} The first and only `ReactElement` contained in the
 * structure.
 */
function onlyChild(children) {
  !ReactElement_1.isValidElement(children) ? invariant(false, 'React.Children.only expected to receive a single React element child.') : void 0;
  return children;
}

var onlyChild_1 = onlyChild;

var Component = ReactBaseClasses.Component;

var isValidElement = ReactElement_1.isValidElement;




var createClass = factory(Component, isValidElement, ReactNoopUpdateQueue_1);

var createElement = ReactElement_1.createElement;
var createFactory = ReactElement_1.createFactory;
var cloneElement = ReactElement_1.cloneElement;

{
  var warning$1 = warning;
  var canDefineProperty = canDefineProperty_1;
  var ReactElementValidator = ReactElementValidator_1;
  createElement = ReactElementValidator.createElement;
  createFactory = ReactElementValidator.createFactory;
  cloneElement = ReactElementValidator.cloneElement;
}

var createMixin = function (mixin) {
  return mixin;
};

var React = {
  // Modern

  Children: {
    map: ReactChildren_1.map,
    forEach: ReactChildren_1.forEach,
    count: ReactChildren_1.count,
    toArray: ReactChildren_1.toArray,
    only: onlyChild_1
  },

  Component: ReactBaseClasses.Component,
  PureComponent: ReactBaseClasses.PureComponent,

  createElement: createElement,
  cloneElement: cloneElement,
  isValidElement: ReactElement_1.isValidElement,

  // TODO (bvaughn) Remove these getters before 16.0.0
  PropTypes: ReactPropTypes,
  checkPropTypes: checkPropTypes,
  createClass: createClass,

  // Classic

  createFactory: createFactory,
  createMixin: createMixin,

  // This looks DOM specific but these are actually isomorphic helpers
  // since they are just generating DOM strings.
  DOM: ReactDOMFactories_1,

  version: ReactVersion,

  __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: {
    ReactCurrentOwner: ReactCurrentOwner_1
  }
};

{
  objectAssign$1(React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, {
    // These should not be included in production.
    ReactComponentTreeHook: ReactComponentTreeHook_1,
    ReactDebugCurrentFrame: ReactDebugCurrentFrame_1
  });

  var warnedForCheckPropTypes = false;
  var warnedForCreateMixin = false;
  var warnedForCreateClass = false;
  var warnedForPropTypes = false;

  React.createMixin = function (mixin) {
    warning$1(warnedForCreateMixin, 'React.createMixin is deprecated and should not be used. You ' + 'can use this mixin directly instead.');
    warnedForCreateMixin = true;
    return mixin;
  };

  // TODO (bvaughn) Remove all of these accessors before 16.0.0
  if (canDefineProperty) {
    Object.defineProperty(React, 'checkPropTypes', {
      get: function () {
        warning$1(warnedForCheckPropTypes, 'checkPropTypes has been moved to a separate package. ' + 'Accessing React.checkPropTypes is no longer supported ' + 'and will be removed completely in React 16. ' + 'Use the prop-types package on npm instead. ' + '(https://fb.me/migrating-from-react-proptypes)');
        warnedForCheckPropTypes = true;
        return checkPropTypes;
      }
    });

    Object.defineProperty(React, 'createClass', {
      get: function () {
        warning$1(warnedForCreateClass, 'React.createClass is no longer supported. Use a plain JavaScript ' + "class instead. If you're not yet ready to migrate, " + 'create-react-class is available on npm as a drop-in replacement. ' + '(https://fb.me/migrating-from-react-create-class)');
        warnedForCreateClass = true;
        return createClass;
      }
    });

    Object.defineProperty(React, 'PropTypes', {
      get: function () {
        warning$1(warnedForPropTypes, 'PropTypes has been moved to a separate package. ' + 'Accessing React.PropTypes is no longer supported ' + 'and will be removed completely in React 16. ' + 'Use the prop-types package on npm instead. ' + '(https://fb.me/migrating-from-react-proptypes)');
        warnedForPropTypes = true;
        return ReactPropTypes;
      }
    });
  }

  // React.DOM factories are deprecated. Wrap these methods so that
  // invocations of the React.DOM namespace and alert users to switch
  // to the `react-addons-dom-factories` package.
  React.DOM = {};
  var warnedForFactories = false;
  Object.keys(ReactDOMFactories_1).forEach(function (factory$$1) {
    React.DOM[factory$$1] = function () {
      if (!warnedForFactories) {
        warning$1(false, 'Accessing factories like React.DOM.%s has been deprecated ' + 'and will be removed in the future. Use the ' + 'react-addons-dom-factories package instead.', factory$$1);
        warnedForFactories = true;
      }
      return ReactDOMFactories_1[factory$$1].apply(ReactDOMFactories_1, arguments);
    };
  });
}

var React_1 = React;

module.exports = React_1;


/***/ }),
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */,
/* 84 */,
/* 85 */,
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */,
/* 95 */,
/* 96 */,
/* 97 */,
/* 98 */,
/* 99 */,
/* 100 */,
/* 101 */,
/* 102 */,
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var isFunction = function isFunction(input) {
  return typeof input === 'function';
};

exports.default = function (predicate) {
  return function (elemOrThunk) {
    return predicate ? isFunction(elemOrThunk) ? elemOrThunk() : elemOrThunk : null;
  };
};

module.exports = exports['default'];

/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory(__webpack_require__(8));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["ReactActivity"] = factory(require("react"));
	else
		root["ReactActivity"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_3__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Windmill = exports.Bounce = exports.Digital = exports.Squares = exports.Spinner = exports.Sentry = exports.Levels = exports.Dots = undefined;

	var _Dots = __webpack_require__(1);

	var _Dots2 = _interopRequireDefault(_Dots);

	var _Levels = __webpack_require__(14);

	var _Levels2 = _interopRequireDefault(_Levels);

	var _Sentry = __webpack_require__(16);

	var _Sentry2 = _interopRequireDefault(_Sentry);

	var _Spinner = __webpack_require__(18);

	var _Spinner2 = _interopRequireDefault(_Spinner);

	var _Squares = __webpack_require__(20);

	var _Squares2 = _interopRequireDefault(_Squares);

	var _Digital = __webpack_require__(22);

	var _Digital2 = _interopRequireDefault(_Digital);

	var _Bounce = __webpack_require__(24);

	var _Bounce2 = _interopRequireDefault(_Bounce);

	var _Windmill = __webpack_require__(26);

	var _Windmill2 = _interopRequireDefault(_Windmill);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.Dots = _Dots2.default;
	exports.Levels = _Levels2.default;
	exports.Sentry = _Sentry2.default;
	exports.Spinner = _Spinner2.default;
	exports.Squares = _Squares2.default;
	exports.Digital = _Digital2.default;
	exports.Bounce = _Bounce2.default;
	exports.Windmill = _Windmill2.default;
	exports.default = { Dots: _Dots2.default, Levels: _Levels2.default, Sentry: _Sentry2.default, Spinner: _Spinner2.default, Squares: _Squares2.default, Digital: _Digital2.default, Bounce: _Bounce2.default, Windmill: _Windmill2.default };

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _Dots = __webpack_require__(2);

	var _Dots2 = _interopRequireDefault(_Dots);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _Dots2.default;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _activityIndicator = __webpack_require__(4);

	var _activityIndicator2 = _interopRequireDefault(_activityIndicator);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Dots = function Dots(props) {
	  return _react2.default.createElement(
	    'div',
	    { style: props.style, className: 'rai-dots' },
	    _react2.default.createElement('div', {
	      className: 'rai-circle',
	      style: props.getFillStyle(0.3)
	    }),
	    _react2.default.createElement('div', {
	      className: 'rai-circle',
	      style: props.getFillStyle(0.2)
	    }),
	    _react2.default.createElement('div', {
	      className: 'rai-circle',
	      style: props.getFillStyle(0.1)
	    })
	  );
	};

	exports.default = (0, _activityIndicator2.default)(Dots, 0.8);

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(5);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	exports.default = function (ComposedComponent, defaultAnimationDuration) {
	  var ActivityIndicator = function (_React$Component) {
	    _inherits(ActivityIndicator, _React$Component);

	    function ActivityIndicator(props) {
	      _classCallCheck(this, ActivityIndicator);

	      var _this = _possibleConstructorReturn(this, (ActivityIndicator.__proto__ || Object.getPrototypeOf(ActivityIndicator)).call(this, props));

	      _this.getDelayStyle = _this.getDelayStyle.bind(_this);
	      _this.getFillStyle = _this.getFillStyle.bind(_this);
	      _this.getBorderStyle = _this.getBorderStyle.bind(_this);
	      return _this;
	    }

	    _createClass(ActivityIndicator, [{
	      key: 'getDelayStyle',
	      value: function getDelayStyle(delay) {
	        var style = {};
	        if (delay) {
	          style.animationDelay = '-' + delay * (1 / this.props.speed) + 's';
	        }
	        return style;
	      }
	    }, {
	      key: 'getFillStyle',
	      value: function getFillStyle(delay) {
	        var style = this.getDelayStyle(delay);
	        if (this.props.color) {
	          style.backgroundColor = this.props.color;
	        }
	        return style;
	      }
	    }, {
	      key: 'getBorderStyle',
	      value: function getBorderStyle(delay) {
	        var style = this.getDelayStyle(delay);
	        if (this.props.color) {
	          style.borderColor = this.props.color;
	        }
	        return style;
	      }
	    }, {
	      key: 'render',
	      value: function render() {
	        var containerStyle = {
	          display: 'inline-block',
	          fontSize: '16px',
	          lineHeight: '0'
	        };
	        var indicatorStyle = {
	          animationDuration: this.props.animationDuration * (1 / this.props.speed) + 's'
	        };
	        if (this.props.size) {
	          indicatorStyle.fontSize = this.props.size;
	        }
	        var className = 'rai-activity-indicator';
	        className += this.props.className ? ' ' + this.props.className : '';
	        return _react2.default.createElement(
	          'div',
	          { style: containerStyle, className: className },
	          _react2.default.createElement(ComposedComponent, _extends({}, this.props, {
	            getFillStyle: this.getFillStyle,
	            getBorderStyle: this.getBorderStyle,
	            style: indicatorStyle
	          }))
	        );
	      }
	    }]);

	    return ActivityIndicator;
	  }(_react2.default.Component);

	  ActivityIndicator.propTypes = {
	    animationDuration: _propTypes2.default.number.isRequired,
	    speed: _propTypes2.default.number
	  };

	  ActivityIndicator.defaultProps = {
	    animationDuration: defaultAnimationDuration,
	    speed: 1
	  };

	  ActivityIndicator.displayName = ComposedComponent.name;

	  return ActivityIndicator;
	};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */

	if (process.env.NODE_ENV !== 'production') {
	  var REACT_ELEMENT_TYPE = (typeof Symbol === 'function' &&
	    Symbol.for &&
	    Symbol.for('react.element')) ||
	    0xeac7;

	  var isValidElement = function(object) {
	    return typeof object === 'object' &&
	      object !== null &&
	      object.$$typeof === REACT_ELEMENT_TYPE;
	  };

	  // By explicitly using `prop-types` you are opting into new development behavior.
	  // http://fb.me/prop-types-in-prod
	  var throwOnDirectAccess = true;
	  module.exports = __webpack_require__(7)(isValidElement, throwOnDirectAccess);
	} else {
	  // By explicitly using `prop-types` you are opting into new production behavior.
	  // http://fb.me/prop-types-in-prod
	  module.exports = __webpack_require__(13)();
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),
/* 6 */
/***/ (function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }


	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }



	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */

	'use strict';

	var emptyFunction = __webpack_require__(8);
	var invariant = __webpack_require__(9);
	var warning = __webpack_require__(10);

	var ReactPropTypesSecret = __webpack_require__(11);
	var checkPropTypes = __webpack_require__(12);

	module.exports = function(isValidElement, throwOnDirectAccess) {
	  /* global Symbol */
	  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
	  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

	  /**
	   * Returns the iterator method function contained on the iterable object.
	   *
	   * Be sure to invoke the function with the iterable as context:
	   *
	   *     var iteratorFn = getIteratorFn(myIterable);
	   *     if (iteratorFn) {
	   *       var iterator = iteratorFn.call(myIterable);
	   *       ...
	   *     }
	   *
	   * @param {?object} maybeIterable
	   * @return {?function}
	   */
	  function getIteratorFn(maybeIterable) {
	    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
	    if (typeof iteratorFn === 'function') {
	      return iteratorFn;
	    }
	  }

	  /**
	   * Collection of methods that allow declaration and validation of props that are
	   * supplied to React components. Example usage:
	   *
	   *   var Props = require('ReactPropTypes');
	   *   var MyArticle = React.createClass({
	   *     propTypes: {
	   *       // An optional string prop named "description".
	   *       description: Props.string,
	   *
	   *       // A required enum prop named "category".
	   *       category: Props.oneOf(['News','Photos']).isRequired,
	   *
	   *       // A prop named "dialog" that requires an instance of Dialog.
	   *       dialog: Props.instanceOf(Dialog).isRequired
	   *     },
	   *     render: function() { ... }
	   *   });
	   *
	   * A more formal specification of how these methods are used:
	   *
	   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
	   *   decl := ReactPropTypes.{type}(.isRequired)?
	   *
	   * Each and every declaration produces a function with the same signature. This
	   * allows the creation of custom validation functions. For example:
	   *
	   *  var MyLink = React.createClass({
	   *    propTypes: {
	   *      // An optional string or URI prop named "href".
	   *      href: function(props, propName, componentName) {
	   *        var propValue = props[propName];
	   *        if (propValue != null && typeof propValue !== 'string' &&
	   *            !(propValue instanceof URI)) {
	   *          return new Error(
	   *            'Expected a string or an URI for ' + propName + ' in ' +
	   *            componentName
	   *          );
	   *        }
	   *      }
	   *    },
	   *    render: function() {...}
	   *  });
	   *
	   * @internal
	   */

	  var ANONYMOUS = '<<anonymous>>';

	  // Important!
	  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
	  var ReactPropTypes = {
	    array: createPrimitiveTypeChecker('array'),
	    bool: createPrimitiveTypeChecker('boolean'),
	    func: createPrimitiveTypeChecker('function'),
	    number: createPrimitiveTypeChecker('number'),
	    object: createPrimitiveTypeChecker('object'),
	    string: createPrimitiveTypeChecker('string'),
	    symbol: createPrimitiveTypeChecker('symbol'),

	    any: createAnyTypeChecker(),
	    arrayOf: createArrayOfTypeChecker,
	    element: createElementTypeChecker(),
	    instanceOf: createInstanceTypeChecker,
	    node: createNodeChecker(),
	    objectOf: createObjectOfTypeChecker,
	    oneOf: createEnumTypeChecker,
	    oneOfType: createUnionTypeChecker,
	    shape: createShapeTypeChecker
	  };

	  /**
	   * inlined Object.is polyfill to avoid requiring consumers ship their own
	   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
	   */
	  /*eslint-disable no-self-compare*/
	  function is(x, y) {
	    // SameValue algorithm
	    if (x === y) {
	      // Steps 1-5, 7-10
	      // Steps 6.b-6.e: +0 != -0
	      return x !== 0 || 1 / x === 1 / y;
	    } else {
	      // Step 6.a: NaN == NaN
	      return x !== x && y !== y;
	    }
	  }
	  /*eslint-enable no-self-compare*/

	  /**
	   * We use an Error-like object for backward compatibility as people may call
	   * PropTypes directly and inspect their output. However, we don't use real
	   * Errors anymore. We don't inspect their stack anyway, and creating them
	   * is prohibitively expensive if they are created too often, such as what
	   * happens in oneOfType() for any type before the one that matched.
	   */
	  function PropTypeError(message) {
	    this.message = message;
	    this.stack = '';
	  }
	  // Make `instanceof Error` still work for returned errors.
	  PropTypeError.prototype = Error.prototype;

	  function createChainableTypeChecker(validate) {
	    if (process.env.NODE_ENV !== 'production') {
	      var manualPropTypeCallCache = {};
	      var manualPropTypeWarningCount = 0;
	    }
	    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
	      componentName = componentName || ANONYMOUS;
	      propFullName = propFullName || propName;

	      if (secret !== ReactPropTypesSecret) {
	        if (throwOnDirectAccess) {
	          // New behavior only for users of `prop-types` package
	          invariant(
	            false,
	            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
	            'Use `PropTypes.checkPropTypes()` to call them. ' +
	            'Read more at http://fb.me/use-check-prop-types'
	          );
	        } else if (process.env.NODE_ENV !== 'production' && typeof console !== 'undefined') {
	          // Old behavior for people using React.PropTypes
	          var cacheKey = componentName + ':' + propName;
	          if (
	            !manualPropTypeCallCache[cacheKey] &&
	            // Avoid spamming the console because they are often not actionable except for lib authors
	            manualPropTypeWarningCount < 3
	          ) {
	            warning(
	              false,
	              'You are manually calling a React.PropTypes validation ' +
	              'function for the `%s` prop on `%s`. This is deprecated ' +
	              'and will throw in the standalone `prop-types` package. ' +
	              'You may be seeing this warning due to a third-party PropTypes ' +
	              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.',
	              propFullName,
	              componentName
	            );
	            manualPropTypeCallCache[cacheKey] = true;
	            manualPropTypeWarningCount++;
	          }
	        }
	      }
	      if (props[propName] == null) {
	        if (isRequired) {
	          if (props[propName] === null) {
	            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
	          }
	          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
	        }
	        return null;
	      } else {
	        return validate(props, propName, componentName, location, propFullName);
	      }
	    }

	    var chainedCheckType = checkType.bind(null, false);
	    chainedCheckType.isRequired = checkType.bind(null, true);

	    return chainedCheckType;
	  }

	  function createPrimitiveTypeChecker(expectedType) {
	    function validate(props, propName, componentName, location, propFullName, secret) {
	      var propValue = props[propName];
	      var propType = getPropType(propValue);
	      if (propType !== expectedType) {
	        // `propValue` being instance of, say, date/regexp, pass the 'object'
	        // check, but we can offer a more precise error message here rather than
	        // 'of type `object`'.
	        var preciseType = getPreciseType(propValue);

	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createAnyTypeChecker() {
	    return createChainableTypeChecker(emptyFunction.thatReturnsNull);
	  }

	  function createArrayOfTypeChecker(typeChecker) {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (typeof typeChecker !== 'function') {
	        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
	      }
	      var propValue = props[propName];
	      if (!Array.isArray(propValue)) {
	        var propType = getPropType(propValue);
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
	      }
	      for (var i = 0; i < propValue.length; i++) {
	        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
	        if (error instanceof Error) {
	          return error;
	        }
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createElementTypeChecker() {
	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      if (!isValidElement(propValue)) {
	        var propType = getPropType(propValue);
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createInstanceTypeChecker(expectedClass) {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (!(props[propName] instanceof expectedClass)) {
	        var expectedClassName = expectedClass.name || ANONYMOUS;
	        var actualClassName = getClassName(props[propName]);
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createEnumTypeChecker(expectedValues) {
	    if (!Array.isArray(expectedValues)) {
	      process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOf, expected an instance of array.') : void 0;
	      return emptyFunction.thatReturnsNull;
	    }

	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      for (var i = 0; i < expectedValues.length; i++) {
	        if (is(propValue, expectedValues[i])) {
	          return null;
	        }
	      }

	      var valuesString = JSON.stringify(expectedValues);
	      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createObjectOfTypeChecker(typeChecker) {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (typeof typeChecker !== 'function') {
	        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
	      }
	      var propValue = props[propName];
	      var propType = getPropType(propValue);
	      if (propType !== 'object') {
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
	      }
	      for (var key in propValue) {
	        if (propValue.hasOwnProperty(key)) {
	          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
	          if (error instanceof Error) {
	            return error;
	          }
	        }
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createUnionTypeChecker(arrayOfTypeCheckers) {
	    if (!Array.isArray(arrayOfTypeCheckers)) {
	      process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
	      return emptyFunction.thatReturnsNull;
	    }

	    function validate(props, propName, componentName, location, propFullName) {
	      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
	        var checker = arrayOfTypeCheckers[i];
	        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
	          return null;
	        }
	      }

	      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createNodeChecker() {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (!isNode(props[propName])) {
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createShapeTypeChecker(shapeTypes) {
	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      var propType = getPropType(propValue);
	      if (propType !== 'object') {
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
	      }
	      for (var key in shapeTypes) {
	        var checker = shapeTypes[key];
	        if (!checker) {
	          continue;
	        }
	        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
	        if (error) {
	          return error;
	        }
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function isNode(propValue) {
	    switch (typeof propValue) {
	      case 'number':
	      case 'string':
	      case 'undefined':
	        return true;
	      case 'boolean':
	        return !propValue;
	      case 'object':
	        if (Array.isArray(propValue)) {
	          return propValue.every(isNode);
	        }
	        if (propValue === null || isValidElement(propValue)) {
	          return true;
	        }

	        var iteratorFn = getIteratorFn(propValue);
	        if (iteratorFn) {
	          var iterator = iteratorFn.call(propValue);
	          var step;
	          if (iteratorFn !== propValue.entries) {
	            while (!(step = iterator.next()).done) {
	              if (!isNode(step.value)) {
	                return false;
	              }
	            }
	          } else {
	            // Iterator will provide entry [k,v] tuples rather than values.
	            while (!(step = iterator.next()).done) {
	              var entry = step.value;
	              if (entry) {
	                if (!isNode(entry[1])) {
	                  return false;
	                }
	              }
	            }
	          }
	        } else {
	          return false;
	        }

	        return true;
	      default:
	        return false;
	    }
	  }

	  function isSymbol(propType, propValue) {
	    // Native Symbol.
	    if (propType === 'symbol') {
	      return true;
	    }

	    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
	    if (propValue['@@toStringTag'] === 'Symbol') {
	      return true;
	    }

	    // Fallback for non-spec compliant Symbols which are polyfilled.
	    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
	      return true;
	    }

	    return false;
	  }

	  // Equivalent of `typeof` but with special handling for array and regexp.
	  function getPropType(propValue) {
	    var propType = typeof propValue;
	    if (Array.isArray(propValue)) {
	      return 'array';
	    }
	    if (propValue instanceof RegExp) {
	      // Old webkits (at least until Android 4.0) return 'function' rather than
	      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
	      // passes PropTypes.object.
	      return 'object';
	    }
	    if (isSymbol(propType, propValue)) {
	      return 'symbol';
	    }
	    return propType;
	  }

	  // This handles more types than `getPropType`. Only used for error messages.
	  // See `createPrimitiveTypeChecker`.
	  function getPreciseType(propValue) {
	    var propType = getPropType(propValue);
	    if (propType === 'object') {
	      if (propValue instanceof Date) {
	        return 'date';
	      } else if (propValue instanceof RegExp) {
	        return 'regexp';
	      }
	    }
	    return propType;
	  }

	  // Returns class name of the object, if any.
	  function getClassName(propValue) {
	    if (!propValue.constructor || !propValue.constructor.name) {
	      return ANONYMOUS;
	    }
	    return propValue.constructor.name;
	  }

	  ReactPropTypes.checkPropTypes = checkPropTypes;
	  ReactPropTypes.PropTypes = ReactPropTypes;

	  return ReactPropTypes;
	};

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),
/* 8 */
/***/ (function(module, exports) {

	"use strict";

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * 
	 */

	function makeEmptyFunction(arg) {
	  return function () {
	    return arg;
	  };
	}

	/**
	 * This function accepts and discards inputs; it has no side effects. This is
	 * primarily useful idiomatically for overridable function endpoints which
	 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
	 */
	var emptyFunction = function emptyFunction() {};

	emptyFunction.thatReturns = makeEmptyFunction;
	emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
	emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
	emptyFunction.thatReturnsNull = makeEmptyFunction(null);
	emptyFunction.thatReturnsThis = function () {
	  return this;
	};
	emptyFunction.thatReturnsArgument = function (arg) {
	  return arg;
	};

	module.exports = emptyFunction;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */

	'use strict';

	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf-style format (only %s is supported) and arguments
	 * to provide information about what broke and what you were
	 * expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */

	var validateFormat = function validateFormat(format) {};

	if (process.env.NODE_ENV !== 'production') {
	  validateFormat = function validateFormat(format) {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  };
	}

	function invariant(condition, format, a, b, c, d, e, f) {
	  validateFormat(format);

	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error(format.replace(/%s/g, function () {
	        return args[argIndex++];
	      }));
	      error.name = 'Invariant Violation';
	    }

	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	}

	module.exports = invariant;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */

	'use strict';

	var emptyFunction = __webpack_require__(8);

	/**
	 * Similar to invariant but only logs a warning if the condition is not met.
	 * This can be used to log issues in development environments in critical
	 * paths. Removing the logging code for production environments will keep the
	 * same logic and follow the same code paths.
	 */

	var warning = emptyFunction;

	if (process.env.NODE_ENV !== 'production') {
	  (function () {
	    var printWarning = function printWarning(format) {
	      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        args[_key - 1] = arguments[_key];
	      }

	      var argIndex = 0;
	      var message = 'Warning: ' + format.replace(/%s/g, function () {
	        return args[argIndex++];
	      });
	      if (typeof console !== 'undefined') {
	        console.error(message);
	      }
	      try {
	        // --- Welcome to debugging React ---
	        // This error was thrown as a convenience so that you can use this stack
	        // to find the callsite that caused this warning to fire.
	        throw new Error(message);
	      } catch (x) {}
	    };

	    warning = function warning(condition, format) {
	      if (format === undefined) {
	        throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
	      }

	      if (format.indexOf('Failed Composite propType: ') === 0) {
	        return; // Ignore CompositeComponent proptype check.
	      }

	      if (!condition) {
	        for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
	          args[_key2 - 2] = arguments[_key2];
	        }

	        printWarning.apply(undefined, [format].concat(args));
	      }
	    };
	  })();
	}

	module.exports = warning;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),
/* 11 */
/***/ (function(module, exports) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */

	'use strict';

	var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

	module.exports = ReactPropTypesSecret;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */

	'use strict';

	if (process.env.NODE_ENV !== 'production') {
	  var invariant = __webpack_require__(9);
	  var warning = __webpack_require__(10);
	  var ReactPropTypesSecret = __webpack_require__(11);
	  var loggedTypeFailures = {};
	}

	/**
	 * Assert that the values match with the type specs.
	 * Error messages are memorized and will only be shown once.
	 *
	 * @param {object} typeSpecs Map of name to a ReactPropType
	 * @param {object} values Runtime values that need to be type-checked
	 * @param {string} location e.g. "prop", "context", "child context"
	 * @param {string} componentName Name of the component for error messages.
	 * @param {?Function} getStack Returns the component stack.
	 * @private
	 */
	function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
	  if (process.env.NODE_ENV !== 'production') {
	    for (var typeSpecName in typeSpecs) {
	      if (typeSpecs.hasOwnProperty(typeSpecName)) {
	        var error;
	        // Prop type validation may throw. In case they do, we don't want to
	        // fail the render phase where it didn't fail before. So we log it.
	        // After these have been cleaned up, we'll let them throw.
	        try {
	          // This is intentionally an invariant that gets caught. It's the same
	          // behavior as without this statement except with a better message.
	          invariant(typeof typeSpecs[typeSpecName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'React.PropTypes.', componentName || 'React class', location, typeSpecName);
	          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
	        } catch (ex) {
	          error = ex;
	        }
	        warning(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error);
	        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
	          // Only monitor this failure once because there tends to be a lot of the
	          // same error.
	          loggedTypeFailures[error.message] = true;

	          var stack = getStack ? getStack() : '';

	          warning(false, 'Failed %s type: %s%s', location, error.message, stack != null ? stack : '');
	        }
	      }
	    }
	  }
	}

	module.exports = checkPropTypes;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */

	'use strict';

	var emptyFunction = __webpack_require__(8);
	var invariant = __webpack_require__(9);

	module.exports = function() {
	  // Important!
	  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
	  function shim() {
	    invariant(
	      false,
	      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
	      'Use PropTypes.checkPropTypes() to call them. ' +
	      'Read more at http://fb.me/use-check-prop-types'
	    );
	  };
	  shim.isRequired = shim;
	  function getShim() {
	    return shim;
	  };
	  var ReactPropTypes = {
	    array: shim,
	    bool: shim,
	    func: shim,
	    number: shim,
	    object: shim,
	    string: shim,
	    symbol: shim,

	    any: shim,
	    arrayOf: getShim,
	    element: shim,
	    instanceOf: getShim,
	    node: shim,
	    objectOf: getShim,
	    oneOf: getShim,
	    oneOfType: getShim,
	    shape: getShim
	  };

	  ReactPropTypes.checkPropTypes = emptyFunction;
	  ReactPropTypes.PropTypes = ReactPropTypes;

	  return ReactPropTypes;
	};


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _Levels = __webpack_require__(15);

	var _Levels2 = _interopRequireDefault(_Levels);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _Levels2.default;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _activityIndicator = __webpack_require__(4);

	var _activityIndicator2 = _interopRequireDefault(_activityIndicator);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Levels = function Levels(props) {
	  return _react2.default.createElement(
	    'div',
	    { style: props.style, className: 'rai-levels' },
	    _react2.default.createElement(
	      'div',
	      { className: 'rai-levels-container' },
	      _react2.default.createElement('div', { className: 'rai-bar', style: props.getFillStyle() }),
	      _react2.default.createElement('div', { className: 'rai-bar', style: props.getFillStyle(0.25) }),
	      _react2.default.createElement('div', { className: 'rai-bar', style: props.getFillStyle(0.4) })
	    )
	  );
	};

	exports.default = (0, _activityIndicator2.default)(Levels, 1.5);

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _Sentry = __webpack_require__(17);

	var _Sentry2 = _interopRequireDefault(_Sentry);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _Sentry2.default;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _activityIndicator = __webpack_require__(4);

	var _activityIndicator2 = _interopRequireDefault(_activityIndicator);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Sentry = function Sentry(props) {
	  return _react2.default.createElement(
	    'div',
	    { style: props.style, className: 'rai-sentry' },
	    _react2.default.createElement(
	      'div',
	      { className: 'rai-wave-container' },
	      _react2.default.createElement('div', { className: 'rai-wave', style: props.getBorderStyle(0) })
	    ),
	    _react2.default.createElement(
	      'div',
	      { className: 'rai-wave-container' },
	      _react2.default.createElement('div', { className: 'rai-wave', style: props.getBorderStyle(0.4) })
	    )
	  );
	};

	exports.default = (0, _activityIndicator2.default)(Sentry, 0.8);

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _Spinner = __webpack_require__(19);

	var _Spinner2 = _interopRequireDefault(_Spinner);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _Spinner2.default;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _activityIndicator = __webpack_require__(4);

	var _activityIndicator2 = _interopRequireDefault(_activityIndicator);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Spinner = function Spinner(props) {
	  return _react2.default.createElement(
	    'div',
	    { style: props.style, className: 'rai-spinner' },
	    _react2.default.createElement('div', { className: 'rai-spinner-outer', style: props.getBorderStyle() }),
	    _react2.default.createElement('div', { className: 'rai-spinner-inner', style: props.getBorderStyle() })
	  );
	};

	exports.default = (0, _activityIndicator2.default)(Spinner, 0.6);

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _Squares = __webpack_require__(21);

	var _Squares2 = _interopRequireDefault(_Squares);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _Squares2.default;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(5);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _activityIndicator = __webpack_require__(4);

	var _activityIndicator2 = _interopRequireDefault(_activityIndicator);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Squares = function Squares(props) {
	  var squares = [];
	  for (var i = 1; i <= props.squareCount; i++) {
	    squares.unshift(_react2.default.createElement('div', {
	      key: i,
	      className: 'rai-square',
	      style: props.getFillStyle(i / 10)
	    }));
	  }
	  return _react2.default.createElement(
	    'div',
	    { style: props.style, className: 'rai-squares' },
	    squares
	  );
	};

	Squares.propTypes = {
	  squareCount: _propTypes2.default.number.isRequired

	};

	Squares.defaultProps = {
	  squareCount: 3
	};

	exports.default = (0, _activityIndicator2.default)(Squares, 0.8);

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _Digital = __webpack_require__(23);

	var _Digital2 = _interopRequireDefault(_Digital);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _Digital2.default;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(5);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _activityIndicator = __webpack_require__(4);

	var _activityIndicator2 = _interopRequireDefault(_activityIndicator);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Digital = function Digital(props) {
	  var rects = [];
	  for (var i = 1; i <= props.count; i++) {
	    rects.unshift(_react2.default.createElement('div', {
	      key: i,
	      style: props.getFillStyle(i / 10)
	    }));
	  }

	  return _react2.default.createElement(
	    'div',
	    { style: props.style, className: 'rai-digital' },
	    rects
	  );
	};

	Digital.propTypes = {
	  count: _propTypes2.default.number.isRequired
	};

	Digital.defaultProps = {
	  count: 3
	};

	exports.default = (0, _activityIndicator2.default)(Digital, 0.8);

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _Bounce = __webpack_require__(25);

	var _Bounce2 = _interopRequireDefault(_Bounce);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _Bounce2.default;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(5);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _activityIndicator = __webpack_require__(4);

	var _activityIndicator2 = _interopRequireDefault(_activityIndicator);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Bounce = function Bounce(props) {
	  var squares = [];
	  for (var i = 1; i <= props.count; i++) {
	    squares.unshift(_react2.default.createElement('div', {
	      key: i,
	      style: props.getFillStyle(i / 10)
	    }));
	  }
	  return _react2.default.createElement(
	    'div',
	    { style: props.style, className: 'rai-bounce' },
	    squares
	  );
	};

	Bounce.propTypes = {
	  count: _propTypes2.default.number.isRequired
	};

	Bounce.defaultProps = {
	  count: 3
	};

	exports.default = (0, _activityIndicator2.default)(Bounce, 0.8);

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _Windmill = __webpack_require__(27);

	var _Windmill2 = _interopRequireDefault(_Windmill);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _Windmill2.default;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(5);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _activityIndicator = __webpack_require__(4);

	var _activityIndicator2 = _interopRequireDefault(_activityIndicator);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var animationDuration = 0.8;

	var Windmill = function Windmill(props) {
	  var windill = [];
	  for (var i = 1; i <= props.count; i++) {
	    var style = props.getFillStyle(i / (props.count * 2 / animationDuration));
	    windill.unshift(_react2.default.createElement('div', {
	      key: i,
	      style: style
	    }));
	  }
	  return _react2.default.createElement(
	    'div',
	    { style: props.style, className: 'rai-windill' },
	    windill
	  );
	};

	Windmill.propTypes = {
	  count: _propTypes2.default.number.isRequired
	};

	Windmill.defaultProps = {
	  count: 1
	};

	exports.default = (0, _activityIndicator2.default)(Windmill, animationDuration);

/***/ })
/******/ ])
});
;

/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * @module braintree-web-drop-in
 * @description There are two ways to integrate Drop-in into your page: a script tag integration and a JavaScript integration using [`dropin.create`](#.create).
 *
 * The script tag integration is the fastest way to integrate. All you need to do is add the Drop-in script inside your form element where you want Drop-in to appear and include a `data-braintree-dropin-authorization` property with your [tokenization key](https://developers.braintreepayments.com/guides/authorization/tokenization-key/javascript/v3) or [client token](https://developers.braintreepayments.com/guides/authorization/client-token).
 *
 * When your form is submitted, Drop-in will intercept the form submission and attempt to tokenize the payment method. If the tokenization is successful, it will insert the payment method nonce into a hidden input with the name `payment_method_nonce` and then submit your form. If the tokenization is unsuccessful, a relevant error will be shown in the UI.
 *
 * If you have data collector enabled, the device data will be injected into a hidden input with the name `device_data` before form submission.
 *
 * Specify creation options as data attributes in your script tag, as shown in the examples below. The following configuration properties may be set:
 *
 * * `data-locale`
 * * `data-card.cardholder-name`
 * * `data-card.cardholder-name.required`
 * * `data-payment-option-priority`
 * * `data-data-collector.kount`
 * * `data-data-collector.paypal`
 * * `data-paypal.amount`
 * * `data-paypal.currency`
 * * `data-paypal.flow`
 * * `data-paypal-credit.amount`
 * * `data-paypal-credit.currency`
 * * `data-paypal-credit.flow`
 *
 * For more control and customization, use [`dropin.create` instead](#.create).
 *
 * See our [demo app](../../script-tag-integration.html) for an example of using our script tag integration.
 *
 * @example
 * <caption>A full example accepting only cards</caption>
 * <!DOCTYPE html>
 * <html lang="en">
 *   <head>
 *     <meta charset="UTF-8">
 *     <title>Checkout</title>
 *   </head>
 *   <body>
 *     <form id="payment-form" action="/" method="post">
 *       <script src="https://js.braintreegateway.com/web/dropin/{@pkg version}/js/dropin.min.js"
 *        data-braintree-dropin-authorization="CLIENT_AUTHORIZATION"
 *       ></script>
 *       <input type="submit" value="Purchase"></input>
 *     </form>
 *   </body>
 * </html>
 *
 * @example
 * <caption>A full example accepting cards, PayPal, and PayPal credit</caption>
 * <!DOCTYPE html>
 * <html lang="en">
 *   <head>
 *     <meta charset="UTF-8">
 *     <title>Checkout</title>
 *   </head>
 *   <body>
 *     <form id="payment-form" action="/" method="post">
 *       <script src="https://js.braintreegateway.com/web/dropin/{@pkg version}/js/dropin.min.js"
 *        data-braintree-dropin-authorization="CLIENT_AUTHORIZATION"
 *        data-paypal.flow="checkout"
 *        data-paypal.amount="10.00"
 *        data-paypal.currency="USD"
 *        data-paypal-credit.flow="vault"
 *       ></script>
 *       <input type="submit" value="Purchase"></input>
 *     </form>
 *   </body>
 * </html>
 *
 * @example
 * <caption>Specifying a locale and payment option priority</caption>
 * <form id="payment-form" action="/" method="post">
 *   <script src="https://js.braintreegateway.com/web/dropin/{@pkg version}/js/dropin.min.js"
 *    data-braintree-dropin-authorization="CLIENT_AUTHORIZATION"
 *    data-locale="de_DE"
 *    data-payment-option-priority='["paypal","card", "paypalCredit"]'
 *    data-paypal.flow="checkout"
 *    data-paypal.amount="10.00"
 *    data-paypal.currency="USD"
 *    data-paypal-credit.flow="vault"
 *   ></script>
 *   <input type="submit" value="Purchase"></input>
 * </form>
 *
 * @example
 * <caption>Including cardholder name field in card form</caption>
 * <form id="payment-form" action="/" method="post">
 *   <script src="https://js.braintreegateway.com/web/dropin/{@pkg version}/js/dropin.min.js"
 *    data-braintree-dropin-authorization="CLIENT_AUTHORIZATION"
 *    data-card.cardholder-name="true"
 *   ></script>
 *   <input type="submit" value="Purchase"></input>
 * </form>
 *
 * @example
 * <caption>Including a required cardholder name field in card form</caption>
 * <form id="payment-form" action="/" method="post">
 *   <script src="https://js.braintreegateway.com/web/dropin/{@pkg version}/js/dropin.min.js"
 *    data-braintree-dropin-authorization="CLIENT_AUTHORIZATION"
 *    data-card.cardholder-name.required="true"
 *   ></script>
 *   <input type="submit" value="Purchase"></input>
 * </form>
 */

var Dropin = __webpack_require__(106);
var client = __webpack_require__(46);
var createFromScriptTag = __webpack_require__(193);
var constants = __webpack_require__(2);
var analytics = __webpack_require__(15);
var DropinError = __webpack_require__(5);
var Promise = __webpack_require__(12);
var wrapPromise = __webpack_require__(4);

var VERSION = "1.7.0";

/**
 * @typedef {object} cardCreateOptions The configuration options for cards. Internally, Drop-in uses [Hosted Fields](http://braintree.github.io/braintree-web/{@pkg bt-web-version}/module-braintree-web_hosted-fields.html) to render the card form. The `overrides.fields` and `overrides.styles` allow the Hosted Fields to be customized.
 *
 * @param {boolean|object} [cardholderName] Will enable a cardholder name field above the card number field. If set to an object, you can specify whether or not the field is required. If set to a `true`, it will default the field to being present, but not required.
 * @param {boolean} [cardholderName.required=false] When true, the cardholder name field will be required to request the payment method nonce.
 * @param {object} [overrides.fields] The Hosted Fields [`fields` options](http://braintree.github.io/braintree-web/{@pkg bt-web-version}/module-braintree-web_hosted-fields.html#~fieldOptions). Only `number`, `cvv`, `expirationDate` and `postalCode` can be configured. Each is a [Hosted Fields `field` object](http://braintree.github.io/braintree-web/{@pkg bt-web-version}/module-braintree-web_hosted-fields.html#~field). `selector` cannot be modified.
 * @param {object} [overrides.styles] The Hosted Fields [`styles` options](http://braintree.github.io/braintree-web/{@pkg bt-web-version}/module-braintree-web_hosted-fields.html#~styleOptions).
 */

/**
 * @typedef {object} dataCollectorOptions The configuration options for Data Collector. Requires [advanced fraud protection](https://developers.braintreepayments.com/guides/advanced-fraud-tools/client-side/javascript/v3) to be enabled in the Braintree gateway. Contact our [support team](https://developers.braintreepayments.com/forms/contact) to configure your Kount ID. The device data will be included on the {@link Dropin#requestPaymentMethod|requestPaymentMethod payload}.
 *
 * @param {boolean} [kount] If true, Kount fraud data collection is enabled. Required if `paypal` parameter is not used.
 * @param {boolean} [paypal] If true, PayPal fraud data collection is enabled. Required if `kount` parameter is not used.
 */

/** @typedef {object} paypalCreateOptions The configuration options for PayPal and PayPalCredit. For a full list of options see the [PayPal Checkout client reference options](http://braintree.github.io/braintree-web/{@pkg bt-web-version}/PayPalCheckout.html#createPayment).
 *
 * @param {string} flow Either `checkout` for a one-time [Checkout with PayPal](https://developers.braintreepayments.com/guides/paypal/checkout-with-paypal/javascript/v3) flow or `vault` for a [Vault flow](https://developers.braintreepayments.com/guides/paypal/vault/javascript/v3). Required when using PayPal or PayPal Credit.
 * @param {string|number} [amount] The amount of the transaction. Required when using the Checkout flow.
 * @param {string} [currency] The currency code of the amount, such as `USD`. Required when using the Checkout flow.
 * @param {string} [buttonStyle] The style object to apply to the PayPal button. Button customization includes color, shape, size, and label. The options [found here](https://developer.paypal.com/docs/integration/direct/express-checkout/integration-jsv4/customize-button/#button-styles) are available.
 */

/**
 * @static
 * @function create
 * @description This function is the entry point for `braintree.dropin`. It is used for creating {@link Dropin} instances.
 * @param {object} options Object containing all {@link Dropin} options:
 * @param {string} options.authorization A [tokenization key](https://developers.braintreepayments.com/guides/authorization/tokenization-key/javascript/v3) or a [client token](https://developers.braintreepayments.com/guides/authorization/client-token). If authorization is a client token created with a [customer ID](https://developers.braintreepayments.com/guides/drop-in/javascript/v3#customer-id), Drop-in will render saved payment methods and automatically store any newly-added payment methods in their Vault record.
 * @param {string|HTMLElement} options.container A reference to an empty element, such as a `<div>`, where Drop-in will be included on your page or the selector for the empty element. e.g. `#dropin-container`.
 * @param {string} options.selector Deprecated: Now an alias for `options.container`.
 * @param {string} [options.locale=`en_US`] Use this option to change the language, links, and terminology used throughout Drop-in. Supported locales include:
 * `da_DK`,
 * `de_DE`,
 * `en_AU`,
 * `en_GB`,
 * `en_US`,
 * `es_ES`,
 * `fr_CA`,
 * `fr_FR`,
 * `id_ID`,
 * `it_IT`,
 * `ja_JP`,
 * `ko_KR`,
 * `nl_NL`,
 * `no_NO`,
 * `pl_PL`,
 * `pt_BR`,
 * `pt_PT`,
 * `ru_RU`,
 * `sv_SE`,
 * `th_TH`,
 * `zh_CN`,
 * `zh_HK`,
 * `zh_TW`.
 *
 * @param {object} [options.translations] To use your own translations, pass an object with the strings you wish to replace. This object must use the same structure as the object used internally for supported translations, which can be found [here](https://github.com/braintree/braintree-web-drop-in/blob/master/src/translations/en_US.js). Any strings that are not included will be those from the provided `locale` or `en_US` if no `locale` is provided. See below for an example of creating Drop-in with custom translations.
 * @param {array} [options.paymentOptionPriority] Use this option to indicate the order in which enabled payment options should appear when multiple payment options are enabled. By default, payment options will appear in this order: `['card', 'paypal', 'paypalCredit']`. Payment options omitted from this array will not be offered to the customer.
 *
 * @param {object} [options.card] The configuration options for cards. See [`cardCreateOptions`](#~cardCreateOptions) for all `card` options. If this option is omitted, cards will still appear as a payment option. To remove cards as a payment option, use `paymentOptionPriority`.
 * @param {object} [options.paypal] The configuration options for PayPal. To include a PayPal option in your Drop-in integration, include the `paypal` parameter and [enable PayPal in the Braintree Control Panel](https://developers.braintreepayments.com/guides/paypal/testing-go-live/#go-live). To test in Sandbox, you will need to [link a PayPal sandbox test account to your Braintree sandbox account](https://developers.braintreepayments.com/guides/paypal/testing-go-live/#linked-paypal-testing).
 *
 * Some of the PayPal configuration options are listed [here](#~paypalCreateOptions), but for a full list see the [PayPal Checkout client reference options](http://braintree.github.io/braintree-web/{@pkg bt-web-version}/PayPalCheckout.html#createPayment).
 *
 * @param {object} [options.paypalCredit] The configuration options for PayPal Credit. To include a PayPal Credit option in your Drop-in integration, include the `paypalCredit` parameter and [enable PayPal in the Braintree Control Panel](https://developers.braintreepayments.com/guides/paypal/testing-go-live/#go-live).
 *
 * Some of the PayPal Credit configuration options are listed [here](#~paypalCreateOptions), but for a full list see the [PayPal Checkout client reference options](http://braintree.github.io/braintree-web/{@pkg bt-web-version}/PayPalCheckout.html#createPayment). For more information on PayPal Credit, see the [Braintree Developer Docs](https://developers.braintreepayments.com/guides/paypal/paypal-credit/javascript/v3).
 *
 * @param {object} [options.dataCollector] The configuration options for data collector. See [`dataCollectorOptions`](#~dataCollectorOptions) for all `dataCollector` options. If Data Collector is configured and fails to load, Drop-in creation will fail.
 *
 * @param {function} [callback] The second argument, `data`, is the {@link Dropin} instance. Returns a promise if no callback is provided.
 * @returns {void|Promise} Returns a promise if no callback is provided.
 * @example
 * <caption>A full example of accepting credit cards with callback API</caption>
 * <!DOCTYPE html>
 * <html lang="en">
 *   <head>
 *     <meta charset="UTF-8">
 *     <title>Checkout</title>
 *   </head>
 *   <body>
 *     <div id="dropin-container"></div>
 *     <button id="submit-button">Purchase</button>
 *
 *     <script src="https://js.braintreegateway.com/web/dropin/{@pkg version}/js/dropin.min.js"></script>
 *
 *     <script>
 *       var submitButton = document.querySelector('#submit-button');
 *
 *       braintree.dropin.create({
 *         authorization: 'CLIENT_AUTHORIZATION',
 *         container: '#dropin-container'
 *       }, function (err, dropinInstance) {
 *         if (err) {
 *           // Handle any errors that might've occurred when creating Drop-in
 *           console.error(err);
 *           return;
 *         }
 *         submitButton.addEventListener('click', function () {
 *           dropinInstance.requestPaymentMethod(function (err, payload) {
 *             if (err) {
 *               // Handle errors in requesting payment method
 *             }
 *
 *             // Send payload.nonce to your server
 *           });
 *         });
 *       });
 *     </script>
 *   </body>
 * </html>
 * @example
 * <caption>A full example of accepting credit cards with promise API</caption>
 * <!DOCTYPE html>
 * <html lang="en">
 *   <head>
 *     <meta charset="UTF-8">
 *     <title>Checkout</title>
 *   </head>
 *   <body>
 *     <div id="dropin-container"></div>
 *     <button id="submit-button">Purchase</button>
 *
 *     <script src="https://js.braintreegateway.com/web/dropin/{@pkg version}/js/dropin.min.js"></script>
 *
 *     <script>
 *       var submitButton = document.querySelector('#submit-button');
 *
 *       braintree.dropin.create({
 *         authorization: 'CLIENT_AUTHORIZATION',
 *         container: '#dropin-container'
 *       }).then(function (dropinInstance) {
 *         submitButton.addEventListener('click', function () {
 *           dropinInstance.requestPaymentMethod().then(function (payload) {
 *             // Send payload.nonce to your server
 *           }).catch(function (err) {
 *             // Handle errors in requesting payment method
 *           });
 *         });
 *       }).catch(function (err) {
 *         // Handle any errors that might've occurred when creating Drop-in
 *         console.error(err);
 *       });
 *     </script>
 *   </body>
 * </html>
 * @example
 * <caption>Setting up a Drop-in instance to accept credit cards, PayPal, and PayPal Credit</caption>
 * braintree.dropin.create({
 *   authorization: 'CLIENT_AUTHORIZATION',
 *   container: '#dropin-container',
 *   paypal: {
 *     flow: 'checkout',
 *     amount: 10.00,
 *     currency: 'USD'
 *   },
 *  paypalCredit: {
 *    flow: 'checkout',
 *    amount: 10.00,
 *    currency: 'USD'
 *   }
 * }, function (err, dropinInstance) {
 *   // Set up a handler to request a payment method and
 *   // submit the payment method nonce to your server
 * });
 *
 * @example
 * <caption>Submitting the payment method nonce to the server using a form</caption>
 * <!DOCTYPE html>
 * <html lang="en">
 *   <head>
 *     <meta charset="UTF-8">
 *     <title>Checkout</title>
 *   </head>
 *   <body>
 *     <form id="payment-form" action="/" method="post">
 *       <div id="dropin-container"></div>
 *       <input type="submit" value="Purchase"></input>
 *       <input type="hidden id="nonce" name="payment_method_nonce"></input>
 *     </form>
 *
 *     <script src="https://js.braintreegateway.com/web/dropin/{@pkg version}/js/dropin.min.js"></script>
 *
 *     <script>
 *       var form = document.querySelector('#payment-form');
 *       var nonceInput = document.querySelector('#nonce');
 *
 *       braintree.dropin.create({
 *         authorization: 'CLIENT_AUTHORIZATION',
 *         container: '#dropin-container'
 *       }, function (err, dropinInstance) {
 *         if (err) {
 *           // Handle any errors that might've occurred when creating Drop-in
 *           console.error(err);
 *           return;
 *         }
 *         form.addEventListener('submit', function (event) {
 *           event.preventDefault();
 *
 *           dropinInstance.requestPaymentMethod(function (err, payload) {
 *             if (err) {
 *               // Handle errors in requesting payment method
 *               return;
 *             }
 *
 *             // Send payload.nonce to your server
 *             nonceInput.value = payload.nonce;
 *             form.submit();
 *           });
 *         });
 *       });
 *     </script>
 *   </body>
 * </html>
 *
 * @example
 * <caption>Use your own translations</caption>
 * braintree.dropin.create({
 *   authorization: 'CLIENT_AUTHORIZATION',
 *   container: '#dropin-container',
 *   translations: {
 *     payingWith: 'You are paying with {{paymentSource}}',
 *     chooseAnotherWayToPay: 'My custom chooseAnotherWayToPay string',
 *     // Any other custom translation strings
 *   }
 * }, callback);
 *
 * @example
 * <caption>Customizing Drop-in with card form overrides</caption>
 * braintree.dropin.create({
 *   authorization: 'CLIENT_AUTHORIZATION',
 *   container: '#dropin-container',
 *   card: {
 *     overrides: {
 *       fields: {
 *         number: {
 *           placeholder: '1111 1111 1111 1111' // Update the number field placeholder
 *         },
 *         postalCode: {
 *           minlength: 5 // Set the minimum length of the postal code field
 *         },
 *         cvv: null // Remove the CVV field from your form
 *       },
 *       styles: {
 *         input: {
 *           'font-size': '18px' // Change the font size for all inputs
 *         },
 *         ':focus': {
 *           color: 'red' // Change the focus color to red for all inputs
 *         }
 *       }
 *     }
 *   }
 * }, callback);
 *
 * @example
 * <caption>Including a cardholder name field</caption>
 * braintree.dropin.create({
 *   authorization: 'CLIENT_AUTHORIZATION',
 *   container: '#dropin-container',
 *   card: {
 *     cardholderName: true
 *   }
 * }, callback);
 *
 * @example
 * <caption>Including a required cardholder name field</caption>
 * braintree.dropin.create({
 *   authorization: 'CLIENT_AUTHORIZATION',
 *   container: '#dropin-container',
 *   card: {
 *     cardholderName: {
 *       required: true
 *     }
 *   }
 * }, callback);
 */

function create(options) {
  if (!options.authorization) {
    return Promise.reject(new DropinError('options.authorization is required.'));
  }

  return client.create({
    authorization: options.authorization
  }).catch(function (err) {
    return Promise.reject(new DropinError({
      message: 'There was an error creating Drop-in.',
      braintreeWebError: err
    }));
  }).then(function (clientInstance) {
    clientInstance = setAnalyticsIntegration(clientInstance);

    if (clientInstance.getConfiguration().authorizationType === 'TOKENIZATION_KEY') {
      analytics.sendEvent(clientInstance, 'started.tokenization-key');
    } else {
      analytics.sendEvent(clientInstance, 'started.client-token');
    }

    return new Promise(function (resolve, reject) {
      new Dropin({
        merchantConfiguration: options,
        client: clientInstance
      })._initialize(function (err, instance) {
        if (err) {
          reject(err);
          return;
        }

        resolve(instance);
      });
    });
  });
}

function setAnalyticsIntegration(clientInstance) {
  var configuration = clientInstance.getConfiguration();

  configuration.analyticsMetadata.integration = constants.INTEGRATION;
  configuration.analyticsMetadata.integrationType = constants.INTEGRATION;
  configuration.analyticsMetadata.dropinVersion = VERSION;

  clientInstance.getConfiguration = function () {
    return configuration;
  };

  return clientInstance;
}

// we check for document's existence to support server side rendering
createFromScriptTag(create, typeof document !== 'undefined' && document.querySelector('script[data-braintree-dropin-authorization]'));

module.exports = {
  create: wrapPromise(create),
  /**
   * @description The current version of Drop-in, i.e. `{@pkg version}`.
   * @type {string}
   */
  VERSION: VERSION
};


/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var assign = __webpack_require__(19).assign;
var analytics = __webpack_require__(15);
var constants = __webpack_require__(2);
var DropinError = __webpack_require__(5);
var DropinModel = __webpack_require__(127);
var EventEmitter = __webpack_require__(56);
var isGuestCheckout = __webpack_require__(57);

var MainView = __webpack_require__(128);
var paymentMethodsViewID = __webpack_require__(61).ID;
var paymentOptionsViewID = __webpack_require__(62).ID;
var paymentOptionIDs = constants.paymentOptionIDs;
var translations = __webpack_require__(169);
var uuid = __webpack_require__(63);
var Promise = __webpack_require__(12);
var wrapPrototype = __webpack_require__(4).wrapPrototype;

var mainHTML = "<div class=\"braintree-dropin\">\n  <div data-braintree-id=\"methods-label\" class=\"braintree-heading\">&nbsp;</div>\n  <div data-braintree-id=\"choose-a-way-to-pay\" class=\"braintree-heading\">{{chooseAWayToPay}}</div>\n  <div class=\"braintree-placeholder\">&nbsp;</div>\n\n  <div data-braintree-id=\"upper-container\" class=\"braintree-upper-container\">\n    <div data-braintree-id=\"loading-container\" class=\"braintree-loader__container\">\n      <div data-braintree-id=\"loading-indicator\" class=\"braintree-loader__indicator\">\n        <svg width=\"14\" height=\"16\" class=\"braintree-loader__lock\">\n          <use xlink:href=\"#iconLockLoader\"></use>\n        </svg>\n      </div>\n    </div>\n\n    <div data-braintree-id=\"methods\" class=\"braintree-methods braintree-methods-initial\">\n      <div data-braintree-id=\"methods-container\"></div>\n    </div>\n\n    <div data-braintree-id=\"options\" class=\"braintree-test-class braintree-options braintree-options-initial\">\n      <div data-braintree-id=\"payment-options-container\" class=\"braintree-options-list\"></div>\n    </div>\n\n    <div data-braintree-id=\"sheet-container\" class=\"braintree-sheet__container\">\n      <div data-braintree-id=\"paypal\" class=\"braintree-paypal braintree-sheet\">\n        <div data-braintree-id=\"paypal-sheet-header\" class=\"braintree-sheet__header\">\n          <div class=\"braintree-sheet__header-label\">\n            <div class=\"braintree-sheet__logo--header\">\n              <svg width=\"40\" height=\"24\">\n                <use xlink:href=\"#logoPayPal\"></use>\n              </svg>\n            </div>\n            <div class=\"braintree-sheet__label\">{{PayPal}}</div>\n          </div>\n        </div>\n        <div class=\"braintree-sheet__content braintree-sheet__content--button\">\n          <div data-braintree-id=\"paypal-button\" class=\"braintree-sheet__button--paypal\"></div>\n        </div>\n      </div>\n      <div data-braintree-id=\"paypalCredit\" class=\"braintree-paypalCredit braintree-sheet\">\n        <div data-braintree-id=\"paypal-credit-sheet-header\" class=\"braintree-sheet__header\">\n          <div class=\"braintree-sheet__header-label\">\n            <div class=\"braintree-sheet__logo--header\">\n              <svg width=\"40\" height=\"24\">\n                <use xlink:href=\"#logoPayPalCredit\"></use>\n              </svg>\n            </div>\n            <div class=\"braintree-sheet__label\">{{PayPal Credit}}</div>\n          </div>\n        </div>\n        <div class=\"braintree-sheet__content braintree-sheet__content--button\">\n          <div data-braintree-id=\"paypal-credit-button\" class=\"braintree-sheet__button--paypal\"></div>\n        </div>\n      </div>\n      <div data-braintree-id=\"card\" class=\"braintree-card braintree-form braintree-sheet\">\n        <div data-braintree-id=\"card-sheet-header\" class=\"braintree-sheet__header\">\n          <div class=\"braintree-sheet__header-label\">\n            <div class=\"braintree-sheet__logo--header\">\n              <svg width=\"40\" height=\"24\" class=\"braintree-icon--bordered\">\n                <use xlink:href=\"#iconCardFront\"></use>\n              </svg>\n            </div>\n            <div class=\"braintree-sheet__text\">{{payWithCard}}</div>\n          </div>\n          <div data-braintree-id=\"card-view-icons\" class=\"braintree-sheet__icons\"></div>\n        </div>\n        <div class=\"braintree-sheet__content braintree-sheet__content--form\">\n          <div data-braintree-id=\"cardholder-name-field-group\" class=\"braintree-form__field-group\">\n            <div class=\"braintree-form__label\">{{cardholderNameLabel}}</div>\n            <div class=\"braintree-form__field\">\n              <div class=\"braintree-form-cardholder-name braintree-form__hosted-field\">\n                <input id=\"braintree__card-view-input__cardholder-name\" type=\"text\" placeholder=\"{{cardholderNamePlaceholder}}\"/>\n              </div>\n              <div class=\"braintree-form__icon-container\">\n                <div class=\"braintree-form__icon braintree-form__field-error-icon\">\n                  <svg width=\"24\" height=\"24\">\n                    <use xlink:href=\"#iconError\"></use>\n                  </svg>\n                </div>\n              </div>\n            </div>\n            <div data-braintree-id=\"cardholder-name-field-error\" class=\"braintree-form__field-error\">{{fieldEmptyForCardholderName}}</div>\n          </div>\n          <div data-braintree-id=\"number-field-group\" class=\"braintree-form__field-group\">\n            <div class=\"braintree-form__label\">{{cardNumberLabel}}</div>\n            <div class=\"braintree-form__field\">\n              <div class=\"braintree-form-number braintree-form__hosted-field\"></div>\n              <div class=\"braintree-form__icon-container\">\n                <div data-braintree-id=\"card-number-icon\" class=\"braintree-form__icon braintree-form__field-secondary-icon\">\n                  <svg width=\"40\" height=\"24\" class=\"braintree-icon--bordered\">\n                  <use data-braintree-id=\"card-number-icon-svg\" xlink:href=\"#iconCardFront\"></use>\n                  </svg>\n                </div>\n                <div class=\"braintree-form__icon braintree-form__field-error-icon\">\n                  <svg width=\"24\" height=\"24\">\n                    <use xlink:href=\"#iconError\"></use>\n                  </svg>\n                </div>\n              </div>\n            </div>\n            <div data-braintree-id=\"number-field-error\" class=\"braintree-form__field-error\"></div>\n          </div>\n\n          <div class=\"braintree-form__flexible-fields\">\n            <div data-braintree-id=\"expiration-date-field-group\" class=\"braintree-form__field-group\">\n              <div class=\"braintree-form__label\">{{expirationDateLabel}}\n                <span class=\"braintree-form__descriptor\">{{expirationDateLabelSubheading}}</span>\n              </div>\n              <div class=\"braintree-form__field\">\n                <div class=\"braintree-form__hosted-field braintree-form-expiration\"></div>\n                <div class=\"braintree-form__icon-container\">\n                  <div class=\"braintree-form__icon braintree-form__field-error-icon\">\n                    <svg width=\"24\" height=\"24\">\n                      <use xlink:href=\"#iconError\"></use>\n                    </svg>\n                  </div>\n                </div>\n              </div>\n\n              <div data-braintree-id=\"expiration-date-field-error\" class=\"braintree-form__field-error\"></div>\n            </div>\n\n            <div data-braintree-id=\"cvv-field-group\" class=\"braintree-form__field-group\">\n              <div class=\"braintree-form__label\">{{cvvLabel}}\n                <span data-braintree-id=\"cvv-label-descriptor\" class=\"braintree-form__descriptor\">{{cvvThreeDigitLabelSubheading}}</span>\n              </div>\n              <div class=\"braintree-form__field\">\n                <div class=\"braintree-form__hosted-field braintree-form-cvv\"></div>\n                <div class=\"braintree-form__icon-container\">\n                  <div data-braintree-id=\"cvv-icon\" class=\"braintree-form__icon braintree-form__field-secondary-icon\">\n                    <svg width=\"40\" height=\"24\" class=\"braintree-icon--bordered\">\n                    <use data-braintree-id=\"cvv-icon-svg\" xlink:href=\"#iconCVVBack\"></use>\n                    </svg>\n                  </div>\n                  <div class=\"braintree-form__icon braintree-form__field-error-icon\">\n                    <svg width=\"24\" height=\"24\">\n                      <use xlink:href=\"#iconError\"></use>\n                    </svg>\n                  </div>\n                </div>\n              </div>\n              <div data-braintree-id=\"cvv-field-error\" class=\"braintree-form__field-error\"></div>\n            </div>\n\n            <div data-braintree-id=\"postal-code-field-group\" class=\"braintree-form__field-group\">\n              <div class=\"braintree-form__label\">{{postalCodeLabel}}</div>\n              <div class=\"braintree-form__field\">\n                <div class=\"braintree-form__hosted-field braintree-form-postal-code\"></div>\n                <div class=\"braintree-form__icon-container\">\n                  <div class=\"braintree-form__icon braintree-form__field-error-icon\">\n                    <svg width=\"24\" height=\"24\">\n                      <use xlink:href=\"#iconError\"></use>\n                    </svg>\n                  </div>\n                </div>\n              </div>\n              <div data-braintree-id=\"postal-code-field-error\" class=\"braintree-form__field-error\"></div>\n            </div>\n          </div>\n        </div>\n      </div>\n      <div data-braintree-id=\"sheet-error\" class=\"braintree-sheet__error\">\n        <div class=\"braintree-form__icon braintree-sheet__error-icon\">\n          <svg width=\"24\" height=\"24\">\n            <use xlink:href=\"#iconError\"></use>\n          </svg>\n        </div>\n        <div data-braintree-id=\"sheet-error-text\" class=\"braintree-sheet__error-text\"></div>\n      </div>\n    </div>\n  </div>\n\n  <div data-braintree-id=\"lower-container\" class=\"braintree-test-class braintree-options braintree-hidden\">\n    <div data-braintree-id=\"other-ways-to-pay\" class=\"braintree-heading\">{{otherWaysToPay}}</div>\n  </div>\n\n  <div data-braintree-id=\"toggle\" class=\"braintree-toggle braintree-hidden\" tabindex=\"0\">\n    <span>{{chooseAnotherWayToPay}}</span>\n  </div>\n</div>\n";
var svgHTML = "<svg data-braintree-id=\"svgs\" style=\"display: none\">\n  <defs>\n    <symbol id=\"icon-visa\" viewBox=\"0 0 40 24\">\n      <title>Visa</title>\n      <path d=\"M0 1.927C0 .863.892 0 1.992 0h36.016C39.108 0 40 .863 40 1.927v20.146C40 23.137 39.108 24 38.008 24H1.992C.892 24 0 23.137 0 22.073V1.927z\" style=\"fill: #FFF\" />\n      <path d=\"M0 22.033C0 23.12.892 24 1.992 24h36.016c1.1 0 1.992-.88 1.992-1.967V20.08H0v1.953z\" style=\"fill: #F8B600\" />\n      <path d=\"M0 3.92h40V1.967C40 .88 39.108 0 38.008 0H1.992C.892 0 0 .88 0 1.967V3.92zM19.596 7.885l-2.11 9.478H14.93l2.11-9.478h2.554zm10.743 6.12l1.343-3.56.773 3.56H30.34zm2.85 3.358h2.36l-2.063-9.478H31.31c-.492 0-.905.274-1.088.695l-3.832 8.783h2.682l.532-1.415h3.276l.31 1.415zm-6.667-3.094c.01-2.502-3.6-2.64-3.577-3.76.008-.338.345-.7 1.083-.793.365-.045 1.373-.08 2.517.425l.448-2.01c-.615-.214-1.405-.42-2.39-.42-2.523 0-4.3 1.288-4.313 3.133-.016 1.364 1.268 2.125 2.234 2.58.996.464 1.33.762 1.325 1.177-.006.636-.793.918-1.526.928-1.285.02-2.03-.333-2.623-.6l-.462 2.08c.598.262 1.7.49 2.84.502 2.682 0 4.437-1.273 4.445-3.243zM15.948 7.884l-4.138 9.478h-2.7L7.076 9.8c-.123-.466-.23-.637-.606-.834-.615-.32-1.63-.62-2.52-.806l.06-.275h4.345c.554 0 1.052.354 1.178.966l1.076 5.486 2.655-6.45h2.683z\" style=\"fill: #1A1F71\" />\n    </symbol>\n\n    <symbol id=\"icon-master-card\" viewBox=\"0 0 40 24\">\n      <title>MasterCard</title>\n      <path d=\"M0 1.927C0 .863.892 0 1.992 0h36.016C39.108 0 40 .863 40 1.927v20.146C40 23.137 39.108 24 38.008 24H1.992C.892 24 0 23.137 0 22.073V1.927z\" style=\"fill: #FFF\" />\n      <path d=\"M11.085 22.2v-1.36c0-.522-.318-.863-.864-.863-.272 0-.568.09-.773.386-.16-.25-.386-.386-.727-.386-.228 0-.455.068-.637.318v-.272h-.478V22.2h.478v-1.202c0-.386.204-.567.523-.567.318 0 .478.205.478.568V22.2h.477v-1.202c0-.386.23-.567.524-.567.32 0 .478.205.478.568V22.2h.523zm7.075-2.177h-.774v-.658h-.478v.658h-.432v.43h.432v.998c0 .5.205.795.75.795.206 0 .433-.068.592-.16l-.136-.407c-.136.09-.296.114-.41.114-.227 0-.318-.137-.318-.363v-.976h.774v-.43zm4.048-.046c-.273 0-.454.136-.568.318v-.272h-.478V22.2h.478v-1.225c0-.363.16-.567.455-.567.09 0 .204.023.295.046l.137-.454c-.09-.023-.228-.023-.32-.023zm-6.118.227c-.228-.16-.546-.227-.888-.227-.546 0-.91.272-.91.703 0 .363.274.567.75.635l.23.023c.25.045.385.113.385.227 0 .16-.182.272-.5.272-.32 0-.57-.113-.728-.227l-.228.363c.25.18.59.272.932.272.637 0 1-.295 1-.703 0-.385-.295-.59-.75-.658l-.227-.022c-.205-.023-.364-.068-.364-.204 0-.16.16-.25.41-.25.272 0 .545.114.682.182l.205-.386zm12.692-.227c-.273 0-.455.136-.568.318v-.272h-.478V22.2h.478v-1.225c0-.363.16-.567.455-.567.09 0 .203.023.294.046L29.1 20c-.09-.023-.227-.023-.318-.023zm-6.096 1.134c0 .66.455 1.135 1.16 1.135.32 0 .546-.068.774-.25l-.228-.385c-.182.136-.364.204-.57.204-.385 0-.658-.272-.658-.703 0-.407.273-.68.66-.702.204 0 .386.068.568.204l.228-.385c-.228-.182-.455-.25-.774-.25-.705 0-1.16.477-1.16 1.134zm4.413 0v-1.087h-.48v.272c-.158-.204-.385-.318-.68-.318-.615 0-1.093.477-1.093 1.134 0 .66.478 1.135 1.092 1.135.317 0 .545-.113.68-.317v.272h.48v-1.09zm-1.753 0c0-.384.25-.702.66-.702.387 0 .66.295.66.703 0 .387-.273.704-.66.704-.41-.022-.66-.317-.66-.703zm-5.71-1.133c-.636 0-1.09.454-1.09 1.134 0 .682.454 1.135 1.114 1.135.32 0 .638-.09.888-.295l-.228-.34c-.18.136-.41.227-.636.227-.296 0-.592-.136-.66-.522h1.615v-.18c.022-.704-.388-1.158-1.002-1.158zm0 .41c.297 0 .502.18.547.52h-1.137c.045-.295.25-.52.59-.52zm11.852.724v-1.95h-.48v1.135c-.158-.204-.385-.318-.68-.318-.615 0-1.093.477-1.093 1.134 0 .66.478 1.135 1.092 1.135.318 0 .545-.113.68-.317v.272h.48v-1.09zm-1.752 0c0-.384.25-.702.66-.702.386 0 .66.295.66.703 0 .387-.274.704-.66.704-.41-.022-.66-.317-.66-.703zm-15.97 0v-1.087h-.476v.272c-.16-.204-.387-.318-.683-.318-.615 0-1.093.477-1.093 1.134 0 .66.478 1.135 1.092 1.135.318 0 .545-.113.682-.317v.272h.477v-1.09zm-1.773 0c0-.384.25-.702.66-.702.386 0 .66.295.66.703 0 .387-.274.704-.66.704-.41-.022-.66-.317-.66-.703z\" style=\"fill: #000\" />\n      <path style=\"fill: #FF5F00\" d=\"M23.095 3.49H15.93v12.836h7.165\" />\n      <path d=\"M16.382 9.91c0-2.61 1.23-4.922 3.117-6.42-1.39-1.087-3.14-1.745-5.05-1.745-4.528 0-8.19 3.65-8.19 8.164 0 4.51 3.662 8.162 8.19 8.162 1.91 0 3.66-.657 5.05-1.746-1.89-1.474-3.118-3.81-3.118-6.417z\" style=\"fill: #EB001B\" />\n      <path d=\"M32.76 9.91c0 4.51-3.664 8.162-8.19 8.162-1.91 0-3.662-.657-5.05-1.746 1.91-1.496 3.116-3.81 3.116-6.417 0-2.61-1.228-4.922-3.116-6.42 1.388-1.087 3.14-1.745 5.05-1.745 4.526 0 8.19 3.674 8.19 8.164z\" style=\"fill: #F79E1B\" />\n    </symbol>\n\n    <symbol id=\"icon-unionpay\" viewBox=\"0 0 40 24\">\n      <title>Union Pay</title>\n      <path d=\"M38.333 24H1.667C.75 24 0 23.28 0 22.4V1.6C0 .72.75 0 1.667 0h36.666C39.25 0 40 .72 40 1.6v20.8c0 .88-.75 1.6-1.667 1.6z\" style=\"fill: #FFF\" />\n      <path d=\"M9.877 2h8.126c1.135 0 1.84.93 1.575 2.077l-3.783 16.35c-.267 1.142-1.403 2.073-2.538 2.073H5.13c-1.134 0-1.84-.93-1.574-2.073L7.34 4.076C7.607 2.93 8.74 2 9.878 2z\" style=\"fill: #E21836\" />\n      <path d=\"M17.325 2h9.345c1.134 0 .623.93.356 2.077l-3.783 16.35c-.265 1.142-.182 2.073-1.32 2.073H12.58c-1.137 0-1.84-.93-1.574-2.073l3.783-16.35C15.056 2.93 16.19 2 17.324 2z\" style=\"fill: #00447B\" />\n      <path d=\"M26.3 2h8.126c1.136 0 1.84.93 1.575 2.077l-3.782 16.35c-.266 1.142-1.402 2.073-2.54 2.073h-8.122c-1.137 0-1.842-.93-1.574-2.073l3.78-16.35C24.03 2.93 25.166 2 26.303 2z\" style=\"fill: #007B84\" />\n      <path d=\"M27.633 14.072l-.99 3.3h.266l-.208.68h-.266l-.062.212h-.942l.064-.21H23.58l.193-.632h.194l1.005-3.35.2-.676h.962l-.1.34s.255-.184.498-.248c.242-.064 1.636-.088 1.636-.088l-.206.672h-.33zm-1.695 0l-.254.843s.285-.13.44-.172c.16-.04.395-.057.395-.057l.182-.614h-.764zm-.38 1.262l-.263.877s.29-.15.447-.196c.157-.037.396-.066.396-.066l.185-.614h-.766zm-.614 2.046h.767l.222-.74h-.765l-.223.74z\" style=\"fill: #FEFEFE\" />\n      <path d=\"M28.055 13.4h1.027l.01.385c-.005.065.05.096.17.096h.208l-.19.637h-.555c-.48.035-.662-.172-.65-.406l-.02-.71zM28.193 16.415h-.978l.167-.566H28.5l.16-.517h-1.104l.19-.638h3.072l-.193.638h-1.03l-.16.516h1.032l-.17.565H29.18l-.2.24h.454l.11.712c.013.07.014.116.036.147.023.026.158.038.238.038h.137l-.21.694h-.348c-.054 0-.133-.004-.243-.01-.105-.008-.18-.07-.25-.105-.064-.03-.16-.11-.182-.24l-.11-.712-.507.7c-.162.222-.38.39-.748.39h-.712l.186-.62h.273c.078 0 .15-.03.2-.056.052-.023.098-.05.15-.126l.74-1.05zM17.478 14.867h2.59l-.19.622H18.84l-.16.53h1.06l-.194.64h-1.06l-.256.863c-.03.095.25.108.353.108l.53-.072-.212.71h-1.193c-.096 0-.168-.013-.272-.037-.1-.023-.145-.07-.19-.138-.043-.07-.11-.128-.064-.278l.343-1.143h-.588l.195-.65h.592l.156-.53h-.588l.188-.623zM19.223 13.75h1.063l-.194.65H18.64l-.157.136c-.067.066-.09.038-.18.087-.08.04-.254.123-.477.123h-.466l.19-.625h.14c.118 0 .198-.01.238-.036.046-.03.098-.096.157-.203l.267-.487h1.057l-.187.356zM20.74 13.4h.905l-.132.46s.286-.23.487-.313c.2-.075.65-.143.65-.143l1.464-.007-.498 1.672c-.085.286-.183.472-.244.555-.055.087-.12.16-.248.23-.124.066-.236.104-.34.115-.096.007-.244.01-.45.012h-1.41l-.4 1.324c-.037.13-.055.194-.03.23.02.03.068.066.135.066l.62-.06-.21.726h-.698c-.22 0-.383-.004-.495-.013-.108-.01-.22 0-.295-.058-.065-.058-.164-.133-.162-.21.007-.073.037-.192.082-.356l1.268-4.23zm1.922 1.69h-1.484l-.09.3h1.283c.152-.018.184.004.196-.003l.096-.297zm-1.402-.272s.29-.266.786-.353c.112-.022.82-.015.82-.015l.106-.357h-1.496l-.216.725z\" style=\"fill: #FEFEFE\" />\n      <path d=\"M23.382 16.1l-.084.402c-.036.125-.067.22-.16.302-.1.084-.216.172-.488.172l-.502.02-.004.455c-.006.13.028.117.048.138.024.022.045.032.067.04l.157-.008.48-.028-.198.663h-.552c-.385 0-.67-.008-.765-.084-.092-.057-.105-.132-.103-.26l.035-1.77h.88l-.013.362h.212c.072 0 .12-.007.15-.026.027-.02.047-.048.06-.093l.087-.282h.692zM10.84 7.222c-.032.143-.596 2.763-.598 2.764-.12.53-.21.91-.508 1.152-.172.14-.37.21-.6.21-.37 0-.587-.185-.624-.537l-.007-.12.113-.712s.593-2.388.7-2.703c.002-.017.005-.026.007-.035-1.152.01-1.357 0-1.37-.018-.007.024-.037.173-.037.173l-.605 2.688-.05.23-.1.746c0 .22.042.4.13.553.275.485 1.06.557 1.504.557.573 0 1.11-.123 1.47-.345.63-.375.797-.962.944-1.48l.067-.267s.61-2.48.716-2.803c.003-.017.006-.026.01-.035-.835.01-1.08 0-1.16-.018zM14.21 12.144c-.407-.006-.55-.006-1.03.018l-.018-.036c.042-.182.087-.363.127-.548l.06-.25c.086-.39.173-.843.184-.98.007-.084.036-.29-.2-.29-.1 0-.203.048-.307.096-.058.207-.174.79-.23 1.055-.118.558-.126.62-.178.897l-.036.037c-.42-.006-.566-.006-1.05.018l-.024-.04c.08-.332.162-.668.24-.998.203-.9.25-1.245.307-1.702l.04-.028c.47-.067.585-.08 1.097-.185l.043.047-.077.287c.086-.052.168-.104.257-.15.242-.12.51-.155.658-.155.223 0 .468.062.57.323.098.232.034.52-.094 1.084l-.066.287c-.13.627-.152.743-.225 1.174l-.05.036zM15.87 12.144c-.245 0-.405-.006-.56 0-.153 0-.303.008-.532.018l-.013-.02-.015-.02c.062-.238.097-.322.128-.406.03-.084.06-.17.115-.41.072-.315.116-.535.147-.728.033-.187.052-.346.075-.53l.02-.014.02-.018c.244-.036.4-.057.56-.082.16-.024.32-.055.574-.103l.008.023.008.022c-.047.195-.094.39-.14.588-.047.197-.094.392-.137.587-.093.414-.13.57-.152.68-.02.105-.026.163-.063.377l-.022.02-.023.017zM19.542 10.728c.143-.633.033-.928-.108-1.11-.213-.273-.59-.36-.978-.36-.235 0-.793.023-1.23.43-.312.29-.458.687-.546 1.066-.088.387-.19 1.086.447 1.344.198.085.48.108.662.108.466 0 .945-.13 1.304-.513.278-.312.405-.775.448-.965zm-1.07-.046c-.02.106-.113.503-.24.673-.086.123-.19.198-.305.198-.033 0-.235 0-.238-.3-.003-.15.027-.304.063-.47.108-.478.236-.88.56-.88.255 0 .27.298.16.78zM29.536 12.187c-.493-.004-.635-.004-1.09.015l-.03-.037c.124-.472.248-.943.358-1.42.142-.62.175-.882.223-1.244l.037-.03c.49-.07.625-.09 1.135-.186l.015.044c-.093.388-.186.777-.275 1.166-.19.816-.258 1.23-.33 1.658l-.044.035z\" style=\"fill: #FEFEFE\" />\n      <path d=\"M29.77 10.784c.144-.63-.432-.056-.525-.264-.14-.323-.052-.98-.62-1.2-.22-.085-.732.025-1.17.428-.31.29-.458.683-.544 1.062-.088.38-.19 1.078.444 1.328.2.085.384.11.567.103.638-.034 1.124-1.002 1.483-1.386.277-.303.326.115.368-.07zm-.974-.047c-.024.1-.117.503-.244.67-.083.117-.283.192-.397.192-.032 0-.232 0-.24-.3 0-.146.03-.3.067-.467.11-.47.235-.87.56-.87.254 0 .363.293.254.774zM22.332 12.144c-.41-.006-.55-.006-1.03.018l-.018-.036c.04-.182.087-.363.13-.548l.057-.25c.09-.39.176-.843.186-.98.008-.084.036-.29-.198-.29-.1 0-.203.048-.308.096-.057.207-.175.79-.232 1.055-.115.558-.124.62-.176.897l-.035.037c-.42-.006-.566-.006-1.05.018l-.022-.04.238-.998c.203-.9.25-1.245.307-1.702l.038-.028c.472-.067.587-.08 1.098-.185l.04.047-.073.287c.084-.052.17-.104.257-.15.24-.12.51-.155.655-.155.224 0 .47.062.575.323.095.232.03.52-.098 1.084l-.065.287c-.133.627-.154.743-.225 1.174l-.05.036zM26.32 8.756c-.07.326-.282.603-.554.736-.225.114-.498.123-.78.123h-.183l.013-.074.336-1.468.01-.076.007-.058.132.015.71.062c.275.105.388.38.31.74zM25.88 7.22l-.34.003c-.883.01-1.238.006-1.383-.012l-.037.182-.315 1.478-.793 3.288c.77-.01 1.088-.01 1.22.004l.21-1.024s.153-.644.163-.667c0 0 .047-.066.096-.092h.07c.665 0 1.417 0 2.005-.437.4-.298.675-.74.797-1.274.03-.132.054-.29.054-.446 0-.205-.04-.41-.16-.568-.3-.423-.896-.43-1.588-.433zM33.572 9.28l-.04-.043c-.502.1-.594.118-1.058.18l-.034.034-.005.023-.003-.007c-.345.803-.334.63-.615 1.26-.003-.03-.003-.048-.004-.077l-.07-1.37-.044-.043c-.53.1-.542.118-1.03.18l-.04.034-.006.056.003.007c.06.315.047.244.108.738.03.244.065.49.093.73.05.4.077.6.134 1.21-.328.55-.408.757-.722 1.238l.017.044c.478-.018.587-.018.94-.018l.08-.088c.265-.578 2.295-4.085 2.295-4.085zM16.318 9.62c.27-.19.304-.45.076-.586-.23-.137-.634-.094-.906.095-.273.186-.304.45-.075.586.228.134.633.094.905-.096z\" style=\"fill: #FEFEFE\" />\n      <path d=\"M31.238 13.415l-.397.684c-.124.232-.357.407-.728.41l-.632-.01.184-.618h.124c.064 0 .11-.004.148-.022.03-.01.054-.035.08-.072l.233-.373h.988z\" style=\"fill: #FEFEFE\" />\n    </symbol>\n\n    <symbol id=\"icon-american-express\" viewBox=\"0 0 40 24\">\n      <title>American Express</title>\n      <path d=\"M38.333 24H1.667C.75 24 0 23.28 0 22.4V1.6C0 .72.75 0 1.667 0h36.666C39.25 0 40 .72 40 1.6v20.8c0 .88-.75 1.6-1.667 1.6z\" style=\"fill: #FFF\" />\n      <path style=\"fill: #1478BE\" d=\"M6.26 12.32h2.313L7.415 9.66M27.353 9.977h-3.738v1.23h3.666v1.384h-3.675v1.385h3.821v1.005c.623-.77 1.33-1.466 2.025-2.235l.707-.77c-.934-1.004-1.87-2.08-2.804-3.075v1.077z\" />\n      <path d=\"M38.25 7h-5.605l-1.328 1.4L30.072 7H16.984l-1.017 2.416L14.877 7h-9.58L1.25 16.5h4.826l.623-1.556h1.4l.623 1.556H29.99l1.327-1.483 1.328 1.483h5.605l-4.36-4.667L38.25 7zm-17.685 8.1h-1.557V9.883L16.673 15.1h-1.33L13.01 9.883l-.084 5.217H9.73l-.623-1.556h-3.27L5.132 15.1H3.42l2.884-6.772h2.42l2.645 6.233V8.33h2.646l2.107 4.51 1.868-4.51h2.575V15.1zm14.727 0h-2.024l-2.024-2.26-2.023 2.26H22.06V8.328H29.53l1.795 2.177 2.024-2.177h2.025L32.26 11.75l3.032 3.35z\" style=\"fill: #1478BE\" />\n    </symbol>\n\n    <symbol id=\"icon-jcb\" viewBox=\"0 0 40 24\">\n      <title>JCB</title>\n      <path d=\"M38.333 24H1.667C.75 24 0 23.28 0 22.4V1.6C0 .72.75 0 1.667 0h36.666C39.25 0 40 .72 40 1.6v20.8c0 .88-.75 1.6-1.667 1.6z\" style=\"fill: #FFF\" />\n      <path d=\"M33.273 2.01h.013v17.062c-.004 1.078-.513 2.103-1.372 2.746-.63.47-1.366.67-2.14.67-.437 0-4.833.026-4.855 0-.01-.01 0-.07 0-.082v-6.82c0-.04.004-.064.033-.064h5.253c.867 0 1.344-.257 1.692-.61.44-.448.574-1.162.294-1.732-.24-.488-.736-.78-1.244-.913-.158-.04-.32-.068-.483-.083-.01 0-.064 0-.07-.006-.03-.034.023-.04.038-.046.102-.033.215-.042.32-.073.532-.164.993-.547 1.137-1.105.15-.577-.05-1.194-.524-1.552-.34-.257-.768-.376-1.187-.413-.43-.038-4.774-.022-5.21-.022-.072 0-.05-.02-.05-.09V5.63c0-.31.01-.616.073-.92.126-.592.41-1.144.815-1.59.558-.615 1.337-1.01 2.16-1.093.478-.048 4.89-.017 5.305-.017zm-4.06 8.616c.06.272-.01.567-.204.77-.173.176-.407.25-.648.253-.195.003-1.725 0-1.788 0l.003-1.645c.012-.027.02-.018.06-.018.097 0 1.713-.004 1.823.005.232.02.45.12.598.306.076.096.128.208.155.328zm-2.636 2.038h1.944c.242.002.47.063.652.228.226.204.327.515.283.815-.04.263-.194.5-.422.634-.187.112-.39.125-.6.125h-1.857v-1.8z\" style=\"fill: #53B230\" />\n      <path d=\"M6.574 13.89c-.06-.03-.06-.018-.07-.06-.006-.026-.005-8.365.003-8.558.04-.95.487-1.857 1.21-2.47.517-.434 1.16-.71 1.83-.778.396-.04.803-.018 1.2-.018.69 0 4.11-.013 4.12 0 .008.008.002 16.758 0 17.074-.003.956-.403 1.878-1.105 2.523-.506.465-1.15.77-1.83.86-.41.056-5.02.032-5.363.032-.066 0-.054.013-.066-.024-.01-.025 0-7 0-7.17.66.178 1.35.28 2.03.348.662.067 1.33.093 1.993.062.93-.044 1.947-.192 2.712-.762.32-.238.574-.553.73-.922.148-.353.2-.736.2-1.117 0-.348.006-3.93-.016-3.942-.023-.014-2.885-.015-2.9.012-.012.022 0 3.87 0 3.95-.003.47-.16.933-.514 1.252-.468.42-1.11.47-1.707.423-.687-.055-1.357-.245-1.993-.508-.157-.065-.312-.135-.466-.208z\" style=\"fill: #006CB9\" />\n      <path d=\"M15.95 9.835c-.025.02-.05.04-.072.06V6.05c0-.295-.012-.594.01-.888.12-1.593 1.373-2.923 2.944-3.126.382-.05 5.397-.042 5.41-.026.01.01 0 .062 0 .074v16.957c0 1.304-.725 2.52-1.89 3.1-.504.25-1.045.35-1.605.35-.322 0-4.757.015-4.834 0-.05-.01-.023.01-.035-.02-.007-.022 0-6.548 0-7.44v-.422c.554.48 1.256.75 1.96.908.536.12 1.084.176 1.63.196.537.02 1.076.01 1.61-.037.546-.05 1.088-.136 1.625-.244.137-.028.274-.057.41-.09.033-.006.17-.017.187-.044.013-.02 0-.097 0-.12v-1.324c-.582.292-1.19.525-1.83.652-.778.155-1.64.198-2.385-.123-.752-.326-1.2-1.024-1.274-1.837-.076-.837.173-1.716.883-2.212.736-.513 1.7-.517 2.553-.38.634.1 1.245.305 1.825.58.078.037.154.075.23.113V9.322c0-.02.013-.1 0-.118-.02-.028-.152-.038-.188-.046-.066-.016-.133-.03-.2-.045C22.38 9 21.84 8.908 21.3 8.85c-.533-.06-1.068-.077-1.603-.066-.542.01-1.086.054-1.62.154-.662.125-1.32.337-1.883.716-.085.056-.167.117-.245.18z\" style=\"fill: #E20138\" />\n    </symbol>\n\n    <symbol id=\"icon-discover\" viewBox=\"0 0 40 24\">\n      <title>Discover</title>\n      <path d=\"M38.333 24H1.667C.75 24 0 23.28 0 22.4V1.6C0 .72.75 0 1.667 0h36.666C39.25 0 40 .72 40 1.6v20.8c0 .88-.75 1.6-1.667 1.6z\" style=\"fill: #FFF\" />\n      <path d=\"M38.995 11.75S27.522 20.1 6.5 23.5h31.495c.552 0 1-.448 1-1V11.75z\" style=\"fill: #F48024\" />\n      <path d=\"M5.332 11.758c-.338.305-.776.438-1.47.438h-.29V8.55h.29c.694 0 1.115.124 1.47.446.37.33.595.844.595 1.372 0 .53-.224 1.06-.595 1.39zM4.077 7.615H2.5v5.515h1.57c.833 0 1.435-.197 1.963-.637.63-.52 1-1.305 1-2.116 0-1.628-1.214-2.762-2.956-2.762zM7.53 13.13h1.074V7.616H7.53M11.227 9.732c-.645-.24-.834-.397-.834-.695 0-.347.338-.61.8-.61.322 0 .587.132.867.446l.562-.737c-.462-.405-1.015-.612-1.618-.612-.975 0-1.718.678-1.718 1.58 0 .76.346 1.15 1.355 1.513.42.148.635.247.743.314.215.14.322.34.322.57 0 .448-.354.78-.834.78-.51 0-.924-.258-1.17-.736l-.695.67c.495.726 1.09 1.05 1.907 1.05 1.116 0 1.9-.745 1.9-1.812 0-.876-.363-1.273-1.585-1.72zM13.15 10.377c0 1.62 1.27 2.877 2.907 2.877.462 0 .858-.09 1.347-.32v-1.267c-.43.43-.81.604-1.297.604-1.082 0-1.85-.785-1.85-1.9 0-1.06.792-1.895 1.8-1.895.512 0 .9.183 1.347.62V7.83c-.472-.24-.86-.34-1.322-.34-1.627 0-2.932 1.283-2.932 2.887zM25.922 11.32l-1.468-3.705H23.28l2.337 5.656h.578l2.38-5.655H27.41M29.06 13.13h3.046v-.934h-1.973v-1.488h1.9v-.934h-1.9V8.55h1.973v-.935H29.06M34.207 10.154h-.314v-1.67h.33c.67 0 1.034.28 1.034.818 0 .554-.364.852-1.05.852zm2.155-.91c0-1.033-.71-1.628-1.95-1.628H32.82v5.514h1.073v-2.215h.14l1.487 2.215h1.32l-1.733-2.323c.81-.165 1.255-.72 1.255-1.563z\" style=\"fill: #221F20\" />\n      <path d=\"M23.6 10.377c0 1.62-1.31 2.93-2.927 2.93-1.617.002-2.928-1.31-2.928-2.93s1.31-2.932 2.928-2.932c1.618 0 2.928 1.312 2.928 2.932z\" style=\"fill: #F48024\" />\n    </symbol>\n\n    <symbol id=\"icon-diners-club\" viewBox=\"0 0 40 24\">\n      <title>Diners Club</title>\n      <path d=\"M38.333 24H1.667C.75 24 0 23.28 0 22.4V1.6C0 .72.75 0 1.667 0h36.666C39.25 0 40 .72 40 1.6v20.8c0 .88-.75 1.6-1.667 1.6z\" style=\"fill: #FFF\" />\n      <path d=\"M9.02 11.83c0-5.456 4.54-9.88 10.14-9.88 5.6 0 10.139 4.424 10.139 9.88-.002 5.456-4.54 9.88-10.14 9.88-5.6 0-10.14-4.424-10.14-9.88z\" style=\"fill: #FEFEFE\" />\n      <path style=\"fill: #FFF\" d=\"M32.522 22H8.5V1.5h24.022\" />\n      <path d=\"M25.02 11.732c-.003-2.534-1.607-4.695-3.868-5.55v11.102c2.26-.857 3.865-3.017 3.87-5.552zm-8.182 5.55V6.18c-2.26.86-3.86 3.017-3.867 5.55.007 2.533 1.61 4.69 3.868 5.55zm2.158-14.934c-5.25.002-9.503 4.202-9.504 9.384 0 5.182 4.254 9.38 9.504 9.382 5.25 0 9.504-4.2 9.505-9.382 0-5.182-4.254-9.382-9.504-9.384zM18.973 22C13.228 22.027 8.5 17.432 8.5 11.84 8.5 5.726 13.228 1.5 18.973 1.5h2.692c5.677 0 10.857 4.225 10.857 10.34 0 5.59-5.18 10.16-10.857 10.16h-2.692z\" style=\"fill: #004A97\" />\n    </symbol>\n\n    <symbol id=\"icon-maestro\" viewBox=\"0 0 40 24\">\n      <title>Maestro</title>\n      <path d=\"M38.333 24H1.667C.75 24 0 23.28 0 22.4V1.6C0 .72.75 0 1.667 0h36.666C39.25 0 40 .72 40 1.6v20.8c0 .88-.75 1.6-1.667 1.6z\" style=\"fill: #FFF\" />\n      <path d=\"M14.67 22.39V21c.022-.465-.303-.86-.767-.882h-.116c-.3-.023-.603.14-.788.394-.164-.255-.442-.417-.743-.394-.256-.023-.51.116-.65.324v-.278h-.487v2.203h.487v-1.183c-.046-.278.162-.533.44-.58h.094c.325 0 .488.21.488.58v1.23h.487v-1.23c-.047-.278.162-.556.44-.58h.093c.325 0 .487.21.487.58v1.23l.534-.024zm2.712-1.09v-1.113h-.487v.28c-.162-.21-.417-.326-.695-.326-.65 0-1.16.51-1.16 1.16 0 .65.51 1.16 1.16 1.16.278 0 .533-.117.695-.325v.278h.487V21.3zm-1.786 0c.024-.37.348-.65.72-.626.37.023.65.348.626.72-.023.347-.302.625-.673.625-.372 0-.674-.28-.674-.65-.023-.047-.023-.047 0-.07zm12.085-1.16c.163 0 .325.024.465.094.14.046.278.14.37.255.117.115.186.23.256.37.117.3.117.626 0 .927-.046.14-.138.255-.254.37-.116.117-.232.186-.37.256-.303.116-.65.116-.952 0-.14-.046-.28-.14-.37-.255-.118-.116-.187-.232-.257-.37-.116-.302-.116-.627 0-.928.047-.14.14-.255.256-.37.115-.117.23-.187.37-.256.163-.07.325-.116.488-.093zm0 .465c-.092 0-.185.023-.278.046-.092.024-.162.094-.232.14-.07.07-.116.14-.14.232-.068.185-.068.394 0 .58.024.092.094.162.14.23.07.07.14.117.232.14.186.07.37.07.557 0 .092-.023.16-.092.23-.14.07-.068.117-.138.14-.23.07-.186.07-.395 0-.58-.023-.093-.093-.162-.14-.232-.07-.07-.138-.116-.23-.14-.094-.045-.187-.07-.28-.045zm-7.677.695c0-.695-.44-1.16-1.043-1.16-.65 0-1.16.534-1.137 1.183.023.65.534 1.16 1.183 1.136.325 0 .65-.093.905-.302l-.23-.348c-.187.14-.42.232-.65.232-.326.023-.627-.21-.673-.533h1.646v-.21zm-1.646-.21c.023-.3.278-.532.58-.532.3 0 .556.232.556.533h-1.136zm3.664-.346c-.207-.116-.44-.186-.695-.186-.255 0-.417.093-.417.255 0 .163.162.186.37.21l.233.022c.488.07.766.278.766.672 0 .395-.37.72-1.02.72-.348 0-.673-.094-.95-.28l.23-.37c.21.162.465.232.743.232.324 0 .51-.094.51-.28 0-.115-.117-.185-.395-.23l-.232-.024c-.487-.07-.765-.302-.765-.65 0-.44.37-.718.927-.718.325 0 .627.07.905.232l-.21.394zm2.32-.116h-.788v.997c0 .23.07.37.325.37.14 0 .3-.046.417-.115l.14.417c-.186.116-.395.162-.604.162-.58 0-.765-.302-.765-.812v-1.02h-.44v-.44h.44v-.673h.487v.672h.79v.44zm1.67-.51c.117 0 .233.023.35.07l-.14.463c-.093-.045-.21-.045-.302-.045-.325 0-.464.208-.464.58v1.25h-.487v-2.2h.487v.277c.116-.255.325-.37.557-.394z\" style=\"fill: #000\" />\n      <path style=\"fill: #7673C0\" d=\"M23.64 3.287h-7.305V16.41h7.306\" />\n      <path d=\"M16.8 9.848c0-2.55 1.183-4.985 3.2-6.56C16.384.435 11.12 1.06 8.29 4.7 5.435 8.32 6.06 13.58 9.703 16.41c3.038 2.387 7.283 2.387 10.32 0-2.04-1.578-3.223-3.99-3.223-6.562z\" style=\"fill: #EB001B\" />\n      <path d=\"M33.5 9.848c0 4.613-3.735 8.346-8.35 8.346-1.88 0-3.69-.626-5.15-1.785 3.618-2.83 4.245-8.092 1.415-11.71-.418-.532-.882-.996-1.415-1.413C23.618.437 28.883 1.06 31.736 4.7 32.873 6.163 33.5 7.994 33.5 9.85z\" style=\"fill: #00A1DF\" />\n    </symbol>\n\n    <symbol id=\"logoPayPal\" viewBox=\"0 0 48 29\">\n      <title>PayPal Logo</title>\n      <path d=\"M46 29H2c-1.1 0-2-.87-2-1.932V1.934C0 .87.9 0 2 0h44c1.1 0 2 .87 2 1.934v25.134C48 28.13 47.1 29 46 29z\" fill-opacity=\"0\" style=\"fill: #FFF\" />\n      <path d=\"M31.216 16.4c.394-.7.69-1.5.886-2.4.196-.8.196-1.6.1-2.2-.1-.7-.396-1.2-.79-1.7-.195-.3-.59-.5-.885-.7.1-.8.1-1.5 0-2.1-.1-.6-.394-1.1-.886-1.6-.885-1-2.56-1.6-4.922-1.6h-6.4c-.492 0-.787.3-.886.8l-2.658 17.2c0 .2 0 .3.1.4.097.1.294.2.393.2h4.036l-.295 1.8c0 .1 0 .3.1.4.098.1.195.2.393.2h3.35c.393 0 .688-.3.786-.7v-.2l.59-4.1v-.2c.1-.4.395-.7.788-.7h.59c1.675 0 3.152-.4 4.137-1.1.59-.5 1.083-1 1.478-1.7h-.002z\" style=\"fill: #263B80\" />\n      <path d=\"M21.364 9.4c0-.3.196-.5.492-.6.098-.1.196-.1.394-.1h5.02c.592 0 1.183 0 1.675.1.1 0 .295.1.394.1.098 0 .294.1.393.1.1 0 .1 0 .197.102.295.1.492.2.69.3.295-1.6 0-2.7-.887-3.8-.985-1.1-2.658-1.6-4.923-1.6h-6.4c-.49 0-.885.3-.885.8l-2.758 17.3c-.098.3.197.6.59.6h3.94l.985-6.4 1.083-6.9z\" style=\"fill: #263B80\" />\n      <path d=\"M30.523 9.4c0 .1 0 .3-.098.4-.887 4.4-3.742 5.9-7.484 5.9h-1.87c-.492 0-.787.3-.886.8l-.985 6.2-.296 1.8c0 .3.196.6.492.6h3.348c.394 0 .69-.3.787-.7v-.2l.592-4.1v-.2c.1-.4.394-.7.787-.7h.69c3.248 0 5.808-1.3 6.497-5.2.296-1.6.197-3-.69-3.9-.196-.3-.49-.5-.885-.7z\" style=\"fill: #159BD7\" />\n      <path d=\"M29.635 9c-.098 0-.295-.1-.394-.1-.098 0-.294-.1-.393-.1-.492-.102-1.083-.102-1.673-.102h-5.022c-.1 0-.197 0-.394.1-.198.1-.394.3-.492.6l-1.083 6.9v.2c.1-.5.492-.8.886-.8h1.87c3.742 0 6.598-1.5 7.484-5.9 0-.1 0-.3.098-.4-.196-.1-.492-.2-.69-.3 0-.1-.098-.1-.196-.1z\" style=\"fill: #232C65\" />\n    </symbol>\n\n    <symbol id=\"logoPayPalCredit\" viewBox=\"0 0 48 29\">\n      <title>PayPal Credit Logo</title>\n      <path d=\"M46 29H2c-1.1 0-2-.87-2-1.932V1.934C0 .87.9 0 2 0h44c1.1 0 2 .87 2 1.934v25.134C48 28.13 47.1 29 46 29z\" fill-opacity=\"0\" style=\"fill: #FFF\" fill-rule=\"nonzero\" />\n      <path d=\"M27.44 21.6h.518c1.377 0 2.67-.754 2.953-2.484.248-1.588-.658-2.482-2.14-2.482h-.38c-.093 0-.172.067-.187.16l-.763 4.805zm-1.254-6.646c.024-.158.16-.273.32-.273h2.993c2.47 0 4.2 1.942 3.81 4.436-.4 2.495-2.752 4.436-5.21 4.436h-3.05c-.116 0-.205-.104-.187-.218l1.323-8.38zM22.308 16.907l-.192 1.21h2.38c.116 0 .204.103.186.217l-.23 1.462c-.023.157-.16.273-.318.273h-2.048c-.16 0-.294.114-.32.27l-.203 1.26h2.52c.117 0 .205.102.187.217l-.228 1.46c-.025.16-.16.275-.32.275h-4.55c-.116 0-.204-.104-.186-.218l1.322-8.38c.025-.158.16-.273.32-.273h4.55c.116 0 .205.104.187.22l-.23 1.46c-.024.158-.16.274-.32.274H22.63c-.16 0-.295.115-.32.273M35.325 23.552h-1.81c-.115 0-.203-.104-.185-.218l1.322-8.38c.025-.158.16-.273.32-.273h1.81c.115 0 .203.104.185.22l-1.322 8.38c-.025.156-.16.272-.32.272M14.397 18.657h.224c.754 0 1.62-.14 1.777-1.106.158-.963-.345-1.102-1.15-1.104h-.326c-.097 0-.18.07-.197.168l-.326 2.043zm3.96 4.895h-2.37c-.102 0-.194-.058-.238-.15l-1.565-3.262h-.023l-.506 3.19c-.02.128-.13.222-.26.222h-1.86c-.116 0-.205-.104-.187-.218l1.33-8.432c.02-.128.13-.22.26-.22h3.222c1.753 0 2.953.834 2.66 2.728-.2 1.224-1.048 2.283-2.342 2.506l2.037 3.35c.076.125-.014.286-.16.286zM40.216 23.552h-1.808c-.116 0-.205-.104-.187-.218l1.06-6.7h-1.684c-.116 0-.205-.104-.187-.218l.228-1.462c.025-.157.16-.273.32-.273h5.62c.116 0 .205.104.186.22l-.228 1.46c-.025.158-.16.274-.32.274h-1.63l-1.05 6.645c-.025.156-.16.272-.32.272M11.467 17.202c-.027.164-.228.223-.345.104-.395-.405-.975-.62-1.6-.62-1.41 0-2.526 1.083-2.75 2.458-.21 1.4.588 2.41 2.022 2.41.592 0 1.22-.225 1.74-.6.144-.105.34.02.313.194l-.328 2.03c-.02.12-.108.22-.226.254-.702.207-1.24.355-1.9.355-3.823 0-4.435-3.266-4.238-4.655.553-3.894 3.712-4.786 5.65-4.678.623.034 1.182.117 1.73.323.177.067.282.25.252.436l-.32 1.99\" style=\"fill: #21306F\" />\n      <path d=\"M23.184 7.67c-.11.717-.657.717-1.186.717h-.302l.212-1.34c.013-.08.082-.14.164-.14h.138c.36 0 .702 0 .877.206.105.123.137.305.097.557zm-.23-1.87h-1.998c-.137 0-.253.098-.274.233l-.808 5.123c-.016.1.062.192.165.192h1.024c.095 0 .177-.07.192-.164l.23-1.452c.02-.135.136-.235.273-.235h.63c1.317 0 2.076-.636 2.275-1.898.09-.553.003-.987-.255-1.29-.284-.334-.788-.51-1.456-.51z\" style=\"fill: #0093C7\" />\n      <path d=\"M8.936 7.67c-.11.717-.656.717-1.186.717h-.302l.212-1.34c.013-.08.082-.14.164-.14h.138c.36 0 .702 0 .877.206.104.123.136.305.096.557zm-.23-1.87H6.708c-.136 0-.253.098-.274.233l-.808 5.123c-.016.1.062.192.165.192h.955c.136 0 .252-.1.274-.234l.217-1.382c.02-.135.137-.235.274-.235h.633c1.316 0 2.075-.636 2.274-1.898.09-.553.003-.987-.255-1.29-.284-.334-.788-.51-1.456-.51zM13.343 9.51c-.092.545-.526.912-1.08.912-.277 0-.5-.09-.642-.258-.14-.168-.193-.406-.148-.672.086-.542.527-.92 1.072-.92.27 0 .492.09.637.26.148.172.205.412.163.677zm1.334-1.863h-.957c-.082 0-.152.06-.164.14l-.042.268-.067-.097c-.208-.3-.67-.4-1.13-.4-1.057 0-1.96.8-2.135 1.923-.092.56.038 1.097.356 1.47.29.344.708.487 1.204.487.852 0 1.325-.548 1.325-.548l-.043.265c-.016.1.062.193.164.193h.862c.136 0 .253-.1.274-.234l.517-3.275c.017-.102-.06-.193-.163-.193z\" style=\"fill: #21306F\" />\n      <path d=\"M27.59 9.51c-.09.545-.525.912-1.078.912-.278 0-.5-.09-.643-.258-.142-.168-.195-.406-.15-.672.086-.542.526-.92 1.07-.92.273 0 .494.09.64.26.146.172.203.412.16.677zm1.334-1.863h-.956c-.082 0-.152.06-.164.14l-.043.268-.065-.097c-.208-.3-.67-.4-1.13-.4-1.057 0-1.96.8-2.136 1.923-.092.56.038 1.097.355 1.47.292.344.71.487 1.205.487.852 0 1.325-.548 1.325-.548l-.043.265c-.016.1.062.193.164.193h.862c.136 0 .253-.1.274-.234l.517-3.275c.015-.102-.063-.193-.166-.193z\" style=\"fill: #0093C7\" />\n      <path d=\"M19.77 7.647h-.96c-.092 0-.178.045-.23.122L17.254 9.72l-.562-1.877c-.035-.118-.143-.198-.266-.198h-.945c-.113 0-.194.112-.157.22l1.06 3.108-.997 1.404c-.078.11 0 .262.136.262h.96c.092 0 .177-.044.23-.12l3.196-4.614c.077-.11-.002-.26-.137-.26\" style=\"fill: #21306F\" />\n      <path d=\"M30.052 5.94l-.82 5.216c-.016.1.062.192.165.192h.824c.138 0 .254-.1.275-.234l.81-5.122c.015-.1-.064-.193-.166-.193h-.924c-.082 0-.15.06-.164.14\" style=\"fill: #0093C7\" />\n    </symbol>\n\n    <symbol id=\"iconCardFront\" viewBox=\"0 0 48 29\">\n      <title>Generic Card</title>\n      <path d=\"M46.177 29H1.823C.9 29 0 28.13 0 27.187V1.813C0 .87.9 0 1.823 0h44.354C47.1 0 48 .87 48 1.813v25.375C48 28.13 47.1 29 46.177 29z\" style=\"fill: #FFF\" />\n      <path d=\"M4.8 9.14c0-.427.57-.973 1.067-.973h7.466c.496 0 1.067.546 1.067.972v3.888c0 .425-.57.972-1.067.972H5.867c-.496 0-1.067-.547-1.067-.972v-3.89z\" style=\"fill: #828282\" />\n      <rect style=\"fill: #828282\" x=\"10.8\" y=\"22.167\" width=\"3.6\" height=\"2.333\" rx=\"1.167\" />\n      <rect style=\"fill: #828282\" x=\"4.8\" y=\"22.167\" width=\"3.6\" height=\"2.333\" rx=\"1.167\" />\n      <path d=\"M6.55 16.333h34.9c.966 0 1.75.784 1.75 1.75 0 .967-.784 1.75-1.75 1.75H6.55c-.966 0-1.75-.783-1.75-1.75 0-.966.784-1.75 1.75-1.75z\" style=\"fill: #828282\" />\n      <ellipse style=\"fill: #828282\" cx=\"40.2\" cy=\"6.417\" rx=\"3\" ry=\"2.917\" />\n    </symbol>\n\n    <symbol id=\"iconCVVBack\" viewBox=\"0 0 40 24\">\n      <title>CVV Back</title>\n      <path d=\"M38.48 24H1.52C.75 24 0 23.28 0 22.5v-21C0 .72.75 0 1.52 0h36.96C39.25 0 40 .72 40 1.5v21c0 .78-.75 1.5-1.52 1.5z\" style=\"fill: #FFF\"/>\n      <path style=\"fill: #828282\" d=\"M0 5h40v4H0z\" />\n      <path d=\"M20 13.772v5.456c0 .423.37.772.82.772h13.36c.45 0 .82-.35.82-.772v-5.456c0-.423-.37-.772-.82-.772H20.82c-.45 0-.82.35-.82.772zm-1-.142c0-.9.76-1.63 1.68-1.63h13.64c.928 0 1.68.737 1.68 1.63v5.74c0 .9-.76 1.63-1.68 1.63H20.68c-.928 0-1.68-.737-1.68-1.63v-5.74z\" style=\"fill: #000\" fill-rule=\"nonzero\" />\n      <circle style=\"fill: #828282\" cx=\"23.5\" cy=\"16.5\" r=\"1.5\" />\n      <circle style=\"fill: #828282\" cx=\"27.5\" cy=\"16.5\" r=\"1.5\" />\n      <circle style=\"fill: #828282\" cx=\"31.5\" cy=\"16.5\" r=\"1.5\" />\n    </symbol>\n\n    <symbol id=\"iconCVVFront\" viewBox=\"0 0 40 24\">\n      <title>CVV Front</title>\n      <path d=\"M38.48 24H1.52C.75 24 0 23.28 0 22.5v-21C0 .72.75 0 1.52 0h36.96C39.25 0 40 .72 40 1.5v21c0 .78-.75 1.5-1.52 1.5z\" style=\"fill: #FFF\" />\n      <path d=\"M16 5.772v5.456c0 .423.366.772.81.772h17.38c.444 0 .81-.348.81-.772V5.772C35 5.35 34.634 5 34.19 5H16.81c-.444 0-.81.348-.81.772zm-1-.142c0-.9.75-1.63 1.66-1.63h17.68c.917 0 1.66.737 1.66 1.63v5.74c0 .9-.75 1.63-1.66 1.63H16.66c-.917 0-1.66-.737-1.66-1.63V5.63z\" style=\"fill: #000\" fill-rule=\"nonzero\" />\n      <circle style=\"fill: #828282\" cx=\"19.5\" cy=\"8.5\" r=\"1.5\" />\n      <circle style=\"fill: #828282\" cx=\"27.5\" cy=\"8.5\" r=\"1.5\" />\n      <circle style=\"fill: #828282\" cx=\"23.5\" cy=\"8.5\" r=\"1.5\" />\n      <circle style=\"fill: #828282\" cx=\"31.5\" cy=\"8.5\" r=\"1.5\" />\n      <path d=\"M4 7.833C4 7.47 4.476 7 4.89 7h6.22c.414 0 .89.47.89.833v3.334c0 .364-.476.833-.89.833H4.89c-.414 0-.89-.47-.89-.833V7.833zM4 18.5c0-.828.668-1.5 1.5-1.5h29c.828 0 1.5.666 1.5 1.5 0 .828-.668 1.5-1.5 1.5h-29c-.828 0-1.5-.666-1.5-1.5z\" style=\"fill: #828282\" />\n    </symbol>\n\n    <symbol id=\"iconCheck\" viewBox=\"0 0 42 32\">\n      <title>Check</title>\n      <path class=\"path1\" d=\"M14.379 29.76L39.741 3.415 36.194.001l-21.815 22.79-10.86-11.17L0 15.064z\" />\n    </symbol>\n\n    <symbol id=\"iconLockLoader\" viewBox=\"0 0 28 32\">\n      <title>Lock Loader</title>\n      <path d=\"M6 10V8c0-4.422 3.582-8 8-8 4.41 0 8 3.582 8 8v2h-4V7.995C18 5.79 16.205 4 14 4c-2.21 0-4 1.792-4 3.995V10H6zM.997 14c-.55 0-.997.445-.997.993v16.014c0 .548.44.993.997.993h26.006c.55 0 .997-.445.997-.993V14.993c0-.548-.44-.993-.997-.993H.997z\" />\n    </symbol>\n\n    <symbol id=\"iconError\" height=\"24\" viewBox=\"0 0 24 24\" width=\"24\">\n      <path d=\"M0 0h24v24H0z\" style=\"fill: none\" />\n      <path d=\"M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z\" />\n    </symbol>\n  </defs>\n</svg>\n";

var UPDATABLE_CONFIGURATION_OPTIONS = [
  paymentOptionIDs.paypal,
  paymentOptionIDs.paypalCredit
];
var UPDATABLE_CONFIGURATION_OPTIONS_THAT_REQUIRE_UNVAULTED_PAYMENT_METHODS_TO_BE_REMOVED = [
  paymentOptionIDs.paypal,
  paymentOptionIDs.paypalCredit
];
var DEFAULT_CHECKOUTJS_LOG_LEVEL = 'warn';
var VERSION = "1.7.0";

/**
 * @typedef {object} Dropin~cardPaymentMethodPayload
 * @property {string} nonce The payment method nonce, used by your server to charge the card.
 * @property {object} details Additional account details.
 * @property {string} details.cardType Type of card, e.g. Visa, MasterCard.
 * @property {string} details.lastTwo Last two digits of card number.
 * @property {string} description A human-readable description.
 * @property {string} type The payment method type, always `CreditCard` when the method requested is a card.
 * @property {object} binData Information about the card based on the bin. Documented {@link Dropin~binData|here}.
 * @property {?string} deviceData If data collector is configured, the device data property to be used when making a transaction.
 */

/**
 * @typedef {object} Dropin~paypalPaymentMethodPayload
 * @property {string} nonce The payment method nonce, used by your server to charge the PayPal account.
 * @property {object} details Additional PayPal account details. See a full list of details in the [PayPal client reference](http://braintree.github.io/braintree-web/{@pkg bt-web-version}/PayPalCheckout.html#~tokenizePayload).
 * @property {string} type The payment method type, always `PayPalAccount` when the method requested is a PayPal account.
 * @property {?string} deviceData If data collector is configured, the device data property to be used when making a transaction.
 */

/**
 * @typedef {object} Dropin~binData Information about the card based on the bin.
 * @property {string} commercial Possible values: 'Yes', 'No', 'Unknown'.
 * @property {string} countryOfIssuance The country of issuance.
 * @property {string} debit Possible values: 'Yes', 'No', 'Unknown'.
 * @property {string} durbinRegulated Possible values: 'Yes', 'No', 'Unknown'.
 * @property {string} healthcare Possible values: 'Yes', 'No', 'Unknown'.
 * @property {string} issuingBank The issuing bank.
 * @property {string} payroll Possible values: 'Yes', 'No', 'Unknown'.
 * @property {string} prepaid Possible values: 'Yes', 'No', 'Unknown'.
 * @property {string} productId The product id.
 */

/**
 * @name Dropin#on
 * @function
 * @param {string} event The name of the event to which you are subscribing.
 * @param {function} handler A callback to handle the event.
 * @description Subscribes a handler function to a named event. `event` should be one of the following:
 *  * [`paymentMethodRequestable`](#event:paymentMethodRequestable)
 *  * [`noPaymentMethodRequestable`](#event:noPaymentMethodRequestable)
 *  * [`paymentOptionSelected`](#event:paymentOptionSelected)
 * @returns {void}
 * @example
 * <caption>Dynamically enable or disable your submit button based on whether or not the payment method is requestable</caption>
 * var submitButton = document.querySelector('#submit-button');
 *
 * braintree.dropin.create({
 *   authorization: 'CLIENT_AUTHORIZATION',
 *   container: '#dropin-container'
 * }, function (err, dropinInstance) {
 *   submitButton.addEventListener('click', function () {
 *     dropinInstance.requestPaymentMethod(function (err, payload) {
 *       // Send payload.nonce to your server.
 *     });
 *   });
 *
 *   if (dropinInstance.isPaymentMethodRequestable()) {
 *     // This will be true if you generated the client token
 *     // with a customer ID and there is a saved payment method
 *     // available to tokenize with that customer.
 *     submitButton.removeAttribute('disabled');
 *   }
 *
 *   dropinInstance.on('paymentMethodRequestable', function (event) {
 *     console.log(event.type); // The type of Payment Method, e.g 'CreditCard', 'PayPalAccount'.
 *     console.log(event.paymentMethodIsSelected); // true if a customer has selected a payment method when paymentMethodRequestable fires
 *
 *     submitButton.removeAttribute('disabled');
 *   });
 *
 *   dropinInstance.on('noPaymentMethodRequestable', function () {
 *     submitButton.setAttribute('disabled', true);
 *   });
 * });
 * @example
 * <caption>Automatically submit nonce to server as soon as it becomes available</caption>
 * var submitButton = document.querySelector('#submit-button');
 *
 * braintree.dropin.create({
 *   authorization: 'CLIENT_AUTHORIZATION',
 *   container: '#dropin-container'
 * }, function (err, dropinInstance) {
 *   function sendNonceToServer() {
 *     dropinInstance.requestPaymentMethod(function (err, payload) {
 *       if (err) {
 *         // handle errors
 *       }
 *
 *       // send payload.nonce to your server
 *     });
 *   }
 *
 *   // allows us to still request the payment method manually, such as
 *   // when filling out a credit card form
 *   submitButton.addEventListener('click', sendNonceToServer);
 *
 *   dropinInstance.on('paymentMethodRequestable', function (event) {
 *     // if the nonce is already available (via PayPal authentication
 *     // or by using a stored payment method), we can request the
 *     // nonce right away. Otherwise, we wait for the customer to
 *     // request the nonce by pressing the submit button once they
 *     // are finished entering their credit card details
 *     if (event.paymentMethodIsSelected) {
 *       sendNonceToServer();
 *     }
 *   });
 * });
 */

/**
 * This event is emitted when the payment method available in Drop-in changes. This includes when the state of Drop-in transitions from having no payment method available to having a payment method available and when the payment method available changes. This event is not fired if there is no payment method available on initialization. To check if there is a payment method requestable on initialization, use {@link Dropin#isPaymentMethodRequestable|`isPaymentMethodRequestable`}.
 * @event Dropin#paymentMethodRequestable
 * @type {Dropin~paymentMethodRequestablePayload}
 */

/**
 * @typedef {object} Dropin~paymentMethodRequestablePayload
 * @description The event payload sent from {@link Dropin#on|`on`} with the {@link Dropin#event:paymentMethodRequestable|`paymentMethodRequestable`} event.
 * @property {string} type The type of payment method that is requestable. Either `CreditCard` or `PayPalAccount`.
 * @property {boolean} paymentMethodIsSelected A property to determine if a payment method is currently selected when the payment method becomes requestable.
 *
 * This will be `true` any time a payment method is visably selected in the Drop-in UI, such as when PayPal authentication completes or a stored payment method is selected.
 *
 * This will be `false` when {@link Dropin#requestPaymentMethod|`requestPaymentMethod`} can be called, but a payment method is not currently selected. For instance, when a card form has been filled in with valid values, but has not been submitted to be converted into a payment method nonce.
 */

/**
 * This event is emitted when there is no payment method available in Drop-in. This event is not fired if there is no payment method available on initialization. To check if there is a payment method requestable on initialization, use {@link Dropin#isPaymentMethodRequestable|`isPaymentMethodRequestable`}. No payload is available in the callback for this event.
 * @event Dropin#noPaymentMethodRequestable
 */

/**
 * This event is emitted when a payment option is selected by the customer.
 * @event Dropin#paymentOptionSelected
 * @type {Dropin~paymentOptionSelectedPayload}
 */

/**
 * @typedef {object} Dropin~paymentOptionSelectedPayload
 * @description The event payload sent from {@link Dropin#on|`on`} with the {@link Dropin#event:paymentOptionSelected|`paymentOptionSelected`} event.
 * @property {string} paymentOption The payment option view selected. Either `card`, `paypal`, or `paypalCredit`.
 */

/**
 * @class
 * @param {object} options For create options, see {@link module:braintree-web-drop-in|dropin.create}.
 * @description <strong>Do not use this constructor directly. Use {@link module:braintree-web-drop-in|dropin.create} instead.</strong>
 * @classdesc This class represents a Drop-in component, that will create a pre-made UI for accepting cards and PayPal on your page. Instances of this class have methods for requesting a payment method and subscribing to events. For more information, see the [Drop-in guide](https://developers.braintreepayments.com/guides/drop-in/javascript/v3) in the Braintree Developer Docs. To be used in conjunction with the [Braintree Server SDKs](https://developers.braintreepayments.com/start/hello-server/).
 */
function Dropin(options) {
  this._client = options.client;
  this._componentID = uuid();
  this._dropinWrapper = document.createElement('div');
  this._dropinWrapper.id = 'braintree--dropin__' + this._componentID;
  this._dropinWrapper.setAttribute('data-braintree-id', 'wrapper');
  this._dropinWrapper.style.display = 'none';
  this._dropinWrapper.className = 'braintree-loading';
  this._merchantConfiguration = options.merchantConfiguration;

  EventEmitter.call(this);
}

Dropin.prototype = Object.create(EventEmitter.prototype, {
  constructor: Dropin
});

Dropin.prototype._initialize = function (callback) {
  var localizedStrings, localizedHTML, paypalScriptOptions;
  var dropinInstance = this; // eslint-disable-line consistent-this
  var container = this._merchantConfiguration.container || this._merchantConfiguration.selector;

  this._injectStylesheet();

  if (!container) {
    analytics.sendEvent(this._client, 'configuration-error');
    callback(new DropinError('options.container is required.'));
    return;
  } else if (this._merchantConfiguration.container && this._merchantConfiguration.selector) {
    analytics.sendEvent(this._client, 'configuration-error');
    callback(new DropinError('Must only have one options.selector or options.container.'));
    return;
  }

  if (typeof container === 'string') {
    container = document.querySelector(container);
  }

  if (!container || container.nodeType !== 1) {
    analytics.sendEvent(this._client, 'configuration-error');
    callback(new DropinError('options.selector or options.container must reference a valid DOM node.'));
    return;
  }

  if (container.innerHTML.trim()) {
    analytics.sendEvent(this._client, 'configuration-error');
    callback(new DropinError('options.selector or options.container must reference an empty DOM node.'));
    return;
  }

  // Backfill with `en`
  this._strings = assign({}, translations.en);
  if (this._merchantConfiguration.locale) {
    localizedStrings = translations[this._merchantConfiguration.locale] || translations[this._merchantConfiguration.locale.split('_')[0]];
    // Fill `strings` with `localizedStrings` that may exist
    this._strings = assign(this._strings, localizedStrings);
  }

  if (this._merchantConfiguration.translations) {
    this._strings = assign(this._strings, this._merchantConfiguration.translations);
  }

  localizedHTML = Object.keys(this._strings).reduce(function (result, stringKey) {
    var stringValue = this._strings[stringKey];

    return result.replace(RegExp('{{' + stringKey + '}}', 'g'), stringValue);
  }.bind(this), mainHTML);

  this._dropinWrapper.innerHTML = svgHTML + localizedHTML;
  container.appendChild(this._dropinWrapper);

  this._getVaultedPaymentMethods(function (paymentMethods) {
    var paypalRequired;

    try {
      this._model = new DropinModel({
        client: this._client,
        componentID: this._componentID,
        merchantConfiguration: this._merchantConfiguration,
        paymentMethods: paymentMethods
      });
    } catch (modelError) {
      dropinInstance.teardown().then(function () {
        callback(modelError);
      });
      return;
    }

    this._model.on('cancelInitialization', function (err) {
      analytics.sendEvent(this._client, 'load-error');
      this._dropinWrapper.innerHTML = '';
      callback(err);
    }.bind(this));

    this._model.on('asyncDependenciesReady', function () {
      if (this._model.dependencySuccessCount >= 1) {
        analytics.sendEvent(this._client, 'appeared');
        this._disableErroredPaymentMethods();
        callback(null, dropinInstance);
      } else {
        this._model.cancelInitialization(new DropinError('All payment options failed to load.'));
      }
    }.bind(this));

    this._model.on('paymentMethodRequestable', function (event) {
      this._emit('paymentMethodRequestable', event);
    }.bind(this));

    this._model.on('noPaymentMethodRequestable', function () {
      this._emit('noPaymentMethodRequestable');
    }.bind(this));

    this._model.on('paymentOptionSelected', function (event) {
      this._emit('paymentOptionSelected', event);
    }.bind(this));

    paypalRequired = this._supportsPaymentOption(paymentOptionIDs.paypal) || this._supportsPaymentOption(paymentOptionIDs.paypalCredit);

    if (paypalRequired && !document.querySelector('#' + constants.PAYPAL_CHECKOUT_SCRIPT_ID)) {
      paypalScriptOptions = {
        src: constants.CHECKOUT_JS_SOURCE,
        id: constants.PAYPAL_CHECKOUT_SCRIPT_ID,
        logLevel: this._merchantConfiguration.paypal && this._merchantConfiguration.paypal.logLevel || DEFAULT_CHECKOUTJS_LOG_LEVEL
      };

      this._loadScript(paypalScriptOptions, function () {
        this._setUpDependenciesAndViews();
      }.bind(this));
    } else {
      this._setUpDependenciesAndViews();
    }
  }.bind(this));
};

/**
 * Modify your configuration intially set in {@link module:braintree-web-drop-in|`dropin.create`}. Can be used for any `paypal` or `paypalCredit` property.
 *
 * If `updateConfiguration` is called after a user completes the PayPal authorization flow, any PayPal accounts not stored in the Vault record will be removed.
 * @public
 * @param {string} property The top-level property to update. Either `paypal` or `paypalCredit`.
 * @param {string} key The key of the property to update, such as `amount` or `currency`.
 * @param {any} value The value of the property to update. Must be the type of the property specified in {@link module:braintree-web-drop-in|`dropin.create`}.
 * @returns {void}
 * @example
 * dropinInstance.updateConfiguration('paypal', 'amount', '10.00');
 */
Dropin.prototype.updateConfiguration = function (property, key, value) {
  if (UPDATABLE_CONFIGURATION_OPTIONS.indexOf(property) === -1) {
    return;
  }

  this._mainView.getView(property).updateConfiguration(key, value);

  if (UPDATABLE_CONFIGURATION_OPTIONS_THAT_REQUIRE_UNVAULTED_PAYMENT_METHODS_TO_BE_REMOVED.indexOf(property) === -1) {
    return;
  }

  this._removeUnvaultedPaymentMethods(function (paymentMethod) {
    return paymentMethod.type === constants.paymentMethodTypes[property];
  });
  this._navigateToInitialView();
};

/**
 * Removes the currently selected payment method and returns the customer to the payment options view. Does not remove vaulted payment methods.
 * @public
 * @returns {void}
 * @example
 * dropinInstance.requestPaymentMethod(function (requestPaymentMethodError, payload) {
 *   if (requestPaymentMethodError) {
 *     // handle errors
 *     return;
 *   }
 *
 *   functionToSendNonceToServer(payload.nonce, function (transactionError, response) {
 *     if (transactionError) {
 *       // transaction sale with selected payment method failed
 *       // clear the selected payment method and add a message
 *       // to the checkout page about the failure
 *       dropinInstance.clearSelectedPaymentMethod();
 *       divForErrorMessages.textContent = 'my error message about entering a different payment method.';
 *     } else {
 *       // redirect to success page
 *     }
 *   });
 * });
 */
Dropin.prototype.clearSelectedPaymentMethod = function () {
  this._removeUnvaultedPaymentMethods();

  this._navigateToInitialView();

  this._model.removeActivePaymentMethod();
};

Dropin.prototype._setUpDataCollector = function () {
  var self = this;
  var config = assign({}, self._merchantConfiguration.dataCollector, {client: self._client});

  this._model.asyncDependencyStarting();
  global.braintree.dataCollector.create(config).then(function (instance) {
    self._dataCollectorInstance = instance;
    self._model.asyncDependencyReady();
  }).catch(function (err) {
    self._model.cancelInitialization(new DropinError({
      message: 'Data Collector failed to set up.',
      braintreeWebError: err
    }));
  });
};

Dropin.prototype._setUpDependenciesAndViews = function () {
  var braintreeWebVersion, dataCollectorScriptOptions;

  if (this._merchantConfiguration.dataCollector && !document.querySelector('#' + constants.DATA_COLLECTOR_SCRIPT_ID)) {
    braintreeWebVersion = this._client.getVersion();
    dataCollectorScriptOptions = {
      src: 'https://js.braintreegateway.com/web/' + braintreeWebVersion + '/js/data-collector.min.js',
      id: constants.DATA_COLLECTOR_SCRIPT_ID
    };

    this._loadScript(dataCollectorScriptOptions, this._setUpDataCollector.bind(this));
  }

  this._mainView = new MainView({
    client: this._client,
    element: this._dropinWrapper,
    model: this._model,
    strings: this._strings
  });
};

Dropin.prototype._removeUnvaultedPaymentMethods = function (filter) {
  filter = filter || function () { return true; };

  this._model.getPaymentMethods().forEach(function (paymentMethod) {
    if (filter(paymentMethod) && !paymentMethod.vaulted) {
      this._model.removePaymentMethod(paymentMethod);
    }
  }.bind(this));
};

Dropin.prototype._navigateToInitialView = function () {
  var hasNoSavedPaymentMethods, hasOnlyOneSupportedPaymentOption;
  var isOnMethodsView = this._mainView.primaryView.ID === paymentMethodsViewID;

  if (isOnMethodsView) {
    hasNoSavedPaymentMethods = this._model.getPaymentMethods().length === 0;

    if (hasNoSavedPaymentMethods) {
      hasOnlyOneSupportedPaymentOption = this._model.supportedPaymentOptions.length === 1;

      if (hasOnlyOneSupportedPaymentOption) {
        this._mainView.setPrimaryView(this._model.supportedPaymentOptions[0]);
      } else {
        this._mainView.setPrimaryView(paymentOptionsViewID);
      }
    }
  }
};

Dropin.prototype._supportsPaymentOption = function (paymentOption) {
  return this._model.supportedPaymentOptions.indexOf(paymentOption) !== -1;
};

Dropin.prototype._loadScript = function (options, callback) {
  var script = document.createElement('script');

  script.src = options.src;
  script.id = options.id;
  script.async = true;

  if (options.logLevel) {
    script.setAttribute('data-log-level', options.logLevel);
  }
  script.addEventListener('load', callback);
  this._dropinWrapper.appendChild(script);
};

Dropin.prototype._disableErroredPaymentMethods = function () {
  var paymentMethodOptionsElements;
  var failedDependencies = Object.keys(this._model.failedDependencies);

  if (failedDependencies.length === 0) {
    return;
  }

  paymentMethodOptionsElements = this._mainView.getOptionsElements();

  failedDependencies.forEach(function (paymentMethodId) {
    var element = paymentMethodOptionsElements[paymentMethodId];
    var div = element.div;
    var clickHandler = element.clickHandler;
    var error = this._model.failedDependencies[paymentMethodId];
    var errorMessageDiv = div.querySelector('.braintree-option__disabled-message');

    div.classList.add('braintree-disabled');
    div.removeEventListener('click', clickHandler);
    if (error.code === 'PAYPAL_SANDBOX_ACCOUNT_NOT_LINKED') {
      errorMessageDiv.innerHTML = constants.errors.PAYPAL_NON_LINKED_SANDBOX;
    } else {
      errorMessageDiv.textContent = error.message;
    }
  }.bind(this));
};

/**
 * Requests a payment method object which includes the payment method nonce used by by the [Braintree Server SDKs](https://developers.braintreepayments.com/start/hello-server/). The structure of this payment method object varies by type: a {@link Dropin~cardPaymentMethodPayload|cardPaymentMethodPayload} is returned when the payment method is a card, a {@link Dropin~paypalPaymentMethodPayload|paypalPaymentMethodPayload} is returned when the payment method is a PayPal account.
 *
 * If a payment method is not available, an error will appear in the UI. When a callback is used, an error will be passed to it. If no callback is used, the returned Promise will be rejected with an error.
 * @public
 * @param {callback} [callback] The first argument will be an error if no payment method is available and will otherwise be null. The second argument will be an object containing a payment method nonce; either a {@link Dropin~cardPaymentMethodPayload|cardPaymentMethodPayload} or a {@link Dropin~paypalPaymentMethodPayload|paypalPaymentMethodPayload}. If no callback is provided, `requestPaymentMethod` will return a promise.
 * @returns {void|Promise} Returns a promise if no callback is provided.
 * @example <caption>Requesting a payment method</caption>
 * var form = document.querySelector('#my-form');
 * var hiddenNonceInput = document.querySelector('#my-nonce-input');
 *
 * form.addEventListener('submit', function (event) {
 *  event.preventDefault();
 *
 *  dropinInstance.requestPaymentMethod(function (err, payload) {
 *    if (err) {
 *      // handle error
 *      return;
 *    }
 *    hiddenNonceInput.value = payload.nonce;
 *    form.submit();
 *  });
 * });
 * @example <caption>Requesting a payment method with data collector</caption>
 * var form = document.querySelector('#my-form');
 * var hiddenNonceInput = document.querySelector('#my-nonce-input');
 * var hiddenDeviceDataInput = document.querySelector('#my-device-data-input');
 *
 * form.addEventListener('submit', function (event) {
 *  event.preventDefault();
 *
 *  dropinInstance.requestPaymentMethod(function (err, payload) {
 *    if (err) {
 *      // handle error
 *      return;
 *    }
 *    hiddenNonceInput.value = payload.nonce;
 *    hiddenDeviceDataInput.value = payload.deviceData;
 *    form.submit();
 *  });
 * });
 */
Dropin.prototype.requestPaymentMethod = function () {
  return this._mainView.requestPaymentMethod().then(function (payload) {
    if (this._dataCollectorInstance) {
      payload.deviceData = this._dataCollectorInstance.deviceData;
    }

    return formatPaymentMethodPayload(payload);
  }.bind(this));
};

Dropin.prototype._removeStylesheet = function () {
  var stylesheet = document.getElementById(constants.STYLESHEET_ID);

  if (stylesheet) {
    stylesheet.parentNode.removeChild(stylesheet);
  }
};

Dropin.prototype._injectStylesheet = function () {
  var stylesheet, stylesheetUrl, head, assetsUrl;

  if (document.getElementById(constants.STYLESHEET_ID)) { return; }

  assetsUrl = this._client.getConfiguration().gatewayConfiguration.assetsUrl;
  stylesheetUrl = assetsUrl + '/web/dropin/' + VERSION + '/css/dropin.css';
  stylesheet = document.createElement('link');
  head = document.head;

  stylesheet.setAttribute('rel', 'stylesheet');
  stylesheet.setAttribute('type', 'text/css');
  stylesheet.setAttribute('href', stylesheetUrl);
  stylesheet.setAttribute('id', constants.STYLESHEET_ID);

  if (head.firstChild) {
    head.insertBefore(stylesheet, head.firstChild);
  } else {
    head.appendChild(stylesheet);
  }
};

Dropin.prototype._getVaultedPaymentMethods = function (callback) {
  if (isGuestCheckout(this._client)) {
    callback([]);
  } else {
    this._client.request({
      endpoint: 'payment_methods',
      method: 'get',
      data: {
        defaultFirst: 1
      }
    }, function (err, paymentMethodsPayload) {
      var paymentMethods;

      if (err) {
        paymentMethods = [];
      } else {
        paymentMethods = paymentMethodsPayload.paymentMethods.map(formatPaymentMethodPayload);
      }

      callback(paymentMethods);
    });
  }
};

/**
 * Cleanly remove anything set up by {@link module:braintree-web-drop-in|dropin.create}. This may be be useful in a single-page app.
 * @public
 * @param {callback} [callback] Called on completion, containing an error if one occurred. No data is returned if teardown completes successfully. If no callback is provided, `teardown` will return a promise.
 * @returns {void|Promise} Returns a promise if no callback is provided.
 */
Dropin.prototype.teardown = function () {
  var mainviewTeardownError, dataCollectorError;
  var promise = Promise.resolve();
  var self = this;

  this._removeStylesheet();

  if (this._mainView) {
    promise.then(function () {
      return self._mainView.teardown().catch(function (err) {
        mainviewTeardownError = err;
      });
    });
  }

  if (this._dataCollectorInstance) {
    promise.then(function () {
      return this._dataCollectorInstance.teardown().catch(function (error) {
        dataCollectorError = new DropinError({
          message: 'Drop-in errored tearing down Data Collector.',
          braintreeWebError: error
        });
      });
    }.bind(this));
  }

  return promise.then(function () {
    return self._removeDropinWrapper();
  }).then(function () {
    if (mainviewTeardownError) {
      return Promise.reject(mainviewTeardownError);
    } else if (dataCollectorError) {
      return Promise.reject(dataCollectorError);
    }

    return Promise.resolve();
  });
};

/**
 * Returns a boolean indicating if a payment method is available through {@link Dropin#requestPaymentMethod|requestPaymentMethod}. Particularly useful for detecting if using a client token with a customer ID to show vaulted payment methods.
 * @public
 * @returns {Boolean} True if a payment method is available, otherwise false.
 */
Dropin.prototype.isPaymentMethodRequestable = function () {
  return this._model.isPaymentMethodRequestable();
};

Dropin.prototype._removeDropinWrapper = function () {
  this._dropinWrapper.parentNode.removeChild(this._dropinWrapper);

  return Promise.resolve();
};

function formatPaymentMethodPayload(paymentMethod) {
  var formattedPaymentMethod = {
    nonce: paymentMethod.nonce,
    details: paymentMethod.details,
    type: paymentMethod.type,
    vaulted: true
  };

  if (paymentMethod.type === constants.paymentMethodTypes.card) {
    formattedPaymentMethod.description = paymentMethod.description;
  }

  if (paymentMethod.deviceData) {
    formattedPaymentMethod.deviceData = paymentMethod.deviceData;
  }

  if (paymentMethod.binData) {
    formattedPaymentMethod.binData = paymentMethod.binData;
  }

  return formattedPaymentMethod;
}

module.exports = wrapPrototype(Dropin);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var request = __webpack_require__(47);
var isWhitelistedDomain = __webpack_require__(50);
var BraintreeError = __webpack_require__(3);
var convertToBraintreeError = __webpack_require__(51);
var addMetadata = __webpack_require__(52);
var Promise = __webpack_require__(7);
var once = __webpack_require__(27);
var deferred = __webpack_require__(121);
var assign = __webpack_require__(49).assign;
var constants = __webpack_require__(122);
var errors = __webpack_require__(55);
var sharedErrors = __webpack_require__(17);
var VERSION = __webpack_require__(16).VERSION;

/**
 * This object is returned by {@link Client#getConfiguration|getConfiguration}. This information is used extensively by other Braintree modules to properly configure themselves.
 * @typedef {object} Client~configuration
 * @property {object} client The braintree-web/client parameters.
 * @property {string} client.authorization A tokenizationKey or clientToken.
 * @property {object} gatewayConfiguration Gateway-supplied configuration.
 * @property {object} analyticsMetadata Analytics-specific data.
 * @property {string} analyticsMetadata.sessionId Uniquely identifies a browsing session.
 * @property {string} analyticsMetadata.sdkVersion The braintree.js version.
 * @property {string} analyticsMetadata.merchantAppId Identifies the merchant's web app.
 */

/**
 * @class
 * @param {Client~configuration} configuration Options
 * @description <strong>Do not use this constructor directly. Use {@link module:braintree-web/client.create|braintree.client.create} instead.</strong>
 * @classdesc This class is required by many other Braintree components. It serves as the base API layer that communicates with our servers. It is also capable of being used to formulate direct calls to our servers, such as direct credit card tokenization. See {@link Client#request}.
 */
function Client(configuration) {
  var configurationJSON, gatewayConfiguration, braintreeApiConfiguration;

  configuration = configuration || {};

  configurationJSON = JSON.stringify(configuration);
  gatewayConfiguration = configuration.gatewayConfiguration;

  if (!gatewayConfiguration) {
    throw new BraintreeError(errors.CLIENT_MISSING_GATEWAY_CONFIGURATION);
  }

  [
    'assetsUrl',
    'clientApiUrl',
    'configUrl'
  ].forEach(function (property) {
    if (property in gatewayConfiguration && !isWhitelistedDomain(gatewayConfiguration[property])) {
      throw new BraintreeError({
        type: errors.CLIENT_GATEWAY_CONFIGURATION_INVALID_DOMAIN.type,
        code: errors.CLIENT_GATEWAY_CONFIGURATION_INVALID_DOMAIN.code,
        message: property + ' property is on an invalid domain.'
      });
    }
  });

  /**
   * Returns a copy of the configuration values.
   * @public
   * @returns {Client~configuration} configuration
   */
  this.getConfiguration = function () {
    return JSON.parse(configurationJSON);
  };

  this._request = request;
  this._configuration = this.getConfiguration();

  this._clientApiBaseUrl = gatewayConfiguration.clientApiUrl + '/v1/';

  braintreeApiConfiguration = gatewayConfiguration.braintreeApi;
  if (braintreeApiConfiguration) {
    this._braintreeApi = {
      baseUrl: braintreeApiConfiguration.url + '/',
      accessToken: braintreeApiConfiguration.accessToken
    };

    if (!isWhitelistedDomain(this._braintreeApi.baseUrl)) {
      throw new BraintreeError({
        type: errors.CLIENT_GATEWAY_CONFIGURATION_INVALID_DOMAIN.type,
        code: errors.CLIENT_GATEWAY_CONFIGURATION_INVALID_DOMAIN.code,
        message: 'braintreeApi URL is on an invalid domain.'
      });
    }
  }
}

/**
 * Used by other modules to formulate all network requests to the Braintree gateway. It is also capable of being used directly from your own form to tokenize credit card information. However, be sure to satisfy PCI compliance if you use direct card tokenization.
 * @public
 * @param {object} options Request options:
 * @param {string} options.method HTTP method, e.g. "get" or "post".
 * @param {string} options.endpoint Endpoint path, e.g. "payment_methods".
 * @param {object} options.data Data to send with the request.
 * @param {number} [options.timeout=60000] Set a timeout (in milliseconds) for the request.
 * @param {callback} [callback] The second argument, <code>data</code>, is the returned server data.
 * @example
 * <caption>Direct Credit Card Tokenization</caption>
 * var createClient = require('braintree-web/client').create;
 *
 * createClient({
 *   authorization: CLIENT_AUTHORIZATION
 * }, function (createErr, clientInstance) {
 *   var form = document.getElementById('my-form-id');
 *   var data = {
 *     creditCard: {
 *       number: form['cc-number'].value,
 *       cvv: form['cc-cvv'].value,
 *       expirationDate: form['cc-expiration-date'].value,
 *       billingAddress: {
 *         postalCode: form['cc-postal-code'].value
 *       },
 *       options: {
 *         validate: false
 *       }
 *     }
 *   };
 *
 *   // Warning: For a merchant to be eligible for the easiest level of PCI compliance (SAQ A),
 *   // payment fields cannot be hosted on your checkout page.
 *   // For an alternative to the following, use Hosted Fields.
 *   clientInstance.request({
 *     endpoint: 'payment_methods/credit_cards',
 *     method: 'post',
 *     data: data
 *   }, function (requestErr, response) {
 *     // More detailed example of handling API errors: https://codepen.io/braintree/pen/MbwjdM
 *     if (requestErr) { throw new Error(requestErr); }
 *
 *     console.log('Got nonce:', response.creditCards[0].nonce);
 *   });
 * });
 * @example
 * <caption>Tokenizing Fields for AVS Checks</caption>
 * var createClient = require('braintree-web/client').create;
 *
 * createClient({
 *   authorization: CLIENT_AUTHORIZATION
 * }, function (createErr, clientInstance) {
 *   var form = document.getElementById('my-form-id');
 *   var data = {
 *     creditCard: {
 *       number: form['cc-number'].value,
 *       cvv: form['cc-cvv'].value,
 *       expirationDate: form['cc-date'].value,
 *       // The billing address can be checked with AVS rules.
 *       // See: https://articles.braintreepayments.com/support/guides/fraud-tools/basic/avs-cvv-rules
 *       billingAddress: {
 *         postalCode: form['cc-postal-code'].value,
 *         streetAddress: form['cc-street-address'].value,
 *         countryName: form['cc-country-name'].value,
 *         countryCodeAlpha2: form['cc-country-alpha2'].value,
 *         countryCodeAlpha3: form['cc-country-alpha3'].value,
 *         countryCodeNumeric: form['cc-country-numeric'].value
 *       },
 *       options: {
 *         validate: false
 *       }
 *     }
 *   };
 *
 *   // Warning: For a merchant to be eligible for the easiest level of PCI compliance (SAQ A),
 *   // payment fields cannot be hosted on your checkout page.
 *   // For an alternative to the following, use Hosted Fields.
 *   clientInstance.request({
 *     endpoint: 'payment_methods/credit_cards',
 *     method: 'post',
 *     data: data
 *   }, function (requestErr, response) {
 *     // More detailed example of handling API errors: https://codepen.io/braintree/pen/MbwjdM
 *     if (requestErr) { throw new Error(requestErr); }
 *
 *     console.log('Got nonce:', response.creditCards[0].nonce);
 *   });
 * });
 * @returns {Promise|void} Returns a promise if no callback is provided.
 */
Client.prototype.request = function (options, callback) {
  var self = this; // eslint-disable-line no-invalid-this
  var requestPromise = new Promise(function (resolve, reject) {
    var optionName, api, baseUrl, requestOptions;

    if (!options.method) {
      optionName = 'options.method';
    } else if (!options.endpoint) {
      optionName = 'options.endpoint';
    }

    if (optionName) {
      throw new BraintreeError({
        type: errors.CLIENT_OPTION_REQUIRED.type,
        code: errors.CLIENT_OPTION_REQUIRED.code,
        message: optionName + ' is required when making a request.'
      });
    }

    if ('api' in options) {
      api = options.api;
    } else {
      api = 'clientApi';
    }

    requestOptions = {
      method: options.method,
      timeout: options.timeout
    };

    if (api === 'clientApi') {
      baseUrl = self._clientApiBaseUrl;

      requestOptions.data = addMetadata(self._configuration, options.data);
    } else if (api === 'braintreeApi') {
      if (!self._braintreeApi) {
        throw new BraintreeError(sharedErrors.BRAINTREE_API_ACCESS_RESTRICTED);
      }

      baseUrl = self._braintreeApi.baseUrl;

      requestOptions.data = options.data;

      requestOptions.headers = {
        'Braintree-Version': constants.BRAINTREE_API_VERSION_HEADER,
        Authorization: 'Bearer ' + self._braintreeApi.accessToken
      };
    } else {
      throw new BraintreeError({
        type: errors.CLIENT_OPTION_INVALID.type,
        code: errors.CLIENT_OPTION_INVALID.code,
        message: 'options.api is invalid.'
      });
    }

    requestOptions.url = baseUrl + options.endpoint;

    self._request(requestOptions, function (err, data, status) {
      var resolvedData, requestError;

      requestError = formatRequestError(status, err);

      if (requestError) {
        reject(requestError);
        return;
      }

      resolvedData = assign({_httpStatus: status}, data);

      resolve(resolvedData);
    });
  });

  if (typeof callback === 'function') {
    callback = once(deferred(callback));

    requestPromise.then(function (response) {
      callback(null, response, response._httpStatus);
    }).catch(function (err) {
      var status = err && err.details && err.details.httpStatus;

      callback(err, null, status);
    });
    return;
  }

  return requestPromise; // eslint-disable-line consistent-return
};

function formatRequestError(status, err) { // eslint-disable-line consistent-return
  var requestError;

  if (status === -1) {
    requestError = new BraintreeError(errors.CLIENT_REQUEST_TIMEOUT);
  } else if (status === 403) {
    requestError = new BraintreeError(errors.CLIENT_AUTHORIZATION_INSUFFICIENT);
  } else if (status === 429) {
    requestError = new BraintreeError(errors.CLIENT_RATE_LIMITED);
  } else if (status >= 500) {
    requestError = new BraintreeError(errors.CLIENT_GATEWAY_NETWORK);
  } else if (status < 200 || status >= 400) {
    requestError = convertToBraintreeError(err, {
      type: errors.CLIENT_REQUEST_ERROR.type,
      code: errors.CLIENT_REQUEST_ERROR.code,
      message: errors.CLIENT_REQUEST_ERROR.message
    });
  }

  if (requestError) {
    requestError.details = requestError.details || {};
    requestError.details.httpStatus = status;

    return requestError;
  }
}

Client.prototype.toJSON = function () {
  return this.getConfiguration();
};

/**
 * Returns the Client version.
 * @public
 * @returns {String} The created client's version.
 * @example
 * var createClient = require('braintree-web/client').create;
 *
 * createClient({
 *   authorization: CLIENT_AUTHORIZATION
 * }, function (createErr, clientInstance) {
 *   console.log(clientInstance.getVersion()); // Ex: 1.0.0
 * });
 * @returns {void}
 */
Client.prototype.getVersion = function () {
  return VERSION;
};

module.exports = Client;


/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var head;
var uuid = __webpack_require__(28);
var querystring = __webpack_require__(48);
var timeouts = {};

function _removeScript(script) {
  if (script && script.parentNode) {
    script.parentNode.removeChild(script);
  }
}

function _createScriptTag(url, callbackName) {
  var script = document.createElement('script');
  var done = false;

  script.src = url;
  script.async = true;
  script.onerror = function () {
    global[callbackName]({message: 'error', status: 500});
  };

  script.onload = script.onreadystatechange = function () {
    if (done) { return; }

    if (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete') {
      done = true;
      script.onload = script.onreadystatechange = null;
    }
  };

  return script;
}

function _cleanupGlobal(callbackName) {
  try {
    delete global[callbackName];
  } catch (_) {
    global[callbackName] = null;
  }
}

function _setupTimeout(timeout, callbackName) {
  timeouts[callbackName] = setTimeout(function () {
    timeouts[callbackName] = null;

    global[callbackName]({
      error: 'timeout',
      status: -1
    });

    global[callbackName] = function () {
      _cleanupGlobal(callbackName);
    };
  }, timeout);
}

function _setupGlobalCallback(script, callback, callbackName) {
  global[callbackName] = function (response) {
    var status = response.status || 500;
    var err = null;
    var data = null;

    delete response.status;

    if (status >= 400 || status < 200) {
      err = response;
    } else {
      data = response;
    }

    _cleanupGlobal(callbackName);
    _removeScript(script);

    clearTimeout(timeouts[callbackName]);
    callback(err, data, status);
  };
}

function request(options, callback) {
  var script;
  var callbackName = 'callback_json_' + uuid().replace(/-/g, '');
  var url = options.url;
  var attrs = options.data;
  var method = options.method;
  var timeout = options.timeout;

  url = querystring.queryify(url, attrs);
  url = querystring.queryify(url, {
    _method: method,
    callback: callbackName
  });

  script = _createScriptTag(url, callbackName);
  _setupGlobalCallback(script, callback, callbackName);
  _setupTimeout(timeout, callbackName);

  if (!head) {
    head = document.getElementsByTagName('head')[0];
  }

  head.appendChild(script);
}

module.exports = {
  request: request
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var querystring = __webpack_require__(48);
var browserDetection = __webpack_require__(110);
var assign = __webpack_require__(49).assign;
var prepBody = __webpack_require__(113);
var parseBody = __webpack_require__(114);
var isXHRAvailable = global.XMLHttpRequest && 'withCredentials' in new global.XMLHttpRequest();

var MAX_TCP_RETRYCOUNT = 1;
var TCP_PRECONNECT_BUG_STATUS_CODE = 408;

function getRequestObject() {
  return isXHRAvailable ? new XMLHttpRequest() : new XDomainRequest();
}

function requestShouldRetry(status) {
  return (!status || status === TCP_PRECONNECT_BUG_STATUS_CODE) && browserDetection.isIe();
}

function _requestWithRetry(options, tcpRetryCount, cb) {
  var status, resBody;
  var method = options.method;
  var url = options.url;
  var body = options.data;
  var timeout = options.timeout;
  var headers = assign({
    'Content-Type': 'application/json'
  }, options.headers);
  var req = getRequestObject();
  var callback = cb;

  if (method === 'GET') {
    url = querystring.queryify(url, body);
    body = null;
  }

  if (isXHRAvailable) {
    req.onreadystatechange = function () {
      if (req.readyState !== 4) { return; }

      status = req.status;
      resBody = parseBody(req.responseText);

      if (status >= 400 || status < 200) {
        if (tcpRetryCount < MAX_TCP_RETRYCOUNT && requestShouldRetry(status)) {
          tcpRetryCount++;
          _requestWithRetry(options, tcpRetryCount, cb);
          return;
        }
        callback(resBody || 'error', null, status || 500);
      } else {
        callback(null, resBody, status);
      }
    };
  } else {
    if (options.headers) {
      url = querystring.queryify(url, headers);
    }

    req.onload = function () {
      callback(null, parseBody(req.responseText), req.status);
    };

    req.onerror = function () {
      // XDomainRequest does not report a body or status for errors, so
      // hardcode to 'error' and 500, respectively
      callback('error', null, 500);
    };

    // This must remain for IE9 to work
    req.onprogress = function () {};

    req.ontimeout = function () {
      callback('timeout', null, -1);
    };
  }

  req.open(method, url, true);
  req.timeout = timeout;

  if (isXHRAvailable) {
    Object.keys(headers).forEach(function (headerKey) {
      req.setRequestHeader(headerKey, headers[headerKey]);
    });
  }

  try {
    req.send(prepBody(method, body));
  } catch (e) { /* ignored */ }
}

function request(options, cb) {
  _requestWithRetry(options, 0, cb);
}

module.exports = {
  request: request
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isIe = __webpack_require__(111);

module.exports = {
  isIe: isIe
};


/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var isIE11 = __webpack_require__(112);

module.exports = function isIE(ua) {
  ua = ua || global.navigator.userAgent;
  return ua.indexOf('MSIE') !== -1 || isIE11(ua);
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isIe11(ua) {
  ua = ua || navigator.userAgent;
  return ua.indexOf('Trident/7') !== -1;
};


/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (method, body) {
  if (typeof method !== 'string') {
    throw new Error('Method must be a string');
  }

  if (method.toLowerCase() !== 'get' && body != null) {
    body = typeof body === 'string' ? body : JSON.stringify(body);
  }

  return body;
};


/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (body) {
  try {
    body = JSON.parse(body);
  } catch (e) { /* ignored */ }

  return body;
};


/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

module.exports = function getUserAgent() {
  return global.navigator.userAgent;
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

module.exports = function () {
  return global.location.protocol === 'http:';
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var atobNormalized = typeof global.atob === 'function' ? global.atob : atob;

function atob(base64String) {
  var a, b, c, b1, b2, b3, b4, i;
  var base64Matcher = new RegExp('^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{4})([=]{1,2})?$');
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
  var result = '';

  if (!base64Matcher.test(base64String)) {
    throw new Error('Non base64 encoded input passed to window.atob polyfill');
  }

  i = 0;
  do {
    b1 = characters.indexOf(base64String.charAt(i++));
    b2 = characters.indexOf(base64String.charAt(i++));
    b3 = characters.indexOf(base64String.charAt(i++));
    b4 = characters.indexOf(base64String.charAt(i++));

    a = (b1 & 0x3F) << 2 | b2 >> 4 & 0x3;
    b = (b2 & 0xF) << 4 | b3 >> 2 & 0xF;
    c = (b3 & 0x3) << 6 | b4 & 0x3F;

    result += String.fromCharCode(a) + (b ? String.fromCharCode(b) : '') + (c ? String.fromCharCode(c) : '');
  } while (i < base64String.length);

  return result;
}

module.exports = {
  atob: function (base64String) {
    return atobNormalized.call(global, base64String);
  },
  _atob: atob
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (value) {
  return JSON.parse(JSON.stringify(value));
};


/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(window, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(120);
exports.setImmediate = setImmediate;
exports.clearImmediate = clearImmediate;


/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0), __webpack_require__(1)))

/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (fn) {
  return function () {
    // IE9 doesn't support passing arguments to setTimeout so we have to emulate it.
    var args = arguments;

    setTimeout(function () {
      fn.apply(null, args);
    }, 1);
  };
};


/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  BRAINTREE_API_VERSION_HEADER: '2017-04-03'
};


/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var BraintreeError = __webpack_require__(3);
var Promise = __webpack_require__(7);
var wrapPromise = __webpack_require__(4);
var request = __webpack_require__(47);
var uuid = __webpack_require__(28);
var constants = __webpack_require__(16);
var createAuthorizationData = __webpack_require__(53);
var errors = __webpack_require__(55);

function getConfiguration(options) {
  return new Promise(function (resolve, reject) {
    var configuration, authData, attrs, configUrl;
    var sessionId = uuid();
    var analyticsMetadata = {
      merchantAppId: global.location.host,
      platform: constants.PLATFORM,
      sdkVersion: constants.VERSION,
      source: constants.SOURCE,
      integration: constants.INTEGRATION,
      integrationType: constants.INTEGRATION,
      sessionId: sessionId
    };

    try {
      authData = createAuthorizationData(options.authorization);
    } catch (err) {
      reject(new BraintreeError(errors.CLIENT_INVALID_AUTHORIZATION));
      return;
    }
    attrs = authData.attrs;
    configUrl = authData.configUrl;

    attrs._meta = analyticsMetadata;
    attrs.braintreeLibraryVersion = constants.BRAINTREE_LIBRARY_VERSION;
    attrs.configVersion = '3';

    request({
      url: configUrl,
      method: 'GET',
      data: attrs
    }, function (err, response, status) {
      var errorTemplate;

      if (err) {
        if (status === 403) {
          errorTemplate = errors.CLIENT_AUTHORIZATION_INSUFFICIENT;
        } else {
          errorTemplate = errors.CLIENT_GATEWAY_NETWORK;
        }

        reject(new BraintreeError({
          type: errorTemplate.type,
          code: errorTemplate.code,
          message: errorTemplate.message,
          details: {
            originalError: err
          }
        }));
        return;
      }

      configuration = {
        authorization: options.authorization,
        authorizationType: attrs.tokenizationKey ? 'TOKENIZATION_KEY' : 'CLIENT_TOKEN',
        analyticsMetadata: analyticsMetadata,
        gatewayConfiguration: response
      };

      resolve(configuration);
    });
  });
}

module.exports = {
  getConfiguration: wrapPromise(getConfiguration)
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function deferred(fn) {
  return function () {
    // IE9 doesn't support passing arguments to setTimeout so we have to emulate it.
    var args = arguments;

    setTimeout(function () {
      fn.apply(null, args);
    }, 1);
  };
}

module.exports = deferred;


/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function once(fn) {
  var called = false;

  return function () {
    if (!called) {
      called = true;
      fn.apply(null, arguments);
    }
  };
}

module.exports = once;


/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function promiseOrCallback(promise, callback) { // eslint-disable-line consistent-return
  if (callback) {
    promise
      .then(function (data) {
        callback(null, data);
      })
      .catch(function (err) {
        callback(err);
      });
  } else {
    return promise;
  }
}

module.exports = promiseOrCallback;


/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var DropinError = __webpack_require__(5);
var EventEmitter = __webpack_require__(56);
var constants = __webpack_require__(2);
var paymentMethodTypes = constants.paymentMethodTypes;
var paymentOptionIDs = constants.paymentOptionIDs;
var isGuestCheckout = __webpack_require__(57);

function DropinModel(options) {
  this.componentID = options.componentID;
  this.merchantConfiguration = options.merchantConfiguration;

  this.isGuestCheckout = isGuestCheckout(options.client);

  this.dependenciesInitializing = 0;
  this.dependencySuccessCount = 0;
  this.failedDependencies = {};

  this.supportedPaymentOptions = getSupportedPaymentOptions(options);
  this._paymentMethods = this._getSupportedPaymentMethods(options.paymentMethods);
  this._paymentMethodIsRequestable = this._paymentMethods.length > 0;

  EventEmitter.call(this);
}

DropinModel.prototype = Object.create(EventEmitter.prototype, {
  constructor: DropinModel
});

DropinModel.prototype.isPaymentMethodRequestable = function () {
  return Boolean(this._paymentMethodIsRequestable);
};

DropinModel.prototype.addPaymentMethod = function (paymentMethod) {
  this._paymentMethods.push(paymentMethod);
  this._emit('addPaymentMethod', paymentMethod);
  this.changeActivePaymentMethod(paymentMethod);
};

DropinModel.prototype.removePaymentMethod = function (paymentMethod) {
  var paymentMethodLocation = this._paymentMethods.indexOf(paymentMethod);

  if (paymentMethodLocation === -1) {
    return;
  }

  this._paymentMethods.splice(paymentMethodLocation, 1);
  this._emit('removePaymentMethod', paymentMethod);
};

DropinModel.prototype.changeActivePaymentMethod = function (paymentMethod) {
  this._activePaymentMethod = paymentMethod;
  this._emit('changeActivePaymentMethod', paymentMethod);
};

DropinModel.prototype.changeActivePaymentView = function (paymentViewID) {
  this._activePaymentView = paymentViewID;
  this._emit('changeActivePaymentView', paymentViewID);
};

DropinModel.prototype.removeActivePaymentMethod = function () {
  this._activePaymentMethod = null;
  this._emit('removeActivePaymentMethod');
  this.setPaymentMethodRequestable({
    isRequestable: false
  });
};

DropinModel.prototype.selectPaymentOption = function (paymentViewID) {
  this._emit('paymentOptionSelected', {
    paymentOption: paymentViewID
  });
};

DropinModel.prototype._shouldEmitRequestableEvent = function (options) {
  var requestableStateHasNotChanged = this.isPaymentMethodRequestable() === options.isRequestable;
  var typeHasNotChanged = options.type === this._paymentMethodRequestableType;

  if (requestableStateHasNotChanged && (!options.isRequestable || typeHasNotChanged)) {
    return false;
  }

  return true;
};

DropinModel.prototype.setPaymentMethodRequestable = function (options) {
  var shouldEmitEvent = this._shouldEmitRequestableEvent(options);
  var paymentMethodRequestableResponse = {
    paymentMethodIsSelected: Boolean(options.selectedPaymentMethod),
    type: options.type
  };

  this._paymentMethodIsRequestable = options.isRequestable;

  if (options.isRequestable) {
    this._paymentMethodRequestableType = options.type;
  } else {
    delete this._paymentMethodRequestableType;
  }

  if (!shouldEmitEvent) {
    return;
  }

  if (options.isRequestable) {
    this._emit('paymentMethodRequestable', paymentMethodRequestableResponse);
  } else {
    this._emit('noPaymentMethodRequestable');
  }
};

DropinModel.prototype.getPaymentMethods = function () {
  // we want to return a copy of the Array
  // so we can loop through it in dropin.updateConfiguration
  // while calling model.removePaymentMethod
  // which updates the original array
  return this._paymentMethods.slice();
};

DropinModel.prototype.getActivePaymentMethod = function () {
  return this._activePaymentMethod;
};

DropinModel.prototype.getActivePaymentView = function () {
  return this._activePaymentView;
};

DropinModel.prototype.asyncDependencyStarting = function () {
  this.dependenciesInitializing++;
};

DropinModel.prototype.asyncDependencyReady = function () {
  this.dependencySuccessCount++;
  this.dependenciesInitializing--;
  this._checkAsyncDependencyFinished();
};

DropinModel.prototype.asyncDependencyFailed = function (options) {
  if (this.failedDependencies.hasOwnProperty(options.view)) {
    return;
  }
  this.failedDependencies[options.view] = options.error;
  this.dependenciesInitializing--;
  this._checkAsyncDependencyFinished();
};

DropinModel.prototype._checkAsyncDependencyFinished = function () {
  if (this.dependenciesInitializing === 0) {
    this._emit('asyncDependenciesReady');
  }
};

DropinModel.prototype.cancelInitialization = function (error) {
  this._emit('cancelInitialization', error);
};

DropinModel.prototype.reportError = function (error) {
  this._emit('errorOccurred', error);
};

DropinModel.prototype.clearError = function () {
  this._emit('errorCleared');
};

DropinModel.prototype._getSupportedPaymentMethods = function (paymentMethods) {
  var supportedPaymentMethods = this.supportedPaymentOptions.reduce(function (array, key) {
    var paymentMethodType = paymentMethodTypes[key];

    if (paymentMethodType) {
      array.push(paymentMethodType);
    }

    return array;
  }, []);

  return paymentMethods.filter(function (paymentMethod) {
    return supportedPaymentMethods.indexOf(paymentMethod.type) > -1;
  });
};

function getSupportedPaymentOptions(options) {
  var result = [];
  var paymentOptionPriority = options.merchantConfiguration.paymentOptionPriority || ['card', 'paypal', 'paypalCredit'];

  if (!(paymentOptionPriority instanceof Array)) {
    throw new DropinError('paymentOptionPriority must be an array.');
  }

  // Remove duplicates
  paymentOptionPriority = paymentOptionPriority.filter(function (item, pos) { return paymentOptionPriority.indexOf(item) === pos; });

  paymentOptionPriority.forEach(function (paymentOption) {
    if (isPaymentOptionEnabled(paymentOption, options)) {
      result.push(paymentOptionIDs[paymentOption]);
    }
  });

  if (result.length === 0) {
    throw new DropinError('No valid payment options available.');
  }

  return result;
}

function isPaymentOptionEnabled(paymentOption, options) {
  var gatewayConfiguration = options.client.getConfiguration().gatewayConfiguration;

  if (paymentOption === 'card') {
    return gatewayConfiguration.creditCards.supportedCardTypes.length > 0;
  } else if (paymentOption === 'paypal') {
    return gatewayConfiguration.paypalEnabled && Boolean(options.merchantConfiguration.paypal);
  } else if (paymentOption === 'paypalCredit') {
    return gatewayConfiguration.paypalEnabled && Boolean(options.merchantConfiguration.paypalCredit);
  }
  throw new DropinError('paymentOptionPriority: Invalid payment option specified.');
}

module.exports = DropinModel;


/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var analytics = __webpack_require__(15);
var analyticsKinds = __webpack_require__(2).analyticsKinds;
var BaseView = __webpack_require__(11);
var classlist = __webpack_require__(20);
var sheetViews = __webpack_require__(129);
var PaymentMethodsView = __webpack_require__(61);
var PaymentOptionsView = __webpack_require__(62);
var addSelectionEventHandler = __webpack_require__(34);
var Promise = __webpack_require__(12);
var supportsFlexbox = __webpack_require__(168);
var transitionHelper = __webpack_require__(58);

var CHANGE_ACTIVE_PAYMENT_METHOD_TIMEOUT = __webpack_require__(2).CHANGE_ACTIVE_PAYMENT_METHOD_TIMEOUT;

function MainView() {
  BaseView.apply(this, arguments);

  this.dependenciesInitializing = 0;

  this._initialize();
}

MainView.prototype = Object.create(BaseView.prototype);
MainView.prototype.constructor = MainView;

MainView.prototype._initialize = function () {
  var paymentOptionsView;
  var hasMultiplePaymentOptions = this.model.supportedPaymentOptions.length > 1;
  var paymentMethods = this.model.getPaymentMethods();

  this._views = {};

  this.sheetContainer = this.getElementById('sheet-container');
  this.sheetErrorText = this.getElementById('sheet-error-text');

  this.toggle = this.getElementById('toggle');
  this.lowerContainer = this.getElementById('lower-container');

  this.loadingContainer = this.getElementById('loading-container');
  this.loadingIndicator = this.getElementById('loading-indicator');
  this.dropinContainer = this.element.querySelector('.braintree-dropin');

  this.supportsFlexbox = supportsFlexbox();

  this.model.on('asyncDependenciesReady', this.hideLoadingIndicator.bind(this));

  this.model.on('errorOccurred', this.showSheetError.bind(this));
  this.model.on('errorCleared', this.hideSheetError.bind(this));

  this.paymentSheetViewIDs = Object.keys(sheetViews).reduce(function (ids, sheetViewKey) {
    var PaymentSheetView, paymentSheetView;

    if (this.model.supportedPaymentOptions.indexOf(sheetViewKey) !== -1) {
      PaymentSheetView = sheetViews[sheetViewKey];

      paymentSheetView = new PaymentSheetView({
        element: this.getElementById(PaymentSheetView.ID),
        mainView: this,
        model: this.model,
        client: this.client,
        strings: this.strings
      });
      paymentSheetView.initialize();

      this.addView(paymentSheetView);
      ids.push(paymentSheetView.ID);
    }

    return ids;
  }.bind(this), []);

  this.paymentMethodsViews = new PaymentMethodsView({
    element: this.element,
    model: this.model,
    strings: this.strings
  });
  this.addView(this.paymentMethodsViews);

  addSelectionEventHandler(this.toggle, this.toggleAdditionalOptions.bind(this));

  this.model.on('changeActivePaymentMethod', function () {
    setTimeout(function () {
      this.setPrimaryView(PaymentMethodsView.ID);
    }.bind(this), CHANGE_ACTIVE_PAYMENT_METHOD_TIMEOUT);
  }.bind(this));

  this.model.on('changeActivePaymentView', function (id) {
    var activePaymentView = this.getView(id);

    if (id === PaymentMethodsView.ID) {
      classlist.add(this.paymentMethodsViews.container, 'braintree-methods--active');
      classlist.remove(this.sheetContainer, 'braintree-sheet--active');
    } else {
      setTimeout(function () {
        classlist.add(this.sheetContainer, 'braintree-sheet--active');
      }.bind(this), 0);
      classlist.remove(this.paymentMethodsViews.container, 'braintree-methods--active');
      if (!this.getView(id).getPaymentMethod()) {
        this.model.setPaymentMethodRequestable({
          isRequestable: false
        });
      }
    }

    activePaymentView.onSelection();
  }.bind(this));

  this.model.on('removeActivePaymentMethod', function () {
    var activePaymentView = this.getView(this.model.getActivePaymentView());

    if (activePaymentView && typeof activePaymentView.removeActivePaymentMethod === 'function') {
      activePaymentView.removeActivePaymentMethod();
    }
  }.bind(this));

  if (hasMultiplePaymentOptions) {
    paymentOptionsView = new PaymentOptionsView({
      client: this.client,
      element: this.getElementById(PaymentOptionsView.ID),
      mainView: this,
      model: this.model,
      strings: this.strings
    });

    this.addView(paymentOptionsView);
  }

  if (paymentMethods.length > 0) {
    this.model.changeActivePaymentMethod(paymentMethods[0]);
  } else if (hasMultiplePaymentOptions) {
    this.setPrimaryView(paymentOptionsView.ID);
  } else {
    this.setPrimaryView(this.paymentSheetViewIDs[0]);
  }
};

MainView.prototype.addView = function (view) {
  this._views[view.ID] = view;
};

MainView.prototype.getView = function (id) {
  return this._views[id];
};

MainView.prototype.setPrimaryView = function (id, secondaryViewId) {
  var paymentMethod;

  setTimeout(function () {
    this.element.className = prefixShowClass(id);
    if (secondaryViewId) {
      classlist.add(this.element, prefixShowClass(secondaryViewId));
    }
  }.bind(this), 0);

  this.primaryView = this.getView(id);
  this.model.changeActivePaymentView(id);

  if (this.paymentSheetViewIDs.indexOf(id) !== -1) {
    if (this.model.getPaymentMethods().length > 0 || this.getView(PaymentOptionsView.ID)) {
      this.showToggle();
    } else {
      this.hideToggle();
    }
  } else if (id === PaymentMethodsView.ID) {
    this.showToggle();
    // Move options below the upper-container
    this.getElementById('lower-container').appendChild(this.getElementById('options'));
  } else if (id === PaymentOptionsView.ID) {
    this.hideToggle();
  }

  if (!this.supportsFlexbox) {
    this.element.setAttribute('data-braintree-no-flexbox', true);
  }

  paymentMethod = this.primaryView.getPaymentMethod();

  this.model.setPaymentMethodRequestable({
    isRequestable: Boolean(paymentMethod),
    type: paymentMethod && paymentMethod.type,
    selectedPaymentMethod: paymentMethod
  });

  this.model.clearError();
};

MainView.prototype.requestPaymentMethod = function () {
  var activePaymentView = this.getView(this.model.getActivePaymentView());

  return activePaymentView.requestPaymentMethod().then(function (payload) {
    analytics.sendEvent(this.client, 'request-payment-method.' + analyticsKinds[payload.type]);

    return payload;
  }.bind(this)).catch(function (err) {
    analytics.sendEvent(this.client, 'request-payment-method.error');
    return Promise.reject(err);
  }.bind(this));
};

MainView.prototype.hideLoadingIndicator = function () {
  classlist.add(this.dropinContainer, 'braintree-loaded');
  transitionHelper.onTransitionEnd(this.loadingIndicator, 'transform', function () {
    this.loadingContainer.parentNode.removeChild(this.loadingContainer);
  }.bind(this));
};

MainView.prototype.toggleAdditionalOptions = function () {
  var sheetViewID;
  var hasMultiplePaymentOptions = this.model.supportedPaymentOptions.length > 1;
  var isPaymentSheetView = this.paymentSheetViewIDs.indexOf(this.primaryView.ID) !== -1;

  this.hideToggle();

  if (!hasMultiplePaymentOptions) {
    sheetViewID = this.paymentSheetViewIDs[0];

    classlist.add(this.element, prefixShowClass(sheetViewID));
    this.model.changeActivePaymentView(sheetViewID);
  } else if (isPaymentSheetView) {
    if (this.model.getPaymentMethods().length === 0) {
      this.setPrimaryView(PaymentOptionsView.ID);
    } else {
      this.setPrimaryView(PaymentMethodsView.ID, PaymentOptionsView.ID);
      this.hideToggle();
    }
  } else {
    classlist.add(this.element, prefixShowClass(PaymentOptionsView.ID));
  }
};

MainView.prototype.showToggle = function () {
  classlist.remove(this.toggle, 'braintree-hidden');
  classlist.add(this.lowerContainer, 'braintree-hidden');
};

MainView.prototype.hideToggle = function () {
  classlist.add(this.toggle, 'braintree-hidden');
  classlist.remove(this.lowerContainer, 'braintree-hidden');
};

MainView.prototype.showSheetError = function (error) {
  var translatedErrorMessage;
  var errorMessage = this.strings.genericError;

  if (this.strings.hasOwnProperty(error)) {
    translatedErrorMessage = this.strings[error];
  } else if (error && error.code) {
    translatedErrorMessage = this.strings[snakeCaseToCamelCase(error.code) + 'Error'];
  }

  if (translatedErrorMessage) {
    errorMessage = translatedErrorMessage;
  }

  classlist.add(this.sheetContainer, 'braintree-sheet--has-error');
  this.sheetErrorText.textContent = errorMessage;
};

MainView.prototype.hideSheetError = function () {
  classlist.remove(this.sheetContainer, 'braintree-sheet--has-error');
};

MainView.prototype.getOptionsElements = function () {
  return this._views.options.elements;
};

MainView.prototype.teardown = function () {
  var error;
  var viewNames = Object.keys(this._views);
  var teardownPromises = viewNames.map(function (view) {
    return this._views[view].teardown().catch(function (err) {
      error = err;
    });
  }.bind(this));

  return Promise.all(teardownPromises).then(function () {
    if (error) {
      return Promise.reject(error);
    }

    return Promise.resolve();
  });
};

function snakeCaseToCamelCase(s) {
  return s.toLowerCase().replace(/(\_\w)/g, function (m) {
    return m[1].toUpperCase();
  });
}

function prefixShowClass(classname) {
  return 'braintree-show-' + classname;
}

module.exports = MainView;


/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var paymentOptionIDs = __webpack_require__(2).paymentOptionIDs;

var result = {};

result[paymentOptionIDs.card] = __webpack_require__(130);
result[paymentOptionIDs.paypal] = __webpack_require__(162);
result[paymentOptionIDs.paypalCredit] = __webpack_require__(166);

module.exports = result;


/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var assign = __webpack_require__(19).assign;

var BaseView = __webpack_require__(11);
var classlist = __webpack_require__(20);
var constants = __webpack_require__(2);
var DropinError = __webpack_require__(5);
var hostedFields = __webpack_require__(131);
var transitionHelper = __webpack_require__(58);
var Promise = __webpack_require__(12);

var cardIconHTML = "<div data-braintree-id=\"visa-card-icon\" class=\"braintree-sheet__card-icon\">\n    <svg width=\"40\" height=\"24\">\n        <use xlink:href=\"#icon-visa\"></use>\n    </svg>\n</div>\n<div data-braintree-id=\"master-card-card-icon\" class=\"braintree-sheet__card-icon\">\n    <svg width=\"40\" height=\"24\">\n        <use xlink:href=\"#icon-master-card\"></use>\n    </svg>\n</div>\n<div data-braintree-id=\"unionpay-card-icon\" class=\"braintree-sheet__card-icon braintree-hidden\">\n    <svg width=\"40\" height=\"24\">\n        <use xlink:href=\"#icon-unionpay\"></use>\n    </svg>\n</div>\n<div data-braintree-id=\"american-express-card-icon\" class=\"braintree-sheet__card-icon\">\n    <svg width=\"40\" height=\"24\">\n        <use xlink:href=\"#icon-american-express\"></use>\n    </svg>\n</div>\n<div data-braintree-id=\"jcb-card-icon\" class=\"braintree-sheet__card-icon\">\n    <svg width=\"40\" height=\"24\">\n        <use xlink:href=\"#icon-jcb\"></use>\n    </svg>\n</div>\n<!-- Remove braintree-hidden class when supportedCardType accurately indicates Diners Club support -->\n<div data-braintree-id=\"diners-club-card-icon\" class=\"braintree-sheet__card-icon braintree-hidden\">\n    <svg width=\"40\" height=\"24\">\n        <use xlink:href=\"#icon-diners-club\"></use>\n    </svg>\n</div>\n<div data-braintree-id=\"discover-card-icon\" class=\"braintree-sheet__card-icon\">\n    <svg width=\"40\" height=\"24\">\n        <use xlink:href=\"#icon-discover\"></use>\n    </svg>\n</div>\n<div data-braintree-id=\"maestro-card-icon\" class=\"braintree-sheet__card-icon\">\n    <svg width=\"40\" height=\"24\">\n        <use xlink:href=\"#icon-maestro\"></use>\n    </svg>\n</div>\n";

function CardView() {
  BaseView.apply(this, arguments);
}

CardView.prototype = Object.create(BaseView.prototype);
CardView.prototype.constructor = CardView;
CardView.ID = CardView.prototype.ID = constants.paymentOptionIDs.card;

CardView.prototype.initialize = function () {
  var cvvFieldGroup, postalCodeFieldGroup;
  var cardholderNameField = this.getElementById('cardholder-name-field-group');
  var cardIcons = this.getElementById('card-view-icons');
  var hfOptions = this._generateHostedFieldsOptions();

  cardIcons.innerHTML = cardIconHTML;
  this._hideUnsupportedCardIcons();

  this.hasCVV = hfOptions.fields.cvv;
  this.hasCardholderName = Boolean(this.model.merchantConfiguration.card && this.model.merchantConfiguration.card.cardholderName);
  this.cardholderNameInput = cardholderNameField.querySelector('input');
  this.cardNumberIcon = this.getElementById('card-number-icon');
  this.cardNumberIconSvg = this.getElementById('card-number-icon-svg');
  this.cvvIcon = this.getElementById('cvv-icon');
  this.cvvIconSvg = this.getElementById('cvv-icon-svg');
  this.cvvLabelDescriptor = this.getElementById('cvv-label-descriptor');
  this.fieldErrors = {};

  if (!this.hasCVV) {
    cvvFieldGroup = this.getElementById('cvv-field-group');
    cvvFieldGroup.parentNode.removeChild(cvvFieldGroup);
  }

  if (!hfOptions.fields.postalCode) {
    postalCodeFieldGroup = this.getElementById('postal-code-field-group');
    postalCodeFieldGroup.parentNode.removeChild(postalCodeFieldGroup);
  }

  if (this.hasCardholderName) {
    this._setupCardholderName(cardholderNameField);
  } else {
    cardholderNameField.parentNode.removeChild(cardholderNameField);
  }

  this.model.asyncDependencyStarting();

  return hostedFields.create(hfOptions).then(function (hostedFieldsInstance) {
    this.hostedFieldsInstance = hostedFieldsInstance;
    this.hostedFieldsInstance.on('blur', this._onBlurEvent.bind(this));
    this.hostedFieldsInstance.on('cardTypeChange', this._onCardTypeChangeEvent.bind(this));
    this.hostedFieldsInstance.on('focus', this._onFocusEvent.bind(this));
    this.hostedFieldsInstance.on('notEmpty', this._onNotEmptyEvent.bind(this));
    this.hostedFieldsInstance.on('validityChange', this._onValidityChangeEvent.bind(this));

    this.model.asyncDependencyReady();
  }.bind(this)).catch(function (err) {
    this.model.asyncDependencyFailed({
      view: this.ID,
      error: err
    });
  }.bind(this));
};

CardView.prototype._setupCardholderName = function (cardholderNameField) {
  var cardholderNameOptions = this.model.merchantConfiguration.card && this.model.merchantConfiguration.card.cardholderName;
  var cardholderNameContainer = cardholderNameField.querySelector('.braintree-form__hosted-field');

  this.cardholderNameInput.addEventListener('keyup', function () {
    var hasContent = this.cardholderNameInput.value.length > 0;

    classlist.toggle(cardholderNameContainer, 'braintree-form__field--valid', hasContent);

    if (!cardholderNameOptions.required) {
      return;
    }

    if (hasContent) {
      classlist.remove(cardholderNameField, 'braintree-form__field-group--has-error');
    }

    this._sendRequestableEvent();
  }.bind(this), false);

  if (cardholderNameOptions.required) {
    this.cardholderNameInput.addEventListener('blur', function () {
      // the active element inside the blur event is the docuemnt.body
      // by taking it out of the event loop, we can detect the new
      // active element (hosted field or other card view element)
      setTimeout(function () {
        if (isCardViewElement() && this.cardholderNameInput.value.length === 0) {
          classlist.add(cardholderNameField, 'braintree-form__field-group--has-error');
        }
      }.bind(this), 0);
    }.bind(this), false);
  }
};

CardView.prototype._sendRequestableEvent = function () {
  if (!this._isTokenizing) {
    this.model.setPaymentMethodRequestable({
      isRequestable: this._validateForm(),
      type: constants.paymentMethodTypes.card
    });
  }
};

CardView.prototype._generateHostedFieldsOptions = function () {
  var challenges = this.client.getConfiguration().gatewayConfiguration.challenges;
  var hasCVVChallenge = challenges.indexOf('cvv') !== -1;
  var hasPostalCodeChallenge = challenges.indexOf('postal_code') !== -1;
  var overrides = this.model.merchantConfiguration.card && this.model.merchantConfiguration.card.overrides;
  var options = {
    client: this.client,
    fields: {
      number: {
        selector: this._generateFieldSelector('number'),
        placeholder: '•••• •••• •••• ••••'
      },
      expirationDate: {
        selector: this._generateFieldSelector('expiration'),
        placeholder: this.strings.expirationDatePlaceholder
      },
      cvv: {
        selector: this._generateFieldSelector('cvv'),
        placeholder: '•••'
      },
      postalCode: {
        selector: this._generateFieldSelector('postal-code')
      }
    },
    styles: {
      input: {
        'font-size': '16px',
        'font-family': '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
        color: '#000'
      },
      ':focus': {
        color: 'black'
      },
      '::-webkit-input-placeholder': {
        color: '#6a6a6a'
      },
      ':-moz-placeholder': {
        color: '#6a6a6a'
      },
      '::-moz-placeholder': {
        color: '#6a6a6a'
      },
      ':-ms-input-placeholder ': {
        color: '#6a6a6a'
      },
      'input::-ms-clear': {
        color: 'transparent'
      }
    }
  };

  if (!hasCVVChallenge) {
    delete options.fields.cvv;
  }

  if (!hasPostalCodeChallenge) {
    delete options.fields.postalCode;
  }

  if (!overrides) { return options; }

  if (overrides.fields) {
    if (overrides.fields.cvv && overrides.fields.cvv.placeholder) {
      this._hasCustomCVVPlaceholder = true;
    }

    Object.keys(overrides.fields).forEach(function (field) {
      if ((field === 'cvv' || field === 'postalCode') && overrides.fields[field] === null) {
        delete options.fields[field];
        return;
      }

      if (!options.fields[field]) {
        return;
      }

      assign(options.fields[field], overrides.fields[field], {
        selector: options.fields[field].selector
      });
    });
  }

  if (overrides.styles) {
    Object.keys(overrides.styles).forEach(function (style) {
      if (overrides.styles[style] === null) {
        delete options.styles[style];
        return;
      }

      normalizeStyles(overrides.styles[style]);

      assign(options.styles[style], overrides.styles[style]);
    });
  }

  return options;
};

CardView.prototype._validateForm = function (showFieldErrors) {
  var cardType, cardTypeSupported, state;
  var isValid = true;
  var supportedCardTypes = this.client.getConfiguration().gatewayConfiguration.creditCards.supportedCardTypes;

  if (!this.hostedFieldsInstance) {
    return false;
  }

  state = this.hostedFieldsInstance.getState();

  Object.keys(state.fields).forEach(function (key) {
    var field = state.fields[key];

    if (!showFieldErrors && !isValid) {
      // return early if form is already invalid
      // and we don't need to display all field errors
      return;
    }

    if (field.isEmpty) {
      isValid = false;

      if (showFieldErrors) {
        this.showFieldError(key, this.strings['fieldEmptyFor' + capitalize(key)]);
      }
    } else if (!field.isValid) {
      isValid = false;

      if (showFieldErrors) {
        this.showFieldError(key, this.strings['fieldInvalidFor' + capitalize(key)]);
      }
    }
  }.bind(this));

  if (state.fields.number.isValid) {
    cardType = constants.configurationCardTypes[state.cards[0].type];
    cardTypeSupported = supportedCardTypes.indexOf(cardType) !== -1;

    if (!cardTypeSupported) {
      isValid = false;

      if (showFieldErrors) {
        this.showFieldError('number', this.strings.unsupportedCardTypeError);
      }
    }
  }

  if (!this._validateCardholderName()) {
    isValid = false;
  }

  return isValid;
};

CardView.prototype.getPaymentMethod = function () { // eslint-disable-line consistent-return
  var formIsValid = this._validateForm();

  if (formIsValid) {
    return {
      type: constants.paymentMethodTypes.card
    };
  }
};

CardView.prototype.tokenize = function () {
  var transitionCallback;
  var self = this;
  var state = self.hostedFieldsInstance.getState();
  var tokenizeOptions = {
    vault: !self.model.isGuestCheckout
  };

  this.model.clearError();

  if (!this._validateForm(true)) {
    self.model.reportError('hostedFieldsFieldsInvalidError');
    classlist.remove(self.element, 'braintree-sheet--loading');

    return Promise.reject(new DropinError(constants.errors.NO_PAYMENT_METHOD_ERROR));
  }

  if (this.hasCardholderName) {
    tokenizeOptions.cardholderName = this.cardholderNameInput.value;
  }

  self._isTokenizing = true;

  return self.hostedFieldsInstance.tokenize(tokenizeOptions).then(function (payload) {
    Object.keys(state.fields).forEach(function (field) {
      self.hostedFieldsInstance.clear(field);
    });

    if (!self.model.isGuestCheckout) {
      payload.vaulted = true;
    }

    return new Promise(function (resolve) {
      transitionCallback = function () {
        // Wait for braintree-sheet--tokenized class to be added in IE 9
        // before attempting to remove it
        setTimeout(function () {
          self.model.addPaymentMethod(payload);
          resolve(payload);
          classlist.remove(self.element, 'braintree-sheet--tokenized');
        }, 0);
        self._isTokenizing = false;
      };

      transitionHelper.onTransitionEnd(self.element, 'max-height', transitionCallback);

      setTimeout(function () {
        classlist.remove(self.element, 'braintree-sheet--loading');
      }, constants.CHANGE_ACTIVE_PAYMENT_METHOD_TIMEOUT);

      classlist.add(self.element, 'braintree-sheet--tokenized');
    });
  }).catch(function (err) {
    self._isTokenizing = false;
    self.model.reportError(err);
    classlist.remove(self.element, 'braintree-sheet--loading');
    return Promise.reject(new DropinError({
      message: constants.errors.NO_PAYMENT_METHOD_ERROR,
      braintreeWebError: err
    }));
  });
};

CardView.prototype.showFieldError = function (field, errorMessage) {
  var fieldError;
  var fieldGroup = this.getElementById(camelCaseToKebabCase(field) + '-field-group');

  if (!this.fieldErrors.hasOwnProperty(field)) {
    this.fieldErrors[field] = this.getElementById(camelCaseToKebabCase(field) + '-field-error');
  }

  classlist.add(fieldGroup, 'braintree-form__field-group--has-error');

  fieldError = this.fieldErrors[field];
  fieldError.textContent = errorMessage;

  this.hostedFieldsInstance.setAttribute({
    field: field,
    attribute: 'aria-invalid',
    value: true
  });
};

CardView.prototype.hideFieldError = function (field) {
  var fieldGroup = this.getElementById(camelCaseToKebabCase(field) + '-field-group');

  if (!this.fieldErrors.hasOwnProperty(field)) {
    this.fieldErrors[field] = this.getElementById(camelCaseToKebabCase(field) + '-field-error');
  }

  classlist.remove(fieldGroup, 'braintree-form__field-group--has-error');

  this.hostedFieldsInstance.removeAttribute({
    field: field,
    attribute: 'aria-invalid'
  });
};

CardView.prototype.teardown = function () {
  return this.hostedFieldsInstance.teardown();
};

CardView.prototype._generateFieldSelector = function (field) {
  return '#braintree--dropin__' + this.model.componentID + ' .braintree-form-' + field;
};

CardView.prototype._validateCardholderName = function () {
  if (!this.hasCardholderName || !this.model.merchantConfiguration.card.cardholderName.required) {
    return true;
  }

  return this.cardholderNameInput.value.length > 0;
};

CardView.prototype._onBlurEvent = function (event) {
  var field = event.fields[event.emittedBy];
  var fieldGroup = this.getElementById(camelCaseToKebabCase(event.emittedBy) + '-field-group');

  classlist.remove(fieldGroup, 'braintree-form__field-group--is-focused');

  if (isCardViewElement() && field.isEmpty) {
    this.showFieldError(event.emittedBy, this.strings['fieldEmptyFor' + capitalize(event.emittedBy)]);
  } else if (!field.isEmpty && !field.isValid) {
    this.showFieldError(event.emittedBy, this.strings['fieldInvalidFor' + capitalize(event.emittedBy)]);
  } else if (event.emittedBy === 'number' && !this._isCardTypeSupported(event.cards[0].type)) {
    this.showFieldError('number', this.strings.unsupportedCardTypeError);
  }
};

CardView.prototype._onCardTypeChangeEvent = function (event) {
  var cardType;
  var cardNumberHrefLink = '#iconCardFront';
  var cvvHrefLink = '#iconCVVBack';
  var cvvDescriptor = this.strings.cvvThreeDigitLabelSubheading;
  var cvvPlaceholder = '•••';
  var numberFieldGroup = this.getElementById('number-field-group');

  if (event.cards.length === 1) {
    cardType = event.cards[0].type;
    cardNumberHrefLink = '#icon-' + cardType;
    if (cardType === 'american-express') {
      cvvHrefLink = '#iconCVVFront';
      cvvDescriptor = this.strings.cvvFourDigitLabelSubheading;
      cvvPlaceholder = '••••';
    }
    // Keep icon visible when field is not focused
    classlist.add(numberFieldGroup, 'braintree-form__field-group--card-type-known');
  } else {
    classlist.remove(numberFieldGroup, 'braintree-form__field-group--card-type-known');
  }

  this.cardNumberIconSvg.setAttribute('xlink:href', cardNumberHrefLink);

  if (this.hasCVV) {
    this.cvvIconSvg.setAttribute('xlink:href', cvvHrefLink);
    this.cvvLabelDescriptor.textContent = cvvDescriptor;

    if (!this._hasCustomCVVPlaceholder) {
      this.hostedFieldsInstance.setAttribute({
        field: 'cvv',
        attribute: 'placeholder',
        value: cvvPlaceholder
      });
    }
  }
};

CardView.prototype._onFocusEvent = function (event) {
  var fieldGroup = this.getElementById(camelCaseToKebabCase(event.emittedBy) + '-field-group');

  classlist.add(fieldGroup, 'braintree-form__field-group--is-focused');
};

CardView.prototype._onNotEmptyEvent = function (event) {
  this.hideFieldError(event.emittedBy);
};

CardView.prototype._onValidityChangeEvent = function (event) {
  var isValid;
  var field = event.fields[event.emittedBy];

  if (event.emittedBy === 'number' && event.cards[0]) {
    isValid = field.isValid && this._isCardTypeSupported(event.cards[0].type);
  } else {
    isValid = field.isValid;
  }

  classlist.toggle(field.container, 'braintree-form__field--valid', isValid);

  if (field.isPotentiallyValid) {
    this.hideFieldError(event.emittedBy);
  }

  this._sendRequestableEvent();
};

CardView.prototype.requestPaymentMethod = function () {
  classlist.add(this.element, 'braintree-sheet--loading');
  return this.tokenize();
};

CardView.prototype.onSelection = function () {
  if (!this.hostedFieldsInstance) {
    return;
  }

  if (this.hasCardholderName) {
    setTimeout(function () { // wait until input is visible
      this.cardholderNameInput.focus();
    }.bind(this), 1);
  } else {
    this.hostedFieldsInstance.focus('number');
  }
};

CardView.prototype._hideUnsupportedCardIcons = function () {
  var supportedCardTypes = this.client.getConfiguration().gatewayConfiguration.creditCards.supportedCardTypes;

  Object.keys(constants.configurationCardTypes).forEach(function (paymentMethodCardType) {
    var cardIcon;
    var configurationCardType = constants.configurationCardTypes[paymentMethodCardType];

    if (supportedCardTypes.indexOf(configurationCardType) === -1) {
      cardIcon = this.getElementById(paymentMethodCardType + '-card-icon');
      classlist.add(cardIcon, 'braintree-hidden');
    }
  }.bind(this));
};

CardView.prototype._isCardTypeSupported = function (cardType) {
  var configurationCardType = constants.configurationCardTypes[cardType];
  var supportedCardTypes = this.client.getConfiguration().gatewayConfiguration.creditCards.supportedCardTypes;

  return supportedCardTypes.indexOf(configurationCardType) !== -1;
};

function isCardViewElement() {
  var activeId = document.activeElement && document.activeElement.id;
  var isHostedFieldsElement = document.activeElement instanceof HTMLIFrameElement && activeId.indexOf('braintree-hosted-field') !== -1;
  var isNormalFieldElement = activeId.indexOf('braintree__card-view-input') !== -1;

  return isHostedFieldsElement || isNormalFieldElement;
}

function camelCaseToKebabCase(string) {
  return string.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

function capitalize(string) {
  return string[0].toUpperCase() + string.substr(1);
}

function normalizeStyles(styles) {
  Object.keys(styles).forEach(function (style) {
    var transformedKeyName = camelCaseToKebabCase(style);

    styles[transformedKeyName] = styles[style];
  });
}

module.exports = CardView;


/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/** @module braintree-web/hosted-fields */

var HostedFields = __webpack_require__(132);
var supportsInputFormatting = __webpack_require__(155);
var wrapPromise = __webpack_require__(4);
var Promise = __webpack_require__(7);
var VERSION = "3.22.2";

/**
 * Fields used in {@link module:braintree-web/hosted-fields~fieldOptions fields options}
 * @typedef {object} field
 * @property {string} selector A CSS selector to find the container where the hosted field will be inserted.
 * @property {string} [placeholder] Will be used as the `placeholder` attribute of the input. If `placeholder` is not natively supported by the browser, it will be polyfilled.
 * @property {string} [type] Will be used as the `type` attribute of the input. To mask `cvv` input, for instance, `type: "password"` can be used.
 * @property {boolean} [formatInput=true] Enable or disable automatic formatting on this field.
 * @property {object|boolean} [maskInput=false] Enable or disable input masking when input is not focused. If set to `true` instead of an object, the defaults for the `maskInput` parameters will be used.
 * @property {string} [maskInput.character=•] The character to use when masking the input. The default character ('•') uses a unicode symbol, so the webpage must support UTF-8 characters when using the default.
 * @property {object|boolean} [select] If truthy, this field becomes a `<select>` dropdown list. This can only be used for `expirationMonth` and `expirationYear` fields. If you do not use a `placeholder` property for the field, the current month/year will be the default selected value.
 * @property {string[]} [select.options] An array of 12 strings, one per month. This can only be used for the `expirationMonth` field. For example, the array can look like `['01 - January', '02 - February', ...]`.
 * @property {number} [maxlength] This option applies only to the CVV and postal code fields. Will be used as the `maxlength` attribute of the input if it is less than the default. The primary use cases for the `maxlength` option are: limiting the length of the CVV input for CVV-only verifications when the card type is known and limiting the length of the postal code input when cards are coming from a known region.
 * @property {number} [minlength=3] This option applies only to the postal code field. Will be used as the `minlength` attribute of the input. The default value is 3, representing the Icelandic postal code length. This option's primary use case is to increase the `minlength`, e.g. for US customers, the postal code `minlength` can be set to 5.
 */

/**
 * An object that has {@link module:braintree-web/hosted-fields~field field objects} for each field. Used in {@link module:braintree-web/hosted-fields~create create}.
 * @typedef {object} fieldOptions
 * @property {field} [number] A field for card number.
 * @property {field} [expirationDate] A field for expiration date in `MM/YYYY` format. This should not be used with the `expirationMonth` and `expirationYear` properties.
 * @property {field} [expirationMonth] A field for expiration month in `MM` format. This should be used with the `expirationYear` property.
 * @property {field} [expirationYear] A field for expiration year in `YYYY` format. This should be used with the `expirationMonth` property.
 * @property {field} [cvv] A field for 3 or 4 digit CVV or CID.
 * @property {field} [postalCode] A field for postal or region code.
 */

/**
 * An object that represents CSS that will be applied in each hosted field. This object looks similar to CSS. Typically, these styles involve fonts (such as `font-family` or `color`).
 *
 * These are the CSS properties that Hosted Fields supports. Any other CSS should be specified on your page and outside of any Braintree configuration. Trying to set unsupported properties will fail and put a warning in the console.
 *
 * Supported CSS properties are:
 * `appearance`
 * `color`
 * `direction`
 * `font-family`
 * `font-size-adjust`
 * `font-size`
 * `font-stretch`
 * `font-style`
 * `font-variant-alternates`
 * `font-variant-caps`
 * `font-variant-east-asian`
 * `font-variant-ligatures`
 * `font-variant-numeric`
 * `font-variant`
 * `font-weight`
 * `font`
 * `letter-spacing`
 * `line-height`
 * `opacity`
 * `outline`
 * `text-shadow`
 * `transition`
 * `-moz-appearance`
 * `-moz-osx-font-smoothing`
 * `-moz-tap-highlight-color`
 * `-moz-transition`
 * `-webkit-appearance`
 * `-webkit-font-smoothing`
 * `-webkit-tap-highlight-color`
 * `-webkit-transition`
 * @typedef {object} styleOptions
 */

/**
 * @static
 * @function create
 * @param {object} options Creation options:
 * @param {Client} options.client A {@link Client} instance.
 * @param {fieldOptions} options.fields A {@link module:braintree-web/hosted-fields~fieldOptions set of options for each field}.
 * @param {styleOptions} options.styles {@link module:braintree-web/hosted-fields~styleOptions Styles} applied to each field.
 * @param {callback} [callback] The second argument, `data`, is the {@link HostedFields} instance. If no callback is provided, `create` returns a promise that resolves with the {@link HostedFields} instance.
 * @returns {void}
 * @example
 * braintree.hostedFields.create({
 *   client: clientInstance,
 *   styles: {
 *     'input': {
 *       'font-size': '16pt',
 *       'color': '#3A3A3A'
 *     },
 *     '.number': {
 *       'font-family': 'monospace'
 *     },
 *     '.valid': {
 *       'color': 'green'
 *     }
 *   },
 *   fields: {
 *     number: {
 *       selector: '#card-number'
 *     },
 *     cvv: {
 *       selector: '#cvv',
 *       placeholder: '•••'
 *     },
 *     expirationDate: {
 *       selector: '#expiration-date',
 *       type: 'month'
 *     }
 *   }
 * }, callback);
 * @example <caption>Right to Left Language Support</caption>
 * braintree.hostedFields.create({
 *   client: clientInstance,
 *   styles: {
 *     'input': {
 *       // other styles
 *       direction: 'rtl'
 *     },
 *   },
 *   fields: {
 *     number: {
 *       selector: '#card-number',
 *       // Credit card formatting is not currently supported
 *       // with RTL languages, so we need to turn it off for the number input
 *       formatInput: false
 *     },
 *     cvv: {
 *       selector: '#cvv',
 *       placeholder: '•••'
 *     },
 *     expirationDate: {
 *       selector: '#expiration-date',
 *       type: 'month'
 *     }
 *   }
 * }, callback);
 */
function create(options) {
  var integration;

  return new Promise(function (resolve) {
    integration = new HostedFields(options);

    integration.on('ready', function () {
      resolve(integration);
    });
  });
}

module.exports = {
  /**
   * @static
   * @function supportsInputFormatting
   * @description Returns false if input formatting will be automatically disabled due to browser incompatibility. Otherwise, returns true. For a list of unsupported browsers, [go here](https://github.com/braintree/restricted-input/blob/master/README.md#browsers-where-formatting-is-turned-off-automatically).
   * @returns {Boolean} Returns false if input formatting will be automatically disabled due to browser incompatibility. Otherwise, returns true.
   * @example
   * <caption>Conditionally choosing split expiration date inputs if formatting is unavailable</caption>
   * var canFormat = braintree.hostedFields.supportsInputFormatting();
   * var fields = {
   *   number: {
   *     selector: '#card-number'
   *   },
   *   cvv: {
   *     selector: '#cvv'
   *   }
   * };
   *
   * if (canFormat) {
   *   fields.expirationDate = {
   *     selection: '#expiration-date'
   *   };
   *   functionToCreateAndInsertExpirationDateDivToForm();
   * } else {
   *   fields.expirationMonth = {
   *     selection: '#expiration-month'
   *   };
   *   fields.expirationYear = {
   *     selection: '#expiration-year'
   *   };
   *   functionToCreateAndInsertExpirationMonthAndYearDivsToForm();
   * }
   *
   * braintree.hostedFields.create({
   *   client: clientInstance,
   *   styles: {
   *     // Styles
   *   },
   *   fields: fields
   * }, callback);
   */
  supportsInputFormatting: supportsInputFormatting,
  create: wrapPromise(create),
  /**
   * @description The current version of the SDK, i.e. `{@pkg version}`.
   * @type {string}
   */
  VERSION: VERSION
};


/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var Destructor = __webpack_require__(133);
var classlist = __webpack_require__(135);
var iFramer = __webpack_require__(136);
var Bus = __webpack_require__(140);
var BraintreeError = __webpack_require__(3);
var composeUrl = __webpack_require__(144);
var constants = __webpack_require__(29);
var errors = __webpack_require__(30);
var INTEGRATION_TIMEOUT_MS = __webpack_require__(16).INTEGRATION_TIMEOUT_MS;
var uuid = __webpack_require__(28);
var findParentTags = __webpack_require__(146);
var browserDetection = __webpack_require__(147);
var events = constants.events;
var EventEmitter = __webpack_require__(149);
var injectFrame = __webpack_require__(150);
var analytics = __webpack_require__(33);
var whitelistedFields = constants.whitelistedFields;
var VERSION = "3.22.2";
var methods = __webpack_require__(151);
var convertMethodsToError = __webpack_require__(152);
var sharedErrors = __webpack_require__(17);
var getCardTypes = __webpack_require__(153);
var attributeValidationError = __webpack_require__(154);
var Promise = __webpack_require__(7);
var wrapPromise = __webpack_require__(4);

/**
 * @typedef {object} HostedFields~tokenizePayload
 * @property {string} nonce The payment method nonce.
 * @property {object} details Additional account details.
 * @property {string} details.cardType Type of card, ex: Visa, MasterCard.
 * @property {string} details.lastTwo Last two digits of card number.
 * @property {string} description A human-readable description.
 * @property {string} type The payment method type, always `CreditCard`.
 * @property {object} binData Information about the card based on the bin.
 * @property {string} binData.commercial Possible values: 'Yes', 'No', 'Unknown'.
 * @property {string} binData.countryOfIssuance The country of issuance.
 * @property {string} binData.debit Possible values: 'Yes', 'No', 'Unknown'.
 * @property {string} binData.durbinRegulated Possible values: 'Yes', 'No', 'Unknown'.
 * @property {string} binData.healthcare Possible values: 'Yes', 'No', 'Unknown'.
 * @property {string} binData.issuingBank The issuing bank.
 * @property {string} binData.payroll Possible values: 'Yes', 'No', 'Unknown'.
 * @property {string} binData.prepaid Possible values: 'Yes', 'No', 'Unknown'.
 * @property {string} binData.productId The product id.
 */

/**
 * @typedef {object} HostedFields~stateObject
 * @description The event payload sent from {@link HostedFields#on|on} or {@link HostedFields#getState|getState}.
 * @property {HostedFields~hostedFieldsCard[]} cards
 * This will return an array of potential {@link HostedFields~hostedFieldsCard|cards}. If the card type has been determined, the array will contain only one card.
 * Internally, Hosted Fields uses <a href="https://github.com/braintree/credit-card-type">credit-card-type</a>,
 * an open-source card detection library.
 * @property {string} emittedBy
 * The name of the field associated with an event. This will not be included if returned by {@link HostedFields#getState|getState}. It will be one of the following strings:<br>
 * - `"number"`
 * - `"cvv"`
 * - `"expirationDate"`
 * - `"expirationMonth"`
 * - `"expirationYear"`
 * - `"postalCode"`
 * @property {object} fields
 * @property {?HostedFields~hostedFieldsFieldData} fields.number {@link HostedFields~hostedFieldsFieldData|hostedFieldsFieldData} for the number field, if it is present.
 * @property {?HostedFields~hostedFieldsFieldData} fields.cvv {@link HostedFields~hostedFieldsFieldData|hostedFieldsFieldData} for the CVV field, if it is present.
 * @property {?HostedFields~hostedFieldsFieldData} fields.expirationDate {@link HostedFields~hostedFieldsFieldData|hostedFieldsFieldData} for the expiration date field, if it is present.
 * @property {?HostedFields~hostedFieldsFieldData} fields.expirationMonth {@link HostedFields~hostedFieldsFieldData|hostedFieldsFieldData} for the expiration month field, if it is present.
 * @property {?HostedFields~hostedFieldsFieldData} fields.expirationYear {@link HostedFields~hostedFieldsFieldData|hostedFieldsFieldData} for the expiration year field, if it is present.
 * @property {?HostedFields~hostedFieldsFieldData} fields.postalCode {@link HostedFields~hostedFieldsFieldData|hostedFieldsFieldData} for the postal code field, if it is present.
 */

/**
 * @typedef {object} HostedFields~hostedFieldsFieldData
 * @description Data about Hosted Fields fields, sent in {@link HostedFields~stateObject|stateObjects}.
 * @property {HTMLElement} container Reference to the container DOM element on your page associated with the current event.
 * @property {boolean} isFocused Whether or not the input is currently focused.
 * @property {boolean} isEmpty Whether or not the user has entered a value in the input.
 * @property {boolean} isPotentiallyValid
 * A determination based on the future validity of the input value.
 * This is helpful when a user is entering a card number and types <code>"41"</code>.
 * While that value is not valid for submission, it is still possible for
 * it to become a fully qualified entry. However, if the user enters <code>"4x"</code>
 * it is clear that the card number can never become valid and isPotentiallyValid will
 * return false.
 * @property {boolean} isValid Whether or not the value of the associated input is <i>fully</i> qualified for submission.
 */

/**
 * @typedef {object} HostedFields~hostedFieldsCard
 * @description Information about the card type, sent in {@link HostedFields~stateObject|stateObjects}.
 * @property {string} type The code-friendly representation of the card type. It will be one of the following strings:
 * - `american-express`
 * - `diners-club`
 * - `discover`
 * - `jcb`
 * - `maestro`
 * - `master-card`
 * - `unionpay`
 * - `visa`
 * @property {string} niceType The pretty-printed card type. It will be one of the following strings:
 * - `American Express`
 * - `Diners Club`
 * - `Discover`
 * - `JCB`
 * - `Maestro`
 * - `MasterCard`
 * - `UnionPay`
 * - `Visa`
 * @property {object} code
 * This object contains data relevant to the security code requirements of the card brand.
 * For example, on a Visa card there will be a <code>CVV</code> of 3 digits, whereas an
 * American Express card requires a 4-digit <code>CID</code>.
 * @property {string} code.name <code>"CVV"</code> <code>"CID"</code> <code>"CVC"</code>
 * @property {number} code.size The expected length of the security code. Typically, this is 3 or 4.
 */

/**
 * @name HostedFields#on
 * @function
 * @param {string} event The name of the event to which you are subscribing.
 * @param {function} handler A callback to handle the event.
 * @description Subscribes a handler function to a named event. `event` should be {@link HostedFields#event:blur|blur}, {@link HostedFields#event:focus|focus}, {@link HostedFields#event:empty|empty}, {@link HostedFields#event:notEmpty|notEmpty}, {@link HostedFields#event:cardTypeChange|cardTypeChange}, or {@link HostedFields#event:validityChange|validityChange}. Events will emit a {@link HostedFields~stateObject|stateObject}.
 * @example
 * <caption>Listening to a Hosted Field event, in this case 'focus'</caption>
 * hostedFields.create({ ... }, function (createErr, hostedFieldsInstance) {
 *   hostedFieldsInstance.on('focus', function (event) {
 *     console.log(event.emittedBy, 'has been focused');
 *   });
 * });
 * @returns {void}
 */

/**
 * This event is emitted when the user requests submission of an input field, such as by pressing the Enter or Return key on their keyboard, or mobile equivalent.
 * @event HostedFields#inputSubmitRequest
 * @type {HostedFields~stateObject}
 * @example
 * <caption>Clicking a submit button upon hitting Enter (or equivalent) within a Hosted Field</caption>
 * var hostedFields = require('braintree-web/hosted-fields');
 * var submitButton = document.querySelector('input[type="submit"]');
 *
 * hostedFields.create({ ... }, function (createErr, hostedFieldsInstance) {
 *   hostedFieldsInstance.on('inputSubmitRequest', function () {
 *     // User requested submission, e.g. by pressing Enter or equivalent
 *     submitButton.click();
 *   });
 * });
 */

/**
 * This event is emitted when a field transitions from having data to being empty.
 * @event HostedFields#empty
 * @type {HostedFields~stateObject}
 * @example
 * <caption>Listening to an empty event</caption>
 * hostedFields.create({ ... }, function (createErr, hostedFieldsInstance) {
 *   hostedFieldsInstance.on('empty', function (event) {
 *     console.log(event.emittedBy, 'is now empty');
 *   });
 * });
 */

/**
 * This event is emitted when a field transitions from being empty to having data.
 * @event HostedFields#notEmpty
 * @type {HostedFields~stateObject}
 * @example
 * <caption>Listening to an notEmpty event</caption>
 * hostedFields.create({ ... }, function (createErr, hostedFieldsInstance) {
 *   hostedFieldsInstance.on('notEmpty', function (event) {
 *     console.log(event.emittedBy, 'is now not empty');
 *   });
 * });
 */

/**
 * This event is emitted when a field loses focus.
 * @event HostedFields#blur
 * @type {HostedFields~stateObject}
 * @example
 * <caption>Listening to a blur event</caption>
 * hostedFields.create({ ... }, function (createErr, hostedFieldsInstance) {
 *   hostedFieldsInstance.on('blur', function (event) {
 *     console.log(event.emittedBy, 'lost focus');
 *   });
 * });
 */

/**
 * This event is emitted when a field gains focus.
 * @event HostedFields#focus
 * @type {HostedFields~stateObject}
 * @example
 * <caption>Listening to a focus event</caption>
 * hostedFields.create({ ... }, function (createErr, hostedFieldsInstance) {
 *   hostedFieldsInstance.on('focus', function (event) {
 *     console.log(event.emittedBy, 'gained focus');
 *   });
 * });
 */

/**
 * This event is emitted when activity within the number field has changed such that the possible card type has changed.
 * @event HostedFields#cardTypeChange
 * @type {HostedFields~stateObject}
 * @example
 * <caption>Listening to a cardTypeChange event</caption>
 * hostedFields.create({ ... }, function (createErr, hostedFieldsInstance) {
 *   hostedFieldsInstance.on('cardTypeChange', function (event) {
 *     if (event.cards.length === 1) {
 *       console.log(event.cards[0].type);
 *     } else {
 *       console.log('Type of card not yet known');
 *     }
 *   });
 * });
 */

/**
 * This event is emitted when the validity of a field has changed. Validity is represented in the {@link HostedFields~stateObject|stateObject} as two booleans: `isValid` and `isPotentiallyValid`.
 * @event HostedFields#validityChange
 * @type {HostedFields~stateObject}
 * @example
 * <caption>Listening to a validityChange event</caption>
 * hostedFields.create({ ... }, function (createErr, hostedFieldsInstance) {
 *   hostedFieldsInstance.on('validityChange', function (event) {
 *     var field = event.fields[event.emittedBy];
 *
 *     if (field.isValid) {
 *       console.log(event.emittedBy, 'is fully valid');
 *     } else if (field.isPotentiallyValid) {
 *       console.log(event.emittedBy, 'is potentially valid');
 *     } else {
 *       console.log(event.emittedBy, 'is not valid');
 *     }
 *   });
 * });
 */

function createInputEventHandler(fields) {
  return function (eventData) {
    var field;
    var merchantPayload = eventData.merchantPayload;
    var emittedBy = merchantPayload.emittedBy;
    var container = fields[emittedBy].containerElement;

    Object.keys(merchantPayload.fields).forEach(function (key) {
      merchantPayload.fields[key].container = fields[key].containerElement;
    });

    field = merchantPayload.fields[emittedBy];

    if (eventData.type === 'blur') {
      performBlurFixForIos(container);
    }

    classlist.toggle(container, constants.externalClasses.FOCUSED, field.isFocused);
    classlist.toggle(container, constants.externalClasses.VALID, field.isValid);
    classlist.toggle(container, constants.externalClasses.INVALID, !field.isPotentiallyValid);

    this._state = { // eslint-disable-line no-invalid-this
      cards: merchantPayload.cards,
      fields: merchantPayload.fields
    };

    this._emit(eventData.type, merchantPayload); // eslint-disable-line no-invalid-this
  };
}

// iOS Safari has a bug where inputs in iframes
// will not dismiss the keyboard when they lose
// focus. We create a hidden button input that we
// can focus on and blur to force the keyboard to
// dismiss. See #229
function performBlurFixForIos(container) {
  var hiddenInput;

  if (!browserDetection.isIos()) {
    return;
  }

  if (document.activeElement === document.body) {
    hiddenInput = container.querySelector('input');

    if (!hiddenInput) {
      hiddenInput = document.createElement('input');

      hiddenInput.type = 'button';
      hiddenInput.style.height = '0px';
      hiddenInput.style.width = '0px';
      hiddenInput.style.opacity = '0';
      hiddenInput.style.padding = '0';
      hiddenInput.style.position = 'absolute';
      hiddenInput.style.left = '-200%';
      hiddenInput.style.top = '0px';

      container.insertBefore(hiddenInput, container.firstChild);
    }

    hiddenInput.focus();
    hiddenInput.blur();
  }
}

/**
 * @class HostedFields
 * @param {object} options The Hosted Fields {@link module:braintree-web/hosted-fields.create create} options.
 * @description <strong>Do not use this constructor directly. Use {@link module:braintree-web/hosted-fields.create|braintree-web.hosted-fields.create} instead.</strong>
 * @classdesc This class represents a Hosted Fields component produced by {@link module:braintree-web/hosted-fields.create|braintree-web/hosted-fields.create}. Instances of this class have methods for interacting with the input fields within Hosted Fields' iframes.
 */
function HostedFields(options) {
  var failureTimeout, clientVersion, clientConfig;
  var self = this;
  var fields = {};
  var fieldCount = 0;
  var componentId = uuid();

  if (!options.client) {
    throw new BraintreeError({
      type: sharedErrors.INSTANTIATION_OPTION_REQUIRED.type,
      code: sharedErrors.INSTANTIATION_OPTION_REQUIRED.code,
      message: 'options.client is required when instantiating Hosted Fields.'
    });
  }

  clientConfig = options.client.getConfiguration();
  clientVersion = options.client.getVersion();
  if (clientVersion !== VERSION) {
    throw new BraintreeError({
      type: sharedErrors.INCOMPATIBLE_VERSIONS.type,
      code: sharedErrors.INCOMPATIBLE_VERSIONS.code,
      message: 'Client (version ' + clientVersion + ') and Hosted Fields (version ' + VERSION + ') components must be from the same SDK version.'
    });
  }

  if (!options.fields) {
    throw new BraintreeError({
      type: sharedErrors.INSTANTIATION_OPTION_REQUIRED.type,
      code: sharedErrors.INSTANTIATION_OPTION_REQUIRED.code,
      message: 'options.fields is required when instantiating Hosted Fields.'
    });
  }

  EventEmitter.call(this);

  this._injectedNodes = [];
  this._destructor = new Destructor();
  this._fields = fields;
  this._state = {
    fields: {},
    cards: getCardTypes('')
  };

  this._bus = new Bus({
    channel: componentId,
    merchantUrl: location.href
  });

  this._destructor.registerFunctionForTeardown(function () {
    self._bus.teardown();
  });

  this._client = options.client;

  analytics.sendEvent(this._client, 'custom.hosted-fields.initialized');

  Object.keys(options.fields).forEach(function (key) {
    var field, container, frame;

    if (!constants.whitelistedFields.hasOwnProperty(key)) {
      throw new BraintreeError({
        type: errors.HOSTED_FIELDS_INVALID_FIELD_KEY.type,
        code: errors.HOSTED_FIELDS_INVALID_FIELD_KEY.code,
        message: '"' + key + '" is not a valid field.'
      });
    }

    field = options.fields[key];

    container = document.querySelector(field.selector);

    if (!container) {
      throw new BraintreeError({
        type: errors.HOSTED_FIELDS_INVALID_FIELD_SELECTOR.type,
        code: errors.HOSTED_FIELDS_INVALID_FIELD_SELECTOR.code,
        message: errors.HOSTED_FIELDS_INVALID_FIELD_SELECTOR.message,
        details: {
          fieldSelector: field.selector,
          fieldKey: key
        }
      });
    } else if (container.querySelector('iframe[name^="braintree-"]')) {
      throw new BraintreeError({
        type: errors.HOSTED_FIELDS_FIELD_DUPLICATE_IFRAME.type,
        code: errors.HOSTED_FIELDS_FIELD_DUPLICATE_IFRAME.code,
        message: errors.HOSTED_FIELDS_FIELD_DUPLICATE_IFRAME.message,
        details: {
          fieldSelector: field.selector,
          fieldKey: key
        }
      });
    }

    if (field.maxlength && typeof field.maxlength !== 'number') {
      throw new BraintreeError({
        type: errors.HOSTED_FIELDS_FIELD_PROPERTY_INVALID.type,
        code: errors.HOSTED_FIELDS_FIELD_PROPERTY_INVALID.code,
        message: 'The value for maxlength must be a number.',
        details: {
          fieldKey: key
        }
      });
    }

    if (field.minlength && typeof field.minlength !== 'number') {
      throw new BraintreeError({
        type: errors.HOSTED_FIELDS_FIELD_PROPERTY_INVALID.type,
        code: errors.HOSTED_FIELDS_FIELD_PROPERTY_INVALID.code,
        message: 'The value for minlength must be a number.',
        details: {
          fieldKey: key
        }
      });
    }

    frame = iFramer({
      type: key,
      name: 'braintree-hosted-field-' + key,
      style: constants.defaultIFrameStyle
    });

    this._injectedNodes = this._injectedNodes.concat(injectFrame(frame, container));
    this._setupLabelFocus(key, container);
    fields[key] = {
      frameElement: frame,
      containerElement: container
    };
    fieldCount++;

    this._state.fields[key] = {
      isEmpty: true,
      isValid: false,
      isPotentiallyValid: true,
      isFocused: false,
      container: container
    };

    setTimeout(function () {
      // Edge has an intermittent issue where
      // the iframes load, but the JavaScript
      // can't message out to the parent page.
      // We can fix this by setting the src
      // to about:blank first followed by
      // the actual source. Both instances
      // of setting the src need to be in a
      // setTimeout to work.
      // In Safari, including this behavior
      // results in a new history event for
      // each iframe. So we only do this
      // hack in browsers that are not
      // safari based.
      if (global.navigator && global.navigator.vendor && global.navigator.vendor.indexOf('Apple') === -1) { // TODO - move to browser detection module
        frame.src = 'about:blank';
      }
      setTimeout(function () {
        frame.src = composeUrl(clientConfig.gatewayConfiguration.assetsUrl, componentId, clientConfig.isDebug);
      }, 0);
    }, 0);
  }.bind(this));

  failureTimeout = setTimeout(function () {
    analytics.sendEvent(self._client, 'custom.hosted-fields.load.timed-out');
  }, INTEGRATION_TIMEOUT_MS);

  this._bus.on(events.FRAME_READY, function (reply) {
    fieldCount--;
    if (fieldCount === 0) {
      clearTimeout(failureTimeout);
      reply(options);
      self._emit('ready');
    }
  });

  this._bus.on(
    events.INPUT_EVENT,
    createInputEventHandler(fields).bind(this)
  );

  this._destructor.registerFunctionForTeardown(function () {
    var j, node, parent;

    for (j = 0; j < self._injectedNodes.length; j++) {
      node = self._injectedNodes[j];
      parent = node.parentNode;

      parent.removeChild(node);

      classlist.remove(
        parent,
        constants.externalClasses.FOCUSED,
        constants.externalClasses.INVALID,
        constants.externalClasses.VALID
      );
    }
  });

  this._destructor.registerFunctionForTeardown(function () {
    var methodNames = methods(HostedFields.prototype).concat(methods(EventEmitter.prototype));

    convertMethodsToError(self, methodNames);
  });
}

HostedFields.prototype = Object.create(EventEmitter.prototype, {
  constructor: HostedFields
});

HostedFields.prototype._setupLabelFocus = function (type, container) {
  var labels, i;
  var shouldSkipLabelFocus = browserDetection.isIos();
  var bus = this._bus;

  if (shouldSkipLabelFocus) { return; }
  if (container.id == null) { return; }

  function triggerFocus() {
    bus.emit(events.TRIGGER_INPUT_FOCUS, type);
  }

  labels = Array.prototype.slice.call(document.querySelectorAll('label[for="' + container.id + '"]'));
  labels = labels.concat(findParentTags(container, 'label'));

  for (i = 0; i < labels.length; i++) {
    labels[i].addEventListener('click', triggerFocus, false);
  }

  this._destructor.registerFunctionForTeardown(function () {
    for (i = 0; i < labels.length; i++) {
      labels[i].removeEventListener('click', triggerFocus, false);
    }
  });
};

/**
 * Cleanly remove anything set up by {@link module:braintree-web/hosted-fields.create|create}.
 * @public
 * @param {callback} [callback] Called on completion, containing an error if one occurred. No data is returned if teardown completes successfully. If no callback is provided, `teardown` returns a promise.
 * @example
 * hostedFieldsInstance.teardown(function (teardownErr) {
 *   if (teardownErr) {
 *     console.error('Could not tear down Hosted Fields!');
 *   } else {
 *     console.info('Hosted Fields has been torn down!');
 *   }
 * });
 * @returns {Promise|void} Returns a promise if no callback is provided.
 */
HostedFields.prototype.teardown = function () {
  var self = this;

  return new Promise(function (resolve, reject) {
    self._destructor.teardown(function (err) {
      analytics.sendEvent(self._client, 'custom.hosted-fields.teardown-completed');

      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

/**
 * Tokenizes fields and returns a nonce payload.
 * @public
 * @param {object} [options] All tokenization options for the Hosted Fields component.
 * @param {boolean} [options.vault=false] When true, will vault the tokenized card. Cards will only be vaulted when using a client created with a client token that includes a customer ID.
 * @param {string} [options.cardholderName] When supplied, the cardholder name to be tokenized with the contents of the fields.
 * @param {string} [options.billingAddress.postalCode] When supplied, this postal code will be tokenized along with the contents of the fields. If a postal code is provided as part of the Hosted Fields configuration, the value of the field will be tokenized and this value will be ignored.
 * @param {string} [options.billingAddress.streetAddress] When supplied, this street address will be tokenized along with the contents of the fields.
 * @param {string} [options.billingAddress.countryCodeNumeric] When supplied, this numeric country code will be tokenized along with the contents of the fields.
 * @param {string} [options.billingAddress.countryCodeAlpha2] When supplied, this alpha 2 representation of a country will be tokenized along with the contents of the fields.
 * @param {string} [options.billingAddress.countryCodeAlpha3] When supplied, this alpha 3 representation of a country will be tokenized along with the contents of the fields.
 * @param {string} [options.billingAddress.countryName] When supplied, this country name will be tokenized along with the contents of the fields.
 *
 * @param {callback} [callback] The second argument, <code>data</code>, is a {@link HostedFields~tokenizePayload|tokenizePayload}. If no callback is provided, `tokenize` returns a function that resolves with a {@link HostedFields~tokenizePayload|tokenizePayload}.
 * @example <caption>Tokenize a card</caption>
 * hostedFieldsInstance.tokenize(function (tokenizeErr, payload) {
 *   if (tokenizeErr) {
 *     switch (tokenizeErr.code) {
 *       case 'HOSTED_FIELDS_FIELDS_EMPTY':
 *         // occurs when none of the fields are filled in
 *         console.error('All fields are empty! Please fill out the form.');
 *         break;
 *       case 'HOSTED_FIELDS_FIELDS_INVALID':
 *         // occurs when certain fields do not pass client side validation
 *         console.error('Some fields are invalid:', tokenizeErr.details.invalidFieldKeys);
 *         break;
 *       case 'HOSTED_FIELDS_TOKENIZATION_FAIL_ON_DUPLICATE':
 *         // occurs when:
 *         //   * the client token used for client authorization was generated
 *         //     with a customer ID and the fail on duplicate payment method
 *         //     option is set to true
 *         //   * the card being tokenized has previously been vaulted (with any customer)
 *         // See: https://developers.braintreepayments.com/reference/request/client-token/generate/#options.fail_on_duplicate_payment_method
 *         console.error('This payment method already exists in your vault.');
 *         break;
 *       case 'HOSTED_FIELDS_TOKENIZATION_CVV_VERIFICATION_FAILED':
 *         // occurs when:
 *         //   * the client token used for client authorization was generated
 *         //     with a customer ID and the verify card option is set to true
 *         //     and you have credit card verification turned on in the Braintree
 *         //     control panel
 *         //   * the cvv does not pass verfication (https://developers.braintreepayments.com/reference/general/testing/#avs-and-cvv/cid-responses)
 *         // See: https://developers.braintreepayments.com/reference/request/client-token/generate/#options.verify_card
 *         console.error('CVV did not pass verification');
 *         break;
 *       case 'HOSTED_FIELDS_FAILED_TOKENIZATION':
 *         // occurs for any other tokenization error on the server
 *         console.error('Tokenization failed server side. Is the card valid?');
 *         break;
 *       case 'HOSTED_FIELDS_TOKENIZATION_NETWORK_ERROR':
 *         // occurs when the Braintree gateway cannot be contacted
 *         console.error('Network error occurred when tokenizing.');
 *         break;
 *       default:
 *         console.error('Something bad happened!', tokenizeErr);
 *     }
 *   } else {
 *     console.log('Got nonce:', payload.nonce);
 *   }
 * });
 * @example <caption>Tokenize and vault a card</caption>
 * hostedFieldsInstance.tokenize({
 *   vault: true
 * }, function (tokenizeErr, payload) {
 *   if (tokenizeErr) {
 *     console.error(tokenizeErr);
 *   } else {
 *     console.log('Got nonce:', payload.nonce);
 *   }
 * });
 * @example <caption>Tokenize a card with cardholder name</caption>
 * hostedFieldsInstance.tokenize({
 *   cardholderName: 'First Last'
 * }, function (tokenizeErr, payload) {
 *   if (tokenizeErr) {
 *     console.error(tokenizeErr);
 *   } else {
 *     console.log('Got nonce:', payload.nonce);
 *   }
 * });
 * @example <caption>Tokenize a card with the postal code option</caption>
 * hostedFieldsInstance.tokenize({
 *   billingAddress: {
 *     postalCode: '11111'
 *   }
 * }, function (tokenizeErr, payload) {
 *   if (tokenizeErr) {
 *     console.error(tokenizeErr);
 *   } else {
 *     console.log('Got nonce:', payload.nonce);
 *   }
 * });
 * @example <caption>Tokenize a card with additional billing address options</caption>
 * hostedFieldsInstance.tokenize({
 *   billingAddress: {
 *     streetAddress: '123 Street',
 *     // passing just one of the country options is sufficient to
 *     // associate the card details with a particular country
 *     // valid country names and codes can be found here:
 *     // https://developers.braintreepayments.com/reference/general/countries/ruby#list-of-countries
 *     countryName: 'United States',
 *     countryCodeAlpha2: 'US',
 *     countryCodeAlpha3: 'USA',
 *     countryCodeNumeric: '840'
 *   }
 * }, function (tokenizeErr, payload) {
 *   if (tokenizeErr) {
 *     console.error(tokenizeErr);
 *   } else {
 *     console.log('Got nonce:', payload.nonce);
 *   }
 * });
 * @returns {Promise|void} Returns a promise if no callback is provided.
 */
HostedFields.prototype.tokenize = function (options) {
  var self = this;

  if (!options) {
    options = {};
  }

  return new Promise(function (resolve, reject) {
    self._bus.emit(events.TOKENIZATION_REQUEST, options, function (response) {
      var err = response[0];
      var payload = response[1];

      if (err) {
        reject(err);
      } else {
        resolve(payload);
      }
    });
  });
};

/**
 * Add a class to a {@link module:braintree-web/hosted-fields~field field}. Useful for updating field styles when events occur elsewhere in your checkout.
 * @public
 * @param {string} field The field you wish to add a class to. Must be a valid {@link module:braintree-web/hosted-fields~fieldOptions fieldOption}.
 * @param {string} classname The class to be added.
 * @param {callback} [callback] Callback executed on completion, containing an error if one occurred. No data is returned if the class is added successfully.
 *
 * @example
 * hostedFieldsInstance.addClass('number', 'custom-class', function (addClassErr) {
 *   if (addClassErr) {
 *     console.error(addClassErr);
 *   }
 * });
 * @returns {Promise|void} Returns a promise if no callback is provided.
 */
HostedFields.prototype.addClass = function (field, classname) {
  var err;

  if (!whitelistedFields.hasOwnProperty(field)) {
    err = new BraintreeError({
      type: errors.HOSTED_FIELDS_FIELD_INVALID.type,
      code: errors.HOSTED_FIELDS_FIELD_INVALID.code,
      message: '"' + field + '" is not a valid field. You must use a valid field option when adding a class.'
    });
  } else if (!this._fields.hasOwnProperty(field)) {
    err = new BraintreeError({
      type: errors.HOSTED_FIELDS_FIELD_NOT_PRESENT.type,
      code: errors.HOSTED_FIELDS_FIELD_NOT_PRESENT.code,
      message: 'Cannot add class to "' + field + '" field because it is not part of the current Hosted Fields options.'
    });
  } else {
    this._bus.emit(events.ADD_CLASS, field, classname);
  }

  if (err) {
    return Promise.reject(err);
  }

  return Promise.resolve();
};

/**
 * Removes a class to a {@link module:braintree-web/hosted-fields~field field}. Useful for updating field styles when events occur elsewhere in your checkout.
 * @public
 * @param {string} field The field you wish to remove a class from. Must be a valid {@link module:braintree-web/hosted-fields~fieldOptions fieldOption}.
 * @param {string} classname The class to be removed.
 * @param {callback} [callback] Callback executed on completion, containing an error if one occurred. No data is returned if the class is removed successfully.
 *
 * @example
 * hostedFieldsInstance.addClass('number', 'custom-class', function (addClassErr) {
 *   if (addClassErr) {
 *     console.error(addClassErr);
 *     return;
 *   }
 *
 *   // some time later...
 *   hostedFieldsInstance.removeClass('number', 'custom-class');
 * });
 * @returns {Promise|void} Returns a promise if no callback is provided.
 */
HostedFields.prototype.removeClass = function (field, classname) {
  var err;

  if (!whitelistedFields.hasOwnProperty(field)) {
    err = new BraintreeError({
      type: errors.HOSTED_FIELDS_FIELD_INVALID.type,
      code: errors.HOSTED_FIELDS_FIELD_INVALID.code,
      message: '"' + field + '" is not a valid field. You must use a valid field option when removing a class.'
    });
  } else if (!this._fields.hasOwnProperty(field)) {
    err = new BraintreeError({
      type: errors.HOSTED_FIELDS_FIELD_NOT_PRESENT.type,
      code: errors.HOSTED_FIELDS_FIELD_NOT_PRESENT.code,
      message: 'Cannot remove class from "' + field + '" field because it is not part of the current Hosted Fields options.'
    });
  } else {
    this._bus.emit(events.REMOVE_CLASS, field, classname);
  }

  if (err) {
    return Promise.reject(err);
  }

  return Promise.resolve();
};

/**
 * Sets an attribute of a {@link module:braintree-web/hosted-fields~field field}.
 * Supported attributes are `aria-invalid`, `aria-required`, `disabled`, and `placeholder`.
 *
 * @public
 * @param {object} options The options for the attribute you wish to set.
 * @param {string} options.field The field to which you wish to add an attribute. Must be a valid {@link module:braintree-web/hosted-fields~fieldOptions fieldOption}.
 * @param {string} options.attribute The name of the attribute you wish to add to the field.
 * @param {string} options.value The value for the attribute.
 * @param {callback} [callback] Callback executed on completion, containing an error if one occurred. No data is returned if the attribute is set successfully.
 *
 * @example <caption>Set the placeholder attribute of a field</caption>
 * hostedFieldsInstance.setAttribute({
 *   field: 'number',
 *   attribute: 'placeholder',
 *   value: '1111 1111 1111 1111'
 * }, function (attributeErr) {
 *   if (attributeErr) {
 *     console.error(attributeErr);
 *   }
 * });
 *
 * @example <caption>Set the aria-required attribute of a field</caption>
 * hostedFieldsInstance.setAttribute({
 *   field: 'number',
 *   attribute: 'aria-required',
 *   value: true
 * }, function (attributeErr) {
 *   if (attributeErr) {
 *     console.error(attributeErr);
 *   }
 * });
 *
 * @returns {Promise|void} Returns a promise if no callback is provided.
 */
HostedFields.prototype.setAttribute = function (options) {
  var attributeErr, err;

  if (!whitelistedFields.hasOwnProperty(options.field)) {
    err = new BraintreeError({
      type: errors.HOSTED_FIELDS_FIELD_INVALID.type,
      code: errors.HOSTED_FIELDS_FIELD_INVALID.code,
      message: '"' + options.field + '" is not a valid field. You must use a valid field option when setting an attribute.'
    });
  } else if (!this._fields.hasOwnProperty(options.field)) {
    err = new BraintreeError({
      type: errors.HOSTED_FIELDS_FIELD_NOT_PRESENT.type,
      code: errors.HOSTED_FIELDS_FIELD_NOT_PRESENT.code,
      message: 'Cannot set attribute for "' + options.field + '" field because it is not part of the current Hosted Fields options.'
    });
  } else {
    attributeErr = attributeValidationError(options.attribute, options.value);

    if (attributeErr) {
      err = attributeErr;
    } else {
      this._bus.emit(events.SET_ATTRIBUTE, options.field, options.attribute, options.value);
    }
  }

  if (err) {
    return Promise.reject(err);
  }

  return Promise.resolve();
};

/**
 * Removes a supported attribute from a {@link module:braintree-web/hosted-fields~field field}.
 *
 * @public
 * @param {object} options The options for the attribute you wish to remove.
 * @param {string} options.field The field from which you wish to remove an attribute. Must be a valid {@link module:braintree-web/hosted-fields~fieldOptions fieldOption}.
 * @param {string} options.attribute The name of the attribute you wish to remove from the field.
 * @param {callback} [callback] Callback executed on completion, containing an error if one occurred. No data is returned if the attribute is removed successfully.
 *
 * @example <caption>Remove the placeholder attribute of a field</caption>
 * hostedFieldsInstance.removeAttribute({
 *   field: 'number',
 *   attribute: 'placeholder'
 * }, function (attributeErr) {
 *   if (attributeErr) {
 *     console.error(attributeErr);
 *   }
 * });
 *
 * @returns {Promise|void} Returns a promise if no callback is provided.
 */
HostedFields.prototype.removeAttribute = function (options) {
  var attributeErr, err;

  if (!whitelistedFields.hasOwnProperty(options.field)) {
    err = new BraintreeError({
      type: errors.HOSTED_FIELDS_FIELD_INVALID.type,
      code: errors.HOSTED_FIELDS_FIELD_INVALID.code,
      message: '"' + options.field + '" is not a valid field. You must use a valid field option when removing an attribute.'
    });
  } else if (!this._fields.hasOwnProperty(options.field)) {
    err = new BraintreeError({
      type: errors.HOSTED_FIELDS_FIELD_NOT_PRESENT.type,
      code: errors.HOSTED_FIELDS_FIELD_NOT_PRESENT.code,
      message: 'Cannot remove attribute for "' + options.field + '" field because it is not part of the current Hosted Fields options.'
    });
  } else {
    attributeErr = attributeValidationError(options.attribute);

    if (attributeErr) {
      err = attributeErr;
    } else {
      this._bus.emit(events.REMOVE_ATTRIBUTE, options.field, options.attribute);
    }
  }

  if (err) {
    return Promise.reject(err);
  }

  return Promise.resolve();
};

/**
 * @deprecated since version 3.8.0. Use {@link HostedFields#setAttribute|setAttribute} instead.
 *
 * @public
 * @param {string} field The field whose placeholder you wish to change. Must be a valid {@link module:braintree-web/hosted-fields~fieldOptions fieldOption}.
 * @param {string} placeholder Will be used as the `placeholder` attribute of the input.
 * @param {callback} [callback] Callback executed on completion, containing an error if one occurred. No data is returned if the placeholder updated successfully.
 *
 * @returns {Promise|void} Returns a promise if no callback is provided.
 */
HostedFields.prototype.setPlaceholder = function (field, placeholder) {
  return this.setAttribute({
    field: field,
    attribute: 'placeholder',
    value: placeholder
  });
};

/**
 * Clear the value of a {@link module:braintree-web/hosted-fields~field field}.
 * @public
 * @param {string} field The field you wish to clear. Must be a valid {@link module:braintree-web/hosted-fields~fieldOptions fieldOption}.
 * @param {callback} [callback] Callback executed on completion, containing an error if one occurred. No data is returned if the field cleared successfully.
 * @returns {Promise|void} Returns a promise if no callback is provided.
 * @example
 * hostedFieldsInstance.clear('number', function (clearErr) {
 *   if (clearErr) {
 *     console.error(clearErr);
 *   }
 * });
 *
 * @example <caption>Clear several fields</caption>
 * hostedFieldsInstance.clear('number');
 * hostedFieldsInstance.clear('cvv');
 * hostedFieldsInstance.clear('expirationDate');
 */
HostedFields.prototype.clear = function (field) {
  var err;

  if (!whitelistedFields.hasOwnProperty(field)) {
    err = new BraintreeError({
      type: errors.HOSTED_FIELDS_FIELD_INVALID.type,
      code: errors.HOSTED_FIELDS_FIELD_INVALID.code,
      message: '"' + field + '" is not a valid field. You must use a valid field option when clearing a field.'
    });
  } else if (!this._fields.hasOwnProperty(field)) {
    err = new BraintreeError({
      type: errors.HOSTED_FIELDS_FIELD_NOT_PRESENT.type,
      code: errors.HOSTED_FIELDS_FIELD_NOT_PRESENT.code,
      message: 'Cannot clear "' + field + '" field because it is not part of the current Hosted Fields options.'
    });
  } else {
    this._bus.emit(events.CLEAR_FIELD, field);
  }

  if (err) {
    return Promise.reject(err);
  }

  return Promise.resolve();
};

/**
 * Programmatically focus a {@link module:braintree-web/hosted-fields~field field}.
 * @public
 * @param {string} field The field you want to focus. Must be a valid {@link module:braintree-web/hosted-fields~fieldOptions fieldOption}.
 * @param {callback} [callback] Callback executed on completion, containing an error if one occurred. No data is returned if the field focused successfully.
 * @returns {void}
 * @example
 * hostedFieldsInstance.focus('number', function (focusErr) {
 *   if (focusErr) {
 *     console.error(focusErr);
 *   }
 * });
 * @example <caption>Using an event listener</caption>
 * myElement.addEventListener('click', function (e) {
 *   // Note: In Firefox, the focus method can be suppressed
 *   // if the element has a tabindex property or the element
 *   // is an anchor link with an href property.
 *   e.preventDefault();
 *   hostedFieldsInstance.focus('number');
 * });
 */
HostedFields.prototype.focus = function (field) {
  var err;

  if (!whitelistedFields.hasOwnProperty(field)) {
    err = new BraintreeError({
      type: errors.HOSTED_FIELDS_FIELD_INVALID.type,
      code: errors.HOSTED_FIELDS_FIELD_INVALID.code,
      message: '"' + field + '" is not a valid field. You must use a valid field option when focusing a field.'
    });
  } else if (!this._fields.hasOwnProperty(field)) {
    err = new BraintreeError({
      type: errors.HOSTED_FIELDS_FIELD_NOT_PRESENT.type,
      code: errors.HOSTED_FIELDS_FIELD_NOT_PRESENT.code,
      message: 'Cannot focus "' + field + '" field because it is not part of the current Hosted Fields options.'
    });
  } else {
    this._bus.emit(events.TRIGGER_INPUT_FOCUS, field);
  }

  if (err) {
    return Promise.reject(err);
  }

  return Promise.resolve();
};

/**
 * Returns an {@link HostedFields~stateObject|object} that includes the state of all fields and possible card types.
 * @public
 * @returns {object} {@link HostedFields~stateObject|stateObject}
 * @example <caption>Check if all fields are valid</caption>
 * var state = hostedFields.getState();
 *
 * var formValid = Object.keys(state.fields).every(function (key) {
 *   return state.fields[key].isValid;
 * });
 */
HostedFields.prototype.getState = function () {
  return this._state;
};

module.exports = wrapPromise.wrapPrototype(HostedFields);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var batchExecuteFunctions = __webpack_require__(134);

function Destructor() {
  this._teardownRegistry = [];

  this._isTearingDown = false;
}

Destructor.prototype.registerFunctionForTeardown = function (fn) {
  if (typeof fn === 'function') {
    this._teardownRegistry.push(fn);
  }
};

Destructor.prototype.teardown = function (callback) {
  if (this._isTearingDown) {
    callback(new Error('Destructor is already tearing down'));
    return;
  }

  this._isTearingDown = true;

  batchExecuteFunctions(this._teardownRegistry, function (err) {
    this._teardownRegistry = [];
    this._isTearingDown = false;

    if (typeof callback === 'function') {
      callback(err);
    }
  }.bind(this));
};

module.exports = Destructor;


/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var once = __webpack_require__(27);

function call(fn, callback) {
  var isSync = fn.length === 0;

  if (isSync) {
    fn();
    callback(null);
  } else {
    fn(callback);
  }
}

module.exports = function (functions, cb) {
  var i;
  var length = functions.length;
  var remaining = length;
  var callback = once(cb);

  if (length === 0) {
    callback(null);
    return;
  }

  function finish(err) {
    if (err) {
      callback(err);
      return;
    }

    remaining -= 1;
    if (remaining === 0) {
      callback(null);
    }
  }

  for (i = 0; i < length; i++) {
    call(functions[i], finish);
  }
};


/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classesOf(element) {
  return element.className.trim().split(/\s+/);
}

function add(element) {
  var toAdd = Array.prototype.slice.call(arguments, 1);
  var className = _classesOf(element).filter(function (classname) {
    return toAdd.indexOf(classname) === -1;
  }).concat(toAdd).join(' ');

  element.className = className;
}

function remove(element) {
  var toRemove = Array.prototype.slice.call(arguments, 1);
  var className = _classesOf(element).filter(function (classname) {
    return toRemove.indexOf(classname) === -1;
  }).join(' ');

  element.className = className;
}

function toggle(element, classname, adding) {
  if (adding) {
    add(element, classname);
  } else {
    remove(element, classname);
  }
}

module.exports = {
  add: add,
  remove: remove,
  toggle: toggle
};


/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var setAttributes = __webpack_require__(137);
var defaultAttributes = __webpack_require__(138);
var assign = __webpack_require__(139);

module.exports = function createFrame(options) {
  var iframe = document.createElement('iframe');
  var config = assign({}, defaultAttributes, options);

  if (config.style && typeof config.style !== 'string') {
    assign(iframe.style, config.style);
    delete config.style;
  }

  setAttributes(iframe, config);

  if (!iframe.getAttribute('id')) {
    iframe.id = iframe.name;
  }

  return iframe;
};


/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function setAttributes(element, attributes) {
  var value;

  for (var key in attributes) {
    if (attributes.hasOwnProperty(key)) {
      value = attributes[key];

      if (value == null) {
        element.removeAttribute(key);
      } else {
        element.setAttribute(key, value);
      }
    }
  }
};


/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  src: 'about:blank',
  frameBorder: 0,
  allowtransparency: true,
  scrolling: 'no'
};


/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function assign(target) {
  var objs = Array.prototype.slice.call(arguments, 1);

  objs.forEach(function (obj) {
    if (typeof obj !== 'object') { return; }

    Object.keys(obj).forEach(function (key) {
      target[key] = obj[key];
    });
  });

  return target;
}


/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bus = __webpack_require__(141);
var events = __webpack_require__(142);
var checkOrigin = __webpack_require__(143).checkOrigin;
var BraintreeError = __webpack_require__(3);

function BraintreeBus(options) {
  options = options || {};

  this.channel = options.channel;
  if (!this.channel) {
    throw new BraintreeError({
      type: BraintreeError.types.INTERNAL,
      code: 'MISSING_CHANNEL_ID',
      message: 'Channel ID must be specified.'
    });
  }

  this.merchantUrl = options.merchantUrl;

  this._isDestroyed = false;
  this._isVerbose = false;

  this._listeners = [];

  this._log('new bus on channel ' + this.channel, [location.href]);
}

BraintreeBus.prototype.on = function (eventName, originalHandler) {
  var namespacedEvent, args;
  var handler = originalHandler;
  var self = this;

  if (this._isDestroyed) { return; }

  if (this.merchantUrl) {
    handler = function () {
      /* eslint-disable no-invalid-this */
      if (checkOrigin(this.origin, self.merchantUrl)) {
        originalHandler.apply(this, arguments);
      }
      /* eslint-enable no-invalid-this */
    };
  }

  namespacedEvent = this._namespaceEvent(eventName);
  args = Array.prototype.slice.call(arguments);
  args[0] = namespacedEvent;
  args[1] = handler;

  this._log('on', args);
  bus.on.apply(bus, args);

  this._listeners.push({
    eventName: eventName,
    handler: handler,
    originalHandler: originalHandler
  });
};

BraintreeBus.prototype.emit = function (eventName) {
  var args;

  if (this._isDestroyed) { return; }

  args = Array.prototype.slice.call(arguments);
  args[0] = this._namespaceEvent(eventName);

  this._log('emit', args);
  bus.emit.apply(bus, args);
};

BraintreeBus.prototype._offDirect = function (eventName) {
  var args = Array.prototype.slice.call(arguments);

  if (this._isDestroyed) { return; }

  args[0] = this._namespaceEvent(eventName);

  this._log('off', args);
  bus.off.apply(bus, args);
};

BraintreeBus.prototype.off = function (eventName, originalHandler) {
  var i, listener;
  var handler = originalHandler;

  if (this._isDestroyed) { return; }

  if (this.merchantUrl) {
    for (i = 0; i < this._listeners.length; i++) {
      listener = this._listeners[i];

      if (listener.originalHandler === originalHandler) {
        handler = listener.handler;
      }
    }
  }

  this._offDirect(eventName, handler);
};

BraintreeBus.prototype._namespaceEvent = function (eventName) {
  return ['braintree', this.channel, eventName].join(':');
};

BraintreeBus.prototype.teardown = function () {
  var listener, i;

  for (i = 0; i < this._listeners.length; i++) {
    listener = this._listeners[i];
    this._offDirect(listener.eventName, listener.handler);
  }

  this._listeners.length = 0;

  this._isDestroyed = true;
};

BraintreeBus.prototype._log = function (functionName, args) {
  if (this._isVerbose) {
    console.log(functionName, args); // eslint-disable-line no-console
  }
};

BraintreeBus.events = events;

module.exports = BraintreeBus;


/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {
(function (root, factory) {
  if (true) {
    module.exports = factory(typeof global === 'undefined' ? root : global);
  } else if (typeof define === 'function' && define.amd) {
    define([], function () { return factory(root); });
  } else {
    root.framebus = factory(root);
  }
})(this, function (root) { // eslint-disable-line no-invalid-this
  var win, framebus;
  var popups = [];
  var subscribers = {};
  var prefix = '/*framebus*/';

  function include(popup) {
    if (popup == null) { return false; }
    if (popup.Window == null) { return false; }
    if (popup.constructor !== popup.Window) { return false; }

    popups.push(popup);
    return true;
  }

  function target(origin) {
    var key;
    var targetedFramebus = {};

    for (key in framebus) {
      if (!framebus.hasOwnProperty(key)) { continue; }

      targetedFramebus[key] = framebus[key];
    }

    targetedFramebus._origin = origin || '*';

    return targetedFramebus;
  }

  function publish(event) {
    var payload, args;
    var origin = _getOrigin(this); // eslint-disable-line no-invalid-this

    if (_isntString(event)) { return false; }
    if (_isntString(origin)) { return false; }

    args = Array.prototype.slice.call(arguments, 1);

    payload = _packagePayload(event, args, origin);
    if (payload === false) { return false; }

    _broadcast(win.top || win.self, payload, origin);

    return true;
  }

  function subscribe(event, fn) {
    var origin = _getOrigin(this); // eslint-disable-line no-invalid-this

    if (_subscriptionArgsInvalid(event, fn, origin)) { return false; }

    subscribers[origin] = subscribers[origin] || {};
    subscribers[origin][event] = subscribers[origin][event] || [];
    subscribers[origin][event].push(fn);

    return true;
  }

  function unsubscribe(event, fn) {
    var i, subscriberList;
    var origin = _getOrigin(this); // eslint-disable-line no-invalid-this

    if (_subscriptionArgsInvalid(event, fn, origin)) { return false; }

    subscriberList = subscribers[origin] && subscribers[origin][event];
    if (!subscriberList) { return false; }

    for (i = 0; i < subscriberList.length; i++) {
      if (subscriberList[i] === fn) {
        subscriberList.splice(i, 1);
        return true;
      }
    }

    return false;
  }

  function _getOrigin(scope) {
    return scope && scope._origin || '*';
  }

  function _isntString(string) {
    return typeof string !== 'string';
  }

  function _packagePayload(event, args, origin) {
    var packaged = false;
    var payload = {
      event: event,
      origin: origin
    };
    var reply = args[args.length - 1];

    if (typeof reply === 'function') {
      payload.reply = _subscribeReplier(reply, origin);
      args = args.slice(0, -1);
    }

    payload.args = args;

    try {
      packaged = prefix + JSON.stringify(payload);
    } catch (e) {
      throw new Error('Could not stringify event: ' + e.message);
    }
    return packaged;
  }

  function _unpackPayload(e) {
    var payload, replyOrigin, replySource, replyEvent;

    if (e.data.slice(0, prefix.length) !== prefix) { return false; }

    try {
      payload = JSON.parse(e.data.slice(prefix.length));
    } catch (err) {
      return false;
    }

    if (payload.reply != null) {
      replyOrigin = e.origin;
      replySource = e.source;
      replyEvent = payload.reply;

      payload.reply = function reply(data) { // eslint-disable-line consistent-return
        var replyPayload = _packagePayload(replyEvent, [data], replyOrigin);

        if (replyPayload === false) { return false; }

        replySource.postMessage(replyPayload, replyOrigin);
      };

      payload.args.push(payload.reply);
    }

    return payload;
  }

  function _attach(w) {
    if (win) { return; }
    win = w || root;

    if (win.addEventListener) {
      win.addEventListener('message', _onmessage, false);
    } else if (win.attachEvent) {
      win.attachEvent('onmessage', _onmessage);
    } else if (win.onmessage === null) {
      win.onmessage = _onmessage;
    } else {
      win = null;
    }
  }

  function _uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0;
      var v = c === 'x' ? r : r & 0x3 | 0x8;

      return v.toString(16);
    });
  }

  function _onmessage(e) {
    var payload;

    if (_isntString(e.data)) { return; }

    payload = _unpackPayload(e);
    if (!payload) { return; }

    _dispatch('*', payload.event, payload.args, e);
    _dispatch(e.origin, payload.event, payload.args, e);
    _broadcastPopups(e.data, payload.origin, e.source);
  }

  function _dispatch(origin, event, args, e) {
    var i;

    if (!subscribers[origin]) { return; }
    if (!subscribers[origin][event]) { return; }

    for (i = 0; i < subscribers[origin][event].length; i++) {
      subscribers[origin][event][i].apply(e, args);
    }
  }

  function _hasOpener(frame) {
    if (frame.top !== frame) { return false; }
    if (frame.opener == null) { return false; }
    if (frame.opener === frame) { return false; }
    if (frame.opener.closed === true) { return false; }

    return true;
  }

  function _broadcast(frame, payload, origin) {
    var i;

    try {
      frame.postMessage(payload, origin);

      if (_hasOpener(frame)) {
        _broadcast(frame.opener.top, payload, origin);
      }

      for (i = 0; i < frame.frames.length; i++) {
        _broadcast(frame.frames[i], payload, origin);
      }
    } catch (_) { /* ignored */ }
  }

  function _broadcastPopups(payload, origin, source) {
    var i, popup;

    for (i = popups.length - 1; i >= 0; i--) {
      popup = popups[i];

      if (popup.closed === true) {
        popups = popups.slice(i, 1);
      } else if (source !== popup) {
        _broadcast(popup.top, payload, origin);
      }
    }
  }

  function _subscribeReplier(fn, origin) {
    var uuid = _uuid();

    function replier(d, o) {
      fn(d, o);
      framebus.target(origin).unsubscribe(uuid, replier);
    }

    framebus.target(origin).subscribe(uuid, replier);
    return uuid;
  }

  function _subscriptionArgsInvalid(event, fn, origin) {
    if (_isntString(event)) { return true; }
    if (typeof fn !== 'function') { return true; }
    if (_isntString(origin)) { return true; }

    return false;
  }

  _attach();

  framebus = {
    target: target,
    include: include,
    publish: publish,
    pub: publish,
    trigger: publish,
    emit: publish,
    subscribe: subscribe,
    sub: subscribe,
    on: subscribe,
    unsubscribe: unsubscribe,
    unsub: unsubscribe,
    off: unsubscribe
  };

  return framebus;
});

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enumerate = __webpack_require__(26);

module.exports = enumerate([
  'CONFIGURATION_REQUEST'
], 'bus:');


/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isWhitelistedDomain = __webpack_require__(50);

function checkOrigin(postMessageOrigin, merchantUrl) {
  var merchantOrigin, merchantHost;
  var a = document.createElement('a');

  a.href = merchantUrl;

  if (a.protocol === 'https:') {
    merchantHost = a.host.replace(/:443$/, '');
  } else if (a.protocol === 'http:') {
    merchantHost = a.host.replace(/:80$/, '');
  } else {
    merchantHost = a.host;
  }

  merchantOrigin = a.protocol + '//' + merchantHost;

  if (merchantOrigin === postMessageOrigin) { return true; }

  a.href = postMessageOrigin;

  return isWhitelistedDomain(postMessageOrigin);
}

module.exports = {
  checkOrigin: checkOrigin
};


/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var constants = __webpack_require__(29);
var useMin = __webpack_require__(145);

module.exports = function composeUrl(assetsUrl, componentId, isDebug) {
  return assetsUrl +
    '/web/' +
    constants.VERSION +
    '/html/hosted-fields-frame' + useMin(isDebug) + '.html#' +
    componentId;
};


/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function useMin(isDebug) {
  return isDebug ? '' : '.min';
}

module.exports = useMin;


/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function findParentTags(element, tag) {
  var parent = element.parentNode;
  var parents = [];

  while (parent != null) {
    if (parent.tagName != null && parent.tagName.toLowerCase() === tag) {
      parents.push(parent);
    }

    parent = parent.parentNode;
  }

  return parents;
}

module.exports = findParentTags;


/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  isIe9: __webpack_require__(31),
  isIos: __webpack_require__(32),
  isIosWebview: __webpack_require__(148)
};


/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var isIos = __webpack_require__(32);

// The Google Search iOS app is technically a webview and doesn't support popups.
function isGoogleSearchApp(ua) {
  return /\bGSA\b/.test(ua);
}

module.exports = function isIosWebview(ua) {
  ua = ua || global.navigator.userAgent;
  if (isIos(ua)) {
    if (isGoogleSearchApp(ua)) {
      return true;
    }
    return /.+AppleWebKit(?!.*Safari)/.test(ua);
  }
  return false;
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function EventEmitter() {
  this._events = {};
}

EventEmitter.prototype.on = function (event, callback) {
  if (this._events[event]) {
    this._events[event].push(callback);
  } else {
    this._events[event] = [callback];
  }
};

EventEmitter.prototype._emit = function (event) {
  var i, args;
  var callbacks = this._events[event];

  if (!callbacks) { return; }

  args = Array.prototype.slice.call(arguments, 1);

  for (i = 0; i < callbacks.length; i++) {
    callbacks[i].apply(null, args);
  }
};

module.exports = EventEmitter;


/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function injectFrame(frame, container) {
  var clearboth = document.createElement('div');
  var fragment = document.createDocumentFragment();

  clearboth.style.clear = 'both';

  fragment.appendChild(frame);
  fragment.appendChild(clearboth);

  container.appendChild(fragment);

  return [frame, clearboth];
};


/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (obj) {
  return Object.keys(obj).filter(function (key) {
    return typeof obj[key] === 'function';
  });
};


/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var BraintreeError = __webpack_require__(3);
var sharedErrors = __webpack_require__(17);

module.exports = function (instance, methodNames) {
  methodNames.forEach(function (methodName) {
    instance[methodName] = function () {
      throw new BraintreeError({
        type: sharedErrors.METHOD_CALLED_AFTER_TEARDOWN.type,
        code: sharedErrors.METHOD_CALLED_AFTER_TEARDOWN.code,
        message: methodName + ' cannot be called after teardown.'
      });
    };
  });
};


/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var types = {};
var VISA = 'visa';
var MASTERCARD = 'master-card';
var AMERICAN_EXPRESS = 'american-express';
var DINERS_CLUB = 'diners-club';
var DISCOVER = 'discover';
var JCB = 'jcb';
var UNIONPAY = 'unionpay';
var MAESTRO = 'maestro';
var CVV = 'CVV';
var CID = 'CID';
var CVC = 'CVC';
var CVN = 'CVN';
var testOrder = [
  VISA,
  MASTERCARD,
  AMERICAN_EXPRESS,
  DINERS_CLUB,
  DISCOVER,
  JCB,
  UNIONPAY,
  MAESTRO
];

function clone(x) {
  var prefixPattern, exactPattern, dupe;

  if (!x) { return null; }

  // TODO: in the next major version, we should
  // consider removing these pattern properties.
  // They are not useful extnerally and can be
  // confusing because the exactPattern does not
  // always match (for instance, Maestro cards
  // can start with 62, but the exact pattern
  // does not include that since it would
  // exclude UnionPay and Discover cards
  // when it is not sure whether or not
  // the card is a UnionPay, Discover or
  // Maestro card).
  prefixPattern = x.prefixPattern.source;
  exactPattern = x.exactPattern.source;
  dupe = JSON.parse(JSON.stringify(x));
  dupe.prefixPattern = prefixPattern;
  dupe.exactPattern = exactPattern;

  return dupe;
}

types[VISA] = {
  niceType: 'Visa',
  type: VISA,
  prefixPattern: /^4$/,
  exactPattern: /^4\d*$/,
  gaps: [4, 8, 12],
  lengths: [16, 18, 19],
  code: {
    name: CVV,
    size: 3
  }
};

types[MASTERCARD] = {
  niceType: 'MasterCard',
  type: MASTERCARD,
  prefixPattern: /^(5|5[1-5]|2|22|222|222[1-9]|2[3-6]|27|27[0-2]|2720)$/,
  exactPattern: /^(5[1-5]|222[1-9]|2[3-6]|27[0-1]|2720)\d*$/,
  gaps: [4, 8, 12],
  lengths: [16],
  code: {
    name: CVC,
    size: 3
  }
};

types[AMERICAN_EXPRESS] = {
  niceType: 'American Express',
  type: AMERICAN_EXPRESS,
  prefixPattern: /^(3|34|37)$/,
  exactPattern: /^3[47]\d*$/,
  isAmex: true,
  gaps: [4, 10],
  lengths: [15],
  code: {
    name: CID,
    size: 4
  }
};

types[DINERS_CLUB] = {
  niceType: 'Diners Club',
  type: DINERS_CLUB,
  prefixPattern: /^(3|3[0689]|30[0-5])$/,
  exactPattern: /^3(0[0-5]|[689])\d*$/,
  gaps: [4, 10],
  lengths: [14, 16, 19],
  code: {
    name: CVV,
    size: 3
  }
};

types[DISCOVER] = {
  niceType: 'Discover',
  type: DISCOVER,
  prefixPattern: /^(6|60|601|6011|65|64|64[4-9])$/,
  exactPattern: /^(6011|65|64[4-9])\d*$/,
  gaps: [4, 8, 12],
  lengths: [16, 19],
  code: {
    name: CID,
    size: 3
  }
};

types[JCB] = {
  niceType: 'JCB',
  type: JCB,
  prefixPattern: /^(2|21|213|2131|1|18|180|1800|3|35)$/,
  exactPattern: /^(2131|1800|35)\d*$/,
  gaps: [4, 8, 12],
  lengths: [16],
  code: {
    name: CVV,
    size: 3
  }
};

types[UNIONPAY] = {
  niceType: 'UnionPay',
  type: UNIONPAY,
  prefixPattern: /^((6|62|62\d|(621(?!83|88|98|99))|622(?!06)|627[02,06,07]|628(?!0|1)|629[1,2])|622018)$/,
  exactPattern: /^(((620|(621(?!83|88|98|99))|622(?!06|018)|62[3-6]|627[02,06,07]|628(?!0|1)|629[1,2]))\d*|622018\d{12})$/,
  gaps: [4, 8, 12],
  lengths: [16, 17, 18, 19],
  code: {
    name: CVN,
    size: 3
  }
};

types[MAESTRO] = {
  niceType: 'Maestro',
  type: MAESTRO,
  prefixPattern: /^(5|5[06-9]|6\d*)$/,
  exactPattern: /^(5[06-9]|6[37])\d*$/,
  gaps: [4, 8, 12],
  lengths: [12, 13, 14, 15, 16, 17, 18, 19],
  code: {
    name: CVC,
    size: 3
  }
};

function creditCardType(cardNumber) {
  var type, value, i;
  var prefixResults = [];
  var exactResults = [];

  if (!(typeof cardNumber === 'string' || cardNumber instanceof String)) {
    return [];
  }

  for (i = 0; i < testOrder.length; i++) {
    type = testOrder[i];
    value = types[type];

    if (cardNumber.length === 0) {
      prefixResults.push(clone(value));
      continue;
    }

    if (value.exactPattern.test(cardNumber)) {
      exactResults.push(clone(value));
    } else if (value.prefixPattern.test(cardNumber)) {
      prefixResults.push(clone(value));
    }
  }

  return exactResults.length ? exactResults : prefixResults;
}

creditCardType.getTypeInfo = function (type) {
  return clone(types[type]);
};

creditCardType.types = {
  VISA: VISA,
  MASTERCARD: MASTERCARD,
  AMERICAN_EXPRESS: AMERICAN_EXPRESS,
  DINERS_CLUB: DINERS_CLUB,
  DISCOVER: DISCOVER,
  JCB: JCB,
  UNIONPAY: UNIONPAY,
  MAESTRO: MAESTRO
};

module.exports = creditCardType;


/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var BraintreeError = __webpack_require__(3);
var errors = __webpack_require__(30);
var whitelist = __webpack_require__(29).whitelistedAttributes;

function attributeValidationError(attribute, value) {
  var err;

  if (!whitelist.hasOwnProperty(attribute)) {
    err = new BraintreeError({
      type: errors.HOSTED_FIELDS_ATTRIBUTE_NOT_SUPPORTED.type,
      code: errors.HOSTED_FIELDS_ATTRIBUTE_NOT_SUPPORTED.code,
      message: 'The "' + attribute + '" attribute is not supported in Hosted Fields.'
    });
  } else if (value != null && !_isValid(attribute, value)) {
    err = new BraintreeError({
      type: errors.HOSTED_FIELDS_ATTRIBUTE_VALUE_NOT_ALLOWED.type,
      code: errors.HOSTED_FIELDS_ATTRIBUTE_VALUE_NOT_ALLOWED.code,
      message: 'Value "' + value + '" is not allowed for "' + attribute + '" attribute.'
    });
  }

  return err;
}

function _isValid(attribute, value) {
  if (whitelist[attribute] === 'string') {
    return typeof value === 'string' || typeof value === 'number';
  } else if (whitelist[attribute] === 'boolean') {
    return String(value) === 'true' || String(value) === 'false';
  }

  return false;
}

module.exports = attributeValidationError;


/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var device = __webpack_require__(156);

module.exports = function () {
  // Digits get dropped in samsung browser
  return !device.isSamsungBrowser();
};


/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var UA = global.navigator && global.navigator.userAgent;

var isAndroid = __webpack_require__(157);
var isChrome = __webpack_require__(158);
var isIos = __webpack_require__(32);
var isIE9 = __webpack_require__(31);

// Old Android Webviews used specific versions of Chrome with 0.0.0 as their version suffix
// https://developer.chrome.com/multidevice/user-agent#webview_user_agent
var KITKAT_WEBVIEW_REGEX = /Version\/\d\.\d* Chrome\/\d*\.0\.0\.0/;

function _isOldSamsungBrowserOrSamsungWebview(ua) {
  return !isChrome(ua) && ua.indexOf('Samsung') > -1;
}

function isKitKatWebview(uaArg) {
  var ua = uaArg || UA;

  return isAndroid(ua) && KITKAT_WEBVIEW_REGEX.test(ua);
}

function isAndroidChrome(uaArg) {
  var ua = uaArg || UA;

  return isAndroid(ua) && isChrome(ua);
}

function isSamsungBrowser(ua) {
  ua = ua || UA;
  return /SamsungBrowser/.test(ua) || _isOldSamsungBrowserOrSamsungWebview(ua);
}

module.exports = {
  isIE9: isIE9,
  isAndroidChrome: isAndroidChrome,
  isIos: isIos,
  isKitKatWebview: isKitKatWebview,
  isSamsungBrowser: isSamsungBrowser
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

module.exports = function isAndroid(ua) {
  ua = ua || global.navigator.userAgent;
  return /Android/.test(ua);
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isEdge = __webpack_require__(159);
var isSamsung = __webpack_require__(160);

module.exports = function isChrome(ua) {
  ua = ua || navigator.userAgent;
  return (ua.indexOf('Chrome') !== -1 || ua.indexOf('CriOS') !== -1) && !isEdge(ua) && !isSamsung(ua);
};


/***/ }),
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isEdge(ua) {
  ua = ua || navigator.userAgent;
  return ua.indexOf('Edge/') !== -1;
};


/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

module.exports = function isSamsungBrowser(ua) {
  ua = ua || global.navigator.userAgent;
  return /SamsungBrowser/i.test(ua);
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isIe9 = __webpack_require__(31);

module.exports = {
  isIe9: isIe9
};


/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var paymentOptionIDs = __webpack_require__(2).paymentOptionIDs;
var BasePayPalView = __webpack_require__(59);

function PayPalView() {
  BasePayPalView.apply(this, arguments);
}

PayPalView.prototype = Object.create(BasePayPalView.prototype);
PayPalView.prototype.constructor = PayPalView;
PayPalView.ID = PayPalView.prototype.ID = paymentOptionIDs.paypal;

module.exports = PayPalView;


/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * @module braintree-web/paypal-checkout
 * @description A component to integrate with the [PayPal Checkout.js library](https://github.com/paypal/paypal-checkout).
 */

var BraintreeError = __webpack_require__(3);
var analytics = __webpack_require__(33);
var errors = __webpack_require__(60);
var Promise = __webpack_require__(7);
var wrapPromise = __webpack_require__(4);
var PayPalCheckout = __webpack_require__(164);
var sharedErrors = __webpack_require__(17);
var VERSION = "3.22.2";

/**
 * @static
 * @function create
 * @param {object} options Creation options:
 * @param {Client} options.client A {@link Client} instance.
 * @param {callback} [callback] The second argument, `data`, is the {@link PayPalCheckout} instance.
 * @example
 * // Be sure to have checkout.js loaded on your page.
 * // You can use the paypal-checkout package on npm
 * // with a build tool or use a script hosted by PayPal:
 * // <script src="https://www.paypalobjects.com/api/checkout.js" data-version-4 log-level="warn"></script>
 *
 * braintree.paypalCheckout.create({
 *   client: clientInstance
 * }, function (createErr, paypalCheckoutInstance) {
 *   if (createErr) {
 *     console.error('Error!', createErr);
 *     return;
 *   }
 *
 *   paypal.Button.render({
 *     env: 'production', // or 'sandbox'
 *
 *     locale: 'en_US',
 *
 *     payment: function () {
 *       return paypalCheckoutInstance.createPayment({
 *         flow: 'vault'
 *       });
 *     },
 *
 *     onAuthorize: function (data, actions) {
 *       return paypalCheckoutInstance.tokenizePayment(data).then(function (payload) {
 *         // Submit payload.nonce to your server
 *       });
 *     },
 *
 *     onCancel: function (data) {
 *       console.log('checkout.js payment cancelled', JSON.stringify(data, 0, 2));
 *     },
 *
 *     onError: function (err) {
 *       console.error('checkout.js error', err);
 *     }
 *   }, '#paypal-button'); // the PayPal button will be rendered in an html element with the id `paypal-button`
 * });
 * @returns {Promise|void} Returns a promise if no callback is provided.
 */
function create(options) {
  var config, clientVersion;

  if (options.client == null) {
    return Promise.reject(new BraintreeError({
      type: sharedErrors.INSTANTIATION_OPTION_REQUIRED.type,
      code: sharedErrors.INSTANTIATION_OPTION_REQUIRED.code,
      message: 'options.client is required when instantiating PayPal Checkout.'
    }));
  }

  config = options.client.getConfiguration();
  clientVersion = options.client.getVersion();

  if (clientVersion !== VERSION) {
    return Promise.reject(new BraintreeError({
      type: sharedErrors.INCOMPATIBLE_VERSIONS.type,
      code: sharedErrors.INCOMPATIBLE_VERSIONS.code,
      message: 'Client (version ' + clientVersion + ') and PayPal Checkout (version ' + VERSION + ') components must be from the same SDK version.'
    }));
  }

  if (!config.gatewayConfiguration.paypalEnabled) {
    return Promise.reject(new BraintreeError(errors.PAYPAL_NOT_ENABLED));
  }

  if (!config.gatewayConfiguration.paypal.clientId) {
    return Promise.reject(new BraintreeError(errors.PAYPAL_SANDBOX_ACCOUNT_NOT_LINKED));
  }

  analytics.sendEvent(options.client, 'paypal-checkout.initialized');

  return Promise.resolve(new PayPalCheckout(options));
}

/**
 * @static
 * @function isSupported
 * @description Returns true if PayPal Checkout [supports this browser](index.html#browser-support-webviews).
 * @deprecated Previously, this method checked for Popup support in the brower. Checkout.js now falls back to a modal if popups are not supported.
 * @example
 * if (braintree.paypalCheckout.isSupported()) {
 *   // Add PayPal button to the page
 * } else {
 *   // Hide PayPal payment option
 * }
 * @returns {Boolean} Returns true if PayPal Checkout supports this browser.
 */
function isSupported() {
  return true;
}

module.exports = {
  create: wrapPromise(create),
  isSupported: isSupported,
  /**
   * @description The current version of the SDK, i.e. `{@pkg version}`.
   * @type {string}
   */
  VERSION: VERSION
};


/***/ }),
/* 164 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var analytics = __webpack_require__(33);
var Promise = __webpack_require__(7);
var wrapPromise = __webpack_require__(4);
var BraintreeError = __webpack_require__(3);
var convertToBraintreeError = __webpack_require__(51);
var errors = __webpack_require__(60);
var constants = __webpack_require__(165);

/**
 * PayPal Checkout tokenized payload. Returned in {@link PayPalCheckout#tokenizePayment}'s callback as the second argument, `data`.
 * @typedef {object} PayPalCheckout~tokenizePayload
 * @property {string} nonce The payment method nonce.
 * @property {string} type The payment method type, always `PayPalAccount`.
 * @property {object} details Additional PayPal account details.
 * @property {string} details.email User's email address.
 * @property {string} details.payerId User's payer ID, the unique identifier for each PayPal account.
 * @property {string} details.firstName User's given name.
 * @property {string} details.lastName User's surname.
 * @property {?string} details.countryCode User's 2 character country code.
 * @property {?string} details.phone User's phone number (e.g. 555-867-5309).
 * @property {?object} details.shippingAddress User's shipping address details, only available if shipping address is enabled.
 * @property {string} details.shippingAddress.recipientName Recipient of postage.
 * @property {string} details.shippingAddress.line1 Street number and name.
 * @property {string} details.shippingAddress.line2 Extended address.
 * @property {string} details.shippingAddress.city City or locality.
 * @property {string} details.shippingAddress.state State or region.
 * @property {string} details.shippingAddress.postalCode Postal code.
 * @property {string} details.shippingAddress.countryCode 2 character country code (e.g. US).
 * @property {?object} details.billingAddress User's billing address details.
 * Not available to all merchants; [contact PayPal](https://developers.braintreepayments.com/support/guides/paypal/setup-guide#contacting-paypal-support) for details on eligibility and enabling this feature.
 * Alternatively, see `shippingAddress` above as an available client option.
 * @property {string} details.billingAddress.line1 Street number and name.
 * @property {string} details.billingAddress.line2 Extended address.
 * @property {string} details.billingAddress.city City or locality.
 * @property {string} details.billingAddress.state State or region.
 * @property {string} details.billingAddress.postalCode Postal code.
 * @property {string} details.billingAddress.countryCode 2 character country code (e.g. US).
 * @property {?object} creditFinancingOffered This property will only be present when the customer pays with PayPal Credit.
 * @property {object} creditFinancingOffered.totalCost This is the estimated total payment amount including interest and fees the user will pay during the lifetime of the loan.
 * @property {string} creditFinancingOffered.totalCost.value An amount defined by [ISO 4217](http://www.iso.org/iso/home/standards/currency_codes.htm) for the given currency.
 * @property {string} creditFinancingOffered.totalCost.currency 3 letter currency code as defined by [ISO 4217](http://www.iso.org/iso/home/standards/currency_codes.htm).
 * @property {number} creditFinancingOffered.term Length of financing terms in months.
 * @property {object} creditFinancingOffered.monthlyPayment This is the estimated amount per month that the customer will need to pay including fees and interest.
 * @property {string} creditFinancingOffered.monthlyPayment.value An amount defined by [ISO 4217](http://www.iso.org/iso/home/standards/currency_codes.htm) for the given currency.
 * @property {string} creditFinancingOffered.monthlyPayment.currency 3 letter currency code as defined by [ISO 4217](http://www.iso.org/iso/home/standards/currency_codes.htm).
 * @property {object} creditFinancingOffered.totalInterest Estimated interest or fees amount the payer will have to pay during the lifetime of the loan.
 * @property {string} creditFinancingOffered.totalInterest.value An amount defined by [ISO 4217](http://www.iso.org/iso/home/standards/currency_codes.htm) for the given currency.
 * @property {string} creditFinancingOffered.totalInterest.currency 3 letter currency code as defined by [ISO 4217](http://www.iso.org/iso/home/standards/currency_codes.htm).
 * @property {boolean} creditFinancingOffered.payerAcceptance Status of whether the customer ultimately was approved for and chose to make the payment using the approved installment credit.
 * @property {boolean} creditFinancingOffered.cartAmountImmutable Indicates whether the cart amount is editable after payer's acceptance on PayPal side.
 */

/**
 * @class
 * @param {object} options see {@link module:braintree-web/paypal-checkout.create|paypal-checkout.create}
 * @classdesc This class represents a PayPal Checkout component that coordinates with the {@link https://developer.paypal.com/docs/integration/direct/express-checkout/integration-jsv4|PayPal checkout.js} library. Instances of this class can generate payment data and tokenize authorized payments.
 *
 * All UI (such as preventing actions on the parent page while authentication is in progress) is managed by {@link https://developer.paypal.com/docs/integration/direct/express-checkout/integration-jsv4|checkout.js}.
 * @description <strong>Do not use this constructor directly. Use {@link module:braintree-web/paypal-checkout.create|braintree-web.paypal-checkout.create} instead.</strong>
 */
function PayPalCheckout(options) {
  this._client = options.client;
}

/**
 * Creates a PayPal payment ID or billing token using the given options. This is meant to be passed to PayPal's checkout.js library.
 * When a {@link callback} is defined, the function returns undefined and invokes the callback with the id to be used with the checkout.js library. Otherwise, it returns a Promise that resolves with the id.
 * @public
 * @param {object} options All options for the PayPalCheckout component.
 * @param {string} options.flow Set to 'checkout' for one-time payment flow, or 'vault' for Vault flow. If 'vault' is used with a client token generated with a customer ID, the PayPal account will be added to that customer as a saved payment method.
 * @param {string} [options.intent=authorize]
 * Checkout flows only.
 * * `authorize` - Submits the transaction for authorization but not settlement.
 * * `order` - Validates the transaction without an authorization (i.e. without holding funds). Useful for authorizing and capturing funds up to 90 days after the order has been placed.
 * * `sale` - Payment will be immediately submitted for settlement upon creating a transaction.
 * @param {boolean} [options.offerCredit=false] Offers PayPal Credit as the default funding instrument for the transaction. If the customer isn't pre-approved for PayPal Credit, they will be prompted to apply for it.
 * @param {string|number} [options.amount] The amount of the transaction. Required when using the Checkout flow.
 * @param {string} [options.currency] The currency code of the amount, such as 'USD'. Required when using the Checkout flow.
 * @param {string} [options.displayName] The merchant name displayed inside of the PayPal lightbox; defaults to the company name on your Braintree account
 * @param {string} [options.locale=en_US] Use this option to change the language, links, and terminology used in the PayPal flow. This locale will be used unless the buyer has set a preferred locale for their account. If an unsupported locale is supplied, a fallback locale (determined by buyer preference or browser data) will be used and no error will be thrown.
 *
 * Supported locales are:
 * `da_DK`,
 * `de_DE`,
 * `en_AU`,
 * `en_GB`,
 * `en_US`,
 * `es_ES`,
 * `fr_CA`,
 * `fr_FR`,
 * `id_ID`,
 * `it_IT`,
 * `ja_JP`,
 * `ko_KR`,
 * `nl_NL`,
 * `no_NO`,
 * `pl_PL`,
 * `pt_BR`,
 * `pt_PT`,
 * `ru_RU`,
 * `sv_SE`,
 * `th_TH`,
 * `zh_CN`,
 * `zh_HK`,
 * and `zh_TW`.
 *
 * @param {boolean} [options.enableShippingAddress=false] Returns a shipping address object in {@link PayPal#tokenize}.
 * @param {object} [options.shippingAddressOverride] Allows you to pass a shipping address you have already collected into the PayPal payment flow.
 * @param {string} options.shippingAddressOverride.line1 Street address.
 * @param {string} [options.shippingAddressOverride.line2] Street address (extended).
 * @param {string} options.shippingAddressOverride.city City.
 * @param {string} options.shippingAddressOverride.state State.
 * @param {string} options.shippingAddressOverride.postalCode Postal code.
 * @param {string} options.shippingAddressOverride.countryCode Country.
 * @param {string} [options.shippingAddressOverride.phone] Phone number.
 * @param {string} [options.shippingAddressOverride.recipientName] Recipient's name.
 * @param {boolean} [options.shippingAddressEditable=true] Set to false to disable user editing of the shipping address.
 * @param {string} [options.billingAgreementDescription] Use this option to set the description of the preapproved payment agreement visible to customers in their PayPal profile during Vault flows. Max 255 characters.
 * @param {string} [options.landingPageType] Use this option to specify the PayPal page to display when a user lands on the PayPal site to complete the payment.
 * * `login` - A PayPal account login page is used.
 * * `billing` - A non-PayPal account landing page is used.
 * @param {callback} [callback] The second argument is a PayPal `paymentId` or `billingToken` string, depending on whether `options.flow` is `checkout` or `vault`. This is also what is resolved by the promise if no callback is provided.
 * @example
 * // this paypal object is created by checkout.js
 * // see https://github.com/paypal/paypal-checkout
 * paypal.Button.render({
 *   // when createPayment resolves, it is automatically passed to checkout.js
 *   payment: function () {
 *    return paypalCheckoutInstance.createPayment({
 *       flow: 'checkout',
 *       amount: '10.00',
 *       currency: 'USD',
 *       intent: 'sale'
 *     });
 *   },
 *   // Add other options, e.g. onAuthorize, env, locale
 * }, '#paypal-button');
 *
 * @returns {Promise|void} Returns a promise if no callback is provided.
 */
PayPalCheckout.prototype.createPayment = function (options) {
  var endpoint;

  if (!options || !constants.FLOW_ENDPOINTS.hasOwnProperty(options.flow)) {
    return Promise.reject(new BraintreeError(errors.PAYPAL_FLOW_OPTION_REQUIRED));
  }

  endpoint = 'paypal_hermes/' + constants.FLOW_ENDPOINTS[options.flow];

  analytics.sendEvent(this._client, 'paypal-checkout.createPayment');
  if (options.offerCredit === true) {
    analytics.sendEvent(this._client, 'paypal-checkout.credit.offered');
  }

  return this._client.request({
    endpoint: endpoint,
    method: 'post',
    data: this._formatPaymentResourceData(options)
  }).then(function (response) {
    var flowToken;

    if (options.flow === 'checkout') {
      flowToken = response.paymentResource.paymentToken;
    } else {
      flowToken = response.agreementSetup.tokenId;
    }

    return flowToken;
  }).catch(function (err) {
    var status = err.details && err.details.httpStatus;

    if (status === 422) {
      return Promise.reject(new BraintreeError({
        type: errors.PAYPAL_INVALID_PAYMENT_OPTION.type,
        code: errors.PAYPAL_INVALID_PAYMENT_OPTION.code,
        message: errors.PAYPAL_INVALID_PAYMENT_OPTION.message,
        details: {
          originalError: err
        }
      }));
    }

    return Promise.reject(convertToBraintreeError(err, {
      type: errors.PAYPAL_FLOW_FAILED.type,
      code: errors.PAYPAL_FLOW_FAILED.code,
      message: errors.PAYPAL_FLOW_FAILED.message
    }));
  });
};

/**
 * Tokenizes the authorize data from PayPal's checkout.js library when completing a buyer approval flow.
 * When a {@link callback} is defined, invokes the callback with {@link PayPalCheckout~tokenizePayload|tokenizePayload} and returns undefined. Otherwise, returns a Promise that resolves with a {@link PayPalCheckout~tokenizePayload|tokenizePayload}.
 * @public
 * @param {object} tokenizeOptions Tokens and IDs required to tokenize the payment.
 * @param {string} tokenizeOptions.payerId Payer ID returned by PayPal `onAuthorize` callback.
 * @param {string} [tokenizeOptions.paymentId] Payment ID returned by PayPal `onAuthorize` callback.
 * @param {string} [tokenizeOptions.billingToken] Billing Token returned by PayPal `onAuthorize` callback.
 * @param {callback} [callback] The second argument, <code>payload</code>, is a {@link PayPalCheckout~tokenizePayload|tokenizePayload}. If no callback is provided, the promise resolves with a {@link PayPalCheckout~tokenizePayload|tokenizePayload}.
 * @example
 * // this paypal object is created by checkout.js
 * // see https://github.com/paypal/paypal-checkout
 * paypal.Button.render({
 *   onAuthorize: function (data, actions) {
 *     return paypalCheckoutInstance.tokenizePayment(data).then(function (payload) {
 *       // Submit payload.nonce to your server
 *     }).catch(function (err) {
 *       // handle error
 *     });
 *   },
 *   // Add other options, e.g. payment, env, locale
 * }, '#paypal-button');
 * @returns {Promise|void} Returns a promise if no callback is provided.
 */
PayPalCheckout.prototype.tokenizePayment = function (tokenizeOptions) {
  var self = this;
  var payload;
  var client = this._client;
  var options = {
    flow: tokenizeOptions.billingToken ? 'vault' : 'checkout',
    intent: tokenizeOptions.intent
  };
  var params = {
    // The paymentToken provided by Checkout.js v4 is the ECToken
    ecToken: tokenizeOptions.paymentToken,
    billingToken: tokenizeOptions.billingToken,
    payerId: tokenizeOptions.payerID,
    paymentId: tokenizeOptions.paymentID
  };

  analytics.sendEvent(client, 'paypal-checkout.tokenization.started');

  return client.request({
    endpoint: 'payment_methods/paypal_accounts',
    method: 'post',
    data: self._formatTokenizeData(options, params)
  }).then(function (response) {
    payload = self._formatTokenizePayload(response);

    analytics.sendEvent(client, 'paypal-checkout.tokenization.success');
    if (payload.creditFinancingOffered) {
      analytics.sendEvent(client, 'paypal-checkout.credit.accepted');
    }

    return payload;
  }).catch(function (err) {
    analytics.sendEvent(client, 'paypal-checkout.tokenization.failed');

    return Promise.reject(convertToBraintreeError(err, {
      type: errors.PAYPAL_ACCOUNT_TOKENIZATION_FAILED.type,
      code: errors.PAYPAL_ACCOUNT_TOKENIZATION_FAILED.code,
      message: errors.PAYPAL_ACCOUNT_TOKENIZATION_FAILED.message
    }));
  });
};

PayPalCheckout.prototype._formatPaymentResourceData = function (options) {
  var key;
  var gatewayConfiguration = this._client.getConfiguration().gatewayConfiguration;
  var paymentResource = {
    // returnUrl and cancelUrl are required in hermes create_payment_resource route
    // but are not validated and are not actually used with checkout.js
    returnUrl: 'x',
    cancelUrl: 'x',
    offerPaypalCredit: options.offerCredit === true,
    experienceProfile: {
      brandName: options.displayName || gatewayConfiguration.paypal.displayName,
      localeCode: options.locale,
      noShipping: (!options.enableShippingAddress).toString(),
      addressOverride: options.shippingAddressEditable === false,
      landingPageType: options.landingPageType
    }
  };

  if (options.flow === 'checkout') {
    paymentResource.amount = options.amount;
    paymentResource.currencyIsoCode = options.currency;

    if (options.hasOwnProperty('intent')) {
      paymentResource.intent = options.intent;
    }

    for (key in options.shippingAddressOverride) {
      if (options.shippingAddressOverride.hasOwnProperty(key)) {
        paymentResource[key] = options.shippingAddressOverride[key];
      }
    }
  } else {
    paymentResource.shippingAddress = options.shippingAddressOverride;

    if (options.billingAgreementDescription) {
      paymentResource.description = options.billingAgreementDescription;
    }
  }

  return paymentResource;
};

PayPalCheckout.prototype._formatTokenizeData = function (options, params) {
  var clientConfiguration = this._client.getConfiguration();
  var gatewayConfiguration = clientConfiguration.gatewayConfiguration;
  var isTokenizationKey = clientConfiguration.authorizationType === 'TOKENIZATION_KEY';
  var data = {
    paypalAccount: {
      correlationId: params.billingToken || params.ecToken,
      options: {
        validate: options.flow === 'vault' && !isTokenizationKey
      }
    }
  };

  if (params.billingToken) {
    data.paypalAccount.billingAgreementToken = params.billingToken;
  } else {
    data.paypalAccount.paymentToken = params.paymentId;
    data.paypalAccount.payerId = params.payerId;
    data.paypalAccount.unilateral = gatewayConfiguration.paypal.unvettedMerchant;

    if (options.intent) {
      data.paypalAccount.intent = options.intent;
    }
  }

  return data;
};

PayPalCheckout.prototype._formatTokenizePayload = function (response) {
  var payload;
  var account = {};

  if (response.paypalAccounts) {
    account = response.paypalAccounts[0];
  }

  payload = {
    nonce: account.nonce,
    details: {},
    type: account.type
  };

  if (account.details && account.details.payerInfo) {
    payload.details = account.details.payerInfo;
  }

  if (account.details && account.details.creditFinancingOffered) {
    payload.creditFinancingOffered = account.details.creditFinancingOffered;
  }

  return payload;
};

module.exports = wrapPromise.wrapPrototype(PayPalCheckout);


/***/ }),
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  LANDING_FRAME_NAME: 'braintreepaypallanding',
  FLOW_ENDPOINTS: {
    checkout: 'create_payment_resource',
    vault: 'setup_billing_agreement'
  }
};


/***/ }),
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var paymentOptionIDs = __webpack_require__(2).paymentOptionIDs;
var BasePayPalView = __webpack_require__(59);

function PayPalCreditView() {
  BasePayPalView.apply(this, arguments);

  this._isPayPalCredit = true;
}

PayPalCreditView.prototype = Object.create(BasePayPalView.prototype);
PayPalCreditView.prototype.constructor = PayPalCreditView;
PayPalCreditView.ID = PayPalCreditView.prototype.ID = paymentOptionIDs.paypalCredit;

module.exports = PayPalCreditView;


/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var BaseView = __webpack_require__(11);
var classlist = __webpack_require__(20);
var constants = __webpack_require__(2);

var addSelectionEventHandler = __webpack_require__(34);

var paymentMethodHTML = "<div class=\"braintree-method__logo\">\n  <svg width=\"40\" height=\"24\" class=\"@CLASSNAME\">\n    <use xlink:href=\"#@ICON\"></use>\n  </svg>\n</div>\n\n<div class=\"braintree-method__label\">@TITLE<br><div class=\"braintree-method__label--small\">@SUBTITLE</div></div>\n\n<div class=\"braintree-method__check-container\">\n  <div class=\"braintree-method__check\">\n    <svg height=\"100%\" width=\"100%\">\n      <use xlink:href=\"#iconCheck\"></use>\n    </svg>\n  </div>\n</div>\n";

function PaymentMethodView() {
  BaseView.apply(this, arguments);

  this._initialize();
}

PaymentMethodView.prototype = Object.create(BaseView.prototype);
PaymentMethodView.prototype.constructor = PaymentMethodView;

PaymentMethodView.prototype._initialize = function () {
  var endingInText;
  var html = paymentMethodHTML;
  var paymentMethodCardTypes = constants.paymentMethodCardTypes;
  var paymentMethodTypes = constants.paymentMethodTypes;

  this.element = document.createElement('div');
  this.element.className = 'braintree-method';
  this.element.setAttribute('tabindex', '0');

  addSelectionEventHandler(this.element, function () {
    this.model.changeActivePaymentMethod(this.paymentMethod);
  }.bind(this));

  switch (this.paymentMethod.type) {
    case paymentMethodTypes.card:
      endingInText = this.strings.endingIn.replace('{{lastTwoCardDigits}}', this.paymentMethod.details.lastTwo);
      html = html.replace(/@ICON/g, 'icon-' + paymentMethodCardTypes[this.paymentMethod.details.cardType])
        .replace(/@CLASSNAME/g, ' braintree-icon--bordered')
        .replace(/@TITLE/g, endingInText)
        .replace(/@SUBTITLE/g, this.strings[this.paymentMethod.details.cardType]);
      break;
    case paymentMethodTypes.paypal:
      html = html.replace(/@ICON/g, 'logoPayPal')
        .replace(/@CLASSNAME/g, '')
        .replace(/@TITLE/g, this.paymentMethod.details.email)
        .replace(/@SUBTITLE/g, this.strings.PayPal);
      break;
    default:
      break;
  }

  this.element.innerHTML = html;
};

PaymentMethodView.prototype.setActive = function (isActive) {
  // setTimeout required to animate addition of new payment methods
  setTimeout(function () {
    classlist.toggle(this.element, 'braintree-method--active', isActive);
  }.bind(this), 0);
};

module.exports = PaymentMethodView;


/***/ }),
/* 168 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function () {
  var el = document.createElement('div');
  var prop = 'flex-basis: 1px';
  var prefixes = [
    '-webkit-',
    '-moz-',
    '-ms-',
    '-o-',
    ''
  ];

  prefixes.forEach(function (prefix) {
    el.style.cssText += prefix + prop;
  });

  return Boolean(el.style.length);
};


/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* eslint-disable camelcase */


module.exports = {
  da: __webpack_require__(170),
  de: __webpack_require__(171),
  en: __webpack_require__(172),
  en_AU: __webpack_require__(173),
  en_GB: __webpack_require__(174),
  es: __webpack_require__(175),
  fr_CA: __webpack_require__(176),
  fr: __webpack_require__(177),
  id: __webpack_require__(178),
  it: __webpack_require__(179),
  ja: __webpack_require__(180),
  ko: __webpack_require__(181),
  nl: __webpack_require__(182),
  no: __webpack_require__(183),
  pl: __webpack_require__(184),
  pt_BR: __webpack_require__(185),
  pt: __webpack_require__(186),
  ru: __webpack_require__(187),
  sv: __webpack_require__(188),
  th: __webpack_require__(189),
  zh: __webpack_require__(190),
  zh_HK: __webpack_require__(191),
  zh_TW: __webpack_require__(192)
};
/* eslint-enable camelcase */


/***/ }),
/* 170 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  "changePaymentMethod": "Skift betalingsmetode",
  "choosePaymentMethod": "Vælg en betalingsmetode",
  "savedPaymentMethods": "Gemte betalingsmetoder",
  "payingWith": "Betaler med {{paymentSource}}",
  "chooseAnotherWayToPay": "Vælg en anden betalingsmetode",
  "chooseAWayToPay": "Vælg, hvordan du vil betale",
  "otherWaysToPay": "Andre betalingsmetoder",
  "fieldEmptyForCvv": "Du skal angive kontrolcifrene.",
  "fieldEmptyForExpirationDate": "Du skal angive udløbsdatoen.",
  "fieldEmptyForCardholderName": "Du skal angive kortindehaverens navn.",
  "fieldEmptyForNumber": "Du skal angive et nummer.",
  "fieldEmptyForPostalCode": "Du skal angive et postnummer.",
  "fieldInvalidForCvv": "Sikkerhedskoden er ugyldig.",
  "fieldInvalidForExpirationDate": "Udløbsdatoen er ugyldig.",
  "fieldInvalidForNumber": "Kortnummeret er ugyldigt.",
  "fieldInvalidForPostalCode": "Postnummeret er ugyldigt.",
  "genericError": "Der opstod fejl i vores system.",
  "hostedFieldsFailedTokenizationError": "Kontroller oplysningerne, og prøv igen.",
  "hostedFieldTokenizationNetworkError": "Netværksfejl. Prøv igen.",
  "hostedFieldsFieldsInvalidError": "Kontroller oplysningerne, og prøv igen.",
  "paypalAccountTokenizationFailed": "PayPal-kontoen blev ikke tilføjet. Prøv igen.",
  "paypalFlowFailedError": "Der kunne ikke oprettes forbindelse til PayPal. Prøv igen.",
  "paypalTokenizationRequestActiveError": "PayPal-betalingen er i gang med at blive autoriseret.",
  "unsupportedCardTypeError": "Korttypen understøttes ikke. Prøv et andet kort.",
  "cardholderNameLabel": "Kortindehaverens navn",
  "cardNumberLabel": "Kortnummer",
  "cvvLabel": "Kontrolcifre",
  "cvvThreeDigitLabelSubheading": "(3 cifre)",
  "cvvFourDigitLabelSubheading": "(4 cifre)",
  "cardholderNamePlaceholder": "Kortindehaverens navn",
  "expirationDateLabel": "Udløbsdato",
  "expirationDateLabelSubheading": "(MM/ÅÅ)",
  "expirationDatePlaceholder": "MM/ÅÅ",
  "postalCodeLabel": "Postnummer",
  "payWithCard": "Betal med kort",
  "endingIn": "Slutter med ••{{lastTwoCardDigits}}",
  "Card": "Kort",
  "PayPal": "PayPal",
  "PayPal Credit": "PayPal Credit",
  "American Express": "American Express",
  "Discover": "Discover",
  "Diners Club": "Diners Club",
  "MasterCard": "Mastercard",
  "Visa": "Visa",
  "JCB": "JCB",
  "Maestro": "Maestro",
  "UnionPay": "UnionPay"
};


/***/ }),
/* 171 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  "changePaymentMethod": "Zahlungsquelle ändern",
  "choosePaymentMethod": "Zahlungsquelle auswählen",
  "savedPaymentMethods": "Gespeicherte Zahlungsquellen",
  "payingWith": "Zahlen mit {{paymentSource}}",
  "chooseAnotherWayToPay": "Andere Zahlungsmethode wählen",
  "chooseAWayToPay": "Wie möchten Sie bezahlen?",
  "otherWaysToPay": "Andere Zahlungsmethoden",
  "fieldEmptyForCvv": "Geben Sie die Kartenprüfnummer ein.",
  "fieldEmptyForExpirationDate": "Geben Sie das Ablaufdatum ein.",
  "fieldEmptyForCardholderName": "Geben Sie den Name des Karteninhabers ein.",
  "fieldEmptyForNumber": "Geben Sie die Nummer ein.",
  "fieldEmptyForPostalCode": "Geben Sie die PLZ ein.",
  "fieldInvalidForCvv": "Die Kartenprüfnummer ist ungültig.",
  "fieldInvalidForExpirationDate": "Das Ablaufdatum ist ungültig.",
  "fieldInvalidForNumber": "Die Kreditkartennummer ist ungültig.",
  "fieldInvalidForPostalCode": "Die PLZ ist ungültig.",
  "genericError": "Bei uns ist ein Problem aufgetreten.",
  "hostedFieldsFailedTokenizationError": "Überprüfen Sie Ihre Eingabe und versuchen Sie es erneut.",
  "hostedFieldTokenizationNetworkError": "Netzwerkfehler. Versuchen Sie es erneut.",
  "hostedFieldsFieldsInvalidError": "Überprüfen Sie Ihre Eingabe und versuchen Sie es erneut.",
  "paypalAccountTokenizationFailed": "Beim Hinzufügen des PayPal-Kontos ist ein Problem aufgetreten. Versuchen Sie es erneut.",
  "paypalFlowFailedError": "Beim Verbinden mit PayPal ist ein Problem aufgetreten. Versuchen Sie es erneut.",
  "paypalTokenizationRequestActiveError": "Die PayPal-Zahlung wird bereits autorisiert.",
  "unsupportedCardTypeError": "Dieser Kreditkartentyp wird nicht unterstützt. Versuchen Sie es mit einer anderen Karte.",
  "cardholderNameLabel": "Name des Karteninhabers",
  "cardNumberLabel": "Kartennummer",
  "cvvLabel": "Prüfnr.",
  "cvvThreeDigitLabelSubheading": "(3-stellig)",
  "cvvFourDigitLabelSubheading": "(4-stellig)",
  "cardholderNamePlaceholder": "Name des Karteninhabers",
  "expirationDateLabel": "Gültig bis",
  "expirationDateLabelSubheading": "(MM/JJ)",
  "expirationDatePlaceholder": "MM/JJ",
  "postalCodeLabel": "PLZ",
  "payWithCard": "Mit Kreditkarte zahlen",
  "endingIn": "Mit den Endziffern ••{{lastTwoCardDigits}}",
  "Card": "Kreditkarte",
  "PayPal": "PayPal",
  "PayPal Credit": "PayPal Credit",
  "American Express": "American Express",
  "Discover": "Discover",
  "Diners Club": "Diners Club",
  "MasterCard": "Mastercard",
  "Visa": "Visa",
  "JCB": "JCB",
  "Maestro": "Maestro",
  "UnionPay": "UnionPay"
};


/***/ }),
/* 172 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  payingWith: 'Paying with {{paymentSource}}',
  chooseAnotherWayToPay: 'Choose another way to pay',
  chooseAWayToPay: 'Choose a way to pay',
  otherWaysToPay: 'Other ways to pay',
  // Errors
  browserNotSupported: 'Browser not supported.',
  fieldEmptyForCvv: 'Please fill out a CVV.',
  fieldEmptyForExpirationDate: 'Please fill out an expiration date.',
  fieldEmptyForCardholderName: 'Please fill out a cardholder name.',
  fieldEmptyForNumber: 'Please fill out a card number.',
  fieldEmptyForPostalCode: 'Please fill out a postal code.',
  fieldInvalidForCvv: 'This security code is not valid.',
  fieldInvalidForExpirationDate: 'This expiration date is not valid.',
  fieldInvalidForNumber: 'This card number is not valid.',
  fieldInvalidForPostalCode: 'This postal code is not valid.',
  genericError: 'Something went wrong on our end.',
  hostedFieldsFailedTokenizationError: 'Please check your information and try again.',
  hostedFieldsTokenizationCvvVerificationFailedError: 'Credit card verification failed. Please check your information and try again.',
  hostedFieldsTokenizationNetworkErrorError: 'Network error. Please try again.',
  hostedFieldsFieldsInvalidError: 'Please check your information and try again.',
  paypalAccountTokenizationFailedError: 'Something went wrong adding the PayPal account. Please try again.',
  paypalFlowFailedError: 'Something went wrong connecting to PayPal. Please try again.',
  paypalTokenizationRequestActiveError: 'PayPal payment authorization is already in progress.',
  unsupportedCardTypeError: 'This card type is not supported. Please try another card.',
  // Card form
  cardholderNameLabel: 'Cardholder Name',
  cardNumberLabel: 'Card Number',
  cvvLabel: 'CVV',
  cvvThreeDigitLabelSubheading: '(3 digits)',
  cvvFourDigitLabelSubheading: '(4 digits)',
  expirationDateLabel: 'Expiration Date',
  expirationDateLabelSubheading: '(MM/YY)',
  cardholderNamePlaceholder: 'Cardholder Name',
  expirationDatePlaceholder: 'MM/YY',
  postalCodeLabel: 'Postal Code',
  payWithCard: 'Pay with card',
  // Payment Method descriptions
  endingIn: 'Ending in ••{{lastTwoCardDigits}}',
  Card: 'Card',
  PayPal: 'PayPal',
  'PayPal Credit': 'PayPal Credit',
  'American Express': 'American Express',
  Discover: 'Discover',
  'Diners Club': 'Diners Club',
  MasterCard: 'MasterCard',
  Visa: 'Visa',
  JCB: 'JCB',
  Maestro: 'Maestro',
  UnionPay: 'UnionPay'
};


/***/ }),
/* 173 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  "changePaymentMethod": "Change Payment Method",
  "choosePaymentMethod": "Choose a payment method",
  "savedPaymentMethods": "Saved payment methods",
  "payingWith": "Paying with {{paymentSource}}",
  "chooseAnotherWayToPay": "Choose another way to pay",
  "chooseAWayToPay": "Choose a way to pay",
  "otherWaysToPay": "Other ways to pay",
  "fieldEmptyForCvv": "Please fill out a CVV.",
  "fieldEmptyForExpirationDate": "Please fill out an expiry date.",
  "fieldEmptyForCardholderName": "Please fill out a cardholder name.",
  "fieldEmptyForNumber": "Please fill out a number.",
  "fieldEmptyForPostalCode": "Please fill out a postcode.",
  "fieldInvalidForCvv": "This security code is not valid.",
  "fieldInvalidForExpirationDate": "This expiry date is not valid.",
  "fieldInvalidForNumber": "This card number is not valid.",
  "fieldInvalidForPostalCode": "This postcode is not valid.",
  "genericError": "Something went wrong on our end.",
  "hostedFieldsFailedTokenizationError": "Please check your information and try again.",
  "hostedFieldTokenizationNetworkError": "Network error. Please try again.",
  "hostedFieldsFieldsInvalidError": "Please check your information and try again.",
  "paypalAccountTokenizationFailed": "Something went wrong while adding the PayPal account. Please try again.",
  "paypalFlowFailedError": "Something went wrong while connecting to PayPal. Please try again.",
  "paypalTokenizationRequestActiveError": "PayPal payment authorisation is already in progress.",
  "unsupportedCardTypeError": "This card type is not supported. Please try another card.",
  "cardholderNameLabel": "Cardholder Name",
  "cardNumberLabel": "Card Number",
  "cvvLabel": "CVV",
  "cvvThreeDigitLabelSubheading": "(3 digits)",
  "cvvFourDigitLabelSubheading": "(4 digits)",
  "cardholderNamePlaceholder": "Cardholder Name",
  "expirationDateLabel": "Expiry date",
  "expirationDateLabelSubheading": "(MM/YY)",
  "expirationDatePlaceholder": "MM/YY",
  "postalCodeLabel": "Postcode",
  "payWithCard": "Pay with credit or debit card",
  "endingIn": "Ending in ••{{lastTwoCardDigits}}",
  "Card": "Card",
  "PayPal": "PayPal",
  "PayPal Credit": "PayPal Credit",
  "American Express": "American Express",
  "Discover": "Discover",
  "Diners Club": "Diners Club",
  "MasterCard": "Mastercard",
  "Visa": "Visa",
  "JCB": "JCB",
  "Maestro": "Maestro",
  "UnionPay": "UnionPay"
};


/***/ }),
/* 174 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  "changePaymentMethod": "Change Funding Source",
  "choosePaymentMethod": "Choose a funding source",
  "savedPaymentMethods": "Saved payment methods",
  "payingWith": "Paying with {{paymentSource}}",
  "chooseAnotherWayToPay": "Choose another way to pay",
  "chooseAWayToPay": "Choose a way to pay",
  "otherWaysToPay": "Other ways to pay",
  "fieldEmptyForCvv": "Please fill in a CSC.",
  "fieldEmptyForExpirationDate": "Please fill in an expiry date.",
  "fieldEmptyForCardholderName": "Please fill in a cardholder name.",
  "fieldEmptyForNumber": "Please fill in a number.",
  "fieldEmptyForPostalCode": "Please fill in a postcode.",
  "fieldInvalidForCvv": "This security code is not valid.",
  "fieldInvalidForExpirationDate": "This expiry date is not valid.",
  "fieldInvalidForNumber": "This card number is not valid.",
  "fieldInvalidForPostalCode": "This postcode is not valid.",
  "genericError": "Something went wrong on our end.",
  "hostedFieldsFailedTokenizationError": "Please check your information and try again.",
  "hostedFieldTokenizationNetworkError": "Network error. Please try again.",
  "hostedFieldsFieldsInvalidError": "Please check your information and try again.",
  "paypalAccountTokenizationFailed": "Something went wrong while adding the PayPal account. Please try again.",
  "paypalFlowFailedError": "Something went wrong while connecting to PayPal. Please try again.",
  "paypalTokenizationRequestActiveError": "PayPal payment authorisation is already in progress.",
  "unsupportedCardTypeError": "This card type is not supported. Please try another card.",
  "cardholderNameLabel": "Cardholder Name",
  "cardNumberLabel": "Card Number",
  "cvvLabel": "CSC",
  "cvvThreeDigitLabelSubheading": "(3 digits)",
  "cvvFourDigitLabelSubheading": "(4 digits)",
  "cardholderNamePlaceholder": "Cardholder Name",
  "expirationDateLabel": "Expiry Date",
  "expirationDateLabelSubheading": "(MM/YY)",
  "expirationDatePlaceholder": "MM/YY",
  "postalCodeLabel": "Postcode",
  "payWithCard": "Pay with card",
  "endingIn": "Ending in ••{{lastTwoCardDigits}}",
  "Card": "Card",
  "PayPal": "PayPal",
  "PayPal Credit": "PayPal Credit",
  "American Express": "American Express",
  "Discover": "Discover",
  "Diners Club": "Diners Club",
  "MasterCard": "Mastercard",
  "Visa": "Visa",
  "JCB": "JCB",
  "Maestro": "Maestro",
  "UnionPay": "UnionPay"
};


/***/ }),
/* 175 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  "changePaymentMethod": "Cambiar forma de pago",
  "choosePaymentMethod": "Seleccionar forma de pago",
  "savedPaymentMethods": "Formas de pago guardadas",
  "payingWith": "Pago con {{paymentSource}}",
  "chooseAnotherWayToPay": "Selecciona otra forma de pago.",
  "chooseAWayToPay": "Selecciona una forma de pago.",
  "otherWaysToPay": "Otras formas de pago",
  "fieldEmptyForCvv": "Escribe el código CVV.",
  "fieldEmptyForExpirationDate": "Escribe la fecha de vencimiento.",
  "fieldEmptyForCardholderName": "Escribe el nombre de un titular de la tarjeta.",
  "fieldEmptyForNumber": "Escribe un número.",
  "fieldEmptyForPostalCode": "Escribe el código postal.",
  "fieldInvalidForCvv": "Este código de seguridad no es válido.",
  "fieldInvalidForExpirationDate": "Esta fecha de vencimiento no es válida.",
  "fieldInvalidForNumber": "Este número de tarjeta no es válido.",
  "fieldInvalidForPostalCode": "Este código postal no es válido.",
  "genericError": "Hemos tenido algún problema.",
  "hostedFieldsFailedTokenizationError": "Comprueba la información e inténtalo de nuevo.",
  "hostedFieldTokenizationNetworkError": "Error de red. Inténtalo de nuevo.",
  "hostedFieldsFieldsInvalidError": "Comprueba la información e inténtalo de nuevo.",
  "paypalAccountTokenizationFailed": "Se ha producido un error al vincular la cuenta PayPal. Inténtalo de nuevo.",
  "paypalFlowFailedError": "Se ha producido un error al conectarse a PayPal. Inténtalo de nuevo.",
  "paypalTokenizationRequestActiveError": "Ya hay una autorización de pago de PayPal en curso.",
  "unsupportedCardTypeError": "No se admite este tipo de tarjeta. Prueba con otra tarjeta.",
  "cardholderNameLabel": "Nombre del titular de la tarjeta",
  "cardNumberLabel": "Número de tarjeta",
  "cvvLabel": "CVV",
  "cvvThreeDigitLabelSubheading": "(3 dígitos)",
  "cvvFourDigitLabelSubheading": "(4 dígitos)",
  "cardholderNamePlaceholder": "Nombre del titular de la tarjeta",
  "expirationDateLabel": "Fecha de vencimiento",
  "expirationDateLabelSubheading": "(MM/AA)",
  "expirationDatePlaceholder": "MM/AA",
  "postalCodeLabel": "Código postal",
  "payWithCard": "Pagar con tarjeta",
  "endingIn": "Terminada en •• {{lastTwoCardDigits}}",
  "Card": "Tarjeta",
  "PayPal": "PayPal",
  "PayPal Credit": "PayPal Credit",
  "American Express": "American Express",
  "Discover": "Discover",
  "Diners Club": "Diners Club",
  "MasterCard": "Mastercard",
  "Visa": "Visa",
  "JCB": "JCB",
  "Maestro": "Maestro",
  "UnionPay": "UnionPay"
};


/***/ }),
/* 176 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  "changePaymentMethod": "Modifier le mode de paiement ",
  "choosePaymentMethod": "Choisir un mode de paiement",
  "savedPaymentMethods": "Modes de paiement enregistrés",
  "payingWith": "Payer avec {{paymentSource}}",
  "chooseAnotherWayToPay": "Choisir un autre mode de paiement",
  "chooseAWayToPay": "Choisir le mode de paiement",
  "otherWaysToPay": "Autres modes de paiement",
  "fieldEmptyForCvv": "Veuillez saisir un cryptogramme visuel.",
  "fieldEmptyForExpirationDate": "Veuillez saisir une date d'expiration.",
  "fieldEmptyForCardholderName": "Veuillez saisir un nom de titulaire de la carte.",
  "fieldEmptyForNumber": "Veuillez saisir un numéro.",
  "fieldEmptyForPostalCode": "Veuillez saisir un code postal.",
  "fieldInvalidForCvv": "Ce cryptogramme visuel n'est pas valide.",
  "fieldInvalidForExpirationDate": "Cette date d'expiration n'est pas valide.",
  "fieldInvalidForNumber": "Ce numéro de carte n'est pas valide.",
  "fieldInvalidForPostalCode": "Ce code postal n'est pas valide.",
  "genericError": "Une erreur s'est produite de notre côté.",
  "hostedFieldsFailedTokenizationError": "Vérifiez vos informations, puis réessayez.",
  "hostedFieldTokenizationNetworkError": "Erreur réseau. Veuillez réessayer.",
  "hostedFieldsFieldsInvalidError": "Vérifiez vos informations, puis réessayez.",
  "paypalAccountTokenizationFailed": "Une erreur s'est produite au cours de l'enregistrement du compte PayPal. Veuillez réessayer.",
  "paypalFlowFailedError": "Une erreur s'est produite au cours de la connexion à PayPal. Veuillez réessayer.",
  "paypalTokenizationRequestActiveError": "L'autorisation de paiement PayPal est déjà en cours.",
  "unsupportedCardTypeError": "Ce type de carte n'est pas pris en charge. Veuillez essayer une autre carte.",
  "cardholderNameLabel": "Nom du titulaire de la carte",
  "cardNumberLabel": "Numéro de carte ",
  "cvvLabel": "CVV",
  "cvvThreeDigitLabelSubheading": "(3 chiffres)",
  "cvvFourDigitLabelSubheading": "(4 chiffres)",
  "cardholderNamePlaceholder": "Nom du titulaire de la carte",
  "expirationDateLabel": "Date d\\'expiration ",
  "expirationDateLabelSubheading": "(MM/AA)",
  "expirationDatePlaceholder": "MM/AA",
  "postalCodeLabel": "Code postal",
  "payWithCard": "Payer par carte",
  "endingIn": "Se terminant par ••{{lastTwoCardDigits}}",
  "Card": "Carte",
  "PayPal": "PayPal",
  "PayPal Credit": "Crédit PayPal",
  "American Express": "American Express",
  "Discover": "Discover",
  "Diners Club": "Diners Club",
  "MasterCard": "Mastercard",
  "Visa": "Visa",
  "JCB": "JCB",
  "Maestro": "Maestro",
  "UnionPay": "UnionPay"
};


/***/ }),
/* 177 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  "changePaymentMethod": "Modifier le mode de paiement",
  "choosePaymentMethod": "Choisir un mode de paiement",
  "savedPaymentMethods": "Modes de paiement enregistrés",
  "payingWith": "Payer avec {{paymentSource}}",
  "chooseAnotherWayToPay": "Choisissez une autre façon de payer.",
  "chooseAWayToPay": "Choisissez comment payer.",
  "otherWaysToPay": "Autres façons de payer",
  "fieldEmptyForCvv": "Entrez un cryptogramme visuel.",
  "fieldEmptyForExpirationDate": "Entrez une date d'expiration.",
  "fieldEmptyForCardholderName": "Entrez un nom du titulaire de la carte.",
  "fieldEmptyForNumber": "Entrez un numéro.",
  "fieldEmptyForPostalCode": "Entrez un code postal.",
  "fieldInvalidForCvv": "Ce cryptogramme visuel n'est pas valide.",
  "fieldInvalidForExpirationDate": "Cette date d'expiration n'est pas valide.",
  "fieldInvalidForNumber": "Ce numéro de carte n'est pas valide.",
  "fieldInvalidForPostalCode": "Ce code postal n'est pas valide.",
  "genericError": "Une erreur est survenue.",
  "hostedFieldsFailedTokenizationError": "Vérifiez vos informations et réessayez.",
  "hostedFieldTokenizationNetworkError": "Erreur réseau. Réessayez.",
  "hostedFieldsFieldsInvalidError": "Vérifiez vos informations et réessayez.",
  "paypalAccountTokenizationFailed": "Une erreur est survenue lors de l'ajout du compte PayPal. Réessayez.",
  "paypalFlowFailedError": "Une erreur est survenue lors de la connexion à PayPal. Réessayez.",
  "paypalTokenizationRequestActiveError": "L'autorisation de paiement PayPal est déjà en cours.",
  "unsupportedCardTypeError": "Ce type de carte n'est pas pris en charge. Essayez une autre carte.",
  "cardholderNameLabel": "Nom du titulaire de la carte",
  "cardNumberLabel": "Nº de carte",
  "cvvLabel": "Cryptogramme visuel",
  "cvvThreeDigitLabelSubheading": "(3 chiffres)",
  "cvvFourDigitLabelSubheading": "(4 chiffres)",
  "cardholderNamePlaceholder": "Nom du titulaire de la carte",
  "expirationDateLabel": "Date d'expiration",
  "expirationDateLabelSubheading": "(MM/AA)",
  "expirationDatePlaceholder": "MM/AA",
  "postalCodeLabel": "Code postal",
  "payWithCard": "Payer par carte",
  "endingIn": "Se terminant par ••{{lastTwoCardDigits}}",
  "Card": "Carte",
  "PayPal": "PayPal",
  "PayPal Credit": "PayPal Credit",
  "American Express": "American Express",
  "Discover": "Discover",
  "Diners Club": "Diners Club",
  "MasterCard": "Mastercard",
  "Visa": "Visa",
  "JCB": "JCB",
  "Maestro": "Maestro",
  "UnionPay": "UnionPay"
};


/***/ }),
/* 178 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  "changePaymentMethod": "Ubah Metode Pembayaran",
  "choosePaymentMethod": "Pilih metode pembayaran",
  "savedPaymentMethods": "Metode Pembayaran Tersimpan",
  "payingWith": "Membayar dengan {{paymentSource}}",
  "chooseAnotherWayToPay": "Pilih metode pembayaran lain",
  "chooseAWayToPay": "Pilih metode pembayaran",
  "otherWaysToPay": "Metode pembayaran lain",
  "fieldEmptyForCvv": "Masukkan CVV.",
  "fieldEmptyForExpirationDate": "Masukkan tanggal akhir berlaku.",
  "fieldEmptyForCardholderName": "Masukkan nama pemegang kartu.",
  "fieldEmptyForNumber": "Masukkan nomor.",
  "fieldEmptyForPostalCode": "Masukkan kode pos.",
  "fieldInvalidForCvv": "Kode keamanan ini tidak valid.",
  "fieldInvalidForExpirationDate": "Tanggal akhir berlaku ini tidak valid.",
  "fieldInvalidForNumber": "Nomor kartu ini tidak valid.",
  "fieldInvalidForPostalCode": "Kode pos ini tidak valid.",
  "genericError": "Terjadi kesalahan pada sistem kami. ",
  "hostedFieldsFailedTokenizationError": "Periksa informasi Anda dan coba lagi.",
  "hostedFieldTokenizationNetworkError": "Masalah jaringan. Coba lagi.",
  "hostedFieldsFieldsInvalidError": "Periksa informasi Anda dan coba lagi.",
  "paypalAccountTokenizationFailed": "Terjadi kesalahan saat menambahkan rekening PayPal. Coba lagi.",
  "paypalFlowFailedError": "Terjadi kesalahan saat menyambung ke PayPal. Coba lagi.",
  "paypalTokenizationRequestActiveError": "Otorisasi pembayaran PayPal sedang diproses.",
  "unsupportedCardTypeError": "Jenis kartu ini tidak didukung. Coba kartu lainnya.",
  "cardholderNameLabel": "Nama Pemegang Kartu",
  "cardNumberLabel": "Nomor Kartu",
  "cvvLabel": "CVV",
  "cvvThreeDigitLabelSubheading": "(3 angka)",
  "cvvFourDigitLabelSubheading": "(4 angka)",
  "cardholderNamePlaceholder": "Nama Pemegang Kartu",
  "expirationDateLabel": "Tanggal Kedaluwarsa",
  "expirationDateLabelSubheading": "(BB/TT)",
  "expirationDatePlaceholder": "BB/TT",
  "postalCodeLabel": "Kode Pos",
  "payWithCard": "Bayar dengan kartu",
  "endingIn": "Berakhiran ••{{lastTwoCardDigits}}",
  "Card": "Kartu",
  "PayPal": "PayPal",
  "PayPal Credit": "PayPal Credit",
  "American Express": "American Express",
  "Discover": "Discover",
  "Diners Club": "Diners Club",
  "MasterCard": "Mastercard",
  "Visa": "Visa",
  "JCB": "JCB",
  "Maestro": "Maestro",
  "UnionPay": "UnionPay"
};


/***/ }),
/* 179 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  "changePaymentMethod": "Modifica metodo di pagamento",
  "choosePaymentMethod": "Scegli un metodo di pagamento",
  "savedPaymentMethods": "Metodi di pagamento salvati",
  "payingWith": "Pagamento con {{paymentSource}}",
  "chooseAnotherWayToPay": "Scegli di pagare in un altro modo",
  "chooseAWayToPay": "Scegli come pagare",
  "otherWaysToPay": "Altri modi di pagare",
  "fieldEmptyForCvv": "Immetti il codice di sicurezza (CVV).",
  "fieldEmptyForExpirationDate": "Immetti la data di scadenza.",
  "fieldEmptyForCardholderName": "Immetti il nome del titolare della carta.",
  "fieldEmptyForNumber": "Immetti il numero di carta.",
  "fieldEmptyForPostalCode": "Immetti il CAP.",
  "fieldInvalidForCvv": "Il codice di sicurezza non è valido.",
  "fieldInvalidForExpirationDate": "La data di scadenza non è valida.",
  "fieldInvalidForNumber": "Il numero di carta non è valido.",
  "fieldInvalidForPostalCode": "Il CAP non è valido.",
  "genericError": "Si è verificato un errore nei nostri sistemi.",
  "hostedFieldsFailedTokenizationError": "Controlla e riprova.",
  "hostedFieldTokenizationNetworkError": "Errore di rete. Riprova.",
  "hostedFieldsFieldsInvalidError": "Controlla e riprova.",
  "paypalAccountTokenizationFailed": "Si è verificato un errore collegando il conto PayPal. Riprova.",
  "paypalFlowFailedError": "Si è verificato un errore di connessione a PayPal. Riprova.",
  "paypalTokenizationRequestActiveError": "L'autorizzazione di pagamento PayPal è già in corso.",
  "unsupportedCardTypeError": "Questo tipo di carta non è supportato. Prova con un'altra carta.",
  "cardholderNameLabel": "Titolare della carta",
  "cardNumberLabel": "Numero di carta",
  "cvvLabel": "CVV",
  "cvvThreeDigitLabelSubheading": "(3 cifre)",
  "cvvFourDigitLabelSubheading": "(4 cifre)",
  "cardholderNamePlaceholder": "Titolare della carta",
  "expirationDateLabel": "Data di scadenza",
  "expirationDateLabelSubheading": "(MM/AA)",
  "expirationDatePlaceholder": "MM/AA",
  "postalCodeLabel": "CAP",
  "payWithCard": "Paga con una carta",
  "endingIn": "Le cui ultime cifre sono ••{{lastTwoCardDigits}}",
  "Card": "Carta",
  "PayPal": "PayPal",
  "PayPal Credit": "PayPal Credit",
  "American Express": "American Express",
  "Discover": "Discover",
  "Diners Club": "Diners Club",
  "MasterCard": "Mastercard",
  "Visa": "Visa",
  "JCB": "JCB",
  "Maestro": "Maestro",
  "UnionPay": "UnionPay"
};


/***/ }),
/* 180 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  "changePaymentMethod": "支払方法を変更する",
  "choosePaymentMethod": "支払方法を選択する",
  "savedPaymentMethods": "保存済みの支払方法",
  "payingWith": "{{paymentSource}}で支払う",
  "chooseAnotherWayToPay": "別の支払方法を選択する",
  "chooseAWayToPay": "支払方法を選択する",
  "otherWaysToPay": "その他の支払方法",
  "fieldEmptyForCvv": "カード確認コードを入力してください。",
  "fieldEmptyForExpirationDate": "有効期限を入力してください。",
  "fieldEmptyForCardholderName": "カード保有者の名前を入力してください。",
  "fieldEmptyForNumber": "番号を入力してください。",
  "fieldEmptyForPostalCode": "郵便番号を入力してください。",
  "fieldInvalidForCvv": "このセキュリティコードは無効です。",
  "fieldInvalidForExpirationDate": "この有効期限は無効です。",
  "fieldInvalidForNumber": "このカード番号は無効です。",
  "fieldInvalidForPostalCode": "この郵便番号は無効です。",
  "genericError": "弊社側で問題が発生しました。",
  "hostedFieldsFailedTokenizationError": "情報を確認してもう一度お試しください。",
  "hostedFieldTokenizationNetworkError": "ネットワークエラーです。もう一度お試しください。",
  "hostedFieldsFieldsInvalidError": "情報を確認してもう一度お試しください。",
  "paypalAccountTokenizationFailed": "PayPalアカウントの追加で問題が発生しました。もう一度お試しください。",
  "paypalFlowFailedError": "PayPalへの接続に問題が発生しました。もう一度お試しください。",
  "paypalTokenizationRequestActiveError": "PayPal支払いの承認はすでに処理中です。",
  "unsupportedCardTypeError": "このカードタイプはサポートされていません。別のカードをご使用ください。",
  "cardholderNameLabel": "カード保有者の名前",
  "cardNumberLabel": "カード番号",
  "cvvLabel": "カード確認コード",
  "cvvThreeDigitLabelSubheading": "(3桁)",
  "cvvFourDigitLabelSubheading": "(4桁)",
  "cardholderNamePlaceholder": "カード保有者の名前",
  "expirationDateLabel": "有効期限",
  "expirationDateLabelSubheading": "(MM/YY)",
  "expirationDatePlaceholder": "MM/YY",
  "postalCodeLabel": "郵便番号",
  "payWithCard": "カードで支払う",
  "endingIn": "x-{{lastTwoCardDigits}}",
  "Card": "カード",
  "PayPal": "PayPal",
  "PayPal Credit": "PayPal Credit",
  "American Express": "American Express",
  "Discover": "Discover",
  "Diners Club": "Diners Club",
  "MasterCard": "Mastercard",
  "Visa": "Visa",
  "JCB": "JCB",
  "Maestro": "Maestro",
  "UnionPay": "銀聯(UnionPay)"
};


/***/ }),
/* 181 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  "changePaymentMethod": "결제수단 변경",
  "choosePaymentMethod": "결제수단 선택",
  "savedPaymentMethods": "저장된 결제수단",
  "payingWith": "{{paymentSource}}(으)로 결제",
  "chooseAnotherWayToPay": "다른 결제수단 선택",
  "chooseAWayToPay": "결제수단 선택",
  "otherWaysToPay": "다른 방법으로 결제",
  "fieldEmptyForCvv": "CVV를 입력하세요.",
  "fieldEmptyForExpirationDate": "만료일을 입력하세요.",
  "fieldEmptyForCardholderName": "카드 소유자 이름을 입력하세요.",
  "fieldEmptyForNumber": "번호를 입력하세요.",
  "fieldEmptyForPostalCode": "우편번호를 입력하세요.",
  "fieldInvalidForCvv": "이 보안 코드가 올바르지 않습니다.",
  "fieldInvalidForExpirationDate": "이 만료일이 올바르지 않습니다.",
  "fieldInvalidForNumber": "이 카드 번호가 올바르지 않습니다.",
  "fieldInvalidForPostalCode": "이 우편번호가 올바르지 않습니다.",
  "genericError": "저희 쪽에 문제가 발생했습니다.",
  "hostedFieldsFailedTokenizationError": "정보를 확인하고 다시 시도해 주세요.",
  "hostedFieldTokenizationNetworkError": "네트워크 오류가 발생했습니다. 다시 시도해 주세요.",
  "hostedFieldsFieldsInvalidError": "정보를 확인하고 다시 시도해 주세요.",
  "paypalAccountTokenizationFailed": "PayPal 계정을 추가하는 동안 문제가 발생했습니다. 다시 시도해 주세요.",
  "paypalFlowFailedError": "PayPal 계정을 연결하는 동안 문제가 발생했습니다. 다시 시도해 주세요.",
  "paypalTokenizationRequestActiveError": "PayPal 결제 승인이 이미 진행 중입니다.",
  "unsupportedCardTypeError": "이 카드 형식은 지원되지 않습니다. 다른 카드로 시도해 주세요.",
  "cardholderNameLabel": "카드 소유자 이름",
  "cardNumberLabel": "카드 번호",
  "cvvLabel": "CVV",
  "cvvThreeDigitLabelSubheading": "(3자리)",
  "cvvFourDigitLabelSubheading": "(4자리)",
  "cardholderNamePlaceholder": "카드 소유자 이름",
  "expirationDateLabel": "만료일",
  "expirationDateLabelSubheading": "(MM/YY)",
  "expirationDatePlaceholder": "MM/YY",
  "postalCodeLabel": "우편번호",
  "payWithCard": "카드로 결제",
  "endingIn": "끝 번호: ••{{lastTwoCardDigits}}",
  "Card": "카드",
  "PayPal": "PayPal",
  "PayPal Credit": "PayPal Credit",
  "American Express": "American Express",
  "Discover": "Discover",
  "Diners Club": "Diners Club",
  "MasterCard": "Mastercard",
  "Visa": "Visa",
  "JCB": "JCB",
  "Maestro": "Maestro",
  "UnionPay": "UnionPay"
};


/***/ }),
/* 182 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  "changePaymentMethod": "Betaalmethode wijzigen",
  "choosePaymentMethod": "Kies een betaalmethode",
  "savedPaymentMethods": "Opgeslagen betaalmethoden",
  "payingWith": "Betalen met {{paymentSource}}",
  "chooseAnotherWayToPay": "Kies een andere betaalmethode",
  "chooseAWayToPay": "Kies een betaalwijze",
  "otherWaysToPay": "Andere manieren om te betalen",
  "fieldEmptyForCvv": "Vul een CSC in.",
  "fieldEmptyForExpirationDate": "Vul een vervaldatum in.",
  "fieldEmptyForCardholderName": "Vul een naam voor de kaarthouder in.",
  "fieldEmptyForNumber": "Vul een nummer in.",
  "fieldEmptyForPostalCode": "Vul een postcode in.",
  "fieldInvalidForCvv": "Deze CSC is ongeldig.",
  "fieldInvalidForExpirationDate": "Deze vervaldatum is ongeldig.",
  "fieldInvalidForNumber": "Dit creditcardnummer is ongeldig.",
  "fieldInvalidForPostalCode": "Deze postcode is ongeldig.",
  "genericError": "Er is iets fout gegaan.",
  "hostedFieldsFailedTokenizationError": "Controleer uw gegevens en probeer het opnieuw.",
  "hostedFieldTokenizationNetworkError": "Netwerkfout. Probeer het opnieuw.",
  "hostedFieldsFieldsInvalidError": "Controleer uw gegevens en probeer het opnieuw.",
  "paypalAccountTokenizationFailed": "Er is iets misgegaan bij het toevoegen van de PayPal-rekening. Probeer het opnieuw.",
  "paypalFlowFailedError": "Er is iets misgegaan bij de verbinding met PayPal. Probeer het opnieuw.",
  "paypalTokenizationRequestActiveError": "De autorisatie van de PayPal-betaling is al in behandeling.",
  "unsupportedCardTypeError": "Dit type creditcard wordt niet ondersteund. Gebruik een andere creditcard.",
  "cardholderNameLabel": "Naam kaarthouder",
  "cardNumberLabel": "Creditcardnummer",
  "cvvLabel": "CVV",
  "cvvThreeDigitLabelSubheading": "(3 cijfers)",
  "cvvFourDigitLabelSubheading": "(4 cijfers)",
  "cardholderNamePlaceholder": "Naam kaarthouder",
  "expirationDateLabel": "Vervaldatum",
  "expirationDateLabelSubheading": "(MM/JJ)",
  "expirationDatePlaceholder": "MM/JJ",
  "postalCodeLabel": "Postcode",
  "payWithCard": "Betalen met creditcard",
  "endingIn": "Eindigend op •• {{lastTwoCardDigits}}",
  "Card": "Creditcard",
  "PayPal": "PayPal",
  "PayPal Credit": "PayPal Credit",
  "American Express": "American Express",
  "Discover": "Discover",
  "Diners Club": "Diners Club",
  "MasterCard": "Mastercard",
  "Visa": "Visa",
  "JCB": "JCB",
  "Maestro": "Maestro",
  "UnionPay": "UnionPay"
};


/***/ }),
/* 183 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  "changePaymentMethod": "Endre betalingsmetode",
  "choosePaymentMethod": "Velg en betalingsmetode",
  "savedPaymentMethods": "Lagrede betalingsmetoder",
  "payingWith": "Betaling med {{paymentSource}}",
  "chooseAnotherWayToPay": "Velg en annen måte å betale på",
  "chooseAWayToPay": "Velg betalingsmåte",
  "otherWaysToPay": "Andre måter å betale på",
  "fieldEmptyForCvv": "Oppgi en kortsikkerhetskode (CVV).",
  "fieldEmptyForExpirationDate": "Oppgi en utløpsdato.",
  "fieldEmptyForCardholderName": "Oppgi et navn for kortinnehaveren.",
  "fieldEmptyForNumber": "Oppgi et nummer.",
  "fieldEmptyForPostalCode": "Oppgi et postnummer.",
  "fieldInvalidForCvv": "Denne sikkerhetskoden er ikke gyldig.",
  "fieldInvalidForExpirationDate": "Denne utløpsdatoen er ikke gyldig.",
  "fieldInvalidForNumber": "Dette kortnummeret er ikke gyldig.",
  "fieldInvalidForPostalCode": "Dette postnummeret er ikke gyldig.",
  "genericError": "Noe gikk galt hos oss.",
  "hostedFieldsFailedTokenizationError": "Kontroller informasjonen og prøv på nytt.",
  "hostedFieldTokenizationNetworkError": "Nettverksfeil. Prøv på nytt.",
  "hostedFieldsFieldsInvalidError": "Kontroller informasjonen og prøv på nytt.",
  "paypalAccountTokenizationFailed": "Noe gikk galt da PayPal-kontoen ble lagt til. Prøv på nytt.",
  "paypalFlowFailedError": "Det oppsto et problem med tilkoblingen til PayPal. Prøv på nytt.",
  "paypalTokenizationRequestActiveError": "Godkjenning av PayPal-betalingen pågår allerede",
  "unsupportedCardTypeError": "Denne korttypen støttes ikke. Prøv med et annet kort.",
  "cardholderNameLabel": "Kortinnehaverens navn",
  "cardNumberLabel": "Kortnummer",
  "cvvLabel": "CVV",
  "cvvThreeDigitLabelSubheading": "(3 siffer)",
  "cvvFourDigitLabelSubheading": "(4 siffer)",
  "cardholderNamePlaceholder": "Kortinnehaverens navn",
  "expirationDateLabel": "Utløpsdato",
  "expirationDateLabelSubheading": "(MM/ÅÅ)",
  "expirationDatePlaceholder": "MM/ÅÅ",
  "postalCodeLabel": "Postnummer",
  "payWithCard": "Betal med kort",
  "endingIn": "Som slutter på •• {{lastTwoCardDigits}}",
  "Card": "Kort",
  "PayPal": "PayPal",
  "PayPal Credit": "PayPal Credit",
  "American Express": "American Express",
  "Discover": "Discover",
  "Diners Club": "Diners Club",
  "MasterCard": "Mastercard",
  "Visa": "Visa",
  "JCB": "JCB",
  "Maestro": "Maestro",
  "UnionPay": "UnionPay"
};


/***/ }),
/* 184 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  "changePaymentMethod": "Zmień formę płatności",
  "choosePaymentMethod": "Wybierz formę płatności",
  "savedPaymentMethods": "Zapisane formy płatności",
  "payingWith": "Forma płatności: {{paymentSource}}",
  "chooseAnotherWayToPay": "Wybierz inną formę płatności",
  "chooseAWayToPay": "Wybierz sposób płatności",
  "otherWaysToPay": "Inne formy płatności",
  "fieldEmptyForCvv": "Podaj kod bezpieczeństwa.",
  "fieldEmptyForExpirationDate": "Podaj datę ważności.",
  "fieldEmptyForCardholderName": "Podaj imię i nazwisko posiadacza karty.",
  "fieldEmptyForNumber": "Podaj numer.",
  "fieldEmptyForPostalCode": "Podaj kod pocztowy.",
  "fieldInvalidForCvv": "Podany kod bezpieczeństwa jest nieprawidłowy.",
  "fieldInvalidForExpirationDate": "Podana data ważności jest nieprawidłowa.",
  "fieldInvalidForNumber": "Podany numer karty jest nieprawidłowy.",
  "fieldInvalidForPostalCode": "Podany kod pocztowy jest nieprawidłowy.",
  "genericError": "Wystąpił błąd po naszej stronie. ",
  "hostedFieldsFailedTokenizationError": "Sprawdź swoje informacje i spróbuj ponownie.",
  "hostedFieldTokenizationNetworkError": "Błąd sieci. Spróbuj ponownie.",
  "hostedFieldsFieldsInvalidError": "Sprawdź swoje informacje i spróbuj ponownie.",
  "paypalAccountTokenizationFailed": "Coś poszło nie tak podczas dodawania konta PayPal. Spróbuj ponownie.",
  "paypalFlowFailedError": "Coś poszło nie tak podczas łączenia z systemem PayPal. Spróbuj ponownie.",
  "paypalTokenizationRequestActiveError": "Autoryzacja płatności PayPal jest już w trakcie realizacji.",
  "unsupportedCardTypeError": "Ten typ karty nie jest obsługiwany. Spróbuj użyć innej karty.",
  "cardholderNameLabel": "Imię i nazwisko posiadacza karty",
  "cardNumberLabel": "Numer karty",
  "cvvLabel": "Kod CVC",
  "cvvThreeDigitLabelSubheading": "(3 cyfry)",
  "cvvFourDigitLabelSubheading": "(4 cyfry)",
  "cardholderNamePlaceholder": "Imię i nazwisko posiadacza karty",
  "expirationDateLabel": "Data ważności",
  "expirationDateLabelSubheading": "(MM/RR)",
  "expirationDatePlaceholder": "MM/RR",
  "postalCodeLabel": "Kod pocztowy",
  "payWithCard": "Zapłać kartą",
  "endingIn": "O numerze zakończonym cyframi •• {{lastTwoCardDigits}}",
  "Card": "Karta",
  "PayPal": "PayPal",
  "PayPal Credit": "PayPal Credit",
  "American Express": "American Express",
  "Discover": "Discover",
  "Diners Club": "Diners Club",
  "MasterCard": "Mastercard",
  "Visa": "Visa",
  "JCB": "JCB",
  "Maestro": "Maestro",
  "UnionPay": "UnionPay"
};


/***/ }),
/* 185 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  "changePaymentMethod": "Alterar meio de pagamento",
  "choosePaymentMethod": "Escolha um meio de pagamento",
  "savedPaymentMethods": "Meios de pagamento salvos",
  "payingWith": "Pagando com {{paymentSource}}",
  "chooseAnotherWayToPay": "Escolher outro meio de pagamento",
  "chooseAWayToPay": "Escolher um meio de pagamento",
  "otherWaysToPay": "Outro meio de pagamento",
  "fieldEmptyForCvv": "Informe o Código de Segurança.",
  "fieldEmptyForExpirationDate": "Informe a data de vencimento.",
  "fieldEmptyForCardholderName": "Informe o nome do titular do cartão.",
  "fieldEmptyForNumber": "Informe um número.",
  "fieldEmptyForPostalCode": "Informe um CEP.",
  "fieldInvalidForCvv": "Este código de segurança não é válido.",
  "fieldInvalidForExpirationDate": "Esta data de vencimento não é válida.",
  "fieldInvalidForNumber": "O número do cartão não é válido.",
  "fieldInvalidForPostalCode": "Este CEP não é válido.",
  "genericError": "Ocorreu um erro.",
  "hostedFieldsFailedTokenizationError": "Verifique as informações e tente novamente.",
  "hostedFieldTokenizationNetworkError": "Erro de rede. Tente novamente.",
  "hostedFieldsFieldsInvalidError": "Verifique as informações e tente novamente.",
  "paypalAccountTokenizationFailed": "Ocorreu um erro ao adicionar a conta do PayPal. Tente novamente.",
  "paypalFlowFailedError": "Ocorreu um erro de conexão com o PayPal. Tente novamente.",
  "paypalTokenizationRequestActiveError": "A autorização de pagamento do PayPal já está em andamento.",
  "unsupportedCardTypeError": "Este tipo de cartão não é aceito. Experimente outro cartão.",
  "cardholderNameLabel": "Nome do titular do cartão",
  "cardNumberLabel": "Número do cartão",
  "cvvLabel": "Cód. Seg.",
  "cvvThreeDigitLabelSubheading": "(3 dígitos)",
  "cvvFourDigitLabelSubheading": "(4 dígitos)",
  "cardholderNamePlaceholder": "Nome do titular do cartão",
  "expirationDateLabel": "Data de vencimento",
  "expirationDateLabelSubheading": "(MM/AA)",
  "expirationDatePlaceholder": "MM/AA",
  "postalCodeLabel": "CEP",
  "payWithCard": "Pague com seu cartão",
  "endingIn": "Com final ••{{lastTwoCardDigits}}",
  "Card": "Cartão",
  "PayPal": "PayPal",
  "PayPal Credit": "Crédito do PayPal",
  "American Express": "American Express",
  "Discover": "Discover",
  "Diners Club": "Diners Club",
  "MasterCard": "Mastercard",
  "Visa": "Visa",
  "JCB": "JCB",
  "Maestro": "Maestro",
  "UnionPay": "UnionPay"
};


/***/ }),
/* 186 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  "changePaymentMethod": "Alterar meio de pagamento",
  "choosePaymentMethod": "Escolha um meio de pagamento",
  "savedPaymentMethods": "Formas de pagamento guardadas",
  "payingWith": "Pagar com {{paymentSource}}",
  "chooseAnotherWayToPay": "Escolher outra forma de pagamento",
  "chooseAWayToPay": "Escolha um meio de pagamento",
  "otherWaysToPay": "Outras formas de pagamento",
  "fieldEmptyForCvv": "Introduza o código CVV.",
  "fieldEmptyForExpirationDate": "Introduza a data de validade.",
  "fieldEmptyForCardholderName": "Introduza um nome do titular do cartão.",
  "fieldEmptyForNumber": "Introduza um número.",
  "fieldEmptyForPostalCode": "Introduza o código postal.",
  "fieldInvalidForCvv": "Este código de segurança não é válido.",
  "fieldInvalidForExpirationDate": "Esta data de validade não é correta.",
  "fieldInvalidForNumber": "Este número de cartão não é válido.",
  "fieldInvalidForPostalCode": "Este código postal não é válido.",
  "genericError": "Tudo indica que ocorreu um problema.",
  "hostedFieldsFailedTokenizationError": "Verifique os dados e tente novamente.",
  "hostedFieldTokenizationNetworkError": "Erro de rede. Tente novamente.",
  "hostedFieldsFieldsInvalidError": "Verifique os dados e tente novamente.",
  "paypalAccountTokenizationFailed": "Ocorreu um erro ao associar a conta PayPal. Tente novamente.",
  "paypalFlowFailedError": "Ocorreu um erro na ligação com PayPal. Tente novamente.",
  "paypalTokenizationRequestActiveError": "Já há uma autorização de pagamento PayPal em curso.",
  "unsupportedCardTypeError": "Este tipo de cartão não é suportado. Tente usar outro cartão.",
  "cardholderNameLabel": "Nome do titular do cartão",
  "cardNumberLabel": "Número do cartão",
  "cvvLabel": "CVV",
  "cvvThreeDigitLabelSubheading": "(3 dígitos)",
  "cvvFourDigitLabelSubheading": "(4 dígitos)",
  "cardholderNamePlaceholder": "Nome do titular do cartão",
  "expirationDateLabel": "Data de validade",
  "expirationDateLabelSubheading": "(MM/AA)",
  "expirationDatePlaceholder": "MM/AA",
  "postalCodeLabel": "Código postal",
  "payWithCard": "Pagar com cartão",
  "endingIn": "Terminado em ••{{lastTwoCardDigits}}",
  "Card": "Cartão",
  "PayPal": "PayPal",
  "PayPal Credit": "PayPal Credit",
  "American Express": "American Express",
  "Discover": "Discover",
  "Diners Club": "Diners Club",
  "MasterCard": "Mastercard",
  "Visa": "Visa",
  "JCB": "JCB",
  "Maestro": "Maestro",
  "UnionPay": "UnionPay"
};


/***/ }),
/* 187 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  "changePaymentMethod": "Изменить способ оплаты",
  "choosePaymentMethod": "Выберите способ оплаты",
  "savedPaymentMethods": "Сохраненные способы оплаты",
  "payingWith": "Способы оплаты: {{paymentSource}}",
  "chooseAnotherWayToPay": "Выберите другой способ оплаты",
  "chooseAWayToPay": "Выберите способ оплаты",
  "otherWaysToPay": "Другие способы оплаты",
  "fieldEmptyForCvv": "Укажите код безопасности.",
  "fieldEmptyForExpirationDate": "Укажите дату окончания срока действия.",
  "fieldEmptyForCardholderName": "Введите имя и фамилию владельца карты.",
  "fieldEmptyForNumber": "Введите номер.",
  "fieldEmptyForPostalCode": "Укажите почтовый индекс.",
  "fieldInvalidForCvv": "Этот код безопасности недействителен.",
  "fieldInvalidForExpirationDate": "Эта дата окончания срока действия недействительна.",
  "fieldInvalidForNumber": "Этот номер карты недействителен.",
  "fieldInvalidForPostalCode": "Этот почтовый индекс недействителен.",
  "genericError": "Возникла проблема с нашей стороны.",
  "hostedFieldsFailedTokenizationError": "Проверьте правильность ввода данных и повторите попытку.",
  "hostedFieldTokenizationNetworkError": "Ошибка сети. Повторите попытку.",
  "hostedFieldsFieldsInvalidError": "Проверьте правильность ввода данных и повторите попытку.",
  "paypalAccountTokenizationFailed": "Что-то пошло не так — не удалось добавить учетную запись PayPal. Повторите попытку.",
  "paypalFlowFailedError": "Что-то пошло не так — не удалось подключиться к системе PayPal. Повторите попытку.",
  "paypalTokenizationRequestActiveError": "Выполняется авторизация платежа PayPal.",
  "unsupportedCardTypeError": "Этот тип карты не поддерживается. Попробуйте воспользоваться другой картой.",
  "cardholderNameLabel": "Имя и фамилия владельца",
  "cardNumberLabel": "Номер карты",
  "cvvLabel": "Код безопасности",
  "cvvThreeDigitLabelSubheading": "(3 цифры)",
  "cvvFourDigitLabelSubheading": "(4 цифры)",
  "cardholderNamePlaceholder": "Имя и фамилия владельца",
  "expirationDateLabel": "Действует до",
  "expirationDateLabelSubheading": "(ММ/ГГ)",
  "expirationDatePlaceholder": "ММ/ГГ",
  "postalCodeLabel": "Индекс",
  "payWithCard": "Оплатить картой",
  "endingIn": "Последние две цифры номера карты: ••{{lastTwoCardDigits}}",
  "Card": "Карта",
  "PayPal": "PayPal",
  "PayPal Credit": "PayPal Credit",
  "American Express": "American Express",
  "Discover": "Discover",
  "Diners Club": "Diners Club",
  "MasterCard": "Mastercard",
  "Visa": "Visa",
  "JCB": "JCB",
  "Maestro": "Maestro",
  "UnionPay": "UnionPay"
};


/***/ }),
/* 188 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  "changePaymentMethod": "Ändra betalningsmetod",
  "choosePaymentMethod": "Välj betalningsmetod",
  "savedPaymentMethods": "Sparade betalningsmetoder",
  "payingWith": "Betalas med {{paymentSource}}",
  "chooseAnotherWayToPay": "Välj ett annat sätt att betala",
  "chooseAWayToPay": "Välj hur du vill betala",
  "otherWaysToPay": "Andra sätt att betala",
  "fieldEmptyForCvv": "Fyll i en CVV-kod.",
  "fieldEmptyForExpirationDate": "Fyll i ett utgångsdatum.",
  "fieldEmptyForCardholderName": "Fyll i kortinnehavarens namn.",
  "fieldEmptyForNumber": "Fyll i ett nummer.",
  "fieldEmptyForPostalCode": "Fyll i ett postnummer.",
  "fieldInvalidForCvv": "Den här säkerhetskoden är inte giltig.",
  "fieldInvalidForExpirationDate": "Det här utgångsdatumet är inte giltigt.",
  "fieldInvalidForNumber": "Det här kortnumret är inte giltigt.",
  "fieldInvalidForPostalCode": "Det här postnumret är inte giltigt.",
  "genericError": "Ett fel uppstod.",
  "hostedFieldsFailedTokenizationError": "Kontrollera uppgifterna och försök igen.",
  "hostedFieldTokenizationNetworkError": "Nätverksfel. Försök igen.",
  "hostedFieldsFieldsInvalidError": "Kontrollera uppgifterna och försök igen.",
  "paypalAccountTokenizationFailed": "Ett fel uppstod när PayPal-kontot skulle läggas till. Försök igen.",
  "paypalFlowFailedError": "Ett fel uppstod när anslutningen till PayPal skulle upprättas. Försök igen.",
  "paypalTokenizationRequestActiveError": "Betalningsgodkännandet för PayPal behandlas redan.",
  "unsupportedCardTypeError": "Den här korttypen stöds inte. Pröva med ett annat kort.",
  "cardholderNameLabel": "Kortinnehavarens namn",
  "cardNumberLabel": "Kortnummer",
  "cvvLabel": "CVV",
  "cvvThreeDigitLabelSubheading": "(3 siffror)",
  "cvvFourDigitLabelSubheading": "(4 siffror)",
  "cardholderNamePlaceholder": "Kortinnehavarens namn",
  "expirationDateLabel": "Utgångsdatum",
  "expirationDateLabelSubheading": "(MM/ÅÅ)",
  "expirationDatePlaceholder": "MM/ÅÅ",
  "postalCodeLabel": "Postnummer",
  "payWithCard": "Betala med kort",
  "endingIn": "Slutar på ••{{lastTwoCardDigits}}",
  "Card": "Kort",
  "PayPal": "PayPal",
  "PayPal Credit": "PayPal-kredit",
  "American Express": "American Express",
  "Discover": "Discover",
  "Diners Club": "Diners Club",
  "MasterCard": "Mastercard",
  "Visa": "Visa",
  "JCB": "JCB",
  "Maestro": "Maestro",
  "UnionPay": "UnionPay"
};


/***/ }),
/* 189 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  "changePaymentMethod": "เปลี่ยนวิธีการชำระเงิน",
  "choosePaymentMethod": "เลือกวิธีชำระเงิน",
  "savedPaymentMethods": "วิธีการชำระเงินที่บันทึกไว้",
  "payingWith": "การชำระเงินด้วย {{paymentSource}}",
  "chooseAnotherWayToPay": "เลือกวิธีอื่นเพื่อชำระเงิน",
  "chooseAWayToPay": "เลือกวิธีชำระเงิน",
  "otherWaysToPay": "วิธีอื่นๆ ในการชำระเงิน",
  "fieldEmptyForCvv": "โปรดกรอก CVV (รหัสการตรวจสอบยืนยันบัตร)",
  "fieldEmptyForExpirationDate": "โปรดกรอกวันที่หมดอายุ",
  "fieldEmptyForCardholderName": "โปรดกรอกชื่อเจ้าของบัตร",
  "fieldEmptyForNumber": "โปรดกรอกหมายเลข",
  "fieldEmptyForPostalCode": "โปรดกรอกรหัสไปรษณีย์",
  "fieldInvalidForCvv": "รหัสความปลอดภัยนี้ไม่ถูกต้อง",
  "fieldInvalidForExpirationDate": "วันที่หมดอายุนี้ไม่ถูกต้อง",
  "fieldInvalidForNumber": "หมายเลขบัตรนี้ไม่ถูกต้อง",
  "fieldInvalidForPostalCode": "รหัสไปรษณีย์นี้ไม่ถูกต้อง",
  "genericError": "เกิดข้อผิดพลาดขึ้นในระบบของเรา",
  "hostedFieldsFailedTokenizationError": "โปรดตรวจสอบข้อมูลของคุณ แล้วลองอีกครั้ง",
  "hostedFieldTokenizationNetworkError": "ข้อผิดพลาดด้านเครือข่าย โปรดลองอีกครั้ง",
  "hostedFieldsFieldsInvalidError": "โปรดตรวจสอบข้อมูลของคุณ แล้วลองอีกครั้ง",
  "paypalAccountTokenizationFailed": "เกิดข้อผิดพลาดในการเพิ่มบัญชี PayPal โปรดลองอีกครั้ง",
  "paypalFlowFailedError": "เกิดข้อผิดพลาดในการเชื่อมต่อกับ PayPal โปรดลองอีกครั้ง",
  "paypalTokenizationRequestActiveError": "การอนุญาตการชำระเงินของ PayPal อยู่ในระหว่างดำเนินการ",
  "unsupportedCardTypeError": "ไม่รองรับบัตรประเภทนี้ โปรดลองใช้บัตรใบอื่น",
  "cardholderNameLabel": "ชื่อเจ้าของบัตร",
  "cardNumberLabel": "หมายเลขบัตร",
  "cvvLabel": "CVV",
  "cvvThreeDigitLabelSubheading": "(3 หลัก)",
  "cvvFourDigitLabelSubheading": "(4 หลัก)",
  "cardholderNamePlaceholder": "ชื่อเจ้าของบัตร",
  "expirationDateLabel": "วันหมดอายุ",
  "expirationDateLabelSubheading": "(ดด/ปป)",
  "expirationDatePlaceholder": "ดด/ปป",
  "postalCodeLabel": "รหัสไปรษณีย์",
  "payWithCard": "ชำระเงินด้วยบัตร",
  "endingIn": "ลงท้ายด้วย ••{{lastTwoCardDigits}}",
  "Card": "บัตร",
  "PayPal": "PayPal",
  "PayPal Credit": "PayPal Credit",
  "American Express": "American Express",
  "Discover": "Discover",
  "Diners Club": "Diners Club",
  "MasterCard": "Mastercard",
  "Visa": "Visa",
  "JCB": "JCB",
  "Maestro": "Maestro",
  "UnionPay": "UnionPay"
};


/***/ }),
/* 190 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  "changePaymentMethod": "更改付款方式",
  "choosePaymentMethod": "选择付款方式",
  "savedPaymentMethods": "已保存的付款方式",
  "payingWith": "正在使用{{paymentSource}}付款",
  "chooseAnotherWayToPay": "选择其他付款方式",
  "chooseAWayToPay": "选择付款方式",
  "otherWaysToPay": "其他付款方式",
  "fieldEmptyForCvv": "请填写CVV。",
  "fieldEmptyForExpirationDate": "请填写有效期限。",
  "fieldEmptyForCardholderName": "请填写持卡人的姓名。",
  "fieldEmptyForNumber": "请填写一个号码。",
  "fieldEmptyForPostalCode": "请填写邮政编码。",
  "fieldInvalidForCvv": "此安全代码无效。",
  "fieldInvalidForExpirationDate": "此有效期限无效。",
  "fieldInvalidForNumber": "此卡号无效。",
  "fieldInvalidForPostalCode": "此邮政编码无效。",
  "genericError": "我们遇到了一些问题",
  "hostedFieldsFailedTokenizationError": "请检查您的信息，然后重试。",
  "hostedFieldTokenizationNetworkError": "网络错误。请重试。",
  "hostedFieldsFieldsInvalidError": "请检查您的信息，然后重试。",
  "paypalAccountTokenizationFailed": "添加PayPal账户时出错。请重试。",
  "paypalFlowFailedError": "连接到PayPal时出错。请重试。",
  "paypalTokenizationRequestActiveError": "PayPal付款授权已在进行中。",
  "unsupportedCardTypeError": "不支持该卡类型。请尝试其他卡。",
  "cardholderNameLabel": "持卡人姓名",
  "cardNumberLabel": "卡号",
  "cvvLabel": "CVV",
  "cvvThreeDigitLabelSubheading": "（3位数）",
  "cvvFourDigitLabelSubheading": "（4位数）",
  "cardholderNamePlaceholder": "持卡人姓名",
  "expirationDateLabel": "有效期限",
  "expirationDateLabelSubheading": "（MM/YY）",
  "expirationDatePlaceholder": "MM/YY",
  "postalCodeLabel": "邮政编码",
  "payWithCard": "用卡付款",
  "endingIn": "尾号为{{lastTwoCardDigits}}",
  "Card": "卡",
  "PayPal": "PayPal",
  "PayPal Credit": "PayPal Credit",
  "American Express": "American Express",
  "Discover": "Discover",
  "Diners Club": "Diners Club",
  "MasterCard": "Mastercard",
  "Visa": "Visa",
  "JCB": "JCB",
  "Maestro": "Maestro",
  "UnionPay": "银联"
};


/***/ }),
/* 191 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  "changePaymentMethod": "變更付款方式",
  "choosePaymentMethod": "選擇付款方式",
  "savedPaymentMethods": "已儲存的付款方式",
  "payingWith": "付款方式為 {{paymentSource}}",
  "chooseAnotherWayToPay": "選擇其他付款方式",
  "chooseAWayToPay": "選擇付款方式",
  "otherWaysToPay": "其他付款方式",
  "fieldEmptyForCvv": "請填寫信用卡認證碼。",
  "fieldEmptyForExpirationDate": "請填寫到期日。",
  "fieldEmptyForCardholderName": "請填寫持卡人的名字。",
  "fieldEmptyForNumber": "請填寫號碼。",
  "fieldEmptyForPostalCode": "請填寫郵遞區號。",
  "fieldInvalidForCvv": "此安全代碼無效。",
  "fieldInvalidForExpirationDate": "此到期日無效。",
  "fieldInvalidForNumber": "此卡號無效。",
  "fieldInvalidForPostalCode": "此郵遞區號無效。",
  "genericError": "系統發生錯誤。",
  "hostedFieldsFailedTokenizationError": "請檢查你的資料並再試一次。",
  "hostedFieldTokenizationNetworkError": "網絡錯誤。請重試。",
  "hostedFieldsFieldsInvalidError": "請檢查你的資料並再試一次。",
  "paypalAccountTokenizationFailed": "加入 PayPal 帳戶時發生錯誤。請重試。",
  "paypalFlowFailedError": "連接 PayPal 時發生錯誤。請重試。",
  "paypalTokenizationRequestActiveError": "PayPal 付款授權已在處理中。",
  "unsupportedCardTypeError": "不可使用此信用卡類型。請改用其他信用卡。",
  "cardholderNameLabel": "持卡人名字",
  "cardNumberLabel": "卡號",
  "cvvLabel": "信用卡認證碼",
  "cvvThreeDigitLabelSubheading": "（3 位數）",
  "cvvFourDigitLabelSubheading": "（4 位數）",
  "cardholderNamePlaceholder": "持卡人名字",
  "expirationDateLabel": "到期日",
  "expirationDateLabelSubheading": "(MM/YY)",
  "expirationDatePlaceholder": "MM/YY",
  "postalCodeLabel": "郵遞區號",
  "payWithCard": "使用信用卡付款",
  "endingIn": "最後兩位數為••{{lastTwoCardDigits}}",
  "Card": "信用卡",
  "PayPal": "PayPal",
  "PayPal Credit": "PayPal Credit",
  "American Express": "美國運通",
  "Discover": "Discover",
  "Diners Club": "Diners Club",
  "MasterCard": "Mastercard",
  "Visa": "Visa",
  "JCB": "JCB",
  "Maestro": "Maestro",
  "UnionPay": "UnionPay"
};


/***/ }),
/* 192 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  "changePaymentMethod": "變更支付購物款項方式",
  "choosePaymentMethod": "選擇付款方式",
  "savedPaymentMethods": "已儲存的付款方式",
  "payingWith": "以 {{paymentSource}} 付款",
  "chooseAnotherWayToPay": "選擇支付款項的以其他方式付款",
  "chooseAWayToPay": "選擇支付款項的方式",
  "otherWaysToPay": "其他付款方式",
  "fieldEmptyForCvv": "請填妥信用卡驗證碼。",
  "fieldEmptyForExpirationDate": "請填妥到期日。",
  "fieldEmptyForCardholderName": "請填妥持卡人姓名。",
  "fieldEmptyForNumber": "請填妥號碼。",
  "fieldEmptyForPostalCode": "請填寫郵遞區號。",
  "fieldInvalidForCvv": "這組安全代碼無效。",
  "fieldInvalidForExpirationDate": "此到期日無效。",
  "fieldInvalidForNumber": "此卡號無效。",
  "fieldInvalidForPostalCode": "此郵遞區號無效。",
  "genericError": "我們的系統發生問題。",
  "hostedFieldsFailedTokenizationError": "請檢查你的資料並重試。",
  "hostedFieldTokenizationNetworkError": "網路錯誤。請重試。",
  "hostedFieldsFieldsInvalidError": "請檢查你的資料並重試。",
  "paypalAccountTokenizationFailed": "新增 PayPal 帳戶時，系統發生錯誤。請重試。",
  "paypalFlowFailedError": "連結至 PayPal 時，系統發生錯誤。請重試。",
  "paypalTokenizationRequestActiveError": "PayPal 支付款項的授權已在處理中。",
  "unsupportedCardTypeError": "不支援此卡片類型。請嘗試其他卡片。",
  "cardholderNameLabel": "持卡人姓名",
  "cardNumberLabel": "卡號",
  "cvvLabel": "CVV",
  "cvvThreeDigitLabelSubheading": "（3 位數）",
  "cvvFourDigitLabelSubheading": "（4 位數）",
  "cardholderNamePlaceholder": "持卡人姓名",
  "expirationDateLabel": "到期日",
  "expirationDateLabelSubheading": "（月 / 年）",
  "expirationDatePlaceholder": "月 / 年",
  "postalCodeLabel": "郵遞區號",
  "payWithCard": "使用信用卡 / 扣帳卡付款",
  "endingIn": "你的末兩碼為 •• {{lastTwoCardDigits}}",
  "Card": "信用卡或扣帳卡",
  "PayPal": "PayPal",
  "PayPal Credit": "PayPal Credit",
  "American Express": "美國運通",
  "Discover": "Discover",
  "Diners Club": "Diners Club",
  "MasterCard": "Mastercard",
  "Visa": "Visa",
  "JCB": "JCB",
  "Maestro": "Maestro",
  "UnionPay": "UnionPay"
};


/***/ }),
/* 193 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var analytics = __webpack_require__(15);
var find = __webpack_require__(194);
var uuid = __webpack_require__(63);
var DropinError = __webpack_require__(5);
var kebabCaseToCamelCase = __webpack_require__(195);
var WHITELISTED_DATA_ATTRIBUTES = [
  'locale',
  'payment-option-priority',

  'data-collector.kount',
  'data-collector.paypal',

  'card.cardholderName',
  'card.cardholderName.required',

  'paypal.amount',
  'paypal.currency',
  'paypal.flow',

  'paypal-credit.amount',
  'paypal-credit.currency',
  'paypal-credit.flow'
];

function injectHiddenInput(name, value, form) {
  var input = form.querySelector('[name="' + name + '"]');

  if (!input) {
    input = document.createElement('input');
    input.type = 'hidden';
    input.name = name;
    form.appendChild(input);
  }

  input.value = value;
}

function addCompositeKeyValuePairToObject(obj, key, value) {
  var decomposedKeys = key.split('.');
  var topLevelKey = kebabCaseToCamelCase(decomposedKeys[0]);

  if (decomposedKeys.length === 1) {
    obj[topLevelKey] = deserialize(value);
  } else {
    obj[topLevelKey] = obj[topLevelKey] || {};
    addCompositeKeyValuePairToObject(obj[topLevelKey], decomposedKeys.slice(1).join('.'), value);
  }
}

function deserialize(value) {
  try {
    return JSON.parse(value);
  } catch (e) {
    return value;
  }
}

function createFromScriptTag(createFunction, scriptTag) {
  var authorization, container, createOptions, form;

  if (!scriptTag) {
    return;
  }

  authorization = scriptTag.getAttribute('data-braintree-dropin-authorization');

  if (!authorization) {
    throw new DropinError('Authorization not found in data-braintree-dropin-authorization attribute');
  }

  container = document.createElement('div');
  container.id = 'braintree-dropin-' + uuid();

  form = find.findParentForm(scriptTag);

  if (!form) {
    throw new DropinError('No form found for script tag integration.');
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();
  });

  form.insertBefore(container, scriptTag);

  createOptions = {
    authorization: authorization,
    container: container
  };

  WHITELISTED_DATA_ATTRIBUTES.forEach(function (compositeKey) {
    var value = scriptTag.getAttribute('data-' + compositeKey);

    if (value == null) {
      return;
    }

    addCompositeKeyValuePairToObject(createOptions, compositeKey, value);
  });

  createFunction(createOptions).then(function (instance) {
    analytics.sendEvent(instance._client, 'integration-type.script-tag');
    form.addEventListener('submit', function () {
      instance.requestPaymentMethod(function (requestPaymentError, payload) {
        if (requestPaymentError) {
          return;
        }

        injectHiddenInput('payment_method_nonce', payload.nonce, form);

        if (payload.deviceData) {
          injectHiddenInput('device_data', payload.deviceData, form);
        }

        form.submit();
      });
    });
  });
}

module.exports = createFromScriptTag;


/***/ }),
/* 194 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function findParentForm(element) {
  var parentNode = element.parentNode;

  if (!parentNode || parentNode.nodeName === 'FORM') {
    return parentNode;
  }

  return findParentForm(parentNode);
}

module.exports = {
  findParentForm: findParentForm
};


/***/ }),
/* 195 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function kebabCaseToCamelCase(kebab) {
  var parts = kebab.split('-');
  var first = parts.shift();
  var capitalizedParts = parts.map(function (part) {
    return part.charAt(0).toUpperCase() + part.substring(1);
  });

  return [first].concat(capitalizedParts).join('');
}

module.exports = kebabCaseToCamelCase;


/***/ }),
/* 196 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function(process) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ThemeProvider", function() { return ThemeProvider; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "withTheme", function() { return withTheme; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "A", function() { return A; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Abbr", function() { return Abbr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Acronym", function() { return Acronym; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Address", function() { return Address; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Applet", function() { return Applet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Area", function() { return Area; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Article", function() { return Article; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Aside", function() { return Aside; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Audio", function() { return Audio; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "B", function() { return B; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Base", function() { return Base; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Basefont", function() { return Basefont; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Bdi", function() { return Bdi; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Bdo", function() { return Bdo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Bgsound", function() { return Bgsound; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Big", function() { return Big; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Blink", function() { return Blink; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Blockquote", function() { return Blockquote; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Body", function() { return Body; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Br", function() { return Br; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Button", function() { return Button; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Canvas", function() { return Canvas; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Caption", function() { return Caption; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Center", function() { return Center; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Cite", function() { return Cite; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Code", function() { return Code; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Col", function() { return Col; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Colgroup", function() { return Colgroup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Command", function() { return Command; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Content", function() { return Content; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Data", function() { return Data; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Datalist", function() { return Datalist; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Dd", function() { return Dd; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Del", function() { return Del; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Details", function() { return Details; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Dfn", function() { return Dfn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Dialog", function() { return Dialog; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Dir", function() { return Dir; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Div", function() { return Div; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Dl", function() { return Dl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Dt", function() { return Dt; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Element", function() { return Element; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Em", function() { return Em; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Embed", function() { return Embed; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Fieldset", function() { return Fieldset; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Figcaption", function() { return Figcaption; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Figure", function() { return Figure; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Font", function() { return Font; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Footer", function() { return Footer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Form", function() { return Form; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Frame", function() { return Frame; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Frameset", function() { return Frameset; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "H1", function() { return H1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "H2", function() { return H2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "H3", function() { return H3; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "H4", function() { return H4; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "H5", function() { return H5; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "H6", function() { return H6; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Head", function() { return Head; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Header", function() { return Header; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Hgroup", function() { return Hgroup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Hr", function() { return Hr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Html", function() { return Html; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "I", function() { return I; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Iframe", function() { return Iframe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Image", function() { return Image; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Img", function() { return Img; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Input", function() { return Input; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Ins", function() { return Ins; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Isindex", function() { return Isindex; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Kbd", function() { return Kbd; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Keygen", function() { return Keygen; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Label", function() { return Label; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Legend", function() { return Legend; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Li", function() { return Li; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Link", function() { return Link; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Listing", function() { return Listing; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Main", function() { return Main; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MapTag", function() { return MapTag; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Mark", function() { return Mark; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Marquee", function() { return Marquee; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MathTag", function() { return MathTag; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Menu", function() { return Menu; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Menuitem", function() { return Menuitem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Meta", function() { return Meta; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Meter", function() { return Meter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Multicol", function() { return Multicol; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Nav", function() { return Nav; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Nextid", function() { return Nextid; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Nobr", function() { return Nobr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Noembed", function() { return Noembed; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Noframes", function() { return Noframes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Noscript", function() { return Noscript; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ObjectTag", function() { return ObjectTag; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Ol", function() { return Ol; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Optgroup", function() { return Optgroup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Option", function() { return Option; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Output", function() { return Output; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "P", function() { return P; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Param", function() { return Param; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Picture", function() { return Picture; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Plaintext", function() { return Plaintext; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Pre", function() { return Pre; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Progress", function() { return Progress; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Q", function() { return Q; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Rb", function() { return Rb; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Rbc", function() { return Rbc; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Rp", function() { return Rp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Rt", function() { return Rt; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Rtc", function() { return Rtc; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Ruby", function() { return Ruby; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "S", function() { return S; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Samp", function() { return Samp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Script", function() { return Script; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Section", function() { return Section; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Select", function() { return Select; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Shadow", function() { return Shadow; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Slot", function() { return Slot; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Small", function() { return Small; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Source", function() { return Source; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Spacer", function() { return Spacer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Span", function() { return Span; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Strike", function() { return Strike; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Strong", function() { return Strong; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Style", function() { return Style; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Sub", function() { return Sub; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Summary", function() { return Summary; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Sup", function() { return Sup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Svg", function() { return Svg; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Table", function() { return Table; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Tbody", function() { return Tbody; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Td", function() { return Td; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Template", function() { return Template; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Textarea", function() { return Textarea; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Tfoot", function() { return Tfoot; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Th", function() { return Th; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Thead", function() { return Thead; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Time", function() { return Time; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Title", function() { return Title; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Tr", function() { return Tr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Track", function() { return Track; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Tt", function() { return Tt; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "U", function() { return U; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Ul", function() { return Ul; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Var", function() { return Var; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Video", function() { return Video; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Wbr", function() { return Wbr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Xmp", function() { return Xmp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AltGlyph", function() { return AltGlyph; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AltGlyphDef", function() { return AltGlyphDef; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AltGlyphItem", function() { return AltGlyphItem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Animate", function() { return Animate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AnimateColor", function() { return AnimateColor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AnimateMotion", function() { return AnimateMotion; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AnimateTransform", function() { return AnimateTransform; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Animation", function() { return Animation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Circle", function() { return Circle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ClipPath", function() { return ClipPath; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ColorProfile", function() { return ColorProfile; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Cursor", function() { return Cursor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Defs", function() { return Defs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Desc", function() { return Desc; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Discard", function() { return Discard; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Ellipse", function() { return Ellipse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FeBlend", function() { return FeBlend; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FeColorMatrix", function() { return FeColorMatrix; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FeComponentTransfer", function() { return FeComponentTransfer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FeComposite", function() { return FeComposite; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FeConvolveMatrix", function() { return FeConvolveMatrix; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FeDiffuseLighting", function() { return FeDiffuseLighting; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FeDisplacementMap", function() { return FeDisplacementMap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FeDistantLight", function() { return FeDistantLight; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FeDropShadow", function() { return FeDropShadow; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FeFlood", function() { return FeFlood; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FeFuncA", function() { return FeFuncA; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FeFuncB", function() { return FeFuncB; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FeFuncG", function() { return FeFuncG; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FeFuncR", function() { return FeFuncR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FeGaussianBlur", function() { return FeGaussianBlur; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FeImage", function() { return FeImage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FeMerge", function() { return FeMerge; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FeMergeNode", function() { return FeMergeNode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FeMorphology", function() { return FeMorphology; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FeOffset", function() { return FeOffset; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FePointLight", function() { return FePointLight; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FeSpecularLighting", function() { return FeSpecularLighting; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FeSpotLight", function() { return FeSpotLight; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FeTile", function() { return FeTile; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FeTurbulence", function() { return FeTurbulence; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Filter", function() { return Filter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FontFace", function() { return FontFace; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FontFaceFormat", function() { return FontFaceFormat; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FontFaceName", function() { return FontFaceName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FontFaceSrc", function() { return FontFaceSrc; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FontFaceUri", function() { return FontFaceUri; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ForeignObject", function() { return ForeignObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "G", function() { return G; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Glyph", function() { return Glyph; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GlyphRef", function() { return GlyphRef; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Handler", function() { return Handler; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Hatch", function() { return Hatch; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Hatchpath", function() { return Hatchpath; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Hkern", function() { return Hkern; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Line", function() { return Line; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LinearGradient", function() { return LinearGradient; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Listener", function() { return Listener; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Marker", function() { return Marker; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Mask", function() { return Mask; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Mesh", function() { return Mesh; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Meshgradient", function() { return Meshgradient; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Meshpatch", function() { return Meshpatch; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Meshrow", function() { return Meshrow; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Metadata", function() { return Metadata; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MissingGlyph", function() { return MissingGlyph; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Mpath", function() { return Mpath; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Path", function() { return Path; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Pattern", function() { return Pattern; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Polygon", function() { return Polygon; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Polyline", function() { return Polyline; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Prefetch", function() { return Prefetch; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RadialGradient", function() { return RadialGradient; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Rect", function() { return Rect; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SetTag", function() { return SetTag; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SolidColor", function() { return SolidColor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Solidcolor", function() { return Solidcolor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Stop", function() { return Stop; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Switch", function() { return Switch; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SymbolTag", function() { return SymbolTag; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Tbreak", function() { return Tbreak; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Text", function() { return Text; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TextArea", function() { return TextArea; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TextPath", function() { return TextPath; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Tref", function() { return Tref; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Tspan", function() { return Tspan; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Unknown", function() { return Unknown; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Use", function() { return Use; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "View", function() { return View; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Vkern", function() { return Vkern; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_glamor__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_glamor___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_glamor__);



var htmlTagNames = [
  "a",
  "abbr",
  "acronym",
  "address",
  "applet",
  "area",
  "article",
  "aside",
  "audio",
  "b",
  "base",
  "basefont",
  "bdi",
  "bdo",
  "bgsound",
  "big",
  "blink",
  "blockquote",
  "body",
  "br",
  "button",
  "canvas",
  "caption",
  "center",
  "cite",
  "code",
  "col",
  "colgroup",
  "command",
  "content",
  "data",
  "datalist",
  "dd",
  "del",
  "details",
  "dfn",
  "dialog",
  "dir",
  "div",
  "dl",
  "dt",
  "element",
  "em",
  "embed",
  "fieldset",
  "figcaption",
  "figure",
  "font",
  "footer",
  "form",
  "frame",
  "frameset",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "head",
  "header",
  "hgroup",
  "hr",
  "html",
  "i",
  "iframe",
  "image",
  "img",
  "input",
  "ins",
  "isindex",
  "kbd",
  "keygen",
  "label",
  "legend",
  "li",
  "link",
  "listing",
  "main",
  "map",
  "mark",
  "marquee",
  "math",
  "menu",
  "menuitem",
  "meta",
  "meter",
  "multicol",
  "nav",
  "nextid",
  "nobr",
  "noembed",
  "noframes",
  "noscript",
  "object",
  "ol",
  "optgroup",
  "option",
  "output",
  "p",
  "param",
  "picture",
  "plaintext",
  "pre",
  "progress",
  "q",
  "rb",
  "rbc",
  "rp",
  "rt",
  "rtc",
  "ruby",
  "s",
  "samp",
  "script",
  "section",
  "select",
  "shadow",
  "slot",
  "small",
  "source",
  "spacer",
  "span",
  "strike",
  "strong",
  "style",
  "sub",
  "summary",
  "sup",
  "svg",
  "table",
  "tbody",
  "td",
  "template",
  "textarea",
  "tfoot",
  "th",
  "thead",
  "time",
  "title",
  "tr",
  "track",
  "tt",
  "u",
  "ul",
  "var",
  "video",
  "wbr",
  "xmp"
]
;

var svgTagNames = [
  "a",
  "altGlyph",
  "altGlyphDef",
  "altGlyphItem",
  "animate",
  "animateColor",
  "animateMotion",
  "animateTransform",
  "animation",
  "audio",
  "canvas",
  "circle",
  "clipPath",
  "color-profile",
  "cursor",
  "defs",
  "desc",
  "discard",
  "ellipse",
  "feBlend",
  "feColorMatrix",
  "feComponentTransfer",
  "feComposite",
  "feConvolveMatrix",
  "feDiffuseLighting",
  "feDisplacementMap",
  "feDistantLight",
  "feDropShadow",
  "feFlood",
  "feFuncA",
  "feFuncB",
  "feFuncG",
  "feFuncR",
  "feGaussianBlur",
  "feImage",
  "feMerge",
  "feMergeNode",
  "feMorphology",
  "feOffset",
  "fePointLight",
  "feSpecularLighting",
  "feSpotLight",
  "feTile",
  "feTurbulence",
  "filter",
  "font",
  "font-face",
  "font-face-format",
  "font-face-name",
  "font-face-src",
  "font-face-uri",
  "foreignObject",
  "g",
  "glyph",
  "glyphRef",
  "handler",
  "hatch",
  "hatchpath",
  "hkern",
  "iframe",
  "image",
  "line",
  "linearGradient",
  "listener",
  "marker",
  "mask",
  "mesh",
  "meshgradient",
  "meshpatch",
  "meshrow",
  "metadata",
  "missing-glyph",
  "mpath",
  "path",
  "pattern",
  "polygon",
  "polyline",
  "prefetch",
  "radialGradient",
  "rect",
  "script",
  "set",
  "solidColor",
  "solidcolor",
  "stop",
  "style",
  "svg",
  "switch",
  "symbol",
  "tbreak",
  "text",
  "textArea",
  "textPath",
  "title",
  "tref",
  "tspan",
  "unknown",
  "use",
  "video",
  "view",
  "vkern"
]
;

var domElements = htmlTagNames.concat(svgTagNames).filter(function (tag, index, array) {
  return array.indexOf(tag) === index;
});

var CHANNEL = '__glamorous__';

var PropTypes = void 0;

/* istanbul ignore next */
if (parseFloat(__WEBPACK_IMPORTED_MODULE_0_react___default.a.version.slice(0, 4)) >= 15.5) {
  /* istanbul ignore next */
  try {
    PropTypes = __webpack_require__(14);
    /* istanbul ignore next */
  } catch (error) {
    // ignore
  }
}
/* istanbul ignore next */
PropTypes = PropTypes || __WEBPACK_IMPORTED_MODULE_0_react___default.a.PropTypes;



/*
eslint
  import/no-mutable-exports:0,
  import/prefer-default-export:0,
  react/no-deprecated:0
 */

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();





var defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};



var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};









var objectWithoutProperties = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};



















var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

function generateWarningMessage(Comp) {
  var componentName = Comp.displayName || Comp.name || 'FunctionComponent';
  // eslint-disable-next-line max-len
  return 'glamorous warning: Expected component called "' + componentName + '" which uses withTheme to be within a ThemeProvider but none was found.';
}

function withTheme(ComponentToTheme) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$noWarn = _ref.noWarn,
      noWarn = _ref$noWarn === undefined ? false : _ref$noWarn,
      _ref$createElement = _ref.createElement,
      createElement = _ref$createElement === undefined ? true : _ref$createElement;

  var ThemedComponent = function (_Component) {
    inherits(ThemedComponent, _Component);

    function ThemedComponent() {
      var _ref2;

      var _temp, _this, _ret;

      classCallCheck(this, ThemedComponent);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref2 = ThemedComponent.__proto__ || Object.getPrototypeOf(ThemedComponent)).call.apply(_ref2, [this].concat(args))), _this), _this.warned = noWarn, _this.state = { theme: {} }, _this.setTheme = function (theme) {
        return _this.setState({ theme: theme });
      }, _temp), possibleConstructorReturn(_this, _ret);
    }

    createClass(ThemedComponent, [{
      key: 'componentWillMount',


      // eslint-disable-next-line complexity
      value: function componentWillMount() {
        if (!this.context[CHANNEL]) {
          if (process.env.NODE_ENV !== 'production' && !this.warned) {
            this.warned = true;
            // eslint-disable-next-line no-console
            console.warn(generateWarningMessage(ComponentToTheme));
          }
        }
        var theme = this.props.theme;

        if (this.context[CHANNEL]) {
          // if a theme is provided via props,
          // it takes precedence over context
          this.setTheme(theme ? theme : this.context[CHANNEL].getState());
        } else {
          this.setTheme(theme || {});
        }
      }
    }, {
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps) {
        if (this.props.theme !== nextProps.theme) {
          this.setTheme(nextProps.theme);
        }
      }
    }, {
      key: 'componentDidMount',
      value: function componentDidMount() {
        if (this.context[CHANNEL] && !this.props.theme) {
          // subscribe to future theme changes
          this.subscriptionId = this.context[CHANNEL].subscribe(this.setTheme);
        }
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        // cleanup subscription
        this.subscriptionId && this.context[CHANNEL].unsubscribe(this.subscriptionId);
      }
    }, {
      key: 'render',
      value: function render() {
        if (createElement) {
          return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(ComponentToTheme, _extends({}, this.props, this.state));
        } else {
          // this allows us to effectively use the GlamorousComponent
          // as our `render` method without going through lifecycle hooks.
          // Also allows us to forward the context in the scenario where
          // a user wants to add more context.
          // eslint-disable-next-line babel/new-cap
          return ComponentToTheme.call(this, _extends({}, this.props, this.state), this.context);
        }
      }
    }]);
    return ThemedComponent;
  }(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

  ThemedComponent.propTypes = {
    theme: PropTypes.object
  };


  var defaultContextTypes = defineProperty({}, CHANNEL, PropTypes.object);

  var userDefinedContextTypes = null;

  // configure the contextTypes to be settable by the user,
  // however also retaining the glamorous channel.
  Object.defineProperty(ThemedComponent, 'contextTypes', {
    enumerable: true,
    configurable: true,
    set: function set$$1(value) {
      userDefinedContextTypes = value;
    },
    get: function get$$1() {
      // if the user has provided a contextTypes definition,
      // merge the default context types with the provided ones.
      if (userDefinedContextTypes) {
        return _extends({}, defaultContextTypes, userDefinedContextTypes);
      }
      return defaultContextTypes;
    }
  });

  return ThemedComponent;
}

var index$1 = isFunction;

var toString = Object.prototype.toString;

function isFunction (fn) {
  var string = toString.call(fn);
  return string === '[object Function]' ||
    (typeof fn === 'function' && string !== '[object RegExp]') ||
    (typeof window !== 'undefined' &&
     // IE8 and below
     (fn === window.setTimeout ||
      fn === window.alert ||
      fn === window.confirm ||
      fn === window.prompt))
}

/*!
 * isobject <https://github.com/jonschlinkert/isobject>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */

var index$3 = function isObject(val) {
  return val != null && typeof val === 'object' && Array.isArray(val) === false;
};

function isObjectObject(o) {
  return index$3(o) === true
    && Object.prototype.toString.call(o) === '[object Object]';
}

var index$2 = function isPlainObject(o) {
  var ctor,prot;

  if (isObjectObject(o) === false) return false;

  // If has modified constructor
  ctor = o.constructor;
  if (typeof ctor !== 'function') return false;

  // If has modified prototype
  prot = ctor.prototype;
  if (isObjectObject(prot) === false) return false;

  // If constructor does not have an Object-specific method
  if (prot.hasOwnProperty('isPrototypeOf') === false) {
    return false;
  }

  // Most likely a plain Object
  return true;
};

function createBroadcast (initialState) {
  var listeners = {};
  var id = 1;
  var _state = initialState;

  function getState () {
    return _state
  }

  function setState (state) {
    _state = state;
    var keys = Object.keys(listeners);
    var i = 0;
    var len = keys.length;
    for (; i < len; i++) {
      // if a listener gets unsubscribed during setState we just skip it
      if (listeners[keys[i]]) { listeners[keys[i]](state); }
    }
  }

  // subscribe to changes and return the subscriptionId
  function subscribe (listener) {
    if (typeof listener !== 'function') {
      throw new Error('listener must be a function.')
    }
    var currentId = id;
    listeners[currentId] = listener;
    id += 1;
    return currentId
  }

  // remove subscription by removing the listener function
  function unsubscribe (id) {
    listeners[id] = undefined;
  }

  return { getState: getState, setState: setState, subscribe: subscribe, unsubscribe: unsubscribe }
}

/**
 * This is a component which will provide a theme to the entire tree
 * via context and event listener
 * (because pure components block context updates)
 * inspired by the styled-components implementation
 * https://github.com/styled-components/styled-components
 * @param {Object} theme the theme object..
 */

var ThemeProvider = function (_Component) {
  inherits(ThemeProvider, _Component);

  function ThemeProvider() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, ThemeProvider);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = ThemeProvider.__proto__ || Object.getPrototypeOf(ThemeProvider)).call.apply(_ref, [this].concat(args))), _this), _this.broadcast = createBroadcast(_this.props.theme), _this.setOuterTheme = function (theme) {
      _this.outerTheme = theme;
    }, _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(ThemeProvider, [{
    key: 'getTheme',


    // create theme, by merging with outer theme, if present
    value: function getTheme(passedTheme) {
      var theme = passedTheme || this.props.theme;
      if (index$1(theme)) {
        var mergedTheme = theme(this.outerTheme);
        if (!index$2(mergedTheme)) {
          throw new Error('[ThemeProvider] Please return an object from your theme function, ' + 'i.e. theme={() => ({})}!');
        }
        return mergedTheme;
      }
      return _extends({}, this.outerTheme, theme);
    }
  }, {
    key: 'getChildContext',
    value: function getChildContext() {
      return defineProperty({}, CHANNEL, this.broadcast);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      // create a new subscription for keeping track of outer theme, if present
      if (this.context[CHANNEL]) {
        this.subscriptionId = this.context[CHANNEL].subscribe(this.setOuterTheme);
      }
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      // set broadcast state by merging outer theme with own
      if (this.context[CHANNEL]) {
        this.setOuterTheme(this.context[CHANNEL].getState());
        this.broadcast.setState(this.getTheme());
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.theme !== nextProps.theme) {
        this.broadcast.setState(this.getTheme(nextProps.theme));
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.subscriptionId && this.context[CHANNEL].unsubscribe(this.subscriptionId);
    }
  }, {
    key: 'render',
    value: function render() {
      return this.props.children ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.Children.only(this.props.children) : null;
    }
  }]);
  return ThemeProvider;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

ThemeProvider.childContextTypes = defineProperty({}, CHANNEL, PropTypes.object.isRequired);

ThemeProvider.contextTypes = defineProperty({}, CHANNEL, PropTypes.object);

ThemeProvider.propTypes = {
  theme: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
  children: PropTypes.node
};

/**
 * This function takes a className string and gets all the
 * associated glamor styles. It's used to merge glamor styles
 * from a className to make sure that specificity is not
 * a problem when passing a className to a component.
 * @param {String} [className=''] the className string
 * @return {Object} { glamorStyles, glamorlessClassName }
 *   - glamorStyles is an array of all the glamor styles objects
 *   - glamorlessClassName is the rest of the className string
 *     without the glamor classNames
 */
function extractGlamorStyles(className) {
  var glamorlessClassName = [];
  var glamorStyles = [];
  className.toString().split(' ').forEach(function (name) {
    if (name.indexOf('css-') === 0) {
      var style = buildGlamorSrcFromClassName(name);
      glamorStyles.push(style);
    } else {
      glamorlessClassName.push(name);
    }
  });

  return { glamorlessClassName: glamorlessClassName, glamorStyles: glamorStyles };
}

/** Glamor's css function returns an object with the shape
 *
 * {
 *   [`data-css-${hash}`]: '',
 *   toString() { return `css-${hash}` }
 * }
 *
 * Whenever glamor's build function encounters an object with
 * this shape it just pulls the resulting styles from the cache.
 *
 * note: the toString method is not needed to qualify the shape
**/
function buildGlamorSrcFromClassName(className) {
  return defineProperty({}, 'data-' + className, '');
}

function getGlamorClassName$1(_ref2) {
  var styles = _ref2.styles,
      props = _ref2.props,
      cssOverrides = _ref2.cssOverrides,
      cssProp = _ref2.cssProp,
      context = _ref2.context,
      displayName = _ref2.displayName;

  var _handleStyles = handleStyles([].concat(toConsumableArray(styles), [props.className, cssOverrides, cssProp]), props, context),
      mappedArgs = _handleStyles.mappedArgs,
      nonGlamorClassNames = _handleStyles.nonGlamorClassNames;
  // eslint-disable-next-line max-len


  var isDev = process.env.NODE_ENV === 'development' || !process.env.NODE_ENV;
  var devRules = isDev ? { label: displayName } : null;
  var glamorClassName = __WEBPACK_IMPORTED_MODULE_1_glamor__["css"].apply(undefined, [devRules].concat(toConsumableArray(mappedArgs))).toString();
  var extras = nonGlamorClassNames.join(' ').trim();
  return (glamorClassName + ' ' + extras).trim();
}

// this next function is on a "hot" code-path
// so it's pretty complex to make sure it's fast.
// eslint-disable-next-line complexity
function handleStyles(styles, props, context) {
  var current = void 0;
  var mappedArgs = [];
  var nonGlamorClassNames = [];
  for (var i = 0; i < styles.length; i++) {
    current = styles[i];
    if (typeof current === 'function') {
      var result = current(props, context);
      if (typeof result === 'string') {
        var _extractGlamorStyles = extractGlamorStyles(result),
            glamorStyles = _extractGlamorStyles.glamorStyles,
            glamorlessClassName = _extractGlamorStyles.glamorlessClassName;

        mappedArgs.push.apply(mappedArgs, toConsumableArray(glamorStyles));
        nonGlamorClassNames.push.apply(nonGlamorClassNames, toConsumableArray(glamorlessClassName));
      } else {
        mappedArgs.push(result);
      }
    } else if (typeof current === 'string') {
      var _extractGlamorStyles2 = extractGlamorStyles(current),
          _glamorStyles = _extractGlamorStyles2.glamorStyles,
          _glamorlessClassName = _extractGlamorStyles2.glamorlessClassName;

      mappedArgs.push.apply(mappedArgs, toConsumableArray(_glamorStyles));
      nonGlamorClassNames.push.apply(nonGlamorClassNames, toConsumableArray(_glamorlessClassName));
    } else if (Array.isArray(current)) {
      var recursed = handleStyles(current, props, context);
      mappedArgs.push.apply(mappedArgs, toConsumableArray(recursed.mappedArgs));
      nonGlamorClassNames.push.apply(nonGlamorClassNames, toConsumableArray(recursed.nonGlamorClassNames));
    } else {
      mappedArgs.push(current);
    }
  }
  return { mappedArgs: mappedArgs, nonGlamorClassNames: nonGlamorClassNames };
}

/*
 * This is a relatively small abstraction that's ripe for open sourcing.
 * Documentation is in the README.md
 */
function createGlamorous$1(splitProps) {
  return glamorous;

  /**
  * This is the main export and the function that people
  * interact with most directly.
  *
  * It accepts a component which can be a string or
  * a React Component and returns
  * a "glamorousComponentFactory"
  * @param {String|ReactComponent} comp the component to render
  * @param {Object} options helpful info for the GlamorousComponents
  * @return {Function} the glamorousComponentFactory
  */
  function glamorous(comp) {
    var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var rootEl = config.rootEl,
        displayName = config.displayName,
        shouldClassNameUpdate = config.shouldClassNameUpdate,
        _config$filterProps = config.filterProps,
        filterProps = _config$filterProps === undefined ? [] : _config$filterProps,
        _config$forwardProps = config.forwardProps,
        forwardProps = _config$forwardProps === undefined ? [] : _config$forwardProps,
        _config$propsAreCssOv = config.propsAreCssOverrides,
        propsAreCssOverrides = _config$propsAreCssOv === undefined ? comp.propsAreCssOverrides : _config$propsAreCssOv,
        basePropsToApply = config.withProps;

    Object.assign(glamorousComponentFactory, { withConfig: withConfig });
    return glamorousComponentFactory;

    function withConfig(newConfig) {
      return glamorous(comp, _extends({}, config, newConfig));
    }

    /**
     * This returns a React Component that renders the comp (closure)
     * with a className based on the given glamor styles object(s)
     * @param {...Object|Function} styles the styles to create with glamor.
     *   If any of these are functions, they are invoked with the component
     *   props and the return value is used.
     * @return {ReactComponent} the ReactComponent function
     */
    function glamorousComponentFactory() {
      for (var _len = arguments.length, styles = Array(_len), _key = 0; _key < _len; _key++) {
        styles[_key] = arguments[_key];
      }

      /**
       * This is a component which will render the comp (closure)
       * with the glamorous styles (closure). Forwards any valid
       * props to the underlying component.
       */
      var GlamorousComponent = withTheme(function GlamorousInnerComponent(props, context) {
        props = getPropsToApply(GlamorousComponent.propsToApply, {}, props, context);
        var updateClassName = shouldUpdate(props, context, this.previous);

        if (shouldClassNameUpdate) {
          this.previous = { props: props, context: context };
        }

        var _splitProps = splitProps(props, GlamorousComponent),
            toForward = _splitProps.toForward,
            cssOverrides = _splitProps.cssOverrides,
            cssProp = _splitProps.cssProp;

        // create className to apply


        this.className = updateClassName ? getGlamorClassName$1({
          styles: GlamorousComponent.styles,
          props: props,
          cssOverrides: cssOverrides,
          cssProp: cssProp,
          context: context,
          displayName: GlamorousComponent.displayName
        }) : this.className;

        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(GlamorousComponent.comp, _extends({
          ref: props.innerRef
        }, toForward, {
          className: this.className
        }));
      }, { noWarn: true, createElement: false });

      GlamorousComponent.propTypes = {
        className: PropTypes.string,
        cssOverrides: PropTypes.object,
        innerRef: PropTypes.func,
        glam: PropTypes.object
      };

      function withComponent(newComp) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var fwp = GlamorousComponent.forwardProps,
            flp = GlamorousComponent.filterProps,
            componentProperties = objectWithoutProperties(GlamorousComponent, ['forwardProps', 'filterProps']);

        return glamorous(_extends({}, componentProperties, {
          comp: newComp
        }), _extends({
          // allows the forwardProps and filterProps to be overridden
          forwardProps: fwp,
          filterProps: flp
        }, options))();
      }

      function withProps() {
        for (var _len2 = arguments.length, propsToApply = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          propsToApply[_key2] = arguments[_key2];
        }

        return glamorous(GlamorousComponent, { withProps: propsToApply })();
      }

      function shouldUpdate(props, context, previous) {
        // exiting early so components which do not use this
        // optimization are not penalized by hanging onto
        // references to previous props and context
        if (!shouldClassNameUpdate) {
          return true;
        }
        var update = true;
        if (previous) {
          if (!shouldClassNameUpdate(previous.props, props, previous.context, context)) {
            update = false;
          }
        }

        return update;
      }

      Object.assign(GlamorousComponent, getGlamorousComponentMetadata({
        comp: comp,
        styles: styles,
        rootEl: rootEl,
        filterProps: filterProps,
        forwardProps: forwardProps,
        displayName: displayName,
        propsToApply: basePropsToApply
      }), {
        isGlamorousComponent: true,
        propsAreCssOverrides: propsAreCssOverrides,
        withComponent: withComponent,
        withProps: withProps,
        withConfig: withConfig
      });
      return GlamorousComponent;
    }
  }

  function getGlamorousComponentMetadata(_ref) {
    var comp = _ref.comp,
        styles = _ref.styles,
        rootEl = _ref.rootEl,
        filterProps = _ref.filterProps,
        forwardProps = _ref.forwardProps,
        displayName = _ref.displayName,
        basePropsToApply = _ref.propsToApply;

    var componentsComp = comp.comp ? comp.comp : comp;
    var propsToApply = comp.propsToApply ? [].concat(toConsumableArray(comp.propsToApply), toConsumableArray(arrayify(basePropsToApply))) : arrayify(basePropsToApply);
    return {
      // join styles together (for anyone doing: glamorous(glamorous.a({}), {}))
      styles: when(comp.styles, styles),
      // keep track of the ultimate rootEl to render (we never
      // actually render anything but
      // the base component, even when people wrap a glamorous
      // component in glamorous
      comp: componentsComp,
      rootEl: rootEl || componentsComp,
      // join forwardProps and filterProps
      // (for anyone doing: glamorous(glamorous.a({}), {}))
      forwardProps: when(comp.forwardProps, forwardProps),
      filterProps: when(comp.filterProps, filterProps),
      // set the displayName to something that's slightly more
      // helpful than `GlamorousComponent` :)
      displayName: displayName || 'glamorous(' + getDisplayName(comp) + ')',
      // these are props that should be applied to the component at render time
      propsToApply: propsToApply
    };
  }
}

/**
 * reduces the propsToApply given to a single props object
 * @param {Array} propsToApply an array of propsToApply objects:
 *   - object
 *   - array of propsToApply items
 *   - function that accepts the accumulated props and the context
 * @param {Object} accumulator an object to apply props onto
 * @param {Object} props the props that should ultimately take precedence
 * @param {*} context the context object
 * @return {Object} the reduced props
 */
function getPropsToApply(propsToApply, accumulator, props, context) {
  // using forEach rather than reduce here because the reduce solution
  // effectively did the same thing because we manipulate the `accumulator`
  propsToApply.forEach(function (propsToApplyItem) {
    if (typeof propsToApplyItem === 'function') {
      return Object.assign(accumulator, propsToApplyItem(Object.assign({}, accumulator, props), context));
    } else if (Array.isArray(propsToApplyItem)) {
      return Object.assign(accumulator, getPropsToApply(propsToApplyItem, accumulator, props, context));
    }
    return Object.assign(accumulator, propsToApplyItem);
  });
  // props wins
  return Object.assign(accumulator, props);
}

function arrayify() {
  var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

  return Array.isArray(x) ? x : [x];
}

function when(comp, prop) {
  return comp ? comp.concat(prop) : prop;
}

function getDisplayName(comp) {
  return typeof comp === 'string' ? comp : comp.displayName || comp.name || 'unknown';
}

//
// Main
//

function memoize (fn, options) {
  var cache = options && options.cache
    ? options.cache
    : cacheDefault;

  var serializer = options && options.serializer
    ? options.serializer
    : serializerDefault;

  var strategy = options && options.strategy
    ? options.strategy
    : strategyDefault;

  return strategy(fn, {
    cache: cache,
    serializer: serializer
  })
}

//
// Strategy
//

function isPrimitive (value) {
  return value == null || (typeof value !== 'function' && typeof value !== 'object')
}

function monadic (fn, cache, serializer, arg) {
  var cacheKey = isPrimitive(arg) ? arg : serializer(arg);

  if (!cache.has(cacheKey)) {
    var computedValue = fn.call(this, arg);
    cache.set(cacheKey, computedValue);
    return computedValue
  }

  return cache.get(cacheKey)
}

function variadic (fn, cache, serializer) {
  var args = Array.prototype.slice.call(arguments, 3);
  var cacheKey = serializer(args);

  if (!cache.has(cacheKey)) {
    var computedValue = fn.apply(this, args);
    cache.set(cacheKey, computedValue);
    return computedValue
  }

  return cache.get(cacheKey)
}

function assemble (fn, context, strategy, cache, serialize) {
  return strategy.bind(
    context,
    fn,
    cache,
    serialize
  )
}

function strategyDefault (fn, options) {
  var strategy = fn.length === 1 ? monadic : variadic;

  return assemble(
    fn,
    this,
    strategy,
    options.cache.create(),
    options.serializer
  )
}

function strategyVariadic (fn, options) {
  var strategy = variadic;

  return assemble(
    fn,
    this,
    strategy,
    options.cache.create(),
    options.serializer
  )
}

function strategyMonadic (fn, options) {
  var strategy = monadic;

  return assemble(
    fn,
    this,
    strategy,
    options.cache.create(),
    options.serializer
  )
}

//
// Serializer
//

function serializerDefault () {
  return JSON.stringify(arguments)
}

//
// Cache
//

function ObjectWithoutPrototypeCache () {
  this.cache = Object.create(null);
}

ObjectWithoutPrototypeCache.prototype.has = function (key) {
  return (key in this.cache)
};

ObjectWithoutPrototypeCache.prototype.get = function (key) {
  return this.cache[key]
};

ObjectWithoutPrototypeCache.prototype.set = function (key, value) {
  this.cache[key] = value;
};

var cacheDefault = {
  create: function create () {
    return new ObjectWithoutPrototypeCache()
  }
};

//
// API
//

var index$5 = memoize;
var strategies = {
  variadic: strategyVariadic,
  monadic: strategyMonadic
};

index$5.strategies = strategies;

function unwrapExports (x) {
	return x && x.__esModule ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var a = ["coords","download","href","name","rel","shape","target","type"];
var abbr = ["title"];
var applet = ["alt","height","name","width"];
var area = ["alt","coords","download","href","rel","shape","target","type"];
var audio = ["controls","loop","muted","preload","src"];
var base = ["href","target"];
var basefont = ["size"];
var bdo = ["dir"];
var blockquote = ["cite"];
var button = ["disabled","form","name","type","value"];
var canvas = ["height","width"];
var col = ["span","width"];
var colgroup = ["span","width"];
var data = ["value"];
var del = ["cite"];
var details = ["open"];
var dfn = ["title"];
var dialog = ["open"];
var embed = ["height","src","type","width"];
var fieldset = ["disabled","form","name"];
var font = ["size"];
var form = ["accept","action","method","name","target"];
var frame = ["name","scrolling","src"];
var frameset = ["cols","rows"];
var head = ["profile"];
var hr = ["size","width"];
var html = ["manifest"];
var iframe = ["height","name","sandbox","scrolling","src","width"];
var img = ["alt","height","name","sizes","src","width"];
var input = ["accept","alt","autoCapitalize","autoCorrect","autoSave","checked","defaultChecked","defaultValue","disabled","form","height","list","max","min","multiple","name","onChange","pattern","placeholder","required","results","size","src","step","title","type","value","width"];
var ins = ["cite"];
var keygen = ["challenge","disabled","form","name"];
var label = ["form"];
var li = ["type","value"];
var link = ["color","href","integrity","media","nonce","rel","scope","sizes","target","title","type"];
var map = ["name"];
var meta = ["content","name"];
var meter = ["high","low","max","min","optimum","value"];
var object = ["data","form","height","name","type","width"];
var ol = ["reversed","start","type"];
var optgroup = ["disabled","label"];
var option = ["disabled","label","selected","value"];
var output = ["form","name"];
var param = ["name","type","value"];
var pre = ["width"];
var progress = ["max","value"];
var q = ["cite"];
var script = ["async","defer","integrity","nonce","src","type"];
var select = ["defaultValue","disabled","form","multiple","name","onChange","required","size","value"];
var slot = ["name"];
var source = ["media","sizes","src","type"];
var style = ["media","nonce","title","type"];
var table = ["summary","width"];
var td = ["headers","height","scope","width"];
var textarea = ["autoCapitalize","autoCorrect","cols","defaultValue","disabled","form","name","onChange","placeholder","required","rows","value","wrap"];
var th = ["headers","height","scope","width"];
var track = ["default","kind","label","src"];
var ul = ["type"];
var video = ["controls","height","loop","muted","poster","preload","src","width"];
var svg = ["accentHeight","accumulate","additive","alignmentBaseline","allowReorder","alphabetic","amplitude","arabicForm","ascent","attributeName","attributeType","autoReverse","azimuth","baseFrequency","baseProfile","baselineShift","bbox","begin","bias","by","calcMode","capHeight","clip","clipPath","clipPathUnits","clipRule","color","colorInterpolation","colorInterpolationFilters","colorProfile","colorRendering","contentScriptType","contentStyleType","cursor","cx","cy","d","decelerate","descent","diffuseConstant","direction","display","divisor","dominantBaseline","dur","dx","dy","edgeMode","elevation","enableBackground","end","exponent","externalResourcesRequired","fill","fillOpacity","fillRule","filter","filterRes","filterUnits","floodColor","floodOpacity","focusable","fontFamily","fontSize","fontSizeAdjust","fontStretch","fontStyle","fontVariant","fontWeight","format","from","fx","fy","g1","g2","glyphName","glyphOrientationHorizontal","glyphOrientationVertical","glyphRef","gradientTransform","gradientUnits","hanging","height","horizAdvX","horizOriginX","ideographic","imageRendering","in","in2","intercept","k","k1","k2","k3","k4","kernelMatrix","kernelUnitLength","kerning","keyPoints","keySplines","keyTimes","lengthAdjust","letterSpacing","lightingColor","limitingConeAngle","local","markerEnd","markerHeight","markerMid","markerStart","markerUnits","markerWidth","mask","maskContentUnits","maskUnits","mathematical","mode","numOctaves","offset","opacity","operator","order","orient","orientation","origin","overflow","overlinePosition","overlineThickness","paintOrder","panose1","pathLength","patternContentUnits","patternTransform","patternUnits","pointerEvents","points","pointsAtX","pointsAtY","pointsAtZ","preserveAlpha","preserveAspectRatio","primitiveUnits","r","radius","refX","refY","renderingIntent","repeatCount","repeatDur","requiredExtensions","requiredFeatures","restart","result","rotate","rx","ry","scale","seed","shapeRendering","slope","spacing","specularConstant","specularExponent","speed","spreadMethod","startOffset","stdDeviation","stemh","stemv","stitchTiles","stopColor","stopOpacity","strikethroughPosition","strikethroughThickness","string","stroke","strokeDasharray","strokeDashoffset","strokeLinecap","strokeLinejoin","strokeMiterlimit","strokeOpacity","strokeWidth","surfaceScale","systemLanguage","tableValues","targetX","targetY","textAnchor","textDecoration","textLength","textRendering","to","transform","u1","u2","underlinePosition","underlineThickness","unicode","unicodeBidi","unicodeRange","unitsPerEm","vAlphabetic","vHanging","vIdeographic","vMathematical","values","vectorEffect","version","vertAdvY","vertOriginX","vertOriginY","viewBox","viewTarget","visibility","width","widths","wordSpacing","writingMode","x","x1","x2","xChannelSelector","xHeight","xlinkActuate","xlinkArcrole","xlinkHref","xlinkRole","xlinkShow","xlinkTitle","xlinkType","xmlBase","xmlLang","xmlSpace","xmlns","xmlnsXlink","y","y1","y2","yChannelSelector","z","zoomAndPan"];
var elements = {"html":["a","abbr","address","area","article","aside","audio","b","base","bdi","bdo","blockquote","body","br","button","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","keygen","label","legend","li","link","main","map","mark","math","menu","menuitem","meta","meter","nav","noscript","object","ol","optgroup","option","output","p","param","picture","pre","progress","q","rb","rp","rt","rtc","ruby","s","samp","script","section","select","slot","small","source","span","strong","style","sub","summary","sup","svg","table","tbody","td","template","textarea","tfoot","th","thead","time","title","tr","track","u","ul","var","video","wbr"],"svg":["a","altGlyph","altGlyphDef","altGlyphItem","animate","animateColor","animateMotion","animateTransform","circle","clipPath","color-profile","cursor","defs","desc","ellipse","feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence","filter","font","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignObject","g","glyph","glyphRef","hkern","image","line","linearGradient","marker","mask","metadata","missing-glyph","mpath","path","pattern","polygon","polyline","radialGradient","rect","script","set","stop","style","svg","switch","symbol","text","textPath","title","tref","tspan","use","view","vkern"]};
var reactHtmlAttributes = {
	a: a,
	abbr: abbr,
	applet: applet,
	area: area,
	audio: audio,
	base: base,
	basefont: basefont,
	bdo: bdo,
	blockquote: blockquote,
	button: button,
	canvas: canvas,
	col: col,
	colgroup: colgroup,
	data: data,
	del: del,
	details: details,
	dfn: dfn,
	dialog: dialog,
	embed: embed,
	fieldset: fieldset,
	font: font,
	form: form,
	frame: frame,
	frameset: frameset,
	head: head,
	hr: hr,
	html: html,
	iframe: iframe,
	img: img,
	input: input,
	ins: ins,
	keygen: keygen,
	label: label,
	li: li,
	link: link,
	map: map,
	meta: meta,
	meter: meter,
	object: object,
	ol: ol,
	optgroup: optgroup,
	option: option,
	output: output,
	param: param,
	pre: pre,
	progress: progress,
	q: q,
	script: script,
	select: select,
	slot: slot,
	source: source,
	style: style,
	table: table,
	td: td,
	textarea: textarea,
	th: th,
	track: track,
	ul: ul,
	video: video,
	svg: svg,
	elements: elements,
	"*": ["about","acceptCharset","accessKey","allowFullScreen","allowTransparency","autoComplete","autoFocus","autoPlay","capture","cellPadding","cellSpacing","charSet","classID","className","colSpan","contentEditable","contextMenu","crossOrigin","dangerouslySetInnerHTML","datatype","dateTime","dir","draggable","encType","formAction","formEncType","formMethod","formNoValidate","formTarget","frameBorder","hidden","hrefLang","htmlFor","httpEquiv","icon","id","inlist","inputMode","is","itemID","itemProp","itemRef","itemScope","itemType","keyParams","keyType","lang","marginHeight","marginWidth","maxLength","mediaGroup","minLength","noValidate","prefix","property","radioGroup","readOnly","resource","role","rowSpan","scoped","seamless","security","spellCheck","srcDoc","srcLang","srcSet","style","suppressContentEditableWarning","tabIndex","title","typeof","unselectable","useMap","vocab","wmode"]
};

var reactHtmlAttributes$1 = Object.freeze({
	a: a,
	abbr: abbr,
	applet: applet,
	area: area,
	audio: audio,
	base: base,
	basefont: basefont,
	bdo: bdo,
	blockquote: blockquote,
	button: button,
	canvas: canvas,
	col: col,
	colgroup: colgroup,
	data: data,
	del: del,
	details: details,
	dfn: dfn,
	dialog: dialog,
	embed: embed,
	fieldset: fieldset,
	font: font,
	form: form,
	frame: frame,
	frameset: frameset,
	head: head,
	hr: hr,
	html: html,
	iframe: iframe,
	img: img,
	input: input,
	ins: ins,
	keygen: keygen,
	label: label,
	li: li,
	link: link,
	map: map,
	meta: meta,
	meter: meter,
	object: object,
	ol: ol,
	optgroup: optgroup,
	option: option,
	output: output,
	param: param,
	pre: pre,
	progress: progress,
	q: q,
	script: script,
	select: select,
	slot: slot,
	source: source,
	style: style,
	table: table,
	td: td,
	textarea: textarea,
	th: th,
	track: track,
	ul: ul,
	video: video,
	svg: svg,
	elements: elements,
	default: reactHtmlAttributes
});

var reactHtmlAttributes$2 = ( reactHtmlAttributes$1 && reactHtmlAttributes ) || reactHtmlAttributes$1;

var index$6 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


exports.default = reactHtmlAttributes$2;

module.exports = reactHtmlAttributes$2; // for CommonJS compatibility
});

var reactHTMLAttributes = unwrapExports(index$6);

/*
 * This is used to check if a property name is one of the React-specific
 * properties and determine if that property should be forwarded
 * to the React component
 */

/* Logic copied from ReactDOMUnknownPropertyHook */
var reactProps = ['children', 'dangerouslySetInnerHTML', 'key', 'ref', 'autoFocus', 'defaultValue', 'valueLink', 'defaultChecked', 'checkedLink', 'innerHTML', 'suppressContentEditableWarning', 'onFocusIn', 'onFocusOut', 'className',

/* List copied from https://facebook.github.io/react/docs/events.html */
'onCopy', 'onCut', 'onPaste', 'onCompositionEnd', 'onCompositionStart', 'onCompositionUpdate', 'onKeyDown', 'onKeyPress', 'onKeyUp', 'onFocus', 'onBlur', 'onChange', 'onInput', 'onSubmit', 'onClick', 'onContextMenu', 'onDoubleClick', 'onDrag', 'onDragEnd', 'onDragEnter', 'onDragExit', 'onDragLeave', 'onDragOver', 'onDragStart', 'onDrop', 'onMouseDown', 'onMouseEnter', 'onMouseLeave', 'onMouseMove', 'onMouseOut', 'onMouseOver', 'onMouseUp', 'onSelect', 'onTouchCancel', 'onTouchEnd', 'onTouchMove', 'onTouchStart', 'onScroll', 'onWheel', 'onAbort', 'onCanPlay', 'onCanPlayThrough', 'onDurationChange', 'onEmptied', 'onEncrypted', 'onEnded', 'onError', 'onLoadedData', 'onLoadedMetadata', 'onLoadStart', 'onPause', 'onPlay', 'onPlaying', 'onProgress', 'onRateChange', 'onSeeked', 'onSeeking', 'onStalled', 'onSuspend', 'onTimeUpdate', 'onVolumeChange', 'onWaiting', 'onLoad', 'onAnimationStart', 'onAnimationEnd', 'onAnimationIteration', 'onTransitionEnd', 'onCopyCapture', 'onCutCapture', 'onPasteCapture', 'onCompositionEndCapture', 'onCompositionStartCapture', 'onCompositionUpdateCapture', 'onKeyDownCapture', 'onKeyPressCapture', 'onKeyUpCapture', 'onFocusCapture', 'onBlurCapture', 'onChangeCapture', 'onInputCapture', 'onSubmitCapture', 'onClickCapture', 'onContextMenuCapture', 'onDoubleClickCapture', 'onDragCapture', 'onDragEndCapture', 'onDragEnterCapture', 'onDragExitCapture', 'onDragLeaveCapture', 'onDragOverCapture', 'onDragStartCapture', 'onDropCapture', 'onMouseDownCapture', 'onMouseEnterCapture', 'onMouseLeaveCapture', 'onMouseMoveCapture', 'onMouseOutCapture', 'onMouseOverCapture', 'onMouseUpCapture', 'onSelectCapture', 'onTouchCancelCapture', 'onTouchEndCapture', 'onTouchMoveCapture', 'onTouchStartCapture', 'onScrollCapture', 'onWheelCapture', 'onAbortCapture', 'onCanPlayCapture', 'onCanPlayThroughCapture', 'onDurationChangeCapture', 'onEmptiedCapture', 'onEncryptedCapture', 'onEndedCapture', 'onErrorCapture', 'onLoadedDataCapture', 'onLoadedMetadataCapture', 'onLoadStartCapture', 'onPauseCapture', 'onPlayCapture', 'onPlayingCapture', 'onProgressCapture', 'onRateChangeCapture', 'onSeekedCapture', 'onSeekingCapture', 'onStalledCapture', 'onSuspendCapture', 'onTimeUpdateCapture', 'onVolumeChangeCapture', 'onWaitingCapture', 'onLoadCapture', 'onAnimationStartCapture', 'onAnimationEndCapture', 'onAnimationIterationCapture', 'onTransitionEndCapture'];

/* eslint max-lines:0, func-style:0 */
// copied from:
// https://github.com/styled-components/styled-components/tree/
// 956e8210b6277860c89404f9cb08735f97eaa7e1/src/utils/validAttr.js
/* Trying to avoid the unknown-prop errors on glamorous components
 by filtering by React's attribute whitelist.
 */

var globalReactHtmlProps = reactHTMLAttributes['*'];
var supportedSVGTagNames = reactHTMLAttributes.elements.svg;
var supportedHtmlTagNames = reactHTMLAttributes.elements.html;

// these are valid attributes that have the
// same name as CSS properties, and is used
// for css overrides API
var cssProps = ['color', 'height', 'width'];

/* From DOMProperty */
var ATTRIBUTE_NAME_START_CHAR =
// eslint-disable-next-line max-len
':A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD';
// eslint-disable-next-line max-len
var ATTRIBUTE_NAME_CHAR = ATTRIBUTE_NAME_START_CHAR + '\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040';
var isCustomAttribute = RegExp.prototype.test.bind(new RegExp('^(data|aria)-[' + ATTRIBUTE_NAME_CHAR + ']*$'));

var isSvgTag = function isSvgTag(tagName) {
  return (
    // in our context, we only say that SVG tags are SVG
    // if they are not also HTML.
    // See https://github.com/paypal/glamorous/issues/245
    // the svg tag will always be treated as svg for
    // er... obvious reasons
    tagName === 'svg' || supportedHtmlTagNames.indexOf(tagName) === -1 && supportedSVGTagNames.indexOf(tagName) !== -1
  );
};
var isHtmlProp = function isHtmlProp(name, tagName) {
  var elementAttributes = void 0;

  if (isSvgTag(tagName)) {
    // all SVG attributes supported by React are grouped under 'svg'
    elementAttributes = reactHTMLAttributes.svg;
  } else {
    elementAttributes = reactHTMLAttributes[tagName] || [];
  }

  return globalReactHtmlProps.indexOf(name) !== -1 || elementAttributes.indexOf(name) !== -1;
};
var isCssProp = function isCssProp(name) {
  return cssProps.indexOf(name) !== -1;
};
var isReactProp = function isReactProp(name) {
  return reactProps.indexOf(name) !== -1;
};

// eslint-disable-next-line complexity
var shouldForwardProperty = function shouldForwardProperty(tagName, name) {
  return typeof tagName !== 'string' || (isHtmlProp(name, tagName) || isReactProp(name) || isCustomAttribute(name.toLowerCase())) && (!isCssProp(name) || isSvgTag(tagName));
};

var shouldForwardProperty$1 = index$5(shouldForwardProperty);

function splitProps(_ref, _ref2) {
  var propsAreCssOverrides = _ref2.propsAreCssOverrides,
      rootEl = _ref2.rootEl,
      filterProps = _ref2.filterProps,
      forwardProps = _ref2.forwardProps;
  var cssProp = _ref.css,
      theme = _ref.theme,
      className = _ref.className,
      innerRef = _ref.innerRef,
      glam = _ref.glam,
      rest = objectWithoutProperties(_ref, ['css', 'theme', 'className', 'innerRef', 'glam']);

  var returnValue = { toForward: {}, cssProp: cssProp, cssOverrides: {} };
  if (!propsAreCssOverrides) {
    if (typeof rootEl !== 'string' && filterProps.length === 0) {
      // if it's not a string and filterProps is empty,
      // then we can forward everything (because it's a component)
      returnValue.toForward = rest;
      return returnValue;
    }
  }
  return Object.keys(rest).reduce(function (split, propName) {
    if (filterProps.indexOf(propName) !== -1) {
      return split;
    } else if (forwardProps.indexOf(propName) !== -1 || shouldForwardProperty$1(rootEl, propName)) {
      split.toForward[propName] = rest[propName];
    } else if (propsAreCssOverrides) {
      split.cssOverrides[propName] = rest[propName];
    }
    return split;
  }, returnValue);
}

/* eslint no-unused-vars:0 */

var glamorous = createGlamorous$1(splitProps);

/*
 * This creates a glamorousComponentFactory for every DOM element so you can
 * simply do:
 * const GreenButton = glamorous.button({
 *   backgroundColor: 'green',
 *   padding: 20,
 * })
 * <GreenButton>Click Me!</GreenButton>
 */
Object.assign(glamorous, domElements.reduce(function (getters, tag) {
  // TODO: next breaking change, let's make
  // the `displayName` be: `glamorous.${tag}`
  getters[tag] = glamorous(tag);
  return getters;
}, {}));

/*
 * This creates a glamorous component for each DOM element so you can
 * simply do:
 * <glamorous.Div
 *   color="green"
 *   marginLeft={20}
 * >
 *   I'm green!
 * </glamorous.Div>
 */
Object.assign(glamorous, domElements.reduce(function (comps, tag) {
  var capitalTag = capitalize(tag);
  comps[capitalTag] = glamorous[tag]();
  comps[capitalTag].displayName = 'glamorous.' + capitalTag;
  comps[capitalTag].propsAreCssOverrides = true;
  return comps;
}, {}));

function capitalize(s) {
  return s.slice(0, 1).toUpperCase() + s.slice(1);
}

/*
 * Fix importing in typescript after rollup compilation
 * https://github.com/rollup/rollup/issues/1156
 * https://github.com/Microsoft/TypeScript/issues/13017#issuecomment-268657860
 */
glamorous.default = glamorous;

// these exports below are generated
// and will be tree-shaken if you're using Webpack 2 or Rollup
var A = glamorous['A'];
var Abbr = glamorous['Abbr'];
var Acronym = glamorous['Acronym'];
var Address = glamorous['Address'];
var Applet = glamorous['Applet'];
var Area = glamorous['Area'];
var Article = glamorous['Article'];
var Aside = glamorous['Aside'];
var Audio = glamorous['Audio'];
var B = glamorous['B'];
var Base = glamorous['Base'];
var Basefont = glamorous['Basefont'];
var Bdi = glamorous['Bdi'];
var Bdo = glamorous['Bdo'];
var Bgsound = glamorous['Bgsound'];
var Big = glamorous['Big'];
var Blink = glamorous['Blink'];
var Blockquote = glamorous['Blockquote'];
var Body = glamorous['Body'];
var Br = glamorous['Br'];
var Button = glamorous['Button'];
var Canvas = glamorous['Canvas'];
var Caption = glamorous['Caption'];
var Center = glamorous['Center'];
var Cite = glamorous['Cite'];
var Code = glamorous['Code'];
var Col = glamorous['Col'];
var Colgroup = glamorous['Colgroup'];
var Command = glamorous['Command'];
var Content = glamorous['Content'];
var Data = glamorous['Data'];
var Datalist = glamorous['Datalist'];
var Dd = glamorous['Dd'];
var Del = glamorous['Del'];
var Details = glamorous['Details'];
var Dfn = glamorous['Dfn'];
var Dialog = glamorous['Dialog'];
var Dir = glamorous['Dir'];
var Div = glamorous['Div'];
var Dl = glamorous['Dl'];
var Dt = glamorous['Dt'];
var Element = glamorous['Element'];
var Em = glamorous['Em'];
var Embed = glamorous['Embed'];
var Fieldset = glamorous['Fieldset'];
var Figcaption = glamorous['Figcaption'];
var Figure = glamorous['Figure'];
var Font = glamorous['Font'];
var Footer = glamorous['Footer'];
var Form = glamorous['Form'];
var Frame = glamorous['Frame'];
var Frameset = glamorous['Frameset'];
var H1 = glamorous['H1'];
var H2 = glamorous['H2'];
var H3 = glamorous['H3'];
var H4 = glamorous['H4'];
var H5 = glamorous['H5'];
var H6 = glamorous['H6'];
var Head = glamorous['Head'];
var Header = glamorous['Header'];
var Hgroup = glamorous['Hgroup'];
var Hr = glamorous['Hr'];
var Html = glamorous['Html'];
var I = glamorous['I'];
var Iframe = glamorous['Iframe'];
var Image = glamorous['Image'];
var Img = glamorous['Img'];
var Input = glamorous['Input'];
var Ins = glamorous['Ins'];
var Isindex = glamorous['Isindex'];
var Kbd = glamorous['Kbd'];
var Keygen = glamorous['Keygen'];
var Label = glamorous['Label'];
var Legend = glamorous['Legend'];
var Li = glamorous['Li'];
var Link = glamorous['Link'];
var Listing = glamorous['Listing'];
var Main = glamorous['Main'];
var MapTag = glamorous['Map'];
var Mark = glamorous['Mark'];
var Marquee = glamorous['Marquee'];
var MathTag = glamorous['Math'];
var Menu = glamorous['Menu'];
var Menuitem = glamorous['Menuitem'];
var Meta = glamorous['Meta'];
var Meter = glamorous['Meter'];
var Multicol = glamorous['Multicol'];
var Nav = glamorous['Nav'];
var Nextid = glamorous['Nextid'];
var Nobr = glamorous['Nobr'];
var Noembed = glamorous['Noembed'];
var Noframes = glamorous['Noframes'];
var Noscript = glamorous['Noscript'];
var ObjectTag = glamorous['Object'];
var Ol = glamorous['Ol'];
var Optgroup = glamorous['Optgroup'];
var Option = glamorous['Option'];
var Output = glamorous['Output'];
var P = glamorous['P'];
var Param = glamorous['Param'];
var Picture = glamorous['Picture'];
var Plaintext = glamorous['Plaintext'];
var Pre = glamorous['Pre'];
var Progress = glamorous['Progress'];
var Q = glamorous['Q'];
var Rb = glamorous['Rb'];
var Rbc = glamorous['Rbc'];
var Rp = glamorous['Rp'];
var Rt = glamorous['Rt'];
var Rtc = glamorous['Rtc'];
var Ruby = glamorous['Ruby'];
var S = glamorous['S'];
var Samp = glamorous['Samp'];
var Script = glamorous['Script'];
var Section = glamorous['Section'];
var Select = glamorous['Select'];
var Shadow = glamorous['Shadow'];
var Slot = glamorous['Slot'];
var Small = glamorous['Small'];
var Source = glamorous['Source'];
var Spacer = glamorous['Spacer'];
var Span = glamorous['Span'];
var Strike = glamorous['Strike'];
var Strong = glamorous['Strong'];
var Style = glamorous['Style'];
var Sub = glamorous['Sub'];
var Summary = glamorous['Summary'];
var Sup = glamorous['Sup'];
var Svg = glamorous['Svg'];
var Table = glamorous['Table'];
var Tbody = glamorous['Tbody'];
var Td = glamorous['Td'];
var Template = glamorous['Template'];
var Textarea = glamorous['Textarea'];
var Tfoot = glamorous['Tfoot'];
var Th = glamorous['Th'];
var Thead = glamorous['Thead'];
var Time = glamorous['Time'];
var Title = glamorous['Title'];
var Tr = glamorous['Tr'];
var Track = glamorous['Track'];
var Tt = glamorous['Tt'];
var U = glamorous['U'];
var Ul = glamorous['Ul'];
var Var = glamorous['Var'];
var Video = glamorous['Video'];
var Wbr = glamorous['Wbr'];
var Xmp = glamorous['Xmp'];
var AltGlyph = glamorous['AltGlyph'];
var AltGlyphDef = glamorous['AltGlyphDef'];
var AltGlyphItem = glamorous['AltGlyphItem'];
var Animate = glamorous['Animate'];
var AnimateColor = glamorous['AnimateColor'];
var AnimateMotion = glamorous['AnimateMotion'];
var AnimateTransform = glamorous['AnimateTransform'];
var Animation = glamorous['Animation'];
var Circle = glamorous['Circle'];
var ClipPath = glamorous['ClipPath'];
var ColorProfile = glamorous['Color-profile'];
var Cursor = glamorous['Cursor'];
var Defs = glamorous['Defs'];
var Desc = glamorous['Desc'];
var Discard = glamorous['Discard'];
var Ellipse = glamorous['Ellipse'];
var FeBlend = glamorous['FeBlend'];
var FeColorMatrix = glamorous['FeColorMatrix'];
var FeComponentTransfer = glamorous['FeComponentTransfer'];
var FeComposite = glamorous['FeComposite'];
var FeConvolveMatrix = glamorous['FeConvolveMatrix'];
var FeDiffuseLighting = glamorous['FeDiffuseLighting'];
var FeDisplacementMap = glamorous['FeDisplacementMap'];
var FeDistantLight = glamorous['FeDistantLight'];
var FeDropShadow = glamorous['FeDropShadow'];
var FeFlood = glamorous['FeFlood'];
var FeFuncA = glamorous['FeFuncA'];
var FeFuncB = glamorous['FeFuncB'];
var FeFuncG = glamorous['FeFuncG'];
var FeFuncR = glamorous['FeFuncR'];
var FeGaussianBlur = glamorous['FeGaussianBlur'];
var FeImage = glamorous['FeImage'];
var FeMerge = glamorous['FeMerge'];
var FeMergeNode = glamorous['FeMergeNode'];
var FeMorphology = glamorous['FeMorphology'];
var FeOffset = glamorous['FeOffset'];
var FePointLight = glamorous['FePointLight'];
var FeSpecularLighting = glamorous['FeSpecularLighting'];
var FeSpotLight = glamorous['FeSpotLight'];
var FeTile = glamorous['FeTile'];
var FeTurbulence = glamorous['FeTurbulence'];
var Filter = glamorous['Filter'];
var FontFace = glamorous['Font-face'];
var FontFaceFormat = glamorous['Font-face-format'];
var FontFaceName = glamorous['Font-face-name'];
var FontFaceSrc = glamorous['Font-face-src'];
var FontFaceUri = glamorous['Font-face-uri'];
var ForeignObject = glamorous['ForeignObject'];
var G = glamorous['G'];
var Glyph = glamorous['Glyph'];
var GlyphRef = glamorous['GlyphRef'];
var Handler = glamorous['Handler'];
var Hatch = glamorous['Hatch'];
var Hatchpath = glamorous['Hatchpath'];
var Hkern = glamorous['Hkern'];
var Line = glamorous['Line'];
var LinearGradient = glamorous['LinearGradient'];
var Listener = glamorous['Listener'];
var Marker = glamorous['Marker'];
var Mask = glamorous['Mask'];
var Mesh = glamorous['Mesh'];
var Meshgradient = glamorous['Meshgradient'];
var Meshpatch = glamorous['Meshpatch'];
var Meshrow = glamorous['Meshrow'];
var Metadata = glamorous['Metadata'];
var MissingGlyph = glamorous['Missing-glyph'];
var Mpath = glamorous['Mpath'];
var Path = glamorous['Path'];
var Pattern = glamorous['Pattern'];
var Polygon = glamorous['Polygon'];
var Polyline = glamorous['Polyline'];
var Prefetch = glamorous['Prefetch'];
var RadialGradient = glamorous['RadialGradient'];
var Rect = glamorous['Rect'];
var SetTag = glamorous['Set'];
var SolidColor = glamorous['SolidColor'];
var Solidcolor = glamorous['Solidcolor'];
var Stop = glamorous['Stop'];
var Switch = glamorous['Switch'];
var SymbolTag = glamorous['Symbol'];
var Tbreak = glamorous['Tbreak'];
var Text = glamorous['Text'];
var TextArea = glamorous['TextArea'];
var TextPath = glamorous['TextPath'];
var Tref = glamorous['Tref'];
var Tspan = glamorous['Tspan'];
var Unknown = glamorous['Unknown'];
var Use = glamorous['Use'];
var View = glamorous['View'];
var Vkern = glamorous['Vkern'];

/* harmony default export */ __webpack_exports__["default"] = (glamorous);

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(1)))

/***/ }),
/* 197 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.compose = exports.merge = exports.$ = exports.style = exports.presets = exports.keyframes = exports.fontFace = exports.insertGlobal = exports.insertRule = exports.plugins = exports.styleSheet = undefined;
exports.speedy = speedy;
exports.simulations = simulations;
exports.simulate = simulate;
exports.cssLabels = cssLabels;
exports.isLikeRule = isLikeRule;
exports.idFor = idFor;
exports.css = css;
exports.rehydrate = rehydrate;
exports.flush = flush;
exports.select = select;
exports.parent = parent;
exports.media = media;
exports.pseudo = pseudo;
exports.active = active;
exports.any = any;
exports.checked = checked;
exports.disabled = disabled;
exports.empty = empty;
exports.enabled = enabled;
exports._default = _default;
exports.first = first;
exports.firstChild = firstChild;
exports.firstOfType = firstOfType;
exports.fullscreen = fullscreen;
exports.focus = focus;
exports.hover = hover;
exports.indeterminate = indeterminate;
exports.inRange = inRange;
exports.invalid = invalid;
exports.lastChild = lastChild;
exports.lastOfType = lastOfType;
exports.left = left;
exports.link = link;
exports.onlyChild = onlyChild;
exports.onlyOfType = onlyOfType;
exports.optional = optional;
exports.outOfRange = outOfRange;
exports.readOnly = readOnly;
exports.readWrite = readWrite;
exports.required = required;
exports.right = right;
exports.root = root;
exports.scope = scope;
exports.target = target;
exports.valid = valid;
exports.visited = visited;
exports.dir = dir;
exports.lang = lang;
exports.not = not;
exports.nthChild = nthChild;
exports.nthLastChild = nthLastChild;
exports.nthLastOfType = nthLastOfType;
exports.nthOfType = nthOfType;
exports.after = after;
exports.before = before;
exports.firstLetter = firstLetter;
exports.firstLine = firstLine;
exports.selection = selection;
exports.backdrop = backdrop;
exports.placeholder = placeholder;
exports.cssFor = cssFor;
exports.attribsFor = attribsFor;

var _objectAssign = __webpack_require__(9);

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _sheet = __webpack_require__(198);

var _CSSPropertyOperations = __webpack_require__(64);

var _clean = __webpack_require__(206);

var _clean2 = _interopRequireDefault(_clean);

var _plugins = __webpack_require__(207);

var _hash = __webpack_require__(224);

var _hash2 = _interopRequireDefault(_hash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
/* stylesheet */


var styleSheet = exports.styleSheet = new _sheet.StyleSheet();
// an isomorphic StyleSheet shim. hides all the nitty gritty.

// /**************** LIFTOFF IN 3... 2... 1... ****************/
styleSheet.inject(); //eslint-disable-line indent
// /****************      TO THE MOOOOOOON     ****************/

// convenience function to toggle speedy
function speedy(bool) {
  return styleSheet.speedy(bool);
}

// plugins
// we include these by default
var plugins = exports.plugins = styleSheet.plugins = new _plugins.PluginSet([_plugins.prefixes, _plugins.contentWrap, _plugins.fallbacks]);
plugins.media = new _plugins.PluginSet(); // neat! media, font-face, keyframes
plugins.fontFace = new _plugins.PluginSet();
plugins.keyframes = new _plugins.PluginSet([_plugins.prefixes, _plugins.fallbacks]);

// define some constants

var isDev = process.env.NODE_ENV === 'development' || !process.env.NODE_ENV;
var isTest = process.env.NODE_ENV === 'test';
var isBrowser = typeof window !== 'undefined';

/**** simulations  ****/

// a flag to enable simulation meta tags on dom nodes
// defaults to true in dev mode. recommend *not* to
// toggle often.
var canSimulate = isDev;

// we use these flags for issuing warnings when simulate is called
// in prod / in incorrect order
var warned1 = false,
    warned2 = false;

// toggles simulation activity. shouldn't be needed in most cases
function simulations() {
  var bool = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

  canSimulate = !!bool;
}

// use this on dom nodes to 'simulate' pseudoclasses
// <div {...hover({ color: 'red' })} {...simulate('hover', 'visited')}>...</div>
// you can even send in some weird ones, as long as it's in simple format
// and matches an existing rule on the element
// eg simulate('nthChild2', ':hover:active') etc
function simulate() {
  for (var _len = arguments.length, pseudos = Array(_len), _key = 0; _key < _len; _key++) {
    pseudos[_key] = arguments[_key];
  }

  pseudos = (0, _clean2.default)(pseudos);
  if (!pseudos) return {};
  if (!canSimulate) {
    if (!warned1) {
      console.warn('can\'t simulate without once calling simulations(true)'); //eslint-disable-line no-console
      warned1 = true;
    }
    if (!isDev && !isTest && !warned2) {
      console.warn('don\'t use simulation outside dev'); //eslint-disable-line no-console
      warned2 = true;
    }
    return {};
  }
  return pseudos.reduce(function (o, p) {
    return o['data-simulate-' + simple(p)] = '', o;
  }, {});
}

/**** labels ****/
// toggle for debug labels.
// *shouldn't* have to mess with this manually
var hasLabels = isDev;

function cssLabels(bool) {
  hasLabels = !!bool;
}

// takes a string, converts to lowercase, strips out nonalphanumeric.
function simple(str) {
  var char = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  return str.toLowerCase().replace(/[^a-z0-9]/g, char);
}

// hashes a string to something 'unique'
// we use this to generate ids for styles


function hashify(obj) {
  var str = JSON.stringify(obj);
  var toRet = (0, _hash2.default)(str).toString(36);
  if (obj.label && obj.label.length > 0 && isDev) {
    return simple(obj.label.join('.'), '-') + '-' + toRet;
  }
  return toRet;
}

// of shape { 'data-css-<id>': '' }
function isLikeRule(rule) {
  var keys = Object.keys(rule).filter(function (x) {
    return x !== 'toString';
  });
  if (keys.length !== 1) {
    return false;
  }
  return !!/data\-css\-([a-zA-Z0-9\-_]+)/.exec(keys[0]);
}

// extracts id from a { 'data-css-<id>': ''} like object
function idFor(rule) {
  var keys = Object.keys(rule).filter(function (x) {
    return x !== 'toString';
  });
  if (keys.length !== 1) throw new Error('not a rule');
  var regex = /data\-css\-([a-zA-Z0-9\-_]+)/;
  var match = regex.exec(keys[0]);
  if (!match) throw new Error('not a rule');
  return match[1];
}

// from https://github.com/j2css/j2c/blob/5d381c2d721d04b54fabe6a165d587247c3087cb/src/helpers.js#L28-L61

// "Tokenizes" the selectors into parts relevant for the next function.
// Strings and comments are matched, but ignored afterwards.
// This is not a full tokenizers. It only recognizes comas, parentheses,
// strings and comments.
// regexp generated by scripts/regexps.js then trimmed by hand
var selectorTokenizer = /[(),]|"(?:\\.|[^"\n])*"|'(?:\\.|[^'\n])*'|\/\*[\s\S]*?\*\//g;

/**
 * This will split a coma-separated selector list into individual selectors,
 * ignoring comas in strings, comments and in :pseudo-selectors(parameter, lists).
 *
 * @param {string} selector
 * @return {string[]}
 */

function splitSelector(selector) {
  if (selector.indexOf(',') === -1) {
    return [selector];
  }

  var indices = [],
      res = [],
      inParen = 0,
      o;
  /*eslint-disable no-cond-assign*/
  while (o = selectorTokenizer.exec(selector)) {
    /*eslint-enable no-cond-assign*/
    switch (o[0]) {
      case '(':
        inParen++;break;
      case ')':
        inParen--;break;
      case ',':
        if (inParen) break;indices.push(o.index);
    }
  }
  for (o = indices.length; o--;) {
    res.unshift(selector.slice(indices[o] + 1));
    selector = selector.slice(0, indices[o]);
  }
  res.unshift(selector);
  return res;
}

function selector(id, path) {
  if (!id) {
    return path.replace(/\&/g, '');
  }
  if (!path) return '.css-' + id + ',[data-css-' + id + ']';

  var x = splitSelector(path).map(function (x) {
    return x.indexOf('&') >= 0 ? [x.replace(/\&/mg, '.css-' + id), x.replace(/\&/mg, '[data-css-' + id + ']')].join(',') // todo - make sure each sub selector has an &
    : '.css-' + id + x + ',[data-css-' + id + ']' + x;
  }).join(',');

  if (canSimulate && /^\&\:/.exec(path) && !/\s/.exec(path)) {
    x += ',.css-' + id + '[data-simulate-' + simple(path) + '],[data-css-' + id + '][data-simulate-' + simple(path) + ']';
  }
  return x;
}

// end https://github.com/j2css/j2c/blob/5d381c2d721d04b54fabe6a165d587247c3087cb/src/helpers.js#L28-L61


function toCSS(_ref) {
  var selector = _ref.selector,
      style = _ref.style;

  var result = plugins.transform({ selector: selector, style: style });
  return result.selector + '{' + (0, _CSSPropertyOperations.createMarkupForStyles)(result.style) + '}';
}

function deconstruct(style) {
  // we can be sure it's not infinitely nested here
  var plain = void 0,
      selects = void 0,
      medias = void 0,
      supports = void 0;
  Object.keys(style).forEach(function (key) {
    if (key.indexOf('&') >= 0) {
      selects = selects || {};
      selects[key] = style[key];
    } else if (key.indexOf('@media') === 0) {
      medias = medias || {};
      medias[key] = deconstruct(style[key]);
    } else if (key.indexOf('@supports') === 0) {
      supports = supports || {};
      supports[key] = deconstruct(style[key]);
    } else if (key === 'label') {
      if (style.label.length > 0) {
        plain = plain || {};
        plain.label = hasLabels ? style.label.join('.') : '';
      }
    } else {
      plain = plain || {};
      plain[key] = style[key];
    }
  });
  return { plain: plain, selects: selects, medias: medias, supports: supports };
}

function deconstructedStyleToCSS(id, style) {
  var css = [];

  // plugins here
  var plain = style.plain,
      selects = style.selects,
      medias = style.medias,
      supports = style.supports;

  if (plain) {
    css.push(toCSS({ style: plain, selector: selector(id) }));
  }
  if (selects) {
    Object.keys(selects).forEach(function (key) {
      return css.push(toCSS({ style: selects[key], selector: selector(id, key) }));
    });
  }
  if (medias) {
    Object.keys(medias).forEach(function (key) {
      return css.push(key + '{' + deconstructedStyleToCSS(id, medias[key]).join('') + '}');
    });
  }
  if (supports) {
    Object.keys(supports).forEach(function (key) {
      return css.push(key + '{' + deconstructedStyleToCSS(id, supports[key]).join('') + '}');
    });
  }
  return css;
}

// this cache to track which rules have
// been inserted into the stylesheet
var inserted = styleSheet.inserted = {};

// and helpers to insert rules into said styleSheet
function insert(spec) {
  if (!inserted[spec.id]) {
    inserted[spec.id] = true;
    var deconstructed = deconstruct(spec.style);
    var rules = deconstructedStyleToCSS(spec.id, deconstructed);
    inserted[spec.id] = isBrowser ? true : rules;
    rules.forEach(function (cssRule) {
      return styleSheet.insert(cssRule);
    });
  }
}

// a simple cache to store generated rules
var registered = styleSheet.registered = {};
function register(spec) {
  if (!registered[spec.id]) {
    registered[spec.id] = spec;
  }
}

function _getRegistered(rule) {
  if (isLikeRule(rule)) {
    var ret = registered[idFor(rule)];
    if (ret == null) {
      throw new Error('[glamor] an unexpected rule cache miss occurred. This is probably a sign of multiple glamor instances in your app. See https://github.com/threepointone/glamor/issues/79');
    }
    return ret;
  }
  return rule;
}

// todo - perf
var ruleCache = {};
function toRule(spec) {
  register(spec);
  insert(spec);

  if (ruleCache[spec.id]) {
    return ruleCache[spec.id];
  }

  var ret = _defineProperty({}, 'data-css-' + spec.id, hasLabels ? spec.label || '' : '');
  Object.defineProperty(ret, 'toString', {
    enumerable: false, value: function value() {
      return 'css-' + spec.id;
    }
  });
  ruleCache[spec.id] = ret;
  return ret;
}

function log() {
  //eslint-disable-line no-unused-vars
  console.log(this); //eslint-disable-line no-console
  return this;
}

function isSelector(key) {
  var possibles = [':', '.', '[', '>', ' '],
      found = false,
      ch = key.charAt(0);
  for (var i = 0; i < possibles.length; i++) {
    if (ch === possibles[i]) {
      found = true;
      break;
    }
  }
  return found || key.indexOf('&') >= 0;
}

function joinSelectors(a, b) {
  var as = splitSelector(a).map(function (a) {
    return !(a.indexOf('&') >= 0) ? '&' + a : a;
  });
  var bs = splitSelector(b).map(function (b) {
    return !(b.indexOf('&') >= 0) ? '&' + b : b;
  });

  return bs.reduce(function (arr, b) {
    return arr.concat(as.map(function (a) {
      return b.replace(/\&/g, a);
    }));
  }, []).join(',');
}

function joinMediaQueries(a, b) {
  return a ? '@media ' + a.substring(6) + ' and ' + b.substring(6) : b;
}

function isMediaQuery(key) {
  return key.indexOf('@media') === 0;
}

function isSupports(key) {
  return key.indexOf('@supports') === 0;
}

function joinSupports(a, b) {
  return a ? '@supports ' + a.substring(9) + ' and ' + b.substring(9) : b;
}

// flatten a nested array
function flatten(inArr) {
  var arr = [];
  for (var i = 0; i < inArr.length; i++) {
    if (Array.isArray(inArr[i])) arr = arr.concat(flatten(inArr[i]));else arr = arr.concat(inArr[i]);
  }
  return arr;
}

var prefixedPseudoSelectors = {
  '::placeholder': ['::-webkit-input-placeholder', '::-moz-placeholder', '::-ms-input-placeholder'],
  ':fullscreen': [':-webkit-full-screen', ':-moz-full-screen', ':-ms-fullscreen']

  // mutable! modifies dest.
};function build(dest, _ref2) {
  var _ref2$selector = _ref2.selector,
      selector = _ref2$selector === undefined ? '' : _ref2$selector,
      _ref2$mq = _ref2.mq,
      mq = _ref2$mq === undefined ? '' : _ref2$mq,
      _ref2$supp = _ref2.supp,
      supp = _ref2$supp === undefined ? '' : _ref2$supp,
      _ref2$src = _ref2.src,
      src = _ref2$src === undefined ? {} : _ref2$src;


  if (!Array.isArray(src)) {
    src = [src];
  }
  src = flatten(src);

  src.forEach(function (_src) {
    if (isLikeRule(_src)) {
      var reg = _getRegistered(_src);
      if (reg.type !== 'css') {
        throw new Error('cannot merge this rule');
      }
      _src = reg.style;
    }
    _src = (0, _clean2.default)(_src);
    if (_src && _src.composes) {
      build(dest, { selector: selector, mq: mq, supp: supp, src: _src.composes });
    }
    Object.keys(_src || {}).forEach(function (key) {
      if (isSelector(key)) {

        if (prefixedPseudoSelectors[key]) {
          prefixedPseudoSelectors[key].forEach(function (p) {
            return build(dest, { selector: joinSelectors(selector, p), mq: mq, supp: supp, src: _src[key] });
          });
        }

        build(dest, { selector: joinSelectors(selector, key), mq: mq, supp: supp, src: _src[key] });
      } else if (isMediaQuery(key)) {
        build(dest, { selector: selector, mq: joinMediaQueries(mq, key), supp: supp, src: _src[key] });
      } else if (isSupports(key)) {
        build(dest, { selector: selector, mq: mq, supp: joinSupports(supp, key), src: _src[key] });
      } else if (key === 'composes') {
        // ignore, we already dealth with it
      } else {
        var _dest = dest;
        if (supp) {
          _dest[supp] = _dest[supp] || {};
          _dest = _dest[supp];
        }
        if (mq) {
          _dest[mq] = _dest[mq] || {};
          _dest = _dest[mq];
        }
        if (selector) {
          _dest[selector] = _dest[selector] || {};
          _dest = _dest[selector];
        }

        if (key === 'label') {
          if (hasLabels) {
            dest.label = dest.label.concat(_src.label);
          }
        } else {
          _dest[key] = _src[key];
        }
      }
    });
  });
}

function _css(rules) {
  var style = { label: [] };
  build(style, { src: rules }); // mutative! but worth it.

  var spec = {
    id: hashify(style),
    style: style, label: hasLabels ? style.label.join('.') : '',
    type: 'css'
  };
  return toRule(spec);
}

var nullrule = {
  // 'data-css-nil': ''
};
Object.defineProperty(nullrule, 'toString', {
  enumerable: false, value: function value() {
    return 'css-nil';
  }
});

var inputCaches = typeof WeakMap !== 'undefined' ? [nullrule, new WeakMap(), new WeakMap(), new WeakMap()] : [nullrule];

var warnedWeakMapError = false;
function multiIndexCache(fn) {
  return function (args) {
    if (inputCaches[args.length]) {
      var coi = inputCaches[args.length];
      var ctr = 0;
      while (ctr < args.length - 1) {
        if (!coi.has(args[ctr])) {
          coi.set(args[ctr], new WeakMap());
        }
        coi = coi.get(args[ctr]);
        ctr++;
      }
      if (coi.has(args[args.length - 1])) {
        var ret = coi.get(args[ctr]);

        if (registered[ret.toString().substring(4)]) {
          // make sure it hasn't been flushed
          return ret;
        }
      }
    }
    var value = fn(args);
    if (inputCaches[args.length]) {
      var _ctr = 0,
          _coi = inputCaches[args.length];
      while (_ctr < args.length - 1) {
        _coi = _coi.get(args[_ctr]);
        _ctr++;
      }
      try {
        _coi.set(args[_ctr], value);
      } catch (err) {
        if (isDev && !warnedWeakMapError) {
          var _console;

          warnedWeakMapError = true;
          (_console = console).warn.apply(_console, ['failed setting the WeakMap cache for args:'].concat(_toConsumableArray(args))); // eslint-disable-line no-console
          console.warn('this should NOT happen, please file a bug on the github repo.'); // eslint-disable-line no-console
        }
      }
    }
    return value;
  };
}

var cachedCss = typeof WeakMap !== 'undefined' ? multiIndexCache(_css) : _css;

function css() {
  for (var _len2 = arguments.length, rules = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    rules[_key2] = arguments[_key2];
  }

  if (rules[0] && rules[0].length && rules[0].raw) {
    throw new Error('you forgot to include glamor/babel in your babel plugins.');
  }

  rules = (0, _clean2.default)(rules);
  if (!rules) {
    return nullrule;
  }

  return cachedCss(rules);
}

css.insert = function (css) {
  var spec = {
    id: hashify(css),
    css: css,
    type: 'raw'
  };
  register(spec);
  if (!inserted[spec.id]) {
    styleSheet.insert(spec.css);
    inserted[spec.id] = isBrowser ? true : [spec.css];
  }
};

var insertRule = exports.insertRule = css.insert;

css.global = function (selector, style) {
  style = (0, _clean2.default)(style);
  if (style) {
    return css.insert(toCSS({ selector: selector, style: style }));
  }
};

var insertGlobal = exports.insertGlobal = css.global;

function insertKeyframe(spec) {
  if (!inserted[spec.id]) {
    var inner = Object.keys(spec.keyframes).map(function (kf) {
      var result = plugins.keyframes.transform({ id: spec.id, name: kf, style: spec.keyframes[kf] });
      return result.name + '{' + (0, _CSSPropertyOperations.createMarkupForStyles)(result.style) + '}';
    }).join('');

    var rules = ['-webkit-', '-moz-', '-o-', ''].map(function (prefix) {
      return '@' + prefix + 'keyframes ' + (spec.name + '_' + spec.id) + '{' + inner + '}';
    });
    rules.forEach(function (rule) {
      return styleSheet.insert(rule);
    });

    inserted[spec.id] = isBrowser ? true : rules;
  }
}
css.keyframes = function (name, kfs) {
  if (!kfs) {
    kfs = name, name = 'animation';
  }

  // do not ignore empty keyframe definitions for now.
  kfs = (0, _clean2.default)(kfs) || {};
  var spec = {
    id: hashify({ name: name, kfs: kfs }),
    type: 'keyframes',
    name: name,
    keyframes: kfs
  };
  register(spec);
  insertKeyframe(spec);
  return name + '_' + spec.id;
};

// we don't go all out for fonts as much, giving a simple font loading strategy
// use a fancier lib if you need moar power
css.fontFace = function (font) {
  font = (0, _clean2.default)(font);
  var spec = {
    id: hashify(font),
    type: 'font-face',
    font: font
  };
  register(spec);
  insertFontFace(spec);

  return font.fontFamily;
};

var fontFace = exports.fontFace = css.fontFace;
var keyframes = exports.keyframes = css.keyframes;

function insertFontFace(spec) {
  if (!inserted[spec.id]) {
    var rule = '@font-face{' + (0, _CSSPropertyOperations.createMarkupForStyles)(spec.font) + '}';
    styleSheet.insert(rule);
    inserted[spec.id] = isBrowser ? true : [rule];
  }
}

// rehydrate the insertion cache with ids sent from
// renderStatic / renderStaticOptimized
function rehydrate(ids) {
  // load up ids
  (0, _objectAssign2.default)(inserted, ids.reduce(function (o, i) {
    return o[i] = true, o;
  }, {}));
  // assume css loaded separately
}

// clears out the cache and empties the stylesheet
// best for tests, though there might be some value for SSR.

function flush() {
  inserted = styleSheet.inserted = {};
  registered = styleSheet.registered = {};
  ruleCache = {};
  styleSheet.flush();
  styleSheet.inject();
}

var presets = exports.presets = {
  mobile: '(min-width: 400px)',
  Mobile: '@media (min-width: 400px)',
  phablet: '(min-width: 550px)',
  Phablet: '@media (min-width: 550px)',
  tablet: '(min-width: 750px)',
  Tablet: '@media (min-width: 750px)',
  desktop: '(min-width: 1000px)',
  Desktop: '@media (min-width: 1000px)',
  hd: '(min-width: 1200px)',
  Hd: '@media (min-width: 1200px)'
};

var style = exports.style = css;

function select(selector) {
  for (var _len3 = arguments.length, styles = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
    styles[_key3 - 1] = arguments[_key3];
  }

  if (!selector) {
    return style(styles);
  }
  return css(_defineProperty({}, selector, styles));
}
var $ = exports.$ = select;

function parent(selector) {
  for (var _len4 = arguments.length, styles = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
    styles[_key4 - 1] = arguments[_key4];
  }

  return css(_defineProperty({}, selector + ' &', styles));
}

var merge = exports.merge = css;
var compose = exports.compose = css;

function media(query) {
  for (var _len5 = arguments.length, rules = Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
    rules[_key5 - 1] = arguments[_key5];
  }

  return css(_defineProperty({}, '@media ' + query, rules));
}

function pseudo(selector) {
  for (var _len6 = arguments.length, styles = Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
    styles[_key6 - 1] = arguments[_key6];
  }

  return css(_defineProperty({}, selector, styles));
}

// allllll the pseudoclasses

function active(x) {
  return pseudo(':active', x);
}

function any(x) {
  return pseudo(':any', x);
}

function checked(x) {
  return pseudo(':checked', x);
}

function disabled(x) {
  return pseudo(':disabled', x);
}

function empty(x) {
  return pseudo(':empty', x);
}

function enabled(x) {
  return pseudo(':enabled', x);
}

function _default(x) {
  return pseudo(':default', x); // note '_default' name
}

function first(x) {
  return pseudo(':first', x);
}

function firstChild(x) {
  return pseudo(':first-child', x);
}

function firstOfType(x) {
  return pseudo(':first-of-type', x);
}

function fullscreen(x) {
  return pseudo(':fullscreen', x);
}

function focus(x) {
  return pseudo(':focus', x);
}

function hover(x) {
  return pseudo(':hover', x);
}

function indeterminate(x) {
  return pseudo(':indeterminate', x);
}

function inRange(x) {
  return pseudo(':in-range', x);
}

function invalid(x) {
  return pseudo(':invalid', x);
}

function lastChild(x) {
  return pseudo(':last-child', x);
}

function lastOfType(x) {
  return pseudo(':last-of-type', x);
}

function left(x) {
  return pseudo(':left', x);
}

function link(x) {
  return pseudo(':link', x);
}

function onlyChild(x) {
  return pseudo(':only-child', x);
}

function onlyOfType(x) {
  return pseudo(':only-of-type', x);
}

function optional(x) {
  return pseudo(':optional', x);
}

function outOfRange(x) {
  return pseudo(':out-of-range', x);
}

function readOnly(x) {
  return pseudo(':read-only', x);
}

function readWrite(x) {
  return pseudo(':read-write', x);
}

function required(x) {
  return pseudo(':required', x);
}

function right(x) {
  return pseudo(':right', x);
}

function root(x) {
  return pseudo(':root', x);
}

function scope(x) {
  return pseudo(':scope', x);
}

function target(x) {
  return pseudo(':target', x);
}

function valid(x) {
  return pseudo(':valid', x);
}

function visited(x) {
  return pseudo(':visited', x);
}

// parameterized pseudoclasses
function dir(p, x) {
  return pseudo(':dir(' + p + ')', x);
}
function lang(p, x) {
  return pseudo(':lang(' + p + ')', x);
}
function not(p, x) {
  // should this be a plugin?
  var selector = p.split(',').map(function (x) {
    return x.trim();
  }).map(function (x) {
    return ':not(' + x + ')';
  });
  if (selector.length === 1) {
    return pseudo(':not(' + p + ')', x);
  }
  return select(selector.join(''), x);
}
function nthChild(p, x) {
  return pseudo(':nth-child(' + p + ')', x);
}
function nthLastChild(p, x) {
  return pseudo(':nth-last-child(' + p + ')', x);
}
function nthLastOfType(p, x) {
  return pseudo(':nth-last-of-type(' + p + ')', x);
}
function nthOfType(p, x) {
  return pseudo(':nth-of-type(' + p + ')', x);
}

// pseudoelements
function after(x) {
  return pseudo('::after', x);
}
function before(x) {
  return pseudo('::before', x);
}
function firstLetter(x) {
  return pseudo('::first-letter', x);
}
function firstLine(x) {
  return pseudo('::first-line', x);
}
function selection(x) {
  return pseudo('::selection', x);
}
function backdrop(x) {
  return pseudo('::backdrop', x);
}
function placeholder(x) {
  // https://github.com/threepointone/glamor/issues/14
  return css({ '::placeholder': x });
}

/*** helpers for web components ***/
// https://github.com/threepointone/glamor/issues/16

function cssFor() {
  for (var _len7 = arguments.length, rules = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
    rules[_key7] = arguments[_key7];
  }

  rules = (0, _clean2.default)(rules);
  return rules ? rules.map(function (r) {
    var style = { label: [] };
    build(style, { src: r }); // mutative! but worth it.
    return deconstructedStyleToCSS(hashify(style), deconstruct(style)).join('');
  }).join('') : '';
}

function attribsFor() {
  for (var _len8 = arguments.length, rules = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
    rules[_key8] = arguments[_key8];
  }

  rules = (0, _clean2.default)(rules);
  var htmlAttributes = rules ? rules.map(function (rule) {
    idFor(rule); // throwaway check for rule
    var key = Object.keys(rule)[0],
        value = rule[key];
    return key + '="' + (value || '') + '"';
  }).join(' ') : '';

  return htmlAttributes;
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 198 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StyleSheet = StyleSheet;

var _objectAssign = __webpack_require__(9);

var _objectAssign2 = _interopRequireDefault(_objectAssign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/* 

high performance StyleSheet for css-in-js systems 

- uses multiple style tags behind the scenes for millions of rules 
- uses `insertRule` for appending in production for *much* faster performance
- 'polyfills' on server side 


// usage

import StyleSheet from 'glamor/lib/sheet'
let styleSheet = new StyleSheet()

styleSheet.inject() 
- 'injects' the stylesheet into the page (or into memory if on server)

styleSheet.insert('#box { border: 1px solid red; }') 
- appends a css rule into the stylesheet 

styleSheet.flush() 
- empties the stylesheet of all its contents


*/

function last(arr) {
  return arr[arr.length - 1];
}

function sheetForTag(tag) {
  if (tag.sheet) {
    return tag.sheet;
  }

  // this weirdness brought to you by firefox 
  for (var i = 0; i < document.styleSheets.length; i++) {
    if (document.styleSheets[i].ownerNode === tag) {
      return document.styleSheets[i];
    }
  }
}

var isBrowser = typeof window !== 'undefined';
var isDev = process.env.NODE_ENV === 'development' || !process.env.NODE_ENV; //(x => (x === 'development') || !x)(process.env.NODE_ENV)
var isTest = process.env.NODE_ENV === 'test';

var oldIE = function () {
  if (isBrowser) {
    var div = document.createElement('div');
    div.innerHTML = '<!--[if lt IE 10]><i></i><![endif]-->';
    return div.getElementsByTagName('i').length === 1;
  }
}();

function makeStyleTag() {
  var tag = document.createElement('style');
  tag.type = 'text/css';
  tag.setAttribute('data-glamor', '');
  tag.appendChild(document.createTextNode(''));
  (document.head || document.getElementsByTagName('head')[0]).appendChild(tag);
  return tag;
}

function StyleSheet() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$speedy = _ref.speedy,
      speedy = _ref$speedy === undefined ? !isDev && !isTest : _ref$speedy,
      _ref$maxLength = _ref.maxLength,
      maxLength = _ref$maxLength === undefined ? isBrowser && oldIE ? 4000 : 65000 : _ref$maxLength;

  this.isSpeedy = speedy; // the big drawback here is that the css won't be editable in devtools
  this.sheet = undefined;
  this.tags = [];
  this.maxLength = maxLength;
  this.ctr = 0;
}

(0, _objectAssign2.default)(StyleSheet.prototype, {
  getSheet: function getSheet() {
    return sheetForTag(last(this.tags));
  },
  inject: function inject() {
    var _this = this;

    if (this.injected) {
      throw new Error('already injected stylesheet!');
    }
    if (isBrowser) {
      this.tags[0] = makeStyleTag();
    } else {
      // server side 'polyfill'. just enough behavior to be useful.
      this.sheet = {
        cssRules: [],
        insertRule: function insertRule(rule) {
          // enough 'spec compliance' to be able to extract the rules later  
          // in other words, just the cssText field 
          _this.sheet.cssRules.push({ cssText: rule });
        }
      };
    }
    this.injected = true;
  },
  speedy: function speedy(bool) {
    if (this.ctr !== 0) {
      throw new Error('cannot change speedy mode after inserting any rule to sheet. Either call speedy(' + bool + ') earlier in your app, or call flush() before speedy(' + bool + ')');
    }
    this.isSpeedy = !!bool;
  },
  _insert: function _insert(rule) {
    // this weirdness for perf, and chrome's weird bug 
    // https://stackoverflow.com/questions/20007992/chrome-suddenly-stopped-accepting-insertrule
    try {
      var sheet = this.getSheet();
      sheet.insertRule(rule, rule.indexOf('@import') !== -1 ? 0 : sheet.cssRules.length);
    } catch (e) {
      if (isDev) {
        // might need beter dx for this 
        console.warn('whoops, illegal rule inserted', rule); //eslint-disable-line no-console
      }
    }
  },
  insert: function insert(rule) {

    if (isBrowser) {
      // this is the ultrafast version, works across browsers 
      if (this.isSpeedy && this.getSheet().insertRule) {
        this._insert(rule);
      }
      // more browser weirdness. I don't even know    
      // else if(this.tags.length > 0 && this.tags::last().styleSheet) {      
      //   this.tags::last().styleSheet.cssText+= rule
      // }
      else {
          if (rule.indexOf('@import') !== -1) {
            var tag = last(this.tags);
            tag.insertBefore(document.createTextNode(rule), tag.firstChild);
          } else {
            last(this.tags).appendChild(document.createTextNode(rule));
          }
        }
    } else {
      // server side is pretty simple         
      this.sheet.insertRule(rule, rule.indexOf('@import') !== -1 ? 0 : this.sheet.cssRules.length);
    }

    this.ctr++;
    if (isBrowser && this.ctr % this.maxLength === 0) {
      this.tags.push(makeStyleTag());
    }
    return this.ctr - 1;
  },

  // commenting this out till we decide on v3's decision 
  // _replace(index, rule) {
  //   // this weirdness for perf, and chrome's weird bug 
  //   // https://stackoverflow.com/questions/20007992/chrome-suddenly-stopped-accepting-insertrule
  //   try {  
  //     let sheet = this.getSheet()        
  //     sheet.deleteRule(index) // todo - correct index here     
  //     sheet.insertRule(rule, index)
  //   }
  //   catch(e) {
  //     if(isDev) {
  //       // might need beter dx for this 
  //       console.warn('whoops, problem replacing rule', rule) //eslint-disable-line no-console
  //     }          
  //   }          

  // }
  // replace(index, rule) {
  //   if(isBrowser) {
  //     if(this.isSpeedy && this.getSheet().insertRule) {
  //       this._replace(index, rule)
  //     }
  //     else {
  //       let _slot = Math.floor((index  + this.maxLength) / this.maxLength) - 1        
  //       let _index = (index % this.maxLength) + 1
  //       let tag = this.tags[_slot]
  //       tag.replaceChild(document.createTextNode(rule), tag.childNodes[_index])
  //     }
  //   }
  //   else {
  //     let rules = this.sheet.cssRules
  //     this.sheet.cssRules = [ ...rules.slice(0, index), { cssText: rule }, ...rules.slice(index + 1) ]
  //   }
  // }
  delete: function _delete(index) {
    // we insert a blank rule when 'deleting' so previously returned indexes remain stable
    return this.replace(index, '');
  },
  flush: function flush() {
    if (isBrowser) {
      this.tags.forEach(function (tag) {
        return tag.parentNode.removeChild(tag);
      });
      this.tags = [];
      this.sheet = null;
      this.ctr = 0;
      // todo - look for remnants in document.styleSheets
    } else {
      // simpler on server 
      this.sheet.cssRules = [];
    }
    this.injected = false;
  },
  rules: function rules() {
    if (!isBrowser) {
      return this.sheet.cssRules;
    }
    var arr = [];
    this.tags.forEach(function (tag) {
      return arr.splice.apply(arr, [arr.length, 0].concat(_toConsumableArray(Array.from(sheetForTag(tag).cssRules))));
    });
    return arr;
  }
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 199 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @typechecks
 */



var camelize = __webpack_require__(200);

var msPattern = /^-ms-/;

/**
 * Camelcases a hyphenated CSS property name, for example:
 *
 *   > camelizeStyleName('background-color')
 *   < "backgroundColor"
 *   > camelizeStyleName('-moz-transition')
 *   < "MozTransition"
 *   > camelizeStyleName('-ms-transition')
 *   < "msTransition"
 *
 * As Andi Smith suggests
 * (http://www.andismith.com/blog/2012/02/modernizr-prefixed/), an `-ms` prefix
 * is converted to lowercase `ms`.
 *
 * @param {string} string
 * @return {string}
 */
function camelizeStyleName(string) {
  return camelize(string.replace(msPattern, 'ms-'));
}

module.exports = camelizeStyleName;

/***/ }),
/* 200 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @typechecks
 */

var _hyphenPattern = /-(.)/g;

/**
 * Camelcases a hyphenated string, for example:
 *
 *   > camelize('background-color')
 *   < "backgroundColor"
 *
 * @param {string} string
 * @return {string}
 */
function camelize(string) {
  return string.replace(_hyphenPattern, function (_, character) {
    return character.toUpperCase();
  });
}

module.exports = camelize;

/***/ }),
/* 201 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _CSSProperty = __webpack_require__(202);

var _CSSProperty2 = _interopRequireDefault(_CSSProperty);

var _warning = __webpack_require__(6);

var _warning2 = _interopRequireDefault(_warning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule dangerousStyleValue
 */

var isUnitlessNumber = _CSSProperty2.default.isUnitlessNumber;
var styleWarnings = {};

/**
 * Convert a value into the proper css writable value. The style name `name`
 * should be logical (no hyphens), as specified
 * in `CSSProperty.isUnitlessNumber`.
 *
 * @param {string} name CSS property name such as `topMargin`.
 * @param {*} value CSS property value such as `10px`.
 * @param {ReactDOMComponent} component
 * @return {string} Normalized style value with dimensions applied.
 */
function dangerousStyleValue(name, value, component) {
  // Note that we've removed escapeTextForBrowser() calls here since the
  // whole string will be escaped when the attribute is injected into
  // the markup. If you provide unsafe user data here they can inject
  // arbitrary CSS which may be problematic (I couldn't repro this):
  // https://www.owasp.org/index.php/XSS_Filter_Evasion_Cheat_Sheet
  // http://www.thespanner.co.uk/2007/11/26/ultimate-xss-css-injection/
  // This is not an XSS hole but instead a potential CSS injection issue
  // which has lead to a greater discussion about how we're going to
  // trust URLs moving forward. See #2115901

  var isEmpty = value == null || typeof value === 'boolean' || value === '';
  if (isEmpty) {
    return '';
  }

  var isNonNumeric = isNaN(value);
  if (isNonNumeric || value === 0 || isUnitlessNumber.hasOwnProperty(name) && isUnitlessNumber[name]) {
    return '' + value; // cast to string
  }

  if (typeof value === 'string') {
    if (process.env.NODE_ENV !== 'production') {
      // Allow '0' to pass through without warning. 0 is already special and
      // doesn't require units, so we don't need to warn about it.
      if (component && value !== '0') {
        var owner = component._currentElement._owner;
        var ownerName = owner ? owner.getName() : null;
        if (ownerName && !styleWarnings[ownerName]) {
          styleWarnings[ownerName] = {};
        }
        var warned = false;
        if (ownerName) {
          var warnings = styleWarnings[ownerName];
          warned = warnings[name];
          if (!warned) {
            warnings[name] = true;
          }
        }
        if (!warned) {
          process.env.NODE_ENV !== 'production' ? (0, _warning2.default)(false, 'a `%s` tag (owner: `%s`) was passed a numeric string value ' + 'for CSS property `%s` (value: `%s`) which will be treated ' + 'as a unitless number in a future version of React.', component._currentElement.type, ownerName || 'unknown', name, value) : void 0;
        }
      }
    }
    value = value.trim();
  }
  return value + 'px';
}

exports.default = dangerousStyleValue;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 202 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule CSSProperty
 */

/**
 * CSS properties which accept numbers but are not in units of "px".
 */

var isUnitlessNumber = {
  animationIterationCount: true,
  borderImageOutset: true,
  borderImageSlice: true,
  borderImageWidth: true,
  boxFlex: true,
  boxFlexGroup: true,
  boxOrdinalGroup: true,
  columnCount: true,
  flex: true,
  flexGrow: true,
  flexPositive: true,
  flexShrink: true,
  flexNegative: true,
  flexOrder: true,
  gridRow: true,
  gridRowStart: true,
  gridRowEnd: true,
  gridColumn: true,
  gridColumnStart: true,
  gridColumnEnd: true,
  fontWeight: true,
  lineClamp: true,
  lineHeight: true,
  opacity: true,
  order: true,
  orphans: true,
  tabSize: true,
  widows: true,
  zIndex: true,
  zoom: true,

  // SVG-related properties
  fillOpacity: true,
  floodOpacity: true,
  stopOpacity: true,
  strokeDasharray: true,
  strokeDashoffset: true,
  strokeMiterlimit: true,
  strokeOpacity: true,
  strokeWidth: true

  /**
   * @param {string} prefix vendor-specific prefix, eg: Webkit
   * @param {string} key style name, eg: transitionDuration
   * @return {string} style name prefixed with `prefix`, properly camelCased, eg:
   * WebkitTransitionDuration
   */
};function prefixKey(prefix, key) {
  return prefix + key.charAt(0).toUpperCase() + key.substring(1);
}

/**
 * Support style names that may come passed in prefixed by adding permutations
 * of vendor prefixes.
 */
var prefixes = ['Webkit', 'ms', 'Moz', 'O'];

// Using Object.keys here, or else the vanilla for-in loop makes IE8 go into an
// infinite loop, because it iterates over the newly added props too.
Object.keys(isUnitlessNumber).forEach(function (prop) {
  prefixes.forEach(function (prefix) {
    isUnitlessNumber[prefixKey(prefix, prop)] = isUnitlessNumber[prop];
  });
});

/**
 * Most style properties can be unset by doing .style[prop] = '' but IE8
 * doesn't like doing that with shorthand properties so for the properties that
 * IE8 breaks on, which are listed here, we instead unset each of the
 * individual properties. See http://bugs.jquery.com/ticket/12385.
 * The 4-value 'clock' properties like margin, padding, border-width seem to
 * behave without any problems. Curiously, list-style works too without any
 * special prodding.
 */
var shorthandPropertyExpansions = {
  background: {
    backgroundAttachment: true,
    backgroundColor: true,
    backgroundImage: true,
    backgroundPositionX: true,
    backgroundPositionY: true,
    backgroundRepeat: true
  },
  backgroundPosition: {
    backgroundPositionX: true,
    backgroundPositionY: true
  },
  border: {
    borderWidth: true,
    borderStyle: true,
    borderColor: true
  },
  borderBottom: {
    borderBottomWidth: true,
    borderBottomStyle: true,
    borderBottomColor: true
  },
  borderLeft: {
    borderLeftWidth: true,
    borderLeftStyle: true,
    borderLeftColor: true
  },
  borderRight: {
    borderRightWidth: true,
    borderRightStyle: true,
    borderRightColor: true
  },
  borderTop: {
    borderTopWidth: true,
    borderTopStyle: true,
    borderTopColor: true
  },
  font: {
    fontStyle: true,
    fontVariant: true,
    fontWeight: true,
    fontSize: true,
    lineHeight: true,
    fontFamily: true
  },
  outline: {
    outlineWidth: true,
    outlineStyle: true,
    outlineColor: true
  }
};

var CSSProperty = {
  isUnitlessNumber: isUnitlessNumber,
  shorthandPropertyExpansions: shorthandPropertyExpansions
};

exports.default = CSSProperty;

/***/ }),
/* 203 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @typechecks
 */



var hyphenate = __webpack_require__(204);

var msPattern = /^ms-/;

/**
 * Hyphenates a camelcased CSS property name, for example:
 *
 *   > hyphenateStyleName('backgroundColor')
 *   < "background-color"
 *   > hyphenateStyleName('MozTransition')
 *   < "-moz-transition"
 *   > hyphenateStyleName('msTransition')
 *   < "-ms-transition"
 *
 * As Modernizr suggests (http://modernizr.com/docs/#prefixed), an `ms` prefix
 * is converted to `-ms-`.
 *
 * @param {string} string
 * @return {string}
 */
function hyphenateStyleName(string) {
  return hyphenate(string).replace(msPattern, '-ms-');
}

module.exports = hyphenateStyleName;

/***/ }),
/* 204 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @typechecks
 */

var _uppercasePattern = /([A-Z])/g;

/**
 * Hyphenates a camelcased string, for example:
 *
 *   > hyphenate('backgroundColor')
 *   < "background-color"
 *
 * For CSS style names, use `hyphenateStyleName` instead which works properly
 * with all vendor prefixes, including `ms`.
 *
 * @param {string} string
 * @return {string}
 */
function hyphenate(string) {
  return string.replace(_uppercasePattern, '-$1').toLowerCase();
}

module.exports = hyphenate;

/***/ }),
/* 205 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 * @typechecks static-only
 */



/**
 * Memoizes the return value of a function that accepts one string argument.
 */

function memoizeStringOnly(callback) {
  var cache = {};
  return function (string) {
    if (!cache.hasOwnProperty(string)) {
      cache[string] = callback.call(this, string);
    }
    return cache[string];
  };
}

module.exports = memoizeStringOnly;

/***/ }),
/* 206 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = clean;
// Returns true for null, false, undefined and {}
function isFalsy(value) {
  return value === null || value === undefined || value === false || (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && Object.keys(value).length === 0;
}

function cleanObject(object) {
  if (isFalsy(object)) return null;
  if ((typeof object === 'undefined' ? 'undefined' : _typeof(object)) !== 'object') return object;

  var acc = {},
      keys = Object.keys(object),
      hasFalsy = false;
  for (var i = 0; i < keys.length; i++) {
    var value = object[keys[i]];
    var filteredValue = clean(value);
    if (filteredValue === null || filteredValue !== value) {
      hasFalsy = true;
    }
    if (filteredValue !== null) {
      acc[keys[i]] = filteredValue;
    }
  }
  return Object.keys(acc).length === 0 ? null : hasFalsy ? acc : object;
}

function cleanArray(rules) {
  var hasFalsy = false;
  var filtered = [];
  rules.forEach(function (rule) {
    var filteredRule = clean(rule);
    if (filteredRule === null || filteredRule !== rule) {
      hasFalsy = true;
    }
    if (filteredRule !== null) {
      filtered.push(filteredRule);
    }
  });
  return filtered.length == 0 ? null : hasFalsy ? filtered : rules;
}

// Takes style array or object provided by user and clears all the falsy data 
// If there is no styles left after filtration returns null
function clean(input) {
  return Array.isArray(input) ? cleanArray(input) : cleanObject(input);
}

/***/ }),
/* 207 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.PluginSet = PluginSet;
exports.fallbacks = fallbacks;
exports.contentWrap = contentWrap;
exports.prefixes = prefixes;

var _objectAssign = __webpack_require__(9);

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _CSSPropertyOperations = __webpack_require__(64);

var _prefixer = __webpack_require__(208);

var _prefixer2 = _interopRequireDefault(_prefixer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isDev = function (x) {
  return x === 'development' || !x;
}(process.env.NODE_ENV);

function PluginSet(initial) {
  this.fns = initial || [];
}

(0, _objectAssign2.default)(PluginSet.prototype, {
  add: function add() {
    var _this = this;

    for (var _len = arguments.length, fns = Array(_len), _key = 0; _key < _len; _key++) {
      fns[_key] = arguments[_key];
    }

    fns.forEach(function (fn) {
      if (_this.fns.indexOf(fn) >= 0) {
        if (isDev) {
          console.warn('adding the same plugin again, ignoring'); //eslint-disable-line no-console
        }
      } else {
        _this.fns = [fn].concat(_this.fns);
      }
    });
  },
  remove: function remove(fn) {
    this.fns = this.fns.filter(function (x) {
      return x !== fn;
    });
  },
  clear: function clear() {
    this.fns = [];
  },
  transform: function transform(o) {
    return this.fns.reduce(function (o, fn) {
      return fn(o);
    }, o);
  }
});

function fallbacks(node) {
  var hasArray = Object.keys(node.style).map(function (x) {
    return Array.isArray(node.style[x]);
  }).indexOf(true) >= 0;
  if (hasArray) {
    var style = node.style;

    var flattened = Object.keys(style).reduce(function (o, key) {
      o[key] = Array.isArray(style[key]) ? style[key].join('; ' + (0, _CSSPropertyOperations.processStyleName)(key) + ': ') : style[key];
      return o;
    }, {});
    // todo - 
    // flatten arrays which haven't been flattened yet 
    return (0, _objectAssign2.default)({}, node, { style: flattened });
  }
  return node;
}

var contentValues = ['normal', 'none', 'counter', 'open-quote', 'close-quote', 'no-open-quote', 'no-close-quote', 'initial', 'inherit'];

function contentWrap(node) {
  if (node.style.content) {
    var cont = node.style.content;
    if (contentValues.indexOf(cont) >= 0) {
      return node;
    }
    if (/^(attr|calc|counters?|url)\(/.test(cont)) {
      return node;
    }
    if (cont.charAt(0) === cont.charAt(cont.length - 1) && (cont.charAt(0) === '"' || cont.charAt(0) === "'")) {
      return node;
    }
    return _extends({}, node, { style: _extends({}, node.style, { content: '"' + cont + '"' }) });
  }
  return node;
}

function prefixes(node) {
  return (0, _objectAssign2.default)({}, node, { style: (0, _prefixer2.default)(_extends({}, node.style)) });
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 208 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = prefixer;

var _staticData = __webpack_require__(209);

var _staticData2 = _interopRequireDefault(_staticData);

var _prefixProperty = __webpack_require__(210);

var _prefixProperty2 = _interopRequireDefault(_prefixProperty);

var _prefixValue = __webpack_require__(211);

var _prefixValue2 = _interopRequireDefault(_prefixValue);

var _cursor = __webpack_require__(212);

var _cursor2 = _interopRequireDefault(_cursor);

var _crossFade = __webpack_require__(213);

var _crossFade2 = _interopRequireDefault(_crossFade);

var _filter = __webpack_require__(214);

var _filter2 = _interopRequireDefault(_filter);

var _flex = __webpack_require__(215);

var _flex2 = _interopRequireDefault(_flex);

var _flexboxOld = __webpack_require__(216);

var _flexboxOld2 = _interopRequireDefault(_flexboxOld);

var _gradient = __webpack_require__(217);

var _gradient2 = _interopRequireDefault(_gradient);

var _imageSet = __webpack_require__(218);

var _imageSet2 = _interopRequireDefault(_imageSet);

var _position = __webpack_require__(219);

var _position2 = _interopRequireDefault(_position);

var _sizing = __webpack_require__(220);

var _sizing2 = _interopRequireDefault(_sizing);

var _transition = __webpack_require__(221);

var _transition2 = _interopRequireDefault(_transition);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var plugins = [_crossFade2.default, _cursor2.default, _filter2.default, _flexboxOld2.default, _gradient2.default, _imageSet2.default, _position2.default, _sizing2.default, _transition2.default, _flex2.default]; // custom facade for inline-style-prefixer

var prefixMap = _staticData2.default.prefixMap;

function prefixer(style) {
  for (var property in style) {
    var value = style[property];

    var processedValue = (0, _prefixValue2.default)(plugins, property, value, style, prefixMap);

    // only modify the value if it was touched
    // by any plugin to prevent unnecessary mutations
    if (processedValue) {
      style[property] = processedValue;
    }

    (0, _prefixProperty2.default)(prefixMap, property, style);
  }
  return style;
}

/***/ }),
/* 209 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var w = ["Webkit"];
var m = ["Moz"];
var ms = ["ms"];
var wm = ["Webkit", "Moz"];
var wms = ["Webkit", "ms"];
var wmms = ["Webkit", "Moz", "ms"];

exports.default = {
  plugins: [],
  prefixMap: { "appearance": wm, "userSelect": wmms, "textEmphasisPosition": w, "textEmphasis": w, "textEmphasisStyle": w, "textEmphasisColor": w, "boxDecorationBreak": w, "clipPath": w, "maskImage": w, "maskMode": w, "maskRepeat": w, "maskPosition": w, "maskClip": w, "maskOrigin": w, "maskSize": w, "maskComposite": w, "mask": w, "maskBorderSource": w, "maskBorderMode": w, "maskBorderSlice": w, "maskBorderWidth": w, "maskBorderOutset": w, "maskBorderRepeat": w, "maskBorder": w, "maskType": w, "textDecorationStyle": w, "textDecorationSkip": w, "textDecorationLine": w, "textDecorationColor": w, "filter": w, "fontFeatureSettings": w, "breakAfter": wmms, "breakBefore": wmms, "breakInside": wmms, "columnCount": wm, "columnFill": wm, "columnGap": wm, "columnRule": wm, "columnRuleColor": wm, "columnRuleStyle": wm, "columnRuleWidth": wm, "columns": wm, "columnSpan": wm, "columnWidth": wm, "flex": w, "flexBasis": w, "flexDirection": w, "flexGrow": w, "flexFlow": w, "flexShrink": w, "flexWrap": w, "alignContent": w, "alignItems": w, "alignSelf": w, "justifyContent": w, "order": w, "transform": w, "transformOrigin": w, "transformOriginX": w, "transformOriginY": w, "backfaceVisibility": w, "perspective": w, "perspectiveOrigin": w, "transformStyle": w, "transformOriginZ": w, "animation": w, "animationDelay": w, "animationDirection": w, "animationFillMode": w, "animationDuration": w, "animationIterationCount": w, "animationName": w, "animationPlayState": w, "animationTimingFunction": w, "backdropFilter": w, "fontKerning": w, "scrollSnapType": wms, "scrollSnapPointsX": wms, "scrollSnapPointsY": wms, "scrollSnapDestination": wms, "scrollSnapCoordinate": wms, "shapeImageThreshold": w, "shapeImageMargin": w, "shapeImageOutside": w, "hyphens": wmms, "flowInto": wms, "flowFrom": wms, "regionFragment": wms, "textAlignLast": m, "tabSize": m, "wrapFlow": ms, "wrapThrough": ms, "wrapMargin": ms, "gridTemplateColumns": ms, "gridTemplateRows": ms, "gridTemplateAreas": ms, "gridTemplate": ms, "gridAutoColumns": ms, "gridAutoRows": ms, "gridAutoFlow": ms, "grid": ms, "gridRowStart": ms, "gridColumnStart": ms, "gridRowEnd": ms, "gridRow": ms, "gridColumn": ms, "gridColumnEnd": ms, "gridColumnGap": ms, "gridRowGap": ms, "gridArea": ms, "gridGap": ms, "textSizeAdjust": wms, "borderImage": w, "borderImageOutset": w, "borderImageRepeat": w, "borderImageSlice": w, "borderImageSource": w, "borderImageWidth": w, "transitionDelay": w, "transitionDuration": w, "transitionProperty": w, "transitionTimingFunction": w }
};
module.exports = exports["default"];

/***/ }),
/* 210 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = prefixProperty;

var _capitalizeString = __webpack_require__(65);

var _capitalizeString2 = _interopRequireDefault(_capitalizeString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function prefixProperty(prefixProperties, property, style) {
  if (prefixProperties.hasOwnProperty(property)) {
    var requiredPrefixes = prefixProperties[property];
    for (var i = 0, len = requiredPrefixes.length; i < len; ++i) {
      style[requiredPrefixes[i] + (0, _capitalizeString2.default)(property)] = style[property];
    }
  }
}
module.exports = exports['default'];

/***/ }),
/* 211 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = prefixValue;
function prefixValue(plugins, property, value, style, metaData) {
  for (var i = 0, len = plugins.length; i < len; ++i) {
    var processedValue = plugins[i](property, value, style, metaData

    // we can stop processing if a value is returned
    // as all plugin criteria are unique
    );if (processedValue) {
      return processedValue;
    }
  }
}
module.exports = exports["default"];

/***/ }),
/* 212 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = cursor;
var prefixes = ['-webkit-', '-moz-', ''];

var values = {
  'zoom-in': true,
  'zoom-out': true,
  grab: true,
  grabbing: true
};

function cursor(property, value) {
  if (property === 'cursor' && values.hasOwnProperty(value)) {
    return prefixes.map(function (prefix) {
      return prefix + value;
    });
  }
}
module.exports = exports['default'];

/***/ }),
/* 213 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = crossFade;

var _isPrefixedValue = __webpack_require__(18);

var _isPrefixedValue2 = _interopRequireDefault(_isPrefixedValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// http://caniuse.com/#search=cross-fade
var prefixes = ['-webkit-', ''];
function crossFade(property, value) {
  if (typeof value === 'string' && !(0, _isPrefixedValue2.default)(value) && value.indexOf('cross-fade(') > -1) {
    return prefixes.map(function (prefix) {
      return value.replace(/cross-fade\(/g, prefix + 'cross-fade(');
    });
  }
}
module.exports = exports['default'];

/***/ }),
/* 214 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = filter;

var _isPrefixedValue = __webpack_require__(18);

var _isPrefixedValue2 = _interopRequireDefault(_isPrefixedValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// http://caniuse.com/#feat=css-filter-function
var prefixes = ['-webkit-', ''];
function filter(property, value) {
  if (typeof value === 'string' && !(0, _isPrefixedValue2.default)(value) && value.indexOf('filter(') > -1) {
    return prefixes.map(function (prefix) {
      return value.replace(/filter\(/g, prefix + 'filter(');
    });
  }
}
module.exports = exports['default'];

/***/ }),
/* 215 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = flex;
var values = {
  flex: ['-webkit-box', '-moz-box', '-ms-flexbox', '-webkit-flex', 'flex'],
  'inline-flex': ['-webkit-inline-box', '-moz-inline-box', '-ms-inline-flexbox', '-webkit-inline-flex', 'inline-flex']
};

function flex(property, value) {
  if (property === 'display' && values.hasOwnProperty(value)) {
    return values[value];
  }
}
module.exports = exports['default'];

/***/ }),
/* 216 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = flexboxOld;
var alternativeValues = {
  'space-around': 'justify',
  'space-between': 'justify',
  'flex-start': 'start',
  'flex-end': 'end',
  'wrap-reverse': 'multiple',
  wrap: 'multiple'
};

var alternativeProps = {
  alignItems: 'WebkitBoxAlign',
  justifyContent: 'WebkitBoxPack',
  flexWrap: 'WebkitBoxLines'
};

function flexboxOld(property, value, style) {
  if (property === 'flexDirection' && typeof value === 'string') {
    if (value.indexOf('column') > -1) {
      style.WebkitBoxOrient = 'vertical';
    } else {
      style.WebkitBoxOrient = 'horizontal';
    }
    if (value.indexOf('reverse') > -1) {
      style.WebkitBoxDirection = 'reverse';
    } else {
      style.WebkitBoxDirection = 'normal';
    }
  }
  if (alternativeProps.hasOwnProperty(property)) {
    style[alternativeProps[property]] = alternativeValues[value] || value;
  }
}
module.exports = exports['default'];

/***/ }),
/* 217 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = gradient;

var _isPrefixedValue = __webpack_require__(18);

var _isPrefixedValue2 = _interopRequireDefault(_isPrefixedValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var prefixes = ['-webkit-', '-moz-', ''];

var values = /linear-gradient|radial-gradient|repeating-linear-gradient|repeating-radial-gradient/;

function gradient(property, value) {
  if (typeof value === 'string' && !(0, _isPrefixedValue2.default)(value) && values.test(value)) {
    return prefixes.map(function (prefix) {
      return prefix + value;
    });
  }
}
module.exports = exports['default'];

/***/ }),
/* 218 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = imageSet;

var _isPrefixedValue = __webpack_require__(18);

var _isPrefixedValue2 = _interopRequireDefault(_isPrefixedValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// http://caniuse.com/#feat=css-image-set
var prefixes = ['-webkit-', ''];
function imageSet(property, value) {
  if (typeof value === 'string' && !(0, _isPrefixedValue2.default)(value) && value.indexOf('image-set(') > -1) {
    return prefixes.map(function (prefix) {
      return value.replace(/image-set\(/g, prefix + 'image-set(');
    });
  }
}
module.exports = exports['default'];

/***/ }),
/* 219 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = position;
function position(property, value) {
  if (property === 'position' && value === 'sticky') {
    return ['-webkit-sticky', 'sticky'];
  }
}
module.exports = exports['default'];

/***/ }),
/* 220 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = sizing;
var prefixes = ['-webkit-', '-moz-', ''];

var properties = {
  maxHeight: true,
  maxWidth: true,
  width: true,
  height: true,
  columnWidth: true,
  minWidth: true,
  minHeight: true
};
var values = {
  'min-content': true,
  'max-content': true,
  'fill-available': true,
  'fit-content': true,
  'contain-floats': true
};

function sizing(property, value) {
  if (properties.hasOwnProperty(property) && values.hasOwnProperty(value)) {
    return prefixes.map(function (prefix) {
      return prefix + value;
    });
  }
}
module.exports = exports['default'];

/***/ }),
/* 221 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = transition;

var _hyphenateProperty = __webpack_require__(222);

var _hyphenateProperty2 = _interopRequireDefault(_hyphenateProperty);

var _isPrefixedValue = __webpack_require__(18);

var _isPrefixedValue2 = _interopRequireDefault(_isPrefixedValue);

var _capitalizeString = __webpack_require__(65);

var _capitalizeString2 = _interopRequireDefault(_capitalizeString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var properties = {
  transition: true,
  transitionProperty: true,
  WebkitTransition: true,
  WebkitTransitionProperty: true,
  MozTransition: true,
  MozTransitionProperty: true
};


var prefixMapping = {
  Webkit: '-webkit-',
  Moz: '-moz-',
  ms: '-ms-'
};

function prefixValue(value, propertyPrefixMap) {
  if ((0, _isPrefixedValue2.default)(value)) {
    return value;
  }

  // only split multi values, not cubic beziers
  var multipleValues = value.split(/,(?![^()]*(?:\([^()]*\))?\))/g);

  for (var i = 0, len = multipleValues.length; i < len; ++i) {
    var singleValue = multipleValues[i];
    var values = [singleValue];
    for (var property in propertyPrefixMap) {
      var dashCaseProperty = (0, _hyphenateProperty2.default)(property);

      if (singleValue.indexOf(dashCaseProperty) > -1 && dashCaseProperty !== 'order') {
        var prefixes = propertyPrefixMap[property];
        for (var j = 0, pLen = prefixes.length; j < pLen; ++j) {
          // join all prefixes and create a new value
          values.unshift(singleValue.replace(dashCaseProperty, prefixMapping[prefixes[j]] + dashCaseProperty));
        }
      }
    }

    multipleValues[i] = values.join(',');
  }

  return multipleValues.join(',');
}

function transition(property, value, style, propertyPrefixMap) {
  // also check for already prefixed transitions
  if (typeof value === 'string' && properties.hasOwnProperty(property)) {
    var outputValue = prefixValue(value, propertyPrefixMap
    // if the property is already prefixed
    );var webkitOutput = outputValue.split(/,(?![^()]*(?:\([^()]*\))?\))/g).filter(function (val) {
      return !/-moz-|-ms-/.test(val);
    }).join(',');

    if (property.indexOf('Webkit') > -1) {
      return webkitOutput;
    }

    var mozOutput = outputValue.split(/,(?![^()]*(?:\([^()]*\))?\))/g).filter(function (val) {
      return !/-webkit-|-ms-/.test(val);
    }).join(',');

    if (property.indexOf('Moz') > -1) {
      return mozOutput;
    }

    style['Webkit' + (0, _capitalizeString2.default)(property)] = webkitOutput;
    style['Moz' + (0, _capitalizeString2.default)(property)] = mozOutput;
    return outputValue;
  }
}
module.exports = exports['default'];

/***/ }),
/* 222 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = hyphenateProperty;

var _hyphenateStyleName = __webpack_require__(223);

var _hyphenateStyleName2 = _interopRequireDefault(_hyphenateStyleName);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function hyphenateProperty(property) {
  return (0, _hyphenateStyleName2.default)(property);
}
module.exports = exports['default'];

/***/ }),
/* 223 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var uppercasePattern = /[A-Z]/g;
var msPattern = /^ms-/;
var cache = {};

function hyphenateStyleName(string) {
    return string in cache
    ? cache[string]
    : cache[string] = string
      .replace(uppercasePattern, '-$&')
      .toLowerCase()
      .replace(msPattern, '-ms-');
}

module.exports = hyphenateStyleName;


/***/ }),
/* 224 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = doHash;
// murmurhash2 via https://gist.github.com/raycmorgan/588423

function doHash(str, seed) {
  var m = 0x5bd1e995;
  var r = 24;
  var h = seed ^ str.length;
  var length = str.length;
  var currentIndex = 0;

  while (length >= 4) {
    var k = UInt32(str, currentIndex);

    k = Umul32(k, m);
    k ^= k >>> r;
    k = Umul32(k, m);

    h = Umul32(h, m);
    h ^= k;

    currentIndex += 4;
    length -= 4;
  }

  switch (length) {
    case 3:
      h ^= UInt16(str, currentIndex);
      h ^= str.charCodeAt(currentIndex + 2) << 16;
      h = Umul32(h, m);
      break;

    case 2:
      h ^= UInt16(str, currentIndex);
      h = Umul32(h, m);
      break;

    case 1:
      h ^= str.charCodeAt(currentIndex);
      h = Umul32(h, m);
      break;
  }

  h ^= h >>> 13;
  h = Umul32(h, m);
  h ^= h >>> 15;

  return h >>> 0;
}

function UInt32(str, pos) {
  return str.charCodeAt(pos++) + (str.charCodeAt(pos++) << 8) + (str.charCodeAt(pos++) << 16) + (str.charCodeAt(pos) << 24);
}

function UInt16(str, pos) {
  return str.charCodeAt(pos++) + (str.charCodeAt(pos++) << 8);
}

function Umul32(n, m) {
  n = n | 0;
  m = m | 0;
  var nlo = n & 0xffff;
  var nhi = n >>> 16;
  var res = nlo * m + ((nhi * m & 0xffff) << 16) | 0;
  return res;
}

/***/ })
/******/ ]);