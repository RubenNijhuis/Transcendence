import { text } from 'stream/consumers';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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
    name: 'img_url',
    nullable: false,
    default: '',
  })
  img_url: string;

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
    type: 'jsonb',
    array: false,
    nullable: false,
    default: () => "'[]'"
  })
  friends: Array<{ username: string }>;

  @Column({
	  name: 'blocklist',
    type: 'jsonb',
    array: false,
    nullable: false,
    default: () => "'[]'"
  })
  blocked: Array<{ username: string }>;
  
  @Column({
	  name: 'twoFactorAuthenticationSecret',
    nullable: false,
    default: '',
  })
  twoFactorAuthenticationSecret: string;

  @Column({
	  name: 'isTwoFactorAuthenticationEnabled',
    nullable: false,
    default: false,
  })
  isTwoFactorAuthenticationEnabled: boolean;

  @Column({
	  name: 'jwtsession_token',
    nullable: false,
    default: "",
  })
  jwtsession_token: string;

}

export default User;