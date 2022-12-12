import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateGroupDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  users: string[];

  @IsOptional()
  password: string;
}
