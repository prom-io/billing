import { Injectable, BadRequestException } from '@nestjs/common';
import { TransferDto } from "./transfer.dto";
import { AccountService } from '../../../../contracts/child_chain/account.service';
import { WalletService } from '../../../../contracts/child_chain/wallet.service';
import { Web3PrivateNetService } from '../../../../web3/web3PrivateNet.service';
import { TransactionTransferService } from '../../services/transactionTransfer.service';
import { TransactionDto } from '../../services/transaction.dto';

import Web3 from 'web3';


@Injectable()
export class TransferHandler {
	private accountService: AccountService;
	private walletService: WalletService;
	private transactionService: TransactionTransferService;
	private transactionDto: TransactionDto;
	private web3: Web3;

	constructor(
		accountService: AccountService,
		walletService: WalletService,
		web3Service: Web3PrivateNetService,
		transactionService: TransactionTransferService,
		transactionDto: TransactionDto
	) {
		this.accountService = accountService;
		this.walletService = walletService;
		this.transactionService = transactionService;
		this.transactionDto = transactionDto;
		this.web3 = web3Service.websocketInstance();
	}

	public async handle(transferDto: TransferDto): Promise<any> {
		try {
			let sum = this.web3.utils.toWei(transferDto.sum, 'ether'); // Convert ethers to weis
			let signature = await this.web3.eth.accounts.sign(transferDto.sum, transferDto.privateKey);

			if(this.web3.eth.accounts.recover(transferDto.sum, signature.signature) != transferDto.from) {
				throw new BadRequestException("Account " + transferDto.from + " couldn`t be verified");
			}

			let tx1 = await this.accountService.checkIsRegistered(transferDto.from);
			let tx2 = await this.accountService.checkIsRegistered(transferDto.to);
			let checkBalance = await this.walletService.checkWalletBalance(transferDto.from, sum);

			if(!checkBalance) {
				throw new BadRequestException("Is account " + transferDto.from + " not enough funds on the balance sheet!");
			}
			let tx4 = await this.walletService.transferTo(transferDto.from, transferDto.to, sum, signature.signature, signature.messageHash);

			let transactionDto = this.transactionDto.make(
				tx4.transactionHash,
				transferDto.from,
				transferDto.to,
				sum,
				transferDto.coinbase
			);

			let startTransaction = await this.transactionService.push(transactionDto);

			return startTransaction;
			}
		catch (e) {
			throw e;
		}
	}
}