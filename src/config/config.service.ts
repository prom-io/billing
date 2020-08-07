import * as dotenv from 'dotenv';
import * as fs from 'fs';
import {walletLambdaAbi} from "./contractAbi/plasmaNetwork/walletLambda.abi";
import {accountManageAbi} from "./contractAbi/plasmaNetwork/accountManage.abi";
import {dataSellAbi} from "./contractAbi/plasmaNetwork/dataSell.abi";
import {dataUploadAbi} from "./contractAbi/plasmaNetwork/dataUpload.abi";
import {transactionAbi} from "./contractAbi/plasmaNetwork/transaction.abi";
import {walletAbi} from "./contractAbi/plasmaNetwork/wallet.abi";
import {plasmaAbi} from "./contractAbi/mainNetwork/plasma.abi";
import {AbiItem} from 'web3-utils';
import {TypeOrmModuleOptions} from "@nestjs/typeorm";
import {TransactionPlasmaEntity} from "../entities/transactionPlasma.entity";

export class ConfigService {
	private readonly envConfig: { [key: string]: string };

	constructor(filePath: any) {
		this.envConfig = dotenv.parse(fs.readFileSync(filePath));
	}

	get(key: string): string {
		return this.envConfig[key];
	}

  getWalletLambdaAbi(): AbiItem[] {
    return walletLambdaAbi;
  }

  getWalletLambdaAddress(): string {
    return this.get('PLASMA_NETWORK_WALLET_LAMBDA_ADDRESS');
  }

	getPlasmaAbi(): AbiItem[] {
		return plasmaAbi;
	}

	getPlasmaAddress(): string {
		return this.get("PLASMA_CONTRACT_ADDRESS");
	}

	getAccountManageAbi(): AbiItem[] {
		return accountManageAbi;
	}

	getAccountManageAddress(): string {
		return this.get("ACCOUNT_MANAGE_CONTRACT_ADDRESS");
	}

	getDataSellAbi(): AbiItem[] {
		return dataSellAbi;
	}

	getDataSellAddress(): string {
		return this.get("DATA_SELL_CONTRACT_ADDRESS");
	}

	getDataUploadAbi(): AbiItem[] {
		return dataUploadAbi;
	}

	getDataUploadAddress(): string {
		return this.get("DATA_UPLOAD_CONTRACT_ADDRESS");
	}

	getTransactionAbi(): AbiItem[] {
		return transactionAbi;
	}

	getTransactionAddress(): string {
		return this.get("TRANSACTION_CONTRACT_ADDRESS");
	}

	getWalletAbi(): AbiItem[] {
		return walletAbi;
	}

	getWalletAddress(): string {
		return this.get("WALLET_CONTRACT_ADDRESS");
	}

	getTypeOrmConfig(): TypeOrmModuleOptions {
		return {
			type: 'postgres',
			host: this.get('POSTGRES_HOST'),
			port: Number(this.get('POSTGRES_PORT')),
			username: this.get('POSTGRES_USER'),
			password: this.get('POSTGRES_PASSWORD'),
			database: this.get('POSTGRES_DATABASE'),
			entities: [TransactionPlasmaEntity],
			synchronize: true,
			ssl: false,
		};
	}
}
