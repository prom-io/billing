import { Injectable, BadRequestException } from '@nestjs/common';
import { PayDto } from "./pay.dto";
import { DataUploadService } from '../../../../contracts/child_chain/dataUpload.service';
import { AccountService } from '../../../../contracts/child_chain/account.service'
import { TransactionDto } from '../../../../contracts/child_chain/dto/transaction.dto';
import { TransactionService } from '../../../../contracts/child_chain/transaction.service'
import { WalletService } from '../../../../contracts/child_chain/wallet.service'
import { Web3PrivateNetService } from '../../../../web3/web3PrivateNet.service';
import Web3 from 'web3';

@Injectable()
export class PayHandler {
	private transactionService: TransactionService;
	private dataUploadService: DataUploadService;
	private accountService: AccountService;
	private walletService: WalletService;
	private web3: Web3;

	constructor(
		transactionService: TransactionService,
		dataUploadService: DataUploadService, 
		accountService: AccountService,
		walletService: WalletService,
		web3Service: Web3PrivateNetService
	) {
		this.transactionService = transactionService;
		this.dataUploadService = dataUploadService;
		this.accountService = accountService;
		this.walletService = walletService;
		this.web3 = web3Service.websocketInstance();
	}

	public async handle(dto: PayDto): Promise<any> {
		try {
			dto.coinbase = await this.accountService.coinbaseAccount();
			dto.sum = this.web3.utils.toWei(dto.sum, 'ether');
			dto.buy_sum = this.web3.utils.toWei(dto.buy_sum, 'ether');
			let checkOwner = await this.accountService.checkAccountExist(dto.owner);
			let checkDataOwner = await this.accountService.checkAccountExist(dto.data_owner);
			let checkServiceNode = await this.accountService.checkAccountExist(dto.service_node);
			if(checkOwner == false) {
				throw new BadRequestException("Is account " + dto.owner + " not registered!");
			}
			if(checkServiceNode == false) {
				throw new BadRequestException("Is account " + dto.service_node + " not registered!");
			}

			if(checkDataOwner == false) {
				throw new BadRequestException("Is account " + dto.data_owner + " not registered!");
			}

			let checkBalance = await this.walletService.checkBalance(dto.owner, dto.sum);

			if(!checkBalance) {
				throw new BadRequestException("Is account " + dto.owner + " not enough funds on the balance sheet!");
			}
			let tx = await this.dataUploadService.payToUpload(dto);
			let transactionDto = new TransactionDto();
			transactionDto.uuid = dto.id;
			transactionDto.type = 'dataUpload';
			transactionDto.hash = tx.transactionHash;
			transactionDto.serviceNode = dto.service_node;
			transactionDto.from = dto.owner;
			transactionDto.to = dto.service_node;
			transactionDto.value = dto.sum;
			transactionDto.coinbase = dto.coinbase;
			let startTransaction = await this.transactionService.transactionStart(transactionDto);
			return startTransaction;
		} catch (e) {
			throw new BadRequestException(e.message);
		}
	}
}