import { Injectable } from '@nestjs/common';
import { Web3MainNetService } from "../../web3/web3MainNet.service";
import { WalletService } from "../child_chain/wallet.service";
import { AccountService } from "../child_chain/account.service";
import Web3 from "web3";
import { ConfigService } from '../../config/config.service';
import { AccountDto } from '../child_chain/dto/account.dto';

@Injectable()
export class PlasmaService {

	private web3: Web3;
	private contract: any;
	private walletService: WalletService;
	private accountService: AccountService;
	private config: ConfigService;

	constructor(
		web3Service: Web3MainNetService, 
		walletService: WalletService, 
		accountService: AccountService,
		configService: ConfigService
	) {
		let web3 = web3Service.websocketInstance();
		this.web3 = web3;
		this.walletService = walletService;
		this.accountService = accountService;
		this.config = configService;
		this.contract = new web3.eth.Contract(
			configService.getPlasmaAbi(), 
			configService.getPlasmaAddress()
		);
	}

	public listen(): any {
		this.contract.events.DepositCreated({}, (error, event) => {console.log(event)})
			.on('data', async (event) => {
				await this.accountService.unlockCoinbase();
				let coinbase = await this.accountService.coinbaseAccount();
				let eventData = event.returnValues;
				let dto = new AccountDto(eventData.owner, coinbase);
				dto.sum = eventData.amount;
				let tx = await this.accountService.initAccount(dto);
			})
			.on('error', (error) => {
				console.log(error);
			});
	}

	public async deposit(owner: string, amount: string): Promise<any> {
		return this.contract.methods.deposit().send({ 
			from: owner,
			value: amount, 
			gas: 1e6,
			gasPrice: 8 * 1e9
		});
	}
}

// if(event != null) {
// 	this.walletService.deposit(event.returnValues.owner, event.returnValues.amount);
// }
