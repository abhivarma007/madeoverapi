window.onload = function() {
    // only first line chart initiation code is commented, as the code is the same for each one (apart from chart variable names)
    // retrieve data
    $.get("/rates/daily/Outlet Name.csv", function(fileContent) {
        // define chart
        window.outlet_name_daily_rate = Morris.Line(getRatesOptions(fileContent, 'outlet_name_daily_rate'));
    });
    $.get("/rates/weekly/Outlet Name.csv", function(fileContent) {
        window.outlet_name_weekly_rate = Morris.Line(getRatesOptions(fileContent, 'outlet_name_weekly_rate'));
    });
    $.get("/rates/monthly/Outlet Name.csv", function(fileContent) {
        window.outlet_name_monthly_rate = Morris.Line(getRatesOptions(fileContent, 'outlet_name_monthly_rate'));
    });

    // auto-update charts when data changes
    setInterval(function () {
        updateRates(window.global_daily_rate, "/rates/daily/global.csv", false);
        updateRates(window.global_weekly_rate, "/rates/weekly/global.csv", false);
        updateRates(window.global_monthly_rate, "/rates/monthly/global.csv", false);
        $(".chart svg").height($(".chart svg").width());
    }, 1000);

    // auto-update charts when screen resolution changes
    window.addEventListener("resize", function () {
        updateRates(window.global_daily_rate, "/rates/daily/global.csv", true);
        updateRates(window.global_weekly_rate, "/rates/weekly/global.csv", true);
        updateRates(window.global_monthly_rate, "/rates/monthly/global.csv", true);
        $(".chart svg").height($(".chart svg").width());
    });
    window.addEventListener("orientationchange", function () {
        updateRates(window.global_daily_rate, "/rates/daily/global.csv", true);
        updateRates(window.global_weekly_rate, "/rates/weekly/global.csv", true);
        updateRates(window.global_monthly_rate, "/rates/monthly/global.csv", true);
        $(".chart svg").height($(".chart svg").width());
    });
}
