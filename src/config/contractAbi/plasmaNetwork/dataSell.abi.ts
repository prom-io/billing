import {AbiItem} from 'web3-utils';
export const dataSellAbi: AbiItem[] = [
  {
    "constant": true,
    "inputs": [],
    "name": "accountManage",
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
    "inputs": [],
    "name": "wallet",
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
    "inputs": [],
    "name": "dataUpload",
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
    "name": "selledData",
    "outputs": [
      {
        "name": "fileId",
        "type": "string"
      },
      {
        "name": "dataValidator",
        "type": "address"
      },
      {
        "name": "dataMart",
        "type": "address"
      },
      {
        "name": "dataOwner",
        "type": "address"
      },
      {
        "name": "sum",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "name": "_wallet",
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
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "fileId",
        "type": "string"
      },
      {
        "indexed": false,
        "name": "dataValidator",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "dataMart",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "dataOwner",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "sum",
        "type": "uint256"
      }
    ],
    "name": "SelledDataEvent",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "dataValidator",
        "type": "address"
      }
    ],
    "name": "SelledDataEventPay",
    "type": "event"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_fileId",
        "type": "string"
      },
      {
        "name": "_dataMart",
        "type": "address"
      },
      {
        "name": "_dataValidator",
        "type": "address"
      },
      {
        "name": "_serviceNode",
        "type": "address"
      },
      {
        "name": "_dataOwner",
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
    "name": "sell",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_fileId",
        "type": "string"
      }
    ],
    "name": "getSellData",
    "outputs": [
      {
        "name": "",
        "type": "string"
      },
      {
        "name": "",
        "type": "address"
      },
      {
        "name": "",
        "type": "address"
      },
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
