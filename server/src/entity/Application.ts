import { Field, Int, ObjectType } from "type-graphql";
import { BaseEntity, BeforeInsert, Column, Entity, PrimaryColumn } from "typeorm";

import { v4 } from "uuid";

@ObjectType()
@Entity()
export class Application extends BaseEntity {
  @Field(() => String)
  @PrimaryColumn("uuid")
  id: string;

  @Field(() => String)
  @Column("text")
  name!: string;

  @Field(() => String)
  @Column("text", { unique: true })
  username!: string;

  @Field(() => String)
  @Column("text")
  fields!: [string];

  @BeforeInsert()
  addId() {
    this.id = v4();
  }
}
