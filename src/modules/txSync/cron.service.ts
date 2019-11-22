import { Injectable } from '@nestjs/common';
import { Cron, Interval, Timeout, NestSchedule } from 'nest-schedule';
import { TransactionService } from '../../contracts/child_chain/transaction.service';
import { DataMartService } from '../../contracts/child_chain/dataMart.service';
import { DataUploadService } from '../../contracts/child_chain/dataUpload.service';
import { Web3PrivateNetService } from '../../web3/web3PrivateNet.service'; 
import Web3 from 'web3';

@Injectable() 
export class CrontService extends NestSchedule {
	private web3: Web3;

	constructor(
		private readonly transactionService: TransactionService,
		private readonly dataSellService: DataMartService,
		private readonly dataUploadService: DataUploadService,
		web3PrivateNetService: Web3PrivateNetService
	) {
		super();
		this.web3 = web3PrivateNetService.ipcInstance();
	}

	@Cron('* * * * *', {
	    startTime: new Date(), 
	    endTime: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
	  })
	async cronJob() {
		console.log('executing cron job');
	}

	@Timeout(5000)
	async onceJob() {
		const tx = this.transactionService.getContract();
		const dataSell = this.dataSellService.getContract();
		const dataUpload = this.dataUploadService.getContract();
		const count = await tx.methods.queueNumber().call();
		for (var i = 1; i <= count; i++) {
			var txData = await tx.methods
				.getTransaction(i)
				.call();
			if(txData['2'] === "") {
				if(txData['1'] == 'dataSell') {
					var dataSellItem = await dataSell.methods
						.selledData(txData['0'].toString())
						.call();
					var txSellData = await dataSell.methods
						.sellDataPay(dataSellItem['dataValidator'])
						.send({ from: dataSellItem['owner'], value: dataSellItem['sum'] });
					var tx1 = await tx.methods
						.setTransaction(txSellData.transactionHash, i)
						// .send({ from: dataSellItem['owner'] });
						.send({ from: dataSellItem['owner'], gas : 1e6, gasPrice : 8 * 1e6 });
					break;
				} else {
					var dataUploadItem = await dataUpload.methods
						.uploadedData(txData['0'].toString())
						.call();
					let unlock = await this.web3.eth.personal.unlockAccount(dataUploadItem['dataOwnerAddress'], "", 36000);
					var txDataUpload = await dataUpload.methods
						.dataUploadPay(dataUploadItem['uuid'])
						.send({ from: dataUploadItem['dataOwnerAddress'], value: dataUploadItem['sum'] });
					var tx1 = await tx.methods
						.setTransaction(txDataUpload.transactionHash, i)
						// .send({ from: dataUploadItem['dataOwnerAddress'] });
						.send({ from: dataUploadItem['dataOwnerAddress'], gas: 1e6, gasPrice: 8 * 1e6 });
					break;
				}

			} else {
				var txSended = await this.web3.eth.getTransactionReceipt(txData['2']);
				if(txSended == null) {
					var txSendedNew = await this.web3.eth.sendTransaction(txSended);
					var tx1 = await tx.methods
						.setTransaction(txSendedNew.transactionHash, i)
						// .send({ from: txSended['from'] });
						.send({ from: txSended['from'], gas : 1e6, gasPrice : 8 * 1e6 });
					break;
				} 
			}
		}
	}
}