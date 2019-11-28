import { Injectable, BadRequestException } from '@nestjs/common';
import { PayDto } from "./pay.dto";
import { DataUploadService } from '../../../../contracts/child_chain/dataUpload.service';
import { AccountService } from '../../../../contracts/child_chain/account.service'
import { TransactionService } from '../../../../contracts/child_chain/transaction.service'
import { Web3PrivateNetService } from '../../../../web3/web3PrivateNet.service';
import Web3 from 'web3';

@Injectable()
export class PayHandler {
	private transactionService: TransactionService;
	private dataUploadService: DataUploadService;
	private accountService: AccountService;
	private web3: Web3;

	constructor(
		transactionService: TransactionService,
		dataUploadService: DataUploadService, 
		accountService: AccountService,
		web3Service: Web3PrivateNetService
	) {
		this.transactionService = transactionService;
		this.dataUploadService = dataUploadService;
		this.accountService = accountService;
		this.web3 = web3Service.websocketInstance();
	}

	public async handle(dto: PayDto): Promise<any> {
		try {
			this.accountService.unlockCoinbase();
			dto.coinbase = await this.accountService.coinbaseAccount();
			dto.sum = this.web3.utils.toWei(dto.sum, 'ether');
			dto.data_price = this.web3.utils.toWei(dto.data_price, 'ether');
			let checkOwner = await this.accountService.checkAccountExist(dto.owner);
			let checkServiceNode = await this.accountService.checkAccountExist(dto.service_node);
			if(checkOwner == false) {
				throw new BadRequestException("Is account " + dto.owner + " not registered!");
			}
			if(checkServiceNode == false) {
				throw new BadRequestException("Is account " + dto.service_node + " not registered!");
			}
			let tx = await this.dataUploadService.payToUpload(dto);
			let queueNumber = await this.transactionService.queueNumber()
			let pendingTx = await this.transactionService.pendingTransactions(queueNumber);
			console.log(tx);
			let tx2 = await this.transactionService.setTransaction(
				dto.coinbase, 
				tx.transactionHash, 
				pendingTx.queueNumber
			);
			return tx;
		} catch (e) {
			throw e;
			if(e instanceof BadRequestException) {
				throw e;
			}
			throw new BadRequestException("Transaction reverted! EVM");
		}
	}
}