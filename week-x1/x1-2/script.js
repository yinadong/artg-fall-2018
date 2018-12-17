const data = d3.csv('../../data/nyc_permits.csv', parse);

const scaleSize = d3.scaleSqrt().range([2,20]);

data.then(function(rows){

	//Data discovery
	scaleSize.domain(d3.extent(rows, function(d){return d.cost_estimate}));

	drawChart(rows, document.getElementById('chart'));
	drawMap(rows, document.getElementById('map'));

});

function drawChart(data, dom){

	//Set up DOM
	const margin = {t:50, r:30, b:30, l:100};
	const W = dom.clientWidth;
	const H = dom.clientHeight;
	const w = W - margin.l - margin.r;
	const h = H - margin.t - margin.b;

	//Additional data discovery
	const costPerSqftMax = d3.max(data, function(d){return d.cost_per_sqft});
	const boroughs = d3.nest().key(function(d){return d.borough}).entries(data).map(function(d){return d.key});

	//Set up scales
	const scaleX = d3.scaleLog().domain([1,costPerSqftMax]).range([1, w]);
	const scaleY = d3.scaleOrdinal().domain(boroughs).range(
		d3.range(boroughs.length).map(function(b,i){
			return h/boroughs.length * (i + 0.5)
		})
	);

	//Append DOM
	const plot = d3.select(dom)
		.append('svg')
		.attr('width', W)
		.attr('height', H)
		.append('g')
		.attr('class','plot')
		.attr('transform', `translate(${margin.l}, ${margin.t})`);

	plot.selectAll('.node')
		.data(data)
		.enter()
		.append('circle')
		.attr('class','node')
		.attr('cx', function(d){return scaleX(d.cost_per_sqft)})
		.attr('cy', function(d){return scaleY(d.borough)})
		.attr('r', function(d){return scaleSize(d.cost_estimate)});

	//Axis
	const axisX = d3.axisBottom()
		.tickSize(-h)
		.scale(scaleX);

	plot.insert('g','.node')
		.attr('class','axis')
		.attr('transform',`translate(0,${h})`)
		.call(axisX);

	//Borough labels
	plot.selectAll('.label')
		.data(boroughs)
		.enter()
		.append('text')
		.attr('class','label')
		.text(function(d){return d})
		.attr('y', function(d){return scaleY(d)})
		.attr('x', -70)
		.attr('dy', 6)
		.style('font-size','12px')

}

function drawMap(data, dom){

	//Create projection
	//
/*const lngLatNYC = [-71.057083, 42.361145];
const w = dom.clientWidth;
const h = dom.clientHeight;

const plot = d3.select(dom)
    .append('svg')
    .attr('width', w)
    .attr('height', h);

const projection = d3.geoMercator()
    //.center(lngLatNYC)
    .translate([w/2,h/2])
    .center(lngLatNYC)
    .scale(60000)

console.log(projection(lngLatNYC));

const nodes = plot.selectAll('.node')
  .data(data)
  .enter()
  .append('circle')
  .attr('class', 'node')
  .attr('r', function(d){return scaleSize(d.cost_estimate)})
  .attr('cx', function(d){return projection(d.lngLat)[0]})
  .attr('cy', function(d){return projection(d.lngLat)[1]})
  .on('mouseenter', function(d, i){ 
  	// cann lbacj function
  	d3.select(this)  //this is the selection, not node, ds.select(this) change the note to selction
  	  .style('opacity', 1);
  	console.log(d);*/
const lngLatNYC = [-74.006, 40.7128];

  const w = dom.clientWidth;
	const h = dom.clientHeight;
	const plot = d3.select(dom)
	  .append('svg')
		.attr('width', w)
		.attr('height', h);

	const projection = d3.geoMercator()
	  .translate([w/2,h/2])
	  .center(lngLatNYC)
	  .scale(60000)

	console.log(projection(lngLatNYC));

	const nodes = plot.selectAll('.node')
	  .data(data)
	  .enter()
	  .append('circle')
	  .attr('class', 'node')
	  .attr('r', function(d){return scaleSize(d.cost_estimate)})
	  .attr('cx', function(d){return projection(d.lngLat)[0]})
	  .attr('cy', function(d){return projection(d.lngLat)[1]})
	  .on('mouseenter', function(d,i){
	  	d3.select(this)
	  	  .style('opacity', 1);
	  	console.log(d);

  	//const tooltip = d3.select('.custom-tooltip');
  	//tooltip
  	d3.select('.custom-tooltip')
      .select('#address')
      .html(d.address)

    d3.select('.custom-tooltip')
     .select('#sqft')
     .html(d.sqft)

    d3.select('.custom-tooltip')
     .select('#permit_type')
     .html(d.permit_type)
    })

    .on ('mosemove', function(d){
     const xy = d3.mouse(d3.select('.full-screen').node());
     console.log(xy);
       d3.select('.customtooltip')
        .style('left', (xy[0] + 20) + 'px')
	    .style('top', (xy[1] + 20) + 'px')
    //.style('top', '100px')

    })
    .on('mouseleave', function(d){
  	   d3.select(this)  //this is the selection, not node, ds.select(this) change the note to selction
  	     .style('fill-opacity', null);
    })
   /*const tooltip = d3.select('.custom-tooltip');
      
      tooltip
	  	 .select('#address')
        .html(d.address)
      tooltip
        .select('#sqft')
        .html(d.square_footage)
      tooltip
        .select('#permit_type')
        .html(d.permit_type)

	  })
	  .on('mousemove', function(d){
	  	const xy = d3.mouse(d3.select('.full-screen').node());
	  	console.log(xy);

	  	d3.select('.custom-tooltip')
	  	  .style('left', (xy[0] + 20) + 'px')
	  	  .style('top', (xy[1] + 20) + 'px')

	  })
	  .on('mouseleave', function(d){
	  	d3.select(this)
	  	  .style('opacity', null);
	  })*/
}

function parse(d){
	return {
		applicant:d.applicant_business_name,
		lngLat: [+d.longitude, +d.latitude],
		borough:d.borough,
		community_board:d.community_board,
		cost_estimate:+d.cost_estimate, //convert string to number
		enlargement:d.enlargement_flag_yes_no === "true"?true:false, //convert string to boolean
		address: `${d.job_location_house_number} ${d.job_location_street_name}`,
		job_number:d.job_number,
		job_type:d.job_type,
		job_type2:d.job_type2,
		permit_type:d.permit_type,
		permit_issuance_date:new Date(d.permit_issuance_date),
		square_footage:+d.square_footage,
		cost_per_sqft: +d.square_footage > 0 ? (+d.cost_estimate /+d.square_footage):0
	}
}