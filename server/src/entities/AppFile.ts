import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 } from "uuid";
import { Application } from "./Application";

@ObjectType("AppFile")
@Entity()
export class AppFile extends BaseEntity {
  @Field(() => String)
  @PrimaryColumn("uuid")
  id?: string;

  @Field(() => String)
  @Column()
  filename!: string;

  @Field(() => String)
  @Column()
  mimetype!: string;

  @Field(() => String)
  @Column()
  location!: string;

  @Field((type) => Application)
  @ManyToOne(() => Application, (application) => application.files)
  application: Application;

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  addId() {
    this.id = v4();
  }
}
