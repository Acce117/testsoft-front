import { BaseModel } from "@/core/BaseModel";

const url = "type_question";

export class QuestionType extends BaseModel {
  id_type_question;
  name;

  constructor(data: any = null) {
    super();

    if (data) {
      this.id_type_question = data.id_type_question;
      this.name = data.name;
    }
  }

  public setData(data: any) {
    this.id_type_question = data.id_type_question;
    this.name = data.name;
  }

  public clearData() {
    this.id_type_question = undefined;
    this.name = undefined;
  }

  public getURL(): string {
    return url;
  }

  public getFieldAsID(): string {
    return "id_type_question";
  }
}
