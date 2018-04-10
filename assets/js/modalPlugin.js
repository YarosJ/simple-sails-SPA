import $ from 'jquery';
import Gallery from "./gallery";

(function ($) {
  $.fn.modal = function (options) {

    let gallery = new Gallery(options);
    let btn = this;
    let dataTarget, imageSrc;

    let modalImageClass = options.modalImageClass || "modal_image",
      modalHtmlClass = options.modalHtmlClass || "modal_html",
      $overlay = $(options.overlay || '#overlay'),
      $modalClose = $(options.modalClose || '.modal_close, #overlay');

    /**
     * Here, the type of the modal element is determined by the data
     * attribute of the element on which was clicked and the
     * appropriate modal window is displayed
     */

    btn.click(function () {
      let btnTarget = $(this);
      dataTarget = $(btnTarget.attr('data-target'));

      switch (btnTarget.attr('modal_type')) {
        case 'html':
          dataTarget.children("p").text(btnTarget.siblings("p").text());
          dataTarget
            .removeClass(modalImageClass)
            .addClass(modalHtmlClass)
            .children("img").css('display', 'none');
          $overlay.fadeIn(300);
          dataTarget.fadeIn(400);
          break;
        case 'image':
          imageSrc = btnTarget.find("img").attr('src');
          dataTarget.children("img")[0].setAttribute("src", imageSrc);
          dataTarget.children("p").empty();
          dataTarget
            .removeClass(modalHtmlClass)
            .addClass(modalImageClass)
            .children("img").css('display', 'block');
          $overlay.fadeIn(300);
          dataTarget.fadeIn(400);
          break;
        case 'gallery':
          gallery.slideNow = btnTarget.index();
          gallery.showControls();
          break;
      }
    });

    /**
     * Closing the modal window is performed here
     */

    $modalClose.click(function () {
      gallery.hideControls();
      if (dataTarget.is(":visible")) {
        dataTarget.fadeOut(300);
        $overlay.fadeOut(400);
      }
    });
  };
})(jQuery);
