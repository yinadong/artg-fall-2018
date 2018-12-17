//This example demonstrates how you might import data from different sources
// append svg
const W = d3.select('.plot').node().clientWidth;
const H = d3.select('.plot').node().clientHeight;
const margin = {t:30, r:30, b:30, l:30};
const w = W - margin.l - margin.r;
const h = H - margin.t - margin.b;

const plot = d3.select('.plot') 
     .append('svg')
     .attr('width', W)
     .attr('height', H)
     .append('g')
     .attr('transform',`translate(${margin.l}, ${margin.t})`);
plot.append('g').attr('class', 'axis axis-x').attr('transform', `translate(0, ${h})`); //draw axis-x
plot.append('g').attr('class','axis axis-y');// daw axis-y


const dataPromise = d3.csv('../data/data-test.csv', parseData)
.then(function(rows){ 
	return rows.reduce(function(acc,val){return acc.concat(val)}, []); 
});
const metadataPromise = d3.csv('../data/countries-metadata.csv', parseMetadata);
const geojsonPromise = d3.json('../data/countries.geojson'); //import file, promise

Promise.all([dataPromise, metadataPromise, geojsonPromise])// get all three dataset
	.then(function([data, metadata, geojson]){	

//ui element 
	const selectMenu = d3.select('.container').append('select')
	     .attr('class', 'custom-select');
	 [2015, 2016, 2017].forEach(function(d){
	 	 selectMenu
	 	 .append('option')
	 	 .attr('value',d)
	 	 .html(d);
	 });
    
    selectMenu.on('change', function(){
    	const val = +d3.event.target.value;
    	//console.log(val); 

    	const nodesData = pickDataByYear(dataByYearByCountry, val);

    	drawChart(nodesData, plot);
    });
    	//re-filter the data

    	//re-flatten the data
     
		//Here, all the different datasets have been imported via Promise
		//Data -> 263 countries and entities x 21 indicators x 50 years
		console.log(data);

		//Metadata -> 263 countries and entities
		//console.log(metadata);

		//Geojson -> collection of 255 geographic features
		//console.log(geojson);

		/*const dataByyear = d3.nest()
		.key(function(d){return d.year})
		.entries(data);

		const dataBycountry = d3.nest()
		.key(function(d){return d.countryCode})
		.entries(data);*/
		
		// create the year country-indicator hierarcy
		const dataByYearByCountry = d3.nest() 
		.key(function(d){return d.year})
		.key(function(d){return d.countryCode})
		.entries(data);
	    const nodesData = pickDataByYear(dataByYearByCountry, 2015);

	    drawChart(nodesData, plot)
});	 

        //console.log(dataByyearBycountry);
        //pick the 2016 year
       /*const dataByyearBycountry2016 = dataByyearBycountry
        .filter(function(d){return d.key === "2016"})[0].values;
        console.log(dataByyearBycountry2016)//an array of the countreis 
       // flatten data to one level
        const nodesData = dataByyearBycountry2016.map(function(country){
       	const key = country.key;//"AFG"
       	const indicators = country.values;//array of 3

       	const output ={};
       	output.key = key;

       	indicators.forEach(function(indicator){
       		output[indicator.series] = indicator.values;
       	 });
       		return output;
       	});
	    console.log(nodesData);*/

function pickDataByYear(dataByYearByCountry, year){ //named function
	   const dataByCountry2015 = dataByYearByCountry
	     .filter(function(d){ return +d.key === year })[0].values;
        //.filter(function(d){return -d.key === "2016"})[0].values;
        //console.log(dataByyearBycountry2016)//an array of the countreis 
       // flatten data to one level
       const nodesData = dataByCountry2015.map(function(country){
          const key = country.key;//"AFG"
          const indicators = country.values;//array of 3

       	  const output = {};
       	  output.key = key;

       	  indicators.forEach(function(indicator){
       	  	output[indicator.series] = indicator.value;
       	  }); //3 times 

       	  return output;
    });
  return nodesData;
}

	    //drawChart(nodesData, plot)



		//Below are some examples of data transformation you may apply
		//1.1 Converting metadata into a "map" or dictionary
		/*const metadataMap = d3.map(metadata, function(d){return d.Code});
		//With this "map", you can easily look up information for any country using the 3-letter code
		console.group('Example 1.1: creating a map for lookup');
		console.log(metadataMap.get('USA'));
		console.groupEnd();

		//1.2 Nesting data: what if I want to see how total population has changed for each country across 50 years?
		console.group('Example 1.2: nesting and filtering data');
		// 263 countries and entities x 1 indicator x 50 years = 13150 records
		const populationIndicator = data.filter(function(d){return d.series === 'Population, total'});
		// Nest 13150 records by countries
		const populationByCountry = d3.nest()
			.key(function(d){ return d.country })
			.entries(populationIndicator);
		console.log(populationByCountry);
		console.groupEnd();

		//1.3 Try this out for your self: what if I need to look up the "GDP per capita (constant 2010 US$)" measure for all countries for the year 2000 only?
		//Hint: use array.filter twice*/

