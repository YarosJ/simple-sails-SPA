'use strict';

class Carousel {
    constructor(options) {

        this._$slider = $(options.slider);
        this._$sliderSwitchers = $(options.slider + ' ' + (options.sliderSwitchers || '.slider-switchers ul'));
        this._$slideWrapper = $(options.slider + ' ' + (options.slideWrapper || '.slidewrapper'));
        this._$viewport = $(options.slider + ' ' + (options.viewport || '.viewport'));
        this.selectedSwitcherClass = options.selectedSwitcherClass || 'selected-switcher';
        this._translateWidth = 0;
        this._navBtnId = 0;

        this.slideNow = options.initialSlide || 0;
        this.slideCount = this._$slideWrapper.children().length;
        this.slideInterval = 7000;

        this._$slider.hover(() => {
            this.stop();
        }, () => {
            this.start();
        });

        $(window).resize(() => {
            this._$slideWrapper.css({
                'transition': '0s'
            });
            this.moveSlide(this.slideNow);
        });

        this._$sliderSwitchers.on('click', "li", (e) => {
            this._navBtnId = $(e.currentTarget).index();
            if (this._navBtnId !== this.slideNow) {
                this.moveSlide(this._navBtnId);
                this.slideNow = this._navBtnId;
            }
            this.updateCurrentCircle(this.slideNow);
        });
    }

  /**
   * Adds the appropriate class for the current slide switch and removes this class from the others
   *
   * @param slideNow
   */

  updateCurrentCircle(slideNow) {
        this._$sliderSwitchers.find("li").removeClass(this.selectedSwitcherClass);
        $(this._$sliderSwitchers.find("li")[slideNow]).addClass(this.selectedSwitcherClass);
        this._$slideWrapper.css({'transition': '1s'});
    }

  /**
   * Moves slideWrapper to the next position of the slide
   */

  nextSlide() {
        if (this.slideNow + 1 === this.slideCount || this.slideNow + 1 <= 0 || this.slideNow + 1 > this.slideCount) {
            this.slideNow = -1;
        }
        this.slideNow++;
        this.moveSlide(this.slideNow);
        this.updateCurrentCircle(this.slideNow);
    }

  /**
   * Moves slideWrapper to the previous position of the slide
   */

  previousSlide() {
        if (this.slideNow === 0) {
            this.slideNow = this.slideCount;
        }
        this.slideNow--;
        this.moveSlide(this.slideNow);
        this.updateCurrentCircle(this.slideNow);
    }

  /**
   * Moves slideWrapper to the position of appropriate id of the slide
   *
   * @param Id
   */

  moveSlide(Id) {
        this._translateWidth = -this._$viewport.width() * (Id);
        this._$slideWrapper.css({
            'transform': 'translate(' + this._translateWidth + 'px, 0)',
            '-webkit-transform': 'translate(' + this._translateWidth + 'px, 0)',
            '-ms-transform': 'translate(' + this._translateWidth + 'px, 0)',
        });
    }

  /**
   * Starts automatic scrolling of the slider
   *
   * @param slideInterval Interval between switching slides in milliseconds
   */

  start(slideInterval) {
        if (slideInterval != null) {
            this.slideInterval = slideInterval;
        }
        this._switchInterval = setInterval(() => {
            this.nextSlide();
        }, this.slideInterval);
    }

  /**
   * Stop automatic scrolling of the slider
   */

  stop() {
        this._switchInterval = clearInterval(this._switchInterval);
    }
}

export default Carousel;
