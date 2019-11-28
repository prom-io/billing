import { Injectable, BadRequestException } from '@nestjs/common';
import { BuyDto } from "./buy.dto";
import { DataMartService } from '../../../../contracts/child_chain/dataMart.service';
import { AccountService } from '../../../../contracts/child_chain/account.service';
import { Web3PrivateNetService } from '../../../../web3/web3PrivateNet.service';
import Web3 from 'web3';

@Injectable()
export class BuyHandler {
	private dataMartservice: DataMartService;
	private accountService: AccountService;
	private web3: Web3;

	constructor(service: DataMartService, accountService: AccountService, web3Service: Web3PrivateNetService) {
		this.dataMartservice = service;
		this.accountService = accountService;
		this.web3 = web3Service.websocketInstance();
	}

	public async handle(dto: BuyDto): Promise<any> {
		console.log('start');
		dto.coinbase = await this.accountService.coinbaseAccount();
		console.log('coinbase');
		dto.sum = this.web3.utils.toWei(dto.sum, 'ether');
		console.log('dto.sum');
		let exists = await this.checkAccounts(dto);
		console.log('exists');
		let tx = await this.dataMartservice.sellData(dto);
		console.log(tx);
		return tx;
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