import { Injectable, BadRequestException } from '@nestjs/common';
import { AccountDto } from '../../../../../contracts/child_chain/dto/account.dto';
import { AccountService } from '../../../../../contracts/child_chain/account.service';
import { DataOwnerRegisterDto } from './dataOwnerRegister.dto';

@Injectable()
export class DataOwnerRegister {
	private accountService: AccountService;

	constructor(accountService: AccountService) {
		this.accountService = accountService;
	}

	public async handle(dto: DataOwnerRegisterDto): Promise<any> {
		let isRegistered = await this.accountService.isRegistered(dto.dataOwner);
		if(isRegistered) {
			throw new BadRequestException("Address is registered in child chain!");
		}
		await this.accountService.unlockCoinbase();
		dto.coinbase = await this.accountService.coinbaseAccount();
		let tx = await this.accountService.registerDataOwnerValidator(dto);
		return tx;
	}
}