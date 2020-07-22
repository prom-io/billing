import {IsString, IsNotEmpty} from 'class-validator';

export class DepositDto {
    @IsNotEmpty()
    @IsString()
    public readonly fromAddress;

    @IsNotEmpty()
    @IsString()
    public readonly privateKey;

    @IsNotEmpty()
    @IsString()
    public readonly publicKey;

    @IsNotEmpty()
    @IsString()
    public readonly amount;
}
