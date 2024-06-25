const { Web3 } = require("web3");

async function read() {
    const web3 = new Web3("http://127.0.0.1:7545");

    const ABI =
    [
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_a",
              "type": "uint256"
            }
          ],
          "name": "voter",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "lead",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        }
      ]

        const contractaddress = "0x5A2199461E5021c403261cf3af5981e827710D09";

        const contract = new web3.eth.Contract(ABI,contractaddress);
        // console.log(contract);

        const data = await contract.methods.voter(0).send({from: "0xBD34Dd97Cd228e40fCAE80201Ecc67207aF3DAfe"});
        console.log(data);
    
}
read();


