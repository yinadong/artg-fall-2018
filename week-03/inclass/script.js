console.log('Hello world');
 //objects
 const person = {
 	name: "Yinan",
 	age: 26,
 	student: true,
 	department:{
 		name:"camd",
 	studentcount: 16,
   }
 };


const department1 = {
	name:'camd',
	studentcount: 20
}

const person2 = {
	department: department1

}

//Add a prooert
person.city = "Hangzhou city";

//modify
person.age = 27
person. student = !(person.student),
console.log(person.department.studentcount);

// a simple array
const arr1 = [3, 4, 5, 6, -1];
console.log('simple array has a length of ' + arr1.length)

arr1.push(10);
//indices start at 0, ends at length-1
console.log(arr1[0]);

//if..else
const a = 9 > 7;
if (a) {
	console.log( '9 greater than 7 is true')
}else{
	console.log( '9 greater than 7 is false')
}

for (let i=0; i< 10; i++){
  console.log(i+1);

} 

 //how to solve the library problem
/*
 for ()
 */
console.log ('----------')

 const arr2 =[67, 8913, -100];
 let sum=0;
 for(let i=0; i<arr2.length; i++){
 	sum +=(arr2{i});
 };
 console.log('sum of arr2 is' + sum);

const sum = {
	bucketQuartile1:0,
	bucketQquartile2:0,
	bucketQquartile3:0,
	bucketQquartile4:0
};
for (let i=0; i<1000; i++){
	const num = Math.random()
	if(num <0.25){
		sums.bucketQuartile1 += 1;
	}else if(num <0.5){
		sums.bucketQquartile2 += 1;
	}else if (num <0.75){
		sums.bucketQquartile3 +=1;
	}else{
		sums.bucketQquartile4 +=1;
	}
};
console.log("the numbers in each bucket is: "
	+ sums.bucketQquartile1 + "/"
	+ sums.bucketQquartile2 + "/"
	+ sums.bucketQquartile3 + "/"
	+ sums.bucketQquartile4 + "/"
);


