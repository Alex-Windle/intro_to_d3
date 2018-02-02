// load data
let data_1 = new Promise(function (resolve, reject) {
	d3.json("./resp_1.json", function (data) {
		resolve(data)
	})
})

let data_2 = new Promise(function (resolve, reject) {
	d3.json("./resp_2.json", function (data) {
		resolve(data)
	})
})

let data_3 = new Promise(function (resolve, reject ){
    d3.json("./resp_3.json", function (data) {
        resolve(data)
    })
})

let data_4 = new Promise(function (resolve, reject) {
	d3.json("./resp_4.json", function (data) {
		resolve(data)
	})
})

let data_5 = new Promise(function (resolve, reject) {
	d3.json("./resp_5.json", function (data) {
		resolve(data)
	})
})

//load lookup
var lookup = new Promise(function (resolve, reject) {
	d3.json("./lookup.json", function (data) {
		resolve(data)
	})
})

//configuration object - resp_1.json
// var chartConfigObject = {  
//     "xAxisColumn":"rs", 
//     "xAxisType":"Response", 
//     "legendColumn":"s1", 
//     "legendType":"Stratification", 
//     "legendTitleStr":"", 
//     "displayTrendChart":false, 
//     "colorsArrStr":[  
//         "#377eb8",
//         "#e41a1c",
//         "#4daf4a",
//         "#984ea3",
//         "#ff7f00",
//         "#a65628",
//         "#f781bf",
//         "#CAB2D6",
//         "#FF7F00",
//         "#FDBF6F",
//         "#FFFF99"
//     ],
//     "yAxisTitle":"Age-adjusted Prevalence (%)", 
//     "decimalPlaces":1,
//     "confidenceIntervalLabel":"95% CI" 
// }

//configuration object - resp_2.json
// var chartConfigObject = {  
//     "xAxisColumn":"yr",
//     "xAxisType":"Year",
//     "legendColumn":"s1",
//     "legendType":"Stratification",
//     "legendTitleStr":"Age Group",
//     "displayTrendChart":true,
//     "colorsArrStr":[  
//        "#377eb8",
//        "#e41a1c",
//        "#4daf4a",
//        "#984ea3",
//        "#ff7f00",
//        "#a65628",
//        "#f781bf",
//        "#CAB2D6",
//        "#FF7F00",
//        "#FDBF6F",
//        "#FFFF99"
//     ],
//     "yAxisTitle":"Age-adjusted Prevalence (%)",
//     "decimalPlaces":1,
//     "confidenceIntervalLabel":"95% CI"
//  }

//configuration object - resp_3.json
var chartConfigObject = {  
    "xAxisColumn":"s1", //3 age ranges
    "xAxisType":"Stratification",
    "legendColumn":"s2", // DISABL, NODIS
    "legendType":"Stratification",
    "legendTitleStr":"Disability Status",
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

//configuration object - resp_4.json
// var chartConfigObject = {  
//     "xAxisColumn":"rs",
//     "xAxisType":"Response",
//     "legendColumn":"s2",
//     "legendType":"Stratification",
//     "legendTitleStr":"Disability Status",
//     "displayTrendChart":false,
//     "colorsArrStr":[  
//        "#377eb8",
//        "#e41a1c",
//        "#4daf4a",
//        "#984ea3",
//        "#ff7f00",
//        "#a65628",
//        "#f781bf",
//        "#CAB2D6",
//        "#FF7F00",
//        "#FDBF6F",
//        "#FFFF99"
//     ],
//     "yAxisTitle":"Age-adjusted Prevalence (%)",
//     "decimalPlaces":1,
//     "confidenceIntervalLabel":"95% CI"
//  }

//configuration object - resp_5.json
// var chartConfigObject = {  
//     "xAxisColumn":"yr",
//     "xAxisType":"Year",
//     "legendColumn":"s1",
//     "legendType":"Stratification",
//     "legendTitleStr":"Age Group",
//     "displayTrendChart":false,
//     "colorsArrStr":[  
//        "#377eb8",
//        "#e41a1c",
//        "#4daf4a",
//        "#984ea3",
//        "#ff7f00",
//        "#a65628",
//        "#f781bf",
//        "#CAB2D6",
//        "#FF7F00",
//        "#FDBF6F",
//        "#FFFF99"
//     ],
//     "yAxisTitle":"Age-adjusted Prevalence (%)",
//     "decimalPlaces":1,
//     "confidenceIntervalLabel":"95% CI"
//  }

Promise.all([data_1, data_2, data_3, data_4, data_5, lookup]).then(function (data) {
    // *only turn on 1 jsonData at a time*
    // var jsonData = data[0]; 
    // var jsonData = data[1]; 
    var jsonData = data[2]; 
    // var jsonData = data[3]; 
    // var jsonData = data[4]; 
    var lookup = data[5]; 
    makeChart(chartConfigObject, jsonData, lookup); 
});
