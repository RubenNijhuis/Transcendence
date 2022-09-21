import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class FriendList {
    @PrimaryGeneratedColumn({
        type: 'bigint',
        name: 'id'
    })
    id: number

    @Column({
        name: 'users',
        nullable: true
    })
    username: string;

    @Column({
        name: "friends",
        nullable: true
    })
    friendname: string;
}
export default FriendList;
