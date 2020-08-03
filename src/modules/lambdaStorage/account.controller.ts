import {Body, Controller, Get, Param, Post, Res} from '@nestjs/common';
import {Response} from "express";
import {RegisterWalletDto} from "./useCase/registerWallet/registerWallet.dto";
import {RegisterWalletHandler} from "./useCase/registerWallet/registerWallet.handler";
import {TransactionRequest} from "./httpRequest/transaction.request";
import {WalletLambdaContract} from "./plasma/walletLambda.contract";

@Controller('/api/v1/lambda')
export class AccountController {

	constructor(
		private readonly registerWalletHandler: RegisterWalletHandler,
		private readonly transactionRequest: TransactionRequest,
		private readonly walletLambdaContract: WalletLambdaContract
	) {}

	@Post('/register/wallet')
	public async registerWallet(@Body() registerWalletDto: RegisterWalletDto, @Res() res: Response) {
		await this.registerWalletHandler.handle(registerWalletDto);
		return res.status(200).send({message: 'Wallet success registered!'})
	}

	@Get('/registered/:address')
	public async registered(@Param('address') address: string, @Res() res: Response) {
		const isRegistered = await this.walletLambdaContract.registeredWallet(address);
		return res.status(200).send({isRegistered})
	}

	@Get('/tx/:address')
	public async getAddressTx(@Param('address') address: string, @Res() res: Response) {
		const tx = await this.transactionRequest.getAddressTx(address);
		return res.status(200).send(tx.data);
	}

	@Get('/balance/:address')
	public async getBalance(@Param('address') address: string, @Res() res: Response) {
		let balanceOf = await this.walletLambdaContract.balanceOf(address);
		balanceOf = balanceOf / (10 ** 6);
		return res.status(200).send({balanceOf});
	}
}
