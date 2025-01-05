import { BaseModel } from "@/core/BaseModel";

const url = "question_top_value";

export class QuestionTopValue extends BaseModel {
  id_top_value;
  fk_id_question;
  top_value;

  constructor(data: object = {}) {
    super(data);
    this.setData(data);
  }
  public setData(data: object) {
    super.setData(data);
  }

  public getURL(): string {
    return url;
  }

  public getFieldAsID(): string {
    return "id_top_value";
  }
}
