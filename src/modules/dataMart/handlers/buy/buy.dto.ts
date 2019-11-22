import { IsEmail, IsNotEmpty } from 'class-validator';

export class BuyDto {
	@IsNotEmpty()
	readonly id: string;

	@IsNotEmpty()
	readonly owner: string;

	@IsNotEmpty()
	readonly data_validator: string;

	@IsNotEmpty()
	readonly sum: number;

	coinbase: string;
}