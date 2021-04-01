import { Field, InputType, ObjectType } from "type-graphql";
import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from "typeorm";
import { v4 } from "uuid";
import { Application } from "./Application";
import { FileField } from "./FileField";

/*
this entity contains the fields for the Applications
*/

@ObjectType("AppField")
@InputType("appField")
@Entity()
export class AppField extends BaseEntity {
  @Field(() => String, { nullable: true })
  @PrimaryColumn("uuid")
  id: string;

  @Field(() => String, { nullable: true })
  @Column()
  type!: string;

  @Field(() => String, { nullable: true })
  @Column()
  name!: string;

  @Field(() => Number, { nullable: true })
  @Column()
  max_length?: number;

  @ManyToOne(() => Application, (application) => application.fields, {
    onDelete: "CASCADE",
  })
  application: Application;

  @Field(() => [FileField])
  @OneToMany(() => FileField, (field) => field.field)
  filefields: FileField[];

  @BeforeInsert()
  addId() {
    this.id = v4();
  }
}
@InputType("AppFieldInput")
export class AppFieldInput {
  @Field(() => String)
  id: string;

  @Field(() => String)
  value: string;
}
