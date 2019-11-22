import { PlasmaService } from '../../contracts/root_chain/plasma.service';
import { DepositDto } from './deposit.dto';
import { Web3PrivateNetService } from '../../web3/web3PrivateNet.service';
import Web3 from 'web3';
import { Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class DepositHandler {
	private web3: Web3;
	constructor(
		private readonly plasmaService: PlasmaService,
		private readonly web3Service: Web3PrivateNetService
	) {
		
	}

	public async handle(dto: DepositDto): Promise<any> {
		let web3 = this.web3Service.websocketInstance();
		let sum = web3.utils.toWei(dto.sum, 'ether');
		let tx = await this.plasmaService.deposit(dto.owner, sum);
		return tx;
	}
}