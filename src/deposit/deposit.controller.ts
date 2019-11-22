import { Controller, Post, Get, Body, HttpStatus, Res } from '@nestjs/common';
import { DepositHandler } from './handler/deposit.handler';
import { DepositDto } from './handler/deposit.dto';
import { Response } from 'express';
@Controller('/deposit')
export class DepositController {
  constructor(private readonly handler: DepositHandler) {}

  @Post('/')
  public async deposit(@Body() depositDto: DepositDto, @Res() res: Response) {
    let tx = await this.handler.handle(depositDto);
    return res.status(HttpStatus.OK).send(tx);
  }
}
