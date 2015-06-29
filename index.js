/*!
 * kind-error <https://github.com/tunnckoCore/kind-error>
 *
 * Copyright (c) 2015 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

/* jshint asi:true */

'use strict'

var kindOf = require('kind-of')

module.exports = KindError

function KindError (message, opts) {
  if (!(this instanceof KindError)) {
    throw new Error('Call KindError with `new` keyword')
  }
  if (kindOf(message) === 'object') {
    opts = message
    message = false
  }
  if (message) {
    this.message = message
  }
  opts = kindOf(opts) === 'object' ? opts : {}

  if (Object.keys(opts).length > 0) {
    for (var prop in opts) {
      this[prop] = opts[prop]
    }
  }

  if (this.actual) {
    this.value = this.actual
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
