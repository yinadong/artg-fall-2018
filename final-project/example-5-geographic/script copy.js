//Prep work 
const W = d3.select('.chart').node().clientWidth;
const H = d3.select('.chart').node().clientHeight;
const margin = {t:32, r:16, b:64, l:64};
const w = W - margin.l - margin.r;
const h = H - margin.t - margin.b;

const plot = d3.select('.chart')
	.append('svg')
		.attr('width', W)
		.attr('height', H)
	.append('g')
		.attr('class','plot')
		.attr('transform', `translate(${margin.l}, ${margin.t})`);


//Shared global variables, such as indicator names and geo functions
const INDICATOR_INFANT_DEATH = 'GDP per capita (constant 2010 US$)';
const INDICATOR_INTERNET_USER_RATE = 'Individuals using the Internet (% of population)';

const projection = d3.geoMercator();
const path = d3.geoPath();

//Load data
const dataPromise = d3.csv('../data/data.csv', parseData)
.then(function(rows){ 
	return rows.reduce(function(acc,val){return acc.concat(val)}, []); 
});
const metadataPromise = d3.csv('../data/countries-metadata.csv', parseMetadata);
const geojsonPromise = d3.json('../data/countries.geojson');

Promise.all([dataPromise, metadataPromise, geojsonPromise])
	.then(function([data, metadata, geojson]){

		//First, filter the data for the indicators and year that we are interested in
		const YEAR = 2016;
		const infantDeathData = data.filter(function(d){
				return d.year === YEAR;
			}).filter(function(d){
				return d.series === INDICATOR_INFANT_DEATH;
			});
		const internetuserdData = data.filter(function(d){
				return d.year === YEAR;
			}).filter(function(d){
				return d.series === INDICATOR_INTERNET_USER_RATE;
			});

		//Next, we should roll up these indicators with the GeoJSON data
		//The "rollup" operation will require data lookup, hence d3.map
		const infantDeathDataMap = d3.map(infantDeathData, function(d){return d.countryCode});
		const internetuserratemap = d3.map(internetuserdData, function(d){return d.countryCode});
		geojson.features 
			.forEach(function(feature){
				const infantDeath = infantDeathDataMap.get(feature.properties.ISO_A3);
				const internetuser = internetuserratemap.get(feature.properties.ISO_A3);
				feature.properties[INDICATOR_INFANT_DEATH] = infantDeath?infantDeath.value:null;
				feature.properties[INDICATOR_INTERNET_USER_RATE] = internetuser?internetuser.value:null;
			});	

		//Configure geo functions with data
		path.projection(projection);

		drawChoropleth(geojson, plot);
		drawCartogram(geojson, plot);

	});

function drawChoropleth(geojson, selection){

	//In this function we can derive a color ramp (i.e. scale) using infant mortality rate
	const maxInternetuser = d3.max(geojson.features, function(d){
		return d.properties[INDICATOR_INTERNET_USER_RATE];
	});
	console.log(maxInternetuser)

	const scaleColor = d3.scaleLinear().domain([0, maxInternetuser]).range(['white','skyblue']);

	const nodes = selection.selectAll('.country')
		.data(geojson.features, function(d){return d.properties.ISO_A3});

	const nodesEnter = nodes.enter()
		.append('path').attr('class','country');

	nodes.merge(nodesEnter)
		.attr('d', path)
		.style('fill', function(d){
			return scaleColor(d.properties[INDICATOR_INTERNET_USER_RATE]);
		});

}

function drawCartogram(geojson, selection){

	//In this function we can derive a size scale using infant death
	const maxInfantDeath = d3.max(geojson.features, function(d){
		return d.properties[INDICATOR_INFANT_DEATH];
	});

	console.log(maxInfantDeath);

	const scaleSize = d3.scaleSqrt().domain([0, maxInfantDeath]).range([2,60])


	const nodes = selection.selectAll('.country-circle')
		.data(geojson.features, function(d){return d.properties.ISO_A3});

	const nodesEnter = nodes.enter()
		.append('circle')
		.transition()
		.attr('class','country-circle');

	nodes.merge(nodesEnter)
		.filter(function(d){
			return d.properties[INDICATOR_INFANT_DEATH] > 0;
		})
		.each(function(d){

			const circleSize = scaleSize(d.properties[INDICATOR_INFANT_DEATH]);
			const xy = path.centroid(d);

			d3.select(this)
				.attr('cx', xy[0] - circleSize/2)
				.attr('cy', xy[1] - circleSize/2)
				.attr('r', circleSize)
			
		   })

			.style('fill-opacity', 0.1)
		    //.style('stroke', 'yellow')
		    .style('stroke-width','1px')
		    //.style('fill', 'yellow')
		    //.style('fill', function(d){
		 //const internetuser = internetuserratemap.get(feature.properties.ISO_A3);
		 //return scaleColor(internetuser);
}
        
		/*.style('fill-opacity', .1)
		.style('stroke', '#333')
		.style('stroke-width', '1.5px');

		.select('circle')
		.transition()
		.attr('r', function(d){
			const r = scaleSize(d.properties[INDICATOR_INFANT_DEATH]);
			return r;
		})
		.style('fill-opacity', 0.3)
		.style('stroke', '#333')
		.style('stroke-width','1px')*/


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