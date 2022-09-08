import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Group } from "src/typeorm"

@Entity() // need to have a token to search on
export class User {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'user_id',
  })
  id: number;

  @Column({
    name: 'intra_id',
    nullable: true,
    unique: true
  })
  intraID: string;

  @Column({
	  name: 'username',
    nullable: true,
    unique: true
  })
  username: string;

  @Column({
    name: 'img_url',
    nullable: false,
    default: '',
  })
  img_url: string;

  @Column({
  	name: 'rank',
    nullable: false,
    default: 0
  })
  rank: number;

  @Column({
	  name: 'wins',
    nullable: false,
    default: 0
  })
  wins: number;

  @Column({
	  name: 'losses',
    nullable: false,
    default: 0
  })
  losses: number;
  
  @Column({
	  name: 'twoFactorAuthenticationSecret',
    nullable: false,
    default: '2FA_SECRET',
  })
  twoFactorAuthenticationSecret: string;

  @Column({
	  name: 'isTwoFactorAuthenticationEnabled',
    nullable: false,
    default: false,
  })
  isTwoFactorAuthenticationEnabled: boolean;


  @ManyToMany((type) => Group, (group) => group.users)
  groups: Group[];

  // @ManyToMany(type => User)
  // @JoinTable({ joinColumn: { name: 'users_id_1' } })
  // friendsrequests: User[];

  // @ManyToMany(type => User)
  // @JoinTable({ joinColumn: { name: 'users_id_1' } })
  // friends: User[];

  // @ManyToMany(type => User)
  // @JoinTable({ joinColumn: { name: 'users_id_1' } })
  // Blocked: User[];
}
export default User;