import { Field, ObjectType } from "type-graphql";
import { BaseEntity, BeforeInsert, Column, Entity, PrimaryColumn } from "typeorm";
import { v4 } from "uuid";

@ObjectType()
@Entity()
export class Group extends BaseEntity {
  @Field(() => String)
  @PrimaryColumn("uuid")
  id: string;

  @Field(() => String)
  @Column("text")
  name: string;

  //this takes on the format of APPNAME_ACTION
  //only includes the allowed actions
  @Field(() => [String], { nullable: true })
  @Column("text", { array: true, nullable: true })
  permissions: string[];

  @BeforeInsert()
  addId() {
    this.id = v4();
  }
}
