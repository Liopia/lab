/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/app/themes/heartpizza/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 12);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = jQuery;

/***/ }),
/* 1 */,
/* 2 */,
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(jQuery) {Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util_Router__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__routes_common__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__routes_home__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__routes_about__ = __webpack_require__(5);
/** import external dependencies */


/** import local dependencies */





/**
 * Populate Router instance with DOM routes
 * @type {Router} routes - An instance of our router
 */
var routes = new __WEBPACK_IMPORTED_MODULE_1__util_Router__["a" /* default */]({
  /** All pages */
  common: __WEBPACK_IMPORTED_MODULE_2__routes_common__["a" /* default */],
  /** Home page */
  home: __WEBPACK_IMPORTED_MODULE_3__routes_home__["a" /* default */],
  /** About Us page, note the change from about-us to aboutUs. */
  aboutUs: __WEBPACK_IMPORTED_MODULE_4__routes_about__["a" /* default */],
});

/** Load Events */
jQuery(document).ready(function () { return routes.loadEvents(); });

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(0)))

/***/ }),
/* 4 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  init: function init() {
    // JavaScript to be fired on the about us page
  },
});


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {/* harmony default export */ __webpack_exports__["a"] = ({
  init: function init() {
    /*eslint-disable */

    // JavaScript to be fired on all pages
    // prevent label click causing scroll to input
    $('label[for]').on('click', function (e) {
      var target = window[this.htmlFor];
      target.checked = !target.checked;
      e.preventDefault();
    });

    $(window).load(function() {
      $('body').removeClass('preload');
    });

    $(document).ready(function() {
      if (
        $('.nav-primary a').each(function() {
          var navLink = $(this).attr('href');
          navLink == window.location.pathname && $(this).addClass('active');
        }),
        $('body').length
      ) {
        $('html, body').scrollTop(0);
        var moduleBlock = $('.page-index');

        function pageInit() {
          var windowHeight = window.innerHeight || $(window).height(),
              bannerHeight = $('.banner').outerHeight(),
              spacerHeight = 50,
              bodyMinHeight = - bannerHeight - spacerHeight + 1,
              totalHead = 0;

          $('.page-index').each(function() {
            // useful for randomness on load/resize : unused currently
            //var randSpace = Math.floor(Math.random() * windowHeight * 0.025);

            $(this).css({ paddingTop: bannerHeight + spacerHeight })
            $(this).css({ marginBottom: -bannerHeight })
            $(this).attr('data-offset', bodyMinHeight - totalHead + parseInt($(this).css('padding-top')));

            var blockHeight = $(this).outerHeight(!1);
            $(this).attr('data-height', blockHeight), bodyMinHeight += blockHeight;

            totalHead = totalHead + bannerHeight;
          })

          // set body min-height based on floating pages
          $('body').css('min-height', bodyMinHeight + bannerHeight + spacerHeight - totalHead);
        }

        var windowWidth = $(window).width();
        $(window).resize(function() {
          var newWidth = $(window).width();
          windowWidth != newWidth && (windowWidth = newWidth, pageInit());
        });

        $(moduleBlock).each(function(blockNum) {
          var zIndex = 99 + -blockNum;
          $(this).css('z-index', zIndex)
        });

        var currentPage = '';

        function pageRelease(thisPage) {
          currentPage = thisPage;
          $(currentPage).addClass('released');
          var pageID = $(currentPage).attr('id');
          var $link = $('.nav-primary a[href$="#' + pageID + '"]');
            $link.length && ($('.nav-primary a').removeClass('active'),
            $link.addClass('active'))
        }

        currentPage = $('#home'),
        pageRelease(currentPage);

        function pageControl() {
          var currentTop = $(currentPage).offset().top,
              currentHeight = $(currentPage).outerHeight(!1),
              currentBottom = currentTop + currentHeight,
              bannerHeight = $('.banner').outerHeight(),
              windowHeight = window.innerHeight || $(window).height(),
              windowTop = $(window).scrollTop();

          if ( windowTop > (currentBottom - bannerHeight) ) {
            var nextPage = $(currentPage).next('.page-index');
            nextPage.length && pageRelease(nextPage);
          }

          if ( currentTop > windowTop ) {
            var prevPage = $(currentPage).prev();
            prevPage.length && ($(currentPage).removeClass('released'), pageRelease(prevPage));
          }

          if (windowTop + windowHeight >= $(document).height() - 10 ) {
            $('body').addClass('reached-bottom');
          } else {
            $('body').removeClass('reached-bottom');
          }
        }

        $(window).on('load', function() {
          pageInit()
        });

        $('.nav-primary a').click(function(event) {
          console.log('plip');
          $( '#nav-trigger' ).prop( 'checked', false );
          // check for actual outgoing link
          if ( $(this).parent('li.order-now').length < 1 ) {
            event.preventDefault();

            var thisTarget = $(this).attr('href'),
                targetTop = parseInt($(thisTarget).attr('data-offset'));

            $('html, body').animate({
              scrollTop: targetTop,
            }, 600, 'easeOutQuad')
          }
        });

        // special instalce navigation
        $('a.scroll').click(function(event) {
          event.preventDefault();

          var thisTarget = $(this).attr('href'),
              targetTop = parseInt($(thisTarget).attr('data-offset'));

          $('html, body').animate({
            scrollTop: targetTop,
          }, 600, 'easeOutQuad')
        });

        $(window).scroll(function() {
          pageControl();
        });

        // Video Control
        var video= $('#heartvideo')[0];
        var videoJ= $('#heartvideo');
        videoJ.on('started',function(){
          $('.video-play').addClass('hidden');
        });
        videoJ.on('ended',function(){
          $('.video-play').removeClass('hidden');
        });

        $('body').on('click', '.video-play', function(event) {
          $(this).addClass('hidden');
          //video.load();
          video.play();
        });

        // Location Order modal
        $('body').on('click', '.order-now', function(event) {
          event.preventDefault(),
          event.stopPropagation();
          $('.location-order').addClass('active');
          $('body').addClass('noscroll');
        });

        $('.location-order').on('click', '.order-close', function(e) {
          $('.location-order').removeClass('active');
          $('body').removeClass('noscroll');
        });

        $(document).keyup(function(e) {
          if (e.keyCode == 27) { // escape key maps to keycode `27`
            $('.location-order').removeClass('active');
            $('body').removeClass('noscroll');
          }
        });

        /*eslint-enable */

      }
    });

  },
  finalize: function finalize() {
    // JavaScript to be fired on all pages, after page specific JS is fired
  },
});

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(0)))

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  init: function init() {
    // JavaScript to be fired on the home page
  },
  finalize: function finalize() {
    // JavaScript to be fired on the home page, after the init JS
  },
});


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__camelCase__ = __webpack_require__(9);
/* ========================================================================
 * DOM-based Routing
 * Based on http://goo.gl/EUTi53 by Paul Irish
 *
 * Only fires on body classes that match. If a body class contains a dash,
 * replace the dash with an underscore when adding it to the object below.
 * ======================================================================== */



