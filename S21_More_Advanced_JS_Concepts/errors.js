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