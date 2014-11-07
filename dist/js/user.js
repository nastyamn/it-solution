jQuery(function ($) {
    $('.j-carousel-primary').bxSlider({
        minSlides: 1,
        maxSlides: 5,
        slideWidth: 193,
        slideMargin: 14,
        moveSlides: 1,
        controls: false
    });

    // fade in animation
    $('.fade-in-animate').on('scrollSpy:enter', function () {
        $(this).addClass('visible');
    });
    $('.fade-in-animate').scrollSpy();
});
