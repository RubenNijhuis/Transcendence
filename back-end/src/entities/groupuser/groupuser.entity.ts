import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Group from "../group/group.entity";
import User from "../user/user.entity";

@Entity()
export class GroupUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  groupId: string;

  @ManyToOne((type) => Group, (group) => group.users)
  group: Group;

  @Column()
  memberId: string;

  @ManyToOne((type) => User, (user) => user.groups)
  user: User;

  @Column()
  permissions: number;
}

export default GroupUser;
