import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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

  // change thiss
  @Column({
    name: 'friendlist',
    nullable: false,
    default: '[]',
  })
  friends: string;

  @Column({
    name: 'blocklist',
    nullable: false,
    default: '[]',
  })
  blocked: string;

  // @Column({
	//   name: 'friendlist',
  //   type: 'jsonb',
  //   array: false,
  //   nullable: false,
  //   default: () => "'[]'"
  // })
  // friends: Array<{ username: string }>;

  // @Column({
	//   name: 'blocklist',
  //   type: 'jsonb',
  //   array: false,
  //   nullable: false,
  //   default: () => "'[]'"
  // })
  // blocked: Array<{ username: string }>;
  
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

}

export default User;