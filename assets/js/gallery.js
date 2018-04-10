'use strict';

import Carousel from "./carousel";

class Gallery extends Carousel {
  constructor(options) {
    super(options);

    this._$arrowRight = $(options.arrowRight || ".arrow-right");
    this._$arrowLeft = $(options.arrowLeft || ".arrow-left");
    this._$miniatures = $(options.miniatures || ".miniatures");
    this._imageArray = [];

    this.$controls = $(options.controls || ".gallery");
    this.$slideImg = $(options.slideImg || ".slide-img");
    this.$score = $(options.score || ".score");
    let ths = this;

    /**
     * Here images are added to the gallery from the slider if not already added
     */

    if (this._imageArray.length === 0) {
      this.$slideImg.each((i, e) => {
        this._imageArray.push($(e).attr('src'));
        this._$slideWrapper.append(`<li class="slide"><img src='${$(e).attr("src")}' alt=""></li>`);
        this._$miniatures.find("ul").append(`<li><img src='${$(e).attr('src')}' class="gallery-switcher"></li>`);
      });
    }

    this._$miniatures.find("li").css("width", `calc(100%/${this._imageArray.length + 0.2})`);
    this.slideCount = this._$slideWrapper.children().length;

    this._$slider.click(function (element) {
      if (element.target.className === "gallery") {
        ths.hideControls();
      } else {
        ths.$score.text(ths.slideNow + 1);
      }
    });

    this._$arrowRight.click(() => {
      this.nextSlide();
    });

    this._$arrowLeft.click(() => {
      this.previousSlide();
    });
  }

  /**
   * Hide the gallery and its controls
   */

  hideControls() {
    this.$controls.fadeOut(400);
  }

  /**
   * Shows the gallery, its controls, and moves the slide to the current
   */

  showControls() {
    this.$controls.fadeIn(400);
    this.$score.text(this.slideNow + 1);
    this.moveSlide(this.slideNow);
  }
}

export default Gallery;
