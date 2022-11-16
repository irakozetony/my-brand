$(document).ready(function () {
    $("#portfolio_main").slick({
        dots: true,
        speed: 800,
        cssEase: "linear",
        prevArrow:
            "<button type='button' class='slick-prev pull-left'><i class='fa fa-angle-left' aria-hidden='true'></i></button>",
        nextArrow:
            "<button type='button' class='slick-next pull-right'><i class='fa fa-angle-right' aria-hidden='true'></i></button>",
        autoplay: true,
        autoplaySpeed: 3000,
    });
});
