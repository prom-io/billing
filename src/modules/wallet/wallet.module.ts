import { Module } from '@nestjs/common';
import { WalletController } from './wallet.controller';
import { WalletService } from '../../contracts/child_chain/wallet.service';
import { WalletFetcher } from './fetcher/wallet.fetcher';
import { Web3PrivateNetService } from '../../web3/web3PrivateNet.service';
import { Web3MainNetService } from '../../web3/web3MainNet.service';
import { DepositHandler } from './handlers/deposit/deposit.handler';
import { PlasmaService } from '../../contracts/root_chain/plasma.service';
import { AccountService } from '../../contracts/child_chain/account.service';
import { ExtendFileStoreHandler } from './handlers/extendFileStore/extendFileStore.handler';
import { ExtendFileStoreDto } from './handlers/extendFileStore/extendFileStore.dto';
import { TransferHandler } from './handlers/transfer/transfer.handler';
import { TransferDto } from './handlers/transfer/transfer.dto';
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
  	PlasmaService,
    ExtendFileStoreHandler,
    TransferHandler
  ],
})
export class WalletModule {}
