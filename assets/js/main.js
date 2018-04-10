import '../styles/index.less';
import Carousel from "./carousel";
import TestimonialsCarousel from "./testimonialsCarousel";
import TextEditability from "./textEditability";

$(document).ready(function () {

    const editability = new TextEditability();

    const topCarousel = new Carousel({
        slider: '.slider'
    });
    topCarousel.start(7000);

    const testmonialsCarousel = new TestimonialsCarousel({
        slider: '.testimonials-slider',
        sliderSwitchers: '.items'
    });
    testmonialsCarousel.start(5000);

    $('*[modal_type]').modal({
        slider: '.gallery',
        sliderSwitchers: '.miniatures ul'
    });
});
