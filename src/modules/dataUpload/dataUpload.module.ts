import { Module } from '@nestjs/common';
import { DataUploadController } from './dataUpload.controller';
import { PayHandler } from './handlers/pay/pay.handler';
import { DataUploadService } from '../../contracts/child_chain/dataUpload.service';
import { AccountService } from '../../contracts/child_chain/account.service';
import { Web3PrivateNetService } from '../../web3/web3PrivateNet.service';
import { Web3MainNetService } from '../../web3/web3MainNet.service';
import { TransactionService } from '../../contracts/child_chain/transaction.service';
import { WalletService } from '../../contracts/child_chain/wallet.service';
import { TransactionDto } from './services/transaction.dto';
import { TransactionPayService } from './services/transactionPay.service';
import {WalletLambdaContract} from "../lambdaStorage/plasma/walletLambda.contract";
import {PlasmaNetworkService} from "../../web3/plasmaNetwork.service";
import {TransactionPlasmaRepository} from "../../repositories/transactionPlasma.repository";
import {TransactionPlasmaFactory} from "../../factories/transactionPlasma.factory";

@Module({
  imports: [],
  controllers: [DataUploadController],
  providers: [
      TransactionPlasmaRepository,
      TransactionPlasmaFactory,
      PayHandler,
      DataUploadService,
      Web3MainNetService,
      Web3PrivateNetService,
      AccountService,
      TransactionService,
      TransactionPayService,
      TransactionDto,
      WalletService,
      WalletLambdaContract,
      PlasmaNetworkService
  ],
})
export class DataUploadModule {}
