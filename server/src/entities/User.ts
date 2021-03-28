import { Field, ObjectType } from "type-graphql";
import { BaseEntity, BeforeInsert, Column, Entity, PrimaryColumn } from "typeorm";

import { v4 } from "uuid";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => String)
  @PrimaryColumn("uuid")
  id: string;

  @Field(() => String)
  @Column("text")
  user_type!: string;

  @Field(() => String)
  @Column("text", { unique: true })
  username!: string;

  @Field(() => String)
  @Column("text")
  password!: string;

  @BeforeInsert()
  addId() {
    this.id = v4();
  }
}
