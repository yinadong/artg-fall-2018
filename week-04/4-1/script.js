console.log('4-1');
console.log(d3)

//selection
d3.selectAll('.container')
  .style('height','700px')
  .style('border','1px solid black')
  .style('margin')

const blocks = d3.selectAll('.container')
  .select('.block');

console.log(blocks.nodes());
console.log(blocks.node());

const node = blocks.node();
console.log(node.clientWidth);
console.log(node.clientHeight);

block
  .style('width', '400px')
  .style('height', '300px')
  .style('background', 'blue')
  .attr('class', 'block-blue')
  .classed('block', true)

 //appending elments
 const newselection = block//selection
 //blocks//selection//
  .append('div')
  .classed('blcok-child', true)
  .style('width', '50%')
  .style('height', '50%')
  .style('background','red')

//Selection exercise

//In #container-4, draw a chromatic scale
const NUM_OF_INCREMENTS = 200;

for(let index = 0; index < NUM_OF_INCREMENTS; index+=1){
	d3.select('#container-4')
	.append('div');
}

d3.select('#container-4')
  .selectAll('div')
  .each(function(d,index){
  	const R = 178;
  	const G = index/NUM_OF_INCREMENTS * 178;
  	const B = index/NUM_OF_INCREMENTS * 178;

    d3.select(this)
  	  .style('height', '50%')
  	  .style('width', 100/NUM_OF_INCREMENTS + '%')
  	  .style('float','left')
  	  .style('background', 'rgb(' + R + ',' + G + ',' + B + ')')
  })

//make another .container <div>
//d
//Add a <svg> element with exactly the same size
 //.each(function()){
  //this function takes one elment from the selection at a time, and do something with
 // d3.select(this).style('background','purple')
////In #container-5, experiment with drawing <svg> elements
//circle, rect, line, text, <g>
const plot = d3.select('#container-5')
   .append('svg')
   .attr('width', 900)
   .attr('height',700)

 plot.append('circle')
   .attr('cx',200)
   .attr('cy',300)
   .attr('r',200)
   .style('fill','pink')
   .style('stroke','yellow')
   .style('stroke-width','2px')

 plot.append('circle')
   .attr('cx',200)
   .attr('cy',300)
   .attr('r',50)
   .style('fill','white')

plot.append('line')
  .attr('x1',900)
  //.attr('y1',-700)
  .attr('x2', -900)
  .attr('y2', 700)
  .style('stroke-width','2px')
  .style('stroke','purple')

const group = plot .append('g')

group
  .append('rect')
  .attr('x',0)
  .attr('y',0)
  .attr('width',300)
  .attr('height',100)

group
  .append('rect2')
  .attr('x',0)
  .attr('y',0)
  .attr('width',300)
  .attr('height',100) 
  .style('fill', 'gray')

 group
  .attr('transform', '')




