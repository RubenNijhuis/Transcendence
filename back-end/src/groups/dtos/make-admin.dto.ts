import { IsNotEmpty, MinLength } from "class-validator";

export class MakeAdminDto {
	@IsNotEmpty()
	owner: string;

	@IsNotEmpty()
	user: number;

	@IsNotEmpty()
	group: number;
}