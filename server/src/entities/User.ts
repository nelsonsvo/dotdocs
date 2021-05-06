import { Field, ObjectType } from "type-graphql";
import { BaseEntity, BeforeInsert, Column, Entity, ManyToMany, PrimaryColumn } from "typeorm";
import { v4 } from "uuid";
import { Group } from "./Group";

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
  @Column("text", { unique: true })
  email!: string;

  @Field(() => String)
  @Column("text")
  password!: string;

  @Field(() => [Group], { nullable: true })
  @ManyToMany(() => Group, (group) => group.users, {
    cascade: true,
  })
  groups: Group[];

  @BeforeInsert()
  addId() {
    this.id = v4();
  }
}
