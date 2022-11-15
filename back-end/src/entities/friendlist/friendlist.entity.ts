import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class FriendList {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  friendname: string;
}
export default FriendList;
