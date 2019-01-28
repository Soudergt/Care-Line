import { Entity, Column } from "typeorm";

@Entity()
export class Clinic {
  @Column()
  ClinicID: number;

  @Column()
  ClinicLongName: string;

  @Column()
  ClinicShortName: string;

  @Column()
  ClinicAddress: string;

  @Column()
  ClinicPhone: number;

  @Column()
  ClinicDescription: string;

  @Column()
  ClinicType: string;

  @Column()
  ClinicPhoto: string;
}