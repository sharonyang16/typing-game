import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

/**
 * Entity definition for a single typing test
 * @class TypingTest
 * 
 * Each TypingTest includes the following fields:
 * - id: The unique id of the test.
 * - wordsTyped: The words the user had to type.
 * - timeToComplete: The time it took the user to complete the test.
 * - rawWpm: The raw WPM of the user.
 * - accuracy: The accuracy of the user.
 * - wpm: The calculated WPM (from the raw WPM and accuracy)of the user.
 * - date: The date the test was completed.
 * - userId: The id of the user who completed the test.
 */
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
