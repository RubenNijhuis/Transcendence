import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import Group from "../group/group.entity";

@Entity()
export class Message {
  @PrimaryGeneratedColumn({
    type: "bigint"
  })
  id: number;

  @ManyToOne((type) => Group, (group) => group.messages)
  group: Group;

  @Column()
  groupId: string;

  @CreateDateColumn()
  createdDate: Date;

  @Column()
  content: string;

  @Column()
  content_type: number;

  @Column()
  senderID: string;
}

export default Message;

// interface Message {
//     content: SimpleMessage | PictureMessage | GameInviteMessage;
//     content_type: MessageContentType;
//     timestamp: string;
//     sender: Profile;
//     id: number;
//     group_id: number;
// }
