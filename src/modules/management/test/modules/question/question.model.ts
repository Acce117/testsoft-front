import { BaseModel } from "@/core/BaseModel";
import type { Answer } from "../answer/answer.model";
import { schema } from "./question.schema";

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
    super.setData(data);

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
