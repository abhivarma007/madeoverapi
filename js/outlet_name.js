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

    // auto-update charts
    setInterval(function(){
        updateRates(window.global_daily_rate, "/rates/daily/Outlet Name.csv");
        updateRates(window.global_weekly_rate, "/rates/weekly/Outlet Name.csv");
        updateRates(window.global_monthly_rate, "/rates/monthly/Outlet Name.csv");
        $(".chart svg").height($(".chart svg").width());
    },1000);
}
