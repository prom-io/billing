import {Injectable} from "@nestjs/common";
import {AccountResponse} from "../httpResponse/account.response";
import {TransactionFeeResponse} from "../httpResponse/transactionFee.response";
import {ConfigService} from "../../../config/config.service";

export interface SignRequestToTransfer {
    account_number: string,
    chain_id: string,
    fee: {
        amount: [{
            amount: string,
            denom: string
        }],
        gas: string
    },
    memo: string,
    msgs: [{
        type: string,
        value: {
            amount: [{
                amount: string,
                denom: string
            }],
            from_address: string,
            to_address: string
        }
    }],
    sequence: string
}

@Injectable()
export class SignRequestTransferFactory {
    constructor(private readonly config: ConfigService) {}

    public build(
        accountResponse: AccountResponse,
        transactionFeeResponse: TransactionFeeResponse,
        amount: string,
        toAddress: string
    ): SignRequestToTransfer {
        return {
            account_number: accountResponse.value.account_number,
            chain_id: this.config.get('LAMBDA_API_URL'),
            fee: {
                amount: [{
                    amount: amount,
                    denom: "uvoda"
                }],
                gas: transactionFeeResponse.gas_estimate
            },
            memo: "",
            msgs: [{
                type: "cosmos-sdk/MsgSend",
                value: {
                    amount: [{
                        amount: amount,
                        denom: "uvoda"
                    }],
                    from_address: accountResponse.value.address,
                    to_address: toAddress
                }
            }],
            sequence: accountResponse.value.sequence
        };
    }
}
