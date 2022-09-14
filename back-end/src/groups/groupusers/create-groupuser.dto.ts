import { IsNotEmpty, MinLength } from "class-validator";
import Group from "../groups.entity";
import User from "../../users/user.entity"

export class CreateGroupuserDto {
	@IsNotEmpty()
	group: Group

	@IsNotEmpty()
	user: User
}
