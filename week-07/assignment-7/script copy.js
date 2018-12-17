//Data import and parse
const data = d3.csv('../../data/nyc_permits.csv', parse); // JS Promise
const m = {t:50, r:50, b:50, l:50};
const w = d3.select('.plot').node().clientWidth - m.l - m.r;
const h = d3.select('.plot').node().clientHeight - m.t - m.b;

//Scales  //global can acess the function
const scaleCost = d3.scaleLog().range([h, 0]);
const scaleSqft = d3.scaleLog().range([0, w]);
const scalePerSqft = d3.scaleLog().range([h, 0]);
const scaleBorough = d3.scaleOrdinal();
const scaleSize = d3.scaleSqrt().range([0,30]);

//Append <svg>
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

data.then(function(rows){
	//Data discovery
	//Range of cost_estimate
	const costMin = d3.min(rows, function(d){ return d.cost_estimate });
	const costMax = d3.max(rows, function(d){ return d.cost_estimate });
	console.log(costMin, costMax);
	//Range of square_footage
	const sqftMin = d3.min(rows, function(d){ return d.square_footage });
	const sqftMax = d3.max(rows, function(d){ return d.square_footage });
	console.log(sqftMin, sqftMax);
	//Range of cost_per_sqft
	const perSqftMin = d3.min(rows, function(d){ return d.cost_per_sqft });
	const perSqftMax = d3.max(rows, function(d){ return d.cost_per_sqft }); //if see ds.max *2 in the screen
	console.log(perSqftMin, perSqftMax);
	//The boroughs
	const boroughs = d3.nest()
		.key(function(d){ return d.borough })
		.entries(rows)
		.map(function(d){ return d.key });
	console.log(boroughs);

	//Use the data gathered during discovery to set the scales appropriately
	scaleCost.domain([1, costMax]);
	scaleSqft.domain([1, sqftMax]);
	scalePerSqft.domain([1, perSqftMax]);
	scaleBorough.domain(boroughs).range(d3.range(boroughs.length).map(function(d){
		return (w-100)/(boroughs.length-1)*d + 50;
	}));
	scaleSize.domain([0, costMax]);



	/*const rows_filtered = rows.filter(function(d){
    return scalePerSqft(d.cost_per_sqft) !== Infinity;
    });
   console.log(rows_filtered)*/

	//Plot per sqft cost vs. borough
	perSqftChart(rows.slice(0,1000));

	//Plot cost vs. sqft
	costVsSqftChart(rows);

	//costVsSqftChart(rows);

	//PART 2: toggle between the two plots
	d3.select('#cost-vs-sqft')
		.on('click', function(){
			d3.event.preventDefault();
			//drawNodes(costVsSqftChart);
			costVsSqftChart(rows.slice(0,1000));
			/* YOUR CODE HERE*/
		});

	d3.select('#per-sqft-vs-borough').on('click', function(){
			d3.event.preventDefault();
			//drawNodes(perSqftChart);
			perSqftChart(rows.slice(0,1000));
			/* YOUR CODE HERE*/
		});
});

function perSqftChart(data){
    //console.log('Draw cost vs sqft chart');
	//console.log(data);
   
   //update selection .node is a selection
	const NodesUpdate = plot.selectAll('.node') //DOM selection of 0
		.data(data)//Data array of 1000 data points
	/*
 	 * Complete this function
	 * YOUR CODE HERE*/

	//ENTER selection (deficit)
	/*const nodesEnter.enter() //the x number of emoty spcaes to make uo for deficit
	  .append('circle')
	  .attr('class', 'node') //

	 const nodesExit = nodes.exit()//selection
	  .remove(); 

	//setting visual attributes for Update and enter
	nodes.merge(nodesEnter)
	  .attr('cx', function(d){ return scaleSqft(d.square_footage)})
      .attr('cy', function(d){ return scaleCost(d.cost_estimate)})
      .style('fill-opacity', 0.1);*/
	//Append the right children elements
	const NodesEnter = NodesUpdate.enter()
		.append('circle')
		.attr('class','node'); //if not, treat all as enter

	     //NodesEnter
		//.append('text');

	//FOR BOTH ENTER AND UPDATE
	//re-calculate their attributes
	NodesUpdate.merge(NodesEnter)
		.transition()
		.duration(2000) //speed of showing
		.attr('cx', function(d){ return scalePerSqft(d.cost_per_sqft)})
        .attr('cy', function(d){ return scaleBorough(d.borough)})
        .attr('r',function(d){return scaleSize(d.cost_estimate)})
        .style('fill-opacity', 0.1);

		//.attr('text-anchor', 'middle');

	//EXIT selection (surplus)
	const NodesExit = NodesUpdate.exit()
		.remove();

	//Draw axes
	//This part is already complete, but please go through it to see if you understand it
	const axisY = d3.axisLeft()
		.scale(scalePerSqft)
		.tickSize(-w);
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
}
//draw stage: take the data into 
function costVsSqftChart(data){

	const NodesUpdate = plot.selectAll('.node') 
		.data(data)//how many 
	/*
 	 * Complete this function
	 * YOUR CODE HERE*/

	//ENTER selection (deficit)
	//Append the right children elements
	const NodesEnter = NodesUpdate.enter()
		.append('circle')
		.attr('class','node');

	     NodesEnter
		.append('circle');

	     //NodesEnter
		//.append('text');

	//FOR BOTH ENTER AND UPDATE
	//re-calculate their attributes
	NodesUpdate.merge(NodesEnter)
	    .select('circle')
		.transition()
		.duration(2000) //speed of showing
		.attr('cx', function(d){ return scaleSqft(d.square_footage)})
        .attr('cy', function(d){ return scaleCost(d.cost_estimate)})
        .attr('r',3)
        .style('opacity', 0.1);


		//.attr('text-anchor', 'middle');

	//EXIT selection (surplus)
	const nodesExit = NodesUpdate.exit()
		.remove();

	//Draw axes
	//This part is already complete, but please go through it to see if you understand it
	const axisY = d3.axisLeft()
		.scale(scaleCost)
		.tickSize(-w);
	const axisX = d3.axisBottom()
		.scale(scaleSqft);

	plot.select('.axis-y')
		.transition()
		.call(axisY)
		.selectAll('line')
		.style('stroke-opacity', 0.1);
	plot.select('.axis-x')
		.transition()
		.call(axisX);
}

function parse(d){
	//console.log(d) //see the otignal data

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
		cost_per_sqft: +d.square_footage >0? (+d.cost_estimate / +d.square_footage):0
	} //the object replcae in each row
}