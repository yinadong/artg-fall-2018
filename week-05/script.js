/* Week 5
 *
 * This exercise is intended to help you practice with importing data 
 * and effectively manipulating data structures (arrays, objects) for the practical purpose of data discovery.
*/

//Question 1: complete the parse function
function parse(d){
	return {
		/* YOUR CODE HERE: complete the parse function, making sure the parsed data has the following fields: */
		borough:d.borough,
		community_board:d.community_board,
		address: `${d.job_location_house_number} ${d.job_location_street_name}`,
		lngLat: [+d.longitude, +d.latitude],
		job_number:d.job_number,
		permit_type:d.permit_type,
		cost_estimate:+d.cost_estimate,
		permit_issuance_date:new Date(d.permit_issuance_date),
		job_type: d.job_type,
		square_footage: +d.square_footage,
	}
}

//Importing data
//d3.csv(url, parse) returns a Promise
//use Promise.then callback to access the result of data import
d3.csv(
		'../data/nyc_permits.csv', //url (string) 
		parse //parse (function)
	)
	.then(function(data){
		
		//Question 2: how many records are there? Expect a single number
		//Also, for each record, what attributes/fields are available?
		//Hint: the variable "data" is an array, and array.length gives the number of elements in the array
		const NUM_RECORDS = 0 /* YOUR CODE HERE */;
		console.groupCollapsed('Question 2');
		console.log(`There are ${NUM_RECORDS} records in the dataset`);
		console.log('For each record, the attributes are as follows');
		console.log(/* YOUR CODE HERE */);
		console.groupEnd();


		//Question 3: for each record, print its address in console
		//Hint: use array.forEach
		console.groupCollapsed('Question 3'); 
		/* YOUR CODE HERE */

		console.groupEnd();

		//Question 4.1: can you transform "data" array into an array of just cost estimates?
		//Hint: use array.map
		const costEstimates = ['cost_estimate'] /* YOUR CODE HERE */;
		console.groupCollapsed('Question 4.1');
		console.log(costEstimates);
		console.groupEnd();

		//Question 4.2: smallest cost estimate and largest cost estimate?
		const minCostEstimate = d3.min(data, function(d){ return d.cost_estimate }); /* YOUR CODE HERE */;
		const maxCostEstimate = d3.max(data, function(d){ return d.cost_estimate }); /* YOUR CODE HERE */;
		console.groupCollapsed('Question 4.2');
		console.log(`Min and max cost estimates are ${minCostEstimate}, ${maxCostEstimate}`);
		console.groupEnd();

		//Question 4.3: it appears that some cost estimates are $1, which are probably trivial or placeholder estimates
		//let's filter these out
		const filteredCostEstimates = [] /* YOUR CODE HERE */;
		console.groupCollapsed('Question 4.3');
		console.log(filteredCostEstimates);
		console.groupEnd();

		//Question 4.4: how many non-trivial cost estimates are there? What is the average cost estimate?
		//Use the result from 4.3 directly
		const averageCost = d3.mean(data, function(d){ return d.cost_per_sqft }); /* YOUR CODE HERE */;
		console.groupCollapsed('Question 4.4');
		console.log(`There are ${filteredCostEstimates.length} non-trivial cost estiamtes`);
		console.log(`Average cost estimate is ${averageCost}`);
		console.groupEnd();

		//Question 4.5: similarly, what percentage of the estimates are between $1 and $1,000,000
		//What percentage are between $1,000,000 and $5,000,000
		//And what percentage are over $5,000,000?
		//Hint: use array.filter to narrow down all the records, then count them up and divide by the number of total records
		/* YOUR CODE HERE */

		console.groupCollapsed('Question 4.5');
		console.log(`${undefined}% of permits are between $1 and $1M`);
		console.groupEnd();

		//The following questions explore the categorical dimensions

		//Question 5.1: let's look at one of the categorical dimensions (permit type)
		//can you group all the permit records by the permit type attribute?
		//Hint: use d3.nest()
		const permitsByType = d3.nest()
	    .key(function(d){ return d.permit_type })
	    .entries(data);  /* YOUR CODE HERE */; 
		console.groupCollapsed('Question 5.1');
		console.log(permitsByType);
		console.groupEnd();

		//Question 5.2: similarly, can you group all the permit records by borough?
		const permitsByBorough = d3.nest()
	    .key(function(d){ return d.borough })
	    .entries(data); /* YOUR CODE HERE */;
		console.groupCollapsed('Question 5.2');
		console.log(permitsByBorough);
		console.groupEnd();

		//Question 5.3: all construction permits generally of higher value in some boroughs?
		//To find out, let's take the result from 5.2, and compute the average (mean) cost estimate of all permits for each borough
		//and rank them from lowest to highest
		//
		//Hint: from question 5.2, we already have a 5-element array of objects that represent each borough
		//from here, we need to manipulate each element
		//As discussed before, per-element array manipulation involves using array.map
		const meanCostByBorough = undefined /* YOUR CODE HERE */;
		console.groupCollapsed('Question 5.3');
		console.log(meanCostByBorough);
		console.groupEnd();

		//Some additional questions to consider. See if you can manipulate the data to acquire these results:

		//Is permit cost per square foot higher for new construction than for enlargements?

		//What is the time span of the dataset? What is the oldest permit? Newest?

		//Are there duplicate records at the same address? What does that mean?

	});

