import { Controller, Get, Query, Post, HttpStatus, Res, Body, Put, Param, Delete } from '@nestjs/common';
import { Response } from 'express';
import { FileFetcher } from './fetcher/file.fetcher';

@Controller('file')
export class FileController {
	
	public constructor(private readonly fetcher: FileFetcher) {}

	@Get('/paginate/:pageNumber/:pageSize')
	async paginate(@Param('pageNumber') pageNumber, @Param('pageSize') pageSize, @Res() res: Response) {
		let data = await this.fetcher.paginate(pageNumber, pageSize);
		return res.status(HttpStatus.OK).send(data);
	}

	@Get('/address/:address/paginate/:pageNumber/:pageSize')
	async getOwnerFilesPaginate(@Param('address') address, @Param('pageNumber') pageNumber, @Param('pageSize') pageSize, @Res() res: Response) {
		let data = await this.fetcher.paginateByAddress(address, pageNumber, pageSize);
		return res.status(HttpStatus.OK).send(data);
	}
}