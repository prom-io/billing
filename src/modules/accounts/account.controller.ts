import { Controller, Get, Query, Post, HttpStatus, Res, Body, Put, Param, Delete } from '@nestjs/common';
import { AccountDto } from '../../contracts/child_chain/dto/account.dto';
import { DataOwnerRegisterDto } from './handlers/register/dataOwner/dataOwnerRegister.dto';
import { DataValidatorRegisterHandler } from './handlers/register/dataValidator/dataValidatorRegister.handler';
import { DataMartRegister } from './handlers/register/dataMart/dataMartRegister';
import { DataOwnerRegister } from './handlers/register/dataOwner/dataOwnerRegister.handler';
import { ServiceNodeRegister } from './handlers/register/serviceNode/serviceNodeRegister';
import { AccountService } from '../../contracts/child_chain/account.service';
import { Response } from 'express';
import { AccountFetcher } from './fetcher/account.fetcher';

@Controller('account')
export class AccountController {
	private dataValidatorHandler: DataValidatorRegisterHandler;
	private dataMartHandler: DataMartRegister;
	private dataOwnerHandler: DataOwnerRegister;
	private serviceNodeHandler: ServiceNodeRegister;
	private accountService: AccountService;
	private fetcher: AccountFetcher;

	constructor(
		dataValidatorHandler: DataValidatorRegisterHandler,
		dataMartHandler: DataMartRegister,
		dataOwnerHandler: DataOwnerRegister,
		serviceNodeHandler: ServiceNodeRegister,
		accountService: AccountService,
		fetcher: AccountFetcher
	) {
		this.dataValidatorHandler = dataValidatorHandler;
		this.dataMartHandler = dataMartHandler;
		this.dataOwnerHandler = dataOwnerHandler;
		this.serviceNodeHandler = serviceNodeHandler;
		this.accountService = accountService;
		this.fetcher = fetcher;
	}

	@Post('register/data-validator')
	async registerDataValidator(@Body() dto: AccountDto, @Res() res: Response) {
		await this.dataValidatorHandler.handle(dto);
		return res.status(HttpStatus.OK).send();
	}

	@Post('register/data-mart')
	async registerDataMart(@Body() dto: AccountDto, @Res() res: Response) {
		await this.dataMartHandler.handle(dto);
		return res.status(HttpStatus.OK).send();
	}

	@Post('register/service-node')
	async registerServiceNode(@Body() dto: AccountDto, @Res() res: Response) {
		await this.serviceNodeHandler.handle(dto);
		return res.status(HttpStatus.OK).send();
	}

	@Post('register/data-owner')
	async registerDataOwner(@Body() dto: DataOwnerRegisterDto, @Res() res: Response) {
		await this.dataOwnerHandler.handle(dto);
		return res.status(HttpStatus.OK).send();
	}

	@Get('check/registered/:address')
	async isRegistered(@Param('address') address: string, @Res() res: Response) {
		let is_registered = await this.accountService.isRegistered(address);
		return res.status(HttpStatus.OK).send({'is_registered': is_registered})
	}

	@Get('address/role/:address')
	async addressRole(@Param('address') address: string, @Res() res: Response) {
		let roles = {
			"1": "Data Validator",
			"2": "Data Mart",
			"3": "Service Node",
			"4": "Data Owner"
		};
		let role = await this.accountService.getRole(address);
		return res.status(HttpStatus.OK).send({'role': roles[role]})
	}

	@Get('owners/:address')
	async dataOwners(@Param('address') address: string, @Res() res: Response) {
		let dataOwners = await this.fetcher.allDataOwners(address);
		return res.status(HttpStatus.OK).send({"address": dataOwners});
	}

	@Get('owners/count/:address')
	async dataOwnersCount(@Param('address') address: string, @Res() res: Response) {
		let dataOwners = await this.fetcher.dataOwnersCount(address);
		return res.status(HttpStatus.OK).send({"count": dataOwners});
	}
}