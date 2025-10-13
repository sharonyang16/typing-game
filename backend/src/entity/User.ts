import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

/**
 * Entity definition for a single user.
 * @class User
 * 
 * Each User includes the following fields:
 * - id: The unique id of the user.
 * - email: The email of the user.
 * - username: The username of the user.
 * - dateJoined: The date the user joined.
 */
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  username: string;

  @Column()
  dateJoined: Date;
}
