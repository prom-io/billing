import { Module } from '@nestjs/common';
import { DepositController } from './deposit.controller';
import { DepositHandler } from './handler/deposit.handler';
import { DepositDto } from './handler/deposit.dto';
import { PlasmaService } from '../contracts/root_chain/plasma.service';
import { WalletService } from '../contracts/child_chain/wallet.service';
import { AccountService } from '../contracts/child_chain/account.service';
import { Web3PrivateNetService } from '../web3/web3PrivateNet.service';
import { Web3MainNetService } from '../web3/web3MainNet.service';
@Module({
  imports: [],
  controllers: [DepositController],
  providers: [
  	DepositHandler, 
  	DepositDto, 
  	PlasmaService, 
  	Web3PrivateNetService, 
  	Web3MainNetService,
  	AccountService,
  	WalletService
  ],
})
export class DepositModule {}
