import { Injectable } from '@nestjs/common'
import { TransactionService } from '../../../contracts/child_chain/transaction.service'
import { Web3PrivateNetService } from '../../../web3/web3PrivateNet.service'
import Web3 from 'web3'

@Injectable()
export class TransactionFetcher {
	private web3: Web3;
	private web3Service: Web3PrivateNetService;
	private transactionService: TransactionService;

	constructor(transactionService: TransactionService, web3Service: Web3PrivateNetService) {
		this.web3 = web3Service.websocketInstance();
		this.web3Service = web3Service;
		this.transactionService = transactionService;
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
		try {
			let minedTx = await this.web3.eth.getTransactionReceipt(hash);
			let txData = await this.web3.eth.getTransaction(hash);
			txData.value = this.web3.utils.fromWei(txData.value.toString(), 'ether');

			if(minedTx == null) {
				txData['status'] = false;
				// txData.forEach(tx => tx['status'] = false);
				// txData = {"status": false};
			} else {
				txData['status'] = true;
				// txData.forEach(tx => tx['status'] = true);
				// txData = {"status": true};
			}
			return txData;
		} catch (e) {
			throw e;
		}
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
			'from': tx.from,
			'to': tx.to,
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
				var txItem = {
					'id': tx.fileUuid,
					'txType': tx.txType,
					'hash': tx.hash,
					'serviceNode': tx.serviceNode,
					'queueNumber': counter,
					'blockNumber': minedTx.blockNumber,
					'from': tx.from,
					'to': tx.to,
					'value': this.web3.utils.fromWei(tx.value.toString(), 'ether'),
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

	public async paginate(pageNumber: number, pageSize: number): Promise<any> {
		let queueNumber = await this.transactionService.queueNumber();
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
				var tx = await this.transactionService.getTransaction(counter);
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
						'from': tx.from,
						'to': tx.to,
						'value': this.web3.utils.fromWei(tx.value.toString(), 'ether'),
						'created_at': date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate(),
						'status': false
					};

					if(minedTx != null) {
						txItem.status = true;
					} 
					transactions['data'].push(txItem);
				}
			}
		}
		return transactions;
	}
}