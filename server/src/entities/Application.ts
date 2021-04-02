import { Field, InputType, ObjectType } from "type-graphql";
import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 } from "uuid";
import { AppField } from "./AppField";
import { AppFile } from "./AppFile";

@ObjectType("Application")
@InputType("ApplicationInput")
@Entity()
export class Application extends BaseEntity {
  @Field(() => String)
  @PrimaryColumn("uuid")
  id?: string;

  @Field(() => String)
  @Column({ unique: true })
  name!: string;

  @Field(() => [AppField])
  @OneToMany(() => AppField, (appField) => appField.application, {
    cascade: true,
    onDelete: "CASCADE",
  })
  fields: AppField[];

  @Field(() => [AppFile])
  @OneToMany(() => AppFile, (file) => file.application)
  files: AppFile[];

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  addId() {
    this.id = v4();
  }
}
