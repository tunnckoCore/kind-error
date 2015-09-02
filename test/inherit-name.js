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

var error = new SyntaxError()
var err = new KindError(error)

test.equal(err.name, 'SyntaxError')
test.equal(err.message, '')
test.equal(err instanceof Error, true)
