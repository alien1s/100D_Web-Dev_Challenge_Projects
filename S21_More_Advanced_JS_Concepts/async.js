const fs = require("fs");

function readFile() {
  fs.readFile("data.text", function (error, fileData) {
    console.log("File parsing done!");
    console.log(fileData.toString());
  });

  console.log("Hi there!");
}

readFile();
