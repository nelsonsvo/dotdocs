import { Field, ObjectType } from "type-graphql";
import { BaseEntity, BeforeInsert, Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 } from "uuid";
import { Application } from "./Application";

@ObjectType()
@Entity()
export class AppField extends BaseEntity {
  @Field(() => String)
  @PrimaryColumn("uuid")
  id: string;

  @Field(() => String)
  @Column("text")
  type!: string;

  @Field(() => String)
  @Column("text", { unique: true })
  username!: string;

  @Field(() => Number)
  @Column("integer")
  max_length!: number;

  @ManyToOne(() => Application, (application) => application.fields)
  application: Application;

  @BeforeInsert()
  addId() {
    this.id = v4();
  }
}
