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

	@Get('/paginate/:pageNumber/:pageSize')
	async paginate(@Param('pageNumber') pageNumber, @Param('pageSize') pageSize, @Res() res: Response) {
		let data = await this.fetcher.paginate(pageNumber, pageSize);
		return res.status(HttpStatus.OK).send(data);
	}

	@Get('/address/:address/paginate/:pageNumber/:pageSize')
	async addressTransactionPaginate(@Param('address') address, @Param('pageNumber') pageNumber, @Param('pageSize') pageSize, @Res() res: Response) {
		let data = await this.fetcher.getAddressTransactionPaginate(address, pageNumber, pageSize);
		return res.status(HttpStatus.OK).send(data);
	}

	@Get('/:queueNumber')
	async transactionDetailByQueueNumber(@Param('queueNumber') queueNumber, @Res() res: Response) {
		let transaction = await this.fetcher.getByQueueNumber(queueNumber);
		return res.status(HttpStatus.OK).json(transaction);
	}
}