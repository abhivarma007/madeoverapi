function getCSSColorVariable(variableName) {
    return "rgb(" + getComputedStyle(document.body).getPropertyValue(variableName) + ")";
}

$(document).ready(function() {
    window.text_color = getCSSColorVariable("--text-color");
    window.background_color = getCSSColorVariable('--background-color');
    window.theme_color = getCSSColorVariable('--theme-color');
});
