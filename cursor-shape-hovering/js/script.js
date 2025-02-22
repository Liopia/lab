// set the starting position of the cursor outside of the screen
let clientX = -187;
let clientY = -187;
const innerCursor = document.querySelector(".cursor--small");

const initCursor = () => {
  // add listener to track the current mouse position
  document.addEventListener("mousemove", e => {
    clientX = e.clientX;
    clientY = e.clientY;
  });

  // transform the innerCursor to the current mouse position
  // use requestAnimationFrame() for smooth performance
  const render = () => {
    innerCursor.style.transform = `translate(${clientX}px, ${clientY}px)`;
    // if you are already using TweenMax in your project, you might as well
    // use TweenMax.set() instead
    // TweenMax.set(innerCursor, {
    //   x: clientX,
    //   y: clientY
    // });

    requestAnimationFrame(render);
  };
  requestAnimationFrame(render);
};

initCursor();

/**
 * Round the corners of a path
 * 
 * @param {paper.js path} path 
 * @param {number} radius 
 */

function roundCorners(path, radius) {
	var segments = path.segments.slice(0);
	path.removeSegments();

	for(var i = 0, l = segments.length; i < l; i++) {
		var curPoint = segments[i].point;
		var nextPoint = segments[i + 1 == l ? 0 : i + 1].point;
		var prevPoint = segments[i - 1 < 0 ? segments.length - 1 : i - 1].point;
		var nextDelta = curPoint.subtract(nextPoint);
		var prevDelta = curPoint.subtract(prevPoint);

		nextDelta.length = radius;
		prevDelta.length = radius;

		path.add(
			new paper.Segment(
				curPoint.subtract(prevDelta),
				null,
				prevDelta.divide(2)
			)
		);

		path.add(
			new paper.Segment(
				curPoint.subtract(nextDelta),
				nextDelta.divide(2),
				null
			)
		);
	}
	path.closed = true;
	return path;
}

function defaultPointer() {

  const strokeColor = "rgba(234, 104, 82, 1)";
  const strokeWidth = 1;
  const segments = 8;
  const radius = 25;

  // the base shape for the circle
  let path = new paper.Path.RegularPolygon(
    new paper.Point(0, 0),
    segments,
    radius
  );

  path.strokeColor = strokeColor;
  path.strokeWidth = strokeWidth;

  return path;
}

function getButtonShape(target) {
  const strokeColor = "rgba(234, 104, 82, 1)";
  const strokeWidth = 1;

  let height = target.offsetHeight;
  let width = target.offsetWidth;

  let pointTop = height / 2 * -1;
  let pointBottom = height / 2;
  let pointLeft = width / 2 * -1;
  let pointRight = width / 2;

  let path = new paper.Path({
    strokeColor: strokeColor,
    strokeWidth: strokeWidth,
    insert: false,
    closed: true,
  });

  path.add(new paper.Point(pointLeft,pointTop));
  path.add(new paper.Point(pointRight,pointTop));
  path.add(new paper.Point(pointRight,pointBottom));
  path.add(new paper.Point(pointLeft,pointBottom));

  // little edge rounding
  path = roundCorners(path, 0);

  return path;
}


let lastX = 0;
let lastY = 0;
let isStuck = false;
let polygon, cursorDefault, cursorGroup, stuckX, stuckY, navItem;

const initCanvas = () => {
  const canvas = document.querySelector(".cursor--canvas");
  const shapeBounds = {
    width: 75,
    height: 75
  };
  paper.setup(canvas);
  polygon = defaultPointer();
  cursorDefault = polygon.clone({ insert: false })

  //polygon.smooth();
  cursorGroup = new paper.Group([polygon]);
  cursorGroup.applyMatrix = false;

  // function for linear interpolation of values
  const lerp = (a, b, n) => {
    return (1 - n) * a + n * b;
  };

  // the draw loop of Paper.js
  // (60fps with requestAnimationFrame under the hood)
  paper.view.onFrame = event => {
    // console.log(event.delta);
    // console.log(event.time);
    // console.log(event.count);

    // use linear interpolation to move the circle partially per frame
    if (!isStuck) {
      // move circle around normally
      lastX = lerp(lastX, clientX, 0.15);
      lastY = lerp(lastY, clientY, 0.15);
      cursorGroup.position = new paper.Point(lastX, lastY);

      // rotate quickly
      //polygon.rotate(1.25);
    } else if (isStuck) {
      // fixed position on a sticky item
      lastX = lerp(lastX, stuckX, 0.15);
      lastY = lerp(lastY, stuckY, 0.15);
      cursorGroup.position = new paper.Point(lastX, lastY);

      // rotate slowly
      //polygon.rotate(0.25);
    }

    if (isStuck && polygon.bounds.width < shapeBounds.width) {
      // scale up the shape
      polygon.scale(1.18);
    } else if (!isStuck && polygon.bounds.width > 30) {
      // scale down the shape
      polygon.scale(0.82);
    }

    //polygon.smooth();
  };
};

initCanvas();

const initHovers = () => {
  // find the center of the link element and set stuckX and stuckY
  const handleMouseEnter = e => {
    navItem = e.currentTarget;
    isStuck = true;

    // get new position
    stuckPosition();

    // tween the shape
    // http://paperjs.org/reference/item/#tween-options
    let polygonOrigin = polygon.clone({ insert: false })
    let polygonTarget = getButtonShape(navItem);
    polygon.tween(250).onUpdate = function(event) {
      polygon.interpolate(polygonOrigin, polygonTarget, event.factor)
    };

    // do the SVG dash drawing
    polygon.tween(450).onUpdate = function(event) {
      let reverseFactor = 1 - event.factor;
      let dash = 450 * event.factor;
      let gap = 450 * reverseFactor;
      polygon.dashArray = [dash, gap];
    };

    // add scroll event listener to update position on scroll
    window.addEventListener("scroll", stuckPosition, true);
  };

  function stuckPosition() {
    const navItemBox = navItem.getBoundingClientRect();
    stuckX = Math.round(navItemBox.left + navItemBox.width / 2);
    stuckY = Math.round(navItemBox.top + navItemBox.height / 2);
  }

  // reset isStuck on mouseLeave
  const handleMouseLeave = () => {
    isStuck = false;

    // tween the shape
    let polygonOrigin = polygon.clone({ insert: false })
    let polygonTarget = cursorDefault;
    polygon.tween(250).onUpdate = function(event) {
      polygon.interpolate(polygonOrigin, polygonTarget, event.factor)
    };

    // reset SVG dash
    polygon.tween(250).onUpdate = function(event) {
      let reverseFactor = 1 - event.factor;
      let dash = 450 * event.factor;
      let gap = 450 * reverseFactor;
      polygon.dashArray = [dash, gap];
    };

    // destroy scroll event listener
    window.removeEventListener("scroll", stuckPosition, true);
  };

  // add mouse event listeners to all items
  const linkItems = document.querySelectorAll(".link");
  linkItems.forEach(item => {
    item.addEventListener("mouseenter", handleMouseEnter);
    item.addEventListener("mouseleave", handleMouseLeave);
  });
};

initHovers();
