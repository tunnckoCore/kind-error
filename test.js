/*!
 * kind-error <https://github.com/tunnckoCore/kind-error>
 *
 * Copyright (c) 2015 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

/* jshint asi:true */

'use strict'

var test = require('assertit')
var KindError = require('./index')

test('kind-error:', function () {
  test('should throw Error if not invoked with `new`', function (done) {
    function fixture () {
      KindError()
    }

    test.throws(fixture, Error)
    test.throws(fixture, /Call KindError.*/)
    done()
  })
  test('should have proper name and dont have stack by default', function (done) {
    var err = new KindError()

    test.equal(err.name, 'KindError')
    test.equal(err.stack, undefined)
    done()
  })
  test('should have proper stack if `showStack: true`', function (done) {
    var err = new KindError({showStack: true})

    test.ok(err.stack)
    test.equal(err.stack.length > 5, true)
    test.equal(err.name, 'KindError')
    done()
  })
  test('should dont have stack if showStack given but not true', function (done) {
    var err = new KindError({name: 'HideError', showStack: 123})

    test.equal(err.name, 'HideError')
    test.equal(err.stack, undefined)
    done()
  })
  test('should support custom message', function (done) {
    var err = new KindError('foo bar')

    test.equal(err.name, 'KindError')
    test.equal(err.message, 'foo bar')
    done()
  })
  test('should support custom properties', function (done) {
    var err = new KindError('foo bar', {custom: 123})

    test.equal(err.name, 'KindError')
    test.equal(err.message, 'foo bar')
    test.equal(err.custom, 123)
    done()
  })
  test('should support change of name from opts', function (done) {
    var err = new KindError('custom name', {name: 'MyErr'})

    test.equal(err.name, 'MyErr')
    test.equal(err.message, 'custom name')
    done()
  })
  test('should override message when given in opts', function (done) {
    var err = new KindError('custom name', {name: 'MyErr', message: 'my msg'})

    test.equal(err.name, 'MyErr')
    test.equal(err.message, 'my msg')
    done()
  })
  test('should support to give only object to constructor', function (done) {
    var err = new KindError({custom: 123, message: 'custom msg'})

    test.equal(err.name, 'KindError')
    test.equal(err.custom, 123)
    test.equal(err.message, 'custom msg')
    done()
  })
  test('should change `actual` to `typeof actual` if given', function (done) {
    var err = new KindError({
      name: 'AssertError',
      actual: 123,
      expected: 'string',
      message: 'assertion'
    })

    test.equal(err.name, 'AssertError')
    test.equal(err.actual, 'number')
    test.equal(err.expected, 'string')
    test.equal(err.message, 'assertion')
    done()
  })
  test('should have proper .toString()', function (done) {
    var err = new KindError('proper to string', {name: 'ProperError'})

    test.equal(err.toString(), 'ProperError: proper to string')
    test.equal(err.toString().length > 10, true)
    test.equal(typeof err.toString, 'function')
    test.equal(typeof err.toString(), 'string')
    done()
  })
})
