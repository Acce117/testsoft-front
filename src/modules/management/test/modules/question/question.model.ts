import { BaseModel } from "@/core/BaseModel";
import { schema } from "../schemas/question.schema";
import type { Answer } from "./answer.model";

const url = "question";

export class Question extends BaseModel {
  id_question;
  statement;
  image;
  fk_id_serie;
  fk_id_type_question;
  answers:Answer[] = [];

  constructor(data: object = {}) {
    super(data);
    if (data) this.setData(data);
  }
  public setData(data: object) {
    super.setData(data, this);
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
