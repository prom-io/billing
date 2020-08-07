import { Module } from '@nestjs/common';
import { TransactionController } from './transaction.controller';
import { TransactionFetcher } from './fetcher/transaction.fetcher';
import { TransactionService } from '../../contracts/child_chain/transaction.service';
import { Web3PrivateNetService } from '../../web3/web3PrivateNet.service';
import { Web3MainNetService } from '../../web3/web3MainNet.service';
import {SyncAllTransactionCron} from "./cron/syncAllTransaction.cron";
import {TransactionPlasmaRepository} from "../../repositories/transactionPlasma.repository";
import {TransactionPlasmaFactory} from "../../factories/transactionPlasma.factory";

@Module({
	imports: [],
	controllers: [TransactionController],
  	providers: [
  		TransactionPlasmaRepository,
		TransactionPlasmaFactory,
  		SyncAllTransactionCron,
  		TransactionService,
		TransactionFetcher, 
		Web3MainNetService, 
		Web3PrivateNetService
	],
})
export class TransactionModule {}
