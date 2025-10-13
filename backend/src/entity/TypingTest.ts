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

  @Column({ type: "text" })
  wordsTyped: string;

  @Column({ type: "float" })
  timeToComplete: number;

  @Column({ type: "int" })
  rawWpm: number;

  @Column({ type: "int" })
  accuracy: number;

  @Column({ type: "int" })
  wpm: number;

  @Column({ type: "date" })
  date: Date;

  @Column({ type: "uuid" })
  userId: number;
}
