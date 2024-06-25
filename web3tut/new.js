const {Web3} = require('web3');
const fs = require('fs');

async function init() {
    const apiKey = 'PFocZ8GDXRTizf2h9yAO2XjoycWYbdWk';
    const alchemyUrl = `https://eth-sepolia.g.alchemy.com/v2/${apiKey}`;
    const web3 = new Web3(alchemyUrl);

    // Check if the provider is correctly initialized
    if (!web3.currentProvider) {
        console.error('Failed to initialize Web3 provider. Please check your Alchemy URL and API key.');
        return;
    }

    const abiPool = JSON.parse(fs.readFileSync('C:\\Users\\sobhi\\OneDrive\\Desktop\\truffle\\build\\contracts\\pool.json')).abi;
    const abiToken1 = JSON.parse(fs.readFileSync('C:\\Users\\sobhi\\OneDrive\\Desktop\\truffle\\build\\contracts\\token1.json')).abi;
    const abiToken2 = JSON.parse(fs.readFileSync('C:\\Users\\sobhi\\OneDrive\\Desktop\\truffle\\build\\contracts\\token2.json')).abi;

    const contractAddressPool = '0x4d3c338DaB31ec9C508750e28AE41bb0505AccEF';
    const contractAddressToken1 = '0x0FE4733c9b297e11254c627CaDacAcC2d128588B';
    const contractAddressToken2 = '0x02F06B8782b6d177Ae54c7E76D135141d33bfC64';

    const lp = new web3.eth.Contract(abiPool, contractAddressPool);
    const token1 = new web3.eth.Contract(abiToken1, contractAddressToken1);
    const token2 = new web3.eth.Contract(abiToken2, contractAddressToken2);

    // Add your account
    const account = web3.eth.accounts.wallet.add('0x53010872b20ee8a3e0c186a9d61761aee7f696364ca246fff337bd8dcad175fd');
    const senderAddress = account.address;

    function listWalletAccounts() {
        const wallet = web3.eth.accounts.wallet;
        console.log('Wallet contains the following accounts:');
        for (let i = 0; i < wallet.length; i++) {
            console.log(`Account ${i + 1}: ${wallet[i].address}`);
        }
    }

    listWalletAccounts();

    async function sendTransaction(contract, method, args, from) {
        try {
            const gasEstimate = await contract.methods[method](...args).estimateGas({ from });
            console.log(`Estimated gas for ${method}: ${gasEstimate}`);

            const tx = {
                from,
                to: contract.options.address,
                data: contract.methods[method](...args).encodeABI(),
                gas: gasEstimate + 50000 // Adding a buffer to the gas estimate
            };

            const signedTx = await web3.eth.accounts.signTransaction(tx, account.privateKey);
            const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
            console.log(`${method} transaction receipt:`, receipt);
            return receipt;
        } catch (error) {
            console.error(`Error sending transaction for method ${method}:`, error.message);
            if (error.receipt) {
                console.error('Transaction receipt:', error.receipt);
            }
            throw error;
        }
    }

    try {
        // Call adder method on both tokens
        const data1 = await sendTransaction(token1, 'adder', [], senderAddress);
        const data2 = await sendTransaction(token2, 'adder', [], senderAddress);
        console.log('Adder result for token1:', data1);
        console.log('Adder result for token2:', data2);

        // Call balance_caller method on both tokens
        const balance1 = await token1.methods.balance_caller().call({ from: senderAddress });
        const balance2 = await token2.methods.balance_caller().call({ from: senderAddress });
        console.log('Balance caller result for token1:', balance1);
        console.log('Balance caller result for token2:', balance2);

        // // Approve tokens for liquidity pool contract
        // const approveAmount = web3.utils.toWei('148', 'ether'); // adjust amount as needed
        // const approve1 = await sendTransaction(token1, 'approve', [contractAddressPool, approveAmount], senderAddress);
        // const approve2 = await sendTransaction(token2, 'approve', [contractAddressPool, approveAmount], senderAddress);
        // console.log('Approve result for token1:', approve1);
        // console.log('Approve result for token2:', approve2);

        // // Provide liquidity
        // const provideLiquidity = await sendTransaction(lp, 'liquidityproviders', [2, 2], senderAddress);
        // console.log('Provide liquidity result:', provideLiquidity);

        // // Fetch account balance from liquidity pool contract
        // const accountBalance = await lp.methods.accountBalance().call({ from: senderAddress });
        // console.log('Account Balance:', accountBalance);

        // // Fetch balanceOf from liquidity pool contract
        // const publicVariable = await lp.methods.balanceOf(senderAddress).call({ from: senderAddress });
        // console.log('Balance Of:', publicVariable);
    } catch (error) {
        console.error('Error during contract interaction:', error.message);
    }
}

init();
