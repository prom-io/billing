import { Injectable, BadRequestException } from '@nestjs/common';
import { AccountService } from '../../../contracts/child_chain/account.service';

@Injectable()
export class AccountFetcher {
	public constructor(private readonly accountService: AccountService) {}

	public async allDataOwners(address: string): Promise<any> {
		let dataOwnersCount = await this.accountService.validatorOwnersCount(address);
		let dataOwners = [];
		for (var i = 0; i <= dataOwnersCount - 1; i++) {
			let ownerAddress = await this.accountService.validatorOwner(address, i);
			dataOwners.push(ownerAddress);
		}
		return dataOwners;
	}

	public async dataOwnersCount(address: string): Promise<any> {
		let dataOwnersCount = await this.accountService.validatorOwnersCount(address);
		return dataOwnersCount;
	}
}