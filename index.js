/*!
 * kind-error <https://github.com/tunnckoCore/kind-error>
 *
 * Copyright (c) 2015 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

/* jshint asi:true, newcap:false */

'use strict'

var util = require('util')
var kindOf = require('kind-of-extra')
var isObject = require('is-real-object')

/**
 * Create an instance of `KindError`
 * with the given `message` and/or `options`
 *
 * **Example**
 *
 * ```js
 * var KindError = require('kind-error')
 * var error = new KindError('message', {})
 * ```
 *
 * @param {String|Object} `[message]` error message or `options` object
 * @param {Object} `[options]` custom error properties
 * @api public
 */

function KindError (message, options) {
  if (!(this instanceof KindError)) {
    return new KindError(message, options)
  }
  if (isObject(message)) {
    options = message
    message = ''
  }

  options = isObject(options) ? options : {}
  mixin(this, options)

  this.name = options.name || 'KindError'
  this.message = options.message || message || ''

  if (hasOwn(this, 'actual')) {
    var actual = this.actual
    this.value = actual
    this.actual = kindOf(actual)
    this.inspected = util.inspect(this.value)
  }
  if (hasOwn(this, 'actual') && hasOwn(this, 'expected') && (!hasOwn(this, 'message') || !this.message.length)) {
    this.message = util.format('expect `%s`, but `%s` given', this.expected, this.actual)
  }
  if (this.showStack === true && !hasOwn(this, 'stack')) {
    Error.captureStackTrace(this, this.constructor)
  }
}

/**
 * Inherits `Error`
 */

KindError.prototype = Object.create(Error.prototype, {
  constructor: {value: KindError, configurable: true, writable: true}
})

/**
 * utils
 */

function mixin (target, obj) {
  for (var key in obj) {
    if (!hasOwn(target, key)) {
      target[key] = obj[key]
    }
  }
  return target
}

function hasOwn (self, val) {
  return Object.prototype.hasOwnProperty.call(self, val)
}

/**
 * Expose `KindError`
 */

module.exports = KindError
