import { Injectable, BadRequestException } from '@nestjs/common';
import { BuyDto } from "./buy.dto";
import { DataMartService } from '../../../../contracts/child_chain/dataMart.service';
import { AccountService } from '../../../../contracts/child_chain/account.service';
// import { TransactionDto } from '../../../../contracts/child_chain/dto/transaction.dto';
// import { TransactionService } from '../../../../contracts/child_chain/transaction.service';
import { Web3PrivateNetService } from '../../../../web3/web3PrivateNet.service';
import { WalletService } from '../../../../contracts/child_chain/wallet.service';
import { TransactionPayService } from '../../services/transactionPay.service';
import { TransactionDto } from '../../services/transaction.dto';

import Web3 from 'web3';
import {WalletLambdaContract} from "../../../lambdaStorage/plasma/walletLambda.contract";
import {TransactionDBService} from "../../../transaction/services/transactionDB.service";

@Injectable()
export class BuyHandler {
	private dataMartservice: DataMartService;
	private accountService: AccountService;
	private transactionService: TransactionPayService;
	private transactionDto: TransactionDto;
	private walletService: WalletService;
	private walletLambda: WalletLambdaContract;
	private web3: Web3;

	constructor(
		private readonly transactionDBService: TransactionDBService,
		service: DataMartService, 
		accountService: AccountService, 
		web3Service: Web3PrivateNetService,
		walletService: WalletService,
		transactionService: TransactionPayService,
		transactionDto: TransactionDto,
		walletLambda: WalletLambdaContract
	) {
		this.dataMartservice = service;
		this.accountService = accountService;
		this.transactionService = transactionService;
		this.transactionDto = transactionDto;
		this.walletService = walletService;
		this.walletLambda = walletLambda;
		this.web3 = web3Service.websocketInstance();
	}

	public async handle(dto: BuyDto): Promise<any> {
		try {
			if(this.web3.eth.accounts.recover(dto.signature) != dto.data_mart) {
				throw new BadRequestException("Account " + dto.data_mart + " couldn`t be verified");
			}

			await this.accountService.checkIsRegistered(dto.service_node);
			await this.accountService.checkIsRegistered(dto.data_validator);
			await this.accountService.checkIsRegistered(dto.data_mart);
			await this.accountService.checkIsRegistered(dto.data_owner);

			await this.accountService.isServiceNode(dto.service_node);
			await this.accountService.isDataValidator(dto.data_validator);
			await this.accountService.isDataMart(dto.data_mart);
			await this.accountService.isDataOwner(dto.data_owner);

			const dataMart = await this.walletLambda.lambdaWalletByEthAddress(dto.data_mart);
			const serviceNode = await this.walletLambda.lambdaWalletByEthAddress(dto.service_node);
			const dataValidator = await this.walletLambda.lambdaWalletByEthAddress(dto.data_validator);

			if(dataMart.lambdaAddress === '') {
				throw new Error('Data mart wallet not registered!')
			}

			if(dataValidator.lambdaAddress === '') {
				throw new Error('Data validator wallet not registered!')
			}

			if(serviceNode.lambdaAddress === '') {
				throw new Error('Service node wallet not registered!');
			}

			dto.amount = Number(dto.sum) * (10 ** 6);
			const balance = Number(dataMart.amount);

			if(balance < dto.amount) {
				throw new Error('Data mart does not have enough funds on the balance sheet!')
			}

			await this.accountService.unlockCoinbase();
			dto.coinbase = await this.accountService.coinbaseAccount();

			let tx = await this.dataMartservice
				.sellData(dto, dto.signature.signature, dto.signature.messageHash);
			let transactionDto = this.transactionDto.make(
				dto.id,
				tx.transactionHash,
				dto.service_node,
				dto.data_validator,
				dto.data_mart,
				dto.data_owner,
				dto.amount,
				dto.coinbase
			);
			await this.transactionService.push(transactionDto);
			return this.transactionDBService.saveTxToDb(tx.transactionHash);
		} catch (e) {
			throw new BadRequestException(e.message);
			
		}
	}
}
