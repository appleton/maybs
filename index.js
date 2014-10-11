'use strict';

function Maybe(value) {
  if (!(this instanceof Maybe)) return new Maybe(value);
  this._value = value;
}

Maybe.prototype.value = function value() {
  return this._value;
};

Maybe.prototype.get = function get(key) {
  var newValue = this._value && this._value[key];
  return new Maybe(newValue);
};

Maybe.prototype.apply = function apply(key, args) {
  var newValue = this._getValueOf(key);

  if (typeof newValue === 'function') {
    newValue = newValue.apply(this.value(), args);
  }

  return new Maybe(newValue);
};

Maybe.prototype.call = function call(key) {
  var args = Array.prototype.slice.call(arguments, 1);
  return this.apply(key, args);
};

Maybe.prototype._getValueOf = function _getValueOf(key) {
  return this._value && this._value[key];
};

module.exports = Maybe;
