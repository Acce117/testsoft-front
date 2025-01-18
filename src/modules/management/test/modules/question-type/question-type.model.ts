import { BaseModel } from "@/common/utils/BaseModel";

const url = "type_question";

export class QuestionType extends BaseModel {
  id_type_question;
  name;

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
    return "id_type_question";
  }
}
