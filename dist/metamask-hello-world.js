(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.UserInput = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
})

function initAddress() {
    web3.eth.getAccounts((err, accounts) => {
        document.querySelector('#from').value = accounts[0];
        document.getElementById('result').innerText = 0;
        listenForClicks()
    })
}

function handleTransactionRequest(txHash) {
    console.info(`Checking for transaction completion of ${txHash}`)
    web3.eth.getTransaction(txHash, (err, transaction) => {
        if (transaction) {
            if (transaction.transactionIndex) {
                console.info(`Transaction complete ${txHash}`)
                document.querySelector('#statusMessage').innerText = `Mined on block ${transaction.blockNumber} with transaction index ${transaction.transactionIndex}`
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
    let button = document.querySelector('#sendButton')

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
},{}]},{},[1])(1)
});
//# sourceMappingURL=metamask-hello-world.js.map
