import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  UserId: number;

  @Column()
  UserType: string;

  @Column()
  UserPrefix: string;

  @Column()
  UserFirst: string;

  @Column()
  UserMiddle: string;

  @Column()
  UserLast: string;

  @Column()
  UserSuffix: string;

  @Column()
  UserJobTitle: string;

  @Column()
  UserAddress: string;

  @Column()
  UserWPhone: string;

  @Column()
  UserMPhone: string;

  @Column()
  UserHPhone: string;

  @Column() 
  UserDOB: Date;

  @Column()
  UserPhoto: string;
}