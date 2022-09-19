import { IsNotEmpty, MinLength } from "class-validator";

export class CreateAdminDto {
	@IsNotEmpty()
	owner: string;

	@IsNotEmpty()
	user: number;

	@IsNotEmpty()
	group: number;
}