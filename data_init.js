// load data
let data_1 = new Promise(function(resolve, reject){
	d3.json("./resp_1.json", function(data) {
		resolve(data)
	})
})

//load lookup
var lookup = new Promise(function(resolve, reject){
	d3.json("./lookup.json", function(data) {
		resolve(data)
	})
})

//configuration object
var chartConfigObject = {  
    "xAxisColumn":"rs", 
    "xAxisType":"Response", 
    "legendColumn":"s1", 
    "legendType":"Stratification", 
    "legendTitleStr":"", 
    "displayTrendChart":false, 
    "colorsArrStr":[  
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
    "yAxisTitle":"Age-adjusted Prevalence (%)", 
    "decimalPlaces":1,
    "confidenceIntervalLabel":"95% CI" 
}

Promise.all([data_1, lookup]).then(function (data) {
    var jsonData = data[0]; 
    var lookup = data[1]; 
    makeChart(chartConfigObject, jsonData, lookup); 
});
