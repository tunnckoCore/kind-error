/*!
 * kind-error <https://github.com/tunnckoCore/kind-error>
 *
 * Copyright (c) 2015 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

/* jshint asi:true, newcap:false */

'use strict'

var test = require('assertit')
var KindError = require('./index')

test('kind-error:', function () {
  test('should be able to invoke without `new` keyword', function (done) {
    var err = KindError()

    test.equal(err.name, 'KindError')
    test.equal(err.message, '')
    test.equal(err.stack, undefined)
    test.equal(err instanceof Error, true)
    done()
  })
  test('should composed error object be instanceof Error', function (done) {
    var err = new KindError()

    test.equal(err instanceof Error, true)
    done()
  })
  test('should have proper name and dont have stack by default', function (done) {
    var err = new KindError()

    test.equal(err.name, 'KindError')
    test.equal(err.stack, undefined)
    test.equal(err instanceof Error, true)
    done()
  })
  test('should have proper stack if `showStack: true`', function (done) {
    var err = new KindError({showStack: true})

    test.ok(err.stack)
    test.equal(err.name, 'KindError')
    test.equal(err.stack.length > 5, true)
    test.equal(err instanceof Error, true)
    done()
  })
  test('should dont have stack if showStack given but not true', function (done) {
    var err = new KindError({name: 'HideError', showStack: 123})

    test.equal(err.name, 'HideError')
    test.equal(err.stack, undefined)
    test.equal(err instanceof Error, true)
    done()
  })
  test('should support custom message', function (done) {
    var err = new KindError('foo bar')

    test.equal(err.name, 'KindError')
    test.equal(err.message, 'foo bar')
    test.equal(err instanceof Error, true)
    done()
  })
  test('should support custom properties', function (done) {
    var err = new KindError('foo bar', {custom: 123})

    test.equal(err.name, 'KindError')
    test.equal(err.message, 'foo bar')
    test.equal(err instanceof Error, true)
    test.equal(err.custom, 123)
    done()
  })
  test('should support change of name from opts', function (done) {
    var err = new KindError('custom name', {name: 'MyErr'})

    test.equal(err.name, 'MyErr')
    test.equal(err.message, 'custom name')
    test.equal(err instanceof Error, true)
    done()
  })
  test('should override message when given in opts', function (done) {
    var err = new KindError('custom name', {name: 'MyErr', message: 'my msg'})

    test.equal(err.name, 'MyErr')
    test.equal(err.message, 'my msg')
    test.equal(err instanceof Error, true)
    done()
  })
  test('should support to give only object to constructor', function (done) {
    var err = new KindError({custom: 123, message: 'custom msg'})

    test.equal(err.name, 'KindError')
    test.equal(err.custom, 123)
    test.equal(err.message, 'custom msg')
    test.equal(err instanceof Error, true)
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
    test.equal(err.value, 123)
    test.equal(err.actual, 'number')
    test.equal(err.expected, 'string')
    test.equal(err.inspected, '123')
    test.equal(err.message, 'assertion')
    test.equal(err instanceof Error, true)
    done()
  })
  test('should have proper .toString()', function (done) {
    var err = new KindError('proper to string', {name: 'ProperError'})

    test.equal(err.toString(), 'ProperError: proper to string')
    test.equal(err.toString().length > 10, true)
    test.equal(typeof err.toString, 'function')
    test.equal(typeof err.toString(), 'string')
    test.equal(err instanceof Error, true)
    done()
  })
  test('should create `message`, if only `actual` and `expected` given', function (done) {
    var err = new KindError({
      name: 'AssertError',
      actual: 123,
      expected: 'array',
      showStack: true
    })

    test.equal(err.name, 'AssertError')
    test.equal(err.value, 123)
    test.equal(err.actual, 'number')
    test.equal(err.expected, 'array')
    test.equal(err.inspected, '123')
    test.equal(err.message, 'expect `array`, but `number` given')
    test.equal(err instanceof Error, true)
    done()
  })
  test('should be able to pass error object as `options`', function (done) {
    var error = new TypeError()
    var err = new KindError(error)

    test.equal(err.name, 'TypeError')
    test.equal(err.message, '')
    test.equal(err instanceof Error, true)
    done()
  })
  test('should inherit name from given error object', function (done) {
    var error = new SyntaxError()
    var err = new KindError(error)

    test.equal(err.name, 'SyntaxError')
    test.equal(err.message, '')
    test.equal(err instanceof Error, true)
    done()
  })
  test('should inherit message from given error object', function (done) {
    var error = new TypeError('msg')
    var err = new KindError(error)

    test.equal(err.name, 'TypeError')
    test.equal(err.message, 'msg')
    test.equal(err instanceof Error, true)
    done()
  })
  test('should work with falsey value in `opts.actual`, see #3', function (done) {
    require('./test/actual-falsey-values')
    done()
  })
  test('should create custom AppError class', function (done) {
    require('./test/app-error')
    done()
  })
})
