// Types
import { GroupPermissionLevel } from "src/types/group";

// Typeorm
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

// Entities
import Group from "../group/group.entity";
import User from "../user/user.entity";

////////////////////////////////////////////////////////////

@Entity()
export class GroupUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  groupId: string;

  @ManyToOne(() => Group, (group) => group.members, {
    onDelete: "CASCADE"
  })
  group: Group;

  @Column()
  memberId: string;

  @ManyToOne(() => User, (user) => user.groups, {
    onDelete: "CASCADE"
  })
  profile: User;

  @Column()
  permissions: GroupPermissionLevel;
}

export default GroupUser;
