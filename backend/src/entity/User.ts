import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

/**
 * Entity definition for a single user.
 * @class User
 *
 * Each User includes the following fields:
 * - id: The unique id of the user.
 * - email: The email of the user.
 * - username: The username of the user.
 * - firebaseId: The firebase id of the user.
 * - dateJoined: The date the user joined.
 */
@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column({ unique: true, type: "text" })
  email: string;

  @Column({ unique: true, type: "text" })
  firebaseId: string;

  @Column({ type: "date" })
  dateJoined: Date;
}
