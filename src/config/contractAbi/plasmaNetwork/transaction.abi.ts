import {AbiItem} from 'web3-utils';
export const transactionAbi: AbiItem[] = [
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "string"
        }
      ],
      "name": "transactionPayDataByHash",
      "outputs": [
        {
          "name": "valueInServiceNode",
          "type": "uint256"
        },
        {
          "name": "valueInDataValidator",
          "type": "uint256"
        },
        {
          "name": "valueInDataMart",
          "type": "uint256"
        },
        {
          "name": "valueInDataOwner",
          "type": "uint256"
        },
        {
          "name": "valueOutServiceNode",
          "type": "uint256"
        },
        {
          "name": "valueOutDataValidator",
          "type": "uint256"
        },
        {
          "name": "valueOutDataMart",
          "type": "uint256"
        },
        {
          "name": "valueOutDataOwner",
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
      "name": "dataUploadTxCount",
      "outputs": [
        {
          "name": "",
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
      "name": "dataPurchaseTxCount",
      "outputs": [
        {
          "name": "",
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
      "name": "queueNumber",
      "outputs": [
        {
          "name": "",
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
      "name": "transferTxCount",
      "outputs": [
        {
          "name": "",
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
      "name": "lastSyncQueue",
      "outputs": [
        {
          "name": "",
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
      "name": "transactionByHash",
      "outputs": [
        {
          "name": "fileUuid",
          "type": "string"
        },
        {
          "name": "txType",
          "type": "string"
        },
        {
          "name": "hash",
          "type": "string"
        },
        {
          "name": "queueNumber",
          "type": "uint256"
        },
        {
          "name": "serviceNode",
          "type": "address"
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
          "name": "value",
          "type": "uint256"
        },
        {
          "name": "created_at",
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
          "type": "uint256"
        }
      ],
      "name": "transactions",
      "outputs": [
        {
          "name": "fileUuid",
          "type": "string"
        },
        {
          "name": "txType",
          "type": "string"
        },
        {
          "name": "hash",
          "type": "string"
        },
        {
          "name": "queueNumber",
          "type": "uint256"
        },
        {
          "name": "serviceNode",
          "type": "address"
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
          "name": "value",
          "type": "uint256"
        },
        {
          "name": "created_at",
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
          "type": "address"
        }
      ],
      "name": "addressTxCount",
      "outputs": [
        {
          "name": "",
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
          "type": "address"
        },
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "addressTx",
      "outputs": [
        {
          "name": "fileUuid",
          "type": "string"
        },
        {
          "name": "txType",
          "type": "string"
        },
        {
          "name": "hash",
          "type": "string"
        },
        {
          "name": "queueNumber",
          "type": "uint256"
        },
        {
          "name": "serviceNode",
          "type": "address"
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
          "name": "value",
          "type": "uint256"
        },
        {
          "name": "created_at",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "fileUuid",
          "type": "string"
        },
        {
          "indexed": false,
          "name": "hash",
          "type": "string"
        },
        {
          "indexed": false,
          "name": "queueNumber",
          "type": "uint256"
        },
        {
          "indexed": false,
          "name": "serviceNode",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "dataValidator",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "dataOwner",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "value",
          "type": "uint256"
        },
        {
          "indexed": false,
          "name": "created_at",
          "type": "uint256"
        }
      ],
      "name": "TxDataUpload",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "fileUuid",
          "type": "string"
        },
        {
          "indexed": false,
          "name": "hash",
          "type": "string"
        },
        {
          "indexed": false,
          "name": "queueNumber",
          "type": "uint256"
        },
        {
          "indexed": false,
          "name": "serviceNode",
          "type": "address"
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
          "name": "value",
          "type": "uint256"
        },
        {
          "indexed": false,
          "name": "created_at",
          "type": "uint256"
        }
      ],
      "name": "TxDataPurchase",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "hash",
          "type": "string"
        },
        {
          "indexed": false,
          "name": "queueNumber",
          "type": "uint256"
        },
        {
          "indexed": false,
          "name": "serviceNode",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "dataValidator",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "value",
          "type": "uint256"
        },
        {
          "indexed": false,
          "name": "created_at",
          "type": "uint256"
        }
      ],
      "name": "TxTransfer",
      "type": "event"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_uuid",
          "type": "string"
        },
        {
          "name": "_hash",
          "type": "string"
        },
        {
          "name": "_serviceNode",
          "type": "address"
        },
        {
          "name": "_dataValidator",
          "type": "address"
        },
        {
          "name": "_dataOwner",
          "type": "address"
        },
        {
          "name": "_value",
          "type": "uint256"
        }
      ],
      "name": "transactionDataUpload",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_uuid",
          "type": "string"
        },
        {
          "name": "_hash",
          "type": "string"
        },
        {
          "name": "_serviceNode",
          "type": "address"
        },
        {
          "name": "_dataValidator",
          "type": "address"
        },
        {
          "name": "_dataMart",
          "type": "address"
        },
        {
          "name": "_dataOwner",
          "type": "address"
        },
        {
          "name": "_value",
          "type": "uint256"
        }
      ],
      "name": "transactionDataPurchase",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_hash",
          "type": "string"
        },
        {
          "name": "_serviceNode",
          "type": "address"
        },
        {
          "name": "_dataValidator",
          "type": "address"
        },
        {
          "name": "_value",
          "type": "uint256"
        }
      ],
      "name": "transactionTransfer",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "lastQueue",
          "type": "uint256"
        }
      ],
      "name": "setLastSyncQueue",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    }
];