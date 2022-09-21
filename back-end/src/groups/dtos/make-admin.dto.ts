import { IsNotEmpty, MinLength } from "class-validator";

export class MakeAdminDto {
	@IsNotEmpty()
	owner: number;

	@IsNotEmpty()
	user: number;

	@IsNotEmpty()
	group: number;
}