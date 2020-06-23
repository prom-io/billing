import { Matches, IsEmail, IsBase64, IsString, IsNotEmpty } from 'class-validator';
import {ISignedRequest} from './ISignedRequest';
export class PayDto implements ISignedRequest {
	@IsNotEmpty()
	readonly id: string;

	@IsNotEmpty()
	@Matches(
        new RegExp("^0x[a-fA-F0-9]{40}$"),
        {
            message: "Data Validator address must be valid Ethereum address"
        }
    )
	readonly data_validator: string;

	@IsNotEmpty()
	readonly name: string;

	@IsNotEmpty()
	readonly size: number;

	@IsNotEmpty()
	readonly extension: string;

	@IsNotEmpty()
	readonly mime_type: string;

	readonly meta_data: string;

	public signature: ISignedRequest;

	@IsNotEmpty()
	@Matches(
        new RegExp("^0x[a-fA-F0-9]{40}$"),
        {
            message: "Service node address must be valid Ethereum address"
        }
    )
	readonly service_node: string;

	readonly private_key: string;

	data_owner: string;

	data_owner_full: any;

	@IsNotEmpty()
	sum: string;

	coinbase: string;
}
