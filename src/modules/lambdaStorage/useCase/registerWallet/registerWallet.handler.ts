import {BadRequestException, Injectable} from "@nestjs/common";
import {RegisterWalletDto} from "./registerWallet.dto";
import {WalletLambdaContract} from "../../plasma/walletLambda.contract";
import {AccountService} from "../../../../contracts/child_chain/account.service";

@Injectable()
export class RegisterWalletHandler {
    constructor(
        private readonly walletLambdaContract: WalletLambdaContract,
        private readonly accountService: AccountService
    ) {}

    public async handle(registerWalletDto: RegisterWalletDto) {
        try {
            const isRegistered = await this.walletLambdaContract.registeredWallet(
                registerWalletDto.lambdaAddress
            );

            if(isRegistered) {
                throw new Error('Lambda wallet is registered!');
            }

            await this.accountService.unlockCoinbase();
            await this.walletLambdaContract.newWallet(
                registerWalletDto.ethereumAddress,
                registerWalletDto.lambdaAddress
            );
        } catch (e) {
            throw new BadRequestException(e.message);
        }
    }
}
