
window._ = require('lodash');

/**
 * We'll load jQuery and the Bootstrap jQuery plugin which provides support
 * for JavaScript based Bootstrap features such as modals and tabs. This
 * code may be modified to fit the specific needs of your application.
 */

try {
    window.$ = window.jQuery = require('jquery');

    require('materialize-css');

    $(function(){
      $('.button-collapse').sideNav();
      $('.parallax').parallax();
			$('.scrollspy').scrollSpy({ scrollOffset: 400 });   
      $('.collapsible').collapsible();
      $('.toc-wrapper').pushpin({ offset: 220 });
      

      $('input#main-page-search').focus(function() { $(this).parent().addClass('focused'); });
      $('input#main-page-search').blur(function() {
        if (!$(this).val()) {
          $(this).parent().removeClass('focused');
        }
      });
    }); // end of document ready

} catch (e) {}
/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */

// import Echo from 'laravel-echo'

// window.Pusher = require('pusher-js');

// window.Echo = new Echo({
//     broadcaster: 'pusher',
//     key: 'your-pusher-key'
// });