function drawChart(data, domsSelection){
	/*const POP_INDICATOR_NAME = 'population, total';
	const GDP_PER_CAP_INDICATOR_NAME = 'GDP per capita (constant 2010 US$)';
	const INFANT_MORT_INDICATOR_NAME = 'Mortality rate, infant (per 1,000 live births)';

	const popExtent = d3.extent(data,function(d){ return d[POP_INDICATOR_NAME]});
	const gdpPerCapExtent = d3.extent(data, function(d){ return d[GDP_PER_CAP_INDICATOR_NAME]});
	const infantExtent = d3.extent(data, function(d){ return d[INFANT_MORT_INDICATOR_NAME});

	//SCALE
	const scaleX = d3.scalelog().domain(gdpPerCapExtent).range([0,w]);
	const scaleY = d3.scalelinear().domain(infantExtent).range[(h,0)];
	const scaleSize = d3.scaleSqrt().domain(popExtent).range[(5,50)];

	const nodes = plot.selectAll('.country-node')
	  .data(data, function(d){return d.key});

	const nodesEnter = nodes.enter()
	 .append('g').attr('class', 'country-node');
	 .nodesEnter.append('circle');
	 .nodesEnter.append('text');

	 nodes.merge(nodesEnter)
	 .attr('transform', function(d){
	  const x = scaleX(d[GDP_PER_CAP_INDICATOR_NAME]);
	  const y = scaleY(d[INFANT_MORT_INDICATOR_NAME]);
	   return `translate(s{x}, s{y})`;
	 })
	 .select('cicle')
	 .attr('r', function(d){return scaleSize(d[POP_INDICATOR_NAME]) })  
	 .style('fill-opacity', 2)
	 .style('strole', '#333')
	 .style('stroke-width', '1.5px');
	nodes.merge(nodesEnter)
	.select('text')
	.text(function(d){ return d.key})
	.attr('text-anchor', 'middle')
	.style('font-szie', '10px');*/
    const POP_INDICATOR_NAME = 'Population, total';
    const GDP_PER_CAP_INDICATOR_NAME = 'GDP per capita (constant 2010 US$)';
    const Internet_User= 'Individuals using the Internet (% of population)';

    //Draw viz under domSelection, based on dataPromise
    const popExtent = d3.extent(data, function(d){ return d[POP_INDICATOR_NAME]});
    const gdpPerCapExtent = d3.extent(data, function(d){ return d[GDP_PER_CAP_INDICATOR_NAME]});
    const internetExtent = d3.extent(data, function(d){ return d[Internet_User]});

    
    //Scale
    const scaleX = d3.scaleLog().domain(gdpPerCapExtent).range([0,w]); //shrink down
    const scaleY = d3.scaleLinear().domain(internetExtent).range([h,0]);
    const scaleSize = d3.scaleSqrt().domain(popExtent).range([5,50]);

    //enter exit update
    const nodes = plot.selectAll('.country-node')
        .data(data, function(d){ return d.key });

    const nodesEnter = nodes.enter()
        .append('g').attr('class','country-node');
    nodesEnter.append('circle');
    nodesEnter.append('text');

    //
    nodes.merge(nodesEnter) //UPDATE + ENTER
        .attr('transform', function(d){
            const x = scaleX(d[GDP_PER_CAP_INDICATOR_NAME]);
            const y = scaleY(d[Internet_User]);
            return `translate(${x}, ${y})`;
        })
    nodes.merge(nodesEnter)    
        .select('circle')
        .transition()
        .attr('r', function(d){ return scaleSize(d[POP_INDICATOR_NAME]) })
        .style('fill-opacity', .2)
        .style('stroke', '#333')
        .style('stroke-width', '1.5px');
    nodes.merge(nodesEnter)
        .select('text')
        .text(function(d){ return d.key })
        .attr('text-anchor','middle')
        .style('font-size', '6px');

//axes	
// create an axis generator function
/*const axisX = d3.axisBottom() //no. of the xeas shows in the bottom
      .scale(scaleX)

const axisY = d3.axisLeft()
     .scale(scaleY)
     .tickSize(-w)

const axisXNode = plot.append('g')
     .attr('class', 'axis axis-x')
     .attr('transform', `translate(0, ${h})`)
     .call(axisX);

const axisYNode = plot.append('g')
     .attr('class', 'axis axis-y')
     .call(axisY);*/     

    const axisX = d3.axisTop()
        .scale(scaleX)

    const axisY = d3.axisLeft()
        .scale(scaleY)
        .tickSize(-w) 

    const axisXNode = plot.select('.axis-x')
		.transition()
		.call(axisX);

	const axisYNode = plot.select('.axis-y')
		.transition()
		.call(axisY);

    /*const axisXNode = plot.append('g')
        .attr('class', 'axis axis-x')
        .attr('transform', `translate(0, ${h})`)
        .call(axisX);

    const axisYNode = plot.append('g')
        .attr('class', 'axis axis-y')
        .call(axisY);*/


}

function parseData(d){

	const country = d['Country Name'];
	const countryCode = d['Country Code'];
	const series = d['Series Name'];
	const seriesCode = d['Series Code'];

	delete d['Country Name'];
	delete d['Country Code'];
	delete d['Series Name'];
	delete d['Series Code'];

	const records = [];

	for(key in d){
		records.push({
			country:country,
			countryCode:countryCode,
			series:series,
			seriesCode:seriesCode,
			year:+key.split(' ')[0],
			value:d[key]==='..'?null:+d[key]
		})
	}

	return records;

}

function parseMetadata(d){

	//Minimal parsing required; return data as is
	return d;

}