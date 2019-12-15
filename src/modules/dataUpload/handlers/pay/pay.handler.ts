import { Injectable, BadRequestException } from '@nestjs/common';
import { PayDto } from "./pay.dto";
import { DataUploadService } from '../../../../contracts/child_chain/dataUpload.service';
import { AccountService } from '../../../../contracts/child_chain/account.service'
// import { TransactionDto } from '../../../../contracts/child_chain/dto/transaction.dto';
// import { TransactionService } from '../../../../contracts/child_chain/transaction.service'
import { TransactionDto } from '../../services/transaction.dto'
import { TransactionPayService } from '../../services/transactionPay.service'
import { WalletService } from '../../../../contracts/child_chain/wallet.service'
import { Web3PrivateNetService } from '../../../../web3/web3PrivateNet.service';
import Web3 from 'web3';

@Injectable()
export class PayHandler {
	private transactionService: TransactionPayService;
	private transactionDto: TransactionDto;
	private dataUploadService: DataUploadService;
	private accountService: AccountService;
	private walletService: WalletService;
	private web3: Web3;

	constructor(
		transactionService: TransactionPayService,
		transactionDto: TransactionDto,
		dataUploadService: DataUploadService, 
		accountService: AccountService,
		walletService: WalletService,
		web3Service: Web3PrivateNetService
	) {
		this.transactionService = transactionService;
		this.transactionDto = transactionDto;
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
			let checkOwner = await this.accountService.checkAccountExist(dto.data_validator);
			let checkDataOwner = await this.accountService.checkAccountExist(dto.data_owner);
			let checkServiceNode = await this.accountService.checkAccountExist(dto.service_node);

			if(checkOwner == false) {
				throw new BadRequestException("Is account " + dto.data_validator + " not registered!");
			}
			if(checkServiceNode == false) {
				throw new BadRequestException("Is account " + dto.service_node + " not registered!");
			}

			if(checkDataOwner == false) {
				throw new BadRequestException("Is account " + dto.data_owner + " not registered!");
			}

			await this.accountService.isDataValidator(dto.data_validator);
			await this.accountService.isServiceNode(dto.service_node);
			await this.accountService.isDataOwner(dto.data_owner);

			let checkBalance = await this.walletService.checkBalance(dto.data_validator, dto.sum);

			if(!checkBalance) {
				throw new BadRequestException("Is account " + dto.data_validator + " not enough funds on the balance sheet!");
			}
			let tx = await this.dataUploadService.payToUpload(dto);
			let transactionDto = this.transactionDto.make(
				dto.id, 
				tx.transactionHash, 
				dto.service_node, 
				dto.data_validator, 
				dto.data_owner, 
				dto.sum,
				dto.coinbase
			);
			let transactionStart = await this.transactionService.push(transactionDto);
			return transactionStart;
		} catch (e) {
			throw new BadRequestException(e.message);
		}
	}
}