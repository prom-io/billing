import {DepositDto} from "./deposit.dto";
import {Injectable} from "@nestjs/common";
import {AccountRequest} from "../../httpRequest/account.request";
import {TransactionRequest} from "../../httpRequest/transaction.request";
import {ConfigService} from "../../../../config/config.service";
import {SignRequestToTransfer, SignRequestTransferFactory} from "../../factory/signRequestTransfer.factory";
import {SignService} from "../../services/sign.service";
import { encodeString, decodeString } from '@tendermint/amino-js';


@Injectable()
export class DepositHandler {
    constructor(
        private readonly accountRequest: AccountRequest,
        private readonly transactionRequest: TransactionRequest,
        private readonly configService: ConfigService,
        private readonly signRequestTransferFactory: SignRequestTransferFactory,
        private readonly signService: SignService
    ) {}

    public async handle(depositDto: DepositDto) {
        try {
            const accountData = await this.accountRequest.getAccountData(depositDto.fromAddress);
            const txFeeData = await this.transactionRequest.calculateTxFee(
                accountData.data,
                depositDto.amount,
                this.configService.get('LAMBDA_NODE_ACCOUNT_ADDRESS')
            );
            const signObj: SignRequestToTransfer = this.signRequestTransferFactory.build(
                accountData.data,
                txFeeData.data,
                depositDto.amount,
                this.configService.get('LAMBDA_NODE_ACCOUNT_ADDRESS')
            );
            let privateKeyConverted: any = encodeString(depositDto.privateKey);
            console.log(privateKeyConverted);
            const signature = this.signService.sign(JSON.stringify(signObj), privateKeyConverted);
            console.log(signature);
        } catch (e) {
            console.log(e);
        }
    }
}
