/*!
 * kind-error <https://github.com/tunnckoCore/kind-error>
 *
 * Copyright (c) 2015 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

/* jshint asi:true */

'use strict'

var isObject = require('isobject')
var defaults = require('object.defaults')
var kindOf = require('kind-of-extra')

var util = require('util')
var format = util.format
var inspect = util.inspect

module.exports = KindError

function KindError (message, opts) {
  if (!(this instanceof KindError)) {
    throw new Error('Call KindError with `new` keyword')
  }
  if (isObject(message)) {
    opts = message
    message = false
  }
  opts = isObject(opts) ? opts : {}
  defaults(this, opts)

  this.name = opts.name || 'KindError'

  if (opts.message || message) {
    this.message = opts.message || message || ''
  }
  if (this.actual) {
    var actual = this.actual
    this.value = actual
    this.actual = kindOf(actual)
    this.inspected = inspect(this.value).replace(/\'/g, '')
  }
  if (this.actual && this.expected && (!this.message || !this.message.length)) {
    this.message = format('expect %s, but %s given', this.expected, this.actual)
  }
  if (this.showStack === true && !this.stack) {
    Error.captureStackTrace(this, this.constructor)
  }
}

KindError.prototype = Object.create(Error.prototype, {
  constructor: {value: KindError, configurable: true, writable: true}
})
