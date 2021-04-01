import { Field, InputType, ObjectType } from "type-graphql";
import { BaseEntity, BeforeInsert, Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 } from "uuid";
import { Application } from "./Application";

/*
this entity contains the fields for the Applications
*/

@ObjectType("AppField")
@InputType("appField")
@Entity()
export class AppField extends BaseEntity {
  @Field(() => String, { nullable: true })
  @PrimaryColumn("uuid")
  id?: string;

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

  @BeforeInsert()
  addId() {
    this.id = v4();
  }
}
