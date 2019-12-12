import { Injectable, BadRequestException } from '@nestjs/common';
import { TransactionDto } from './transaction.dto';
import { TransactionService as TransactionContract } from '../../../contracts/child_chain/transaction.service';

@Injectable()
export class TransactionPayService {
	private transactionContract: TransactionContract;

	constructor(transactionContract: TransactionContract) {
		this.transactionContract = transactionContract;
	}

	public async push(dto: TransactionDto): Promise<any> {
		let tx = await this.transactionContract.transactionDataPurchase(
			dto.uuid,
			dto.hash,
			dto.serviceNode,
			dto.dataValidator,
			dto.dataMart,
			dto.dataOwner,
			dto.value,
			dto.coinbase
		);
		return tx;
	}
}