const fs = require("fs/promises");

function readFile() {
  fs.readFile("data.txt")
    .then(function (fileData) {
      console.log("file parsing done!");
      console.log(fileData.toString());
      //return anotherAsyncOperation;
    })
    .then(function () {});

  console.log("Hi there!");
}

readFile();
