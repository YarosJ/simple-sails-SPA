'use strict';

class TextEditability {
    constructor(editableElement) {

        let $editableElement = $(editableElement || '.editable-child');
        this.initText = '';
        this.target = null;
        this.area = null;
        let ths = this;

        $editableElement.click(function (event) {
            ths.target = event.target;

            if (ths.target.nodeName.match(/h\d|p/i)) {

                if ($(event.target).children(".edit-controls").length === 0) {
                    $(ths.area).css('border','none').css('opacity', '1').find(".edit-controls").remove();
                    $(ths.target).css('border','solid').css('opacity', '.9');
                    $(ths.target).append(
                        '<div class="edit-controls" contenteditable="false">' +
                            '<button class="edit-ok">OK</button>' +
                            '<button class="edit-cancel">CANCEL</button>' +
                        '</div>'
                    );
                    $(".edit-controls").hide().fadeIn(400);
                }

                ths.area = event.target;
                ths.initText = $(event.target).contents().not($(event.target).children()).text();

            }

            switch (ths.target.className) {
                case 'edit-cancel':
                    $(ths.area).not($(ths.area).children()).text(ths.initText);
                    $(this).find(".edit-controls").remove();
                    $(ths.area).css('border','none').css('opacity', '1');
                    break;
                case 'edit-ok':
                    $.ajax({
                        method: "PUT",
                        url: "/testimonials/" + $(ths.area).parent().parent().attr("_index"),
                        data: {[ths.area.className]: $(ths.area).contents().not($(ths.area).children()).text()}
                    }).done(function (data) {
                        if (data === "OK") {
                            console.log("OK");
                        } else {
                            $(ths.area).not($(ths.area).children()).text(ths.initText);
                            console.log("Error:" + data);
                        }
                    });
                    $(ths.area).css('border','none').css('opacity', '1');
                    $(this).find(".edit-controls").remove();
                    break;
            }
        });

    }
}

export default TextEditability;
