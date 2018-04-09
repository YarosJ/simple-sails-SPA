'use strict';

import Carousel from "./carousel";

class RemovableCarousel extends Carousel {

    constructor(options) {
        super(options);

        this.$deleteItem = $(options.deleteItemClass || '.delete-item');
        this.$addItem = $(options.addItemClass || '.add-item');
        this.$form = $(options.form || "#testimonials_form");
        this.$overlay = $(options.overlay || "#overlay");
        this._animationIsActive = false;

        let $items = $(options.items || ".items");
        let $close = $(options.close || "#cls");
        let $iconSwitcher = $(options.iconSwitcher || "#icon-switcher");
        let formImagesClass = options.formImagesClass || ".form-images";
        let slideClass = options.slideClass || ".slide";
        let $testimonialsSlider = $(options.testimonialsSlider || ".testimonials-slider" );
        let $modalClose = $(options.modalClose || ".modal_close, #overlay");
        let ths = this;
        let iconTarget;

        this.itemData = {
            "title": 'Consectetur',
            "body": '“1lacus commodo suscipit praesent sollicitudin enim vel mirhon lorem ipsum dolor sit amet, consectetur adipiscing elit mauris necip at”',
            "autor": 'Jon Doe / CEO of LoremIpsum',
            "images": ["../images/female1.png", "../images/male1.png"],
        }

        $.ajax({
            method: "GET",
            url: "/testimonials"
        }).done((data) => {
            for (let key in data) {
                let src = data[key].image;

                this._$slideWrapper.append(this.slideHtml(data[key]));
                this._$sliderSwitchers.append(this.switcherHtml(src))
                    .children().last().hide().fadeIn(400);
                this.slideNow = this._$sliderSwitchers.children().last().index();

                if (!!src){
                    this.constructor.appendUnfoundImg($iconSwitcher, $iconSwitcher, src);
                    this.constructor.appendUnfoundImg(this.$form, this.$form.find(formImagesClass), src);
                }

                this.recountItems();
            }

            if (this.$form.find("img").length < 2) {
              this.itemData.images.forEach( (src)=> {
                this.constructor.appendUnfoundImg(this.$form, this.$form.find(formImagesClass), src);
                this.constructor.appendUnfoundImg($iconSwitcher, $iconSwitcher, src);
              });
            }
        });

        this.$deleteItem.click(() => {
            if (this.slideCount !== 1 && this._animationIsActive === false) {
                this._animationIsActive = true;
                this.deleteItem(this._$slideWrapper.find(slideClass).eq(this.slideNow).attr("_index"));
            }
        });

        this.$addItem.click(() => {
            let i = 0;
            let txtarea;
            for (let key in this.itemData) {
                txtarea = this.$form.find('p').eq(i).find("textarea");
                if (txtarea) {
                    txtarea.val(this.itemData[key]);
                    i++;
                }
            }

            if (!this.itemData.image) {this.itemData.image = this.itemData.images[0];}

            this.showForm();
        });

        this.$form.on("click", "img", function () {
            ths.itemData.image = $(this).attr("src");
            ths.$form.find("img").removeClass("selected");
            $(this).addClass("selected");
        });

        $(".edit-controls").on("click", "button", (e) => {
            if (e.target.className === "edit-ok") {
                this.addItem();
            }
            this.closeForm();
        });

// Icn swc

        $items.on('contextmenu', "li", function (e) {
          iconTarget = $(this);
          e.preventDefault();
          $(this).click();

          $iconSwitcher.css({
            "top": ($(this).offset().top - 50) + 'px',
            "left": ($(this).offset().left) + 'px'
          }).fadeIn(400);
        });

        $iconSwitcher.on('click', "img", function() {
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

// close

        $modalClose.click( ()=> this.closeForm() );
        $close.click( ()=> $iconSwitcher.hide() );
        $(window).resize( ()=> $iconSwitcher.hide() );
        $testimonialsSlider.click( ()=> $iconSwitcher.hide() );

    }

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

    addItem() {
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
                ths._$slideWrapper.append(ths.slideHtml());
                ths._$sliderSwitchers.append(ths.switcherHtml())
                    .children().last().hide().fadeIn(400);
                ths.slideNow = ths._$sliderSwitchers.children().last().index();
                ths.recountItems();
            } else {
                console.log("Error:" + data);
            }
        });
    }

    deleteItem(id) {
        let ths = this;
        $.ajax({
            method: "DELETE",
            url: "/testimonials/" + id,
            data: {"id": id}
        }).done(function (data) {
            if (data === "OK") {
                id = ths._$slideWrapper.find(`li[_index=${id}]`).index();
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
            } else {
                console.log("Error:" + data);
            }
        });
    }

    static appendUnfoundImg($whereToFind, $whereAppend, src){
        if ($whereToFind.find(`[src = "${ src }" ]`).length === 0) {
           $whereAppend.append('<img src="' + src + '" alt="">');
        }
    }

    showForm() {
        this.$overlay.fadeIn(300);
        this.$form.fadeIn(400);
    }

    closeForm() {
        if (this.$form.is(":visible")) {
            this.$form.fadeOut(300);
            this.$overlay.fadeOut(400);
        }
    }

    slideHtml(obj) {
        return (`<li class="slide" _index="${obj ? obj.id : this.itemData.id}">
                 <div class="container">
                    <h1 class="title" contenteditable="true"> ${obj ? obj.title : this.itemData.title} </h1>
                    <h2 class="body" contenteditable="true"> ${obj ? obj.body : this.itemData.body} </h2>
                    <h4 class="autor" contenteditable="true"> ${obj ? obj.autor : this.itemData.autor} </h4> 
                 </div>
              </li>`);
    }

    switcherHtml(img) {
        return (`<li class="testimonials-item testimonials-selected" modal_type="images-select" data-target="#modal_select_form">
                    <img src="${img ? img : this.itemData.image}" alt="">
                    <div class="testimonials-circle"></div>
                    <div class="testimonials-rectangle">
                        <div class="testimonials-triangle"></div>
                    </div>
                </li>`);
    }
}

export default RemovableCarousel;
