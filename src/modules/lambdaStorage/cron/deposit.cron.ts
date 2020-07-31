import {Logger, Injectable} from "@nestjs/common";
import {Cron} from "@nestjs/schedule";
import {TransactionRequest} from "../httpRequest/transaction.request";
import {ConfigService} from "../../../config/config.service";
import asyncForEach from "../../../utils/asyncForEach";
import {WalletTransactionResponse} from "../httpResponse/walletTransaction.response";
import {WalletLambdaContract} from "../plasma/walletLambda.contract";
import {AccountService} from "../../../contracts/child_chain/account.service";
import {from} from "rxjs";
@Injectable()
export class DepositCron {
    private readonly logger = new Logger(DepositCron.name);

    constructor(
        private readonly configService: ConfigService,
        private readonly accountService: AccountService,
        private readonly transactionRequest: TransactionRequest,
        private readonly walletLambdaContract: WalletLambdaContract
    ) {}

    @Cron('* * * * *', {
        name: 'lambdaDeposit',
    })
    public async handle() {
        try {
            this.logger.debug('=== Script by deposit started ===');
            const address = this.configService.get('LAMBDA_NODE_ACCOUNT_ADDRESS');
            const request = await this.transactionRequest.getAddressTx(address);
            const transactions: WalletTransactionResponse[] = request.data;
            await asyncForEach(transactions, async (transaction: WalletTransactionResponse) => {
                const isProcessed = await this.walletLambdaContract.processedRequests(transaction.txhash);
                if(!isProcessed) {
                    let fromAddress = '';
                    let amount = '';
                    transaction.tx.value.msg.forEach((msg) => {
                        fromAddress = msg.value.from_address;
                        msg.value.amount.forEach((msgAmount) => {
                            if(msgAmount.denom == 'uvoda') {
                                amount = msgAmount.amount;
                            }
                        });
                    });

                    const isRegistered = await this.walletLambdaContract.registeredWallet(fromAddress);

                    if(isRegistered) {
                        await this.accountService.unlockCoinbase();
                        await this.walletLambdaContract.deposit(
                            fromAddress, transaction.txhash, Number(amount)
                        );
                    }
                }
            });
            this.logger.debug('=== Script by deposit completed ===');
        } catch (e) {
            this.logger.error('===== BEGIN ERROR =====');
            this.logger.error('== ERROR MESSAGE ==');
            this.logger.error(e.message);
            this.logger.error('== ERROR JS ==');
            console.log(e);
            this.logger.error('===== END ERROR =====');
        }
    }
}
