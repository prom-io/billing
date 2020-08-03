import { Injectable } from '@nestjs/common';
import { Web3PrivateNetService } from "../../web3/web3PrivateNet.service";
import { PayDto } from "../../modules/dataUpload/handlers/pay/pay.dto";
import { AccountService } from "./account.service";
import Web3 from "web3";
import { ConfigService } from "../../config/config.service";
import BN = require("bn.js");


@Injectable()
export class DataUploadService {
	private web3: Web3;
	private accountService: AccountService;
	private contract: any;
	private config: ConfigService;

	constructor(
		web3Service: Web3PrivateNetService, 
		accountService: AccountService,
		configService: ConfigService
	) {
		let web3 = web3Service.websocketInstance();
		this.web3 = web3;
		this.accountService = accountService;
		this.config = configService;
		this.contract = new web3.eth.Contract(
			configService.getDataUploadAbi(), 
			configService.getDataUploadAddress()
		);
	}

	public getContract(): any {
		return this.contract;
	}

	public async payToUpload(dto: PayDto, signature: string, msgHash: string): Promise<any> {
		console.log(dto.coinbase);
		const gas = await this.contract.methods.upload(
			dto.id,
			dto.name,
			dto.size,
			dto.extension,
			dto.mime_type,
			dto.meta_data,
			dto.data_validator,
			dto.service_node,
			dto.data_owner,
			String(dto.amount),
			signature,
			msgHash
		).estimateGas({from: dto.coinbase});
		console.log(gas);
		return this.contract.methods.upload(
				dto.id, 
				dto.name,
				dto.size,
				dto.extension,
				dto.mime_type,
				dto.meta_data,
				dto.data_validator,
				dto.service_node, 
				dto.data_owner,
				String(dto.amount),
				signature,
				msgHash
			)
			.send({
				from: dto.coinbase, 
				gas: 6600000,
				gasPrice: 8 * 1e9
			});
	}

	public async fileCount(): Promise<any> {
		return this.contract.methods.fileCount().call();
	}

	public async fileList(index: number): Promise<any> {
		return this.contract.methods.fileList(index).call();
	}

	public async uploadedData(id: string): Promise<any> {
		return this.contract.methods.uploadedData(id).call();
	}

	public async fileUploadedCount(id: string): Promise<any> {
		return this.contract.methods.fileUploadedCount(id).call();
	}

	public async fileUploaded(id: string, index: number): Promise<any> {
		return this.contract.methods.fileUploaded(id, index).call();
	}
}
