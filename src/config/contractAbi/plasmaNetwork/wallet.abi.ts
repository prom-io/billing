import {AbiItem} from 'web3-utils';
export const walletAbi: AbiItem[] = [
          {
            "constant": true,
            "inputs": [
              {
                "name": "",
                "type": "address"
              }
            ],
            "name": "isWhiteListed",
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
            "name": "wallets",
            "outputs": [
              {
                "name": "owner",
                "type": "address"
              },
              {
                "name": "balance",
                "type": "uint256"
              },
              {
                "name": "siaBalance",
                "type": "uint256"
              },
              {
                "name": "exists",
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
                "name": "owner",
                "type": "address"
              },
              {
                "indexed": false,
                "name": "sum",
                "type": "uint256"
              }
            ],
            "name": "BalanceCreated",
            "type": "event"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": false,
                "name": "owner",
                "type": "address"
              },
              {
                "indexed": false,
                "name": "sum",
                "type": "uint256"
              }
            ],
            "name": "DepositCreated",
            "type": "event"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": false,
                "name": "owner",
                "type": "address"
              },
              {
                "indexed": false,
                "name": "currentSum",
                "type": "uint256"
              },
              {
                "indexed": false,
                "name": "replenishmentSum",
                "type": "uint256"
              }
            ],
            "name": "BalanceEvent",
            "type": "event"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": false,
                "name": "dataValidator",
                "type": "address"
              },
              {
                "indexed": false,
                "name": "serviceNode",
                "type": "address"
              },
              {
                "indexed": false,
                "name": "sum",
                "type": "uint256"
              }
            ],
            "name": "ExtendFileStore",
            "type": "event"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": false,
                "name": "from",
                "type": "address"
              },
              {
                "indexed": false,
                "name": "to",
                "type": "address"
              },
              {
                "indexed": false,
                "name": "sum",
                "type": "uint256"
              },
              {
                "indexed": false,
                "name": "sig",
                "type": "bytes"
              },
              {
                "indexed": false,
                "name": "message",
                "type": "bytes32"
              }
            ],
            "name": "TransferTo",
            "type": "event"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": false,
                "name": "from",
                "type": "address"
              },
              {
                "indexed": false,
                "name": "to",
                "type": "address"
              },
              {
                "indexed": false,
                "name": "sumEther",
                "type": "uint256"
              },
              {
                "indexed": false,
                "name": "sumSia",
                "type": "uint256"
              },
              {
                "indexed": false,
                "name": "sig",
                "type": "bytes"
              },
              {
                "indexed": false,
                "name": "message",
                "type": "bytes32"
              }
            ],
            "name": "TokenSwap",
            "type": "event"
          },
          {
            "constant": false,
            "inputs": [
              {
                "name": "_owner",
                "type": "address"
              },
              {
                "name": "_sum",
                "type": "uint256"
              }
            ],
            "name": "initWallet",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "constant": false,
            "inputs": [
              {
                "name": "_owner",
                "type": "address"
              },
              {
                "name": "_sum",
                "type": "uint256"
              }
            ],
            "name": "balanceReplenishment",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "constant": false,
            "inputs": [
              {
                "name": "_owner",
                "type": "address"
              },
              {
                "name": "_sum",
                "type": "uint256"
              }
            ],
            "name": "balanceConsumption",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "constant": false,
            "inputs": [
              {
                "name": "_dataValidator",
                "type": "address"
              },
              {
                "name": "_serviceNode",
                "type": "address"
              },
              {
                "name": "_sum",
                "type": "uint256"
              }
            ],
            "name": "extendFileStore",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "constant": false,
            "inputs": [
              {
                "name": "_from",
                "type": "address"
              },
              {
                "name": "_to",
                "type": "address"
              },
              {
                "name": "_sum",
                "type": "uint256"
              },
              {
                "name": "_sig",
                "type": "bytes"
              },
              {
                "name": "_message",
                "type": "bytes32"
              }
            ],
            "name": "transferTo",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "constant": false,
            "inputs": [
              {
                "name": "_from",
                "type": "address"
              },
              {
                "name": "_to",
                "type": "address"
              },
              {
                "name": "_sumEther",
                "type": "uint256"
              },
              {
                "name": "_sumSia",
                "type": "uint256"
              },
              {
                "name": "_sig",
                "type": "bytes"
              },
              {
                "name": "_message",
                "type": "bytes32"
              }
            ],
            "name": "swapToken",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "constant": false,
            "inputs": [
              {
                "name": "_dataSell",
                "type": "address"
              },
              {
                "name": "_dataUpload",
                "type": "address"
              },
              {
                "name": "_accountManage",
                "type": "address"
              }
            ],
            "name": "setWhiteList",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [
              {
                "name": "_owner",
                "type": "address"
              }
            ],
            "name": "checkExists",
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
                "name": "_owner",
                "type": "address"
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