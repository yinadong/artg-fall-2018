console.log('Assignment 4');
console.log(d3)

//Append a <svg> element to .chart, and set its width and height attribute to be the same as .chart
//Hint: first, you have to find the width and height of .chart. See example for width below
const width = d3.select('.chart').node().clientWidth;
//const height = 0;/* YOUR CODE HERE */
const height = d3.select('.chart').node().clientHeight;
console.log(d3.select('.chart').node().clientWidth);
console.log(d3.select('.chart').node().clientHeight);
//append svg
//Then append the following elements under <svg>:
const plot = d3.select('.chart')
   .append('svg')
   .attr('width',width)
   .attr('height',height)

///Horizontal and vertical grid lines, spaced 50px apart
//Hint: use a loop to do this

for(let x = 0; x < width; x+= 50){
  plot.append('line')
     .attr('x1',x)
     .attr('x2',x)
     .attr('y1',0)
     .attr('y2',height)
     .style('fill','black')
     .style('stroke', 'black')
     .style('stroke-width','2px')
}
for(let y = 0; y < height; y+= 50){
  plot.append('line')
     .attr('y1',y)
     .attr('y2',y)
     .attr('x1',0)
     .attr('x2',width)
     .style('fill','black')
     .style('stroke', 'black')
     .style('stroke-width','2px')
}
const group = plot.append('g')
	.attr('class','group')

//Circle, radius 50px, center located at (50,50)
group
  .append('circle')
  .attr('cx',50)
  .attr('cy',50)
  .attr('r', 50)
  .node("text")
  
    
   
//Another circle, radius 75px, center located at (300,200)
//Do this without setting the "cx" and "cy" attributes
group
  .append('circle')
  .attr('cx',300)
  .attr('cy',200)
  .attr('r', 75)
  .style('fill','pink')
  
d3.select('.group')
  .append('text')
  .text('300,200')
  .attr('x',300)
  .attr('y',200)

d3.select('.group')
  .append('text')
  .text('50,50')
  .attr('x',50)
  .attr('y',50)
  .style('fill','white')

//A rectangle, offset from the left edge by 400px and anchored to the bottom
//with a width of 50px and a height of 70px
plot.append('rect')
  .attr('x',400)
  .attr('y',430)
  .attr('width',50)
  .attr('height',70)
  .style('fill','rgba(50,50,50)')

//Label the centers of the two circles with their respective coordinates

//Give the <rect> element a fill of rgb(50,50,50), and no stroke
//Do this without using CSS


//Give the two <circle> elements no fill, and a 2px blue outline
//Do this by giving them a class name and applying the correct CSS

//Uncomment the following block of code, and see what happens. Can you make sense of it?
d3.selectAll('circle')
	.transition()
	.duration(3000)
	.attr('r', 200);