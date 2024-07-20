const { Web3}  = require("web3");
const fs = require('fs');

async function read() {
    //const web3 = new Web3("https://eth-sepolia.g.alchemy.com/v2/PFocZ8GDXRTizf2h9yAO2XjoycWYbdWk");
    const web3 =  new Web3("http://127.0.0.1:7545");
      
const abiData = fs.readFileSync('C:\\Users\\sobhi\\OneDrive\\Desktop\\truffle\\CryptoSwap\\build\\contracts\\pool.json');
const abi = JSON.parse(abiData).abi;

const abiData2 = fs.readFileSync('C:\\Users\\sobhi\\OneDrive\\Desktop\\truffle\\CryptoSwap\\build\\contracts\\token1.json');
const abi2 = JSON.parse(abiData2).abi;

const abiData3 = fs.readFileSync('C:\\Users\\sobhi\\OneDrive\\Desktop\\truffle\\CryptoSwap\\build\\contracts\\token2.json');
const abi3 = JSON.parse(abiData3).abi;

        const contractaddress1 = "0xE5BDeA7fa0f31d9A3ffAdE290919b824642fb0da"; //lp
        const contractaddress2 = "0xe5B753563CD53571faB00ae003A245cAE34cb7be"; //token1
        const contractaddress3 = "0xb560a5aAd55a04e1B393a37D6bcc844f07422313"; //token2

        const lp = new web3.eth.Contract(abi,contractaddress1); // for liquiditypool.sol
        const token1 = new web3.eth.Contract(abi2,contractaddress2);
        const token2 = new web3.eth.Contract(abi3,contractaddress3);
        //console.log(lp);

        // when user clicks mint button to add tokens adder function is called
        // const newAccount = web3.eth.accounts.create();

// Log the new account details
//console.log('New Account Address:', newAccount.address);
//console.log('New Account Private Key:', newAccount.privateKey);

// Add the new account to the wallet
web3.eth.handleRevert = true;
  web3.eth.accounts.wallet.add( (('0x240f81a4cb4aefd449f3b5d8ac76bded3313d18d4f8fd6076b480606a65557cf')) );
                                 
  function listWalletAccounts() {
    const wallet = web3.eth.accounts.wallet;
    console.log('Wallet contains the following accounts:');
    for (let i = 0; i < wallet.length; i++) {
        console.log(`Account ${i + 1}: ${wallet[i].address}`);
    }
}


// List the accounts
listWalletAccounts();
let c = "0xfC73B561B642fBeCA9D1F9a0B56D0273aD0D5Df9"
 
         const data1 = await token1.methods.adder().send({from: c});
         const data2 = await token2.methods.adder().send({from: c});
         console.log(data1);
         console.log(data2);

         const data3 = await token1.methods.balance_caller().call({from: c});
         const data4 = await token2.methods.balance_caller().call({from: c});
         console.log(data3);
         console.log(data4);


        // // // // when user provides liquidity
        // // //     //calls reqcall to find the correct amount
        // //       let x =1; // need to be taken as input
            const data6 = await token1.methods.approve(contractaddress1,"148000000000000000000").send({from: c}); //need to figure out what to be given in send
            const data7 = await token2.methods.approve(contractaddress1,"148000000000000000000").send({from: c}); //need to figure out what to be given in send

        //      console.log(data6);
        //      console.log(data7); 1155;
        //     //calls liquidityproviders(uint c1, uint c2)
             let c1 =2;    // need to be taken as input
             let c2 =2;    // need to be taken as input

             const senderAddress = c;

async function provideLiquidity() {
    // Enable handleRevert for detailed errors
    web3.eth.handleRevert = true;

    try {
        // Simulate the transaction
        await lp.methods.liquidityproviders(c1, c2).call({ from: senderAddress });
        console.log("Simulation successful, sending transaction...");

        // Estimate Gas
        const gasEstimate = await lp.methods.liquidityproviders(c1, c2).estimateGas({ from: senderAddress });
        console.log("Estimated Gas: ", gasEstimate);

        // Send Transaction
        const d1 = await lp.methods.liquidityproviders(c1, c2).send({ from: senderAddress, gas: gasEstimate });
        return d1;
    } catch (error) {
        console.error("Error: ", error.message);
    }
}



      // const data12 = lp.methods.accountBalance().call();
      // console.log(data12[0]);
             

                    
            // let am=2;
            // async function trade_C1ForC2() {
            //     // Enable handleRevert for detailed errors
            //     web3.eth.handleRevert = true;
            
            //     try {
            //         // Simulate the transaction
            //         await lp.methods.trade_C1ForC2(am).call({ from: senderAddress });
            //         console.log("Simulation successful, sending transaction...");
            
            //         // Estimate Gas
            //         const gasEstimate = await lp.methods.trade_C1ForC2(am).estimateGas({ from: senderAddress });
            //         console.log("Estimated Gas: ", gasEstimate);
            
            //         // Send Transaction
            //         await lp.methods.trade_C1ForC2(am).send({ from: senderAddress, gas: gasEstimate });
            //         console.log("Trade successful");
            //     } catch (error) {
            //         console.error("Error: ", error.message);
            //     }
            // }
            // trade_C1ForC2();

//  const d = lp.methods.accountBalance().call({ from: senderAddress });
//  console.log(d[0]);
 
async function accountBalance() {
                // Enable handleRevert for detailed errors
                web3.eth.handleRevert = true;
            
                try {
                    // Simulate the transaction
                    const data = await lp.methods.accountBalance().call({ from: senderAddress });
                    console.log(data[0]);
                    console.log(data[1]);
                    console.log(data[2]);
            
                    // Estimate Gas
                    const gasEstimate = await lp.methods.accountBalance().estimateGas({ from: senderAddress });
                    console.log("Estimated Gas: ", gasEstimate);
            
                    // Send Transaction
                    await lp.methods.accountBalance().call({ from: senderAddress, gas: gasEstimate });
                    console.log("Trade successful");
                } catch (error) {
                    console.error("Error: ", error.message);
                }
            }
            accountBalance();


            async function getPublicVariable() {
                try {
                    const result = await lp.methods.balanceOf(c).call({from: c});
                    return result;
                } catch (error) {
                    console.error('Error fetching public variable:', error);
                }
            }
            

            provideLiquidity().then(result => {
                console.log('First function result:', result);
                return getPublicVariable();
            }).then(result => {
                console.log('Second function result:', result);})

          // async function trade_C2ForC1() {
          //     // Enable handleRevert for detailed errors
          //     web3.eth.handleRevert = true;
          
          //     try {
          //         // Simulate the transaction
          //         await lp.methods.trade_C2ForC1(1).call({ from: senderAddress });
          //         console.log("Simulation successful, sending transaction...");
          
          //         // Estimate Gas
          //         const gasEstimate = await lp.methods.trade_C2ForC1(1).estimateGas({ from: senderAddress });
          //         console.log("Estimated Gas: ", gasEstimate);
          
          //         // Send Transaction
          //         await lp.methods.trade_C2ForC1(1).send({ from: senderAddress, gas: gasEstimate });
          //         console.log("Trade successful");
          //     } catch (error) {
          //         console.error("Error: ", error.message);
          //     }
          // }
          // trade_C2ForC1();

              //Need to send gas else throws error
           
}
read();