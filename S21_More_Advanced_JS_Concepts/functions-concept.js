// Using Functions & Default Parameters

function greatinUser(greatinPrefix, userName = "user") {
  console.log(greatinPrefix + " " + userName + "!");
}

greatinUser("Hi", "Max");
greatinUser("Hello");

//------------- Using Rest Parameters & The Spread Operator

function sumUp(...numbers) {
  let result = 0;

  for (const number of numbers) {
    result += number;
  }

  return result;
}

console.log(sumUp(1, 5, 10, 11, 20, 31));

const inputNumbers = [1, 5, 10, 11, 20, 31];

console.log(sumUp(...inputNumbers));

// we can use a function as a object like express and the app object 
// so we can add propery and methods their 
// by assigining it with function name 
// and the .nameofproperty then = the value 
// and also you can consele the function 
// to show the object by dir and log as following

console.log(sumUp);
console.dir(sumUp);
