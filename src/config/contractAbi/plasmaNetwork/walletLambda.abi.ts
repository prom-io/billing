import {AbiItem} from 'web3-utils';
export const walletLambdaAbi: AbiItem[] = [
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "name": "registeredWallet",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "decimals",
    "outputs": [
      {
        "name": "",
        "type": "uint8"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "name": "lambdaWalletByEthAddress",
    "outputs": [
      {
        "name": "ethAddress",
        "type": "address"
      },
      {
        "name": "lambdaAddress",
        "type": "string"
      },
      {
        "name": "amount",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "name": "lambdaWalletByLambdaAddress",
    "outputs": [
      {
        "name": "ethAddress",
        "type": "address"
      },
      {
        "name": "lambdaAddress",
        "type": "string"
      },
      {
        "name": "amount",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "name": "processedRequests",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "name": "validators",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "validator",
        "type": "address"
      }
    ],
    "name": "ValidatorAdded",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "validator",
        "type": "address"
      }
    ],
    "name": "ValidatorRemoved",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "ethAddress",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "lambdaAddress",
        "type": "string"
      },
      {
        "indexed": false,
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "BalanceIncreased",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "ethAddress",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "lambdaAddress",
        "type": "string"
      },
      {
        "indexed": false,
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "BalanceDecreased",
    "type": "event"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_lambdaAddress",
        "type": "string"
      },
      {
        "name": "_txHash",
        "type": "string"
      },
      {
        "name": "_amount",
        "type": "uint256"
      }
    ],
    "name": "deposit",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_ethAddress",
        "type": "address"
      },
      {
        "name": "_lambdaAddress",
        "type": "string"
      }
    ],
    "name": "newWallet",
    "outputs": [
      {
        "name": "res",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_ethAddress",
        "type": "address"
      },
      {
        "name": "_amount",
        "type": "uint256"
      }
    ],
    "name": "balancePlusByEthereumAddress",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_ethAddress",
        "type": "address"
      },
      {
        "name": "_amount",
        "type": "uint256"
      }
    ],
    "name": "balanceMinusByEthereumAddress",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_ethAddress",
        "type": "address"
      },
      {
        "name": "_lambdaAddress",
        "type": "string"
      },
      {
        "name": "_amount",
        "type": "uint256"
      }
    ],
    "name": "balancePlus",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_ethAddress",
        "type": "address"
      },
      {
        "name": "_lambdaAddress",
        "type": "string"
      },
      {
        "name": "_amount",
        "type": "uint256"
      }
    ],
    "name": "balanceMinus",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_validator",
        "type": "address"
      }
    ],
    "name": "addValidator",
    "outputs": [
      {
        "name": "res",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_validator",
        "type": "address"
      }
    ],
    "name": "removeValidator",
    "outputs": [
      {
        "name": "res",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_lambdaAddress",
        "type": "string"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }
];
