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

	@IsNotEmpty({message: "Signed message must be present"})
	@IsString({message: "Signed message must be string"})
	@IsBase64({message: "Signed message must be encoded in base 64"})
	public message: string;

	@IsNotEmpty({message: "Message hash must be present"})
	@IsString({message: "Message hash must be string"})
	public messageHash: string;

	@IsNotEmpty({message: "Signature must be present"})
	@IsString({message: "Signature must be string"})
	public signature: string;

	@IsNotEmpty({message: "'r' parameter must be present"})
	@IsString({message: "'r' parameter must be string"})
	public r: string;

	@IsNotEmpty({message: "'v' parameter must be present"})
	@IsString({message: "'v' parameter must be string"})
	public v: string;

	@IsNotEmpty({message: "'s' parameter must be present"})
	@IsString({message: "'s' parameter must be string"})
	public s: string;

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
