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

@Injectable()
export class BuyHandler {
	private dataMartservice: DataMartService;
	private accountService: AccountService;
	private transactionService: TransactionPayService;
	private transactionDto: TransactionDto;
	private walletService: WalletService;
	private web3: Web3;

	constructor(
		service: DataMartService, 
		accountService: AccountService, 
		web3Service: Web3PrivateNetService,
		walletService: WalletService,
		transactionService: TransactionPayService,
		transactionDto: TransactionDto
	) {
		this.dataMartservice = service;
		this.accountService = accountService;
		this.transactionService = transactionService;
		this.transactionDto = transactionDto;
		this.walletService = walletService;
		this.web3 = web3Service.websocketInstance();
	}

	public async handle(dto: BuyDto): Promise<any> {
		try {
			dto.coinbase = await this.accountService.coinbaseAccount();

			let signature = await this.web3.eth.accounts.sign(dto.sum, dto.private_key);
			if(this.web3.eth.accounts.recover(dto.sum, signature.signature) != dto.data_mart) {
				throw new BadRequestException("Account " + dto.data_mart + " couldn`t be verified");
			}

			dto.sum = this.web3.utils.toWei(dto.sum, 'ether');

			await this.accountService.checkIsRegistered(dto.service_node);
			await this.accountService.checkIsRegistered(dto.data_validator);
			await this.accountService.checkIsRegistered(dto.data_mart);
			await this.accountService.checkIsRegistered(dto.data_owner);

			await this.accountService.isServiceNode(dto.service_node);
			await this.accountService.isDataValidator(dto.data_validator);
			await this.accountService.isDataMart(dto.data_mart);
			await this.accountService.isDataOwner(dto.data_owner);

			await this.walletService.checkWalletBalance(dto.data_mart, dto.sum);


			let tx = await this.dataMartservice
				.sellData(dto, signature.signature, signature.messageHash);
			let transactionDto = this.transactionDto.make(
				dto.id,
				tx.transactionHash,
				dto.service_node,
				dto.data_validator,
				dto.data_mart,
				dto.data_owner,
				dto.sum,
				dto.coinbase
			);
			let startTransaction = await this.transactionService.push(transactionDto);

			return startTransaction;
		} catch (e) {
			throw new BadRequestException(e.message);
			
		}
	}
}