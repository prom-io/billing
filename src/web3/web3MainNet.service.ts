import { Injectable } from '@nestjs/common';
import Web3 from "web3";
import net from "net";
import { ConfigService } from "../config/config.service";

@Injectable()
export class Web3MainNetService {
	private web3: Web3;
	private config: ConfigService

	constructor(config: ConfigService) {		
		this.config = config;
	}

	public httpInstance(): Web3 {
		this.web3 = new Web3(new Web3.providers.HttpProvider(this.config.get("MAIN_NETWORK_HOST")));
		return this.web3;
	}

	public websocketInstance(): Web3 {
		this.web3 = new Web3(new Web3.providers.WebsocketProvider(this.config.get("MAIN_NETWORK_WEBSOCKET")));
		return this.web3;
	}
}
