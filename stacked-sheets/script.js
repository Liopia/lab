/**
 * Pages control
 */

(function (window, document) {
  'use strict';

  document.querySelector('.do-straighten').addEventListener('click', () => {
    document.body.classList.toggle('straighten');
  });

  document.querySelector('.do-unstacked').addEventListener('click', () => {
    document.body.classList.toggle('unstacked');
  });

  document.querySelector('.do-randomize').addEventListener('click', () => {
    randomizeSheet(pages);
  });

  /**
   * Define some bits
   */
  const config = {
    visibleSheets: 8,
  };

  const pages = document.querySelectorAll(`[data-type="page"]`);
  const container = document.getElementById('page-container');

  /**
   * Randomize sheet placement
   * https://stackoverflow.com/a/24152886
   */
  function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
   * Controls visability, position, and brightness of pages.
   * steps trhough each page and applies attributes by what
   * sheet is in view and how many should be seen at one time.
   */
  function shuffleSheet(index, pages, config, direction) {
    // loop over all pages
    for (let step = 0; step < pages.length; step++) {
      // items that are above or at the current index:
      if (step <= index) {
        pages[step].style.filter = `brightness(100%)`;
        pages[step].style.display = 'block'; // show page
        pages[step].style.position = 'relative'; // remove from pile
      }

      // items that are between the next and next + visability number:
      if (step > index && step <= index + config.visibleSheets) {
        // we want to brighten the current page in view and the page directly under it
        // if we're scrolling down we need to adjust this by 2
        let adjust = direction == 'down' ? 2 : 1;

        // get a number between 0 and 1
        // step - index gives us 0 at the current page
        // - adjust shifts the number to keep the following page fully bright
        // Math.max (0, num) clamps the number to 0 minimum
        // divide by how many sheets we want to see
        // the if statement that contains this (step - index) will never be more than visibleSheets
        let gradient =
          Math.max(0, step - index - adjust) / config.visibleSheets;
        // to get a % between 0 and 100
        // 100 - num reverses the direction of the % granient
        let opacity = 100 - gradient * 100;

        pages[step].style.filter = `brightness(${opacity}%)`;
        pages[step].style.display = 'block'; // show page
        pages[step].style.position = 'fixed'; // stack onto pile
      }

      // set stack and prightnes on next element if user is scrolling down
      if (direction == 'down' && step - 1 == index) {
        //pages[step].style.filter = `brightness(100%)`;
        pages[step].style.position = 'relative'; // remove from pike
      }

      // set brightness 0% on > index + visibility
      if (step > index + config.visibleSheets) {
        pages[step].style.filter = `brightness(0%)`;
        pages[step].style.display = 'none'; // hide conent on the edge of view
        pages[step].style.position = 'fixed'; // stack onto pile
      }
    }
  }
  /**
   * apply some initial gariation to visable sections at the edge of view
   * assumes we're at the top of the page
   */
  shuffleSheet(0, pages, config);

  /**
   * position each page element in a semi-random way
   */
  function randomizeSheet(pages) {
    for (let step = 0; step < pages.length; step++) {
      // alternate translation numbers for more conrolled random layout
      // max, min
      let vwMin = step % 2 == 0 ? -4 : 0;
      let vwMax = step % 2 == 0 ? 0 : 4;

      let vhMin = step % 2 == 0 ? -4 : 0;
      let vhMax = step % 2 == 0 ? 0 : 4;

      pages[step].style.transform = `
      translate3d(
        ${randomInteger(vwMin, vwMax)}vw,
        ${randomInteger(vhMin, vhMax)}vh,
        0
      )
      rotate(
        ${randomInteger(-0.25, 0.25)}deg
      )
    `;
    }
  }
  randomizeSheet(pages);

  /**
   * toggle stacked class and visability of sections
   */
  const observer = new IntersectionObserver(sectionIntersection);
  function sectionIntersection(entries) {
    entries.map((entry) => {
      if (entry.boundingClientRect.top < 0) {
        //randomizeSheet(pages);

        // get elements index Int
        const index = parseInt(entry.target.getAttribute('data-index'));

        if (entry.isIntersecting) {
          // entered viewport at the top edge
          shuffleSheet(index, pages, config, 'up');
        } else {
          // left viewport at the top edge
          shuffleSheet(index, pages, config, 'down');
        }
      }
    });
  }

  /**
   * wrap page element for sheet behavior
   */
  function buildPageContainers(pages) {

    for (let step = 0; step < pages.length; step++) {
      // set z-index on each layer or stacking order would appear reversed
      pages[step].style.zIndex = pages.length - step;

      // hide some sections for smoother scrolling
      if (step > config.visibleSheets) {
        pages[step].style.display = 'none';
      }

      // create section element
      let wrapper = document.createElement('div');

      // add initial stacked class
      wrapper.classList.add('stacked');

      // store the wrapper index on itself
      wrapper.setAttribute('data-index', step);

      // adds elememt type
      wrapper.setAttribute('data-type', 'page-wrap');

      // attach observer to wrapper
      observer.observe(wrapper);

      // wrap page in wrapper element
      wrapper.appendChild(pages[step]);

      // add wrapper to main
      container.appendChild(wrapper);
    }
  }
  buildPageContainers(pages);

  /**
   * Show sheets after page load
   */
  setTimeout(function () {
    document.body.classList.remove('straighten');
  }, 1250);

  /**
 * Do some element adjustments when scrolling stops.
 * Addresses edge case where stack or filter order gets 
 * confused when someone scrolls quickly using scrollbar.
 * May not be needed anymore.
let timer;
window.onscroll = function (event) {
    var self = this;
    clearTimeout(timer);
    timer = setTimeout(function () {
      //shuffleSheet(index, sections, pages, config)
      randomizeSheet(pages);
    }, 100)
}
 */
})(window, document);