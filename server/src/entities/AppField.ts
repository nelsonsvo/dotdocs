import { Field, ObjectType } from "type-graphql";
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
@Entity()
export class AppField extends BaseEntity {
  @Field(() => String)
  @PrimaryColumn("uuid")
  id!: string;

  @Field(() => String)
  @Column()
  type!: string;

  @Field(() => String)
  @Column()
  name!: string;

  @Field(() => Number)
  @Column()
  max_length?: number;

  @ManyToOne(() => Application, (application) => application.fields, {
    onDelete: "CASCADE",
  })
  application: Application;

  @Field(() => [FileField], { nullable: true })
  @OneToMany(() => FileField, (field) => field.field)
  filefields: FileField[];

  @Field(() => [String], { nullable: true })
  @Column("text", { array: true, nullable: true })
  picklist_values: string[];

  @BeforeInsert()
  addId() {
    this.id = v4();
  }
}
