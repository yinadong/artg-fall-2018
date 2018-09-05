# Week 3 Assignment: Javascript Basics

This week's assignment will help you gain a deeper understanding of the Javascript fundamentals discussed in class. You will practice with the following concepts:
- Javascript value types and operators
- Control structures: loops and conditional statements
- Functions
- Objects and arrays

Complete `script.js`, paying particular attention to the `/*YOUR CODE HERE*/` prompts.

## Quick note on the unfamiliar `{...}`
You might notice the somewhat exotic looking `{...}` around each question. We didn't cover this in class, but the curly braces create "block scopes" so that variables declared with `let` and `const` won't contaminate each other. For now, just think of them as mini-programs within a program.

## Question 1: value types and operators

Try to answer the following questions yourself, without immediately resorting to code. Afterwards, test your answer in the console. You do not have to complete any code.

What do the following expressions evaluate to?
1. `3 * 4 + 2`
2. `4.5 % 3`
3. `92 / 0`
4. `!(90 % 10)`
5. `3 && 0`
6. `(8 >= 8) || (10 < 9)`
7. `"8" * 9`
8. `"8" + 9`
9. `"8" === 8`
10. What output does the following code produce?
```
const number = 56;
console.log('a' + number + 'b');
```
11. Bonus: can you rewrite 10 as a template literal?

## Question 2: loops and conditional statements

### 2.1 
Write a for... loop that logs 1 to 10 in reverse

### 2.2
Write a for... loop that increments from 0 to 500, but only prints out every 100 (i.e. 0, 100, 200, 300...)
Hint: use a combination of `for` loop, `if` statement, and the `%` operator

### 2.3
Given an array, print out its content.
Hint: use `array.length` to set the boundary condition for the `for` loop

## Question 3: functions

### 3.1 (No code necessary; simply answer the following questions without resorting to Javascript first)
For the following program, answer the following questions:
- for the function `increment`, what are the arguments? What is the return value? Are there any side effects?
- What will the final `console.log()` statements produce? Is it what you expected?
```
function increment(v, n){
	//this function increments the v by n times

	for(let i = 0; i < n; i++){
		v += 1;
	}

	return v;
}

let initialValue = 10;
let finalValue = increment(initialValue, 10);

console.log(initialValue);
console.log(finalValue);
console.log(n);
```

## Question 4: Objects, Arrays, and Writing Your Own Function

Given a personnel database as follows:
- Ashley, instructor in the computer science department for 10 years
- Ben, instructor in the design department for 2 years
- Carol, instructor in the design department for 3 years

### 4.1
Convert this database into a Javascript data structure. Hint: it ought to be an array of objects.

### 4.2 
Write a function that takes in an array of persons, such as the one from 4.1, and return the average tenure (in years). 
Hint: think algorithmically. To compute the average tenure, you need to complete a number of steps
- Add up all the tenures (`for` loop might be useful)
- Divide the sum by the number of persons
- Return this value

### 4.3
Another person, Dan, just got added to the database. He is an instructor with 5 years of tenure, and works in the humanities department. 

Add Dan to the data structure created in 4.1 (using `array.push`), and recompute the average tenure. It should be easy--we have a function for that after all!



