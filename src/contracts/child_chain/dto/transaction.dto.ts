export class TransactionDto {
	uuid: string;
	type: string;
	hash: string;
	serviceNode: string;
	from: string;
	to: string;
	value: string;
	coinbase: string;
}