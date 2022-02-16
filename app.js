const readline = require("readline");
const inputOutputHandler = require("./src/inputOutputHandler");

console.log(
  `
=================================================
       Welcome to Home Insulation Rater App
=================================================
Enter some data in the following format.
Then you will be prompted to enter query data.
Data and query sections are seperated with a new line.
When you are done entering user data, enter a new line. 
When you are done entering query data, enter 'control + c' to see the result. 

Data fomrat    =>   "<name>" "<country>/<province>/<city>" <rvalue>
Query fomrat   =>   "<name>" "<region>"

<region>: Can be <country> OR <country>/<province> OR  <country>/<province>/<city>

 =================
| Program Started |
 =================
> Enter user data (When done, enter a new line):`
);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", (line) => {
  inputOutputHandler.processUserInput(line);
}).on("close", () => {
  inputOutputHandler.prepareAndDisplayOutput();
});
