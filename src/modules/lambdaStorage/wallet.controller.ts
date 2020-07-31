import {Body, Controller, Get, Param, Post, Res} from '@nestjs/common';
import {Response} from "express";
import {RegisterWalletDto} from "./useCase/registerWallet/registerWallet.dto";
import {RegisterWalletHandler} from "./useCase/registerWallet/registerWallet.handler";
import {TransactionRequest} from "./httpRequest/transaction.request";
import {WalletLambdaContract} from "./plasma/walletLambda.contract";
import {WithdrawHandler} from "./useCase/withdraw/withdraw.handler";
import {WithdrawDto} from "./useCase/withdraw/withdraw.dto";

@Controller('/api/v1/lambda')
export class WalletController {

    constructor(
        private readonly withdrawHandler: WithdrawHandler
    ) {}

    @Post('/withdraw')
    public async withdraw(@Body() withdrawDto: WithdrawDto, @Res() res: Response) {
        await this.withdrawHandler.handle(withdrawDto);
        return res.status(200).send({message: 'Withdraw process success completed!'});
    }
}
