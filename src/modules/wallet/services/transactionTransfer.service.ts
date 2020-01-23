import { Injectable, BadRequestException } from '@nestjs/common';
import { TransactionDto } from './transaction.dto';
import { TransactionService as TransactionContract } from '../../../contracts/child_chain/transaction.service';

@Injectable()
export class TransactionTransferService {
	private transactionContract: TransactionContract;

	constructor(transactionContract: TransactionContract) {
		this.transactionContract = transactionContract;
	}

	public async push(dto: TransactionDto): Promise<any> {
		let tx = await this.transactionContract.transactionTransfer(
			dto.hash,
			dto.from,
			dto.to,
			dto.value,
			dto.coinbase
		);
		return tx;
	}
}