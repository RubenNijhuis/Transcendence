import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class BlockList {
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
        name: "blocked",
        nullable: true
    })
    blockname: string;
}
export default BlockList;
