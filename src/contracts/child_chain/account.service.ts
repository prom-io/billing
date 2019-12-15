import { Web3PrivateNetService } from "../../web3/web3PrivateNet.service";
import { Injectable, Global, BadRequestException } from '@nestjs/common';
import Web3 from 'web3';
import { ConfigService } from "../../config/config.service";
import { AccountDto } from "./dto/account.dto";
import { DataOwnerRegisterDto } from '../../modules/accounts/handlers/register/dataOwner/dataOwnerRegister.dto';

@Injectable()
export class AccountService {
	private web3: Web3;
	private contract: any;
	private config: ConfigService;

	constructor(private readonly web3Service: Web3PrivateNetService, configService: ConfigService) {
		let web3 = web3Service.websocketInstance();
		this.web3 = web3;
		this.config = configService;
		this.contract = new web3.eth.Contract(
			configService.getAccountManageAbi(), 
			configService.getAccountManageAddress()
		);
	}

	public initAccount(dto: AccountDto): Promise<any> {
		return this.contract.methods.initAccount(dto.owner, dto.sum).send({
			from: dto.coinbase,
			gas: 1e6,
			gasPrice: 8 * 1e9
		});
	}

	public async registerDataMart(dto: AccountDto): Promise<any> {
		return this.contract.methods.registerDataMart(dto.owner).send({
			from: dto.coinbase,
			gas: 1e6,
			gasPrice: 8 * 1e9
		});
	}

	public async registerServiceNode(dto: AccountDto): Promise<any> {
		return this.contract.methods.registerServiceNode(dto.owner).send({
			from: dto.coinbase,
			gas: 1e6,
			gasPrice: 8 * 1e9
		});
	}

	public async registerDataValidator(dto: AccountDto): Promise<any> {
		return this.contract.methods.registerDataValidator(dto.owner).send({
			from: dto.coinbase,
			gas: 1e6,
			gasPrice: 8 * 1e9
		});
	}

	public async registerDataOwner(dto: AccountDto): Promise<any> {
		return this.contract.methods.registerDataOwner(dto.owner).send({
			from: dto.coinbase,
			gas: 1e6,
			gasPrice: 8 * 1e9
		});
	}

	public async registerDataOwnerValidator(dto: DataOwnerRegisterDto): Promise<any> {
		return this.contract.methods.registerOwner(dto.dataValidator, dto.dataOwner).send({
			from: dto.coinbase,
			gas: 1e6,
			gasPrice: 8 * 1e9
		});
	}

	public async isRegistered(address: string): Promise<any> {
		return this.contract.methods.isRegistered(address).call();
	}

	public async unlockAccount(address: string, password: string, seconds: number): Promise<any> {
		return this.web3.eth.personal.unlockAccount(address, password, seconds);
	}

	public async checkAccountExist(address: string): Promise<any> {
		return this.contract.methods.isRegistered(address).call();
	}

	public async coinbaseAccount(): Promise<string> {
		return this.web3.eth.getCoinbase();
	}

	public async unlockCoinbase(): Promise<any> {
		let account = await this.coinbaseAccount();
		return this.unlockAccount(account, this.config.get("COINBASE_PASSWORD"), 600);
	}

	public async getRole(address: string): Promise<any> {
		return this.contract.methods.getRole(address).call();
	}

	public async isDataValidator(address: string): Promise<any> {
		let role = await this.getRole(address);

		if(role == 1) {
			return true;
		}
		throw new BadRequestException(`This ${address} is not Data Validator!`);
	}

	public async isDataMart(address: string): Promise<any> {
		let role = await this.getRole(address);

		if(role == 2) {
			return true;
		}
		throw new BadRequestException(`This ${address} is not Data Mart!`);
	}

	public async isServiceNode(address: string): Promise<any> {
		let role = await this.getRole(address);

		if(role == 3) {
			return true;
		}
		throw new BadRequestException(`This ${address} is not Service node!`);
	}

	public async isDataOwner(address: string): Promise<any> {
		let role = await this.getRole(address);

		if(role == 4) {
			return true;
		}
		throw new BadRequestException(`This ${address} is not Data owner!`);
	}

	public async validatorOwnersCount(address: string): Promise<any> {
		return this.contract.methods.dataOwnersCount(address).call();
	}

	public async validatorOwner(address: string, index: number): Promise<any> {
		return this.contract.methods.dataOwners(address, index).call();
	}
}