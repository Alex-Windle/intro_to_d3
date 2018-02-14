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

let data_6 = new Promise(function (resolve, reject) {
	d3.json("./resp_6.json", function (data) {
		resolve(data)
	})
})

let data_7 = new Promise(function (resolve, reject) {
	d3.json("./resp_7.json", function (data) {
		resolve(data)
	})
})

let data_8 = new Promise(function (resolve, reject) {
	d3.json("./resp_8.json", function (data) {
		resolve(data)
	})
})

//load lookup
var lookup = new Promise(function (resolve, reject) {
	d3.json("./lookup.json", function (data) {
		resolve(data)
	})
})

// TEST FOR SINGLE BAR CHART (1 BAR RENDERS PER RESPONSE GROUPING)
// configuration object - resp_1.json
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
//     "confidenceIntervalLabel":"95% CI",
//     "chartDivId": "chartDiv"
// }

// TEST FOR GROUPED BAR CHART (3 BARS RENDER PER EACH OF 3 RESPONSE GROUPINGS)
// TEST FOR HTML CHART DESCRIPTION, TITLE, SUFFIX VALUE
// configuration object - resp_2.json
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
//     "confidenceIntervalLabel":"95% CI",
//     "chartDivId": "chartDiv",
//     "chartDesc": "This is a test chart description.",
//     "chartTitle": "This is a test chart title",
//     "dataValueSuffix": "%"
//  }

// TEST FOR GROUPED BAR CHART (2 BARS RENDER PER EACH OF 3 RESPONSE GROUPINGS)
// configuration object - resp_3.json
// var chartConfigObject = {  
//     "xAxisColumn":"s1", //3 age ranges OK
//     "xAxisType":"Stratification",
//     "legendColumn":"s2", // DISABL, NODIS
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
//     "confidenceIntervalLabel":"95% CI",
//     "chartDivId": "chartDiv"
//  }

// TEST FOR GROUPED BAR CHART (2 BARS RENDER FOR 1 RESPONSE GROUPING)
// configuration object - resp_4.json
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
//     "confidenceIntervalLabel":"95% CI",
//     "chartDivId": "chartDiv"
//  }

// TEST FOR GROUPED BAR CHART (3 BARS RENDER PER EACH OF 2 RESPONSE GROUPINGS)
// configuration object - resp_5.json
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
//     "confidenceIntervalLabel":"95% CI",
//     "chartDivId": "chartDiv"
//  }

// TEST FOR MISSING OR NULL DATA VALUES
// configuration object - resp_6.json
// var chartConfigObject = {  
//     "xAxisColumn":"s1",
//     "xAxisType":"Stratification",
//     "legendColumn":"s2",
//     "legendType":"Stratification",
//     "legendTitleStr":"Race/Ethnicity",
//     "displayTrendChart":false,
//     "chartDivId": "chartDiv",
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
//     "yAxisTitle":"Crude Prevalence (%)",
//     "decimalPlaces":1,
//     "sampleSizeLabel":"Weighted No.",
//     "dataValuePrefix":"",
//     "dataValueSuffix":"%",
//     "chartTitle508":"chart 508 title goes here",
//     "chartDesc508":"chart 508 desc goes here"
//  };

// TEST FOR SORTING RESPONSES IN ASCENDING ORDER
// Replicate on the dev site: California > Health Risks & Behav > Tested for HIV > 2016 > Race/Ethnicity ALL > Disability Status ALL > Response YES
// configuration object - resp_7.json
// var chartConfigObject = {  
//     "xAxisColumn":"s1",
//     "xAxisType":"Stratification",
//     "legendColumn":"s2",
//     "legendType":"Stratification",
//     "legendTitleStr":"Disability Status",
//     "displayTrendChart":false,
//     "chartDivId":"chartDiv",
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
//     "sampleSizeLabel":"Weighted No.",
//     "dataValuePrefix":"",
//     "dataValueSuffix":"%",
//     "chartTitle508":"chart 508 title goes here",
//     "chartDesc508":"chart 508 desc goes here"
//  }; 

// TEST FOR SORTING LEGEND COLUMN IN ASCENDING ORDER
// Replicate on the dev site: California > Prev & Screen > Mammogram past 2 yr > All yrs > Race/Ethnicity ALL > Disability Status ANY DIS > Response YES
// configuration object - resp_8.json
// var chartConfigObject = {  
//     "xAxisColumn":"yr",
//     "xAxisType":"Year",
//     "legendColumn":"s2",
//     "legendType":"Stratification",
//     "legendTitleStr":"Race/Ethnicity",
//     "displayTrendChart":true,
//     "chartDivId":"chartDiv",
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
//     "yAxisTitle":"Crude Prevalence (%)",
//     "decimalPlaces":1,
//     "sampleSizeLabel":"Weighted No.",
//     "dataValuePrefix":"",
//     "dataValueSuffix":"%",
//     "chartTitle508":"chart 508 title goes here",
//     "chartDesc508":"chart 508 desc goes here"
//  }

// TREND CHART
// configuration object - resp_9.json
var chartConfigObject = {  
    "xAxisColumn":"yr",
    "xAxisType":"Year",
    "legendColumn":"rs",
    "legendType":"Response",
    "legendTitleStr":"Response",
    "displayTrendChart":true,
    "chartDivId":"chartDiv",
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
    "sampleSizeLabel":"Weighted No.",
    "dataValuePrefix":"",
    "dataValueSuffix":"%",
    "chartTitle508":"chart 508 title goes here",
    "chartDesc508":"chart 508 desc goes here"
 }

Promise.all([data_1, data_2, data_3, data_4, data_5, data_6, data_7, data_8, lookup]).then(function (data) {
    // *only turn on 1 jsonData at a time*
    // var jsonData = data[0]; // TEST FOR SINGLE BAR CHART (1 BAR RENDERS PER EACH OF MULTIPLE RESPONSE GROUPINGS)
    // var jsonData = data[1]; // TEST FOR GROUPED BAR CHART (3 BARS RENDER PER EACH OF 3 RESPONSE GROUPINGS)
    // var jsonData = data[2]; // TEST FOR GROUPED BAR CHART (2 BARS RENDER PER EACH OF 3 RESPONSE GROUPINGS)
    // var jsonData = data[3]; // TEST FOR GROUPED BAR CHART (2 BARS RENDER FOR 1 RESPONSE GROUPING) 
    // var jsonData = data[4]; // TEST FOR GROUPED BAR CHART (3 BARS RENDER PER EACH OF 2 RESPONSE GROUPINGS)
    var jsonData = data[5]; // TEST FOR MISSING OR NULL DATA VALUES
    // var jsonData = data[6]; // TEST FOR SORTING RESPONSES IN ASCENDING ORDER
    // var jsonData = data[7]; // TEST FOR SORTING LEGEND COLUMN IN ASCENDING ORDER
    var lookup = data[8]; 
    makeChart(chartConfigObject, jsonData, lookup); 
});
