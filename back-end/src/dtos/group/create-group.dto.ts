import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateGroupDto {
  @IsNotEmpty()
  owner: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  users: string[];

  @IsOptional()
  password: string;
}
