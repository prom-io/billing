import { IsEmail, IsNotEmpty } from 'class-validator';

export class PayDto {
	@IsNotEmpty()
	readonly id: string;

	@IsNotEmpty()
	readonly owner: string;

	@IsNotEmpty()
	readonly name: string;

	@IsNotEmpty()
	readonly size: number;

	@IsNotEmpty()
	readonly extension: string;

	@IsNotEmpty()
	readonly mime_type: string;

	readonly meta_data: string;

	@IsNotEmpty()
	readonly service_node: string;

	@IsNotEmpty()
	readonly data_owner: string;

	@IsNotEmpty()
	sum: string;

	@IsNotEmpty()
	buy_sum: string;

	coinbase: string;
}
