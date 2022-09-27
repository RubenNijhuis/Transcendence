import {
  Column,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import GroupUser from "../groupuser/groupuser.entity";
@Entity() // need to have a token to search on
export class User {
  @PrimaryGeneratedColumn({
    type: "bigint",
    name: "user_id"
  })
  id: number;
  @Column({
    name: "intra_id",
    nullable: true,
    unique: true
  })
  intraId: string;
  @Column({
    name: "isInitialized",
    nullable: false,
    default: false
  })
  isInitialized: boolean;
  @Column({
    name: "username",
    nullable: true,
    unique: true
  })
  username: string;
  @Column({
    name: "color",
    nullable: true
  })
  color: string;
  @Column({
    name: "discription",
    nullable: true
  })
  description: string;
  @Column({
    name: "rank",
    nullable: false,
    default: 0
  })
  rank: number;
  @Column({
    name: "wins",
    nullable: false,
    default: 0
  })
  wins: number;
  @Column({
    name: "losses",
    nullable: false,
    default: 0
  })
  losses: number;
  @Column({
    name: "tfaSecret",
    nullable: false,
    default: ""
  })
  tfaSecret: string;
  @Column({
    name: "isTfaEnabled",
    nullable: false,
    default: false
  })
  isTfaEnabled: boolean;
  @Column({
    name: "refreshToken",
    nullable: false,
    default: ""
  })
  refreshToken: string;
  @OneToMany((type) => GroupUser, (groupuser) => groupuser.user)
  @JoinTable()
  groups: GroupUser[];
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
