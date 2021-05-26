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
  @Column("text", { unique: true })
  username!: string;

  @Field(() => String, { nullable: true })
  @Column("text", { unique: true, nullable: true })
  email: string | null;

  @Field(() => String)
  @Column("text")
  password!: string;

  @Field(() => Boolean)
  @Column({ type: Boolean, nullable: true })
  isAdministrator: boolean;

  @Field(() => [Group], { nullable: true })
  @ManyToMany(() => Group, (group) => group.users, {
    cascade: true,
    nullable: true,
  })
  groups: Group[] | null;

  @BeforeInsert()
  addId() {
    this.id = v4();
  }
}
