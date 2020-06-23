import { IsEmail, IsNotEmpty } from 'class-validator';
import {ISignedRequest} from '../../../dataUpload/handlers/pay/ISignedRequest';

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
	readonly signature: ISignedRequest;

	@IsNotEmpty()
	sum: string;

	coinbase: string;
}
