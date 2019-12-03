import { Controller, Get, Query, Post, HttpStatus, Res, Body, Put, Param, Delete } from '@nestjs/common';
import { BuyDto } from "./handlers/buy/buy.dto";
import { BuyHandler } from "./handlers/buy/buy.handler";
import { Response } from 'express';

@Controller('data')
export class DataMartController {

	constructor(private readonly handler: BuyHandler) {}

	@Post('/buy')
	async pay(@Body() buyDto: BuyDto, @Res() res: Response) {
		await this.handler.handle(buyDto);
		res.status(HttpStatus.OK).send();
	}
}