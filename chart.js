function makeChart (chartConfigObject, jsonData, lookup) {
            //set chart data variables
            let totalBars = jsonData.length; //total number of bars to display
            let barColors = chartConfigObject.colorsArrStr;
            let barDataValues = []; 
            let xAxisCategoryNames = []; 
            let confidenceIndicators = []; 
            let yAxisTitle = chartConfigObject.yAxisTitle; 
            let legendTitle = chartConfigObject.legendTitleStr;
            let legendCategoryNames = [];
            let confidenceIntervalLabel = chartConfigObject.confidenceIntervalLabel; 
            let decimalPlaces = chartConfigObject.decimalPlaces;  //sets decimals to display
            let displayTrendChart = chartConfigObject.displayTrendChart; //true or false
            // console.log("totalBars" , totalBars);
            // console.log("barDataValues" , barDataValues);
            // console.log("decimalPlaces" , decimalPlaces);
            // console.log("confidenceIntervalLabel" , confidenceIntervalLabel);
            // console.log("displayTrendChart" , displayTrendChart);
            // console.log("legendTitle" , legendTitle);
            
            //process chart data variables
            let xAxisColumn = chartConfigObject.xAxisColumn; //get type
            let xAxisType = chartConfigObject.xAxisType; //get type
            let xAxisCategoryDataCodes = []; //data codes (map to titles)
            let legendColumn = chartConfigObject.legendColumn; 
            let legendType = chartConfigObject.legendType; 
            let legendCategoryDataCodes = []; 
            // console.log("xAxisColumn", xAxisColumn);
            // console.log("xAxisCategoryDataCodes", xAxisCategoryDataCodes);
            // console.log("legendColumn", legendColumn);
            // console.log("legendType", legendType);

            //TODO
            var wns = []; 
            var legendColorKeyWidth = 20;
            var legendColorKeyHeight = 20;
            var tooltipDisplay = []; //data displays in tooltip

            // function get_Wn_FromLku (obj) {
            //     var wn = obj.wn; 
            //     wns.push(wn);
            //     return;
            // }; 

            // function getLegendKey_S1_FromLku (obj) {
            //     var strat = obj.s1; 
            //     var lku = lookUpObject.Stratification; 
            //     var legendTitle = lku[strat].name;
            //     if (legendKeys.indexOf(legendTitle) > -1) { 
            //         return;
            //     } else {
            //         legendKeys.push(legendTitle);
            //         return;
            //     }
            // }; 

            // function make_tooltip_display (obj) {   
            //     var rs = obj.rs; 
            //     var lku = lookUpObject.Response;  
            //     tooltipDisplay.push({
            //         title: lku[rs].name,
            //         dv: obj.dv,
            //         lci: obj.lci, 
            //         hci: obj.hci,
            //         wn: obj.wn
            //     });
            //     return;
            // }

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
                
                // get_Wn_FromLku(obj);  
                // getLegendKey_S1_FromLku (obj); 
                // make_tooltip_display(obj);
                return;
            });

            //map codes to category names
            xAxisCategoryDataCodes.forEach(function (code) {
                let lku = lookup[xAxisType]; 
                for (key in lku) {
                    if (code === key) {
                        const name = lku[code].name;
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
            // console.log("xAxisCategoryNames", xAxisCategoryNames);
            // console.log("confidenceIndicators", confidenceIndicators);
            // console.log("legendCategoryNames", legendCategoryNames);

            //svg chart variables
            var margin = {top: 30, right: 0, bottom: 220, left: 50};
            var width = 700 - margin.left - margin.right;
            var height = 700 - margin.top - margin.bottom;
            var spaceFromTop = height + margin.top; 
            var totalWidth = width + margin.left + margin.right; 
            var totalHeight = height + margin.top + margin.bottom;
            var CHART_TOP_BUFFER_VALUE = 15; //verify this value with team

            //tool tip
            // var div = d3.select("body").append("div")
            //     .attr("class", "tooltip")
            //     .style("opacity", 0);

            //scale
            var x = d3.scaleBand()
                .domain(xAxisCategoryNames) 
                .rangeRound([0, width]) //total width 
                .padding(0.1);
            var y = d3.scaleLinear()
                //set value scaling with buffer
                .domain([0, d3.max(barDataValues) + CHART_TOP_BUFFER_VALUE])
                .range([height, 0]);
            
            //gridlines in y axis 
            function make_y_gridlines() {
                return d3.axisLeft(y)
            }

            //chart
            var chart = d3.select(".chart") 
                // .attr("height", "700") //refactor for compatibility with ie
                .attr("viewBox", function () {
                    return "0 0 700 700";
                })
                .attr("preserveAspectRatio", "xMinYMin meet")
                .style("border", "0.5px dotted black");

            //create bar grouping
            var bar = chart.selectAll("g"); 

            // add the Y gridlines
            chart.append("g")			
                .attr("class", "grid")
                .call(make_y_gridlines()
                    .tickSize(-width) //full graph width
                    .tickFormat("")
                )
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");    
 
            //bars
            bar = bar.data(xAxisCategoryNames)
                .enter()
                .append("g") 
                .attr("transform", function (d) { 
                    var bandwidth = x.bandwidth(); 
                    var spaceLeft = x.bandwidth() + x(d);
                    return "translate(" + spaceLeft + ", " + margin.top + ")";  
                }); 
            bar.append("rect")
                .data(barDataValues)
                .attr("y", function (d) { return y(d); }) //y coordinate
                .attr("height", function (d) { return height - y(d); }) //height
                .attr("width", function (d, i) { return x.bandwidth() / 3; })
                .style("fill", barColors[0]); //hard-coded first color in array
                
                // .data(tooltipDisplay)
                // .on("mouseover", function (d, i) {
                //     div.transition()
                //         .duration(200)
                //         .style("opacity", .9);
                //     div.html(`
                //         <h3>${d.title}</h3> 
                //         <h3>${d.dv}</h3>
                //         CI (${d.lci} - ${d.hci})
                //         <br />WN = ${d.wn}
                //     `)                  
                //         .style("left", (d3.event.pageX - 70) + "px")
                //         .style("top", (d3.event.pageY - 90) + "px");
                // })
                // .on("mouseout", function (d) {
                //     div.transition()
                //         .duration(500)
                //         .style("opacity", 0);
                // }); 

            //confidence indicator line
            var line = bar.append("line")
                .attr("class", "confidence_indicator")
                .data(confidenceIndicators)
                .attr("x1", function () { return x.bandwidth() / 6; })
                .attr("y1", function (d) { return y(d.lci); }) 
                .attr("x2", function () { return x.bandwidth() / 6; }) 
                .attr("y2", function (d) { return y(d.hci); });

            //confidence indicator linecaps
            var linecapHalfWidth = 5; 
            var linecap_top = bar.append("line")
                .attr("class", "linecap_top")
                .data(confidenceIndicators)
                .attr("x1", function () { return x.bandwidth() / 6 - linecapHalfWidth; })
                .attr("y1", function (d) { return y(d.hci); })
                .attr("x2", function () { return x.bandwidth() / 6 + linecapHalfWidth; })
                .attr("y2", function (d) { return y(d.hci); });
            var linecap_bottom = bar.append("line")
                .attr("class", "linecap_top")
                .data(confidenceIndicators)
                .attr("x1", function () { return x.bandwidth() / 6 - linecapHalfWidth; })
                .attr("y1", function (d) { return y(d.lci); })
                .attr("x2", function () { return x.bandwidth() / 6 + linecapHalfWidth; })
                .attr("y2", function (d) { return y(d.lci); });

            //axes labels
            var yAxisMidpoint = (height + margin.top)/2 + margin.top;    
            var paddingLeft = 14;         
            var yAxisLabel = chart.append("text")
                .attr("class", "label")
                .attr("id", "y_axis_label")
                .text(yAxisTitle)
                .attr("transform", "translate(" + paddingLeft + ", " + yAxisMidpoint + ")rotate(-90)")                
                .attr("text-anchor", "middle");         
            
            //axes
            var xAxis = chart.append("g")
                .attr("class", "axis")             
                .attr("transform", "translate(" + margin.left + ", " + spaceFromTop + ")")
                .call(d3.axisBottom(x))
                .selectAll("text")
                .style("text-anchor", "end")
                .attr("dx", "-.8em")
                .attr("dy", ".15em")
                .attr("transform", "rotate(-45)");
            var yAxis = chart.append("g")
                .attr("class", "axis")
                .attr("transform", "translate(" + margin.left + ", " + margin.top + ")")
                .call(d3.axisLeft(y))
                .select(".domain").remove(); //remove y-axis line

            //legend 
            var legend = chart.append("g")
                .attr("class", "legend")
            legend.append("rect")
                .attr("x", width / 2 - legendColorKeyWidth)
                .attr("y", height + margin.bottom)
                .attr("width", legendColorKeyWidth)
                .attr("height", legendColorKeyHeight)
                .style("fill", barColors[0]); //hard-coded first color in array
            legend.append("text")
                .data(legendCategoryNames)
                .attr("x", width / 2 + 10) //refactor
                .attr("y", height + margin.bottom + 13)
                .text(function (d) { return d; });
} 
