const tabs = document.querySelectorAll("[data-tab-target]");
const tabContents = document.querySelectorAll("[data-tab-content]");

tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
        const target = document.querySelector(tab.dataset.tabTarget);
        tabContents.forEach((tabContent) =>
            tabContent.classList.remove("active")
        );
        tabs.forEach((tab) => tab.classList.remove("active"));
        tab.classList.add("active");
        target.classList.add("active");
    });
});

const menu_icon = document.querySelectorAll(".mobile_menu_icon")[0];
const menu_items = document.querySelectorAll(".menu_items")[0];

menu_icon.addEventListener("click", () => {
    if (menu_items.classList.contains("active"))
        menu_items.classList.remove("active");
    else menu_items.classList.add("active");
});

$(document).ready(function () {
    $("#portfolio_main").slick({
        dots: true,
        infinite: true,
        speed: 500,
        cssEase: "linear",
        prevArrow:
            "<button type='button' class='slick-prev pull-left'><i class='fa fa-angle-left' aria-hidden='true'></i></button>",
        nextArrow:
            "<button type='button' class='slick-next pull-right'><i class='fa fa-angle-right' aria-hidden='true'></i></button>",
    });
});
