import { Field, ObjectType } from "type-graphql";
import { BaseEntity, BeforeInsert, Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { v4 } from "uuid";
import { AppField } from "./AppField";

@ObjectType()
@Entity()
export class Application extends BaseEntity {
  @Field(() => String)
  @PrimaryColumn("uuid")
  id?: string;

  @Field(() => String)
  @Column({ unique: true })
  name!: string;

  @OneToMany(() => AppField, (appField) => appField.application, {
    cascade: true,
  })
  fields: AppField[];

  @BeforeInsert()
  addId() {
    this.id = v4();
  }
}