// The routing fires all common scripts, followed by the page specific scripts.
// Add additional events for more control over timing e.g. a finalize event
var Router = function Router(routes) {
  this.routes = routes;
};

Router.prototype.fire = function fire (route, fn, args) {
    if ( fn === void 0 ) fn = 'init';

  var fire = route !== '' && this.routes[route] && typeof this.routes[route][fn] === 'function';
  if (fire) {
    this.routes[route][fn](args);
  }
};

Router.prototype.loadEvents = function loadEvents () {
    var this$1 = this;

  // Fire common init JS
  this.fire('common');

  // Fire page-specific init JS, and then finalize JS
  document.body.className
    .toLowerCase()
    .replace(/-/g, '_')
    .split(/\s+/)
    .map(__WEBPACK_IMPORTED_MODULE_0__camelCase__["a" /* default */])
    .forEach(function (className) {
      this$1.fire(className);
      this$1.fire(className, 'finalize');
    });

  // Fire common finalize JS
  this.fire('common', 'finalize');
};

/* harmony default export */ __webpack_exports__["a"] = (Router);


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// the most terrible camelizer on the internet, guaranteed!
/* harmony default export */ __webpack_exports__["a"] = (function (str) { return ("" + (str.charAt(0).toLowerCase()) + (str.replace(/[\W_]/g, '|').split('|')
  .map(function (part) { return ("" + (part.charAt(0).toUpperCase()) + (part.slice(1))); })
  .join('')
  .slice(1))); });;


/***/ }),
/* 10 */,
/* 11 */,
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(3);
module.exports = __webpack_require__(4);


/***/ })
/******/ ]);
//# sourceMappingURL=main.js.map