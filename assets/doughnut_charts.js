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
*/
function drawDoughnutChart(chartLocationID,csvFileLocation,dataTimePeriod) {
    var dataTimeFrame = ""
    var doughnutChartCenterLabel = ""
    switch(dataTimePeriod) {
        case "Today":
            dataTimeFrame = "day";
            doughnutChartCenterLabel = "Today";
        case "Past Week":
            dataTimeFrame = "week";
            doughnutChartCenterLabel = "This Week";
        case "Past Month":
            dataTimeFrame = "month";
            doughnutChartCenterLabel = "This Month";
    }
    Chart.pluginService.register({
		beforeDraw: function (chart) {
			if (chart.config.options.elements.center) {
        //Get ctx from string
        var ctx = chart.chart.ctx;

				//Get options from the center object in options
        var centerConfig = chart.config.options.elements.center;
      	var fontStyle = centerConfig.fontStyle || 'Arial';
				var txt = centerConfig.text;
        var color = centerConfig.color || '#000';
        var sidePadding = centerConfig.sidePadding || 20;
        var sidePaddingCalculated = (sidePadding/100) * (chart.innerRadius * 2)
        //Start with a base font of 30px
        ctx.font = "30px " + fontStyle;

				//Get the width of the string and also the width of the element minus 10 to give it 5px side padding
        var stringWidth = ctx.measureText(txt).width;
        var elementWidth = (chart.innerRadius * 2) - sidePaddingCalculated;

        // Find out how much the font can grow in width.
        var widthRatio = elementWidth / stringWidth;
        var newFontSize = Math.floor(30 * widthRatio);
        var elementHeight = (chart.innerRadius * 2);

        // Pick a new font size so it will not be larger than the height of label.
        var fontSizeToUse = Math.min(newFontSize, elementHeight);

				//Set font settings to draw it correctly.
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        var centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
        var centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);
        ctx.font = fontSizeToUse+"px " + fontStyle;
        ctx.fillStyle = color;

        //Draw text in center
        ctx.fillText(txt, centerX, centerY);
			}
		}
	});
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
                },
                elements: {
                    center: {
                        text: doughnutChartCenterLabel,
                        color: "#000000",
                        sidePadding: 30 // this is a percentage
                    }
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
