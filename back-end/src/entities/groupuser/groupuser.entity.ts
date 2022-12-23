import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Group from "../group/group.entity";
import User from "../user/user.entity";

@Entity()
export class GroupUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  groupId: string;

  @ManyToOne((type) => Group, (group) => group.members)
  group: Group;

  @Column()
  memberId: string;

  @ManyToOne((type) => User, (user) => user.groups)
  profile: User;

  @Column()
  permissions: number;
}

export default GroupUser;
