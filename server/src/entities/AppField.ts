import { Field, InputType, ObjectType } from "type-graphql";
import { BaseEntity, BeforeInsert, Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 } from "uuid";
import { Application } from "./Application";

@ObjectType()
@InputType()
@Entity()
export class AppField extends BaseEntity {
  @PrimaryColumn("uuid")
  id?: string;

  @Field(() => String)
  @Column()
  type!: string;

  @Field(() => String)
  @Column()
  name!: string;

  @Field(() => Number, { nullable: true })
  @Column()
  max_length?: number;

  @ManyToOne(() => Application, (application) => application.fields)
  application: Application;

  @BeforeInsert()
  addId() {
    this.id = v4();
  }
}
