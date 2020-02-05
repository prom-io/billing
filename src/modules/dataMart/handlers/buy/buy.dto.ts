import { IsEmail, IsNotEmpty } from 'class-validator';

export class BuyDto {
	@IsNotEmpty()
	readonly id: string;

	@IsNotEmpty()
	readonly data_mart: string;

	@IsNotEmpty()
	readonly data_validator: string;

	@IsNotEmpty()
	readonly service_node: string;

	@IsNotEmpty()
	readonly data_owner: string;

	@IsNotEmpty()
	readonly private_key: string;

	@IsNotEmpty()
	sum: string;

	coinbase: string;
}