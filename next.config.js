console.log("AddressTree");
console.log("AddressTree");
console.log("AddressTree");
console.log("AddressTree");
console.log("AddressTree");

// loads everything in secure-env into the provess.env
// ask for the magic word
// if its correct (as in the file decrypts successfully) proceed
// if not, stop the app from running

const secureEnv = require('secure-env');
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


rl.question("What's the magic word?: ", function(magicWord) {
    global.env = secureEnv({secret: magicWord});
    if(!global.env){
        console.log("Magic word is incorrect :/\n");
        process.exit(0);
    }

    rl.close();
});

rl.on("close", function() {
    console.log("======= Setup Complete =======");
});


module.exports = {
    env: global.env,
}