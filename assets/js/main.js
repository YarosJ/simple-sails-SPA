import '../styles/index.less';
import Carousel from "./carousel";
import RemovableCarousel from "./removableCarousel";
import TextEditability from "./textEditability";

$(document).ready(function () {

    const editability = new TextEditability();

    const topCarousel = new Carousel({
        slider: '.slider'
    });
    topCarousel.start(7000);

    const testmonialsCarousel = new RemovableCarousel({
        slider: '.testimonials-slider',
        sliderSwitchers: '.items'
    });
    testmonialsCarousel.start(5000);

    $('*[modal_type]').modal({
        slider: '.gallery',
        sliderSwitchers: '.miniatures ul'
    });
});
