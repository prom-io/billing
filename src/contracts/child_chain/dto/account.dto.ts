import { IsNotEmpty } from "class-validator";

export class AccountDto {
	@IsNotEmpty()
	owner: string;

	sum: any;

	amount:string;

	coinbase: string;

	constructor(owner: string, coinbase: string) {
		this.owner = owner;
		this.coinbase = coinbase;
	}
}