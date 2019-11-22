import { Web3PrivateNetService } from "../../web3/web3PrivateNet.service";
import { Injectable, Global } from '@nestjs/common';
import Web3 from 'web3';
import { ConfigService } from "../../config/config.service";
import { AccountDto } from "./dto/account.dto";

@Injectable()
export class TransactionService {
	private web3: Web3;
	private contract: any;
	private config: ConfigService;

	constructor(private readonly web3Service: Web3PrivateNetService, configService: ConfigService) {
		let web3 = web3Service.websocketInstance();
		this.web3 = web3;
		this.config = configService;
		this.contract = new web3.eth.Contract(
			configService.getTransactionAbi(), 
			configService.getTransactionAddress()
		);
	}

	public async queueNumber(): Promise<any> {
		return this.contract.methods.queueNumber().call();
	}

	public async setTransaction(coinbase: string, hash: string, queueNumber: number): Promise<any> {
		return this.contract.methods.setTransaction(hash, queueNumber).send({
			from: coinbase, 
			gas: 1e6,
			gasPrice: 8 * 1e9
		});
	}

	public async getTransaction(queueNumber: number): Promise<any> {
		return this.contract.methods.getTransaction(queueNumber).call();
	}

	public async pendingTransactions(id: number): Promise<any> {
		return this.contract.methods.pendingTransactions(id).call();
	}

	public getContract(): any {
		return this.contract;
	}
}