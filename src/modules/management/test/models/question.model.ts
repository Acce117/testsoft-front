import { BaseModel } from "@/core/BaseModel";
import { schema } from "../schemas/question.schema";

const url = "question";

export class Question extends BaseModel {
  id_question;
  statement;
  image;

  fk_id_serie;
  fk_id_type_question;

  constructor(data: any = null) {
    super();

    if (data) {
      this.id_question = data.id_question;
      this.statement = data.statement;
      this.fk_id_serie = data.fk_id_serie;
      this.image = data.image;

      this.fk_id_type_question = data.fk_id_type_question;
    }
  }

  public setData(data: any) {
    this.id_question = data.id_question;
    this.statement = data.statement;
    this.fk_id_serie = data.fk_id_serie;
    this.fk_id_type_question = data.fk_id_type_question;
    this.image = data.image;
  }

  public clearData() {
    this.id_question = undefined;
    this.statement = undefined;
    this.fk_id_serie = undefined;
    this.fk_id_type_question = undefined;
    this.image = undefined;
  }

  public getURL(): string {
    return url;
  }
  public getSchema() {
    return schema;
  }

  public getFieldAsID(): string {
    return "id_question";
  }
}
