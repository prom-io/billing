import Web3 from "web3";
import { Injectable, BadRequestException } from '@nestjs/common';
import { WalletService } from '../../../../contracts/child_chain/wallet.service';
import { Web3PrivateNetService } from '../../../../web3/web3PrivateNet.service';
import { ExtendFileStoreDto } from './extendFileStore.dto';

@Injectable()
export class ExtendFileStoreHandler {
	private web3: Web3;
	private walletService: WalletService;

	constructor(
		web3Service: Web3PrivateNetService, 
		walletService: WalletService
	) {
		this.walletService = walletService;
		this.web3 = web3Service.websocketInstance();
	}

	public async extendFileStore(dto: ExtendFileStoreDto): Promise<any> {
		try {
			dto.sum = this.web3.utils.toWei(dto.sum, 'ether');
			return await this.walletService.extendFileStore(
				dto.dataValidator, 
				dto.serviceNode, 
				dto.sum
			);
		} catch (error) {
			throw new BadRequestException(error.message);
		}
	}
}