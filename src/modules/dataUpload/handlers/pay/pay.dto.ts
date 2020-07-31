import { Matches, IsEmail, IsBase64, IsString, IsNotEmpty } from 'class-validator';
import {ISignedRequest} from './ISignedRequest';
export class PayDto {
	@IsNotEmpty()
	public id: string;

	@IsNotEmpty()
	@Matches(
        new RegExp("^0x[a-fA-F0-9]{40}$"),
        {
            message: "Data Validator address must be valid Ethereum address"
        }
    )
	public data_validator: string;

	@IsNotEmpty()
	public name: string;

	@IsNotEmpty()
	public size: number;

	@IsNotEmpty()
	public extension: string;

	@IsNotEmpty()
	public mime_type: string;

	@IsNotEmpty()
	@Matches(
        new RegExp("^0x[a-fA-F0-9]{40}$"),
        {
            message: "Service node address must be valid Ethereum address"
        }
    )
	readonly service_node: string;

	@IsNotEmpty()
	public sum: string;

	@IsNotEmpty()
	public signature: ISignedRequest;

	public buy_sum: string;

	public meta_data: string;

	public data_owner: string;

	public data_owner_full: any;

	public coinbase: string;

	public amount: number;
}
