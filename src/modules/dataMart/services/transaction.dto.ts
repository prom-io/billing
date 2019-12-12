export class TransactionDto {
	uuid: string;
	hash: string;
	serviceNode: string;
	dataValidator: string;
	dataMart: string;
	dataOwner: string;
	value: string;
	coinbase: string;

	public make(
		uuid: string,
		hash: string,
		serviceNode: string,
		dataValidator: string,
		dataMart: string,
		dataOwner: string,
		value: string,
		coinbase: string
	): any {
		this.uuid = uuid;
		this.hash = hash;
		this.serviceNode = serviceNode;
		this.dataValidator = dataValidator;
		this.dataMart = dataMart;
		this.dataOwner = dataOwner;
		this.value = value;
		this.coinbase = coinbase;
		return this;
	}
}