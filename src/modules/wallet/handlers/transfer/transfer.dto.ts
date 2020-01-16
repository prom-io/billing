import { Matches, IsEmail, IsNotEmpty } from 'class-validator';

export class TransferDto {
	@IsNotEmpty()
	@Matches(
        new RegExp("^0x[a-fA-F0-9]{40}$"),
        {
            message: "Node address must be valid Ethereum address"
        }
    )
	readonly from: string;

	@IsNotEmpty()
	@Matches(
        new RegExp("^0x[a-fA-F0-9]{40}$"),
        {
            message: "Node address must be valid Ethereum address"
        }
    )
	readonly to: string;

	@IsNotEmpty()
	sum: string;

	coinbase: string;
}
