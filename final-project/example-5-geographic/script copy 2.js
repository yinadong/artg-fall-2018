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
let metadataMap;
let scaleColor = d3.scaleOrdinal();
const INDICATOR_INFANT_DEATH = 'Individuals using the Internet (% of population)';
const INDICATOR_INTERNET_USER_RATE = 'GDP per capita (constant 2010 US$)';

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

		const regions = d3.nest()
			.key(function(d){ return d.Region })
			.entries(metadata)
			.map(function(d){ return d.key });
        scaleColor.domain(regions)
			.range([
				'#333', //undefined
				'rgb(237,179,121)', //South Asia
				'rgb(233,179,211)',
				'#C4A4CE',
				'#E5899D',
				'#92A7D6',
				'#B2D8B4',
				'#8ACDDD'
			])
		//Let's also make a "lookup" map, so we can find what region a country belongs to
		metadataMap = d3.map(metadata, function(d){ return d.Code });

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

	const scaleColor = d3.scaleSqrt().domain([0, maxInternetuser]).range(['white','#605245']);

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

	//const scaleSize = d3.scaleSqrt().domain([0, maxInfantDeath]).range([2,60])
	const scaleSize = d3.scaleLinear().domain([0, maxInfantDeath]).range(['2','20']);


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
				.on('mouseenter', function(d,i){
	  	        d3.select(this)
	  	        .style('opacity', 1);
	  	        console.log(d.Features);
	            
	            d3.select('.custom-tooltip')
                .select('#properties[INDICATOR_INFANT_DEATH]') //feature??
                .html(d.properties[INDICATOR_INFANT_DEATH])

                d3.select('.custom-tooltip')
                .select('#properties.ISO_A3')
                .html(d.properties.ISO_A3)

                d3.select('.custom-tooltip')
                .select('#properties[INDICATOR_INTERNET_USER_RATE]')
                .html(d.properties[INDICATOR_INTERNET_USER_RATE])
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
			})

			.style('fill-opacity', 0.2)
		    //.style('stroke', 'yellow')
		    .style('stroke-width','1px')
		    .style('fill', function(d){
			const region = metadataMap.get(d.properties.ISO_A3).Region;
			return scaleColor(region);
			});
	  
	
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