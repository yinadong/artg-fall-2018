//arr_num is an array of numbers
const arr_num = Array.from({length:100}).map(function(){
	return Math.random()*100;
});

//arr_obj is an array of objects
const arr_obj = Array.from({length:100}).map(function(){
	return {
		id: Math.random().toString(36),
		value: Math.random()*100,
		class: Math.random() > 0.5? 'foo':'bar'
	}
});

//1.0
console.group('1.0');
console.log(arr_num);
console.log('arr_num has ' + arr_num.length + ' elements');
/* YOUR CODE HERE: do the same for arr_obj */
console.log(arr_obj)
console.log('arr_obj has ' + arr_obj.length + ' objects')
console.groupEnd();



//1.1 array.forEach
console.group('1.1');

arr_num.forEach(function(d, i){
	//this function is executed once for each element in arr_num
	//argument "d" stands for each array element
	//argument "i" stands for the index (0, 1, 2, ...) of that element
	console.log(`The ${i}th element in arr_num is ${d}`);
});

/* For arr_obj, print out each element */
arr_obj.forEach(function(d, i){
	/* YOUR CODE HERE */
    console.log(`The ${i}th element in arr_obj is ${d}`);
});


/* A slight twist: for arr_obj, print out ONLY the .value property */
/* YOUR CODE HERE */
arr_obj.forEach(function(d, i){
  console.log(`The ${i}th element value in arr_obj is ${d.value}`);
})
// Bonus: can you use arr_obj.forEach to add up ALL OF THE VALUES? 

/*arr_obj.forEach(function(d,i){
  let sum = 0;
  for(let d = 0; d <= i; d++) {
	  sumvalue += d.value
  }
  return sum;
});
 console.log(arr_obj(sum))*/

//1.2 array.map
console.group('1.2');

//Note how arr_num.map() returns a new array, and this new array is assigned into a variable
const arr_num_half = arr_num.map(function(d){
	return d/2;
});
console.log(arr_num_half)
//Observe how this works for an array of objects
const arr_obj_half = arr_obj.map(function(d){
	return {
		id: d.id,
		value: d.value/2,
		class: d.class
	}
});

console.log(arr_obj_half);


//Can you transform arr_obj into JUST an array of the values?
/* YOUR CODE HERE */

const arr_obj_value_only = arr_obj.map(function(d){
	return {
		value: d.value
	}
});
console.log(arr_obj_value_only);

console.groupEnd();



//1.3 array.sort
console.group('1.3');

//Again, array.sort returns a new (sorted) array
const arr_num_sorted_ascending = arr_num.sort(function(a,b){
	return a - b;
});

const arr_num_sorted_descending = arr_num.sort(function(a,b){
	return b - a;
});

//Can you sort arr_obj based on the .value property?
const arr_obj_ascending = arr_obj.sort(function(a,b){
	return a.value - b.value;
});
console.log(arr_obj_ascending)

const arr_obj_descending = arr_obj.sort(function(a,b){
	return b.value - a.value;
});
console.log(arr_obj_descending)


console.groupEnd();



//1.4 array.filter
console.group('1.4');

//The following produces a filtered array from arr_num, with only values that are greater than 70
const arr_num_filtered = arr_num.filter(function(d){
	return d > 70;
});

console.log(arr_num_filtered)

//following the above example, can you produce a filtered array from arr_obj
//containing only those elements with class == 'foo'?
/* YOUR CODE HERE */
const arr_obj_filtered = arr_obj.filter(function(d){
	return d.class == 'foo';
});
console.log(arr_obj_filtered)

//2.1 d3.min
console.group('2.1');
const arr_num_min = d3.min(arr_num);
console.log(arr_num_min);

//An example of using the accessor
const arr_obj_min = d3.min(arr_obj, function(d){
	return d.value;
});
console.log(arr_obj_min);
console.groupEnd();


//2.2 d3.max

//Use d3.max to find the largest values in the arrays
/* YOUR CODE HERE */
console.group('2.2');
const arr_num_max = d3.max(arr_num);
console.log(arr_num_max);

const arr_obj_max = d3.max(arr_obj,function(d){
	return d.value
});
console.log(arr_obj_max);
console.groupEnd();
//2.3 d3.extent

//Use d3.extent to find the min-max range in the arrays
/* YOUR CODE HERE */
console.group('2.3');
const arr_num_extent = d3.extent(arr_num);
console.log(arr_num_extent);

const arr_obj_extent = d3.extent(arr_obj,function(d){
	return d.value
});
console.log(arr_obj_extent);
console.groupEnd();

//2.4 d3.mean
console.group('2.4');
const arr_num_mean = d3.mean(arr_num);
console.log(arr_num_mean);

const arr_obj_mean = d3.extent(arr_obj,function(d){
	return d.value
});
console.log(arr_obj_mean);
console.groupEnd();

//Use d3.mean to find the average of the arrays
/* YOUR CODE HERE */

console.group('2.5');
//2.4 d3.nest
const arr_obj_by_class = d3.nest()
	.key(function(d){ return d.class })
	.entries(arr_obj);
console.log(arr_obj_by_class);
console.groupEnd();




