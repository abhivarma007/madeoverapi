// function for sorting CSV data for line charts
function sortDataForLineChart(data) {
    // Split CSV string into x and y values for line chart
    var dataValues = new Array();
    var i = 0;
    var lines = data.split("\n");
    // split CSV string into x and y values for line chart
    lines.forEach(function(line) {
        // -1 to account for empty line at the end of each CSV file
        if (i != 0 && i != (lines.length - 1)) {
            var items = line.split(",");
            dataValues.push({x: items[0], y: Number(items[1])});
        }
        i ++;
    });
    return dataValues;
}

/*
dataTimePeriod is:
    Today
    Past Week
    Past Month
*/
function setConfigOptionsForLineCharts(dataTimePeriod,fileContent) {
    var dataValues = sortDataForLineChart(fileContent);

    // specify chart config options
    window.rateLineChartConfig = {
        type: "line",
        data: {
            datasets: [{
                data: dataValues,
                label: "Water usage rate /[unit]",
                fill: true,
                borderColor: "#bf360c",
                backgroundColor: "#009688"
            }]
        },
        options: {
            responsive: true,
            title: {
                display: true,
                text: 'Water Usage Rate - ' + dataTimePeriod
            },
            scales: {
                xAxes: [{
                    type: 'time',
                    time: {
                        displayFormats: {
                            minute: 'h:mm a'
                        }
                    },
                    ticks: {
                        source: 'auto'
                    },
                    distribution: 'linear',
                    bounds: 'data'
                }]
            }
        }
    }
}

// function for auto-updating doughnut charts
function updateRateLineChart(chart,csvFileLocation) {
    // retrieve new data
    $.get(csvFileLocation, function(fileContent) {
        var newData = sortDataForLineChart(fileContent);
        // only update if data is different, to avoid tooltip animation issues
        if (window.rateLineChartConfig.data.datasets[0].data != newData) {
            window.rateLineChartConfig.data.datasets[0].data = newData;
            chart.update();
        }
    });
}
