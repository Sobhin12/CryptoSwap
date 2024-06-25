const {Web3} = require("web3");

async function sendEther (){
    const web3 = new Web3("http://127.0.0.1:7545");

    const transact = await web3.eth.sendTransaction({
        from: "0xBD34Dd97Cd228e40fCAE80201Ecc67207aF3DAfe",
        to: "0x85c7C987400976dECc7a42De13ab16dF41EfB697",
        value: web3.utils.toWei("10","ether"),
    });

    console.log(transact);
}
sendEther();