import { Field, ObjectType } from "type-graphql";
import { BaseEntity, BeforeInsert, Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 } from "uuid";
import { AppFile } from "./AppFile";

@ObjectType()
@Entity()
export class Remark extends BaseEntity {
  @Field(() => String)
  @PrimaryColumn("uuid")
  id: string;

  @Field(() => String)
  @Column()
  message: string;

  @Field(() => String)
  @Column()
  author: string;

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => AppFile)
  @ManyToOne(() => AppFile, (file) => file.remarks)
  file?: AppFile;

  @BeforeInsert()
  addId() {
    this.id = v4();
  }
}
