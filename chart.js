function makeChart(chartConfigObject, jsonData, lookup) {
  // 508 compliance
  const { chartDesc } = chartConfigObject;
  const { chartTitle } = chartConfigObject;

  // chart variables
  const barColors = chartConfigObject.colorsArrStr;
  const barDataValues = []; // ordered by json order
  const xAxisCategoryNames = [];
  const { yAxisTitle } = chartConfigObject;
  const legendTitle = chartConfigObject.legendTitleStr;
  const legendCategoryNames = [];
  let legendEntryCount = [];
  const confidenceIndicators = [];
  const { decimalPlaces } = chartConfigObject;
  const tooltipDisplay = [];
  const { chartDivId } = chartConfigObject;
  const { dataValueSuffix } = chartConfigObject;

  // data used to process chart variables
  const { xAxisColumn } = chartConfigObject;
  const { xAxisType } = chartConfigObject;
  const xAxisCategoryDataCodes = [];
  const { legendColumn } = chartConfigObject;
  const { legendType } = chartConfigObject;

  // clear previous chart
  d3.selectAll(`#${chartDivId} > *`).remove();

  // add canvas element
  // d3.select(`#${chartDivId}`).append('canvas').attr('width', 700).attr('height', 700);

  const sortedJsonData = jsonData.sort((a, b) => { // sort data (x-axis responses display by ascending sort number)
    const sortColA = a[xAxisColumn];
    const sortColB = b[xAxisColumn];
    if (lookup[xAxisType][sortColA].sort < lookup[xAxisType][sortColB].sort) { return -1; }
    if (lookup[xAxisType][sortColB].sort < lookup[xAxisType][sortColA].sort) { return 1; }
    return 0;
  });

  sortedJsonData.forEach((obj, i) => { // process data
    if (xAxisCategoryDataCodes.indexOf(obj[xAxisColumn]) < 0) { // save data codes. then, map titles.
      xAxisCategoryDataCodes.push(obj[xAxisColumn]);
    }
    const confidenceIndicator = { lci: obj.lci, hci: obj.hci };
    confidenceIndicators.push(confidenceIndicator);
    make_tooltip_display(obj, chartConfigObject);
  });

  // map codes to category names (sort order handled)
  xAxisCategoryDataCodes.forEach((code) => {
    const lku = lookup[xAxisType];
    for (const key in lku) {
      if (code === key) {
        const name = lku[code].name;
        if (xAxisCategoryNames.indexOf(name) < 0) { xAxisCategoryNames.push(name); }
      }
    }
  });

  // map codes to legend columns. handle sort.
  const legendColumnSortedJsonData = sortedJsonData.sort((a, b) => { // sort data (legend column responses display by ascending sort number)
    const sortColA = a[legendColumn];
    const sortColB = b[legendColumn];
    if (lookup[legendType][sortColA].sort < lookup[legendType][sortColB].sort) { return -1; }
    if (lookup[legendType][sortColB].sort < lookup[legendType][sortColA].sort) { return 1; }
    return 0;
  });

  legendColumnSortedJsonData.forEach((object) => { // UPDATED BAR DATA VALUES. DOES THIS POPULATE THE HOVER?
    let barDataValue = object.dv; // get data values
    if (barDataValue) {
      let arr = barDataValue.toString().split('');
      if (arr.indexOf('.') >= 0) { // check if num has a decimal
        barDataValue = Number(object.dv.toFixed(decimalPlaces));
        barDataValues.push(barDataValue);
      } else { // add decimal
        arr.push('.0');
        arr = arr.join('');
        barDataValue = Number(arr);
        barDataValues.push(barDataValue);
      }
    } else {
      barDataValue = 0;
      barDataValues.push(barDataValue);
    }

    const lku = lookup[legendType];
    const code = object[legendColumn];
    for (const key in lku) {
      if (code === key) {
        const name = lku[code].name;
        if (legendCategoryNames.indexOf(name) < 0) { // check array for existing str
          legendCategoryNames.push(name);
        }
      }
    }
  });

  legendEntryCount = legendCategoryNames.length;

  function make_tooltip_display(obj, chartConfigObject) {
    let hciNum,
      lciNum,
      valNum;
    const column = obj[xAxisColumn];
    const title = lookup[xAxisType][column].name;
    let wn = String(obj.wn);
    if (wn.length > 3 && wn.length < 7) {
      wn = wn.split('').reverse().join('');
      wn = `${wn.substring(0, 3)},${wn.substring(3)}`;
      wn = wn.split('').reverse().join('');
    } else if (wn.length > 6 && wn.length < 10) {
      wn = wn.split('').reverse().join('');
      wn = `${wn.substring(0, 3)},${wn.substring(3, 6)},${wn.substring(6)}`;
      wn = wn.split('').reverse().join('');
    }
    // handle decimals
    if (obj.hci >= 0) {
      let hciArr = obj.hci.toString().split('');
      switch (hciArr.indexOf('.') >= 0) { // hci
        case true:
          hciArr = hciArr.join('');
          hciNum = Number(hciArr);
          break;
        case false:
          hciArr = hciArr.join('');
          hciArr = Number(hciArr);
          hciNum = hciArr.toFixed(decimalPlaces);
          break;
        default:
          break;
      }
    }
    if (obj.lci >= 0) {
      let lciArr = obj.lci.toString().split('');
      switch (lciArr.indexOf('.') >= 0) { // lci
        case true:
          lciArr = lciArr.join('');
          lciNum = Number(lciArr);
          break;
        case false:
          lciArr = lciArr.join('');
          lciArr = Number(lciArr);
          lciNum = lciArr.toFixed(decimalPlaces);
          break;
        default:
          break;
      }
    }
    if (obj.dv >= 0) {
      let valArr = obj.dv.toString().split('');
      switch (valArr.indexOf('.') >= 0) { // val
        case true:
          valArr = valArr.join('');
          valNum = Number(valArr);
          break;
        case false:
          valArr = valArr.join('');
          valArr = Number(valArr);
          valNum = valArr.toFixed(decimalPlaces);
          break;
        default:
          break;
      }
    }
    tooltipDisplay.push({
      title,
      dv: valNum || obj.dv,
      dataValueSuffix: chartConfigObject.dataValueSuffix,
      lci: lciNum || obj.lci,
      hci: hciNum || obj.hci,
      sampleSizeLabel: chartConfigObject.sampleSizeLabel,
      wn,
    });
  }
  // svg chart variables
  const margin = {
    top: 30, right: 0, bottom: 220, left: 60,
  };
  const width = 700 - margin.left - margin.right;
  const height = 700 - margin.top - margin.bottom;
  const totalWidth = width + margin.left + margin.right;
  const halfTotalWidth = totalWidth / 2;
  const twoThirdsTotalWidth = totalWidth * 0.677;
  const totalHeight = height + margin.top + margin.bottom;
  const chartTopBufferDataValue = 10; // verify this value with team
  const chartBottomBufferLegend = totalHeight - margin.bottom + 100;
  const spaceFromTop = height + margin.top;
  const legendGroupingHeight = 22;
  const legendColorKeyWidth = 14;
  const legendColorKeyHeight = 14;
  const legendItemHeight = 20;

  // tool tip
  const tooltipDiv = d3.select(`#${chartDivId}`).append('div')
    .attr('class', 'tooltip')
    .style('opacity', 0);
  // scale
  const x = d3.scaleBand()
    .domain(xAxisCategoryNames)
    .range([0, width]); // total width
  const hciArray = confidenceIndicators.map(ind => ind.hci);
  const y = d3.scaleLinear()
    .domain([0, d3.max(hciArray) + chartTopBufferDataValue]) // set value scaling with buffer
    .range([height, 0]);
  // gridlines in y axis
  function make_y_gridlines() {
    return d3.axisLeft(y);
  }

  //*************************************************************************************************//

  function makeTrendChart() {
    let chart = d3.select(`#${chartDivId}`).append('svg').attr('class', 'chart'); // instantiate chart
    // 508 compliance
    d3.select(`#${chartDivId}`).append('desc').html(chartDesc);
    d3.select(`#${chartDivId}`).append('title').html(chartTitle);

    // data
    const dataGroup = d3.nest()
      .key(d => d[legendColumn])
      .entries(sortedJsonData); //sorts values by response

    for (var i = 0; i<dataGroup.length; i++) {
      dataGroup[i].values.sort(function (a,b) {
        if (a.yr < b.yr) { return -1; }
        if (a.yr > b.yr) { return 1; }
        return 0;
      })
    } //sorts values by year

    // scaling
    const radius = 4.9;
    const x3 = d3.scaleBand()
      .domain(xAxisCategoryNames)
      .range([-margin.left / 2, totalWidth + margin.left * 1.5]);
    const yMulti = d3.scaleLinear()
      .domain([0, d3.max(barDataValues) + chartTopBufferDataValue])
      .rangeRound([height, 0]);
    const colors = d3.scaleOrdinal(barColors)
      .domain(dataGroup.map(d => d.key));
    const makeLines = d3.line()
      .x((d, i) => {
        const column = d[xAxisColumn];
        const value = Number(lookup[xAxisType][column].name);
        if (xAxisCategoryNames.length == 4) { return (margin.left / 2 + margin.left / 5 + margin.left + x3(value)); }
        if (xAxisCategoryNames.length == 3) { return (margin.left / 2 + margin.left * 0.77 + margin.left + x3(value)); }
      })
      .y((d, i) => margin.top + yMulti(d.dv));
    function make_y_gridlines_multi() { return d3.axisLeft(yMulti); }
    function make_x_gridlines() { return d3.axisBottom(x3); }

    // set chart attributes
    chart
      .attr('height', 780);
      // .attr('width', 500);
      //.attr('viewBox', () => '0 0 700 780');
      //.attr('preserveAspectRatio', 'xMinYMin meet');

    // append first grouping (container for y gridlines, response groupings, axis, legend, etc)
    chart = chart.append('g');
    // resp grouping...
    const responseGrouping = chart.selectAll('g');
    // y gridlines (inserted for visual layering. refactor later as a sorted element)
    chart.append('g')
      .attr('class', 'grid')
      .call(make_y_gridlines_multi()
        .tickSize(-width), // full graph width
      )
      .attr('transform', `translate(${margin.left},${margin.top})`);
    // x gridlines
    chart.append('g')
      .attr('class', 'grid')
      .call(make_x_gridlines()
        .tickSize(-height))
      .attr('transform', () => { const xAxisHeight = height + margin.top; return `translate(0,${xAxisHeight + 15})`; });

    const response = chart.selectAll('.response')
      .data(dataGroup)
      .enter().append('g')
      .attr('class', 'response');

    // lines
    response.append('path')
      // .data(dataGroupByYr)
      .data(dataGroup)
      .attr('class', 'pathline')
      .attr('d', d => makeLines(d.values))
      .style('stroke', d => colors(d.key))
      .style('stroke-width', 2.3)
      .style('fill', 'none');;
    // circles
    response.selectAll('circle')
      .data(d => d.values)
      .enter().append('circle')
      .attr('r', radius)
      .attr('cx', (d) => {
        const column = d[xAxisColumn];
        const value = Number(lookup[xAxisType][column].name);
        if (xAxisCategoryNames.length == 4) { return (margin.left / 2 + margin.left / 5 + margin.left + x3(value)); } // FIX SCALING
        if (xAxisCategoryNames.length == 3) { return (margin.left / 2 + margin.left * 0.77 + margin.left + x3(value)); } // FIX SCALING
      })
      .attr('cy', d => margin.top + yMulti(d.dv))
      .on('mouseover', function (d,i) {
        //circle effects
        d3.select(this)
          .attr('r', radius * 1.5);
        //tooltip 
        let display;
        let title;
        function make_tooltip_display(d, xAxisColumn) {
          let hciNum,
          lciNum,
          valNum;
          const column = d[xAxisColumn];
          const title = lookup[xAxisType][column].name;
          let wn = String(d.wn);
          if (wn.length > 3 && wn.length < 7) {
            wn = wn.split('').reverse().join('');
            wn = `${wn.substring(0, 3)},${wn.substring(3)}`;
            wn = wn.split('').reverse().join('');
          } else if (wn.length > 6 && wn.length < 10) {
            wn = wn.split('').reverse().join('');
            wn = `${wn.substring(0, 3)},${wn.substring(3, 6)},${wn.substring(6)}`;
            wn = wn.split('').reverse().join('');
          }
          // handle decimals
          if (d.hci >= 0) {
            let hciArr = d.hci.toString().split('');
            switch (hciArr.indexOf('.') >= 0) { // hci
              case true:
                hciArr = hciArr.join('');
                hciArr = Number(hciArr);
                hciNum = hciArr.toFixed(decimalPlaces);
                break;
              case false:
                hciArr = hciArr.join('');
                hciArr = Number(hciArr);
                hciNum = hciArr.toFixed(decimalPlaces);
                break;
              default:
                break;
            }
          }
          if (d.lci >= 0) {
            let lciArr = d.lci.toString().split('');
            switch (lciArr.indexOf('.') >= 0) { // lci
              case true:
                lciArr = lciArr.join('');
                lciArr = Number(lciArr);
                lciNum = lciArr.toFixed(decimalPlaces);
                break;
              case false:
                lciArr = lciArr.join('');
                lciArr = Number(lciArr);
                lciNum = lciArr.toFixed(decimalPlaces);
                break;
              default:
                break;
            }
          }
          if (d.dv >= 0) {
            let valArr = d.dv.toString().split('');
            switch (valArr.indexOf('.') >= 0) { // val
              case true:
                valArr = valArr.join('');
                valArr = Number(valArr);
                valNum = valArr.toFixed(decimalPlaces); 
                break;
              case false:
                valArr = valArr.join('');
                valArr = Number(valArr);
                valNum = valArr.toFixed(decimalPlaces);
                break;
              default:
                break;
            }
          }
          display = {
            title: lookup[xAxisType][column].name,
            titleLegendColumn: lookup[legendType][d[legendColumn]].name,
            dv: valNum || d.dv,
            lci: lciNum || d.lci,
            hci: hciNum || d.hci,
            sampleSizeLabel: chartConfigObject.sampleSizeLabel,
            wn,
          };
        }
        make_tooltip_display(d, xAxisColumn);
        tooltipDiv.transition()
          .duration(200)
          .style('opacity', 0.9);
        tooltipDiv.html(`\n<strong>${display.title}</strong>\n<br /><strong>${display.titleLegendColumn}</strong>\n<br /><strong>${display.dv}${dataValueSuffix}</strong>\n<br />95% CI (${display.lci}-${display.hci})\n<br />${display.sampleSizeLabel}:${display.wn}\n`)
        // .style("left", (d3.event.pageX - 50 - this.clientLeft - window.pageXOffset) + "px") //chrome positioning
        // .style("left", (d3.event.pageX - 200 - this.clientLeft - window.pageXOffset) + "px") //ie positioning
          .style('left', `${d3.event.pageX - 75 - this.clientLeft - window.pageXOffset}px`) // compromise chrm/ie
          .style('top', `${d3.event.pageY - this.clientTop - window.pageYOffset}px`);
          // .style('top', `${d3.event.pageY - 350 - this.clientTop - window.pageYOffset}px`);

      })
      .on('mouseout', (d) => {
        //circle effects
        d3.selectAll('circle')
          .attr('r', radius);
        //tooltip 
        tooltipDiv.transition()
          .duration(500)
          .style('opacity', 0);
      });
    response.data(dataGroup)
      .style('fill', d => colors(d.key)); 
      
    // axes labels
    const yAxisMidpoint = (height + margin.top) / 2 + margin.top;
    const paddingLeft = 14;
    const yAxisLabel = chart.append('text')
      .attr('class', 'label')
      .attr('id', 'y_axis_label')
      .text(yAxisTitle)
      .attr('transform', `translate(${paddingLeft}, ${yAxisMidpoint})rotate(-90)`)
      .attr('text-anchor', 'middle');

    // legend
    const legend = chart.append('g') // create & position legend area
      .attr('class', 'legend')
      .attr('transform', `translate(${halfTotalWidth}, ${chartBottomBufferLegend})`);
    legend.append('text')
      .attr('class', 'legend_title')
      .attr('transform', () => { const yAlign = -10; return `translate(${0},${0})`; })
      .text(legendTitle);
    const legendGrouping = legend.selectAll('g'); // groupings do not exist yet
    legendGrouping.data(legendCategoryNames) // count data
      .enter() // run methods once per data count
      .append('g') // produces new groupings
      .append('line')
      .attr('x1', 0)
      .attr('y1', function (d, i) {
        const yAlign = legendGroupingHeight * i + 15;
        return `${yAlign + 7}`;
      })
      .attr('x2', 20)
      .attr('y2', function (d, i) {
        const yAlign = legendGroupingHeight * i + 15;
        return `${yAlign + 7}`;
      })
      .attr('stroke-width', 2.8)
      .attr('stroke', (d, i) => barColors[i]);
    legendGrouping.data(legendCategoryNames)
      .enter()
      .append('g')
      .append('circle')
      .attr('r', 4.9)
      .attr('transform', (d, i) => {
        const yAlign = legendGroupingHeight * i + 15; return `translate(10, ${yAlign + 7})`;
      })
      .style('fill', (d, i) => barColors[i]);
    legendGrouping
      .data(legendCategoryNames)
      .enter()
      .append('text')
      .text(d => d)
      .attr('transform', (d, i) => {
        const yAlign = (legendGroupingHeight * i) + (legendColorKeyHeight * 2);
        const paddingLeft = legendColorKeyWidth * 2;
        return `translate(${paddingLeft}, ${yAlign})`;
      });
  }

  //*************************************************************************************************//

  function makeChartSingleBar() {
    const chart = d3.select(`#${chartDivId}`).append('svg').attr('class', 'chart'); // instantiate chart
    chart.attr('viewBox', () => '0 0 700 700')
      .attr('preserveAspectRatio', 'xMinYMin meet');

    // 508 compliance
    d3.select(`#${chartDivId}`).append('desc').html(chartDesc);
    d3.select(`#${chartDivId}`).append('title').html(chartTitle);

    let bar = chart.selectAll('g'); // create bar grouping
    chart.append('g') // add the Y gridlines
      .attr('class', 'grid')
      .call(make_y_gridlines()
        .tickSize(-width) // full graph width
        .tickFormat(''))
      .attr('transform', `translate(${margin.left},${margin.top})`);
    bar = bar.data(xAxisCategoryNames)
      .enter()
      .append('g')
      .attr('transform', (d, i) => {
        const padding30Percent = x.bandwidth() / 3;
        const spaceLeft = margin.left + x.bandwidth() * i + padding30Percent / 2;
        return `translate(${spaceLeft}, ${margin.top})`;
      });
    bar.append('rect')
      .data(barDataValues)
      .attr('y', d => y(d)) // y coordinate
      .attr('height', d => height - y(d)) // height
      .attr('width', (d, i) => {
        const padding30Percent = x.bandwidth() / 3;
        return x.bandwidth() - padding30Percent;
      })
      .style('fill', barColors[0]) // hard-coded first color in array
      .style('opacity', '0.8')
      .data(tooltipDisplay)
      .on('mouseover', function (d, i) {
        tooltipDiv.transition()
          .duration(200)
          .style('opacity', 0.9);
        tooltipDiv.html(`\n<strong>${d.title}</strong>\n<br /><strong>${d.dv}${d.dataValueSuffix}</strong>\n<br /><strong>95% CI (${d.lci} - ${d.hci})</strong>\n<br />${d.sampleSizeLabel}:${d.wn}\n`)
        // .style("left", (d3.event.pageX - 50 - this.clientLeft - window.pageXOffset) + "px") //chrome positioning
        // .style("left", (d3.event.pageX - 200 - this.clientLeft - window.pageXOffset) + "px") //ie positioning
          .style('left', `${d3.event.pageX - 75 - this.clientLeft - window.pageXOffset}px`) // compromise chrm/ie
          .style('top', `${d3.event.pageY - 350 - this.clientTop - window.pageYOffset}px`);
      })
      .on('mouseout', (d) => {
        tooltipDiv.transition()
          .duration(500)
          .style('opacity', 0);
      });
    // confidence indicator line
    const line = bar.append('line')
      .attr('class', 'confidence_indicator')
      .data(confidenceIndicators)
      .attr('x1', (d, i) => {
        const padding30Percent = x.bandwidth() / 3;
        return padding30Percent;
      })
      .attr('y1', d => y(d.lci))
      .attr('x2', (d, i) => x.bandwidth() / 3)
      .attr('y2', d => y(d.hci));
    // confidence indicator linecaps
    const linecapHalfWidth = 5;
    const linecap_top = bar.append('line')
      .attr('class', 'linecap_top')
      .data(confidenceIndicators)
      .attr('x1', () => x.bandwidth() / 3 - linecapHalfWidth)
      .attr('y1', d => y(d.hci))
      .attr('x2', () => x.bandwidth() / 3 + linecapHalfWidth)
      .attr('y2', d => y(d.hci));
    const linecap_bottom = bar.append('line')
      .attr('class', 'linecap_top')
      .data(confidenceIndicators)
      .attr('x1', () => x.bandwidth() / 3 - linecapHalfWidth)
      .attr('y1', d => y(d.lci))
      .attr('x2', () => x.bandwidth() / 3 + linecapHalfWidth)
      .attr('y2', d => y(d.lci));
    // axes labels
    const yAxisMidpoint = (height + margin.top) / 2 + margin.top;
    const paddingLeft = 14;
    const yAxisLabel = chart.append('text')
      .attr('class', 'label')
      .attr('id', 'y_axis_label')
      .text(yAxisTitle)
      .attr('transform', `translate(${paddingLeft}, ${yAxisMidpoint})rotate(-90)`)
      .attr('text-anchor', 'middle');
    // axes
    const xAxis = chart.append('g')
      .attr('class', 'axis')
      .attr('transform', `translate(${margin.left}, ${spaceFromTop})`)
      .call(d3.axisBottom(x))
      .selectAll('text')
      .style('text-anchor', 'end')
      .attr('dx', '-.8em')
      .attr('dy', '.15em')
      .attr('transform', 'rotate(-45)');
    const yAxis = chart.append('g')
      .attr('class', 'axis')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)
      .call(d3.axisLeft(y))
      .select('.domain')
      .remove(); // remove y-axis line
    // legend
    const legend = chart.append('g') // create & position legend area
      .attr('class', 'legend')
      .attr('transform', `translate(${halfTotalWidth}, ${chartBottomBufferLegend})`);
    const legendEntry = legend.selectAll('g') // groupings do not exist yet
      .data(legendCategoryNames) // count data
      .enter() // run methods once per data count
      .append('g') // produces new groupings
      .attr('height', legendColorKeyHeight);
    const colorKey = legendEntry.append('rect')
      .attr('width', legendColorKeyWidth)
      .attr('height', legendColorKeyHeight)
      .attr('transform', (d, i) => {
        const legendItemYPosition = legendItemHeight * i;
        // legendItemYPosition = legendItemYPosition/2;
        return `translate(0, ${legendItemYPosition})`;
      })
      .style('fill', (d, i) => barColors[i]);
    const label = legendEntry.append('text')
      .text(d => d)
      // .attr("height", legendColorKeyHeight)
      .attr('transform', (d, i) => {
        const legendItemYPosition = legendItemHeight * i + 14; // FIX?
        const paddingLeft = legendColorKeyWidth * 2;
        return `translate(${paddingLeft}, ${legendItemYPosition})`;
      });
  }

  //*************************************************************************************************//

  function makeChartMultiBar() {
    let chart = d3.select(`#${chartDivId}`).append('svg').attr('class', 'chart'); // instantiate chart

    // 508 compliance
    d3.select(`#${chartDivId}`).append('desc').html(chartDesc);
    d3.select(`#${chartDivId}`).append('title').html(chartTitle);

    const x0 = d3.scaleBand()
      .domain(xAxisCategoryNames)
      .rangeRound([0, width])
      .paddingInner(0.1)
      .paddingOuter(0.1);

    const x1 = d3.scaleBand()
      .domain(legendCategoryNames)
      .range([0, x0.bandwidth()])
      // .rangeRound([0, x0.bandwidth()])
      .paddingOuter(0)
      .paddingInner(0);
    // .align();
    // .paddingInner(0.5);
    const hciArray = confidenceIndicators.map(ind => ind.hci);
    const yMulti = d3.scaleLinear()
      .domain([0, d3.max(hciArray) + chartTopBufferDataValue])
      .rangeRound([height, 0]);

    function make_y_gridlines_multi() {
      return d3.axisLeft(yMulti);
    }

    // data
    const dataMatrix = []; // maps bar data vals
    const ciMatrix = []; // maps CI intervals
    const linecapHalfWidth = x1.bandwidth() / 8; // calc ci line caps
    // let paddingWidth = ( x1.step() - x1.bandwidth() ); //calc padding to use for centering grouped bars works best on multiple bars
    const paddingWidth = (x1.step() - x1.bandwidth()) / 2; // calc padding to use for centering grouped bars works best w/ 2 bars
    const padding20Percent = x1.bandwidth() / 5;
    function createDataMatrix() {
      for (var i = 0; i < xAxisCategoryDataCodes.length; i++) {
        // loop through each response category. filter for json data matches and return
        const filteredJSON = sortedJsonData.filter((object, index, array) => object[xAxisColumn] === xAxisCategoryDataCodes[i]);
        // create key objects
        const keysFromFilteredJSON = filteredJSON.map((object) => {
          // handle decimals
          if (object.hci >= 0) {
            let hciArr = object.hci.toString().split('');
            var hciNum;
            switch (hciArr.indexOf('.') >= 0) { // hci
              case true:
                hciArr = hciArr.join('');
                hciNum = Number(hciArr);
                break;
              case false:
                hciArr = hciArr.join('');
                hciArr = Number(hciArr);
                hciNum = hciArr.toFixed(decimalPlaces);
                break;
              default:
                break;
            }
          }
          if (object.lci >= 0) {
            let lciArr = object.lci.toString().split('');
            var lciNum;
            switch (lciArr.indexOf('.') >= 0) { // lci
              case true:
                lciArr = lciArr.join('');
                lciNum = Number(lciArr);
                break;
              case false:
                lciArr = lciArr.join('');
                lciArr = Number(lciArr);
                lciNum = lciArr.toFixed(decimalPlaces);
                break;
              default:
                break;
            }
          }
          if (object.dv >= 0) {
            let valArr = object.dv.toString().split('');
            var valNum;
            switch (valArr.indexOf('.') >= 0) { // val
              case true:
                valArr = valArr.join('');
                valNum = Number(valArr);
                break;
              case false:
                valArr = valArr.join('');
                valArr = Number(valArr);
                valNum = valArr.toFixed(decimalPlaces);
                break;
              default:
                break;
            }
          }
          return {
            // keys render bars
            key: object[xAxisColumn],
            val: valNum || object.dv,
            // keys render tooltip
            title: object[xAxisColumn],
            titleLegendColumn: object[legendColumn],
            lci: lciNum || object.lci,
            hci: hciNum || object.hci,
            wn: object.wn,
          };
        });
        dataMatrix.push(keysFromFilteredJSON);
      }
    }
    createDataMatrix(xAxisCategoryNames, xAxisCategoryDataCodes, xAxisColumn, xAxisType, sortedJsonData);

    function createCIMatrix() {
      for (var i = 0; i < xAxisCategoryDataCodes.length; i++) {
        // loop through each response category. filter for json data matches and return
        const filteredJSON = sortedJsonData.filter((object, index, array) => object[xAxisColumn] === xAxisCategoryDataCodes[i]);
        // create key objects
        const keysFromFilteredJSON = filteredJSON.map(object => ({ lci: object.lci, hci: object.hci }));
        ciMatrix.push(keysFromFilteredJSON);
      }
    }
    createCIMatrix();

    // set chart attributes
    chart.attr('viewBox', () => '0 0 700 750')
      .attr('preserveAspectRatio', 'xMinYMin meet');

    // append first grouping (container for y gridlines, response groupings, axis, legend, etc)
    chart = chart.append('g');
    // resp grouping...
    let responseGrouping = chart.selectAll('g');
    // y gridlines (inserted for visual layering. refactor later as a sorted element)
    chart.append('g')
      .attr('class', 'grid')
      .call(make_y_gridlines_multi()
        .tickSize(-width) // full graph width
        .tickFormat(''))
      .attr('transform', `translate(${margin.left},${margin.top})`);
    // ...resp grouping cont'd
    responseGrouping = responseGrouping.data(xAxisCategoryNames)
      .enter().append('g')
      .attr('class', 'response_grouping')
      .attr('transform', d => `translate(${x0(d)}, ${margin.top})`);
    responseGrouping
      .data(dataMatrix) // set matrix data
      .selectAll('rect') // container
      .data((d, i) => d) // process arrays
      .enter()
      .append('rect') // render matrix into grouped bars
      .attr('class', 'bar')
      .attr('x', (d, i) => margin.left + x1.bandwidth() * i)
    // .attr("x", function (d, i) { return paddingWidth + margin.left + x1.bandwidth()*i; })
      .attr('y', (d) => {
        if (d.val) { return yMulti(d.val); } // checks for missing values
        return yMulti('');
      })
      .attr('width', d => x1.bandwidth() - padding20Percent) // bar width with 20% padding
    // .attr("width", function (d) { return x1.bandwidth() - padding20Percent; }) //bar width with 20% padding
      .attr('height', (d) => {
        if (d.val) {
          return height - yMulti(d.val);
        }
        return 0;
      })
      .attr('fill', (d, i) => barColors[i])
      .style('opacity', '0.8')
      .on('mouseover', function (d, i) {
        let display;
        let title;
        function make_tooltip_display(d, xAxisColumn) {
          const column = d.key;
          const title = lookup[xAxisType][column].name;
          let wn = String(d.wn);
          if (wn.length > 3 && wn.length < 7) {
            wn = wn.split('').reverse().join('');
            wn = `${wn.substring(0, 3)},${wn.substring(3)}`;
            wn = wn.split('').reverse().join('');
          } else if (wn.length > 6 && wn.length < 10) {
            wn = wn.split('').reverse().join('');
            wn = `${wn.substring(0, 3)},${wn.substring(3, 6)},${wn.substring(6)}`;
            wn = wn.split('').reverse().join('');
          }
          display = {
            title: lookup[xAxisType][d.title].name,
            titleLegendColumn: lookup[legendType][d.titleLegendColumn].name,
            dv: d.val,
            lci: d.lci,
            hci: d.hci,
            sampleSizeLabel: chartConfigObject.sampleSizeLabel,
            wn,
          };
        }
        make_tooltip_display(d, xAxisColumn);
        tooltipDiv.transition()
          .duration(200)
          .style('opacity', 0.9);
        tooltipDiv.html(`\n<strong>${display.title}</strong>\n<br /><strong>${display.titleLegendColumn}</strong>\n<br /><strong>${display.dv}${dataValueSuffix}</strong>\n<br />95% CI (${display.lci}-${display.hci})\n<br />${display.sampleSizeLabel}:${display.wn}\n`)
        // .style("left", (d3.event.pageX - 50 - this.clientLeft - window.pageXOffset) + "px") //chrome positioning
        // .style("left", (d3.event.pageX - 200 - this.clientLeft - window.pageXOffset) + "px") //ie positioning
          .style('left', `${d3.event.pageX - 75 - this.clientLeft - window.pageXOffset}px`) // compromise chrm/ie
          .style('top', `${d3.event.pageY - 350 - this.clientTop - window.pageYOffset}px`);
      })
      .on('mouseout', (d) => {
        tooltipDiv.transition()
          .duration(500)
          .style('opacity', 0);
      });
    // ...ci data
    const ciIntervals = responseGrouping.data(ciMatrix).append('g'); // create new grouping
    ciIntervals.selectAll('line')
      .data((d, i) => d)
      .enter().append('line')
      .attr('class', 'confidence_indicator')
      .attr('x1', (d, i) => paddingWidth + margin.left + x1.bandwidth() * i + x1.bandwidth() / 2 - padding20Percent / 2)
      .attr('y1', d => yMulti(d.lci))
      .attr('x2', (d, i) => paddingWidth + margin.left + x1.bandwidth() * i + x1.bandwidth() / 2 - padding20Percent / 2)
      .attr('y2', d => yMulti(d.hci));
    const ciIntervalCapsTop = ciIntervals.data(ciMatrix).append('g');
    ciIntervalCapsTop.selectAll('line')
      .data((d, i) => d)
      .enter().append('line')
      .attr('class', 'linecap_top')
      .attr('x1', (d, i) => {
        if (!d.hci) { return ''; }
        return paddingWidth + margin.left + x1.bandwidth() * i + x1.bandwidth() / 2 - linecapHalfWidth - padding20Percent / 2;
      })
      .attr('y1', d => yMulti(d.hci))
      .attr('x2', (d, i) => {
        if (!d.hci) { return ''; }
        return paddingWidth + margin.left + x1.bandwidth() * i + x1.bandwidth() / 2 + linecapHalfWidth - padding20Percent / 2;
      })
      .attr('y2', d => yMulti(d.hci));
    const ciIntervalCapsBottom = ciIntervals.data(ciMatrix).append('g');
    ciIntervalCapsBottom
      .selectAll('line')
      .data(d => d)
      .enter().append('line')
      .attr('class', 'linecap_bottom')
      .attr('x1', (d, i) => {
        if (!d.hci) { return ''; }
        return paddingWidth + margin.left + (x1.bandwidth() * i) + (x1.bandwidth() / 2) - linecapHalfWidth - (padding20Percent / 2);
      })
      .attr('y1', d => yMulti(d.lci))
      .attr('x2', (d, i) => {
        if (!d.hci) { return ''; }
        return paddingWidth + margin.left + (x1.bandwidth() * i) + (x1.bandwidth() / 2) + linecapHalfWidth - (padding20Percent / 2);
      })
      .attr('y2', d => yMulti(d.lci));
    // axes labels
    const yAxisMidpoint = (height + margin.top) / 2 + margin.top;
    const paddingLeft = 14;
    chart.append('text')
      .attr('class', 'label')
      .attr('id', 'y_axis_label')
      .text(yAxisTitle)
      .attr('transform', `translate(${paddingLeft}, ${yAxisMidpoint})rotate(-90)`)
      .attr('text-anchor', 'middle');
    // axes
    chart.append('g')
      .attr('class', 'axis')
      .attr('transform', `translate(${margin.left}, ${spaceFromTop})`)
      .call(d3.axisBottom(x))
      .selectAll('text')
      .style('text-anchor', 'end')
      .attr('width', '50px')
      .attr('dx', '-.8em')
      .attr('dy', '.15em')
      .attr('transform', 'rotate(-45)');
    chart.append('g')
      .attr('class', 'axis')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)
      .call(d3.axisLeft(yMulti))
      .select('.domain')
      .remove(); // remove y-axis line
    // legend
    const legend = chart.append('g') // create & position legend area
      .attr('class', 'legend')
      .attr('transform', `translate(${halfTotalWidth}, ${chartBottomBufferLegend})`);
    legend.append('text')
      .attr('class', 'legend_title')
      .attr('transform', () => `translate(${0},${0})`)
      .text(legendTitle);
    const legendGrouping = legend.selectAll('g'); // groupings do not exist yet
    legendGrouping.data(legendCategoryNames) // count data
      .enter() // run methods once per data count
      .append('g') // produces new groupings
      .append('rect')
      .attr('width', legendColorKeyWidth)
      .attr('height', legendColorKeyHeight)
      .attr('transform', (d, i) => {
        const yAlign = legendGroupingHeight * i + 15; return `translate(0, ${yAlign})`;
      })
      .style('fill', (d, i) => barColors[i]);
    legendGrouping
      .data(legendCategoryNames)
      .enter()
      .append('text')
      .text(d => d)
      .attr('transform', (d, i) => {
        const yAlign = (legendGroupingHeight * i) + (legendColorKeyHeight * 2);
        const paddingLeft = legendColorKeyWidth * 2;
        return `translate(${paddingLeft}, ${yAlign})`;
      });
  }

  if (chartConfigObject.displayTrendChart === false && legendEntryCount === 1) {
    makeChartSingleBar();
  } else if (chartConfigObject.displayTrendChart === false && legendEntryCount >= 2) {
    makeChartMultiBar();
  } else if (chartConfigObject.displayTrendChart === true) {
    makeTrendChart();
  }
}
