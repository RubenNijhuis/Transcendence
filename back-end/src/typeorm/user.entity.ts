import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity() // need to have a token to search on
export class User {
  @PrimaryGeneratedColumn({ // create this with 42 profile uid
    type: 'bigint',
    name: 'user_id',
  })
  id: number;

  @Column({
    name: 'uid',
    nullable: false,
    default: '',
  })
  uid: string;

  @Column({
	  name: 'username',
    nullable: false,
    default: '',
  })
  username: string;

  @Column({
    name: 'email_address',
    nullable: false,
    default: '',
  })
  email: string;

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
	name: 'friendlist',
    nullable: false,
    default: '',
  })
  friends: string;

  @Column({
	name: 'blocklist',
    nullable: false,
    default: '',
  })
  blocked: string;
}
