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
		return "0x76De4E88Fb130c9eb6e0Be00891cB378e2Eb2155"
	}

	getAccountManageAbi(): any {
		return [
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
		      "inputs": [
		        {
		          "name": "",
		          "type": "address"
		        }
		      ],
		      "name": "accounts",
		      "outputs": [
		        {
		          "name": "owner",
		          "type": "address"
		        },
		        {
		          "name": "role",
		          "type": "uint256"
		        },
		        {
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
		          "name": "",
		          "type": "address"
		        }
		      ],
		      "name": "dataOwnersCount",
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
		      "name": "dataOwners",
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
		      "inputs": [
		        {
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
		          "name": "owner",
		          "type": "address"
		        },
		        {
		          "indexed": false,
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
		          "name": "owner",
		          "type": "address"
		        },
		        {
		          "indexed": false,
		          "name": "sum",
		          "type": "uint256"
		        }
		      ],
		      "name": "RegisteredSum",
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
		      "name": "ChildChainDeposit",
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
		          "name": "_dataValidator",
		          "type": "address"
		        },
		        {
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
		          "name": "_owner",
		          "type": "address"
		        }
		      ],
		      "name": "getRole",
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
		          "name": "_owner",
		          "type": "address"
		        }
		      ],
		      "name": "isRegistered",
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
		      "name": "isDataValidator",
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
		      "name": "isDataOwner",
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
		      "name": "isDataMart",
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
		      "name": "isServiceNode",
		      "outputs": [
		        {
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
		return "0xAcA9b8F575f53c37e16CC8694d7404aEc3BC08fA"
	}

	getDataSellAbi(): any {
		return [
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
		      "inputs": [],
		      "name": "transaction",
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
		          "name": "owner",
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
		          "name": "_transaction",
		          "type": "address"
		        },
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
		          "name": "owner",
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
		          "name": "_owner",
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
		          "name": "_sum",
		          "type": "uint256"
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
	}

	getDataSellAddress(): string {
		return "0x365e581511c85288081DC9ba8b2FD7641c0aF3dD";
	}

	getDataUploadAbi(): any {
		return [
		    {
		      "constant": true,
		      "inputs": [
		        {
		          "name": "",
		          "type": "uint256"
		        }
		      ],
		      "name": "fileList",
		      "outputs": [
		        {
		          "name": "id",
		          "type": "string"
		        },
		        {
		          "name": "name",
		          "type": "string"
		        },
		        {
		          "name": "size",
		          "type": "uint256"
		        },
		        {
		          "name": "file_extension",
		          "type": "string"
		        },
		        {
		          "name": "mime_type",
		          "type": "string"
		        },
		        {
		          "name": "owner",
		          "type": "address"
		        },
		        {
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
		          "name": "",
		          "type": "string"
		        }
		      ],
		      "name": "uploadedData",
		      "outputs": [
		        {
		          "name": "id",
		          "type": "string"
		        },
		        {
		          "name": "serviceNodeAddress",
		          "type": "address"
		        },
		        {
		          "name": "dataOwnerAddress",
		          "type": "address"
		        },
		        {
		          "name": "assessedValue",
		          "type": "uint256"
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
		      "constant": true,
		      "inputs": [],
		      "name": "fileCount",
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
		      "inputs": [
		        {
		          "name": "",
		          "type": "address"
		        },
		        {
		          "name": "",
		          "type": "string"
		        }
		      ],
		      "name": "files",
		      "outputs": [
		        {
		          "name": "id",
		          "type": "string"
		        },
		        {
		          "name": "name",
		          "type": "string"
		        },
		        {
		          "name": "size",
		          "type": "uint256"
		        },
		        {
		          "name": "file_extension",
		          "type": "string"
		        },
		        {
		          "name": "mime_type",
		          "type": "string"
		        },
		        {
		          "name": "owner",
		          "type": "address"
		        },
		        {
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
		          "name": "",
		          "type": "address"
		        }
		      ],
		      "payable": false,
		      "stateMutability": "view",
		      "type": "function"
		    },
		    {
		      "inputs": [
		        {
		          "name": "_transaction",
		          "type": "address"
		        },
		        {
		          "name": "_wallet",
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
		          "name": "id",
		          "type": "string"
		        },
		        {
		          "indexed": false,
		          "name": "serviceNodeAddress",
		          "type": "address"
		        },
		        {
		          "indexed": false,
		          "name": "dataOwner",
		          "type": "address"
		        },
		        {
		          "indexed": false,
		          "name": "assessedValue",
		          "type": "uint256"
		        },
		        {
		          "indexed": false,
		          "name": "sum",
		          "type": "uint256"
		        }
		      ],
		      "name": "DataUploaded",
		      "type": "event"
		    },
		    {
		      "constant": false,
		      "inputs": [
		        {
		          "name": "_id",
		          "type": "string"
		        },
		        {
		          "name": "_name",
		          "type": "string"
		        },
		        {
		          "name": "_size",
		          "type": "uint256"
		        },
		        {
		          "name": "_file_extension",
		          "type": "string"
		        },
		        {
		          "name": "_mime_type",
		          "type": "string"
		        },
		        {
		          "name": "_owner",
		          "type": "address"
		        },
		        {
		          "name": "_serviceNodeAddress",
		          "type": "address"
		        },
		        {
		          "name": "_dataOwner",
		          "type": "address"
		        },
		        {
		          "name": "_dataPrice",
		          "type": "uint256"
		        },
		        {
		          "name": "_sum",
		          "type": "uint256"
		        }
		      ],
		      "name": "upload",
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
		        },
		        {
		          "name": "_id",
		          "type": "string"
		        }
		      ],
		      "name": "checkFileOwner",
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
		        },
		        {
		          "name": "_fileId",
		          "type": "string"
		        }
		      ],
		      "name": "checkFileExist",
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
		        },
		        {
		          "name": "_id",
		          "type": "string"
		        }
		      ],
		      "name": "getOwnerFile",
		      "outputs": [
		        {
		          "name": "",
		          "type": "string"
		        },
		        {
		          "name": "",
		          "type": "string"
		        },
		        {
		          "name": "",
		          "type": "uint256"
		        },
		        {
		          "name": "",
		          "type": "string"
		        },
		        {
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
		return "0x832871A323F8CC9f86D0866c3D4359c3792aF3D9";
	}

	getTransactionAbi(): any {
		return [
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
		          "name": "from",
		          "type": "address"
		        },
		        {
		          "name": "to",
		          "type": "address"
		        },
		        {
		          "name": "value",
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
		          "name": "from",
		          "type": "address"
		        },
		        {
		          "name": "to",
		          "type": "address"
		        },
		        {
		          "name": "value",
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
		          "name": "txType",
		          "type": "string"
		        },
		        {
		          "indexed": false,
		          "name": "serviceNode",
		          "type": "address"
		        },
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
		          "name": "value",
		          "type": "uint256"
		        }
		      ],
		      "name": "TxEvent",
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
		          "name": "_type",
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
		          "name": "_from",
		          "type": "address"
		        },
		        {
		          "name": "_to",
		          "type": "address"
		        },
		        {
		          "name": "_value",
		          "type": "uint256"
		        }
		      ],
		      "name": "transactionStart",
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
	}

	getTransactionAddress(): string {
		return "0xb87F1850e56Be41f78F74C398e941633c649933F";
	}

	getWalletAbi(): any {
		return [
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
	}

	getWalletAddress(): string {
		return "0x91f88Ca1f5166abA81535095d1d5df4DA9821944";
	}
}