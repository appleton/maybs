# Maybs

My take on a maybe monad for JavaScript after reading [this](http://codon.com/refactoring-ruby-with-monads). It may or may not actually be correct, but it is useful.

Maybs works by providing a wrapping a value, and providing methods to access its properties. It's handy for digging deep into an object without making null checks along the way.

```shell
npm install maybs
```

```js
var maybe = require('maybs');

var val = {
  aValue: {
    aNestedValue: 123
  },
  aFunction: function add(a, b) {
    return a + b;
  }
};

maybe(val).get('aValue').value();
// >> { aNestedValue: 123 }

maybe(val).get('aValue').get('aNestedValue').value();
// >> 123

maybe(val).call('aFunction', 1, 2);
// >> 3

maybe(val).apply('aFunction', [1, 2]);
// >> 3

maybe(val)
  .get('aValue')
  .get('notThere')
  .get('somethingeEse')
  .call('nonExistantFunction', 1, 2, 3)
  .value()
// >> undefined
```

## `#get(key)`

Returns a new `Maybe` wrapper for the value's key (or nothing).

## `#call(key, arg1, arg2...)`

Tries to call value[key](arg1, arg2...) and returns the result wrapped in a new `Maybe`.

## `#apply(key, [arg1, arg2...])`

Tries to call value[key](arg1, arg2...) and returns the result wrapped in a new `Maybe`.

## `#value()`

Unwrap the `Maybe`, returns the value or `undefined`.
