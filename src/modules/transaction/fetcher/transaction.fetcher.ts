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

	public async getByHash(hash: string): Promise<any> {
		let tx = await this.transactionService.getTransactionByHash(hash);
		if(this.web3.utils.isHex(tx.hash)) {
			let txItem = await this.itemFormat(tx, tx.queueNumber);
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
				let txItem = await this.itemFormat(tx, counter);
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
				let txItem = await this.itemFormat(tx, counter);
				transactions['data'].push(txItem);
			}
		}
		return transactions;
	}

	public async getAddressTransactionPaginate(address: string, pageNumber: number, pageSize: number): Promise<any> {
		let queueNumber = await this.transactionService.getAddressTransactionCount(address);
		let transactions = {
			'count': queueNumber,
			'pageNumbers': Math.ceil(queueNumber / pageSize),
			'data': []
		};
		let counter = queueNumber - (pageSize * pageNumber);
		let max = counter - pageSize;


		if(max < 0) {
			max = 0	
		}
		for (counter; counter > max; counter--) {
			var tx = await this.transactionService.getAddressTransaction(address, counter);

			if(this.web3.utils.isHex(tx.hash)) {
				let txItem = await this.itemFormat(tx, counter); 
				transactions['data'].push(txItem);
			}
		}
		return transactions;
	}

	public async paginate(pageNumber: number, pageSize: number): Promise<any> {
		let queueNumber = await this.transactionService.queueNumber();
		let transactions = {
			'count': queueNumber,
			'pageNumbers': Math.ceil(queueNumber / pageSize),
			'data': []
		};
		
		let counter = queueNumber - (pageSize * pageNumber);
		let max = counter - pageSize;
		if(max < 0) {
			max = 0	
		}
		for (counter; counter > max; counter--) {
			var tx = await this.transactionService.getTransaction(counter);

			if(this.web3.utils.isHex(tx.hash)) {
				let txItem = await this.itemFormat(tx, counter); 
				transactions['data'].push(txItem);
			}
		}
		return transactions;
	}

	private async itemFormat(tx: any, queueNumber: number): Promise<any> {
		let minedTx = await this.web3.eth.getTransactionReceipt(tx.hash);
		let date = new Date(tx.created_at * 1000);

		let txItem = {
			'id': tx.fileUuid,
			'txType': tx.txType,
			'hash': tx.hash,
			'serviceNode': tx.serviceNode,
			'queueNumber': queueNumber,
			'blockNumber': 0,
			'dataValidator': tx.dataValidator,
			'dataMart': tx.dataMart,
			'dataOwner': tx.dataOwner,
			'value': this.web3.utils.fromWei(tx.value.toString(), 'ether'),
			'created_at': date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate(),
			'ago': this.timeAgo.format(date),
			'status': false,
			'fee': 0
		};

		if(minedTx != null) {
			txItem.fee = await this.transactionService.transactionFeeByHash(tx.hash);
			txItem.status = true;
			txItem.blockNumber = minedTx.blockNumber;
		} 
		return txItem;
	}
}