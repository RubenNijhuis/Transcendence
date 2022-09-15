import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, Timestamp } from 'typeorm';
import { Group, User } from "src/typeorm"
import { Chat } from 'src/typeorm';
import { group } from 'console';

@Entity()
export class Groupuser {
    @PrimaryGeneratedColumn()
	id: number
	
	@Column()
    groupId: number;

	@ManyToOne((type) => Group, (group) => group.users)
	group: Group

    @Column()
    userId: number;

	@ManyToOne((type) => User, (user) => user.groups)
	user: User

	@Column()
	userType: number;
}

export default Groupuser;