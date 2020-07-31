import { Controller, Get, Query, Post, HttpStatus, Res, Body, Put, Param, Delete } from '@nestjs/common';
import { PayDto } from "./handlers/pay/pay.dto";
import { PayHandler } from "./handlers/pay/pay.handler";
import { Response } from 'express';

@Controller('data')
export class DataUploadController {

	constructor(private readonly handler: PayHandler) {}

	@Post('/upload/pay')
	async pay(@Body() payDto: PayDto, @Res() res: Response) {
		let tx = await this.handler.handle(payDto);
		return res.status(HttpStatus.CREATED).send(tx);
	}
}
