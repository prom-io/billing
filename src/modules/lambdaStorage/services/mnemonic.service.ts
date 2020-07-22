import {Injectable} from "@nestjs/common";
import {ConfigService} from "../../../config/config.service";
import * as Bip39 from "bip39";
import * as Bip32 from "bip32";
import {BIP32Interface} from "bip32/types/bip32";
@Injectable()
export class MnemonicService {
    constructor(private readonly configService: ConfigService) {}

    public generate(): string {
        const mnemonic = this.configService.get('LAMBDA_MNEMONIC');
        if(mnemonic === undefined || mnemonic === null) {
            return Bip39.generateMnemonic();
        }
        return mnemonic;
    }

    public getSeed(mnemonic: string): Buffer {
        return Bip39.mnemonicToSeedSync(mnemonic);
    }

    public getMaster(seed: Buffer): BIP32Interface {
        return Bip32.fromSeed(seed);
    }
}
