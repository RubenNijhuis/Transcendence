import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class FriendRequest {
  @PrimaryGeneratedColumn({
    type: "bigint",
    name: "id"
  })
  id: number;

  @Column({
    name: "users",
    nullable: true
  })
  username: string;

  @Column({
    name: "requested",
    nullable: true
  })
  requested: string;
}
export default FriendRequest;
