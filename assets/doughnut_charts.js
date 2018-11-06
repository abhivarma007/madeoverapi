// function for sorting CSV data for doughnut charts
function sortDataForTotalsDoughnutChart(data) {
    var labelNames = new Array();
    var dataValues = new Array();
    var i = 0;
    var lines = data.split("\n");
    // split CSV string into labels and data values
    lines.forEach(function(line) {
        if (i != 0 && i != (lines.length - 1)) {
            var items = line.split(",");
            labelNames.push(items[0] + " (" + items[1] + "litres)");
            dataValues.push(Number(items[1]));
        }
        i ++;
    });
    return [labelNames,dataValues];
}



/*
dataTimePeriod is:
    Today
    Past Week
    Past Month

dataTimeFrame is:
    day
    week
    month
*/
function drawDoughnutChart(chartLocationID,csvFileLocation,dataTimePeriod,dataTimeFrame) {
    // retrieve data from CSV file
    $.get(csvFileLocation, function(fileContent) {
        var labelsAndData = sortDataForTotalsDoughnutChart(fileContent);
        var labelNames = labelsAndData[0];
        var dataValues = labelsAndData[1];

        // specify chart config options
        window.totalsDoughnutChartConfig = {
            type: "doughnut",
            data: {
                datasets: [{
                    label: "Amount of water used over the past " + dataTimeFrame + " /L",
                    backgroundColor: ['red','#111','yellow','#333','pink','#555','#666','#777','#888','#999','#ccc','#ddd','#fff'],
                    data: dataValues,
                    label: "Water usage /L"
                }],
                labels: labelNames
            },
            options: {
                responsive: true,
                title: {
                    display: true,
                    text: 'Total Water Usage - Past' + dataTimePeriod
                },
                animation: {
                    animateScale: true,
                    animateRotate: true
                },
                tooltips: {
                    enabled: true
                }
            }
        }

        // specify place to draw chart
        var ctx = document.getElementById(chartLocationID);
        return new Chart(ctx, window.totalsDoughnutChartConfig);
    });
}

// function for auto-updating doughnut charts
function updateTotalsDoughnutChart(chart,csvFileLocation) {
    // retrieve new data
    $.get(csvFileLocation, function(fileContent) {
        var newData = sortDataForTotalsDoughnutChart(fileContent)[1];
        var newLabels = sortDataForTotalsDoughnutChart(fileContent)[0];
        // only update if data is different, to avoid tooltip animation issues
        if (window.totalsDoughnutChartConfig.data.datasets[0].data != newData || window.totalsDoughnutChartConfig.data.labels != newLabels) {
            window.totalsDoughnutChartConfig.data.datasets[0].data = newData;
            window.totalsDoughnutChartConfig.data.labels = newLabels;
            chart.update();
        }
    });
}
