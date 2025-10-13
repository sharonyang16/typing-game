import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class TypingTest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  wordsTyped: string;

  @Column()
  timeToComplete: number;

  @Column()
  rawWpm: number;

  @Column()
  accuracy: number;

  @Column()
  wpm: number;

  @Column()
  date: Date;

  @Column()
  userId: number;
}
