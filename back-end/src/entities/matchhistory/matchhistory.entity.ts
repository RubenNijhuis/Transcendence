import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class MatchHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  playerOne: string;

  @Column()
  playerTwo: string;

  @Column()
  scoreOne: number;

  @Column()
  scoreTwo: number;

  @Column({
    nullable: true
  })
  eloGainOne: number;

  @Column({
    nullable: true
  })
  eloGainTwo: number;

  @Column()
  gameType: number;
}

export default MatchHistory;
