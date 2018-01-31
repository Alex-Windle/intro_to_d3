//configuration object
var chartConfigObject = {  
    "xAxisColumn":"rs", //code (translate to semantic English w/ lookup)
    "xAxisType":"Response", //lookup 
    "legendColumn":"s1", //code (translate to semantic English w/ lookup)
    "legendType":"Stratification", //lookup 
    "legendTitleStr":"", //if empty, do what? 
    "displayTrendChart":false, //line chart?
    "colorsArrStr":[  //pass to chart
        "#377eb8",
        "#e41a1c",
        "#4daf4a",
        "#984ea3",
        "#ff7f00",
        "#a65628",
        "#f781bf",
        "#CAB2D6",
        "#FF7F00",
        "#FDBF6F",
        "#FFFF99"
    ],
    "yAxisTitle":"Age-adjusted Prevalence (%)", //pass to chart
    "decimalPlaces":1,
    "confidenceIntervalLabel":"95% CI" //pass to chart
}

makeChart(chartConfigObject); //call chart function 
