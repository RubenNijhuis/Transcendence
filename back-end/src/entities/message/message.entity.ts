import { group } from "console";
import { userInfo } from "os";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Timestamp
} from "typeorm";
import Group from "../group/group.entity";
import User from "../user/user.entity";

@Entity()
export class Message {
  @PrimaryGeneratedColumn({
    type: "bigint"
  })
  id: number;

  @ManyToOne((type) => Group, (group) => group.messages)
  group: Group;

  @CreateDateColumn({
    nullable: true
  })
  createdDate: Date;

  @Column()
  content: string;

  @Column()
  content_type: number;

  @Column({
    nullable: true
  })
  sender: string;

  @Column()
  senderID: string;

  @Column({
    nullable: true
  })
  read_by: string; //TODO: OnetoMany relation?
}

export default Message;

// interface Message {
//     content: SimpleMessage | PictureMessage | InvitePlayMessage;
//     content_type: MessageContentType;
//     timestamp: string;
//     sender: Profile;
//     id: number;
//     group_id: number;
//     read_by: Profile[];
// }
