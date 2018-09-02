//Dynamically build DOM elements for exercise 2-1

const popByContinent = [
	{id:'Asia', pop:4436224000},
	{id:'Africa', pop: 1216130000},
	{id:'Europe', pop: 738849000},
	{id:'North America', pop: 579024000},
	{id:'South America', pop: 422535000},
	{id:'Australia', pop: 39901000},
	{id:'Antarctica', pop: 1106}
];

const totalPop = popByContinent.reduce(function(acc,val){ return acc+val.pop}, 0);
const format = d3.format('.1%');

//Build table
const table = d3.select('#table')
	.append('table')
	.attr('class','table');

table.append('thead')
	.attr('class','thead-dark')
	.append('tr')
	.selectAll('th')
	.data(['Continent', 'Population', 'Percentage'])
	.enter()
	.append('th')
	.html(function(d){return d;});

const rows = table.append('tbody')
	.selectAll('tr')
	.data(popByContinent)
	.enter()
	.append('tr');

rows.append('td')
	.html(function(d){return d.id})
rows.append('td')
	.html(function(d){return d.pop})
rows.append('td')
	.html(function(d){return format(d.pop/totalPop)});

//Build chart
const R = 200;
const pie = d3.pie()
	.value(function(d){return d.pop});
const arc = d3.arc()
	.innerRadius(10)
	.outerRadius(R)
	.padAngle(0.01);

d3.select('#chart')
	.append('svg')
	.attr('width', R*2 + 100)
	.attr('height', R*2 + 100)
	.append('g')
	.attr('transform',`translate(${R+50}, ${R+50})`)
	.selectAll('path')
	.data(pie(popByContinent))
	.enter()
	.append('path')
	.attr('d', arc)
	.attr('id', function(d){
		return d.data.id.split(' ').join('-').toLowerCase();
	})