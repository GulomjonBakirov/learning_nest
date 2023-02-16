import { Column, Entity, Index } from "typeorm";
import Model from "./model.entity";

@Entity("users")
export class User extends Model {
  @Column({ nullable: false, length: 25, unique: true })
  login: string;

  @Column({ nullable: false, length: 40 })
  password: string;

  @Column({ nullable: true, length: 150 })
  fullname: string;
}
