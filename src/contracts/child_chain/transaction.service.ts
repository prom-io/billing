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
		value: number,
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
		value: number,
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

	public async transactionTransfer(
		hash: string,
		from: string,
		to: string,
		value: string,
		coinbase: string
	): Promise<any> {
		return this.contract.methods.transactionTransfer(
			hash,
			from,
			to,
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

	public transactionFee(gasUsed: number): any {
		return (gasUsed * (8 * 1e9));
	}

	public async transactionFeeByHash(hash: string): Promise<any> {
		let transaction = await this.web3.eth.getTransaction(hash);
		let transactionReceipt = await this.web3.eth.getTransactionReceipt(hash);
		return (Number(transaction.gasPrice) * transactionReceipt.gasUsed);
	}

	public async transactionFeeByHashFormat(hash: string): Promise<any> {
		let transaction = await this.web3.eth.getTransaction(hash);
		let transactionReceipt = await this.web3.eth.getTransactionReceipt(hash);
		let sum = (Number(transaction.gasPrice) * transactionReceipt.gasUsed);
		return Number(this.web3.utils.fromWei(String(sum), 'ether')).toFixed(8);
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

	public async getTransactionByHash(hash: string): Promise<any> {
		return this.contract.methods.transactionByHash(hash).call();
	}

	public async transactionPayDataByHash(hash: string): Promise<any> {
		return this.contract.methods.transactionPayDataByHash(hash).call();
	}

	public dataUploadTxCount(): Promise<number> {
		return this.contract.methods.dataUploadTxCount().call();
	}

	public transactionsByType(type: string, index: number): Promise<any> {
		return this.contract.methods.transactionsByType(type, index).call();
	}

	public dataPurchaseTxCount(): Promise<number> {
		return this.contract.methods.dataPurchaseTxCount().call();
	}

	public getContract(): any {
		return this.contract;
	}
}
