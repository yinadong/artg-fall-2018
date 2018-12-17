console.log('Assignment 3');
3 * 4 + 2
console.log(3 * 4 + 2)
console.log(4.5 % 3)
console.log(92 / 0)
console.log(90 % 10)
console.log(3 && 0)
console.log((8 >= 8) || (10 < 9))
console.log ("8" * 9)
console.log("8" + 9)
console.log("8" === 8)
const number = 56;
console.log('a' + number + 'b');
/*
 * Question 1: no code necessary, 
 * but feel free to use this space as a Javascript sandbox to check your answers

 * Question 2: control structures 
 */
/*
	//2.1 
	/* YOUR CODE HERE a for... loop that logs 1 to 10 in reverse */
for(let i = 0; i < 10; i ++){
		console.log(10 - i);
	}	

	//2.2
	/* YOUR CODE HERE loop that increments from 0 to 500, but only prints out every 100 (i.e. 0, 100, 200, 300...)*/
//9.3 % 2 
for (let i= 0; i <= 500; i++){
	if (i% 100 === 0 ) {
		console.log(i);
		}
	}

	//2.3
const arr = [89, 23, 88, 54, 90, 0, 10];
	//Log out the content of this array using a for loop
	/* YOUR CODE HERE Write */ 
 for(let i=0; i< arr.length; i++){
 	console.log(arr[i]);
  }



/*
 * Question 3: no code necessary
 */

/*
 * Question 4: objects and arrays
 //Given a personnel database as follows:
//Ashley, instructor in the computer science department for 10 years
//Ben, instructor in the design department for 2 years
 //Carol, instructor in the design department for 3 years

//4.1
	//const instructors = undefined; /* YOUR CODE HERE */
const instructors = [
  {name:'Ashley', tenure:10},
  {name:'Ben', tenure:2},
  {name:'Carol', tenure:3}
 ];

console.log(instructors)
const instructor2 = [
];
	
//4.2 
	/* COMPLETE THE FUNCTION */
	/* function computeAvgTenure(nothing){
	//nothing

		return;
	}*/

function computeAvgTenure(l){
		//l is an array of objects
		let totalTenure = 0;

		for(let i = 0; i < l.length; i++){
			totalTenure += l[i].tenure
		}

		return totalTenure/l.length;
	}

	computeAvgTenure(instructors);

console.log(computeAvgTenure(instructors))

	//4.3
	/* YOUR CODE HERE */


