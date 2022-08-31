import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Timestamp } from 'typeorm';
 
@Entity()
export class Chat {
  @PrimaryGeneratedColumn({
    type: 'bigint'
  })
  id: number;

  @Column()
  group_id: number;
 
  @CreateDateColumn({
    nullable: true
  })
  createdDate: Date
 
  @Column()
  content: string;
  
  @Column()
  content_type: number;

  @Column()
  sender: string;
  
  @Column({
    nullable: true
  })
  read_by: string;
}
 
export default Chat;

// interface Message {
//     content: SimpleMessage | PictureMessage | InvitePlayMessage;
//     content_type: MessageContentType;
//     timestamp: string;
//     sender: Profile;
//     id: number;
//     group_id: number;
//     read_by: Profile[];
// }