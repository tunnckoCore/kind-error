

## 2.0.0 - 2016-02-11
- Release v2.0.0 / npm@v2.0.0
- add more defaults - `err.type`, `err.inspect` and `err.orig` containing:
  + all of them exists only if `actual` and `expected` are given
  + all of them have `.actual` and `.expected` properties
  + `err.type` contains the type of `actual` and `expected`
  + `err.inspect` contains the inspected value using `util.inspect` useful for outputs
  + `err.orig` contains the original values (same as `err.actual` and `err.expected`)
- change default output of `.toString()`
- allow `message` option to be function when `actual` and `expected` given
- signals/forces you to install `kind-of-extra` when `actual` and `expected` are given
- add `detailed` option for more detailed message (composed only when `actual` and `expected` are given)
- update repo boilerplate
- update license year range
- use `error-base`
- major refactor [#74188f](https://github.com/tunnckoCore/kind-error/commit/74188fbf5940d2f40d1d04bebd9bfa9b6cbad09c) (_more info above_)

## 1.3.0 - 2015-09-03
- Release v1.3.0 / npm@v1.3.0
- update tests and features list
- implement `.toString` method
- update, bump deps

## 1.2.0 - 2015-07-01
- Release v1.2.0 / npm@v1.2.0
- allow `opts.actual` to be falsey value, fix and close #3

## 1.1.0 - 2015-07-01
- Release v1.1.0 / npm@v1.1.0
- codeclimate: fix complexity
- codeclimate: disable jshint `newcap`
- add creating AppError example
- add creating custom error class test
- allow invoking without `new` keyword
- update usage
- refactor, add more tests

## 1.0.1 - 2015-07-01
- Release v1.0.1 / npm@v1.0.1
- update related section
- update tests
- switch deps

## 1.0.0 - 2015-06-30
- Release v1.0.0 / npm@v1.0.0
- add related section
- reorder it a bit
- update readme exampoles/features
- add `this.value` prop, when `this.actual`
- add test, composed error is instanceof Error
- cleanup
- update readme
- add keywords
- complexity and codeclimate
- add test for auto-creating message
- add little assertion sugar
- stack logic
- add test for .toString
- implement :star2:

## 0.0.0 - 2015-06-29
- Initial commit