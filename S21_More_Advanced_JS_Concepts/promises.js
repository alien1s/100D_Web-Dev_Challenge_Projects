const fs = require("fs/promises");

// function readFile() {
//   fs.readFile("data.txt")
//     .then(function (fileData) {
//       console.log("file parsing done!");
//       console.log(fileData.toString());
//       //return anotherAsyncOperation;
//     })
//     .then(function () {})
//     .catch(function (error) {
//       console.log(error);
//     });

//   console.log("Hi there!");
// }

// readFile();

function readFile2() {
  fs.readFile("dataa.txt")
    .then(function (fileData) {
      console.log("file parsing done!");
      console.log(fileData.toString());
      //return anotherAsyncOperation;
    })
    .then(function () {})
    .catch(function (error) {
      console.log(error);
    });

  console.log("Hi there!");
}

readFile2();