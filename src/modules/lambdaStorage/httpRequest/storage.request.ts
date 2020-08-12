import {HttpService, Injectable} from "@nestjs/common";
import {ConfigService} from "../../../config/config.service";

@Injectable()
export class StorageRequest {
    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService
    ) {}

    public buyStorage(
        address: string,
        duration: string,
        marketName: string,
        sellOrderId: string,
        size: string,
        amount: string,
        denom: string,
        gas: string,
        signature: string,
        pubKey: string
    ) {
        return this.httpService.post('/txs', {
            tx: {
                msg: [{
                    type: 'lambda/MsgCreateBuyOrder',
                    value: {
                        address: address,
                        duration: duration,
                        marketName: marketName,
                        sellOrderId: sellOrderId,
                        size: size
                    }
                }],
                fee: {
                    amount: [{
                        amount: amount,
                        denom: denom
                    }],
                    gas: gas
                },
                signatures: [{
                    signature: signature,
                    pub_key: {
                        type: 'tendermint/PubKeySecp256k1',
                        value: pubKey
                    }
                }],
                memo: ""
            },
            mode: 'block'
        }, {
            baseURL: this.configService.get('LAMBDA_API_URL')
        }).toPromise();
    }
}
