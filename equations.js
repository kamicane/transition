/* equations
contains a set of advanced animation equations.
original equations by Robert Penner, <http://www.robertpenner.com/easing/>.
modified, optimized and parametrized to be used with MooTools.
*/'use strict';

var forIn = require('mout/object/forIn');

var slice_ = Array.prototype.slice;

var equations = {

  quad: function(p) {
    return Math.pow(p, 2);
  },

  cubic: function(p) {
    return Math.pow(p, 3);
  },

  quart: function(p) {
    return Math.pow(p, 4);
  },

  quint: function(p) {
    return Math.pow(p, 5);
  },

  expo: function(p) {
    return Math.pow(2, 8 * (p - 1));
  },

  circ: function(p) {
    return 1 - Math.sin(Math.acos(p));
  },

  sine: function(p) {
    return 1 - Math.cos(p * Math.PI / 2);
  },

  bounce: function(p) {
    var value;
    for (var a = 0, b = 1; 1; a += b, b /= 2) {
      if (p >= (7 - 4 * a) / 11) {
        value = b * b - Math.pow((11 - 6 * a - 11 * p) / 4, 2);
        break;
      }
    }
    return value;
  },

  pow: function(p, x) {
    if (x == null) x = 6;
    return Math.pow(p, x);
  },

  back: function(p, x) {
    if (x == null) x = 1.618;
    return Math.pow(p, 2) * ((x + 1) * p - x);
  },

  elastic: function(p, x) {
    if (x == null) x = 1;
    return Math.pow(2, 10 * --p) * Math.cos(20 * p * Math.PI * x / 3);
  }

};

forIn(equations, function(equation, key) {

  exports[key] = exports[key + 'In'] = equation;

  exports[key + 'Out'] = function(delta) {
    return 1 - equation(1 - delta);
  };

  exports[key + 'InOut'] = function(delta) {
    var result = (delta <= 0.5) ? equation(2 * delta) : 2 - equation(2 * (1 - delta));
    return result / 2;
  };

});
