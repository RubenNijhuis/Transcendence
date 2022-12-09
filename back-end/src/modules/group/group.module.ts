import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GroupService } from "../../services/group/group.service";
import { GroupController } from "../../controllers/group/group.controller";
import Group from "src/entities/group/group.entity";
import GroupUser from "src/entities/groupuser/groupuser.entity";
import { UserModule } from "../user/user.module";
import { MessageModule } from "../message/message.module";

@Module({
  imports: [TypeOrmModule.forFeature([Group, GroupUser]), UserModule, forwardRef(() => MessageModule)],
  controllers: [GroupController],
  providers: [GroupService],
  exports: [GroupService]
})
export class GroupModule {}
