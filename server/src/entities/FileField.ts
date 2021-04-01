import { Field, InputType, ObjectType } from "type-graphql";
import { BaseEntity, BeforeInsert, Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 } from "uuid";
import { AppFile } from "./AppFile";

/*
This entity stores the fields ("information") by which the AppFile ("File") can be retrieved.
*/

@ObjectType("FileField")
@InputType("fileField")
@Entity()
export class FileField extends BaseEntity {
  @Field(() => String, { nullable: true })
  @PrimaryColumn("uuid")
  id?: string;

  @Field(() => String, { nullable: true })
  @Column()
  name!: string;

  @Field(() => Number, { nullable: true })
  @Column()
  value: number;

  @Field((type) => AppFile)
  @ManyToOne(() => AppFile, (file) => file.fields)
  file: AppFile;

  @BeforeInsert()
  addId() {
    this.id = v4();
  }
}
