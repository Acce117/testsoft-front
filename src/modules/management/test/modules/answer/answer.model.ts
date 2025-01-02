import { BaseModel } from "@/core/BaseModel";
import { schema } from "../modules/category/category.schema";

const url = "answer";

export class Answer extends BaseModel {
  id_answer;
  text;
  fk_id_question;
  image;

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
    return "id_answer";
  }
}
