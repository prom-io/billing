import { IsNotEmpty } from "class-validator";

export class DataOwnerRegisterDto {
	@IsNotEmpty()
	dataValidator: string;

	@IsNotEmpty()
	dataOwner: string;

	coinbase: string;
}