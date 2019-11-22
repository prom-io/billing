import { IsNotEmpty } from "class-validator";

export class DepositDto {
	@IsNotEmpty()
	owner: string;
	
	@IsNotEmpty()
	sum: string;
}