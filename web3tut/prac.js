const { Web3 } = require("web3");

var web3 = new Web3("http://127.0.0.1:7545"); //initial provider

console.log(Web3.version);
console.log(web3.version);  //should work need to check it

console.log(Web3.utils);
console.log(web3.utils);//works

web3.setProvider("") // to change provider      now what is provider??

