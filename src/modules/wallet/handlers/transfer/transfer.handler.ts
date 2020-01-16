import { Injectable, BadRequestException } from '@nestjs/common';
import { TransferDto } from "./transfer.dto";
import { AccountService } from '../../../../contracts/child_chain/account.service';
import { WalletService } from '../../../../contracts/child_chain/wallet.service';
import { Web3PrivateNetService } from '../../../../web3/web3PrivateNet.service';
import Web3 from 'web3';

@Injectable()
export class TransferHandler {
	private accountService: AccountService;
	private walletService: WalletService;
	private web3: Web3;

	constructor(
		accountService: AccountService,
		walletService: WalletService,
		web3Service: Web3PrivateNetService
	) {
		this.accountService = accountService;
		this.walletService = walletService;
		this.web3 = web3Service.websocketInstance();
	}

	public async handle(transferDto: TransferDto): Promise<any> {
		try {
			let sum = this.web3.utils.toWei(transferDto.sum, 'ether'); // Convert ethers to weis
			console.log('Sum: ', sum);
			let tx1 = await this.accountService.checkIsRegistered(transferDto.from);
			console.log('1 Is registered: ', tx1);
			let tx2 = await this.accountService.checkIsRegistered(transferDto.to);
			console.log('2 Is registered: ', tx2);

			let checkBalance = await this.walletService.checkWalletBalance(transferDto.from, sum);
			console.log('Balance: ', checkBalance);
			console.log('From: ', transferDto.from);

			if(!checkBalance) {
				throw new BadRequestException("Is account " + transferDto.from + " not enough funds on the balance sheet!");
			}

			let tx4 = await this.walletService.transferTo(transferDto.from, transferDto.to, sum);
			// let tx4 = await this.walletService.transfer(transferDto.from, transferDto.to, sum);
			console.log(tx4);

			/**
				Перевод средств:
					1) Получение переменных: Откуда куда и сколько
					2) Существует ли отправитель
					3) Есть ли у отправителя средств на сумму + комиссию
					4) Существует ли получатель
					5) Отправить средства
			**/

			return tx1;
			}
		catch (e) {
			throw e;
		}
	}
}