const {exec} = require("child_process");

function executeCommand(command) {
    exec(command, (error, stdout, stderr) =>{
      if (error) {
          console.error(`Executing error: ${error}`);
          
      }
      else if(stderr){
        console.error(`Command Error: ${stderr}`);
       
      }
        console.log(`Successful Execution: ${stdout}`);
    });
}

executeCommand('dir');
executeCommand('echo "Hello, Node.js!"');