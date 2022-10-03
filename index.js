// const chalk = require("chalk");

// console.log(chalk.red.inverse("Game guess number"));

// const readLine = require("readline").createInterface({
//   output: process.stdout,
//   input: process.stdin,
// });

// let count = 1;
// let randomNumber = Math.round(Math.random() * 10);

// const game = () => {
//   if (count <= 3) {
//     readLine.question(
//       chalk.green.bold("Enter number from 0 to 10\n"),
//       (userNumber) => {
//         userNumber = Number(userNumber);
//         if (userNumber !== NaN) {
//           if (userNumber === randomNumber) {
//             console.log("Congratulations! You win!");
//             readLine.close();
//           } else if (userNumber > randomNumber) {
//             console.log("Your number is bigger");
//             ++count;
//             game();
//           } else if (userNumber < randomNumber) {
//             console.log("Your number is less");
//             ++count;
//             game();
//           }
//         } else {
//           console.log("Enter number please");
//         }
//         console.log(`-----${count}-----`);
//       }
//     );
//   } else {
//     console.log("You lost. You spent all your tries");
//     console.log(chalk.green.bold(`Answer: ${randomNumber}`));
//     readLine.close();
//   }
// };

// game();

// ----------------------------------

const http = require("http");
const fs = require("fs");
const path = require("path");
const formidable = require('formidable');

const httpServer = http
  .createServer((request, response) => {
      if (request.url === "/") {
          if (request.method.toLowerCase() === 'post') {
              const form = formidable({
                  multiples: true
              })
              form.parse(request, (error, fields, files) => {
                  if (error) {
                      response.writeHead(400);
                      response.write(String(error));
                      response.end();
                  }
                //   response.end(JSON.stringify({
                //       fields, files
                //   }, null, 2))
                    sendResp(files.file.originalFilename, "text/html", response);
              })
            }
      console.log(request.url);
      //   response.write("Hi!");
    
      //   response.end();
    } else if (request.url === "/home") {
      response.write("Welcome to Hell");
      response.end();
    } else if (request.url === "/about") {
      response.write("Welcome to About");
      response.end();
    }
  })
  .listen(3000, () => {
    console.log("Server started on port 3000");
  });

function sendResp(url, contentType, res) {
  let file = path.join(__dirname, url);
  fs.readFile(file, (error, content) => {
    if (error) {
      res.writeHead(404);
      res.write("File not found");
      res.end();
    } else {
      res.writeHead(200, {
        "Content-Type": contentType,
      });
      res.write(content);
      res.end();
    }
  });
}
