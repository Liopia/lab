console.log('homepage test with greensock');

// new animation object
const bulb   = {};
bulb.cycle   = bulbCycle(theCallback);
bulb.pulse   = bulbPulse();
bulb.flicker = bulbFlicker();

function bulbCycle(callback) {
  var tl = new TimelineMax({onComplete:callback});

  tl.addLabel("start");
  tl.add( TweenLite.to(".bulb-off",  1, {opacity:"1"}));
  tl.addLabel("off");
  tl.add( TweenLite.to(".bulb-glow", 1, {opacity:"1"}));
  tl.addLabel("glow");
  tl.add( TweenLite.to(".bulb-on",   1, {opacity:"1"}));
  tl.addLabel("on");
  tl.pause();

  return tl;
}

function bulbPulse() {
  var tl = new TimelineMax({
    yoyo: true, 
    repeat: -1, 
    repeatDelay: 0.25,
  });
  tl.timeScale(0.5);
  tl.add( bulb.cycle.tweenFromTo("glow", "glow-=0.75") );
  tl.pause();

  return tl;
}

function bulbFlicker() {
  var tl = new TimelineMax({
    yoyo: false, 
    repeat: -1, 
    repeatDelay: 0.25,
  });
  tl.eventCallback( 'onRepeat', function() {
    var pause = flickerPause(this._cycle);

    console.log(this._cycle);
    console.log(pause);
    console.log(this);

    bulb.flicker.repeatDelay(pause);
  });
  tl.timeScale(0.5);
  tl.add( bulb.cycle.tweenFromTo("glow-=0.75", "glow") );
  tl.pause();

  // TODO variable tweenFrom 

  return tl;
}

function flickerPause(num) {
  if ( num % 5 === 0 ) {
    return Math.random() * 3;
  }
  return Math.random() * .25;
}

/*
function doBulbFlicker(flickerCount = 0) {
  // build up the timer making sure there's a longer pause every once in a while
  if ( flickerCount++ % 5 === 0) {
    var pause = Math.random() * 3000;
  } else {
    var pause = Math.random() * 200;
  }

  // get starting state of lightbulb for this flicker
  //  flick = Math.random() * (max  - min)  + min;
  var flick = Math.random() * (1.75 - 1.25) + 1.25;

  // put in forward motion (in case of reverse state)
  // tween the flicker from a random dimness back to full glow
  bulb.cycle.tweenFromTo(flick, "glow");

  // random firing of the bulbFlicker
  setTimeout(function() {
    doBulbFlicker(flickerCount);
  }, pause);
}
*/

function theCallback() {
  console.log('done');
}


/**
 * Add Event Listeners
 */

document.querySelector('.js-toggle-restart').addEventListener('click', function() {
  // start from invisible again
  if ( bulb.cycle.reversed() ) {
    console.log('playing');
    bulb.cycle.tweenTo("glow");
  } else {
    console.log('reversing');
    bulb.cycle.reverse();
  }
});

document.querySelector('.js-pulse-start').addEventListener('click', function() {
  bulb.pulse.play();
});

document.querySelector('.js-pulse-stop').addEventListener('click', function() {
  console.log('stopping pulse');
  bulb.pulse.pause();
});

document.querySelector('.js-flicker-start').addEventListener('click', function() {
  //doBulbFlicker();
  bulb.flicker.play();
});

document.querySelector('.js-flicker-stop').addEventListener('click', function() {
  console.log('stopping flicker');
  bulb.flicker.stop();
});

document.querySelector('.js-turn-on').addEventListener('click', function() {
  // play to clean any reversing
  bulb.cycle.play();
  // current time to end
  bulb.cycle.tweenTo("on");
});