window.addEventListener('load', function () {

    if (
        typeof window !== "undefined" &&
        typeof window.web3 !== "undefined" &&
        typeof window.ethereum !== "undefined"
      ) {
        ethereum
          .enable()
          .then(function(accounts) {
            if (accounts.length > 0){
                document.querySelector('#from').value = accounts[0];
                
            }
          })
          .catch(function(reason) {
            // Handle error. Likely the user rejected the login:
            console.log(reason === "User rejected provider access");
          });
      
        web3 = new Web3(window.ethereum);
        initAddress();
      }     
})

function initAddress() {
    web3.eth.getAccounts((err, accounts) => {
        if (accounts.length > 0){
            document.querySelector('#from').value = accounts[0];
            $('#walletConnected').modal('show');
        }
        else{
            document.querySelector('#from').value = "";
        }
        
        document.getElementById('result').innerText = 100;
        listenForClicks()
    })
}

function handleTransactionRequest(txHash) {
    console.info(`Checking for transaction completion of ${txHash}`)
    web3.eth.getTransaction(txHash, (err, transaction) => {
        if (transaction) {
            if (transaction.transactionIndex) {
                console.info(`Transaction complete ${txHash}`);
                $('#transitionCompleted').modal('show');
                // document.querySelector('#statusMessage').innerText = `Mined on block ${transaction.blockNumber} with transaction index ${transaction.transactionIndex}`
            } else {
                console.info(`Transaction not yet complete ${txHash}`)
                window.setTimeout(() => handleTransactionRequest(txHash), 2000)
            }
        } else if (err) {
            console.log(`getTransaction callback error: ${err} /`)
        }
    })
}

function listenForClicks() {
    let button = document.querySelector('#sendButton');
    let walletConnectedNext = document.querySelector('#walletConnectedNext');

    button.addEventListener('click', function () {
        $('#emailSubscription').modal('show');
    });
    
    button.addEventListener('click', function () {
        const val = parseFloat(document.querySelector('#calc').value);
        const weiValue = val * 10**18;
        const transactionParameters = {
            nonce: '0x00', // ignored by MetaMask
            gasPrice: '0x09184e72a000', // customizable by user during MetaMask confirmation.
            gas: '0x5208', // customizable by user during MetaMask confirmation.
            to: '0xDA508097907811fa0D39B595F89ED2ca0A084166', // Required except during contract publications.
            from: document.querySelector('#from').value, // must match user's active address.
            value: '0x' + weiValue.toString(16), // Only required to send ether to the recipient from the initiating external account.
            // data: '0x7f7465737432000000000000000000000000000000000000000000000000000000600057', // Optional, but used for defining smart contract creation and interaction.
            chainId: 3, // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
        };
        

        web3.eth.sendTransaction(transactionParameters, function(err, transactionHash) {
            if (err) { 
                console.log(err); 
            } else {
                console.log(transactionHash);
            }
        });
    })
}