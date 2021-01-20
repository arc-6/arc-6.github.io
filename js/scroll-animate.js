(function() {

    var elements;

    function getAnimatedElements() {
        elements = $('[data-animation]');
        elements.addClass('animated');
    }

    function getUnanimated() {
        var unanimated = [];

        for(var idx = 0; idx < elements.length; idx++) {
            var element = $(elements.get(idx));

            if(!element.hasClass('animation-complete')) unanimated.push(element);
        }

        return unanimated;
    }

    function isElementInViewport(elem) {
        var $elem = $(elem);

        // Get the scroll position of the page.
        var scrollElem = ((navigator.userAgent.toLowerCase().indexOf('webkit') != -1) ? 'body' : 'html');
        var viewportTop = $(scrollElem).scrollTop();
        var viewportBottom = viewportTop + $(window).height();

        // Get the position of the element on the page.
        var elemTop = Math.round($elem.offset().top);
        var elemBottom = elemTop + $elem.height();

        return ((elemTop < viewportBottom) && (elemBottom > viewportTop));
    }

    function performAnimation() {
        var unanimated = getUnanimated();

        for(var idx = 0; idx < unanimated.length; idx++) {
            var element = unanimated[idx];

            if(isElementInViewport(element)) {
                element.addClass('animation-complete');

                //get the specific animation class
                var animation = element.attr('data-animation');

                element.addClass(animation);
            }
        }
    }

    $(window).scroll(function() {
        performAnimation();
    });

    //find any elements that should be animated
    getAnimatedElements();

    //initially perform any required animation
    performAnimation();
})();
