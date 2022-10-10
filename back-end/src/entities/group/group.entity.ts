import {
  Column,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import Groupuser from "../groupuser/groupuser.entity";
import Message from "../message/message.entity";

@Entity()
export class Group {
  @PrimaryGeneratedColumn({
    type: "bigint"
  })
  id: number;

  @Column()
  owner: string;

  @Column({
    nullable: true
  })
  password: string;

  @OneToMany((type) => Groupuser, (groupuser) => groupuser.group)
  @JoinTable()
  users: Groupuser[];

  @OneToMany((type) => Message, (message) => message.group, {
    nullable: true
  })
  @JoinTable()
  messages: Message[];
}
export default Group;
