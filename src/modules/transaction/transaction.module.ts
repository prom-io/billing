import { Module } from '@nestjs/common';
import { TransactionController } from './transaction.controller';
import { TransactionFetcher } from './fetcher/transaction.fetcher';
import { TransactionService } from '../../contracts/child_chain/transaction.service';
import { Web3PrivateNetService } from '../../web3/web3PrivateNet.service';
import { Web3MainNetService } from '../../web3/web3MainNet.service';

@Module({
	imports: [],
	controllers: [TransactionController],
  	providers: [
  		TransactionService,
		TransactionFetcher, 
		Web3MainNetService, 
		Web3PrivateNetService
	],
})
export class TransactionModule {}
