/*!
 * kind-error <https://github.com/tunnckoCore/kind-error>
 *
 * Copyright (c) 2015-2016 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

/* jshint asi:true */

'use strict'

var test = require('assertit')
var KindError = require('./index')

test('should work as normal error class and dont have `.stack` prop by default', function (done) {
  var err = new KindError('foo bar')

  test.strictEqual(err.stack, undefined)
  test.strictEqual(err.message, 'foo bar')
  test.strictEqual(err instanceof Error, true)
  done()
})

test('should have `.stack` when `showStack:true` and have custom properties', function (done) {
  var err = new KindError('msg', {
    showStack: true,
    custom: 123
  })

  test.strictEqual(err.showStack, true)
  test.strictEqual(err.message, 'msg')
  test.strictEqual(err.stack.indexOf('at') !== -1, true)
  test.strictEqual(err.stack.indexOf('kind-error/test.js') !== -1, true)
  test.strictEqual(err.custom, 123)
  done()
})

test('should support passing `.message` property if only `options` param given', function (done) {
  var err = new KindError({
    abc: 456,
    message: 'some msg'
  })

  test.strictEqual(err.abc, 456)
  test.strictEqual(err.message, 'some msg')
  done()
})

test('should have additional properties if `.actual` and `.expected` given on `options', function (done) {
  var err = new KindError({
    actual: [1, 2, 3],
    expected: {foo: 'bar'}
  })

  test.deepEqual(err.actual, [1, 2, 3])
  test.deepEqual(err.expected, {foo: 'bar'})
  test.strictEqual(err.type.actual, 'array')
  test.strictEqual(err.type.expected, 'object')
  test.strictEqual(err.inspect.actual, '[ 1, 2, 3 ]')
  test.strictEqual(err.inspect.expected, '{ foo: \'bar\' }')
  test.strictEqual(err.message, 'expect `object`, but `array` given')
  done()
})

test('should create meaningful default message when `.actual` and `.expected` given', function (done) {
  var err = new KindError({
    actual: 'a.b.c',
    expected: 1234
  })

  test.strictEqual(err.message, 'expect `number`, but `string` given')
  done()
})

test('should save provided `message` when `.actual` and `.expected` given', function (done) {
  var err = new KindError({
    message: 'foo bar baz',
    actual: 123,
    expected: 456
  })

  test.strictEqual(err.message, 'foo bar baz')
  test.strictEqual(err.actual, 123)
  test.strictEqual(err.expected, 456)
  done()
})

test('should allow `message` to be function when `.actual` and `.expected` given', function (done) {
  var err = new KindError({
    message: function (type, inspect) {
      test.strictEqual(type.actual, 'array')
      test.strictEqual(type.expected, 'object')
      test.strictEqual(inspect.actual, '[ 4, 5, 6 ]')
      test.strictEqual(inspect.expected, '{ baz: 123 }')

      return 'should be `' + type.expected + '`, `' + type.actual + '` is given'
    },
    actual: [4, 5, 6],
    expected: {baz: 123}
  })

  test.strictEqual(err.message, 'should be `object`, `array` is given')
  test.deepEqual(err.actual, [4, 5, 6])
  test.deepEqual(err.expected, {baz: 123})
  done()
})

test('should have `detailed: true` for more detailed default message', function (done) {
  var err = new KindError({
    detailed: true,
    actual: {a: 4},
    expected: [5, 6, 7]
  })

  test.strictEqual(err.detailed, true)
  test.deepEqual(err.actual, {a: 4})
  test.deepEqual(err.expected, [5, 6, 7])
  test.strictEqual(err.message, 'expect array `[ 5, 6, 7 ]`, but object `{ a: 4 }` given')
  done()
})

test('should have enhanced `.toString` output when `.actual` and `.expected', function (done) {
  var err = new KindError('my msg', {
    actual: 'hello',
    expected: 123456
  })

  var str = err.toString()
  test.strictEqual(str.indexOf('actual:') !== -1, true)
  test.strictEqual(str.indexOf('expected:') !== -1, true)
  test.strictEqual(str.indexOf('KindError: my msg') !== -1, true)
  done()
})

test('should have normal `.toString` when no `.actual` and `.expected`', function (done) {
  var err = new KindError('msg')
  var str = err.toString()

  test.strictEqual(str.indexOf('KindError: msg') !== -1, true)
  test.strictEqual(str.length, 14)
  done()
})
