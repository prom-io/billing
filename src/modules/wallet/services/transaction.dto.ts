export class TransactionDto {
	hash: string;
	from: string;
	to: string;
	value: string;
	coinbase: string;

	public make(
		hash: string,
		from: string,
		to: string,
		value: string,
		coinbase: string
	): any {
		this.hash = hash;
		this.from = from;
		this.to = to;
		this.value = value;
		this.coinbase = coinbase;
		return this;
	}
}