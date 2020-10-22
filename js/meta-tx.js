
/*****************************************/
/* Detect the MetaMask Ethereum provider */
/*****************************************/

import detectEthereumProvider from '@metamask/detect-provider';

// this returns the provider, or null if it wasn't detected
const provider = await detectEthereumProvider();

if (provider) {
    startApp(provider); // Initialize your app
} else {
    console.log('Please install MetaMask!');
}

function startApp(provider) {
    // If the provider returned by detectEthereumProvider is not the same as
    // window.ethereum, something is overwriting it, perhaps another wallet.
    if (provider !== window.ethereum) {
        console.error('Do you have multiple wallets installed?');
    }
    // Access the decentralized web!
}

/**********************************************************/
/* Handle chain (network) and chainChanged (per EIP-1193) */
/**********************************************************/

// Normally, we would recommend the 'eth_chainId' RPC method, but it currently
// returns incorrectly formatted chain ID values.
let currentChainId = ethereum.chainId;

ethereum.on('chainChanged', handleChainChanged);

function handleChainChanged(_chainId) {
    // We recommend reloading the page, unless you must do otherwise
    window.location.reload();
}

/***********************************************************/
/* Handle user accounts and accountsChanged (per EIP-1193) */
/***********************************************************/

let currentAccount = null;
ethereum
    .request({ method: 'eth_accounts' })
    .then(handleAccountsChanged)
    .catch((err) => {
        // Some unexpected error.
        // For backwards compatibility reasons, if no accounts are available,
        // eth_accounts will return an empty array.
        console.error(err);
    });

// Note that this event is emitted on page load.
// If the array of accounts is non-empty, you're already
// connected.
ethereum.on('accountsChanged', handleAccountsChanged);

// For now, 'eth_accounts' will continue to always return an array
function handleAccountsChanged(accounts) {
    if (accounts.length === 0) {
        // MetaMask is locked or the user has not connected any accounts
        console.log('Please connect to MetaMask.');
    } else if (accounts[0] !== currentAccount) {
        currentAccount = accounts[0];
        // Do any other work!
    }
}

/*********************************************/
/* Access the user's accounts (per EIP-1102) */
/*********************************************/

// You should only attempt to request the user's accounts in response to user
// interaction, such as a button click.
// Otherwise, you popup-spam the user like it's 1999.
// If you fail to retrieve the user's account(s), you should encourage the user
// to initiate the attempt.

// const initialize = () => {
//     //Basic Actions Section
//     const onboardButton = document.getElementById('sendButton');

//     //Created check function to see if the MetaMask extension is installed
//     const isMetaMaskInstalled = () => {
//         //Have to check the ethereum binding on the window object to see if it's installed
//         const { ethereum } = window;
//         return Boolean(ethereum && ethereum.isMetaMask);
//     };

//     //------Inserted Code------\\
//     const onboarding = new MetaMaskOnboarding({ forwarderOrigin });

//     //This will start the onboarding proccess
//     const onClickInstall = () => {
//         onboardButton.innerText = 'Onboarding in progress';
//         onboardButton.disabled = true;
//         //On this object we have startOnboarding which will start the onboarding process for our end user
//         onboarding.startOnboarding();
//     };

//     const onClickConnect = async () => {
//         try { 
//           //Will Start the MetaMask Extension
//           await ethereum.request({ method: 'eth_requestAccounts' });
//         } catch (error) {
//           console.error(error);
//         }
//       };

//     const MetamaskClientCheck = () => {
//         //Now we check to see if Metmask is installed
//         if (!isMetaMaskInstalled()) {
//             //If it isn't installed we ask the user to click to install it
//             onboardButton.innerText = 'Click here to install MetaMask!';
//             //When the button is clicked we call th is function
//             onboardButton.onclick = onClickInstall;
//             //The button is now disabled
//             onboardButton.disabled = false;
//         } else {
//             //If MetaMask is installed we ask the user to connect to their wallet
//             onboardButton.innerText = 'Connect';
//             //When the button is clicked we call this function to connect the users MetaMask Wallet
//             onboardButton.onclick = onClickConnect;
//             //The button is now disabled
//             onboardButton.disabled = false;
//         }
//     };
//     MetamaskClientCheck();
//     //------/Inserted Code------\\
// };

const ethereumButton = document.querySelector('#sendButton');

ethereumButton.addEventListener('click', () => {
  //Will Start the metamask extension
  //ethereum.request({ method: 'eth_requestAccounts' });
  console.log("got here")
});

//document.getElementById('sendButton', connect);

const transactionParameters = {
    nonce: '0x00', // ignored by MetaMask
    gasPrice: '0x09184e72a000', // customizable by user during MetaMask confirmation.
    gas: '0x2710', // customizable by user during MetaMask confirmation.
    to: '0xb8e5D4398916d79803987Df41aaCf675f4e0b219', // Required except during contract publications.
    from: ethereum.selectedAddress, // must match user's active address.
    value: '0x00', // Only required to send ether to the recipient from the initiating external account.
    data:
        '0x7f7465737432000000000000000000000000000000000000000000000000000000600057', // Optional, but used for defining smart contract creation and interaction.
    chainId: 3, // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
};

// txHash is a hex string
// As with any RPC call, it may throw an error
const txHash = await ethereum.request({
    method: 'eth_sendTransaction',
    params: [transactionParameters],
});