import { Controller, Get, Query, Post, HttpStatus, Res, Body, Put, Param, Delete } from '@nestjs/common';
import { TransactionFetcher } from "./fetcher/transaction.fetcher";
import { Response } from 'express';

@Controller('transaction')
export class TransactionController {

	constructor(private readonly fetcher: TransactionFetcher) {}

	@Get('/')
	async transactions(@Res() res: Response) {
		let transactions = await this.fetcher.allTransaction();
		return res.status(HttpStatus.OK).json(transactions);
	}

	@Get('/address/:address/type/:type/paginate/:pageNumber/:pageSize')
	async addressTransactionByTypePaginate(
		@Param('address') address, 
		@Param('type') type, 
		@Param('pageNumber') pageNumber, 
		@Param('pageSize') pageSize,
		@Res() res: Response
	) {
		let data = await this.fetcher.addressTransactionByTypePaginate(address, type, pageNumber, pageSize);
		return res.status(HttpStatus.OK).send(data);
	}

	@Get('/paginate/:pageNumber/:pageSize')
	async paginate(@Param('pageNumber') pageNumber, @Param('pageSize') pageSize, @Res() res: Response) {
		let data = await this.fetcher.paginate(pageNumber, pageSize);
		return res.status(HttpStatus.OK).send(data);
	}

	@Get('/address/:address')
	async addressTransactions(@Param('address') address, @Res() res: Response) {
		let transaction = await this.fetcher.allAddressTransaction(address);
		return res.status(HttpStatus.OK).send(transaction);
	}

	@Get('/address/:address/paginate/:pageNumber/:pageSize')
	async addressTransactionPaginate(@Param('address') address, @Param('pageNumber') pageNumber, @Param('pageSize') pageSize, @Res() res: Response) {
		let data = await this.fetcher.getAddressTransactionPaginate(address, pageNumber, pageSize);
		return res.status(HttpStatus.OK).send(data);
	}

	@Get('/hash/:hash')
	async transactionDetailByHash(@Param('hash') hash, @Res() res: Response) {
		let transaction = await this.fetcher.getByHash(hash);
		return res.status(HttpStatus.OK).json(transaction);
	}
}