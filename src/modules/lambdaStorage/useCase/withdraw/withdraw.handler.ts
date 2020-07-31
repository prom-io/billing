import {BadRequestException, Injectable} from "@nestjs/common";
import {WithdrawDto} from "./withdraw.dto";
import {WalletLambdaContract} from "../../plasma/walletLambda.contract";
import {LambdaAccountService} from "../../services/lambdaAccount.service";
import {ConfigService} from "../../../../config/config.service";
import {TransactionRequest} from "../../httpRequest/transaction.request";
import {AccountRequest} from "../../httpRequest/account.request";
import {SignService} from "../../services/sign.service";
import {AccountService} from "../../../../contracts/child_chain/account.service";

@Injectable()
export class WithdrawHandler {
    constructor(
        private readonly configService: ConfigService,
        private readonly walletLambda: WalletLambdaContract,
        private readonly lambdaAccountService: LambdaAccountService,
        private readonly transactionRequest: TransactionRequest,
        private readonly accountRequest: AccountRequest,
        private readonly signService: SignService,
        private readonly accountService: AccountService
    ) {}

    public async handle(dto: WithdrawDto): Promise<any> {
        try {
            const wallet = await this.walletLambda.lambdaWalletByEthAddress(dto.ethereumAddress);
            const amount = dto.amount * (10 ** 10);
            if(wallet.ethAddress === '') {
                throw new Error('Wallet not registered!');
            }

            if(dto.amount > wallet.amount) {
                throw new Error('Not enough funds on the balance sheet!');
            }
            const account = this.lambdaAccountService.getPrivateAndPublicKey(
                this.configService.get('LAMBDA_NODE_ACCOUNT_MNEMONIC')
            );
            const accountResponse = await this.accountRequest.getAccountData(
                this.configService.get('LAMBDA_NODE_ACCOUNT_ADDRESS')
            );
            const accountData = accountResponse.data;
            const txFee = await this.transactionRequest.calculateTxFee(
                accountData,
                String(amount),
                wallet.lambdaAddress
            );
            const signature = this.signService.signTransactionData(
                accountData.value.account_number,
                this.configService.get('LAMBDA_CHAIN_ID'),
                String(amount),
                this.configService.get('LAMBDA_DENOM'),
                txFee.data.gas_estimate,
                this.configService.get('LAMBDA_NODE_ACCOUNT_ADDRESS'),
                wallet.lambdaAddress,
                accountData.value.sequence,
                account
            );
            const feeAmont = Math.round(Number(txFee.data.gas_estimate) * 0.025);
            const transfer = await this.transactionRequest.transferTo(
                String(amount),
                this.configService.get('LAMBDA_DENOM'),
                this.configService.get('LAMBDA_NODE_ACCOUNT_ADDRESS'),
                wallet.lambdaAddress,
                String(feeAmont),
                txFee.data.gas_estimate,
                signature,
                account.publicKey.toString('base64')
            );
            await this.accountService.unlockCoinbase();
            await this.walletLambda.balanceMinusByEthereumAddress(
                dto.ethereumAddress, amount
            );
        } catch (e) {
            console.log(e);
            throw new BadRequestException(e.message);
        }
    }
}
//
// 1001984782ulamb
// 8203002000ulamb
// 10000000000
// 10000000000
// 1000000000ulamb
