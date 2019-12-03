import { Injectable } from '@nestjs/common';
import { Web3PrivateNetService } from "../../web3/web3PrivateNet.service";
import Web3 from "web3";
import { ConfigService } from "../../config/config.service";
@Injectable()
export class WalletService {
	private contract: any;
	private web3: Web3;
	private config: ConfigService;

	constructor(private readonly web3Service: Web3PrivateNetService, configService: ConfigService) {
		let web3 = web3Service.websocketInstance();
		this.web3 = web3;
		this.config = configService;
		this.contract = new web3.eth.Contract(
			configService.getWalletAbi(), 
			configService.getWalletAddress()
		); 
	}

	public async balanceOf(address: string): Promise<any> {
		return this.contract.methods.balanceOf(address).call();
	}

	public formatEther(sum: string): string {
		return this.web3.utils.fromWei(sum, 'ether');
	}

	public async checkBalance(address: string, sum: string): Promise<any> {
		let balance = await this.balanceOf(address);
		if(balance < sum) {
			return false;
		}
		return true;
	}

	public async deposit(owner: string, amount: string): Promise<any> {
		return this.contract.methods.balanceReplenishment(owner, amount)
			.send({ 
				from: this.config.get("COINBASE_ACCOUNT"), 
				gas: 1e6,
				gasPrice: 8 * 1e9
			});
	}
}
