import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from "src/users/users.module";
import { GroupModule } from "../groups.module";
import Groupuser from "./groupuser.entity";
import { GroupuserService } from "./groupuser.service";

@Module({
	imports: [TypeOrmModule.forFeature([Groupuser])],
	providers: [GroupuserService],
	exports: [GroupuserService]
})
export class GroupuserModule {}