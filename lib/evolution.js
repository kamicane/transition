/* Evolution
simple animation library.
*/'use strict';

var prime = require("prime"),
    defer = require("prime/defer");

var Evolution = prime({

  constructor: function Evolution(duration, equation, callback) {
    if (!duration) throw new Error('no duration given');
    if (!equation) throw new Error('no equation given');
    if (!callback) throw new Error('no callback given');

    this.duration = duration;
    this.equation = equation;
    this.callback = callback;
  },

  get paused() {
    return this.cancel == null && this.elapsed != null;
  },

  get active() {
    return this.cancel != null;
  },

  get idle() {
    return this.cancel == null && this.elapsed == null;
  },

  start: function() {
    if (this.idle) {
      this.elapsed = 0;
      this.cancel = defer.frame(this.step, this);
    }
    return this;
  },

  step: function(time) {
    this.elapsed += time - (this.time || time);

    var factor = this.elapsed / this.duration;
    if (factor > 1) factor = 1;

    if (factor !== 1) { // keep calling step
      this.time = time;
      this.cancel = defer.frame(this.step, this);
    } else { // end of the animation
      this.cancel = this.time = this.elapsed = null;
    }

    var delta = this.equation(factor);

    this.callback(delta);
  },

  stop: function() {
    if (this.active) {
      this.cancel();
      this.elapsed = this.cancel = this.time = null;
    }
    return this;
  },

  pause: function() {
    if (this.active) {
      this.cancel();
      this.cancel = this.time = null;
    }
    return this;
  },

  resume: function() {
    if (this.paused) {
      this.cancel = defer.frame(this.step, this);
    }
    return this;
  }

});

module.exports = Evolution;
