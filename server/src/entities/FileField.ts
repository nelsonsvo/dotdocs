import { Field, InputType, ObjectType } from "type-graphql";
import { BaseEntity, BeforeInsert, Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 } from "uuid";
import { AppField } from "./AppField";
import { AppFile } from "./AppFile";

/*
This entity stores the fields ("information") by which the AppFile ("File") can be retrieved.
*/

@ObjectType("FileField")
@InputType("FileFieldInput")
@Entity()
export class FileField extends BaseEntity {
  @Field(() => String, { nullable: true })
  @PrimaryColumn("uuid")
  id?: string;

  @Field(() => String, { nullable: true })
  @Column()
  name!: string;

  @Field(() => String, { nullable: true })
  @Column()
  value: string;

  @Column()
  value_id_string: string;

  @Field(() => AppFile)
  @ManyToOne(() => AppFile, (file) => file.fields)
  file: AppFile;

  @Field(() => AppField)
  @ManyToOne(() => AppField, (field) => field.filefields)
  field: AppField;

  @BeforeInsert()
  addId() {
    this.id = v4();
  }
}
