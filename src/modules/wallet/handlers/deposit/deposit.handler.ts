import { Injectable } from "@nestjs/common"
import { PlasmaService } from '../../../../contracts/root_chain/plasma.service';
import { Web3MainNetService } from '../../../../web3/web3MainNet.service';
import { WalletService } from '../../../../contracts/child_chain/wallet.service';
import { AccountService } from '../../../../contracts/child_chain/account.service';
import { AccountDto } from '../../../../contracts/child_chain/dto/account.dto';
import Web3 from "web3";

/**
	DataValidator: 0xdbC48fDA5cbE7c493D224892F836591d1e167Cb2
	DataMart: 0x2417765dd7F187a89E182418Fb7b434D4e14f67F
	DataOwner: 0x6d1906E64E9FE8a1f4c5804052fFC05B48c0788a
	ServiceNode: 0x485AD729daF400f9E869b304f2C144B0f90bcA51
*/

@Injectable()
export class DepositHandler {
	private web3: Web3;
	private walletService: WalletService;
	private plasmaService: PlasmaService;
	private accountService: AccountService;

	constructor(
		accountService: AccountService,
		plasmaService: PlasmaService, 
		web3Service: Web3MainNetService, 
		walletService: WalletService
	) {
		this.plasmaService = plasmaService;
		this.walletService = walletService;
		this.web3 = web3Service.httpInstance();
		this.accountService = accountService;
	}

	public async handle(address: string, amount: string): Promise<any> {
		try {
			let sum = this.web3.utils.toWei(amount, 'ether');
			let tx1 = await this.plasmaService.deposit(address, sum);
			if(tx1.status == true) {
				let coinbase = await this.accountService.coinbaseAccount();
				let dto = new AccountDto(address, coinbase);
				dto.sum = sum; 
				let tx2 = await this.accountService.initAccount(dto);
				console.log(tx2);
			}
			return tx1;
		} catch (e) {
			throw e;
		}
	}

}