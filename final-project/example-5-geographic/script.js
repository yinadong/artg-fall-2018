//Prep work 
const W = d3.select('.chart2').node().clientWidth;
const H = d3.select('.chart2').node().clientHeight;
const margin = {t:32, r:16, b:64, l:64};
const w = W - margin.l - margin.r;
const h = H - margin.t - margin.b;

const plot = d3.select('.chart2')
	.append('svg')
		.attr('width', W)
		.attr('height', H)
	.append('g')
		.attr('class','plot')
		.attr('transform', `translate(${margin.l}, ${margin.t})`);

const plot1 = d3.select('.chart') 
     .append('svg')
     .attr('width', W)
     .attr('height', H)
     .append('g')
     .attr('transform',`translate(${margin.l}, ${margin.t})`);
plot1.append('g').attr('class', 'axis axis-x').attr('transform', `translate(0, ${h})`); //draw axis-x
plot1.append('g').attr('class','axis axis-y');// daw axis-y


//Shared global variables, such as indicator names and geo functions
let metadataMap;
let scaleColor = d3.scaleOrdinal();
const INTERNET_USER  = 'Individuals using the Internet (% of population)';
const GDP_CAPITA = 'GDP per capita (constant 2010 US$)';
const POPULATION_TO = 'Population, total';

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
		const InternetData = data.filter(function(d){
				return d.year === YEAR;
			}).filter(function(d){
				return d.series === INTERNET_USER;
			});
		const GdpData = data.filter(function(d){
				return d.year === YEAR;
			}).filter(function(d){
				return d.series === GDP_CAPITA;
			});
        const PopulationData = data.filter( function(d){
        	    return d.year === YEAR;
			}).filter(function(d){
				return d.series === POPULATION_TO;
		    });

		//Next, we should roll up these indicators with the GeoJSON data
		//The "rollup" operation will require data lookup, hence d3.map
		const internetMap = d3.map(InternetData, function(d){return d.countryCode});
		const gdpmap = d3.map(GdpData, function(d){return d.countryCode});
		//const populationchart = d3.map(PopulationData, function(d){return d.countryCode});
		geojson.features 
			.forEach(function(feature){
				const internetuser = internetMap.get(feature.properties.ISO_A3);
				const gdpuser = gdpmap.get(feature.properties.ISO_A3);
				//const population = populationchart.get(feature.properties.ISO_A3);
				feature.properties[INTERNET_USER] = internetuser?internetuser.value:null;
				feature.properties[GDP_CAPITA] = gdpuser?gdpuser.value:null;
				//feature.properties[POPULATION_TO] = population?population.value:null;
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
		drawScatter(data, plot1);

		console.log(data)

	});

function drawScatter(data, selection){

	/*const countries = data.map(function(d){
		const datum = {};
		datum.country = d.key;
		datum.countryCode = d.values[0].countryCode;
		datum.year = d.values[0].year;
		d.values.forEach(function(s){
			datum[s.series] = s.value;
		});
		return datum;
    });
    console.log(countries); */  
  
    const populationExtent = d3.extent(data, function(d){ return d[POPULATION_TO]});
	const gdpPerCapExtent = d3.extent(data, function(d){ return d[GDP_CAPITA]});
	const internetuserExtent = d3.extent(data, function(d){ return d[INTERNET_USER]});

	const scaleX = d3.scaleLog().domain(gdpPerCapExtent).range([0,w]);
	const scaleY = d3.scaleLog().domain(internetuserExtent).range([h,0]);
	const scaleSize = d3.scaleSqrt().domain(populationExtent).range([2,50]);

	const nodes = plot.selectAll('.node')
		.data(data, function(d){return d.key});	

	const nodesEnter = nodes.enter()
		.append('g')
		.attr('class', 'node');
	nodesEnter.append('circle');
	nodesEnter.append('text');

	//ENTER + UPDATE
	nodes.merge(nodesEnter)
		.transition()
		.attr('transform', function(d){
			const x = scaleX(d[GDP_CAPITA]);
			const y = scaleY(d[INTERNET_USER]);
			return `translate(${x}, ${y})`;
		});
	nodes.merge(nodesEnter)
		.select('circle')
		.transition()
		.attr('r', function(d){
			const r = scaleSize(d[POPULATION_TO]);
			return r;
		})	
	
		.style('fill-opacity', 0.3)
		.style('stroke', '#333')
		.style('stroke-width','2px')
		.style('fill', function(d){
		 const region = metadataMap.get(d.key).Region;
		 return scaleColor(region);
		});
	nodes.merge(nodesEnter)
		.select('text')
		.text(function(d){
			return d.key})
		.attr('text-anchor','middle')
		.style('fill', '#666')
		.style('font-size', '6px');

	//EXIT
	nodes.exit().remove();

	//Axes
	const axisX = d3.axisBottom()
		.scale(scaleX)
		.tickSize(-h);
	const axisY = d3.axisLeft()
		.scale(scaleY)
		.tickSize(-w);
	axisXNode.attr('transform',`translate(0, ${h})`)
		.transition()
		.call(axisX);
	axisYNode
		.transition()
		.call(axisY);
}			

function drawChoropleth(geojson, selection){

	//In this function we can derive a color ramp (i.e. scale) using infant mortality rate
	const maxGdpCapita = d3.max(geojson.features, function(d){
		return d.properties[GDP_CAPITA];
	});
	console.log(maxGdpCapita)

	const scaleColor = d3.scaleSqrt().domain([0, maxGdpCapita]).range(['white','#605245']);

	const nodes = selection.selectAll('.country')
		.data(geojson.features, function(d){return d.properties.ISO_A3});

	const nodesEnter = nodes.enter()
		.append('path').attr('class','country');

	nodes.merge(nodesEnter)
		.attr('d', path)
		.style('fill', function(d){
			return scaleColor(d.properties[GDP_CAPITA]);
		});

}

function drawCartogram(geojson, selection){

	//In this function we can derive a size scale using infant death
	const maxInternetuser = d3.max(geojson.features, function(d){
		return d.properties[INTERNET_USER];
	});

	console.log(maxInternetuser);

	//const scaleSize = d3.scaleSqrt().domain([0, maxInternetuser]).range([2,60])
	const scaleSize = d3.scaleLinear().domain([0, maxInternetuser]).range(['2','20']);


	const nodes = selection.selectAll('.country-circle')
		.data(geojson.features, function(d){return d.properties.ISO_A3});

	const nodesEnter = nodes.enter()
		.append('circle')
		.transition()
		.attr('class','country-circle');

	nodes.merge(nodesEnter)
		.filter(function(d){
			return d.properties[INTERNET_USER] > 0;
		})
		.each(function(d){

			const circleSize = scaleSize(d.properties[INTERNET_USER]);
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
                .select('#properties[INTERNET_USER]') //feature??
                .html(d.properties[INTERNET_USER])

                d3.select('.custom-tooltip')
                .select('#properties.ISO_A3')
                .html(d.properties.ISO_A3)

                d3.select('.custom-tooltip')
                .select('#properties[GDP_CAPITA]')
                .html(d.properties[GDP_CAPITA])
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
		    .style('stroke-width','0px')
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