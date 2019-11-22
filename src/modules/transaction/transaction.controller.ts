import { Controller, Get, Query, Post, HttpStatus, Res, Body, Put, Param, Delete } from '@nestjs/common';
import { TransactionFetcher } from "./fetcher/transaction.fetcher";
import { Response } from 'express';

@Controller('transaction')
export class TransactionController {

	constructor(private readonly fetcher: TransactionFetcher) {}

	@Get('/')
	async transactions(@Res() res: Response) {
		let transactions = await this.fetcher.all();
		return res.status(HttpStatus.OK).json(transactions);
	}

	@Get('/:hash')
	async transaction(@Param('hash') hash, @Res() res: Response) {
		let transaction = await this.fetcher.getByHash(hash);
		return res.status(HttpStatus.OK).json(transaction);
	}
}