/*!
 * kind-error <https://github.com/tunnckoCore/kind-error>
 *
 * Copyright (c) 2015 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

/* jshint asi:true */

'use strict'

var isObject = require('is-plain-object')
var kindOf = require('kind-of-extra')

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

  if (message) {
    this.message = message
  }
  if (Object.keys(opts).length > 0) {
    for (var prop in opts) {
      this[prop] = opts[prop]
    }
  }
  if (this.actual) {
    var actual = this.actual
    this.value = actual
    this.actual = kindOf(this.actual)
  }
  if (this.actual && this.expected && !this.message) {
    this.message = 'expect ' + this.expected + ', but ' + this.actual + ' given'
  }
  if (this.showStack === true && !this.stack) {
    Error.captureStackTrace(this, this.constructor)
  }
}

KindError.prototype = Object.create(Error.prototype, {
  constructor: {value: KindError, configurable: true, writable: true}
})
KindError.prototype.name = 'KindError'
