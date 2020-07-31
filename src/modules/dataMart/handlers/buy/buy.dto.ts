import { IsEmail, IsNotEmpty } from 'class-validator';
import {ISignedRequest} from '../../../dataUpload/handlers/pay/ISignedRequest';

export class BuyDto {
	@IsNotEmpty()
	public id: string;

	@IsNotEmpty()
	public data_mart: string;

	@IsNotEmpty()
	public data_validator: string;

	@IsNotEmpty()
	public service_node: string;

	@IsNotEmpty()
	public data_owner: string;

	@IsNotEmpty()
	public signature: ISignedRequest;

	@IsNotEmpty()
	public sum: string;

	public amount: number;

	coinbase: string;
}
