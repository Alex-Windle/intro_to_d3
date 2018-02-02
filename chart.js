function makeChart (chartConfigObject, jsonData, lookup) {
    console.log("config: ", chartConfigObject);
    console.log("data: ", jsonData);
    //set chart data variables
    let totalBars = jsonData.length; 
    let barColors = chartConfigObject.colorsArrStr;
    let barDataValues = []; 
    let xAxisCategoryNames = []; 
    let yAxisTitle = chartConfigObject.yAxisTitle; 
    let legendTitle = chartConfigObject.legendTitleStr;
    let legendCategoryNames = []; //count items to distinguish how many bars***** 
    let legendEntryCount = []; 
    let confidenceIndicators = [];             
    let confidenceIntervalLabel = chartConfigObject.confidenceIntervalLabel; 
    let decimalPlaces = chartConfigObject.decimalPlaces; 
    let tooltipDisplay = []; 
    let displayTrendChart = chartConfigObject.displayTrendChart; 
    
    //process chart data variables
    let xAxisColumn = chartConfigObject.xAxisColumn; 
    let xAxisType = chartConfigObject.xAxisType; 
    let xAxisCategoryDataCodes = []; 
    let legendColumn = chartConfigObject.legendColumn; 
    let legendType = chartConfigObject.legendType; 
    let legendCategoryDataCodes = [];        

    jsonData.forEach(function (obj, i) {
        //get data values
        let barDataValue = Number(obj.dv.toFixed(decimalPlaces));
        barDataValues.push(barDataValue);

        //save data codes. then, map titles. 
        xAxisCategoryDataCodes.push(obj[xAxisColumn]);
        legendCategoryDataCodes.push(obj[legendColumn]);

        let confidenceIndicator = {
            lci: obj.lci,
            hci: obj.hci
        };
        confidenceIndicators.push(confidenceIndicator);
            
        make_tooltip_display(obj);
        return;
    });

    //map codes to category names
    xAxisCategoryDataCodes.forEach(function (code) {
        let lku = lookup[xAxisType]; 
        for (key in lku) {
            if (code === key) {
                const name = lku[code].name;
                if (xAxisCategoryNames.indexOf(name) < 0)
                    xAxisCategoryNames.push(name);
            } 
        }
    });

    legendCategoryDataCodes.forEach(function (code) {
        let lku = lookup[legendType]; 
        for (key in lku) {
            if (code === key) {
                const name = lku[code].name;
                //check array for existing str
                if (legendCategoryNames.indexOf(name) < 0) {
                    legendCategoryNames.push(name);
                }
            } 
        }
    });

    legendEntryCount = legendCategoryNames.length; //***** get count
    console.log("count: ", legendEntryCount);
    console.log("legendCategoryNames: ", legendCategoryNames);
    
    function make_tooltip_display (obj) {   
        let column = obj[xAxisColumn];
        let title = lookup[xAxisType][column].name; 
        let wn = String(obj.wn); 
        if (wn.length > 3 && wn.length < 7) {
            wn = wn.split("").reverse().join("");
            wn = wn.substring(0,3) + "," + wn.substring(3);
            wn = wn.split("").reverse().join("");
        }
            else if (wn.length > 6 && wn.length < 10) {
            wn = wn.split("").reverse().join("");
            wn = wn.substring(0,3) + "," + wn.substring(3,6) + "," + wn.substring(6);
            wn = wn.split("").reverse().join("");
        }
        tooltipDisplay.push({
            title: title,
            dv: obj.dv,
            lci: obj.lci, 
            hci: obj.hci,
            wn: wn
        });
    }

    //svg chart variables
    const margin = {top: 30, right: 0, bottom: 220, left: 50};
    const width = 700 - margin.left - margin.right;
    const height = 700 - margin.top - margin.bottom;
    const totalWidth = width + margin.left + margin.right; 
    const halfTotalWidth = totalWidth / 2; 
    const totalHeight = height + margin.top + margin.bottom;
    const chartTopBufferDataValue = 15; //verify this value with team
    const chartBottomBufferLegend = totalHeight - margin.bottom + 100; //FIX
    const spaceFromTop = height + margin.top; 
    const legendColorKeyWidth = 20;
    const legendColorKeyHeight = 20;
    const legendItemHeight = 20;
    const legendItemPadding = 10;

    //tool tip
    var div = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    //scale
    var x = d3.scaleBand()
        .domain(xAxisCategoryNames) 
        .rangeRound([0, width]) //total width 
        .padding(0.1);

    var y = d3.scaleLinear()
        //set value scaling with buffer
        .domain([0, d3.max(barDataValues) + chartTopBufferDataValue])
        .range([height, 0]);

    //gridlines in y axis 
    function make_y_gridlines() {
        return d3.axisLeft(y)
    }

    //determine rendering of single or multi-bar chart
    switch (legendEntryCount) {
        case 1: 
            console.log("display single-bar chart"); 
            makeChartSingleBar();
            break;
        case 2: 
            console.log("display multi-bar chart");
            makeChartMultiBar();
            break; 
        default:
            console.log("error"); 
            break; 
    }

    // function makeChartSingleBar () {
    //     var chart = d3.select(".chart") 
    //     // .attr("height", "700") //refactor for compatibility with ie
    //     .attr("viewBox", function () {
    //         return "0 0 700 700";
    //     })
    //     .attr("preserveAspectRatio", "xMinYMin meet");

    //     //create bar grouping
    //     var bar = chart.selectAll("g"); 

    //     // add the Y gridlines
    //     chart.append("g")			
    //         .attr("class", "grid")
    //         .call(make_y_gridlines()
    //             .tickSize(-width) //full graph width
    //             .tickFormat("")
    //         )
    //         .attr("transform", "translate(" + margin.left + "," + margin.top + ")");    

    //     //bars
    //     bar = bar.data(xAxisCategoryNames)
    //         .enter()
    //         .append("g") 
    //         .attr("transform", function (d) { 
    //             var bandwidth = x.bandwidth(); 
    //             var spaceLeft = x.bandwidth() + x(d);
    //             return "translate(" + spaceLeft + ", " + margin.top + ")";  
    //         }); 
    //     bar.append("rect")
    //         .data(barDataValues)
    //         .attr("y", function (d) { return y(d); }) //y coordinate
    //         .attr("height", function (d) { return height - y(d); }) //height
    //         .attr("width", function (d, i) { return x.bandwidth() / 3; })
    //         .style("fill", barColors[0]) //hard-coded first color in array
    //         .data(tooltipDisplay)
    //         .on("mouseover", function (d, i) {
    //             div.transition()
    //                 .duration(200)
    //                 .style("opacity", .9);
    //             div.html(`
    //                 <h3>${d.title}</h3> 
    //                 <h3>${d.dv}</h3>
    //                 CI (${d.lci} - ${d.hci})
    //                 <br />WN = ${d.wn}
    //             `)                  
    //                 .style("left", (d3.event.pageX - 70) + "px")
    //                 .style("top", (d3.event.pageY - 90) + "px");
    //         })
    //         .on("mouseout", function (d) {
    //             div.transition()
    //                 .duration(500)
    //                 .style("opacity", 0);
    //         }); 

    //     //confidence indicator line
    //     var line = bar.append("line")
    //         .attr("class", "confidence_indicator")
    //         .data(confidenceIndicators)
    //         .attr("x1", function () { return x.bandwidth() / 6; })
    //         .attr("y1", function (d) { return y(d.lci); }) 
    //         .attr("x2", function () { return x.bandwidth() / 6; }) 
    //         .attr("y2", function (d) { return y(d.hci); });
    //     //confidence indicator linecaps
    //     var linecapHalfWidth = 5; 
    //     var linecap_top = bar.append("line")
    //         .attr("class", "linecap_top")
    //         .data(confidenceIndicators)
    //         .attr("x1", function () { return x.bandwidth() / 6 - linecapHalfWidth; })
    //         .attr("y1", function (d) { return y(d.hci); })
    //         .attr("x2", function () { return x.bandwidth() / 6 + linecapHalfWidth; })
    //         .attr("y2", function (d) { return y(d.hci); });
    //     var linecap_bottom = bar.append("line")
    //         .attr("class", "linecap_top")
    //         .data(confidenceIndicators)
    //         .attr("x1", function () { return x.bandwidth() / 6 - linecapHalfWidth; })
    //         .attr("y1", function (d) { return y(d.lci); })
    //         .attr("x2", function () { return x.bandwidth() / 6 + linecapHalfWidth; })
    //         .attr("y2", function (d) { return y(d.lci); });

    //     //axes labels
    //     var yAxisMidpoint = (height + margin.top)/2 + margin.top;    
    //     var paddingLeft = 14;         
    //     var yAxisLabel = chart.append("text")
    //         .attr("class", "label")
    //         .attr("id", "y_axis_label")
    //         .text(yAxisTitle)
    //         .attr("transform", "translate(" + paddingLeft + ", " + yAxisMidpoint + ")rotate(-90)")                
    //         .attr("text-anchor", "middle");         

    //     //axes
    //     var xAxis = chart.append("g")
    //         .attr("class", "axis")             
    //         .attr("transform", "translate(" + margin.left + ", " + spaceFromTop + ")")
    //         .call(d3.axisBottom(x))
    //         .selectAll("text")
    //         .style("text-anchor", "end")
    //         .attr("dx", "-.8em")
    //         .attr("dy", ".15em")
    //         .attr("transform", "rotate(-45)");
    //     var yAxis = chart.append("g")
    //         .attr("class", "axis")
    //         .attr("transform", "translate(" + margin.left + ", " + margin.top + ")")
    //         .call(d3.axisLeft(y))
    //         .select(".domain").remove(); //remove y-axis line

    //     //legend 
    //     var legend = chart.append("g") //create & position legend area
    //         .attr("class", "legend")
    //         .attr("transform", "translate(" + halfTotalWidth + ", " + chartBottomBufferLegend + ")");
    //     var legendEntry =  legend.selectAll("g") //groupings do not exist yet
    //         .data(legendCategoryNames) //count data
    //         .enter() //run methods once per data count
    //         .append("g") //produces new groupings
    //         .attr("height", legendColorKeyHeight); 
    //     var colorKey = legendEntry.append("rect")
    //         .attr("width", legendColorKeyWidth)
    //         .attr("height", legendColorKeyHeight)
    //         .attr("transform", function (d, i) {
    //             let legendItemYPosition = legendItemHeight*i;
    //             return "translate(0, " + legendItemYPosition + ")";
    //         })
    //         .style("fill", function (d, i) {
    //             return barColors[i];
    //         });
    //     var label = legendEntry.append("text")
    //         .text(function (d) { return d; }) 
    //         //.attr("height", legendColorKeyHeight)
    //         .attr("transform", function (d, i) {
    //             let legendItemYPosition = legendItemHeight*i;
    //             let paddingLeft = legendColorKeyWidth*2; 
    //             return "translate(" + paddingLeft + ", " + legendItemYPosition + ")";
    //     });
    // }

    function makeChartMultiBar () {
        var chart = d3.select(".chart") 
        // .attr("height", "700") //refactor for compatibility with ie
        .attr("viewBox", function () {
            return "0 0 700 700";
        })
        .attr("preserveAspectRatio", "xMinYMin meet");

        //create bar grouping
        var responseGrouping = chart.selectAll("g"); 

        // add the Y gridlines
        chart.append("g")			
            .attr("class", "grid")
            .call(make_y_gridlines()
                .tickSize(-width) //full graph width
                .tickFormat("")
            )
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");    

        //scale 
        var xResponseGrouping = d3.scaleBand()
            .domain(xAxisCategoryNames) 
            .rangeRound([0, width]) //total width 
            .padding(0);
        var xResponseGroupingWidth = xResponseGrouping.bandwidth(); 
        console.log("xResponseGroupingWidth: ", xResponseGroupingWidth);

        // calculate # of response areas and # of bars within each
        responseGrouping = responseGrouping.data(xAxisCategoryNames) // makes 1 grouping per response
            .enter()
            .append("g")
            .attr("class", "response_grouping")
            .attr("transform", function (d) { 
                var bandwidth = xResponseGrouping.bandwidth(); 
                var spaceLeft = xResponseGrouping.bandwidth() + xResponseGrouping(d);
                return "translate(" + spaceLeft + ", " + margin.top + ")";  
            }); 
        
        // barMultiDisplay shows rect, line, etc. 
        var barMultiDisplay = responseGrouping.selectAll("g"); 
        
        //scale
        // var xBandwidth = x.bandwidth(); 
        // console.log("xBandwidth: ", xBandwidth);

        // var xResponseBand = d3.scaleBand()
        //     .domain(legendCategoryNames) //2 items
        //     .rangeRound([0, xBandwidth]); //total width of response band (188)
            // .padding(0.1);

        // barMultiDisplay = barMultiDisplay.data(legendCategoryNames) // count 2 data items to display
        //     .enter()
        //     .append("g")
        //     .attr("class", "bar_multi_display")
        //     .attr("transform", function (d) {
        //         var bandwidth = xResponseBand.bandwidth(); 
        //         var spaceLeft = xResponseBand.bandwidth() + xResponseBand(d); 
        //         console.log("bar spacing: ", spaceLeft);
        //         return "translate(" + spaceLeft + ", " + margin.top + ")"; 
        //     }); // accurate? 

        
    
        // bar.append("rect")
        //     .data(barDataValues)
        //     .attr("y", function (d) { return y(d); }) //y coordinate
        //     .attr("height", function (d) { return height - y(d); }) //height
        //     .attr("width", function (d, i) { return x.bandwidth() / 3; })
        //     .style("fill", barColors[0]) //hard-coded first color in array
        //     .data(tooltipDisplay)
        //     .on("mouseover", function (d, i) {
        //         div.transition()
        //             .duration(200)
        //             .style("opacity", .9);
        //         div.html(`
        //             <h3>${d.title}</h3> 
        //             <h3>${d.dv}</h3>
        //             CI (${d.lci} - ${d.hci})
        //             <br />WN = ${d.wn}
        //         `)                  
        //             .style("left", (d3.event.pageX - 70) + "px")
        //             .style("top", (d3.event.pageY - 90) + "px");
        //     })
        //     .on("mouseout", function (d) {
        //         div.transition()
        //             .duration(500)
        //             .style("opacity", 0);
        //     }); 

        //confidence indicator line
        // var line = bar.append("line")
        //     .attr("class", "confidence_indicator")
        //     .data(confidenceIndicators)
        //     .attr("x1", function () { return x.bandwidth() / 6; })
        //     .attr("y1", function (d) { return y(d.lci); }) 
        //     .attr("x2", function () { return x.bandwidth() / 6; }) 
        //     .attr("y2", function (d) { return y(d.hci); });
        //confidence indicator linecaps
        // var linecapHalfWidth = 5; 
        // var linecap_top = bar.append("line")
        //     .attr("class", "linecap_top")
        //     .data(confidenceIndicators)
        //     .attr("x1", function () { return x.bandwidth() / 6 - linecapHalfWidth; })
        //     .attr("y1", function (d) { return y(d.hci); })
        //     .attr("x2", function () { return x.bandwidth() / 6 + linecapHalfWidth; })
        //     .attr("y2", function (d) { return y(d.hci); });
        // var linecap_bottom = bar.append("line")
        //     .attr("class", "linecap_top")
        //     .data(confidenceIndicators)
        //     .attr("x1", function () { return x.bandwidth() / 6 - linecapHalfWidth; })
        //     .attr("y1", function (d) { return y(d.lci); })
        //     .attr("x2", function () { return x.bandwidth() / 6 + linecapHalfWidth; })
        //     .attr("y2", function (d) { return y(d.lci); });

        //axes labels
        // var yAxisMidpoint = (height + margin.top)/2 + margin.top;    
        // var paddingLeft = 14;         
        // var yAxisLabel = chart.append("text")
        //     .attr("class", "label")
        //     .attr("id", "y_axis_label")
        //     .text(yAxisTitle)
        //     .attr("transform", "translate(" + paddingLeft + ", " + yAxisMidpoint + ")rotate(-90)")                
        //     .attr("text-anchor", "middle");         

        //axes
        // var xAxis = chart.append("g")
        //     .attr("class", "axis")             
        //     .attr("transform", "translate(" + margin.left + ", " + spaceFromTop + ")")
        //     .call(d3.axisBottom(x))
        //     .selectAll("text")
        //     .style("text-anchor", "end")
        //     .attr("dx", "-.8em")
        //     .attr("dy", ".15em")
        //     .attr("transform", "rotate(-45)");
        // var yAxis = chart.append("g")
        //     .attr("class", "axis")
        //     .attr("transform", "translate(" + margin.left + ", " + margin.top + ")")
        //     .call(d3.axisLeft(y))
        //     .select(".domain").remove(); //remove y-axis line

        //legend 
        // var legend = chart.append("g") //create & position legend area
        //     .attr("class", "legend")
        //     .attr("transform", "translate(" + halfTotalWidth + ", " + chartBottomBufferLegend + ")");
        // var legendEntry =  legend.selectAll("g") //groupings do not exist yet
        //     .data(legendCategoryNames) //count data
        //     .enter() //run methods once per data count
        //     .append("g") //produces new groupings
        //     .attr("height", legendColorKeyHeight); 
        // var colorKey = legendEntry.append("rect")
        //     .attr("width", legendColorKeyWidth)
        //     .attr("height", legendColorKeyHeight)
        //     .attr("transform", function (d, i) {
        //         let legendItemYPosition = legendItemHeight*i;
        //         return "translate(0, " + legendItemYPosition + ")";
        //     })
        //     .style("fill", function (d, i) {
        //         return barColors[i];
        //     });
        // var label = legendEntry.append("text")
        //     .text(function (d) { return d; }) 
        //     //.attr("height", legendColorKeyHeight)
        //     .attr("transform", function (d, i) {
        //         let legendItemYPosition = legendItemHeight*i;
        //         let paddingLeft = legendColorKeyWidth*2; 
        //         return "translate(" + paddingLeft + ", " + legendItemYPosition + ")";
        // });
    }
} 
