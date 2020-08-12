import {BadRequestException, Injectable} from "@nestjs/common";
import {ConfigService} from "../../../../config/config.service";
import {WalletLambdaContract} from "../../plasma/walletLambda.contract";
import {LambdaAccountService} from "../../services/lambdaAccount.service";
import {AccountRequest} from "../../httpRequest/account.request";
import {SignService} from "../../services/sign.service";
import {AccountService} from "../../../../contracts/child_chain/account.service";
import {BuyStorageFactory} from "../../factory/buyStorage.factory";
import {StorageRequest} from "../../httpRequest/storage.request";

@Injectable()
export class BuyStorageHandler {
    constructor(
        private readonly configService: ConfigService,
        private readonly walletLambda: WalletLambdaContract,
        private readonly lambdaAccountService: LambdaAccountService,
        private readonly storageRequest: StorageRequest,
        private readonly accountRequest: AccountRequest,
        private readonly signService: SignService,
        private readonly accountService: AccountService,
        private readonly buyStorageFactory: BuyStorageFactory
    ) {}

    public async handle() {
        try {
            const account = this.lambdaAccountService.getPrivateAndPublicKey(
                this.configService.get('LAMBDA_STORAGE_ACCOUNT_MNEMONIC')
            );
            const accountResponse = await this.accountRequest.getAccountData(
                this.configService.get('LAMBDA_STORAGE_ACCOUNT_ADDRESS')
            );
            const accountData = accountResponse.data;

            const txToSignature = this.buyStorageFactory.build(
                accountData.value.account_number,
                this.configService.get('LAMBDA_CHAIN_ID'),
                "369293",
                "ulamb",
                "147717",
                accountData.value.address,
                "2592000000000000",
                "lambdamarket",
                "67B11D56DC030E3B6E672B96DEF2E41820EF7181",
                "1",
                accountData.value.sequence
            );
            const signature = this.signService.signTransactionData(txToSignature, account);
            const res = await this.storageRequest.buyStorage(
                accountData.value.address,
                "2592000000000000",
                "lambdamarket",
                "67B11D56DC030E3B6E672B96DEF2E41820EF7181",
                "1",
                "369293",
                "ulamb",
                "147717",
                signature,
                account.publicKey.toString('base64')
            );
            console.log(res);
            console.log(res.data);
        } catch (e) {
            console.log(e);
            throw new BadRequestException(e.message);
        }
    }
}
