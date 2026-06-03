const fs = require("fs");

function readFile() {
  try {
    const fileData = fs.readFileSync("text.json");
  } catch {
    console.log("an error occured in reading file");
  }

  console.log("Hi there!");
}

readFile();

// When errors occur, you also always get some data (typically an object) with more information about that error
// (e.g. a message and a sequence of steps that lead to the error).
// You can get hold of that object / data like this:

function readFile2() {
  try {
    const fileData2 = fs.readFileSync("text.json");
  } catch (error) {
    console.log(error.message);
  }
  console.log("Hi there again!");
}

readFile2();

//You can also throw your own errors:

function readFile3() {
  try {
    const fileData3 = fs.readFileSync("text.json");
  } catch {
    throw {
      message:
        "Something went wrong!no such file or directory, open 'text.json'",
    };
  }
  console.log("Hi there again third!"); // this will not execute becuase throw stoped the f and output the error message
}

readFile3();
