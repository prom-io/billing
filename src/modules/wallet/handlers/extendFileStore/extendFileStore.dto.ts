import { IsEmail, IsNotEmpty } from 'class-validator';

export class ExtendFileStoreDto {
	@IsNotEmpty()
	readonly dataValidator;

	@IsNotEmpty()
	readonly serviceNode;

	@IsNotEmpty()
	sum;
}