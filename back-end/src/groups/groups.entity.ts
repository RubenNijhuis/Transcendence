import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, Timestamp } from 'typeorm';
import { User } from "src/typeorm"
import { Chat } from 'src/typeorm';
import { GroupService } from './groups.service';

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

    @ManyToMany((type) => User, (user) => user.groups)
    @JoinTable()
    users: User[];

    // @ManyToMany((type) => User, (user) => user.groups)
    // @JoinTable()
    // admins: User[];

    @OneToMany((type) => Chat, (chat) => chat.group)
    @JoinTable()
    messages: Chat[];

}
export default Group;