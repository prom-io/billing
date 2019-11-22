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
		this.web3 = web3Service.ipcInstance();
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
}