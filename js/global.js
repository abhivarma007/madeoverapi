function getCSSColorVariable(variableName) {
    return "rgb(" + getComputedStyle(document.body).getPropertyValue(variableName) + ")";
}

$(document).ready(function() {
    window.text_color = getCSSColorVariable("--text-color");
    window.background_color = getCSSColorVariable('--background-color');
    window.theme_color = getCSSColorVariable('--theme-color');
    $(".mdl-navigation").load("/includes/navbar.html", function() {
        // get current URL with no forward slash at the end and no domain
        var drawer_item_link_query_selector = ".mdl-navigation__link[href='" + window.location.pathname;
        if (drawer_item_link_query_selector.substring(drawer_item_link_query_selector.length - 1) == "/") {
            drawer_item_link_query_selector = drawer_item_link_query_selector.substring(0,drawer_item_link_query_selector.length - 1);
        }

        // give 'selected' styling to correct item on navbar
        $(drawer_item_link_query_selector + "']").addClass("mdl-navigation__link--activated");
        $(drawer_item_link_query_selector + "/']").addClass("mdl-navigation__link--activated");
        $(drawer_item_link_query_selector + "/index.html']").addClass("mdl-navigation__link--activated");
    });
});


function openTips() {
    $(".mdl-layout__content").scrollTop(0);
    $(".tips-dialog .mdl-card__content .global-tips").load("/global-improvement.txt", function() {
        $(".tips-dialog").css("max-height", $(".mdl-layout__content").height() - 36);
    });
    $(".tips-dialog-shadow").width($(".mdl-grid").width());
    $(".tips-dialog").show({
        duration: 100,
        queue: false
    });
    $(".tips-dialog-shadow").show({
        duration: 100,
        queue: false
    });
    $(".mdl-layout__content").css("overflow-y", "hidden");
}

function closeTips() {
    $(".tips-dialog").hide({
        duration: 100,
        queue: false
    });
    $(".tips-dialog-shadow").hide({
        duration: 100,
        queue: false
    });
    $(".mdl-layout__content").css("overflow-y", "auto");
}

function arraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) {
        return false;
    }
    for (var i = arr1.length; i--;) {
        if (JSON.stringify(arr1[i]) !== JSON.stringify(arr2[i])) {
            return false;
        }
    }

    return true;
}