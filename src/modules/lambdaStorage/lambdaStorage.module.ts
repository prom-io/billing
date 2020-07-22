import {HttpModule, HttpService, Module} from '@nestjs/common';
import {AccountController} from "./account.controller";
import {LambdaAccountService} from "./services/lambdaAccount.service";
import {MnemonicService} from "./services/mnemonic.service";
import {HashService} from "./services/hash.service";
import {DepositHandler} from "./useCase/deposit/deposit.handler";
import {DepositDto} from "./useCase/deposit/deposit.dto";
import {AccountRequest} from "./httpRequest/account.request";
import {TransactionRequest} from "./httpRequest/transaction.request";
import {SignRequestTransferFactory} from "./factory/signRequestTransfer.factory";
import {SignService} from "./services/sign.service";
import {RegisterWalletHandler} from "./useCase/registerWallet/registerWallet.handler";
import {RegisterWalletDto} from "./useCase/registerWallet/registerWallet.dto";
import {WalletLambdaContract} from "./plasma/walletLambda.contract";
import {PlasmaNetworkService} from "../../web3/plasmaNetwork.service";
import {AccountService} from "../../contracts/child_chain/account.service";
import {Web3PrivateNetService} from "../../web3/web3PrivateNet.service";
import {Web3MainNetService} from "../../web3/web3MainNet.service";
import {DepositCron} from "./cron/deposit.cron";
@Module({
  imports: [
      HttpModule.register({
        timeout: 20000,
        maxRedirects: 5
      })
  ],
  controllers: [
      AccountController,
  ],
  providers: [
      Web3PrivateNetService,
      Web3MainNetService,
      AccountService,
      PlasmaNetworkService,
      WalletLambdaContract,
      LambdaAccountService,
      MnemonicService,
      HashService,
      DepositHandler,
      DepositDto,
      AccountRequest,
      TransactionRequest,
      SignRequestTransferFactory,
      SignService,
      RegisterWalletHandler,
      RegisterWalletDto,
      DepositCron
  ],
})
export class LambdaStorageModule {}
