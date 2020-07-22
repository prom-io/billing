import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlasmaService } from './contracts/root_chain/plasma.service';
import { DataUploadModule } from './modules/dataUpload/dataUpload.module';
import { DataMartModule } from './modules/dataMart/dataMart.module';
import { Web3MainNetService } from './web3/web3MainNet.service';
import { Web3PrivateNetService } from './web3/web3PrivateNet.service';
import { ConfigModule } from './config/config.module';
import { WalletService } from './contracts/child_chain/wallet.service';
import { TransactionService } from './contracts/child_chain/transaction.service';
import { AccountService } from './contracts/child_chain/account.service';
import { WalletModule } from './modules/wallet/wallet.module';
import { AccountModule } from './modules/accounts/account.module';
import { FileModule } from './modules/files/file.module';
import { DepositModule } from './deposit/deposit.module';
import { Web3Module } from './web3/web3.module'
import { ScheduleModule } from '@nestjs/schedule';
import { TransactionModule } from './modules/transaction/transaction.module'
import {LambdaStorageModule} from "./modules/lambdaStorage/lambdaStorage.module";
import {SignModule} from "./modules/sign/sign.module";

@Module({
  imports: [
    ScheduleModule.forRoot(),
    WalletModule,
    DataUploadModule,
    DataMartModule,
    AccountModule,
    TransactionModule,
    ConfigModule,
    DepositModule,
    FileModule,
    LambdaStorageModule,
    SignModule
  ],
  controllers: [AppController],
  providers: [
  	AppService, 
  	Web3PrivateNetService, 
  	Web3MainNetService, 
  	WalletService, 
    TransactionService,
  	PlasmaService,
  	AccountService
  ],
})
export class AppModule {}
