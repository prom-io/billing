import {IsNotEmpty, IsNumber, IsString, Matches} from "class-validator";

export class WithdrawDto {
    @IsString()
    @IsNotEmpty()
    @Matches(
        new RegExp("^0x[a-fA-F0-9]{40}$"),
        {
            message: "must be valid Ethereum address!"
        }
    )
    public readonly ethereumAddress: string;

    @IsNotEmpty()
    @IsNumber()
    public readonly amount: number;
}
