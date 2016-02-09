/*!
 * kind-error <https://github.com/tunnckoCore/kind-error>
 *
 * Copyright (c) 2015-2016 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

'use strict'

var util = require('util')
var extend = require('extend-shallow')
var isObject = require('is-plain-object')
var tryRequire = require('try-require-please')
var errorBase = require('error-base')
var delegate = require('delegate-properties')
var define = require('define-property')

/**
 * > Initialize `KindError` class with `message` and `options`.
 *
 * @param  {Object|String} `message`
 * @param  {Object} `[options]`
 * @return {Object} instance of Error
 */
var KindError = errorBase('KindError', function (message, options) {
  // @todo use `is-plain-object`
  if (isObject(message)) {
    options = message
    message = ''
  }

  delegate(this, extend({
    name: 'KindError',
    showStack: false,
    detailed: false,
    message: message && message.length && message || messageFormat
  }, options))
  delegateSpecial(this)

  if (this.showStack === true && !hasOwn(this, 'stack')) {
    Error.captureStackTrace(this, this.constructor)
  }
}, false)

/**
 * > Delegate additional optional properties to the `KindError` class.
 * If `actual` and `expected` properties given in `options` object.
 *
 * @param  {Object} `self`
 * @return {Object}
 */
function delegateSpecial (self) {
  if (hasOwn(self, 'actual') && hasOwn(self, 'expected')) {
    var kindOf = tryRequire('kind-of-extra', 'kind-error')
    define(self, 'orig', {
      actual: self.actual,
      expected: self.expected
    })
    define(self, 'type', {
      actual: kindOf(self.actual),
      expected: kindOf(self.expected)
    })
    define(self, 'inspect', {
      actual: util.inspect(self.actual),
      expected: util.inspect(self.expected)
    })
    if (kindOf(self.message) === 'function') {
      self.message = self.message.call(self, self.type, self.inspect) // eslint-disable-line no-useless-call
    }
  }
  define(self, 'message', typeof self.message === 'string' ? self.message : '')
  define(self, 'showStack', typeof self.showStack === 'boolean' ? self.showStack : false)
  return self
}

/**
 * > Customize error class toString method.
 *
 * @return {String}
 */
KindError.prototype.toString = function toString () {
  var headline = this.message.length ? this.name + ': ' + this.message : this.name
  if (this.actual && this.expected) {
    var str = [
      ' ' + headline,
      '    actual: ' + this.inspect.actual,
      '  expected: ' + this.inspect.expected
    ]
    return this.showStack && this.stack
      ? str.concat(this.stack.split('\n').slice(1)).join('\n')
      : str.join('\n')
  }

  return this.showStack && this.stack ? this.stack : headline
}

/**
 * > Default message formatting function.
 *
 * @param  {Object} `type`
 * @param  {Object} `inspect`
 * @return {String}
 */
function messageFormat (type, inspect) {
  var msg = this.detailed
    ? 'expect %s `%s`, but %s `%s` given'
    : 'expect `%s`, but `%s` given'
  return this.detailed
    ? util.format(msg, type.expected, inspect.expected, type.actual, inspect.actual)
    : util.format(msg, type.expected, type.actual)
}

/**
 * > Has own property util.
 *
 * @param  {OBject}  `self`
 * @param  {String}  `key`
 * @return {Boolean}
 */
function hasOwn (self, key) {
  return Object.prototype.hasOwnProperty.call(self, key)
}

/**
 * Expose `KindError` class.
 */
module.exports = KindError
