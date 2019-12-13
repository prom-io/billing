import { Injectable } from '@nestjs/common'
import { TransactionService } from '../../../contracts/child_chain/transaction.service'
import { Web3PrivateNetService } from '../../../web3/web3PrivateNet.service'
import Web3 from 'web3'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'

@Injectable()
export class TransactionFetcher {
	private web3: Web3;
	private web3Service: Web3PrivateNetService;
	private transactionService: TransactionService;
	private timeAgo: TimeAgo;

	constructor(transactionService: TransactionService, web3Service: Web3PrivateNetService) {
		this.web3 = web3Service.websocketInstance();
		this.web3Service = web3Service;
		this.transactionService = transactionService;
		TimeAgo.addLocale(en);
		this.timeAgo = new TimeAgo('en-US');
	}

	public async all(): Promise<any> {
		try {
			let transactions = [];
			let queueNumber = await this.transactionService.queueNumber();
			for (queueNumber; queueNumber >= 1; queueNumber--) {
				var txData = await this.transactionService.getTransaction(queueNumber);
				if(txData['2'] != '') {
					var txSended = await this.web3.eth.getTransaction(txData['2']);
					if(txSended != null) {
						txSended.value = this.web3.utils.fromWei(txSended.value.toString(), 'ether')
						transactions.push(txSended);
					}
				}
			}
			return transactions;
		} catch (e) {
			throw e;
		}
	}

	public async getByHash(hash: string): Promise<any> {
		let tx = await this.transactionService.getTransactionByHash(hash);
		if(this.web3.utils.isHex(tx.hash)) {
			let minedTx = await this.web3.eth.getTransactionReceipt(tx.hash);
			let txItem = this.itemFormat(tx, minedTx, tx.queueNumber);
			if(minedTx != null) {
				txItem.status = true;
				txItem.gasUsed = minedTx.gasUsed;
			} 
			return txItem;
		}
		return {};
	}

	public async allAddressTransaction(address: string): Promise<any> {
		let queueNumber = await this.transactionService.getAddressTransactionCount(address);
		let transactions = {
			'count': queueNumber,
			'data': []
		};

		for (let counter = 1; counter <= queueNumber; counter++) {
			var tx = await this.transactionService.getAddressTransaction(address, counter);
			if(this.web3.utils.isHex(tx.hash)) {
				let minedTx = await this.web3.eth.getTransactionReceipt(tx.hash);
				var date = new Date(tx.created_at * 1000);
				var txItem = {
					'id': tx.fileUuid,
					'txType': tx.txType,
					'hash': tx.hash,
					'serviceNode': tx.serviceNode,
					'queueNumber': counter,
					'blockNumber': minedTx.blockNumber,
					'dataValidator': tx.dataValidator,
					'dataMart': tx.dataMart,
					'dataOwner': tx.dataOwner,
					'value': this.web3.utils.fromWei(tx.value.toString(), 'ether'),
					'created_at': date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate(),
					'ago': this.timeAgo.format(date),
					'status': false
				};

				if(minedTx != null) {
					txItem.status = true;
				} 
				transactions['data'].push(txItem);
			}
		}
		return transactions;
	}

	public async allTransaction(): Promise<any> {
		let queueNumber = await this.transactionService.queueNumber();
		let transactions = {
			'count': queueNumber,
			'data': []
		};
		let counter = queueNumber;
		let dateNow = new Date();
		// for (let counter = 1; counter <= queueNumber; counter++) {
		for (counter; counter >= 1; counter--) {
			var tx = await this.transactionService.getTransaction(counter);
			if(this.web3.utils.isHex(tx.hash)) {
				let minedTx = await this.web3.eth.getTransactionReceipt(tx.hash);
				let date = new Date(tx.created_at * 1000);

				var txItem = {
					'id': tx.fileUuid,
					'txType': tx.txType,
					'hash': tx.hash,
					'serviceNode': tx.serviceNode,
					'queueNumber': counter,
					'blockNumber': 0,
					'dataValidator': tx.dataValidator,
					'dataMart': tx.dataMart,
					'dataOwner': tx.dataOwner,
					'value': this.web3.utils.fromWei(tx.value.toString(), 'ether'),
					'created_at': date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate(),
					'ago': this.timeAgo.format(date),
					'status': false
				};

				if(minedTx != null) {
					txItem.status = true;
					txItem.blockNumber = minedTx.blockNumber;
				} 
				transactions['data'].push(txItem);
			}
		}
		return transactions;
	}

