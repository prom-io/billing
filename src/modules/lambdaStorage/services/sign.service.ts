import {Injectable} from "@nestjs/common";
import {HashService} from "./hash.service";
import {BIP32Interface} from "bip32/types/bip32";
import {SignRequestToTransfer} from "../factory/signRequestTransfer.factory";
const crypto = require('@jswebfans/hdkeytest')

@Injectable()
export class SignService {
    constructor(
        private readonly hashService: HashService
    ) {}

    public signTransactionData(data: any, account: BIP32Interface) {
        return crypto.crypto.sign(Buffer.from(JSON.stringify(data)), account.privateKey).toString('base64');
    }
}
