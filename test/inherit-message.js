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

var error = new TypeError('msg')
var err = new KindError(error)

test.equal(err.name, 'TypeError')
test.equal(err.message, 'msg')
test.equal(err instanceof Error, true)
