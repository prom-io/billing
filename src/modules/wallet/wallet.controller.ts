import { Controller, Get, Query, Post, HttpStatus, Res, Body, Put, Param, Delete } from '@nestjs/common';
import { WalletFetcher } from './fetcher/wallet.fetcher';
import { DepositHandler } from './handlers/deposit/deposit.handler';

@Controller('wallet')
export class WalletController {
	private fetcher: WalletFetcher;
	private handler: DepositHandler;

	constructor(fetcher: WalletFetcher, handler: DepositHandler) {
		this.fetcher = fetcher;
		this.handler = handler;
	}

	@Get('balance/:address')
	async balance(@Param('address') address: string) {
		let balance = await this.fetcher.balance(address);
		return {"balance": balance};
	}

	@Get('deposit/:address/:amount')
	async deposit(@Param('address') address: string, @Param('amount') amount: string) {
		await this.handler.handle(address, amount);
		return {"status": "success"};
	}
}