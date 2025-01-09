import { BaseModel } from "@/core/BaseModel";

const url = "correct_answer";

export class CorrectAnswer extends BaseModel {
  id_correct_answer;
  fk_id_answer;

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

  public getFieldAsID(): string {
    return "id_correct_answer";
  }
}
