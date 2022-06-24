// Header movement logic

const scrollUp = document.querySelector(".header")
const scrolldDown = document.querySelector(".scroll-down")
const previousScroll = 0;

window.onscroll = function(e) {
    if (scrollY > previousScroll) {
        body.header-onpage.add(scrolldDown);
        body.header-onpage.add(scrolldDown);
    }
    else {
        body.header-onpage.remove(scrolldDown);
        body.header-onpage.add(scrollUp)
    }
}