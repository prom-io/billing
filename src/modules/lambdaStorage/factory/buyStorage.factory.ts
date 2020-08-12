import {Injectable} from "@nestjs/common";
import {AccountResponse} from "../httpResponse/account.response";
import {TransactionFeeResponse} from "../httpResponse/transactionFee.response";
import {ConfigService} from "../../../config/config.service";
import {BIP32Interface} from "bip32/types/bip32";

export interface BuyStorage {
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
            address: string,
            duration: string,
            marketName: string,
            sellOrderId: string,
            size: string
        }
    }],
    sequence: string
}

@Injectable()
export class BuyStorageFactory {
    constructor(private readonly config: ConfigService) {}

    public build(
        accountNumber: string,
        chainId: string,
        amount: string,
        denom: string,
        gas: string,
        address: string,
        duration: string,
        marketName: string,
        sellOrderId: string,
        size: string,
        sequence: string
    ): BuyStorage {
        return {
            account_number: accountNumber,
            chain_id: chainId,
            fee: {
                amount: [{
                    amount: amount,
                    denom: denom
                }],
                gas: gas
            },
            memo: '',
            msgs: [{
                type: 'lambda/MsgCreateBuyOrder',
                value: {
                    address: address,
                    duration: duration,
                    marketName: marketName,
                    sellOrderId: sellOrderId,
                    size: size
                }
            }],
            sequence: sequence
        };
    }
}
