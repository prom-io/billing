import { Injectable, BadRequestException } from '@nestjs/common';
import { WalletService } from '../../../contracts/child_chain/wallet.service';
import { Web3PrivateNetService } from '../../../web3/web3PrivateNet.service';
import Web3 from 'web3';

@Injectable()
export class WalletFetcher {
	private walletService: WalletService;
	private web3: Web3;

	constructor(walletService: WalletService, web3Service: Web3PrivateNetService) {
		this.walletService = walletService;
		this.web3 = web3Service.websocketInstance();
	}

	public async balance(address: string): Promise<any> {
		if(!this.web3.utils.isAddress(address)) {
			throw new BadRequestException("Is not valid address!");
		}
		let result = await this.walletService.balanceOf(address);
		return this.walletService.formatEther(result);
	}
}