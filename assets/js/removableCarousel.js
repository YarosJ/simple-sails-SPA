'use strict';

import Carousel from "./carousel";

class RemovableCarousel extends Carousel {

  constructor(options) {
    super(options);
    this._animationIsActive = false;
  }

  /**
   * Moves the slideWrapper to the appropriate coordinates and sets the class for the current switcher
   */

  recountItems() {
    this.slideCount = this._$sliderSwitchers.find("li").length;
    this._$slideWrapper.find("li").css("width", `calc(100%/${this.slideCount})`);
    this._$slideWrapper.css({
      'transition': '0s',
      'width': `calc(100%*${this.slideCount})`
    });
    this.moveSlide(this.slideNow);
    this.updateCurrentCircle(this.slideNow);
  }

  /**
   * Adds new slides to the slider
   *
   * @param obj Object containing the data of the slide to be added
   */

  addItem(obj) {
    let ths = this;
    ths._$slideWrapper.append(ths.constructor.slideHtml(obj));
    ths._$sliderSwitchers.append(ths.constructor.switcherHtml(obj.image))
      .children().last().hide().fadeIn(400);
    ths.slideNow = ths._$sliderSwitchers.children().last().index();
    ths.recountItems();
  }

  /**
   * Deletes the slide appropriate to the passed id
   *
   * @param id
   */

  deleteItem(id) {
    let ths = this;

    if (this.slideCount !== 1 && this._animationIsActive === false) {
      this._animationIsActive = true;

      ths._$slideWrapper.find("li").eq(id).remove();
      ths._$sliderSwitchers.find("li").eq(id).fadeOut(400, function () {
        if (ths.slideNow + 1 == ths.slideCount) {
          ths.slideNow = $($(this).prev()).index();
        } else {
          ths.slideNow = $($(this).prev()).index() + 1;
        }
        $(this).remove();
        ths.recountItems();

        ths._animationIsActive = false;
      });
    }
  }

  /**
   * Returns a string with HTML of slide, containing the passed parameters,
   * or if parameters are not passed - it sets the default value
   *
   * @param obj Object containing the data of the slide to be added
   * @returns {string}
   */

  static slideHtml(obj) {
    return (`<li class="slide" _index="${ obj.id }">
                 <div class="container">
                    <h1 class="title" contenteditable="true"> ${obj ? obj.title : 'Consectetur'} </h1>
                    <h2 class="body" contenteditable="true"> 
                        ${obj ? obj.body : '“Lacus commodo suscipit praesent ' +
                        'sollicitudin enim vel mirhon lorem ipsum dolor sit amet, ' +
                        'consectetur adipiscing elit mauris necip at”'} 
                    </h2>
                    <h4 class="autor" contenteditable="true"> ${obj ? obj.autor : 'Jon Doe / CEO of LoremIpsum'} </h4>
                 </div>
              </li>`);
  }

  /**
   * Returns a string with HTML of slide switcher, containing the passed image source,
   * or if source are not passed - it sets the default value
   *
   * @param img Source of image
   * @returns {string}
   */

  static switcherHtml(img) {
    return (`<li class="testimonials-item testimonials-selected" modal_type="images-select" data-target="#modal_select_form">
                  <img src="${img ? img : "../images/female1.png"}" alt="">
                  <div class="testimonials-circle"></div>
                  <div class="testimonials-rectangle">
                      <div class="testimonials-triangle"></div>
                  </div>
              </li>`);
  }
}

export default RemovableCarousel;
