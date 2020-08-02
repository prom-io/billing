import {Injectable} from "@nestjs/common";
import {PlasmaNetworkService} from "../../../web3/plasmaNetwork.service";
import {ConfigService} from "../../../config/config.service";
import Web3 from "web3";
import {Eth} from 'web3-eth';
import {WalletLambdaInterface} from "./walletLambda.interface";
@Injectable()
export class WalletLambdaContract {
    private readonly web3: Web3;

    constructor(
        private readonly plasmaNetworkService: PlasmaNetworkService,
        private readonly configService: ConfigService
    ) {
        this.web3 = plasmaNetworkService.httpInstance();
    }

    public instance() {
        return new this.web3.eth.Contract(
            this.configService.getWalletLambdaAbi(),
            this.configService.getWalletLambdaAddress()
        );
    }

    public newWallet(ethereumAddress: string, lambdaAddress: string): Promise<boolean> {
        return this.instance().methods.newWallet(ethereumAddress, lambdaAddress).send({
            from: this.configService.get('COINBASE_ACCOUNT'),
            gas: 6600000,
            gasPrice: 8 * 1e9
        });
    }

    public lambdaWalletByEthAddress(ethereumAddress: string): Promise<WalletLambdaInterface> {
        return this.instance().methods.lambdaWalletByEthAddress(ethereumAddress).call();
    }

    public registeredWallet(lambdaAddress: string): Promise<boolean> {
        return this.instance().methods.registeredWallet(lambdaAddress).call();
    }

    public processedRequests(txHash: string): Promise<boolean> {
        return this.instance().methods.processedRequests(txHash).call();
    }

    public deposit(lambdaAddress: string, txHash: string, amount: number) {
        return this.instance().methods.deposit(lambdaAddress, txHash, String(amount)).send({
            from: this.configService.get('COINBASE_ACCOUNT'),
            gas: 6600000,
            gasPrice: 8 * 1e9
        });
    }

    public balanceOf(lambdaAddress: string): Promise<number> {
        return this.instance().methods.balanceOf(lambdaAddress).call();
    }

    public balancePlusByEthereumAddress(ethAddress: string, amount: number): Promise<boolean> {
        return this.instance().methods.balancePlusByEthereumAddress(ethAddress, amount).send({
            from: this.configService.get('COINBASE_ACCOUNT'),
            gas: 6600000,
            gasPrice: 8 * 1e9
        })
    }

    public balanceMinusByEthereumAddress(ethAddress: string, amount: number): Promise<boolean> {
        return this.instance().methods.balanceMinusByEthereumAddress(ethAddress, amount).send({
            from: this.configService.get('COINBASE_ACCOUNT'),
            gas: 6600000,
            gasPrice: 8 * 1e9
        })
    }
}
