import { Injectable } from '@nestjs/common';
import Web3 from "web3";
import net from "net";
import { ConfigService } from "../config/config.service";
import { makePreciseNumberString } from '../utils/string-utils'
@Injectable()
export class Web3PrivateNetService {
	private web3: Web3;
	private config: ConfigService

	constructor(config: ConfigService) {
		this.config = config;
	}

	public httpInstance(): Web3 {
		this.web3 = new Web3(new Web3.providers.HttpProvider(this.config.get('PRIVATE_NETWORK_HOST')));
		return this.web3;
	}

	public websocketInstance(): Web3 {
		this.web3 = new Web3(new Web3.providers.WebsocketProvider(this.config.get('PRIVATE_NETWORK_WEBSOCKET')));
		return this.web3;
	}

	public ipcInstance(): Web3 {
		this.web3 = new Web3(new Web3.providers.IpcProvider(this.config.get('PRIVATE_NETWORK_IPC'), net));
		return this.web3;
	}

	public fromWeiNumber(number: string): number {
		let sum = this.web3.utils.fromWei(number, 'ether');
		return Number(sum);
	}

	public fromWeiNumberFormat(number: string): string {
		let sum = Number(this.web3.utils.fromWei(number, 'ether'));
		return sum.toFixed(8);
	}

	public signMessage(message: string, privateKey: string) {
		let signature = this.web3.eth.accounts.sign(message, privateKey);
		console.log('Signature: ', signature);
	}
}
