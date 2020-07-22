import {Injectable} from "@nestjs/common";
import {HashService} from "./hash.service";
import {SignRequestToTransfer} from "../factory/signRequestTransfer.factory";
const SecP256K1 = require('secp256k1');
const Crypto = require('crypto');
@Injectable()
export class SignService {
    constructor(
        private readonly hashService: HashService
    ) {}

    public sign(signRequest: string, privateKey) {
        const hash = this.hashService.sha256SignRequest(signRequest);
        // return sign(hash, privateKey)
    }
}
