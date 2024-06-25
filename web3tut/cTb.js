const { Web3 } = require("web3");

async function connect() {

        // Initialize Web3 instance with the provider URL
        const web3 = new Web3("http://127.0.0.1:7545");

        // Check if web3 instance is created successfully
        // console.log("Web3 instance created:", web3);

        const accounts = await web3.eth.getAccounts();
        console.log(accounts[0]);

        const balancewei = await web3.eth.getBalance(accounts[0]);
        console.log(balancewei);

        const balanceToeth =  web3.utils.fromWei(balancewei,"ether");
        console.log(balanceToeth)

        const balanceToeth1 =  web3.utils.toWei(balancewei,"ether");
        console.log(balanceToeth1);




}

connect();
