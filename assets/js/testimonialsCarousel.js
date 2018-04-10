'use strict';

import RemovableCarousel from "./removableCarousel";

class TestimonialsCarousel extends RemovableCarousel {

  constructor(options) {
    super(options);

    this.$form = $(options.form || "#testimonials_form");
    this.$overlay = $(options.overlay || "#overlay");

    let $deleteItem = $(options.deleteItemClass || '.delete-item');
    let $addItem = $(options.addItemClass || '.add-item');
    let $items = $(options.items || ".items");
    let $close = $(options.close || "#cls");
    let $iconSwitcher = $(options.iconSwitcher || "#icon-switcher");
    let formImagesClass = options.formImagesClass || ".form-images";
    let slideClass = options.slideClass || ".slide";
    let $testimonialsSlider = $(options.testimonialsSlider || ".testimonials-slider");
    let $modalClose = $(options.modalClose || ".modal_close, #overlay");
    let ths = this;
    let iconTarget;

    this.itemData = {
      "title": 'Consectetur',
      "body": '“1lacus commodo suscipit praesent sollicitudin enim vel mirhon lorem ipsum ' +
              'dolor sit amet, consectetur adipiscing elit mauris necip at”',
      "autor": 'Jon Doe / CEO of LoremIpsum',
      "images": ["../images/female1.png", "../images/male1.png"],
    }

    /**
     * There is performed Ajax request to initialize and fill the slider when the page loads
     */

    $.ajax({
      method: "GET",
      url: "/testimonials"
    }).done((data) => {
      for (let key in data) {

        let src = data[key].image;
        ths.addItem(data[key]);

        if (!!src) {
          this.constructor.appendUnfoundImg($iconSwitcher, $iconSwitcher, src);
          this.constructor.appendUnfoundImg(this.$form, this.$form.find(formImagesClass), src);
        }

        this.recountItems();
      }

      if (this.$form.find("img").length < 2) {
        this.itemData.images.forEach((src) => {
          this.constructor.appendUnfoundImg(this.$form, this.$form.find(formImagesClass), src);
          this.constructor.appendUnfoundImg($iconSwitcher, $iconSwitcher, src);
        });
      }
    });

    /**
     * There is performed Ajax request to remove the current slide and remove it from the page
     */

    $deleteItem.click(() => {
      let ths = this;
      let id = this._$slideWrapper.find(slideClass).eq(this.slideNow).attr("_index");
      let itemId = ths.slideNow;

      $.ajax({
        method: "DELETE",
        url: "/testimonials/" + id,
        data: {"id": id}
      }).done(function (data) {
        if (data === "OK") {
          ths.deleteItem(itemId);
        } else {
          console.log("Error:" + data);
        }
      });
    });

    /**
     * This shows the form and adds the default data for it
     */

    $addItem.click(() => {
      let i = 0;
      let txtarea;

      for (let key in this.itemData) {
        txtarea = this.$form.find('p').eq(i).find("textarea");
        if (txtarea) {
          txtarea.val(this.itemData[key]);
          i++;
        }
      }

      if (!this.itemData.image) {
        this.itemData.image = this.itemData.images[0];
      }

      this.showForm();
    });

    /**
     * Here, the image source is set in the send form when clicking on the image
     */

    this.$form.on("click", "img", function () {
      ths.itemData.image = $(this).attr("src");
      ths.$form.find("img").removeClass("selected");
      $(this).addClass("selected");
    });

    /**
     * A check button is pressed in the form, and if it is OK - read the data
     * from the form and sent Ajax request to add a slide
     */

    $(".edit-controls").on("click", "button", (e) => {
      if (e.target.className === "edit-ok") {

        let [ths, i] = [this, 0];
        let val;

        for (let key in this.itemData) {
          val = this.$form.find('p').eq(i).find("textarea").val();
          if (val) this.itemData[key] = val;
          i++;
        }

        $.ajax({
          method: "POST",
          url: "/testimonials",
          data: {
            "title": this.itemData.title,
            "body": this.itemData.body,
            "autor": this.itemData.autor,
            "image": this.itemData.image
          }
        }).done(function (data) {
          if (data === "OK") {
            ths.addItem(ths.itemData);
          } else {
            console.log("Error:" + data);
          }
        });
      }
      this.closeForm();
    });

    /**
     * Here, the processing contextmenu event for the slider icons
     */

    $items.on('contextmenu', "li", function (e) {
      iconTarget = $(this);
      e.preventDefault();
      $(this).click();

      $iconSwitcher.css({
        "top": ($(this).offset().top - 57) + 'px',
        "left": ($(this).offset().left - 1) + 'px'
      }).fadeIn(400);
    });

    /**
     * There is performed Ajax update request icon when you click on it
     */

    $iconSwitcher.on('click', "img", function () {
      $.ajax({
        method: "PUT",
        url: "/testimonials/" + $testimonialsSlider.find(slideClass).eq(iconTarget.index()).attr("_index"),
        data: {image: $(this).attr("src")}
      }).done((data) => {
        if (data === "OK") {
          iconTarget.find("img").attr("src", $(this).attr("src"));
        } else {
          console.log("Error:" + data);
        }
      });
    });

    /**
     * Here events are attached to close the form and the image switcher
     */

    $modalClose.click(() => this.closeForm());
    $close.click(() => $iconSwitcher.hide());
    $(window).resize(() => $iconSwitcher.hide());
    $testimonialsSlider.click(() => $iconSwitcher.hide());

  }

  /**
   * Finds and adds an image for the corresponding passed parameters
   *
   * @param $whereToFind The item you want to check for an image
   * @param $whereAppend The element to which you want to add an image
   * @param src the Source of the image you want to add
   */

  static appendUnfoundImg($whereToFind, $whereAppend, src) {
    if ($whereToFind.find(`[src = "${ src }" ]`).length === 0) {
      $whereAppend.append('<img src="' + src + '" alt="">');
    }
  }

  /**
   * Shows the form for adding a slide
   */

  showForm() {
    this.$overlay.fadeIn(300);
    this.$form.fadeIn(400);
  }

  /**
   *  Hides the form for adding a slide
   */

  closeForm() {
    if (this.$form.is(":visible")) {
      this.$form.fadeOut(300);
      this.$overlay.fadeOut(400);
    }
  }
}

export default TestimonialsCarousel;
