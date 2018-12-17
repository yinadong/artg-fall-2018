//Data import and parse
//Data import and parse
const data = d3.csv('../../data/nyc_permits.csv', parse);
const m = {t:50, r:50, b:50, l:150};
const W = d3.select('.plot').node().clientWidth;
const H = d3.select('.plot').node().clientHeight;
const w = W - m.l - m.r;
const h = H - m.t - m.b;

//scales
/*const scalePerSqft = d3.scaleLog().range([h, 0]);
const scaleBorough = d3.scaleOrdinal();

//Append <svg>/ DOM
const plot = d3.select('.plot')
  .append('svg')
  .attr('width', w + m.l + m.r)
  .attr('height', h + m.t + m.b)
  .append('g')
  .attr('transform', `translate(${m.l}, ${m.t})`);
plot.append('g')
  .attr('class', 'axis-y');
plot.append('g')
  .attr('class', 'axis-x')
  .attr('transform', `translate(0, ${h})`);

/*data.then(function(rows){
  
  //Data discovery
//Range of cost_per_sqft
  const perSqftMin = d3.min(rows, function(d){ return d.cost_per_sqft });
  const perSqftMax = d3.max(rows, function(d){ return d.cost_per_sqft });
  console.log(perSqftMin, perSqftMax);
  //The boroughs
  const boroughs = d3.nest()
    .key(function(d){ return d.borough })
    .entries(rows)
    // .map(function(d){ return d.key });
  console.log(boroughs);

//Use the data gathered during discovery to set the scales appropriately
  scalePerSqft.domain([1, perSqftMax]);
  // scaleBorough.domain(boroughs).range(d3.range(boroughs.length).map(function(d){
  //   return (w-100)/(boroughs.length-1)*d + 50;
  // }));
  console.log("test",boroughs.map(function(d){ return d.key }));
  scaleBorough.domain(boroughs.map(function(d){ return d.key })).range(d3.range(boroughs.length).map(function(d){
    return (w-100)/(boroughs.length-1)*d + 50;
  }));


  const rows_filtered = rows.filter(function(d){
    return scalePerSqft(d.cost_per_sqft) !== Infinity;
   });
  console.log(rows_filtered)
  
  //Plot per sqft cost vs. borough
  //perSqftChart(rows);
  
  /*const svg = d3.select("#plot-1")
     .append("svg")
     .attr("height", H)
     .attr("width", W)
     .append("g")
     .attr("transform", `translate(${m.l}, ${m.t})`)
draw(plot, rows_filtered, scaleBorough, scalePerSqft);
});

function draw(selection, data, sX, sY){
   selection.selectAll('circle')
     .data(data)
     .enter()
     .append('circle')
     .attr('cx', function(d){ return sX(d.borough)})
     .attr('cy', function(d){ return sY(d.cost_per_sqft)})
     .attr('r',3)
     .style('fill-opacity',0.2)
  
  //Draw axes
  const axisY = d3.axisLeft().scale(scalePerSqft)
  const axisX = d3.axisBottom()
    .scale(scaleBorough);
  
  plot.select('.axis-y')
    .transition()
    .call(axisY)
    .selectAll('line')
    .style('stroke-opacity', 0.1);
  plot.select('.axis-x')
    .transition()
    .call(axisX);
}*/

data.then(function(rows){
	console.log(rows);
  
  //Borough
   const boroughs = d3.nest()
    .key(function(d){ return d.borough })
    .entries(rows)
    .map(function(d){ return d.key });
    //.map(function(d){ return d.key });
   console.log(boroughs);
  
    //cost_per_sqft
    const costSqftMin = d3.min(rows, function(d){ return d.cost_per_sqft });
    const costSqftMax = d3.max(rows, function(d){ return d.cost_per_sqft });
    const costsqftMin = d3.min(rows, function(d){ return d.cost_per_sqft });
    //const costsqftMax = d3.max(rows, function(d){ return d.cost_per_sqft });
    const costSqftAvg = d3.mean(rows, function(d){ return d.cost_per_sqft });
    const costSqftMedian = d3.median(rows,function(d){ return d.cost_per_sqft });
    console.group('costsqft')
    console.log(costSqftMin)
    console.log(costSqftMax)
    console.groupEnd();

// scale: sqft
   const scaleX = d3.scalePoint()
     .domain(["Queens","Brooklyn","Staten Island", "Manhattan", "Bronx"])
     .range([m.l , w+m.l]);
    
//Sacle: cost
   const scaleY = d3.scaleLog()
     .domain([1,costSqftMax])
     .range([h, 0]);
     //d3.scaleLog().range([h, 0])
     //d3.scaleLog().range([h, 0])

   console.group('Scale');
   console.log(scaleY.domain());
   console.log(scaleY.range());
   console.groupEnd();

//append dom
   const plot1 = d3.select('#plot-1') 
     .append('svg')
     .attr('width', W)
     .attr('height', H)
     .append('g')
     .attr('transform',`translate(${m.l}, ${m.t})`);
   plot1.append('g')
     .attr('class', 'axis-y');
   plot1.append('g')
    .attr('class', 'axis-x')
    .attr('transform', `translate(0, ${h})`);

     console.log("rows",rows);
     console.log("data",data);
    
    rows.forEach(function(d){
    const x = scaleX(d.borough);
    const y = scaleY(d.cost_per_sqft);

    plot1.append('circle')
    .attr('cx', x)
    .attr('cy', y)
    .attr('r', 3)
    .style('fill-opacity', 0.2)
    }); 

    let circle = plot1.selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
        .attr("cx", function(d){
          return xscale(d.borough);
        })
  
    const axisY = d3.axisLeft()
    .scale(scaleY)
    .tickSize(-w-m.l);
    const axisX = d3.axisBottom()
    .scale(scaleX);
 
    //Draw axes
    plot1.select('.axis-y')
    .transition()
    .call(axisY)
    .selectAll('line')
    .style('stroke-opacity', 0.1);
    plot1.select('.axis-x')
    .transition()
    .call(axisX);
});    

function parse(d){
  return {
    applicant_business_name:d.applicant_business_name,
    borough:d.borough,
    community_board:d.community_board,
    cost_estimate:+d.cost_estimate, //convert string to number
    enlargement:d.enlargement_flag_yes_no === "true"?true:false, //convert string to boolean
    address: `${d.job_location_house_number} ${d.job_location_street_name}`,
    job_number:+d.job_number,
    job_type:d.job_type,
    job_type2:d.job_type2,
    permit_type:d.permit_type,
    permit_issuance_date:new Date(d.permit_issuance_date),
    square_footage:+d.square_footage,
    cost_per_sqft: +d.square_footage > 0?(+d.cost_estimate / +d.square_footage):0
  }
}
