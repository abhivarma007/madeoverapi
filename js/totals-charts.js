// function for getting an array of colour values that create a rainbow, to make doughnut charts look nice
function getRainbow(size) {
    var rainbow = []
    // hash is not included by palette.js (which creates the array), so it is added here
    palette('tol-rainbow', size).forEach(function(colour) {
        rainbow.push("#" + colour);
    });
    return rainbow;
}

// function for sorting CSV data for charts displaying totals
function sortTotalsData(data) {
    // define variables used later on
    var labelNames = [];
    var dataValues = [];
    var i = 0;

    // split received data into lines
    var lines = data.split("\n");

    // split each line into labels and data values
    lines.forEach(function(line) {
        if (i != 0 && i != (lines.length - 1)) {
            var items = line.split(",");
            labelNames.push(items[0]);
            dataValues.push(Number(items[1]));
        }
        i ++;
    });

    // define variable to hold final data
    var chartData = [];

    // format data correctly
    labelNames.forEach(function(name, index) {
        chartData.push({ label: name, value: dataValues[index] });
    });

    // return data
    return chartData;
}

// function for auto-updating doughnut charts
function updateTotals(chart, currentSegment, csvFileLocation) {
    // retrieve new data
    $.get(csvFileLocation, function(fileContent) {
        // change data on chart to correctly-formatted new data
        chart.setData(sortTotalsData(fileContent));
        // select the previously selected segment
        chart.select(currentSegment.value);

        // ensure variable storing currently selected segment is updated
        for ( i = 0; i < chart.segments.length; i++ ) {
            chart.segments[i].handlers["hover"].push( function(i) {
                currentSegment.value = i;
            });
        }
    });
}

// function for compiling options for chart configuration
function getTotalsOptions(fileContent, chartTarget) {
    // format data for use in chart
    var chartData = sortTotalsData(fileContent);

    // return config options including data
    return {
        // ID of target element
        element: chartTarget,
        data: chartData,
        resize: false,
        // segment colours
        colors: getRainbow(chartData.length),
        labelColor: '#eeeeee',
        formatter: function (y) { return y + "L" }
    }
}
