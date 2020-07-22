import { Injectable } from '@nestjs/common';
import {MnemonicService} from "./mnemonic.service";
import {BIP32Interface} from "bip32/types/bip32";
import {HashService} from "./hash.service";
import RIPEMD160 from "ripemd160";
import * as Bech32 from "bech32";
const Crypto = require('crypto');
import * as BcryptJs from 'bcryptjs'
import { bufferToBytes, bytesToString } from '@tendermint/belt';


@Injectable()
export class LambdaAccountService {
	private readonly path = '44\'/364\'/0\'/0/0';
	private readonly prefix = 'lambda';
	private readonly prefixdev = 'lambdavaloper';
	private readonly prefixpub = 'lambdapub';
	private readonly saltRounds = 12;

	constructor(
		private readonly mnemonicService: MnemonicService,
		private readonly hashService: HashService
	) {}

	public generate(): BIP32Interface {
		const mnemonic = this.mnemonicService.generate();
		const seed = this.mnemonicService.getSeed(mnemonic);
		const master = this.mnemonicService.getMaster(seed);
		return master.derivePath(this.path);
	}

	public getAddress(wallet: BIP32Interface): string {
		const hash = this.hashService.sha256PublicKey(wallet.publicKey);
		const address = new RIPEMD160().update(hash).digest()
		const words = Bech32.toWords(address);
		return Bech32.encode(this.prefix, words);
	}

	public getPublicKey(wallet: BIP32Interface) {
		const words = Bech32.toWords(wallet.publicKey);
		return Bech32.encode(this.prefixpub, words);
	}

	public getPrivateKey(wallet: BIP32Interface) {
		const words = Bech32.toWords(wallet.privateKey);
		return Bech32.encode('', words);
	}
}
