import { Module } from '@nestjs/common';
import { WalletController } from './wallet.controller';
import { WalletService } from '../../contracts/child_chain/wallet.service';
import { WalletFetcher } from './fetcher/wallet.fetcher';
import { Web3PrivateNetService } from '../../web3/web3PrivateNet.service';
import { Web3MainNetService } from '../../web3/web3MainNet.service';
import { DepositHandler } from './handlers/deposit/deposit.handler';
import { PlasmaService } from '../../contracts/root_chain/plasma.service';
import { AccountService } from '../../contracts/child_chain/account.service';

@Module({
  imports: [],
  controllers: [WalletController],
  providers: [
  	AccountService,
  	WalletFetcher, 
  	WalletService, 
  	Web3PrivateNetService, 
  	Web3MainNetService,
  	DepositHandler, 
  	PlasmaService
  ],
})
export class WalletModule {}
