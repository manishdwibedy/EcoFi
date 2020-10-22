function startApp() {
    initAddress()
    initContract()
    displayBlockLoop()
}

window.addEventListener('load', function () {

    if (
        typeof window !== "undefined" &&
        typeof window.web3 !== "undefined" &&
        typeof window.ethereum !== "undefined"
      ) {
        ethereum
          .enable()
          .then(function(accounts) {
            console.log(accounts);
          })
          .catch(function(reason) {
            // Handle error. Likely the user rejected the login:
            console.log(reason === "User rejected provider access");
          });
      
        web3 = new Web3(window.ethereum);
        initAddress();
      } 
    //   else {
    //     //We are on the browser OR the user is not running metamask
    //   const provider = new Web3.providers.HttpProvider(
    //       "https://rinkeby.infura.io/v3/<your infura id>"
    //     );
    //     web3 = new Web3(provider);
    //   }
    
})

function initAddress() {
    web3.eth.getAccounts((err, accounts) => {
        document.querySelector('#from').value = accounts[0]
    })
}

function displayBlockLoop() {
    web3.eth.getBlockNumber((err, blockNumber) => {
        if (blockNumber) {
            document.querySelector('#currentBlock').innerText = blockNumber.toString()
            setTimeout(displayBlockLoop, 2000)
        }
    })
}

// function initContract() {
//     const address = document.querySelector('#contract').value
//     const MessageSequence = web3.eth.contract(messageSequenceAbi);
//     const messageSequence = MessageSequence.at(address)

//     let event = messageSequence.MessageChange()
//     event.watch((error, result) => {
//         if (result) {
//             console.log("Event result: " + result.event)
//             let args = result.args
//             document.querySelector('#eventMessage').innerText = `Message changed to "${args['newMessage']}" from "${args['oldMessage']}" by account ${args['sender']}`
//         } else if (error) {
//             console.error("Event error: " + error)
//         }
//     })

//     listenForClicks(messageSequence)
// }

// function handleTransactionRequest(txHash) {
//     console.info(`Checking for transaction completion of ${txHash}`)
//     web3.eth.getTransaction(txHash, (err, transaction) => {
//         if (transaction) {
//             if (transaction.transactionIndex) {
//                 console.info(`Transaction complete ${txHash}`)
//                 document.querySelector('#statusMessage').innerText = `Mined on block ${transaction.blockNumber} with transaction index ${transaction.transactionIndex}`
//             } else {
//                 console.info(`Transaction not yet complete ${txHash}`)
//                 window.setTimeout(() => handleTransactionRequest(txHash), 2000)
//             }
//         } else if (err) {
//             console.log(`getTransaction callback error: ${err} /`)
//         }
//     })
// }

function listenForClicks(messageSequence) {
    let button = document.querySelector('#sendButton')

    button.addEventListener('click', function () {
        const transactionParameters = {
            nonce: '0x00', // ignored by MetaMask
            gasPrice: '0x09184e72a000', // customizable by user during MetaMask confirmation.
            gas: '0x5208', // customizable by user during MetaMask confirmation.
            to: '0xDA508097907811fa0D39B595F89ED2ca0A084166', // Required except during contract publications.
            from: document.querySelector('#from').value, // must match user's active address.
            value: '0x6F05B59D3B20000', // Only required to send ether to the recipient from the initiating external account.
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