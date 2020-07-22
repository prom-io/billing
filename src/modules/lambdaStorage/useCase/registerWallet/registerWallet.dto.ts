import { Matches, IsString, IsNotEmpty } from 'class-validator';

export class RegisterWalletDto {
    @IsNotEmpty()
    @IsString()
    @Matches(
        new RegExp("^0x[a-fA-F0-9]{40}$"),
        {
            message: "must be valid Ethereum address!"
        }
    )
    public readonly ethereumAddress: string;

    @IsNotEmpty()
    @IsString()
    public readonly lambdaAddress: string;
}
