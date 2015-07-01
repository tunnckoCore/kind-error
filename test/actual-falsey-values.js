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

var actualNull = new KindError({
  actual: null,
  expected: 'number'
})
var actualFalse = new KindError({
  actual: false,
  expected: 'number'
})
var actualUndefined = new KindError({
  actual: undefined,
  expected: 'number'
})

test.equal(actualNull.message, 'expect number, but null given')
test.equal(actualFalse.message, 'expect number, but boolean given')
test.equal(actualUndefined.message, 'expect number, but undefined given')
