# Evolution

Evolution is a simple animation library.
It is based on requestAnimationFrame.
Its only job is to calculate a delta based on a duration and an equation.
It is kept simple to be able to animate any number of things, with any interpolation logic.

## Properties

An animation can be `idle`, `active`, or `paused`.

 - `active` means the animation is started. The animation can be either paused or stopped.
 - `paused` means the animation is in a paused state. The animation can be resumed.
 - `idle` means the animation is neither paused or active. It can be started.

## Usage

```js
var Evolution = require('evolution');
var equations = require('evolution/equations');

var animation = new Evolution(1000, equations.sineIn, function(delta) {
  console.log(delta);
});

// an animation should be started
animation.start();

// is the animation running?
console.log(animation.active); // true

// an animation can be paused and resumed.
animation.pause();

animation.resume();

// an animation can be stopped
animation.stop();

// you can also check if it's idle.
console.log(animation.idle);
```

## Example with Transform3d

```js

var Transform3d = require('transform3d');
var Evolution = require('evolution');

var equations = require('evolution/equations');

var transform1 = new Transform3d();
var transform2 = new Transform3d();

transform1.rotateX(0).rotateY(0).scale(0.9);
transform2.rotateX(360).rotateY(180).scale(1.5);

var interpolation = transform1.interpolation(transform2);

var animation = new Evolution(equations.cubic, 1000, function(delta) {
  element.style.WebkitTransform = interpolation.step(delta).compose();
});

animation.start();
```
