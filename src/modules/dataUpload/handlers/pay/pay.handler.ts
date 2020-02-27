import { Injectable, BadRequestException, HttpService } from '@nestjs/common';
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
		private readonly httpService: HttpService,
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
			let signature = await this.web3.eth.accounts.sign(dto.sum, dto.private_key);
			if(this.web3.eth.accounts.recover(dto.sum, signature.signature) != dto.data_validator) {
				throw new BadRequestException("Account " + dto.data_validator + " couldn`t be verified");
			}
			await this.accountService.unlockCoinbase();
			dto.coinbase = await this.accountService.coinbaseAccount();

			await this.accountService.checkIsRegistered(dto.data_validator);
			await this.accountService.checkIsRegistered(dto.service_node);

			await this.accountService.isDataValidator(dto.data_validator);
			await this.accountService.isServiceNode(dto.service_node);

			if(dto.data_owner == undefined) {
				let dataOwner = await this.accountService.makeDataOwner(dto.data_validator);
				dto.data_owner_full = dataOwner;
				dto.data_owner = dataOwner.address;
			}

			await this.accountService.checkIsRegistered(dto.data_owner);
			await this.accountService.isDataOwner(dto.data_owner);

			let checkBalance = await this.walletService.checkBalance(dto.data_validator, dto.sum);

			if(!checkBalance) {
				throw new BadRequestException("Is account " + dto.data_validator + " not enough funds on the balance sheet!");
			}
			// let tx = await this.dataUploadService.payToUpload(dto, signature.signature, signature.messageHash);
			let tx = await this.httpService.post('/data/upload/pay', {
				'id': dto.id,
				'name': dto.name,
				'size': dto.size,
				'extension': dto.extension,
				'mime_type': dto.mime_type,
				'meta_data': dto.meta_data,
				'private_key': dto.private_key,
				'service_node': dto.service_node,
				'sum': dto.sum,
				'signature': signature.signature,
				'messageHash': signature.messageHash,
				'data_owner': dto.data_owner,
				'data_validator': dto.data_validator,
				'coinbase': dto.coinbase
			}).toPromise();
			let transactionDto = this.transactionDto.make(
				dto.id, 
				tx.data.transactionHash, 
				dto.service_node, 
				dto.data_validator, 
				dto.data_owner, 
				dto.sum,
				dto.coinbase
			);
			let transactionStart = await this.transactionService.push(transactionDto);

			if(dto.data_owner_full != undefined) {
				return dto.data_owner_full;
			}

			return transactionStart;
		} catch (e) {
			throw new BadRequestException(e.message);
		}
	}
}