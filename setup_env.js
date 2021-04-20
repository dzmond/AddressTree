console.log("======= Setting Up .env =======");
const { exec } = require("child_process");
const execSync = require('child_process').execSync;
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("What's gonna be the magic word playa?: ", function(magicWord) {
    execSync(`./node_modules/secure-env/dist/es5/lib/cli.js .env -s ${magicWord}`);
    rl.close();
});

rl.on("close", function() {
    console.log("======= .env Setup Complete =======");
    process.exit(0);
});
