/*!
 * kind-error <https://github.com/tunnckoCore/kind-error>
 *
 * Copyright (c) 2015 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

/* jshint asi:true, newcap:false */

'use strict'

var test = require('assertit')
var KindError = require('../index')

var err = new KindError({
  name: 'BetterError',
  actual: {foo: 'bar'},
  expected: 'string'
})
var str = err.toString()

test.ok(str.indexOf('actual: object') !== -1)
test.ok(str.indexOf('expected: string') !== -1)
test.ok(str.indexOf('BetterError: expect `string`, but `object` given') !== -1)
test.equal(err.toString().length > 10, true)
test.equal(typeof err.toString, 'function')
test.equal(typeof err.toString(), 'string')
test.equal(err instanceof Error, true)
