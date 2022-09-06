import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, Timestamp } from 'typeorm';
import { User } from "src/typeorm"
import { Chat } from 'src/typeorm';

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
	password: string

    @ManyToMany((type) => User)
    @JoinTable({ joinColumn: { name: "intra_id" } })
    admins: User[];

    @ManyToMany((type) => User)
    @JoinTable({ joinColumn: { name: "intra_id"} })
    users: User[];

    @ManyToMany((type) => Chat)
    @JoinTable({ joinColumn:  { name: "group_id" } })
    messages: Chat[];

}
export default Group;