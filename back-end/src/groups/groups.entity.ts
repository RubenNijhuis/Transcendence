import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, Timestamp } from 'typeorm';
import { User } from "src/typeorm"
import { Chat } from 'src/typeorm';
import { GroupService } from './groups.service';
import Groupuser from './groupusers/groupuser.entity';

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

    @OneToMany((type) => Groupuser, (groupuser) => groupuser.group)
    @JoinTable()
    users: Groupuser[];

    @OneToMany((type) => Chat, (chat) => chat.group, {
        nullable: true
    })
    @JoinTable()
    messages: Chat[];

}
export default Group;