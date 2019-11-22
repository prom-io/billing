import { Injectable, BadRequestException } from '@nestjs/common';
import { AccountDto } from '../../../../../contracts/child_chain/dto/account.dto';
import { AccountService } from '../../../../../contracts/child_chain/account.service';

@Injectable()
export class DataMartRegister {
	private accountService: AccountService;

	constructor(accountService: AccountService) {
		this.accountService = accountService;
	}

	public async handle(dto: AccountDto): Promise<any> {
		let isRegistered = await this.accountService.isRegistered(dto.owner);
		if(isRegistered) {
			throw new BadRequestException("Address is registered in child chain!");
		}
		dto.coinbase = await this.accountService.coinbaseAccount();
		let tx = await this.accountService.registerDataMart(dto);
		return tx;
	}
}