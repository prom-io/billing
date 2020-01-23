import * as dotenv from 'dotenv';
import * as fs from 'fs';

export class ConfigService {
	private readonly envConfig: { [key: string]: string };

	constructor(filePath: any) {
		this.envConfig = dotenv.parse(fs.readFileSync(filePath));
	}

	get(key: string): string {
		return this.envConfig[key];
	}

	getPlasmaAbi(): any {
		return [
		    {
		      "constant": true,
		      "inputs": [
		        {
		          "name": "",
		          "type": "uint256"
		        }
		      ],
		      "name": "plasmaChain",
		      "outputs": [
		        {
		          "name": "root",
		          "type": "bytes32"
		        },
		        {
		          "name": "timestamp",
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
		      "name": "currentPlasmaBlock",
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
		      "name": "BLOCK_BUFFER",
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
		      "name": "operator",
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
		      "name": "currentDepositBlock",
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
		          "name": "amount",
		          "type": "uint256"
		        },
		        {
		          "indexed": false,
		          "name": "blockNumber",
		          "type": "uint256"
		        }
		      ],
		      "name": "DepositCreated",
		      "type": "event"
		    },
		    {
		      "constant": false,
		      "inputs": [],
		      "name": "deposit",
		      "outputs": [],
		      "payable": true,
		      "stateMutability": "payable",
		      "type": "function"
		    }
		  ];
	}

	getPlasmaAddress(): string {
		return "0xebA0F9A9db291b749A0b845678f8cd636a600A93"
	}

