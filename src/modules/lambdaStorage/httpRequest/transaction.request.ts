import {HttpService, Injectable} from "@nestjs/common";
import {ConfigService} from "../../../config/config.service";
import {AxiosResponse} from "axios";
import {TransactionFeeResponse} from "../httpResponse/transactionFee.response";
import {AccountResponse} from "../httpResponse/account.response";
import {WalletTransactionResponse} from "../httpResponse/walletTransaction.response";

@Injectable()
export class TransactionRequest {
    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService
    ) {}

    public getAddressTx(address: string): Promise<AxiosResponse<WalletTransactionResponse[]>> {
        return this.httpService.get(`/txs?address=${address}`, {
            baseURL: this.configService.get('LAMBDA_API_URL')
        }).toPromise();
    }

    public calculateTxFee(accountResponse: AccountResponse, amount: string, toAddress: string): Promise<AxiosResponse<TransactionFeeResponse>> {
        return this.httpService.post(`/bank/accounts/${accountResponse.value.address}/transfers`, {
            base_req: {
                sequence: accountResponse.value.sequence,
                from: accountResponse.value.address,
                account_number: accountResponse.value.account_number,
                chain_id: this.configService.get('LAMBDA_CHAIN_ID'),
                simulate: true,
                memo: ""
            },
            amount: [{
                amount: amount,
                denom: "ulamb"
            }],
            from_address: accountResponse.value.address,
            to_address: toAddress
        }, {
            baseURL: this.configService.get('LAMBDA_API_URL')
        }).toPromise();
    }
}
