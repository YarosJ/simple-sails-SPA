$(document).ready(function () {
    let $btn = $(".search-button");
    let input = $btn.siblings("input")[0];

    $btn.mousedown(function (e) {
        if (input.value === "") {
            e.stopPropagation();
            e.preventDefault();
            input.focus();
        }
    });
});