import { group } from 'console';
import { userInfo } from 'os';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, Timestamp } from 'typeorm';
import Group from '../group/group.entity';
 
@Entity()
export class Message {
  @PrimaryGeneratedColumn({
    type: 'bigint'
  })
  id: number;
 
  @ManyToOne((type) => Group, (group) => group.messages)
  group: Group

  @CreateDateColumn({
    nullable: true
  })
  createdDate: Date;
 
  @Column()
  content: string;
  
  @Column()
  content_type: number;

  @Column()
  sender: number;
  
  @Column({
    nullable: true
  })
  read_by: string;
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