	public async getByQueueNumber(queueNumber: number): Promise<any> {
		console.log(queueNumber);
		var tx = await this.transactionService.getTransaction(queueNumber);
		let minedTx = await this.web3.eth.getTransactionReceipt(tx.hash);
		var txItem = {
			'id': tx.fileUuid,
			'txType': tx.txType,
			'hash': tx.hash,
			'serviceNode': tx.serviceNode,
			'queueNumber': queueNumber,
			'blockNumber': minedTx.blockNumber,
			'dataValidator': tx.dataValidator,
			'dataMart': tx.dataMart,
			'dataOwner': tx.dataOwner,
			'gasUsed': minedTx.gasUsed,
			'value': this.web3.utils.fromWei(tx.value.toString(), 'ether'),
			'status': false
		};

		if(minedTx != null) {
			txItem.status = true;
		} 
		return txItem;
	}

	public async getAddressTransactionPaginate(address: string, pageNumber: number, pageSize: number): Promise<any> {
		let queueNumber = await this.transactionService.getAddressTransactionCount(address);
		let transactions = {
			'count': queueNumber,
			'data': []
		};
		let max = pageSize * pageNumber;
		let counter = (max - pageSize) + 1;
		if(pageNumber == 1) {
			let counter = 1;
		}

		if(queueNumber >= 1) {
			if(max > queueNumber) {
				max = queueNumber;
			}

			for (counter; counter <= max; counter++) {
				var tx = await this.transactionService.getAddressTransaction(address, counter);
				let minedTx = await this.web3.eth.getTransactionReceipt(tx.hash);
				var txItem = this.itemFormat(tx, minedTx, counter);

				if(minedTx != null) {
					txItem.status = true;
				} 
				transactions['data'].push(txItem);
			}
		}
		return transactions;
	}

	public async paginate(pageNumber: number, pageSize: number): Promise<any> {
		let queueNumber = await this.transactionService.queueNumber();
		let transactions = {
			'count': queueNumber,
			'data': []
		};


		// let firstPage = pageNumber - 

		let counter = Math.ceil(queueNumber / pageSize);
		let max = ((counter - pageSize) + 1);
		console.log(max);
		console.log(counter);
		for (counter; counter >= max; counter--) {
			var tx = await this.transactionService.getTransaction(counter);

			if(this.web3.utils.isHex(tx.hash)) {
				let minedTx = await this.web3.eth.getTransactionReceipt(tx.hash);
				var txItem = this.itemFormat(tx, minedTx, counter);

				if(minedTx != null) {
					txItem.status = true;
				} 
				transactions['data'].push(txItem);
			}
		}
		return transactions;
	}

	private itemFormat(tx: any, minedTx: any, queueNumber: number): any {
		return {
			'id': tx.fileUuid,
			'txType': tx.txType,
			'hash': tx.hash,
			'serviceNode': tx.serviceNode,
			'queueNumber': queueNumber,
			'blockNumber': minedTx.blockNumber,
			'dataValidator': tx.dataValidator,
			'dataMart': tx.dataMart,
			'dataOwner': tx.dataOwner,
			'value': this.web3.utils.fromWei(tx.value.toString(), 'ether'),
			'status': false
		};
	}

	// public async paginate(pageNumber: number, pageSize: number): Promise<any> {
	// 	let queueNumber = await this.transactionService.queueNumber();
	// 	let transactions = {
	// 		'count': queueNumber,
	// 		'data': []
	// 	};
	// 	let max = pageSize * pageNumber;
	// 	let counter = (max - pageSize) + 1;
	// 	if(pageNumber == 1) {
	// 		let counter = 1;
	// 	}

	// 	if(queueNumber >= 1) {
	// 		if(max > queueNumber) {
	// 			max = queueNumber;
	// 		}

	// 		for (counter; counter <= max; counter++) {
	// 			var tx = await this.transactionService.getTransaction(counter);
	// 			if(this.web3.utils.isHex(tx.hash)) {
	// 				let minedTx = await this.web3.eth.getTransactionReceipt(tx.hash);
	// 				var date = new Date(tx.created_at * 1000);
	// 				var txItem = {
	// 					'id': tx.fileUuid,
	// 					'txType': tx.txType,
	// 					'hash': tx.hash,
	// 					'serviceNode': tx.serviceNode,
	// 					'queueNumber': counter,
	// 					'blockNumber': minedTx.blockNumber,
	// 					'from': tx.from,
	// 					'to': tx.to,
	// 					'value': this.web3.utils.fromWei(tx.value.toString(), 'ether'),
	// 					'created_at': date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate(),
	// 					'status': false
	// 				};

	// 				if(minedTx != null) {
	// 					txItem.status = true;
	// 				} 
	// 				transactions['data'].push(txItem);
	// 			}
	// 		}
	// 	}
	// 	return transactions;
	// }
}