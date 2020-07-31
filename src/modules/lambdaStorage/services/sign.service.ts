import {Injectable} from "@nestjs/common";
import {HashService} from "./hash.service";
import {BIP32Interface} from "bip32/types/bip32";
const crypto = require('@jswebfans/hdkeytest')

@Injectable()
export class SignService {
    constructor(
        private readonly hashService: HashService
    ) {}

    public signTransactionData(
        accountNumber: string,
        chainId: string,
        amount: string,
        denom: string,
        gas: string,
        fromAddress: string,
        toAddress: string,
        sequence: string,
        account: BIP32Interface
    ) {
        const data = {
            account_number: accountNumber,
            chain_id: chainId,
            fee: {
                amount: [{
                    amount: amount,
                    denom: denom
                }],
                gas: "35182"
            },
            memo: '',
            msgs: [{
                type: 'cosmos-sdk/MsgSend',
                value: {
                    amount: [{
                        amount: amount,
                        denom: denom
                    }],
                    from_address: fromAddress,
                    to_address: toAddress
                }
            }],
            sequence: sequence
        };
        console.log(JSON.stringify(data));
        const sign = crypto.crypto.sign(Buffer.from(JSON.stringify(data)), account.privateKey);
        return sign.toString('base64');
    }
}
