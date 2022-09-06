import { User } from "src/typeorm";
import { IsNotEmpty, MinLength } from "class-validator";

export class CreateGroupDto {
	@IsNotEmpty()
	owner: string

	@IsNotEmpty()
	users: User[]
}
