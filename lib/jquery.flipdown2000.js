/*  
    Flip Down 2000 for jQuery
    http://github.com/judas-christ/FlipDown2000
    MIT License
*/
(function (global, $) {
    'use strict';
    var _position = 'position',
        _static = 'static',
        _relative = 'relative',
        _absolute = 'absolute',
        _empty = '';

    var defaults = {
        friction: 5,
        easing: 'linear',
        delay: 0
    };

    var setRelativeMaybe = function (index, elements) {
        var $els = $(elements);
        if ($els.css(_position) === _static) {
            $els.css(_position, _relative);
        }
    };

    var flipDown2000 = function (options) {
        if (this.length === 0) return this;

        options = $.extend({}, defaults, options);

        var $elements = this.css({
            position: _absolute,
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: function (i) { return -i - 1 }
        }).show();
        var $siblings = $elements.siblings();
        var $wrapper = $elements.parent();

        //check if we need to set position: relative on wrapper and siblings
        setRelativeMaybe(null, $wrapper);
        $siblings.each(setRelativeMaybe);


        var heights = $.map($elements, function (el) {
            return $(el).outerHeight();
        });
        var i = 0;
        var l = heights.length;
        var flipDown = function () {
            var initialHeight = $wrapper.height();
            var currentElement = $elements.eq(i);
            $wrapper.animate({
                height: initialHeight + heights[i]
            }, currentElement.outerHeight() * options.friction, options.easing, function () {
                //cleanup current element
                currentElement.css({
                    position: _empty,
                    bottom: _empty,
                    left: _empty,
                    right: _empty,
                    zIndex: _empty
                });
                //check if we need to loop
                if (++i < l) {
                    setTimeout(flipDown, options.delay);
                } else {
                    //cleanup wrapper
                    $wrapper.add($siblings).css({
                        position: _empty
                    });
                }
            });
        };

        //start loop
        flipDown();

        return $elements;
    };

    $.fn.flipDown2000 = flipDown2000;

}(this, jQuery));