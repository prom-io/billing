import { Web3PrivateNetService } from "../../web3/web3PrivateNet.service";
import { Injectable, Global } from '@nestjs/common';
import Web3 from 'web3';
import { ConfigService } from "../../config/config.service";
import { AccountDto } from "./dto/account.dto";
import { TransactionDto } from './dto/transaction.dto';

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

	public async transactionDataUpload(
		uuid: string, 
		hash: string, 
		serviceNode: string, 
		dataValidator: string,
		dataOwner: string,
		value: string,
		coinbase: string
	): Promise<any> {
		return this.contract.methods.transactionDataUpload(
			uuid,
			hash,
			serviceNode,
			dataValidator,
			dataOwner,
			value
		).send({
			from: coinbase, 
			gas: 4612388,
			gasPrice: 8 * 1e9
		});
	}

	public async transactionDataPurchase(
		uuid: string,
		hash: string,
		serviceNode: string,
		dataValidator: string,
		dataMart: string,
		dataOwner: string,
		value: string,
		coinbase: string
	): Promise<any> {
		return this.contract.methods.transactionDataPurchase(
			uuid,
			hash,
			serviceNode,
			dataValidator,
			dataMart,
			dataOwner,
			value
		).send({
			from: coinbase,
			gas: 4612388,
			gasPrice: 8 * 1e9
		});
	}

	public async transactionStart(dto: TransactionDto): Promise<any> {
		return this.contract.methods.transactionStart(
			dto.uuid, 
			dto.type, 
			dto.hash, 
			dto.serviceNode, 
			dto.from, 
			dto.to, 
			dto.value
		).send({
			from: dto.coinbase, 
			gas: 1e6,
			gasPrice: 8 * 1e9
		});
	}

	public transactionStartTest(dto: TransactionDto): any {
		return this.contract.methods.transactionStart(
			dto.uuid, 
			dto.type, 
			dto.hash, 
			dto.serviceNode, 
			dto.from, 
			dto.to, 
			dto.value
		).send({
			from: dto.coinbase, 
			gas: 1e6,
			gasPrice: 8 * 1e9
		});
	}

	public async queueNumber(): Promise<any> {
		return this.contract.methods.queueNumber().call();
	}

	public async getTransaction(queueNumber: number): Promise<any> {
		return this.contract.methods.transactions(queueNumber).call();
	}

	public async getAddressTransactionCount(address: string): Promise<any> {
		return this.contract.methods.addressTxCount(address).call();
	}

	public async getAddressTransaction(address: string, queueNumber: number): Promise<any> {
		return this.contract.methods.addressTx(address, queueNumber).call();
	}

	public getContract(): any {
		return this.contract;
	}
}