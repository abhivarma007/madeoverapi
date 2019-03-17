window.onload = function() {
    // only first doughnut chart initiation code is commented, as the code is the same for each one (apart from chart variable names)
    // retrieve data
    $.get("/totals/daily/global.csv", function(fileContent) {
        // define chart
        window.global_daily_total = Morris.Donut(getTotalsOptions(fileContent, 'global_daily_total'));
        // define variable for currently selected segment (a number)
        window.global_daily_total_currentSegment = { value: 0 };
        // select iteam that will automatically be selected when chart is refreshed, if no other segments have been
        // hovered over yet, to avoid unexpected segment selection alteration when chart refreshes for first time
        window.global_daily_total.select(0);
    });
    $.get("/totals/weekly/global.csv", function(fileContent) {
        window.global_weekly_total = Morris.Donut(getTotalsOptions(fileContent, 'global_weekly_total'));
        window.global_weekly_total_currentSegment = { value: 0 };
        window.global_weekly_total.select(0);
    });
    $.get("/totals/monthly/global.csv", function(fileContent) {
        window.global_monthly_total = Morris.Donut(getTotalsOptions(fileContent, 'global_monthly_total'));
        window.global_monthly_total_currentSegment = { value: 0 };
        window.global_monthly_total.select(0);
    });

    // only first line chart initiation code is commented, as the code is the same for each one (apart from chart variable names)
    // retrieve data
    $.get("/rates/daily/global.csv", function(fileContent) {
        // define chart
        window.global_daily_rate = Morris.Line(getRatesOptions(fileContent, 'global_daily_rate'));
    });
    $.get("/rates/weekly/global.csv", function(fileContent) {
        window.global_weekly_rate = Morris.Line(getRatesOptions(fileContent, 'global_weekly_rate'));
    });
    $.get("/rates/monthly/global.csv", function(fileContent) {
        window.global_monthly_rate = Morris.Line(getRatesOptions(fileContent, 'global_monthly_rate'));
    });

    // auto-update charts
    setInterval(function(){
        updateTotals(window.global_daily_total, window.global_daily_total_currentSegment, "/totals/daily/global.csv");
        updateTotals(window.global_weekly_total, window.global_weekly_total_currentSegment, "/totals/weekly/global.csv");
        updateTotals(window.global_monthly_total, window.global_monthly_total_currentSegment, "/totals/monthly/global.csv");
        updateRates(window.global_daily_rate, "/rates/daily/global.csv");
        updateRates(window.global_weekly_rate, "/rates/weekly/global.csv");
        updateRates(window.global_monthly_rate, "/rates/monthly/global.csv");
        $(".chart svg").height($(".chart svg").width());
    },1000);
}
