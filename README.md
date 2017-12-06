# Hello World for MetaMask

A simple hello world for testing metamask

## Building / Running dApp

### Prerequisites

Make sure npm is installed. Tested with version 3.5.2 (pretty old, maybe a year old - will test newer when I upgrade)

### Steps to run after npm is available (from the project root):

```
npm install
npm run dev
```

The `npm install` step will create a directory in the project root `node_modules`

The `npm run dev` step will startup a local server. It will puke out something like:

```
[0000] info  Server running at http://127.0.0.1:9000/ (connect)
[0000] info  LiveReload running on 35729
```

Then navigate to [http://127.0.0.1:9000/examples/] (or whatever your machine's IP is set to)

## Building / Deploying Solidity Contract

The contract is already deployed on the Ropsten test network here: (0xF85D9E6a4B26C973695ab321018c7a66bfE7653E)[https://ropsten.etherscan.io/address/0xF85D9E6a4B26C973695ab321018c7a66bfE7653E]

But you can deploy it using the instructions here: `sol/transfer_counter.sol` as per the middle bit of (this tutorial)[[https://medium.com/@merunasgrincalaitis/the-ultimate-end-to-end-tutorial-to-create-and-deploy-a-fully-descentralized-dapp-in-ethereum-18f0cf6d7e0e]] - search for_"So go to the Remix IDE and paste the contract"_ to find the right section.

## Links

A couple of pages with useful stuff:

[https://medium.com/metamask/calling-a-smart-contract-with-a-button-d278b1e76705]

## Addresses used in this example

#### Sender - Will 1:
https://ropsten.etherscan.io/address/0x36796F3a5CC9595D2D7BC8bb762D7395581A46E3

#### Sender - Will 2:
https://ropsten.etherscan.io/address/0xA296A3aC56337690f3b07bEbc0bccC9d751136Dd

#### Contract:
https://ropsten.etherscan.io/address/0xF85D9E6a4B26C973695ab321018c7a66bfE7653E
