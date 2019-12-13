import { Controller, Get, Query, Post, HttpStatus, Res, Body, Put, Param, Delete } from '@nestjs/common';
import { WalletFetcher } from './fetcher/wallet.fetcher';
import { DepositHandler } from './handlers/deposit/deposit.handler';
import { ExtendFileStoreHandler } from './handlers/extendFileStore/extendFileStore.handler';
import { ExtendFileStoreDto } from './handlers/extendFileStore/extendFileStore.dto';

@Controller('wallet')
export class WalletController {
	private fetcher: WalletFetcher;
	private handler: DepositHandler;
	private extendFileStoreHandler: ExtendFileStoreHandler;

	constructor(
		fetcher: WalletFetcher, 
		handler: DepositHandler, 
		extendFileStoreHandler: ExtendFileStoreHandler
	) {
		this.fetcher = fetcher;
		this.handler = handler;
		this.extendFileStoreHandler = extendFileStoreHandler;
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

	@Post('extend/file/store')
	async extendFileStore(@Body() extendFileStoreDto: ExtendFileStoreDto) {
		await this.extendFileStoreHandler.extendFileStore(extendFileStoreDto);
		return {"status": "success"};
	}
}