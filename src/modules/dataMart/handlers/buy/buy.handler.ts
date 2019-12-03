import { Injectable, BadRequestException } from '@nestjs/common';
import { BuyDto } from "./buy.dto";
import { DataMartService } from '../../../../contracts/child_chain/dataMart.service';
import { AccountService } from '../../../../contracts/child_chain/account.service';
import { TransactionDto } from '../../../../contracts/child_chain/dto/transaction.dto';
import { TransactionService } from '../../../../contracts/child_chain/transaction.service'
import { Web3PrivateNetService } from '../../../../web3/web3PrivateNet.service';
import { WalletService } from '../../../../contracts/child_chain/wallet.service'
import Web3 from 'web3';

@Injectable()
export class BuyHandler {
	private dataMartservice: DataMartService;
	private accountService: AccountService;
	private transactionService: TransactionService;
	private walletService: WalletService;
	private web3: Web3;

	constructor(
		service: DataMartService, 
		accountService: AccountService, 
		web3Service: Web3PrivateNetService,
		walletService: WalletService,
		transactionService: TransactionService
	) {
		this.dataMartservice = service;
		this.accountService = accountService;
		this.transactionService = transactionService;
		this.walletService = walletService;
		this.web3 = web3Service.websocketInstance();
	}

	public async handle(dto: BuyDto): Promise<any> {
		try {
			dto.coinbase = await this.accountService.coinbaseAccount();
			dto.sum = this.web3.utils.toWei(dto.sum, 'ether');
			let exists = await this.checkAccounts(dto);
			let checkBalance = await this.walletService.checkBalance(dto.owner, dto.sum);

			if(!checkBalance) {
				throw new BadRequestException("Is account " + dto.owner + " not enough funds on the balance sheet!");
			}

			let tx = await this.dataMartservice
				.sellData(dto);

			let transactionDto = new TransactionDto();
			transactionDto.uuid = dto.id;
			transactionDto.type = 'dataSell';
			transactionDto.hash = tx.transactionHash;
			transactionDto.serviceNode = dto.service_node;
			transactionDto.from = dto.owner;
			transactionDto.to = dto.data_validator;
			transactionDto.value = dto.sum;
			transactionDto.coinbase = dto.coinbase;

			let startTransaction = await this.transactionService.transactionStart(transactionDto);

			return startTransaction;
		} catch (e) {
			throw new BadRequestException(e.message);
			
		}
	}

	private async checkAccounts(dto: BuyDto): Promise<any> {
		let checkOwner = await this.accountService.checkAccountExist(dto.owner);
		let checkDataValidator = await this.accountService.checkAccountExist(dto.data_validator);
		if(checkOwner == false) {
			throw new BadRequestException("Is account " + dto.owner + " not registered!");
		}

		if(checkDataValidator == false) {
			throw new BadRequestException("Is account " + dto.data_validator + " not registered!");
		}
	}
}