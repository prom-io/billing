import {Injectable} from "@nestjs/common";
import Web3 from "web3";

@Injectable()
export class Web3Service {
    constructor(private readonly web3: Web3) {}

    public fromWeiNumber(number: string): number {
        let sum = this.web3.utils.fromWei(number, 'ether');
        return Number(sum);
    }

    public fromWeiNumberFormat(number: string): string {
        let sum = Number(this.web3.utils.fromWei(number, 'ether'));
        return sum.toFixed(8);
    }
}
