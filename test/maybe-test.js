'use strict';

var chai = require('chai');
var expect = chai.expect;
var maybe = require('../index');

describe('maybs', function() {
  var value;

  afterEach(function() {
    value = undefined;
  });

  describe('#value', function() {
    beforeEach(function() {
      value = { a: 'value' };
    });

    context('given a value', function() {
      it('returns the value', function() {
        expect(maybe(value).value()).to.eql(value);
      });
    });

    context('given nothing', function() {
      it('returns undefined', function() {
        expect(maybe().value()).to.eql(undefined);
      });
    });
  });

  describe('#get', function() {
    context('when the key is not a value', function() {
      it('returns undefined wrapped in a maybe', function() {
        var res = maybe(undefined).get('a');
        expect(res).to.be.an.instanceof(maybe);
        expect(res.value()).to.be.undefined;
      });
    });

    context('when the key is a value', function() {
      beforeEach(function() {
        value = { a: 'value' };
      });

      it('returns the value wrapped in a maybe', function() {
        expect(maybe(value).get('a')).to.be.an.instanceof(maybe);
      });
    });

  });

  describe('#call', function() {
    context('when the key is not a value', function() {
      it('returns undefined wrapped in a maybe', function() {
        var res = maybe(undefined).call('a');
        expect(res).to.be.an.instanceof(maybe);
        expect(res.value()).to.be.undefined;
      });
    });

    context('when the key is a function', function() {
      beforeEach(function() {
        value = {
          a: function() {
            return 'foo';
          }
        };
      });

      context('and no arguments are passed', function() {
        it('calls the function and returns a new maybe for the result', function() {
          var res = maybe(value).call('a');
          expect(res).to.be.an.instanceof(maybe);
          expect(res.value()).to.eq('foo');
        });
      });

      context('and arguments are passed', function() {
        beforeEach(function() {
          value = {
            a: function(arg) {
              return arg;
            }
          };
        });

        it('calls the funciton with the arguments and returns a new maybe for the result', function() {
          var res = maybe(value).call('a', 'hello');
          expect(res).to.be.an.instanceof(maybe);
          expect(res.value()).to.eq('hello');
        });
      });
    });
  });

  describe('#apply', function() {
    context('when the key is not a value', function() {
      it('returns undefined wrapped in a maybe', function() {
        var res = maybe(undefined).apply('a');
        expect(res).to.be.an.instanceof(maybe);
        expect(res.value()).to.be.undefined;
      });
    });

    context('when the key is a function', function() {
      beforeEach(function() {
        value = {
          a: function() {
            return 'foo';
          }
        };
      });

      context('and no arguments are passed', function() {
        it('calls the function and returns a new maybe for the result', function() {
          var res = maybe(value).apply('a');
          expect(res).to.be.an.instanceof(maybe);
          expect(res.value()).to.eq('foo');
        });
      });

      context('and arguments are passed', function() {
        beforeEach(function() {
          value = {
            a: function(arg) {
              return arg;
            }
          };
        });

        it('calls the funciton with the arguments and returns a new maybe for the result', function() {
          var res = maybe(value).apply('a', ['hello']);
          expect(res).to.be.an.instanceof(maybe);
          expect(res.value()).to.eq('hello');
        });
      });
    });
  });
});
