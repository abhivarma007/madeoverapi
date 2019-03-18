$(document).ready(function() {
    window.text_color = getComputedStyle(document.body).getPropertyValue('--text-color');
    window.background_color = getComputedStyle(document.body).getPropertyValue('--background-color');
    window.theme_color = getComputedStyle(document.body).getPropertyValue('--theme-color');
});
