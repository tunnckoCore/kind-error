/*!
 * kind-error <https://github.com/tunnckoCore/kind-error>
 *
 * Copyright (c) 2015 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

/* jshint asi:true, newcap:false */

'use strict'

var util = require('util')
var test = require('assertit')
var KindError = require('../index')

function AppError () {
  KindError.apply(this, arguments)
  this.name = 'AppError'
}
util.inherits(AppError, KindError)

AppError.prototype.foo = function () {
  return 123
}

var err = new AppError('foo bar', {baz: 'qux'})

test.equal(err.name, 'AppError')
test.equal(err.message, 'foo bar')
test.equal(err.baz, 'qux')
test.equal(err.foo(), 123)
test.equal(err instanceof Error, true)
