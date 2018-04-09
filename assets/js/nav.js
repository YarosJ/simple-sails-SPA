$(document).ready(function () {

    let $li = $('.hover-nav');
    let $target;

    $li.on('mouseenter', function () {
        $li.removeClass('selected-nav');
        $target = $(this);
        $target.addClass('selected-nav');
    });

    $('.nav').on('mouseleave', function () {
        if ($target) {
            $target.removeClass('selected-nav');
            $li.first().addClass('selected-nav');
        }
    });

    // For prevent animation on resize of nav:

    let resizeId;

    $(window).resize(function () {
        $(".right-inline").css({'transition': '0s'});
        clearTimeout(resizeId);
        resizeId = setTimeout(() => {
            $(".right-inline").css({'transition': '.5s'});
        }, 200);
    });
});