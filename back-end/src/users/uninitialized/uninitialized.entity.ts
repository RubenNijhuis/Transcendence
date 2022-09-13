import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity() // need to have a token to search on
export class Uninitialized {
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
  intraId: string;
}
export default Uninitialized;