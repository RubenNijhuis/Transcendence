import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateGroupDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  members: string[];

  @IsOptional()
  password: string;
}