	getAccountManageAbi(): any {
		return [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_wallet",
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
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "sum",
          "type": "uint256"
        }
      ],
      "name": "ChildChainDeposit",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "role",
          "type": "uint256"
        }
      ],
      "name": "Registered",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "sum",
          "type": "uint256"
        }
      ],
      "name": "RegisteredSum",
      "type": "event"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "accounts",
      "outputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "role",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "registered",
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
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "dataOwners",
      "outputs": [
        {
          "internalType": "address",
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
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "dataOwnersCount",
      "outputs": [
        {
          "internalType": "uint256",
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
      "name": "wallet",
      "outputs": [
        {
          "internalType": "contract AbstractWallet",
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "address",
          "name": "_owner",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_sum",
          "type": "uint256"
        }
      ],
      "name": "initAccount",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "address",
          "name": "_owner",
          "type": "address"
        }
      ],
      "name": "registerDataMart",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "address",
          "name": "_owner",
          "type": "address"
        }
      ],
      "name": "registerServiceNode",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "address",
          "name": "_owner",
          "type": "address"
        }
      ],
      "name": "registerDataValidator",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "address",
          "name": "_owner",
          "type": "address"
        }
      ],
      "name": "registerDataOwner",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "address",
          "name": "_dataValidator",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_dataOwner",
          "type": "address"
        }
      ],
      "name": "registerOwner",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "address",
          "name": "_owner",
          "type": "address"
        }
      ],
      "name": "getRole",
      "outputs": [
        {
          "internalType": "uint256",
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
          "internalType": "address",
          "name": "_owner",
          "type": "address"
        }
      ],
      "name": "isRegistered",
      "outputs": [
        {
          "internalType": "bool",
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
          "internalType": "address",
          "name": "_owner",
          "type": "address"
        }
      ],
      "name": "isDataValidator",
      "outputs": [
        {
          "internalType": "bool",
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
          "internalType": "address",
          "name": "_owner",
          "type": "address"
        }
      ],
      "name": "isDataOwner",
      "outputs": [
        {
          "internalType": "bool",
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
          "internalType": "address",
          "name": "_owner",
          "type": "address"
        }
      ],
      "name": "isDataMart",
      "outputs": [
        {
          "internalType": "bool",
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
          "internalType": "address",
          "name": "_owner",
          "type": "address"
        }
      ],
      "name": "isServiceNode",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    }
  ];
	}

	getAccountManageAddress(): string {
		return "0x88F5FF853f307c45750823345757cCcaE2d6de09"
	}

	getDataSellAbi(): any {
		return [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_wallet",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_dataUpload",
          "type": "address"
        },
        {
          "internalType": "address",
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
          "internalType": "string",
          "name": "fileId",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "dataValidator",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "dataMart",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "dataOwner",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
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
          "internalType": "address",
          "name": "dataValidator",
          "type": "address"
        }
      ],
      "name": "SelledDataEventPay",
      "type": "event"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "accountManage",
      "outputs": [
        {
          "internalType": "contract AbstractAccountManage",
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
          "internalType": "contract AbstractDataUpload",
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
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "name": "selledData",
      "outputs": [
        {
          "internalType": "string",
          "name": "fileId",
          "type": "string"
        },
        {
          "internalType": "address",
          "name": "dataValidator",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "dataMart",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "dataOwner",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "sum",
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
      "name": "wallet",
      "outputs": [
        {
          "internalType": "contract AbstractWallet",
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "string",
          "name": "_fileId",
          "type": "string"
        },
        {
          "internalType": "address",
          "name": "_dataMart",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_dataValidator",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_serviceNode",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_dataOwner",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_sum",
          "type": "uint256"
        },
        {
          "internalType": "bytes",
          "name": "_sig",
          "type": "bytes"
        },
        {
          "internalType": "bytes32",
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
          "internalType": "string",
          "name": "_fileId",
          "type": "string"
        }
      ],
      "name": "getSellData",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        },
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    }
  ];
	}

	getDataSellAddress(): string {
		return "0xA2EA49A79A6E743aCa14820A17df0d66C9E5c3aE";
	}

	getDataUploadAbi(): any {
		return [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_transaction",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_wallet",
          "type": "address"
        },
        {
          "internalType": "address",
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
          "internalType": "string",
          "name": "id",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "serviceNodeAddress",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "dataOwner",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "sum",
          "type": "uint256"
        }
      ],
      "name": "DataUploaded",
      "type": "event"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "accountManage",
      "outputs": [
        {
          "internalType": "contract AbstractAccountManage",
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
      "name": "fileCount",
      "outputs": [
        {
          "internalType": "uint256",
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
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "fileList",
      "outputs": [
        {
          "internalType": "string",
          "name": "id",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "size",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "file_extension",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "mime_type",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "meta_data",
          "type": "string"
        },
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "bool",
          "name": "exist",
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
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "fileUploaded",
      "outputs": [
        {
          "internalType": "string",
          "name": "id",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "size",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "file_extension",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "mime_type",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "meta_data",
          "type": "string"
        },
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "bool",
          "name": "exist",
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
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "fileUploadedCount",
      "outputs": [
        {
          "internalType": "uint256",
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
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "name": "files",
      "outputs": [
        {
          "internalType": "string",
          "name": "id",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "size",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "file_extension",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "mime_type",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "meta_data",
          "type": "string"
        },
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "bool",
          "name": "exist",
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
      "name": "transaction",
      "outputs": [
        {
          "internalType": "contract AbstractTransaction",
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
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "name": "uploadedData",
      "outputs": [
        {
          "internalType": "string",
          "name": "id",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "sum",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "buySum",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "serviceNodeAddress",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "dataOwner",
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
          "internalType": "contract AbstractWallet",
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "string",
          "name": "_id",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_name",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_size",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "_file_extension",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_mime_type",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_meta_data",
          "type": "string"
        },
        {
          "internalType": "address",
          "name": "_owner",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_serviceNodeAddress",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_dataOwner",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_buySum",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_sum",
          "type": "uint256"
        },
        {
          "internalType": "bytes",
          "name": "_sig",
          "type": "bytes"
        },
        {
          "internalType": "bytes32",
          "name": "_message",
          "type": "bytes32"
        }
      ],
      "name": "upload",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "string",
          "name": "_id",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_name",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_size",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "_file_extension",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_mime_type",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_meta_data",
          "type": "string"
        },
        {
          "internalType": "address",
          "name": "_owner",
          "type": "address"
        }
      ],
      "name": "uploadFile",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "address",
          "name": "_owner",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "_id",
          "type": "string"
        }
      ],
      "name": "checkFileOwner",
      "outputs": [
        {
          "internalType": "bool",
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
          "internalType": "address",
          "name": "_owner",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "_fileId",
          "type": "string"
        }
      ],
      "name": "checkFileExist",
      "outputs": [
        {
          "internalType": "bool",
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
          "internalType": "address",
          "name": "_owner",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "_id",
          "type": "string"
        }
      ],
      "name": "getOwnerFile",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    }
  ];
	}

	getDataUploadAddress(): string {
		return "0x9aCEe1f98bC7Bb5BE60F0f4a66F23a2F5647B6f1";
	}

	getTransactionAbi(): any {
		return [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "string",
          "name": "fileUuid",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "hash",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "queueNumber",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "serviceNode",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "dataValidator",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "dataMart",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "dataOwner",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
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
          "internalType": "string",
          "name": "fileUuid",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "hash",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "queueNumber",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "serviceNode",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "dataValidator",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "dataOwner",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
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
          "internalType": "string",
          "name": "hash",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "queueNumber",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "serviceNode",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "dataValidator",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "created_at",
          "type": "uint256"
        }
      ],
      "name": "TxTransfer",
      "type": "event"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "addressTx",
      "outputs": [
        {
          "internalType": "string",
          "name": "fileUuid",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "txType",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "hash",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "queueNumber",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "serviceNode",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "dataValidator",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "dataMart",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "dataOwner",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
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
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "addressTxCount",
      "outputs": [
        {
          "internalType": "uint256",
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
          "internalType": "uint256",
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
      "name": "dataUploadTxCount",
      "outputs": [
        {
          "internalType": "uint256",
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
          "internalType": "uint256",
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
          "internalType": "uint256",
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
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "name": "transactionByHash",
      "outputs": [
        {
          "internalType": "string",
          "name": "fileUuid",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "txType",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "hash",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "queueNumber",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "serviceNode",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "dataValidator",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "dataMart",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "dataOwner",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
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
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "name": "transactionPayDataByHash",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "valueInServiceNode",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "valueInDataValidator",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "valueInDataMart",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "valueInDataOwner",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "valueOutServiceNode",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "valueOutDataValidator",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "valueOutDataMart",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
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
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "transactions",
      "outputs": [
        {
          "internalType": "string",
          "name": "fileUuid",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "txType",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "hash",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "queueNumber",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "serviceNode",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "dataValidator",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "dataMart",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "dataOwner",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
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
      "inputs": [],
      "name": "transferTxCount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "string",
          "name": "_uuid",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_hash",
          "type": "string"
        },
        {
          "internalType": "address",
          "name": "_serviceNode",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_dataValidator",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_dataOwner",
          "type": "address"
        },
        {
          "internalType": "uint256",
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
          "internalType": "string",
          "name": "_uuid",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_hash",
          "type": "string"
        },
        {
          "internalType": "address",
          "name": "_serviceNode",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_dataValidator",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_dataMart",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_dataOwner",
          "type": "address"
        },
        {
          "internalType": "uint256",
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
          "internalType": "string",
          "name": "_hash",
          "type": "string"
        },
        {
          "internalType": "address",
          "name": "_serviceNode",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_dataValidator",
          "type": "address"
        },
        {
          "internalType": "uint256",
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
          "internalType": "uint256",
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
	}

	getTransactionAddress(): string {
		return "0x8B0FE1d9cCBEaeA5BDF35584C8c57CD6383595c1";
	}

	getWalletAbi(): any {
		return [
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
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
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
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "currentSum",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
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
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
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
          "internalType": "address",
          "name": "dataValidator",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "serviceNode",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
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
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "sum",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "bytes",
          "name": "sig",
          "type": "bytes"
        },
        {
          "indexed": false,
          "internalType": "bytes32",
          "name": "message",
          "type": "bytes32"
        }
      ],
      "name": "TransferTo",
      "type": "event"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "isWhiteListed",
      "outputs": [
        {
          "internalType": "bool",
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
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "wallets",
      "outputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "balance",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "exists",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "address",
          "name": "_owner",
          "type": "address"
        },
        {
          "internalType": "uint256",
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
          "internalType": "address",
          "name": "_owner",
          "type": "address"
        },
        {
          "internalType": "uint256",
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
          "internalType": "address",
          "name": "_owner",
          "type": "address"
        },
        {
          "internalType": "uint256",
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
          "internalType": "address",
          "name": "_dataValidator",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_serviceNode",
          "type": "address"
        },
        {
          "internalType": "uint256",
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
          "internalType": "address",
          "name": "_from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_sum",
          "type": "uint256"
        },
        {
          "internalType": "bytes",
          "name": "_sig",
          "type": "bytes"
        },
        {
          "internalType": "bytes32",
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
          "internalType": "address",
          "name": "_dataSell",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_dataUpload",
          "type": "address"
        },
        {
          "internalType": "address",
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
          "internalType": "address",
          "name": "_owner",
          "type": "address"
        }
      ],
      "name": "checkExists",
      "outputs": [
        {
          "internalType": "bool",
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
          "internalType": "address",
          "name": "_owner",
          "type": "address"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    }
  ];
	}

	getWalletAddress(): string {
		return "0xbf7B4a3c206697a21EA833500186F50EA74fC763";
	}
}