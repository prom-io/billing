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
import {WalletLambdaContract} from "../../../lambdaStorage/plasma/walletLambda.contract";

@Injectable()
export class PayHandler {
	private transactionService: TransactionPayService;
	private transactionDto: TransactionDto;
	private dataUploadService: DataUploadService;
	private accountService: AccountService;
	private walletService: WalletService;
	private web3: Web3;

	constructor(
		private readonly walletLambda: WalletLambdaContract,
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
			if(this.web3.eth.accounts.recover(dto.signature) != dto.data_validator) {
				throw new BadRequestException("Account " + dto.data_validator + " couldn`t be verified");
			}
			await this.accountService.unlockCoinbase();
			dto.coinbase = await this.accountService.coinbaseAccount();
			dto.amount = Number(dto.sum) * (10 ** 6);

			await this.accountService.checkIsRegistered(dto.data_validator);
			await this.accountService.checkIsRegistered(dto.service_node);

			await this.accountService.isDataValidator(dto.data_validator);
			await this.accountService.isServiceNode(dto.service_node);

			if(dto.data_owner == undefined) {
				let dataOwner = await this.accountService.makeDataOwner(dto.data_validator);
				dto.data_owner_full = dataOwner;
				dto.data_owner = dataOwner.address;
			}

			if(dto.meta_data === undefined) {
				dto.meta_data = '{}';
			}

			await this.accountService.checkIsRegistered(dto.data_owner);
			await this.accountService.isDataOwner(dto.data_owner);

			const dataValidatorWallet = await this.walletLambda.lambdaWalletByEthAddress(dto.data_validator);
			const serviceNodeWallet = await this.walletLambda.lambdaWalletByEthAddress(dto.service_node);
			console.log(dataValidatorWallet);
			console.log(serviceNodeWallet);
			if(dataValidatorWallet.lambdaAddress === '') {
				throw new Error('Data validator wallet not registered!');
			}

			if(serviceNodeWallet.lambdaAddress === '') {
				throw new Error('Service node wallet not registered!');
			}

			const balance = Number(dataValidatorWallet.amount);
			if(balance < dto.amount) {
				throw new Error('Data validator does not have enough funds on the balance sheet!');
			}
			let tx = await this.dataUploadService.payToUpload(
				dto,
				dto.signature.signature,
				dto.signature.messageHash
			);
			let transactionDto = this.transactionDto.make(
				dto.id, 
				tx.transactionHash,
				dto.service_node, 
				dto.data_validator, 
				dto.data_owner, 
				dto.amount,
				dto.coinbase
			);
			let transactionStart = await this.transactionService.push(transactionDto);

			if(dto.data_owner_full != undefined) {
				return dto.data_owner_full;
			}

			return transactionStart;
		} catch (e) {
			console.log(e);
			throw new BadRequestException(e.message);
		}
	}
}
