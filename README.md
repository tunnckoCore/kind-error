# kind-error [![npmjs.com][npmjs-img]][npmjs-url] [![The MIT License][license-img]][license-url] 

> Correct inheriting from `Error`. Supports constructing from an object of properties - focused on assertion.

[![code climate][codeclimate-img]][codeclimate-url] [![standard code style][standard-img]][standard-url] [![travis build status][travis-img]][travis-url] [![coverage status][coveralls-img]][coveralls-url] [![dependency status][david-img]][david-url]


## Install
```
npm i kind-error --save
npm test
```


## Features
- You can customize error name with `name` property in options object.
- By default won't have `stack` property in the composed error object.
- You should pass `showStack: true` in options if you want stacktraces.
- If `actual` and `expected` is given, will compose `message` automatically.
- If `actual` is given, will change it to it's type, using `kindof(actual)`.
  + it will move `actual` value to `value` property

## Usage
> For more use-cases see the [tests](./test.js)

- `[message]` **{String|Object}** error message or `options` object
- `[options]` **{Object}** custom error properties

**Example**

```js
var KindError = require('kind-error')

var err = new KindError('foo bar', {custom: 123})
//=> err
// err.name => 'KindError'
// err.message => 'foo bar'
// err.custom => 123
// err.stack => property not exists

var err = new KindError({name: 'MyCustomErr', message: 'foo bar baz'})
//=> err
// err.name => 'MyCustomErr'
// err.message => 'foo bar baz'
// err.stack => property not exists

var err = new KindError({
  name: 'AssertError',
  actual: 123,
  expected: 'array'
})
//=> err
// err.name => 'AssertError'
// err.actual => 'number'
// err.expected => 'array'
// err.value => 123
// err.message => 'expected array, but number given'
// err.stack => property not exists

var err = new KindError({name: 'MyError', showStack: true})
//=> err
// err.name => 'MyError'
// err.stack => correct stack trace
```


## Related
- [assert-kindof](https://github.com/tunnckoCore/assert-kindof): Check native type of the given value and throw TypeError if not okey. Expressive, elegant, behavior-driven API, good descriptive default error messages, simple and clean syntax.
- [always-callback](https://github.com/tunnckocore/always-callback): Create callback api for given sync function. Guarantee that given function (sync or async, no matter) will always have callback api and will handle errors correctly.
- [make-callback](https://github.com/tunnckocore/make-callback): Make synchronous function or generator to support callback api
- [handle-callback](https://github.com/hybridables/handle-callback): Make promise to have support for callback api, it returns promise in that same time.
- [handle-errors](https://github.com/hybridables/handle-errors): Handling/creating hybrid errors. Hybrid middleware between callbacks and throws. Helpful util for modules that have hybrid APIs and want when they use promises, directly to throw the errors; when use callbacks to pass errors to first argument of this call
- [handle-arguments](https://github.com/hybridables/handle-arguments): Handles given Arguments object - return separatly last argument (commonly callback) and other arguments as Array. Useful in node-style callback flow.
- [manage-arguments](https://github.com/tunnckocore/manage-arguments): Prevents arguments leakage - managing arguments. From Optimization killers by Petka Antonov.
- [is-missing](https://github.com/tunnckocore/is-missing): Check that given `name` or `user/repo` exists in npm registry or in github as user repository.
- [is-kindof](https://github.com/tunnckocore/is-kindof): Check type of given javascript value. Support promises, generators, streams, and native types. Thin wrapper around `kind-of` module.
- [is-ansi](https://github.com/tunnckocore/is-ansi): Check that given string contain ANSI color codes, without CLI


## Contributing
Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/tunnckoCore/kind-error/issues/new).  
But before doing anything, please read the [CONTRIBUTING.md](./CONTRIBUTING.md) guidelines.


## [Charlike Make Reagent](http://j.mp/1stW47C) [![new message to charlike][new-message-img]][new-message-url] [![freenode #charlike][freenode-img]][freenode-url]

[![tunnckocore.tk][author-www-img]][author-www-url] [![keybase tunnckocore][keybase-img]][keybase-url] [![tunnckoCore npm][author-npm-img]][author-npm-url] [![tunnckoCore twitter][author-twitter-img]][author-twitter-url] [![tunnckoCore github][author-github-img]][author-github-url]


[npmjs-url]: https://www.npmjs.com/package/kind-error
[npmjs-img]: https://img.shields.io/npm/v/kind-error.svg?label=kind-error

[license-url]: https://github.com/tunnckoCore/kind-error/blob/master/LICENSE.md
[license-img]: https://img.shields.io/badge/license-MIT-blue.svg


[codeclimate-url]: https://codeclimate.com/github/tunnckoCore/kind-error
[codeclimate-img]: https://img.shields.io/codeclimate/github/tunnckoCore/kind-error.svg

[travis-url]: https://travis-ci.org/tunnckoCore/kind-error
[travis-img]: https://img.shields.io/travis/tunnckoCore/kind-error.svg

[coveralls-url]: https://coveralls.io/r/tunnckoCore/kind-error
[coveralls-img]: https://img.shields.io/coveralls/tunnckoCore/kind-error.svg

[david-url]: https://david-dm.org/tunnckoCore/kind-error
[david-img]: https://img.shields.io/david/tunnckoCore/kind-error.svg

[standard-url]: https://github.com/feross/standard
[standard-img]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg


[author-www-url]: http://www.tunnckocore.tk
[author-www-img]: https://img.shields.io/badge/www-tunnckocore.tk-fe7d37.svg

[keybase-url]: https://keybase.io/tunnckocore
[keybase-img]: https://img.shields.io/badge/keybase-tunnckocore-8a7967.svg

[author-npm-url]: https://www.npmjs.com/~tunnckocore
[author-npm-img]: https://img.shields.io/badge/npm-~tunnckocore-cb3837.svg

[author-twitter-url]: https://twitter.com/tunnckoCore
[author-twitter-img]: https://img.shields.io/badge/twitter-@tunnckoCore-55acee.svg

[author-github-url]: https://github.com/tunnckoCore
[author-github-img]: https://img.shields.io/badge/github-@tunnckoCore-4183c4.svg

[freenode-url]: http://webchat.freenode.net/?channels=charlike
[freenode-img]: https://img.shields.io/badge/freenode-%23charlike-5654a4.svg

[new-message-url]: https://github.com/tunnckoCore/messages
[new-message-img]: https://img.shields.io/badge/send%20me-message-green.svg
