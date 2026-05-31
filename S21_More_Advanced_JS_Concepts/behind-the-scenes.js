const hobbies = ["Sports", "Cooking"]; // the variable here are a pointer (address) to the array is stored
const age = 32; // the value itself stord in the variable

hobbies.push("Reading"); //the address of the array dosen't change

// hobbies = ["Coding", "Sleeping"];  // not allowed new address is stored

console.log(hobbies); //

// Primitive values : numbers, strings, booleans, & more : like (undefined) > they are realy primitive it stord in abasic kind of computer memmory
// Refrance values : Objects-arr (stored in different kind of computer memmory than primitive values are => simply the objects tend to be too complex and big ) => and because they tend to be realy complex they are stored such unnecessary copies of object are avoided

const person = { age: 32 };

function getAdultYears(p) {
  //   p.age -= 18;
  //   return p.age;
  //this code above force an implication of changing the value of the age in person object because the the p is when accept the person as value and hence the person are refrance value so it just the address so js take this code and apply it in the same object in the memmory
  // the solution will be
  return p.age - 18; // which is here just call the age value and insert it in the eq.
}

console.log(getAdultYears(person));
console.log(person);

// you can use this code but by accepting object notatin into the function execution

function getAdultYears2(p) {
  p.age -= 18;
  return p.age;
  //this code above force an implication of changing the value of the age in person object because the the p is when accept the person as value and hence the person are refrance value so it just the address so js take this code and apply it in the same object in the memmory
  // the solution will be
  //return p.age - 18; // which is here just call the age value and insert it in the eq.
}

console.log(getAdultYears2({ age: person.age }));
console.log(person);

// you can also use the (...) operator

function getAdultYears3(p) {
  p.age -= 18;
  return p.age;
  //this code above force an implication of changing the value of the age in person object because the the p is when accept the person as value and hence the person are refrance value so it just the address so js take this code and apply it in the same object in the memmory
  // the solution will be
  //return p.age - 18; // which is here just call the age value and insert it in the eq.
}

console.log(getAdultYears3({ ...person }));
console.log(person);
