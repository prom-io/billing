import { Injectable, BadRequestException } from '@nestjs/common';
import { BuyDto } from "./buy.dto";
import { DataMartService } from '../../../../contracts/child_chain/dataMart.service';
import { AccountService } from '../../../../contracts/child_chain/account.service'
@Injectable()
export class BuyHandler {
	private dataMartservice: DataMartService;
	private accountService: AccountService;

	constructor(service: DataMartService, accountService: AccountService) {
		this.dataMartservice = service;
		this.accountService = accountService;
	}

	public async handle(dto: BuyDto): Promise<any> {
		try {
			await this.accountService.unlockCoinbase();
			dto.coinbase = await this.accountService.coinbaseAccount();
			let exists = await this.checkAccounts(dto);
			let tx = await this.dataMartservice.sellData(dto);
			console.log(tx);
			return tx;
		} catch (e) {
			throw e;
		}
	}

	private async checkAccounts(dto: BuyDto): Promise<any> {
		let checkOwner = await this.accountService.checkAccountExist(dto.owner);
		let checkDataValidator = await this.accountService.checkAccountExist(dto.data_validator);
		if(checkOwner == false) {
			throw new BadRequestException("Is account " + dto.owner + " not registered!");
		}

		if(checkDataValidator == false) {
			throw new BadRequestException("Is account " + dto.data_validator + " not registered!");
		}
	}
}