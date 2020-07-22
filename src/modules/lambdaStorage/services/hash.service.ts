import {Injectable} from "@nestjs/common";
const Crypto = require('crypto');

@Injectable()
export class HashService {
    public sha256PublicKey(publicKey: Buffer) {
        return Crypto.createHash('sha256').update(publicKey).digest();
    }

    public sha256SignRequest(bytes) {
        return Crypto.createHash('sha256').update(bytes).digest();
    }
}
